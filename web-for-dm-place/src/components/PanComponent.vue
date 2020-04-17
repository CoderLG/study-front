<template>
  <el-container class="full-container file-manager-container" v-loading='dataManagerLoading'>
    <el-main>
      <el-container class="full-container">
        <el-header height="70px">
          <div>
            <el-col :span="18" class="oper-btns">
              <el-dropdown @command="handleCommand" size="small" >
                  <el-button type="primary" size='mini' class="el-dropdown-link">
                    <i class="el-icon-upload2"></i>&nbsp;上&nbsp;传
                    <i class="el-icon-caret-bottom"></i>
                  </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for='(li, index) in dataTypeList' :key='index' :title='li.serviceName'
                   :command="li.typeIdentify">
                    {{ li.serviceName }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="primary"
               size="small" @click="handleCommand('scanstorage')">
                <i class="fa fa-server sevice-icon-font"></i>
                从服务器导入
              </el-button>
              <el-button type="primary" plain
               size="small" @click="createNewFolder">
               <i class="fa fa-folder-o sevice-icon-font"></i>
                新建文件夹
              </el-button>
              <el-button-group v-if="multipleSelection.length>0" class='pan-com-fa-icon'>
                <el-button size="small" :disabled="isDownload"
                 @click="download"><i class="el-icon-download"></i>下载
                </el-button>
                <el-button icon="fa fa-trash" size="small"
                           @click="deleteFiles"> 删除
                </el-button>
                <el-button icon="fa fa-edit" size="small"
                           :disabled="multipleSelection.length!==1"
                           @click="rename"> 重命名
                </el-button>
                <el-button icon="fa fa-copy" size="small"
                           @click="moveToFolder(false)"> 复制到
                </el-button>
                <el-button icon="fa fa-cut" size="small"
                           @click="moveToFolder(true)"> 移动到
                </el-button>
                <!-- <el-button icon="fa fa-share-alt-square" size="small"
                           @click="share"> 分享
                </el-button> -->
              </el-button-group>
              <el-button v-show="false" class="upload-btn"></el-button>
            </el-col>
            <el-col :span="6" style="text-align: right;">
             <el-input placeholder="搜索您的文件"
                          v-model="searchText"
                          size="small"
                          clearable
                          style="width: 77%;"
                          :trigger-on-focus="false"
                          @clear='gotoRouter(-1)'
                          @keyup.enter.native="searchFile">
              </el-input>
              <el-button icon="el-icon-search" type="primary" size="mini" v-on:click="searchFile">
              </el-button>
            </el-col>
          </div>
          <div class="nav-file-header">
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
                               @click="gotoRouter(filePath.id)" :title="filePath.fileName">{{filePath.fileName}}</el-button>
                    <span v-else :title="filePath.fileName">{{filePath.fileName}}</span>
                  </span>
                </template>
              </span>
            <span v-else style="line-height: 38px">全部数据</span>
          </div>
        </el-header>
        <el-main style="padding: 0;overflow-y: scroll;">
          <el-table
            :data="filesData"
            ref="fileTable"
            v-loading="tableLoading"
            @selection-change="tableSelectionChange"
            @row-contextmenu="showRowContextmenu"
            @sort-change="tableSortChange"
            tooltip-effect="dark">
            <el-table-column
              type="selection"
              align="right"
              width="50">
            </el-table-column>
            <el-table-column
              prop="fileName"
              sortable="custom"
              class-name="edit-cell"
              label="文件名">
              <template slot-scope="scope">
                <template v-if="isTableEditing && scope.row.isCreating">
                  <i class="fa fa-lg"
                     :class="[scope.row.dir?
                            'fa-folder':getFileIcon(scope.row.extName)]">
                  </i>
                  <el-input ref="newFolderInput" v-model="scope.row.fileName"
                    :placeholder="scope.row.fileName"                    
                    size="small"
                    :autofocus="true"
                    :clearable="true"
                    @keyup.enter.native="submitCreateFolder(scope.row)" :disabled= 'isClick'>
                  </el-input>
                  <span class="fa-stack" @click="submitCreateFolder(scope.row)" :disabled= 'isClick'> 
                    <img src="./../assets/checkimg.png" style="height: 32px;margin: -3px 7px;">
                  </span>
                  <span class="fa-stack" @click="cancelCreateFolder(scope.row)">
                    <img src="./../assets/closeimg.png" style="height: 32px;margin: -2px;margin: -3px 12px;">
                  </span>
                </template>
                <template v-else>
                  <i class="fa fa-lg"
                     :class="[scope.row.dir?
                            'fa-folder':getFileIcon(scope.row.extName)]">
                  </i>
                  <span class="name" :title="scope.row.fileName" v-if="scope.row.dir" @click="gotoRouter(scope.row.id)">{{scope.row.fileName}}</span>
                  <span class="name" :title="scope.row.fileName" v-else @click="previewOne(scope.row)">{{scope.row.fileName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="dataType"
              sortable="custom"
              label="文件类型"
              align='center'
              width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceName }}</span>
                <!-- <span v-for='li in dataTypeList' v-if='scope.row.dataType === li.typeIdentify'>{{ li.serviceName }}</span> -->
                <!-- <span v-if='scope.row.dataType === "original"'>原始影像</span>
                <span v-else-if='scope.row.dataType === "images"'>成果影像</span>
                <span v-else-if='scope.row.dataType === "vector"'>矢量</span>
                <span v-else-if='scope.row.dataType === "terrain"'>地形</span>
                <span v-else-if='scope.row.dataType === "tiltphoto"'>倾斜摄影</span>
                <span v-else-if='scope.row.dataType === "text"'>文档</span>
                <span v-else-if='scope.row.dataType === "picture"'>图片</span>
                <span v-else-if='scope.row.dataType === null'>文件夹</span>
                <span v-else>其他</span> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="fileSize"
              sortable="custom"
              label="大小"
              align='center'
              width="135"
              :formatter="formatterSize">
            </el-table-column>            
            <el-table-column
              prop="createTime"
              sortable="custom"
              width="205"
              label="创建日期"
              align='center'
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="pName"
              sortable
              width="150"
              label="所在目录"
              align='center'
              v-if="isSearchFile"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" @click="gotoRouter(scope.row.pId)">{{scope.row.pName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column width="315" label="操作" align="left">
              <template slot-scope="scope">
                <el-button size="mini" v-if="!scope.row.dir && scope.row.operationTypeEn !== null &&
                 scope.row.operationTypeEn.indexOf('parsefile') !== -1" plain
                           @click="showInfoDialog(scope.row)" type="primary"
                           title='详情'>
                           详情
                </el-button>
                <!-- <el-button size="mini" v-if="!scope.row.dir && scope.row.dataType === 'image'" type="primary"
                           @click="editData(scope.row)" plain
                           title="数据编辑">
                           编辑
                </el-button> -->
                <el-button size="mini" v-if="!scope.row.dir && scope.row.operationTypeEn !== null &&
                 scope.row.operationTypeEn.indexOf('publishfile') !== -1"
                           type="primary"
                           @click="publish(scope.row)" plain
                           title="数据发布">
                           发布
                </el-button>
                <!-- <el-button size="mini" 
                           type="primary"
                           @click="publish(scope.row)" plain
                           title="数据发布">
                           发布
                </el-button> -->
                <el-button size="mini" v-if="!scope.row.dir && scope.row.operationTypeEn !== null &&
                 scope.row.operationTypeEn.indexOf('publishfile') !== -1"
                           type="primary"
                           @click="showServiceList(scope.row)" plain
                           title="查看服务">
                           查看服务
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <file-info-dialog ref="fileInfoDialog" :activeFile="activeFile"></file-info-dialog>
          <div @contextmenu="showContextMenu">
            <vue-context-menu :context-menu-data="contextMenuData"
                              ref="contextMenu"
                              @rename="rename"
                              @del="deleteFiles"
                              @moveTo="moveToFolder(true)"
                              @copyTo="moveToFolder(false)"
                              @download="download"
                              @preview="preview"
                              @share="share"
            ></vue-context-menu>
          </div>
        </el-main>
        <el-footer style="height: auto;border-top: 1px solid #ebeef5;text-align: left;padding-top: 10px;">
          <el-pagination
            background
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[50, 100, 300]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-footer>
        <vue-upload
          ref="uploader"
          :url="uploadUrl"
          uploadButton=".upload-btn"
          uploadType='image'
          multiple
          @fileChange="fileChange"
          @uploadStart="onUploadStart"
          @progress="onProgress"
          @complete="onUploadcomplete"
          @uploadError="onUploadError"
          @error="onError"
          @success="onUploadSuccess"
          @uploadFinished="onUploadFinished"
        ></vue-upload>
        <el-card v-if="dialogVisible"
                 class="upload-dialog">
            <span slot="header">
              <span style="font-weight: 600;">文件上传({{uploader.getStats().successNum }}/{{ fileList.length }})</span>
              <span class="min-btn" @click="minOrMaxUploadPanel">
                <i class="fa" :class="{'el-icon-minus':!minUploadPanel
                                      ,'fa-window-maximize':minUploadPanel}" style="color: #ccc; font-size: 12px;">
                </i>
                <i class="el-icon-close" @click="closeUploadDialog"
                   style="top: 1px;position: relative;padding: 0px 8px;color: #c4b3b3;"></i>
              </span>
            </span>
          <span>
             <transition name="el-zoom-in-bottom">
            <ul class="el-upload-list el-upload-list--picture" v-if="!minUploadPanel">
              <template v-for="item of fileList">
                <li class="el-upload-list__item" :class="{
                      'is-success': item.getStatus()==='complete',
                      'is-error': item.getStatus()==='error',
                      }" :ref="item.id"    style="height: 65px;">
                  <!-- <img :src="item.thumb" v-if="item.thumb"
                       class="el-upload-list__item-thumbnail"/> -->
                  <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                    <!-- <img src="../assets/uploadicon.png" /> -->
                    <span>{{item.name}}</span>
                    <i class="el-icon-close" @click="remove(item)" style="margin-left: 90%;font-size: 20px;padding-top: 15px;display: block;"></i>
                    <div v-if="item.statusText">
                       <el-tag size="mini"
                               :type="item.getStatus()==='error'?'danger':'info'" style="margin-right: 3%;padding-top: 4px;">{{item.statusText}}</el-tag>
                    </div>
                    <div v-else>
                      <span v-if="item.getStatus()==='complete'">
                        <i class="el-icon-success" style="margin-left: 72%;font-size: 12px;color: #67C23A;padding-top: 20px;">&nbsp;&nbsp;上传成功&nbsp;!</i>
                        <!-- <i class="el-icon-close" @click="remove(item)" style="margin-left: 90%;font-size: 20px;padding-top: 13px"></i> -->
                      </span>
                    </div>
                     <span v-if="item.getStatus()==='error'">
                        <i class="el-icon-warning" style="margin-left: 66%;font-size: 12px;padding-top: 20px;color: #F56C6C;">&nbsp;&nbsp;上传失败&nbsp;!</i>
                        <i  @click="retry(item)" style="margin-left: 80%;font-size: 12px;padding-top: 19px;color: #3485eb;cursor: pointer;">重试</i>
                    </span>
                  </a>
                  <!-- <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-check"></i>
                  </label> -->
                  <!-- <i class="el-icon-close" @click="remove(item)"></i> -->
                  <!-- <i class="fa fa-undo" v-if="item.getStatus()==='error'"
                     @click="retry(item)"></i> -->
                  <el-progress :percentage="item.percent || 0 "
                               v-if="item.statusText !== '文件合并中' && item.getStatus()==='progress'"></el-progress>
                </li>
              </template>
            </ul>
                 </transition>
      </span>
        </el-card>

        <folder-select-component ref="folderSelectComponent"
                                 :title="folderDialogTitle"
                                 @submit="submitFolderSelect"
                                 :loading='folderSelectLoading'
        ></folder-select-component>
        <EditDMData ref="EditDMData" :activeFile="activeFile"></EditDMData>
        <ShowServiceList ref="ShowServiceList" :activeFile="activeFile"></ShowServiceList>
        <publication-data-auto-step ref="publicationDataDialog" :activeFile="activeFile"></publication-data-auto-step>
        <user-dialog-component ref="userDialog" @ok="checkedUser"></user-dialog-component>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import jQuery from 'jquery';
import vueUpload from './UploadComponent';
import {
  previewFile,
  copyFiles,
  deleteFiles,
  downloadFileURL,
  fileCreateNewFolder,
  renameFile,
  moveFiles,
  pageFiles,
  getPath,
  getUploadUrl,
  showWindow,
  shareFile,
  getdataTypeList, 
  getdataDetail,
} from './../api/fileApi';
import FolderSelectComponent from './FolderSelectComponent';
import EditDMData from './EditDMData';
import ShowServiceList from './ShowServiceList';
import PublicationDataAutoStep from './PublicationDataAutoStep';
import FileInfoDialog from './FileInfoDialog';
import config from '../config';
import UserDialogComponent from './UserDialogComponent';
import store from '../store';

export default {
  name: 'pan',
  components: {
    UserDialogComponent,
    FileInfoDialog,
    EditDMData,
    ShowServiceList,
    PublicationDataAutoStep,
    FolderSelectComponent,
    vueUpload,
  },
  data() {
    return {
      searchText: null, // 文件搜索关键字
      isSearchFile: false, // 搜索文件状态
      uploadUrl: getUploadUrl(),
      activeFile: null,
      filesData: [],
      fileList: [],
      dialogVisible: false,
      minUploadPanel: true,
      currentPage: 1,
      pageSize: 50,
      total: 0,
      filePaths: [],
      tableLoading: false,
      multipleSelection: [],
      folderDialogTitle: '',
      publicationDataVisible: false,
      isTableEditing: false,
      isMoveOrCopy: null, // true-move, false-copy
      isClick:false,
      orderProp: {
        prop: 'createTime',
      },
      contextMenuData: {
        axis: {
          x: null,
          y: null,
        },
        menulists: [],
      },
      dataTypeList: [
        // { serviceName: '原始影像', typeIdentify: 'original' },
        // { serviceName: '成果影像', typeIdentify: 'images' },
        // { serviceName: '矢量', typeIdentify: 'vector' },
        // { serviceName: '地形', typeIdentify: 'terrain' },
        // { serviceName: '倾斜摄影', typeIdentify: 'tiltphoto' },
        // { serviceName: '文档', typeIdentify: 'text' },
        // { serviceName: '图片', typeIdentify: 'picture' },
        // { serviceName: '其他', typeIdentify: 'other' },
      ],
      menulists: [
        {
          fnHandler: 'preview',
          btnName: '预览',
          isFileDisable: true,
        },
        {
          fnHandler: 'download',
          btnName: '下载',
          isFileDisable: true,
        },
        {
          fnHandler: 'rename',
          btnName: '重命名',
        },
        {
          fnHandler: 'del',
          btnName: '删除',
        },
        {
          fnHandler: 'moveTo',
          btnName: '移动到',
        },
        {
          fnHandler: 'copyTo',
          btnName: '复制到',
        },
        // {
        //   fnHandler: 'share',
        //   btnName: '分享',
        // },
      ],
      dataInfoArr: [], // 解析后数据的详情
      renameInputName: '',
      folderSelectLoading: false, // 复制 移动 弹出的tree
      isDownload: true,
      dataManagerLoading: false, // 数据管理界面的loading
      fileExtension: {}, // 数据标识对应的文件类型
    };
  },
  watch: {
    // 侦听变化
    filePaths() {
      this.listChange();
    },
  },
  computed: {
    ...mapGetters([
      'isInLoaing',
    ]),
    cannotdown() {
      const fileArray = this.multipleSelection.filter(row => !row.dir);
      return this.multipleSelection < 1
          || fileArray.length === 0;
    },
    uploaderComponent() {
      return this.$refs.uploader;
    },
    folderSelectComponent() {
      return this.$refs.folderSelectComponent;
    },
    uploader() {
      return this.uploaderComponent.uploader;
    },
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
  async created() {
    this.dataTypeList = await getdataTypeList(1, 1000)
    this.dataTypeList = this.dataTypeList.items;
    // 根据数据类型列表 组织出其对应的文件类型
    this.fileExtension = {};
    this.dataTypeList.forEach((res) => {
      this.fileExtension[res.typeIdentify] = res.fileType;
    });
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
    /**
     * 表格排序变化
    */
    tableSortChange(orderProp) {
      this.orderProp = orderProp;
      this.currentPage = 1;
      this.listChange();
    },
    gotoRouter(parentId) {
      this.gotoParent(parentId);
      this.$router.push({ path: `/datamanager/${parentId}` });
    },
    showRowContextmenu(row, event) {
      this.$refs.fileTable.clearSelection();
      this.$refs.fileTable.toggleRowSelection(row);
      if (row.dir) {
        this.contextMenuData.menulists =
            this.menulists.filter(item => !item.isFileDisable);
      } else {
        this.contextMenuData.menulists = this.menulists;
      }
      this.showContextMenu(event);
    },

    showContextMenu(event) {
      event.preventDefault();
      const x = event.clientX;
      let y = event.clientY;
      // Get the current location
      this.contextMenuData.axis = {
        x, y,
      };
      this.$nextTick().then(() => {
        if (document.body.clientHeight - y < this.$refs.contextMenu.$el.scrollHeight) {
          y -= this.$refs.contextMenu.$el.scrollHeight;
          this.contextMenuData.axis = {
            x, y,
          };
        }
      });
    },
    async download() {
      if (!this.cannotdown) {
        const fileArray = this.multipleSelection.filter(row => !row.dir);
        // for (let i = 0; i < fileArray.length; i += 1) {
        //   showWindow(downloadFileURL(fileArray[i].id));
        // }
        // 优雅下载
        //若文件包含子文件，把所有的id存放在一个数组
        var downloadIds = [];
        var fileId = '';
        var objectProperties = {};
        for(let j = 0; j < fileArray.length; j++) {
          fileId = fileArray[j].id;  //获得需要下载的id
          objectProperties = await getdataDetail(fileId) //获得文件下的子文件
          if (objectProperties.children.length > 0) {
            objectProperties.children.forEach((val)=>{
              downloadIds.push(val.id);
            })
          }
          downloadIds.push(fileId)
        }
        let i = 0;
        showWindow(downloadFileURL(downloadIds[i]));
        const timer = setInterval(() => {
          i ++;
          if (i >= downloadIds.length) { clearInterval(timer);return; }
          showWindow(downloadFileURL(downloadIds[i]));
        }, 1000);
      }
    },
    editData(fileObject) {
      this.activeFile = fileObject;
      this.$refs.EditDMData.show();
    },
    showServiceList(fileObject) {      
      this.activeFile = fileObject;
      this.$refs.ShowServiceList.show();
    },
    publish(fileObject) {
      this.activeFile = fileObject;
      this.$refs.publicationDataDialog.show();
    },
    /**
      * 预览
      */
    preview() {
      for (let i = 0; i < this.multipleSelection.length; i += 1) {
        const multipleSelection = this.multipleSelection[i];
        this.previewOne(multipleSelection);
      }
    },
    previewOne(file) {
      previewFile(file);
    },
    isAllow(ext) {
      return config.publish.isCan(ext);
    },
    getFileIcon(ext) {
      if (!ext) {
        return;
      }
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
    /**
      * 删除文件
    */
    deleteFiles() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.dataManagerLoading = true; // 删除操作触发laoding界面
          const ids = this.multipleSelection.map(item => item.id);
          deleteFiles(ids).then(res => {
            if (res) {
              let result = '';
              res.forEach(val => {
                result += `${val}、`;
              });
              this.$message.warning({ message: `数据被图层${result}占用，请先删除图层`, showClose: true });
              this.dataManagerLoading = false; // 删除完成去除laoding界面
              return;
            }
            this.$emit('removeFolderTree', ids);
            this.renameInputName = '';
            this.dataManagerLoading = false; // 删除完成去除laoding界面
            // if (res.code === 1) {
              this.listChange();
              this.$message.success({ message: '删除成功', showClose: true });
            // }
          }).catch(() => {
            this.dataManagerLoading = false; // 删除完成去除laoding界面
          });
        });
      }
    },
    /**
      * 创建文件夹
    */
    createNewFolder() {
      if (!this.isTableEditing) {
        this.filesData.unshift({ dir: true, fileName: '新建文件夹', isCreating: true });
        this.isTableEditing = true;
      }
      if (this.isTableEditing) {
        this.$nextTick().then(() => {
          this.$refs.newFolderInput.select();
          this.$refs.newFolderInput.$el.scrollIntoView();
        });
      }
    },
    /**
      * 提交创建文件夹
    */
    async submitCreateFolder(row) {    
      this.isClick = true
      setTimeout(()=>{
        this.isClick = false
      },2000); 
      const name = row.fileName.replace(/^\s+|\s+$/g,"");
      if (!name || name.length < 1) {
        this.$message.error({ message: '不能建立空文件夹', showClose: true });
        return;
      }
      if (name.length > 255) {
        this.$message.error({ message: '文件(夹)名称长度不能超过255字节', showClose: true });
        return;
      }
      if (/[\\/\\"<>:\\?|\\*]/gi.test(name)) {
        this.$message.error({ message: '文件名(文件)不能包含以下字符：< > : | * ? / " \\', showClose: true });
        return;
      }
      if (this.renameInputName === name ) {
        this.$set(row, 'isCreating', false);
      } else {
        if ('id' in row) {
          const node = await renameFile(row.id, name, row.dir, this.lastPathId);
          this.$emit('editFolderTree', node);
        } else {
          const newObj = await fileCreateNewFolder(name, this.lastPathId);
          this.$emit('createNewFolderTree', newObj);
        }
      }
      this.listChange();
      this.isTableEditing = false;
    },
    /**
      * 取消创建
      * @TODO 取消
      * @param index
    */
    cancelCreateFolder(row) {
      if ('id' in row) {
        this.$set(row, 'isCreating', false);
      } else {
        this.$delete(this.filesData, this.filesData.findIndex(item => !item.id));
      }
      this.listChange();
      this.isTableEditing = false;
    },
    /**
       * 表格选中改变事件
       * @param value
       */
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
    /**
      * 重命名
    */
    rename() {
      // 只有一行被选中的时候 才可以重命名
      if (this.multipleSelection.length === 1) {
        this.isTableEditing = true;
        const index = this.filesData.findIndex(item => item.id === this.multipleSelection[0].id);
        this.filesData[index].isCreating = true;
        this.$set(this.filesData, index, this.filesData[index]);
      }
    },
    /**
      * 移动到新文件夹
    */
    moveToFolder(isMoveOrCopy) {
      this.isMoveOrCopy = isMoveOrCopy;
      this.folderDialogTitle = this.isMoveOrCopy ? '移动到' : '复制到';
      this.folderSelectComponent.show();
      this.$nextTick().then(() => {
        this.folderSelectComponent.init();
      });
    },
    /**
      * 提交移动
    */
    async submitFolderSelect(node) {
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection.map(item => item.id);
        this.folderSelectLoading = true;
        // let result = null;
        if (this.isMoveOrCopy) {
          // result = await moveFiles(ids, node.id);
          moveFiles(ids, node.id).then(() => {
            this.listChange();
            this.folderSelectComponent.hide();
            this.$emit('initTree');
            this.folderSelectLoading = false;
          }).catch(() => {
            // this.$message.error({ message: '操作失败', showClose: true });
            this.folderSelectLoading = false;
          });
        } else {
          // result = await copyFiles(ids, node.id);
          copyFiles(ids, node.id).then(() => {
            this.listChange();
            this.folderSelectComponent.hide();
            this.$emit('initTree');
            this.folderSelectLoading = false;
          }).catch(() => {
            // this.$message.error({ message: '操作失败', showClose: true });
            this.folderSelectLoading = false;
          });
        }        
      }
    },
    /**
      * 分享
    */
    share() {
      this.$refs.userDialog.show();
    },
    async checkedUser(users) {
      if (users.length < 1) {
        return;
      }
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection.map(item => item.id);
        const result = await shareFile(ids, users.map(item => item.id));
        if (result === 1) {
          this.$message.success({ message: '分享完成', showClose: true });
        }
      }
    },
    /**
      * 搜索
    */
    searchFile() {
      this.isSearchFile = true;
      this.listChange();
      this.filePaths = [];
      this.filePaths.push({ fileName: `搜索"${this.searchText}"` });
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
    showInfoDialog(fileObject) {
      this.activeFile = fileObject;
      this.$refs.fileInfoDialog.visible = true;
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
        this.pageSize, this.isSearchFile ? -1 : (this.lastPathId || -1),
        this.isSearchFile ? this.searchText : null, this.orderProp.prop, this.orderProp.order === 'ascending' ? 'asc' : 'desc');
      if (pageResult.items.length === 0 && this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        pageResult = await pageFiles(this.currentPage,
         this.pageSize, this.isSearchFile ? -1 : (this.lastPathId || -1),
         this.isSearchFile ? this.searchText : null, this.orderProp.prop, this.orderProp.order === 'ascending' ? 'asc' : 'desc');
      }
      this.tableLoading = false;
      this.currentPage = pageResult.page || 1;
      this.total = pageResult.total;
      this.filesData = pageResult.items;
      this.isTableEditing = false;
    },
    fileChange(file) {
      if (file.size > 0) {
        this.dialogVisible = true;
        this.minUploadPanel = false;
        this.$set(file, 'parentId', this.lastPathId);
        this.$set(file, 'filesType', store.getters.fileType);
        this.fileList.push(file);
        this.uploader.makeThumb(file, (error, ret) => {
          if (!error) {
            this.$set(file, 'thumb', ret);
          }
        });
      } else {
        this.$message.error({ message: '文件大小为0,不能上传!', showClose: true });
      }
    },
    onUploadFinished() {
      this.fileList = this.uploaderComponent.getNotDelFiles();
      this.$store.dispatch('getIsInLoaing', {state: false});
    },
    onUploadError(file) {
      file.setStatus(file.getStatus(), file.statusText || '上传失败');
      this.fileList = this.uploaderComponent.getNotDelFiles();
      this.$store.dispatch('getIsInLoaing', {state: false});
    },
    onError(message) {
      this.$message.error({ message: message, showClose: true });
      this.$store.dispatch('getIsInLoaing', {state: false});
    },
    onUploadcomplete() {
      this.fileList = this.uploaderComponent.getNotDelFiles();
      this.$store.dispatch('getIsInLoaing', {state: false});
    },
    onUploadSuccess() {
      this.listChange();
      this.$store.dispatch('getIsInLoaing', {state: false});
    },
    onUploadStart(file) {
      const els = this.$refs[file.id];
      if (els && els.length > 0) {
        this.$refs[file.id][0].scrollIntoView(false);
      }
      this.fileList = this.uploaderComponent.getNotDelFiles();
      this.$store.dispatch('getIsInLoaing', {state: true});
    },
    onProgress(file, percent) {
      this.$set(file, 'percent', Number((percent * 100).toFixed(2)));
    },
    retry(file) {
      this.$store.dispatch('setFileType', { state: file.filesType });
      this.uploader.retry(file);
    },
    resume(file) {
      this.uploader.upload(file);
    },
    remove(file) {
      // 取消并中断文件上传
      this.uploader.cancelFile(file);
      // 在队列中移除文件
      this.uploader.removeFile(file, true);
      // 在ui上移除
      const index = this.fileList.findIndex(ele => ele.id === file.id);
      this.$delete(this.fileList, index);
    },
    formatterSize(row, index, cellValue) {
      return !cellValue ? '-' : this.uploaderComponent.formatSize(cellValue);
    },
    hideUploadDialog() {
      this.dialogVisible = false;
    },
    closeUploadDialog() {
      const stats = this.uploader.getStats();
      if ((stats.progressNum + stats.queueNum) > 0) {
        this.$confirm('有文件在上传中,是否关闭？')
          .then(() => {
            this.uploader.reset();
            this.fileList = [];
            this.hideUploadDialog();
          })
          .catch(() => {
          });
      } else {
        this.hideUploadDialog();
      }
    },
    minOrMaxUploadPanel() {
      this.minUploadPanel = !this.minUploadPanel;
    },
    uploadInput() {
      return jQuery('.upload-btn').find('.webuploader-element-invisible');
    },
    handleCommand(command) {
      switch (command) {
        case 'directory':
          this.uploadInput().attr('directory', '');
          this.uploadInput().attr('webkitdirectory', '');
          this.uploadInput().trigger('click');
        break;
        case 'scanstorage':
          this.$router.push(`/scanStorage/${window.location.href.slice(window.location.href.lastIndexOf('/') + 1,
           window.location.href.length)}`);
        break;
        default:
          this.$store.dispatch('setFileType', { state: command });
          this.uploadInput().attr('accept', this.fileExtension[command]);
          this.uploadInput().attr('directory', null);
          this.uploadInput().attr('webkitdirectory', null);
          this.uploadInput().trigger('click');
        break;
      }
    },
  },
};
</script>

<style lang="scss">
  @import "../styles/color";

  .oper-btns {
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

  .file-manager-container {
    .nav-file-header {
      & * {
        font-size: 0.8rem;
        line-height: 14px;
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
    > .el-main {
      padding: 10px 0px;
      .el-table th {
        padding: 7px 0px;
      }
      .el-table th:nth-child(6) {
        .cell {
          text-align: center;
        }
      }
    }
  }
  .el-pagination {
    padding: 0px 5px
  }
  .upload-dialog {
    position: absolute !important;
    bottom: 0;
    right: 30px;
    margin: 0;
    border-radius: 7px 7px 0 0;
    z-index: 20000;
    margin-top: 0 !important;
    width: auto;
    .el-card__header {
      padding: 10px;
      border-bottom: 1px solid #c0ccda;
      .min-btn {
        float: right;
        cursor: pointer;
      }
    }
    .el-card__body {
      padding: 0px;
      max-height: 349px;
      width: 600px;
      overflow-y: auto;
      .el-upload-list__item {
        border-radius: 0;
        border-left: none;
        border-right: none;
        border-top: none;
        margin-top: 0;
        .fa {
          display: none;
          position: absolute;
          cursor: pointer;
          opacity: .75;
          top: 5px;
          color: #606266;
        }
        &:hover {
          .fa {
            display: block;
            &.fa-undo {
              display: none;
              right: 25px;
            }
            &.fa-pause {
              right: 25px;
            }
            &.fa-play {
              right: 25px;
            }
          }
        }
        &.is-success {
          .el-upload-list__item-name {
            i {
              display: block;
            }
            img {
              float: left;
            }
          }
        }
        &.is-error {
          &:hover {
            .el-upload-list__item-status-label {
              display: none;
            }
            .fa-undo {
              display: block;
            }
          }
          .el-upload-list__item-status-label {
            display: block;
            background-color: #ff0000;
          }
        }
        .el-progress-bar__outer {
          height: 6px !important;
        }
      }
    }
    .el-upload-list--picture .el-upload-list__item-name i {
      font-size: 40px;
      left: 23px;
      padding-top: 4px;
    }
    .el-upload-list--picture .el-upload-list__item-name {
      margin-top: -4px;
      line-height: 30px;
      margin-left: 60px;
      > span {
        display: inline-block;
        width: 335px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
        padding-top: 8px;
      }
    }
    .el-upload-list--picture .el-upload-list__item {
      padding: 10px 20px 10px 20px;

    }
    .el-upload-list__item .el-progress__text {
      top: -20px;
    }
    .el-upload-list--picture .el-progress {
      width: 450px;
      left: 65px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name {
    line-height: 40px;
    margin-top: 5px;
  }
  .vue-contextmenu-listWrapper {
    font-size: small;
    text-align: center;
    width: 100px;
    height: auto;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) !important;
  }
  .vue-contextmenu-listWrapper .context-menu-list {
    width: 100px !important;
    height: 40px !important;
  }
  .vue-contextmenu-listWrapper .context-menu-list button {
    width: 100% !important;
    height: 100% !important;
    color: #606266 !important;
  }
  .vue-contextmenu-listWrapper > .context-menu-list > button:hover {
    background: #edf5fe !important;
    color: #66b1ff !important;
    border-radius:0px !important;
    border: 0px solid red !important;
    box-shadow: 0 0px 0px 0 red !important;
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
        width: calc(100vw / 2 - 535px);
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
</style>
<style>
  .el-input--small .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
  .el-button--mini, .el-button--mini.is-round {
    padding: 9px 14px;
    vertical-align: top;
  }
  .fa {
    margin-right: 3px;
  }
  .el-message-box__btns button:nth-child(1) {
    margin-left: 10px;
    float: right;
  }
</style>
<style scoped>
  @media screen and (max-width: 1440px) {
    .el-button--small, .el-button--small.is-round {
      padding: 9px 10px;
    }
  }
</style>
