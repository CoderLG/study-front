<template>
  <el-container class="select-dm-data-container">
    <el-main>
      <el-container>
        <el-header>
          <div>
            <el-col :span="10" class="oper-btns-dm">
            </el-col>
            <el-col :span="7" style="text-align: right;float: right;">
             <el-input placeholder="搜索您的文件"
                          v-model="searchText"
                          size="small"
                          clearable
                          style="width: 77%;"
                          :trigger-on-focus="false"
                          @clear='gotoRouter(-1)'
                          @keyup.enter.native="searchFile">
              </el-input>
            </el-col>
          </div>
          <div class="select-dm-data-header">
              <span v-if="filePaths.length > 0">
                <template v-if="filePaths.length>0">
                   <el-button type="text" @click="gotoRouter(backPathId)">
                  返回上一级
                </el-button>
                |
                </template>
                <el-button type="text" @click="gotoRouter(-1)">全部数据</el-button>
                <!-- eslint-disable -->
                <span v-if="filePaths.length > 4"> > <span style="color: #409EFF;">...</span></span>
                <template v-for="(filePath, index) in filePaths">
                  <span v-if="showFilePath(filePaths.length, index)">
                    <span> > </span>
                    <el-button type="text" v-if="index!==filePaths.length-1"
                               @click="gotoRouter(filePath.id)" :title="filePath.name">{{filePath.name}}</el-button>
                    <span v-else :title="filePath.name">{{filePath.name}}</span>
                  </span>
                </template>
              </span>
            <span v-else style="line-height: 38px" @click="gotoRouter(-1)">全部数据</span>
          </div>
        </el-header>
        <el-main style="padding: 0;" class='select-dm-data-main'>
          <el-table
            :data="filesData"
            ref="multipleTable"
            v-loading="tableLoading"
            @select='selectItem'
            @select-all='selectAll'
            @selection-change="tableSelectionChange"
            @sort-change="tableSortChange"
            tooltip-effect="dark">
            <el-table-column
              type="selection"
              align="left"
              :selectable='selectable'
              width="40">
            </el-table-column>
            <el-table-column
              prop="name"
              sortable='custom'
              class-name="edit-cell"              
              label="文件名">
              <template slot-scope="scope">
                <template v-if="isTableEditing && scope.row.isCreating">
                  <i class="fa fa-lg"
                     :class="[scope.row.dir?
                            'fa-folder':getFileIcon(scope.row.ext)]">
                  </i>
                  <el-input ref="newFolderInput" v-model="scope.row.name"
                    :placeholder="scope.row.name"                    
                    size="small"
                    :autofocus="true"
                    :clearable="true"
                    @keyup.enter.native="submitCreateFolder(scope.row)">
                  </el-input>
                  <span class="fa-stack" @click="submitCreateFolder(scope.row)">
                    <img src="./../assets/checkimg.png" style="height: 32px;margin: -3px 7px;">
                  </span>
                  <span class="fa-stack" @click="cancelCreateFolder(scope.row)">
                    <img src="./../assets/closeimg.png" style="height: 32px;margin: -2px;margin: -3px 12px;">
                  </span>
                </template>
                <template v-else>
                  <i class="fa fa-lg"
                     :class="[scope.row.dir?
                            'fa-folder':getFileIcon(scope.row.ext)]">
                  </i>
                  <span class="name" :title="scope.row.name" v-if="scope.row.dir" @click="gotoRouter(scope.row.id)">{{scope.row.name}}</span>
                  <span class="name" :title="scope.row.name" v-else>{{scope.row.name}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="dataType"
              sortable='custom'
              label="文件类型"
              align='center'
              width="180">
              <template slot-scope="scope">
                <span v-if='scope.row.dataType === "original"'>原始影像</span>
                <span v-else-if='scope.row.dataType === "images"'>成果影像</span>
                <span v-else-if='scope.row.dataType === "vector"'>矢量</span>
                <span v-else-if='scope.row.dataType === "terrain"'>地形</span>
                <span v-else-if='scope.row.dataType === "tiltphoto"'>倾斜摄影</span>
                <span v-else-if='scope.row.dataType === "text"'>文档</span>
                <span v-else-if='scope.row.dataType === "picture"'>图片</span>
                <span v-else-if='scope.row.dataType === null'>文件夹</span>
                <span v-else>其他</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="pName"
              sortable='custom'
              width="150"
              label="所在目录"
              align='center'
              v-if="isSearchFile"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" @click="gotoRouter(scope.row.pId)">{{scope.row.pName}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import { pageFiles, getPath } from './../api/fileApi';

export default {
  name: 'dmDilog',
  data() {
    return {
      searchText: null, // 文件搜索关键字
      isSearchFile: false, // 搜索文件状态
      filesData: [],
      fileList: [],
      currentPage: 1,
      pageSize: 50,
      total: 0,
      filePaths: [],
      tableLoading: false,
      multipleSelection: [],
      isTableEditing: false,
      orderProp: {
        prop: 'createTime',
      },
      renameInputName: '',
      isDownload: true,
    };
  },
  props: {
    checkFolder: {
      type: Boolean,
      default: false,
    },
    isEmitAsso: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    // 侦听变化
    filePaths() {
      this.listChange();
    },
    // 是否触发关联
    isEmitAsso() {
      if (this.multipleSelection.length !== 1) {        
        this.$message.warning({ message: '请勾选一条数据', showClose: true });
        return;
      } else if (this.multipleSelection[0].dir) {
        this.$message.warning({ message: '不能勾选文件夹', showClose: true });
        return;
      } else {
        this.$emit('makeSureEvent', this.multipleSelection);
      }
    },
  },
  mounted() {
    this.gotoRouter(-1);
  },
  computed: {
    ...mapGetters([
      'isInLoaing',
    ]),
    lastPathId() {
      return this.filePaths.length > 0 ? this.filePaths[this.filePaths.length - 1].id : -1;
    },
    // 上一级id
    backPathId() {
      return this.filePaths.length > 1 ? this.filePaths[this.filePaths.length - 2].id : -1;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.gotoInit();
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.gotoInit();
  },
  methods: {
    gotoInit() {
      this.gotoParent(this.$router.currentRoute.params.parentId || -1);
    },
    showFilePath(length, index) {
      if(length <= 4) {
        return true;
      } else if(length > 4 && index > length - 5) {
        return true;
      }
      return false;
    },
    // 表格排序变化
    tableSortChange(orderProp) {
      this.orderProp = orderProp;
      this.listChange();
    },
    gotoRouter(parentId) {
      this.gotoParent(parentId);
    },    
    // 勾选数据
    selectItem(val, row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
      // this.checkedTableData = val[val.length - 1];     
    },
    // 勾选全部数据
    selectAll() {
      this.$refs.multipleTable.clearSelection();
    },
    // 表格选中改变事件
    tableSelectionChange(value) {
      this.multipleSelection = value;
      if(value.length > 0) {
        this.renameInputName = value[0].name;
      }
      this.isDownload = false;
      this.multipleSelection.forEach(res => {
        if (res.dir) {
          this.isDownload = true;
        }
      });
    },
    // 搜索
    searchFile() {
      this.isSearchFile = true;
      this.listChange();
      this.filePaths = [];
      this.filePaths.push({ name: `搜索"${this.searchText}"` });
    },
    async gotoParent(id) {
      this.isSearchFile = false;
      this.filePaths = (await getPath(id)) || [];
    },
    clearSearch() {
      this.searchText = null;
      this.isSearchFile = false;
      this.filePaths = [];
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listChange();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.listChange();
    },
    async listChange() {
      this.tableLoading = true;
      let pageResult = await pageFiles(this.currentPage,
        this.pageSize, this.isSearchFile ? null : (this.lastPathId || -1),
        this.isSearchFile ? this.searchText : null, this.orderProp.prop, this.orderProp.order === 'ascending' ? 'asc' : 'desc');
      if (pageResult.items.length === 0 && this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        pageResult = await pageFiles(this.currentPage,
         this.pageSize, this.isSearchFile ? null : (this.lastPathId || -1),
         this.isSearchFile ? this.searchText : null, this.orderProp.prop, this.orderProp.order === 'ascending' ? 'asc' : 'desc');
      }
      this.tableLoading = false;
      this.currentPage = pageResult.currentPage || 1;
      this.total = pageResult.total;
      this.filesData = pageResult.items;
      this.isTableEditing = false;
    },
    // 过滤文件夹行的勾选框
    selectable(row) {
      if (row.dir) {
        return false;
      } else {
        return true;
      }
    },
    getFileIcon(ext) {
      const suff = ext.toLowerCase();
      let fileType = null;
      if (['doc', 'docx'].indexOf(suff) > -1) {
        fileType = 'word';
      } else if (['xls', 'xlsx'].indexOf(suff) > -1) {
        fileType = 'excel';
      } else if (['xls', 'xlsx'].indexOf(suff) > -1) {
        fileType = 'excel';
      } else if (['ppt', 'pptx'].indexOf(suff) > -1) {
        fileType = 'powerpoint';
      } else if (['rar', 'zip', 'jar', '7-zip', 'tar', 'gzip', '7z'].indexOf(suff) > -1) {
        fileType = 'zip';
      } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico', 'RAW'].indexOf(suff) > -1) {
        fileType = 'image';
      } else if (['pdf'].indexOf(suff) > -1) {
        fileType = 'pdf';
      } else if (['mp3', 'wav', 'wma'].indexOf(suff) > -1) {
        fileType = 'audio';
      } else if (['mp4', 'ogg', 'mpg', '3gp', 'avi', 'wmv'].indexOf(suff) > -1) {
        fileType = 'video';
      }
      return `fa-file${fileType == null ? '' : `-${fileType}`}-o`;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/color";
.select-dm-data-container {
  .oper-btns-dm {
    display: flex;
    align-items: center;
    & > *:not(:first-child) {
      margin-left: 10px;
    }
    .sevice-icon-font {
      font-size: 14px;
    }
    .el-dropdown-link {
      i {
        font-size: 14px;
        vertical-align: top;
      }
      img {
        height: 12px;
        margin-right: 3px;
      }
    }
    .pan-com-fa-icon {
      .fa {
        font-size: 14px;
      }
      button {
        i {
          font-size: 14px;
        }
      }
    }
  }

  input:read-only {
    background-color: #f1f2f4;
  }

  .el-form--inline .el-form-item {
    display: inline-block;
    vertical-align: top;
    height: -2px;
    margin-top: -5px;
  }

  .el-input__icon {
    cursor: pointer;
    color: #333333;
    &:hover {
      color: $blueColor;
    }
  }

  .edit-cell {
    .fa {
      cursor: pointer;
      margin: 3px;
      &.fa-folder {
        color: $folderColor;
      }
    }
    .name:hover {
      cursor: pointer;
      color: $buleHoverColor;
    }
    .el-input {
      width: calc(100% - 100px);
      max-width: 260px;
    }
  }


  .select-dm-data-header {
    & * {
      font-size: 0.8rem;
      line-height: 14px;
    }
    > span {
      float: left;
    }
    span {      
      span {
        max-width: 150px;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      button {
        span {
          max-width: 150px;
          display: inline-block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          vertical-align: middle;
        }
      }
    }
  }
  .el-main {
    height: auto !important;
    .el-table th {
      padding: 7px 0px;
    }
    .el-table th:nth-child(6) {
      .cell {
        text-align: center;
      }
    }
    .el-table th.is-left, .el-table td.is-left {
      padding-left: 0px;
    }
  }

  .select-dm-data-main {
    height: 500px;
    margin-bottom: 10px;    
    .el-table__body-wrapper {
      height: calc(100vh - 586px);
      min-height: 196px;
      overflow-y: auto;
    }
  }
  .el-dialog__header {
    padding: 0px;
    background: #0c8bde;
    padding-left: 20px;
    line-height: 50px;
    .el-dialog__headerbtn {
      top: 16px;
      line-height: normal;
    }
  }
  .el-dialog__title {
    font-size: 16px;    
    color: #ffffff;
  }
  .el-dialog__headerbtn .el-dialog__close ,.el-dialog__headerbtn:hover .el-dialog__close{
    color: #ffffff;
  }
  .el-dropdown-menu--small .el-dropdown-menu__item{
    width: 110px;
    text-align: center;
    line-height: 40px;
    padding: 0 15px;
  }
  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 35px;    
  }
  .el-table--enable-row-transition .el-table__body td:nth-child(2){
    .cell {
      .name {
        width: calc(100vw / 2 - 500px);
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .el-tag--mini {
    float: right;
    line-height: 0px;
    margin-top: -26px;
    padding: 8px 0;
    background: #ffffff;
    border: 0px solid rgba(64,158,255,.2)!important;
  }
  .el-tag--danger {
    float: left !important;
    margin-top: -7px !important;
  }
  .el-table td.is-center, .el-table th.is-center {
    padding-right: 15px;
  }
}
</style>
