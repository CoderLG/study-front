<template>
  <el-dialog title="选择数据" :visible.sync="checkTargetFile"
   class='server-directory-dialog' :close-on-click-modal='false'>
    <div class="server-directory-head">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="server-directory-file">
        <el-breadcrumb-item v-for='(li, index) in filePath' :key='index'>
          <span v-if='index === 0' :title='serverPath' @click='goBackItem(li.path, index, li.viewpath)'>{{ li.viewpath.slice(1, li.viewpath.length) }}</span>
          <span v-else @click='goBackItem(li.path, index, li.viewpath)'>{{ li.viewpath.slice(1, li.viewpath.length) }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-input placeholder="搜索当前目录" v-model="inputValue" size='small'
       clearable @clear='inputChange'></el-input>
    </div>
    <div class="server-directory-progress">
      <el-table :data="tableData" align='right' tooltip-effect="dark" v-loading="scanLoading"
       @cell-click='rowClick' ref="multipleTable">
        <el-table-column width="45">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" @change.native="changeFun(scope.row)" :label="scope.$index" :disabled="selectable(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="文件路径" sortable>
          <template slot-scope="scope">
            <i v-if='scope.row.fileType === "File"' class="fa fa-lg fa-file-o"></i>
            <i v-else class="fa fa-lg fa-folder set-color"></i>
            <span>{{ scope.row.viewpath.slice(1, scope.row.viewpath.length) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="size" label="文件大小" width="140"></el-table-column> -->
      </el-table>
    </div>
    <div class="server-directory-foot">
      <el-button type="primary" size='small' @click='makeSure'>确定</el-button>
      <el-button plain size='small' @click='cancelSelect'>取消</el-button>
      <!-- <span class="check-storage-file">已经勾选了{{ checkedTableData.length }}条数据</span> -->
    </div>
  </el-dialog>
</template>

<script>
import { getServerDirectory, getServerType, getServerPath } from '../api/fileApi';

export default {
  name: '',
  props: {
    breadcrumb: {
      type: String,
    },
    rootUrl: {
      type: String,
    },
    fileType: {
      type: Array,
    },
    checkFolder: {
      type: Boolean,
      default: false,
    },
    //记录当前文件的类型
    currentDataSourceType:{
      type:String,
    },
    importExportType: {
      type: String,
    },
  },
  data() {
    return {
      inputValue: '',
      filePath: [{path: 'null', viewpath: '根目录'}], // 文件路径
      tableData: [],
      tempTableData: [], // 临时的完整目录
      filesType: '', // 文件类型
      checkTargetFile: false, // 弹出框的显隐
      scanLoading: false, // 扫描文件的loading
      checkedTableData: [], // 被选中的要入库的文件数
      serverType: '', // 服务器类型
      radio: null,
      serverPath: '',// 服务器物理路径
    };
  },
  async mounted() {
    // this.filePath = this.filePath.split('/');
    this.serverType = await getServerType();
    this.serverPath = await getServerPath();
  },
  watch: {
    checkTargetFile(isTrue) {
      if (isTrue) {
        this.radio = null;
        this.tableData = [];
        this.tempTableData = [];
        this.inputValue = '';
        if (JSON.parse(localStorage.getItem("tempRowImport")) && this.importExportType === '1') {
          this.rowClickHistrory(JSON.parse(localStorage.getItem("tempRowImport")), { label : '文件路径'});
          this.filePath = JSON.parse(localStorage.getItem("tempRowImport"));
        } else if (JSON.parse(localStorage.getItem("tempRowExport")) && this.importExportType === '2') {
          this.rowClickHistrory(JSON.parse(localStorage.getItem("tempRowExport")), { label : '文件路径'});
          this.filePath = JSON.parse(localStorage.getItem("tempRowExport"));
        } else {
          this.goBackItem('null'); // 默认根目录
        }
      } else {
        // 关闭界面时 记录路径        
        if (this.importExportType === '1') {
          localStorage.setItem('tempRowImport', JSON.stringify(this.filePath));
        } else {
          localStorage.setItem('tempRowExport', JSON.stringify(this.filePath));
        }
      }
    },
    inputValue() {
      this.inputChange();
    },
  },
  methods: {
    // 输入框搜索过滤
    inputChange() {
      this.tableData = this.tempTableData;
      let newArr = [];
      this.tableData.forEach(val => {
        if (val.path.slice(val.path.lastIndexOf('/') + 1, val.path.length).indexOf(this.inputValue) !== -1) {
          newArr.push(val);
        }
      });
      this.tableData = newArr;
    },
    // 获取服务器目录
    async getServerDirectory(filePath) {
      if (this.filePath.length) {
        this.scanLoading = true;
        this.tableData = [];
        this.tempTableData = [];
        getServerDirectory(filePath, Number(this.importExportType)).then((res) => {
          this.scanLoading = false;
          res.forEach(val => {
            /* eslint-disable */
            if (val.size) val.size = `${(val.size / 1024 / 1024).toFixed(2)}M`;
            if(!this.fileType || val.fileType === 'Folder' || val.fileType === 'File' ) {
              this.tableData.push(val);
              this.tempTableData.push(val);
            }
            /* eslint-enable */
          });
        }).catch(() => {
          this.scanLoading = false;
          this.$message.error({ message: '扫描失败', showClose: true });
        });
      } else {
        this.$message.warning({ message: '请输入扫描路径', showClose: true });
      }
    },
    // 点击目录返回
    goBackItem(path, index) {
      if (path === 'null') {
        this.getServerDirectory(this.rootUrl);
        this.filePath = [{path: 'null', viewpath: '根目录'}];
        if (this.importExportType === '1') {
          localStorage.setItem('tempRowImport', null);
        } else {
          localStorage.setItem('tempRowExport', null);
        }
        return;
      }
      if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        this.getServerDirectory(path);
        this.filePath = this.filePath.slice(0, index + 1);
      } else {
        this.getServerDirectory(path);
        this.filePath = this.filePath.slice(0, index + 1);
      }
    },
    // 将选中的条目进行入库
    changeFun(row) {
      this.checkedTableData = row;
    },
    // 某一行被单击
    rowClick(row, column) {
      if (row.fileType === 'Folder' && column.label === '文件路径' && this.serverType.resultInfo === 'WindowsSingleVersion'){
        this.filePath.push({path: row.path, viewpath: row.viewpath});
        this.getServerDirectory(row.path);
        this.inputValue = '';
        this.radio = null;
        return;
      } else if (row.fileType === 'Folder' && column.label === '文件路径') {
        this.filePath.push({path: row.path, viewpath: row.viewpath});
        this.getServerDirectory(row.path);
        this.inputValue = '';
        this.radio = null;
      }
    },
    // 某一行被单击（历史记录）
    rowClickHistrory(filePath) {
      if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        this.getServerDirectory(filePath[filePath.length - 1].path);
        this.inputValue = '';
        this.radio = null;
        return;
      } else {
        this.getServerDirectory(filePath[filePath.length - 1].path);
        this.inputValue = '';
        this.radio = null;
      }
    },
    // 过滤文件夹行的勾选框
    selectable(row) {
      if(this.currentDataSourceType === 'ArcGIS Tile Package'){
        return false;
      }
      if (this.checkFolder && row.fileType === 'Folder'){
        return false;
      }
      if (!(this.checkFolder) && row.fileType === 'File'){
        return false;
      }
      else{
        return true;
      }
    },
    // 确定
    makeSure() {
      this.$emit('makeSure', this.checkedTableData);
      this.checkedTableData = [];
    },
    // 取消
    cancelSelect() {
      this.checkTargetFile = false;
    },
  },
};
</script>

<style lang='scss'>
  .server-directory-dialog {
    .server-directory-head {
      height: 50px;
    }
    a , .el-breadcrumb{
      display: inline-block;
      color: #606266;
      line-height: 25px;
    }
    .server-directory-file {
      width: 70%;
      height: 50px;
      padding-left: 15px;
      overflow-y: auto;
      span {
        cursor: pointer;
      }
    }
    .el-dialog__body {
      padding: 20px;
      padding-bottom: 15px;
      text-align: left;
      line-height: 25px;
    }
    .server-directory-progress {
      position: relative;
      margin-top: 10px;
      border-top: 1px solid #ebeef5;
      .el-progress--circle {
        position: absolute;
        z-index: 10000;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .el-table__body-wrapper {
        height: calc(100vh - 507px);
        min-height: 265px;
      }
      .set-color {
        color: #ffd02f;
      }
      .el-table td, .el-table th.is-leaf {
        cursor: pointer;
      }
      .el-table .cell {
        i {
          font-size: 20px;
        }
      }
    }
    .el-dialog__body .el-input {
      width: 30%;
      float: right;
    }
    .server-directory-foot {
      text-align: center;
      padding-top: 10px;
    }
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
  }
</style>
