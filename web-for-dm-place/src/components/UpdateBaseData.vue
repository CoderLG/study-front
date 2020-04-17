<template>
	<div>
    <div class="update-data-title">
			<ul>
				<li @click='goBack'>返回</li>
			</ul>
    </div>
    <div class="uptate-data-select">
      <span>服务类型：</span>
      <el-select v-model="serviceType" :disabled='true'
        size='small' placeholder="请选择">
        <el-option v-for='(li, index) in servicetype'
          :key='index' :value='li.value' :label="li.name"></el-option>
      </el-select>
      <span>数据源：</span>
      <el-select v-model="dataSourceType" :disabled='disabled' size='small'
        placeholder="请选择" @change="checkedData = '' ">
        <el-option v-for='(li, index) in dataSource' :key='index'
          :value='li.value' :label="li.name"></el-option>
      </el-select>
    </div>
    <div class="update-data-main">
      <el-steps :active="active" finish-status="success">
        <el-step title="选择服务"></el-step>
        <el-step title="选择数据"></el-step>
        <el-step title="设置参数"></el-step>
        <el-step title="更新完成"></el-step>
      </el-steps>
      <div class="update-data-step">
        <div v-show='stepModule[0]' class="update-data-step-table">
          <!-- <el-table
            :data="serverTableData"
            :show-header="false"
            style="width: 100%"
            align='right'
            size="mini">
            <el-table-column
              width="200"
              align="left"
              prop="name">
            </el-table-column>
            <el-table-column
              width="550"
              align="left"
              prop="value">
            </el-table-column>
          </el-table> -->
          <table>
            <tr v-for='(li, index) in serverTableData' :key='index'>
              <td>{{ li.name }}</td>
              <td>{{ li.value }}</td>
            </tr>
          </table>
        </div>
        <div v-show='stepModule[1]'>
          <el-button type="primary" size="mini" @click='showServerDirectory'>选择数据</el-button>
          <!-- <span v-if='checkedData'>{{ checkedData.path }}</span> -->
          <span v-if='checkedData' :title='checkedData.fileRealPath' class='long-text-style'>
            <span :title='serverPath'>根目录</span>
              {{ this.checkedData.fileRealPath.slice(serverPath.length, this.checkedData.fileRealPath.length) }}
           </span>
          <div class="update-data-step-tipe">
            <p>* 更新基础服务将使用新数据生成并替换原服务的部分瓦片，且该操作不可逆，请确保选择正确的数据。</p>
            <p>* 强烈建议您在更新前备份数据</p>
          </div>
          <ServerDirectoryDialog ref='serverDirectoryDialog' :breadcrumb='breadcrumb' :checkFolder='isCheckFolder' :rootUrl='rootUrl' @makeSure='makeSure' :importExportType='importExportType'></ServerDirectoryDialog>
        </div>
        <div v-show='stepModule[2]' class="stepModule-setParams">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="服务名称">
              <span>{{ form.layerName }}</span>
            </el-form-item>
            <el-form-item label="数据位置">
              <span :title='checkedData.fileRealPath' class='long-text-style'>
                <span :title='serverPath'>根目录</span>
                {{ form.dataLocation }}
              </span>
            </el-form-item>
            <el-form-item label="瓦片格式">
              <!-- <el-checkbox-group v-model="form.mimeType">
                <el-checkbox :label="form.mimeType[0]" name="type" disabled></el-checkbox>
              </el-checkbox-group> -->
              <el-radio-group v-model="form.mimeType[0]">
                <el-radio :label="form.mimeType[0]"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="格网集">
              <!-- <el-checkbox-group v-model="form.gridSet">
                <el-checkbox :label="form.gridSet[0]" name="type" disabled></el-checkbox>
              </el-checkbox-group> -->
              <el-radio-group v-model="form.gridSet[0]">
                <el-radio :label="form.gridSet[0]"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="层级范围" class="publish-data-level">
              <el-input v-model.number="form.minLevel[0]" disabled></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="form.maxLevel[0]" disabled></el-input>
              <span v-if='form.gridSet[0] === "EPSG:3857"'> &nbsp;有效的层级范围：0-30</span>
              <span v-else > &nbsp;有效的层级范围：0-21</span>
            </el-form-item>
            <el-form-item label="立即切片">
              <el-switch v-model="form.sliceTile" disabled></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div v-show='stepModule[3]'>
          <h1><i class="el-icon-success"></i>服务更新完成！</h1>
          <el-form ref="form" :model="form" label-position='left'
           label-width="80px" class='update-data-success'>
            <el-form-item label="服务名称">
              <span>{{ form.layerName }}</span>
            </el-form-item>
            <el-form-item label="数据位置">
              <span :title='checkedData.fileRealPath' class='long-text-style'>
                <span :title='serverPath'>根目录</span>
                {{ form.dataLocation }}
              </span>
            </el-form-item>
            <el-form-item label="瓦片格式">
              <span>{{ form.mimeType[0] }}</span>
            </el-form-item>
            <el-form-item label="格网集">
              <span>{{ form.gridSet[0] }}</span>
            </el-form-item>
            <el-form-item label="层级范围">
              <span>{{ form.minLevel[0] }} - {{ form.maxLevel[0] }} </span>
            </el-form-item>
          </el-form>          
        </div>
      </div>
      <!-- <div class="update-data-footer" v-if='!isUpdataSuccess'>
        <el-button type="primary" size='small' @click="prevStep">上一步</el-button>
        <el-button type="primary" size='small' @click="nextStep">下一步</el-button>
      </div>
      <div class="update-data-footer" v-else>
        <el-button type="primary" size='small' @click="goBack">查看基础影像列表</el-button>
      </div> -->
      <div class="update-data-footer" v-show='isPublish[0]'>
        <el-button type="primary" size='small' @click="nextStep">下一步</el-button>
        <el-button size='small' @click="goBack">取消</el-button>
      </div>
      <div class="update-data-footer" v-show='isPublish[3]'>
        <el-button size="small" @click="prevStep">上一步</el-button>
        <el-button type="primary" size='small' @click="nextStep">下一步</el-button>
        <el-button size='small' @click="goBack">取消</el-button>
      </div>
      <div class="update-data-footer" v-show='isPublish[1]'>
        <el-button size="small" @click="prevStep">上一步</el-button>
        <el-button type="primary" size="small" @click="nextStep">更新服务</el-button>
        <el-button size="small" @click="goBack">取消</el-button>
      </div>
      <div class="update-data-footer" v-show='isPublish[2]'>
        <el-button type="primary" size='small' @click="goBack">查看基础影像列表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ServerDirectoryDialog from './ServerDirectoryDialog'
import { updateBaseImage } from '../api/imageApi';
import { getFilePath, getServerPath } from '../api/fileApi';

export default {
  data() {
    return {
      active: 0,
      stepModule: [true, false, false, false],
      servicetype: [
        { name: '基础影像服务', value: '基础影像服务' },
        { name: '地形服务', value: '地形服务' },
      ],
      serviceType: '基础影像服务',
      dataSource: [
        // { name: '数据管理', value: '数据管理' },
        { name: 'TIF 目录', value: 'TIF 目录'},
        { name: 'TIF/IMG文件', value: 'TIF/IMG文件' },
      ],
      dataSourceType: 'TIF 目录',
      disabled: false,
      breadcrumb: '#/servicemanager',
      rootUrl: 'null',
      isShowServerDirectory: false, // 是否显示服务器目录
      // checkedDataPath: '', // 选中的数据的服务器地址
      serverTableData: [], // 服务详情表
      checkedData: '', // 选中的数据
      isUpdataSuccess: false, // 是否更新成功
      isPublish: [true, false, false, false], // 判断是否已发布
      isCheckFolder: true, //是否需要勾选文件夹
      form: {
        layerName: '',
        dataName: '',
        mimeType: [''],
        gridSet: [''],
        minLevel:'',
        maxLevel:'',
        sliceTile: true,
        dataLocation:'',
      },
      importExportType: '1', // 用于数据的导入导出
      serverPath: '', //选择数据的根目录
    };
  },
  props: {
    row: {
      type: Object,
    },
    rowInfoToke: {
      type: Boolean,
    },
  },
  async mounted() {
      this.serverPath = await getServerPath();
    },
  watch: {
    rowInfoToke() {
      const imagesFileTab = {
        layerName: '图层名称',
        mimeType: '瓦片格式',
        gridSet: '格网集',
        minmaxLevel:'层级范围',
        // tileType: '瓦片类型',
        // tileLayerType: '图层类型',
        // minLevel: '最小层级',
        // maxLevel: '最大层级',
        // tileStatus: '切片状态',
        // minX: '最小经度',
        // minY: '最小纬度',
        // maxX: '最大经度',
        // maxY: '最大纬度',
        // validArea: '有效区域',
      };
      this.addTab(this.row, imagesFileTab);
      this.active = 0;
      this.stepModule = [true, false, false, false];
      this.isUpdataSuccess = false;
      this.isPublish= [true,false, false, false];
    },
    dataSourceType() {
      if (this.dataSourceType === 'TIF 目录') {
        this.isCheckFolder = true; // 需要勾选文件夹
      } else {
        this.isCheckFolder = false; // 默认不需要勾选文件夹
      }
    }
  },
  methods: {
    // 上一步
    prevStep() {
      this.stepModule = [false, false, false];
      if (this.active < 3) this.disabled = false;
      if (this.active-- < 1) this.active = 0;
      if (this.active === 3) { this.active = 2; this.stepModule[2] = true; return; }
      this.stepModule[this.active] = true;
      if(this.active === 1){
        this.isPublish= [false, false, false, true];
      }else if(this.active === 0){
        this.isPublish= [true, false, false, false];
      }
    },
    // 下一步
    async nextStep() {      
      if (this.active === 1 && !this.checkedData) {this.$message.warning({ message: '请选择一条数据', showClose: true }); return;}
      if (this.active > 0) this.disabled = true;
      //  this.isPublish= [false, true];
      if (this.active === 0) {
        this.isPublish= [false, false, false, true];
      } else if (this.active === 1) {
        this.form.dataName = this.checkedData.path.slice(this.checkedData.path.lastIndexOf('/') + 1, this.checkedData.path.length);
        this.form.layerName = this.row.layerName;
        this.form.mimeType = [`${this.row.mimeType}`];
        this.form.gridSet = [`${this.row.gridSet}`];
        this.form.minLevel = [`${this.row.minLevel}`];
        this.form.maxLevel = [`${this.row.maxLevel}`];
        this.form.dataLocation = this.checkedData.fileRealPath.slice(this.serverPath.length, this.checkedData.fileRealPath.length);
        this.isPublish= [false, true, false, false];
      } else if (this.active === 2) {
        await updateBaseImage(this.row.id, encodeURI(this.checkedData.path));
        this.isUpdataSuccess = true;
        this.isPublish= [false, false, true, false];
      }
      this.stepModule = [false, false, false, false];        
      if (this.active++ > 1) { this.active = 4; this.stepModule[3] = true; return; }      
      this.stepModule[this.active] = true;
    },
    // 转换英文描述
    addTab(tabObject, fileDalias) {
      const tableDataOne = [];
      Object.keys(fileDalias).forEach((key) => {
         if(fileDalias[key] === '层级范围'){
          tableDataOne.push({ name: fileDalias[key], value: tabObject.minLevel + '-' +  tabObject.maxLevel });
        } else if (tabObject[key]) {
          tableDataOne.push({ name: fileDalias[key], value: tabObject[key] });
        }
      });
      this.serverTableData = tableDataOne;
    },
    // 返回
    goBack() {
      this.disabled = false;
      this.checkedData = '';
      this.$emit('goBack');
    },
    // 选择数据
    async showServerDirectory() {
      if (this.dataSourceType === '数据管理'){
        const dmUrl = await getFilePath(-1);
        this.rootUrl = dmUrl.resultInfo;
      } else {
        this.rootUrl = 'null';
      }
      this.$refs.serverDirectoryDialog.checkTargetFile = true;
    },
    // 选择完数据点击确定
    makeSure(checkedTableData) {
      if (checkedTableData.path) {
        this.checkedData = checkedTableData;
        this.$refs.serverDirectoryDialog.checkTargetFile = false;        
      } else {
        this.$message.warning({ message: '请选择一条数据', showClose: true });
      }
    },
  },
  components: {
    ServerDirectoryDialog,
  },
};
</script>

<style lang="scss">
.update-data-title{
	width: 100%;
  height: 50px;
  border-bottom: 1px solid #ecebeb;
  padding-left: 25px;
	ul {
		li {
			a {
				display: inline-block;
				color: #606060;
			}
			float: left;
			font-size: 18px;
			font-weight: 700;
			line-height: 50px;
			cursor: pointer;
			i {
				font-weight: 700;
				color: #606060;
			}
		}
	}
}
.uptate-data-select {
  height: 60px;
  padding-left: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ecebeb;
  .el-select {
    width: 160px !important;
    margin-right: 20px;
  }
  .el-input--small .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
}
.update-data-main {
  padding-left: 155px;
  .el-table__body, .el-table__footer, .el-table__header {
    width: 100% !important;
  }
  .el-table th.is-left {
    padding-left: 0px !important;
  }
  >div {
    > img {
      margin: 20px 0px;
    }
  }  
  .checkedDataTree {
    height: calc(70vh - 155px);
    overflow-y: scroll;
    margin-bottom: 15px;
  }
  .el-dialog__body {
    text-align: left;
  }
  .el-dialog__header {
    padding: 0px;
    background: #0c8bde;
    text-align: center;
    line-height: 50px;
    .el-dialog__title {
      color: white;
    }
    .el-dialog__headerbtn {
      top: 16px;
      .el-dialog__close {
        color: white;
      }
    }
  }
  h1 {
    font-size: 36px;
    color: #24A5F8;
    padding-left: 36px;
    i {
      color: #67c23a;
      margin-right: 16px;
      font-size: 27px !important;
    }
  }
  .el-steps--horizontal {
    width: calc((100vw / 100 * 70) - 270px);
    margin: 20px 0px 20px 0px;;
  }
  .el-step__icon {
    width: 35px;
    height: 35px;
  }
  .el-step__icon.is-text {
    border-width: 2px;
  }
  .el-step.is-horizontal .el-step__line {
    top: 17px;
  }
  .el-step__icon-inner {
    font-size: 23px;
  }
  .el-table .cell {
    line-height: 30px;
    font-size: 13px;
  }
  .el-table {
    position: unset;
  }  
  .update-data-step {
    height: calc(100vh - 325px);
    overflow-y: auto;
    .update-data-step-table {
      .el-table td, .el-table th.is-leaf {
        border-bottom-width: 0px;
      }
      .el-table__body-wrapper {
        height: calc(100vh - 340px) !important;
      }
      font-size: 14px;
      padding-top: 15px;
      tr td:first-of-type {
        width: 100px;
        color: #453e3e;
        font-weight: 700;
      }
      tr td {
        padding-top: 15px;
      }
    }
    .update-data-step-tipe {
      color: red;
      font-size: small;
      margin-top: 20px;
    }
    .long-text-style {
      width: calc(100% - 85px);
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h1 {
      font-size: 36px;
      color: #24A5F8;
      line-height: 66px;
      padding-left: 0px;
      i {
        color: #67c23a;
        font-size: 27px !important;
      }
    }
    .update-data-success {
      .el-form-item__label {
        width: 100px;
        color: #453e3e;
        font-weight: 700;
      }
      .el-form-item {
       margin-bottom: 0px;
      }
    }
    .stepModule-setParams{
      .el-form-item__label {
        text-align: left;
        float: left;
        font-size: 14px;
        color: #453e3e;
        font-weight: 700;
        line-height: 40px;
        padding: 0px 15px 0px 0px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .el-form-item {
        margin-bottom: 0px;
      }
      .publish-data-level {
        .el-input {
          width: 125px !important;
        }
        .el-form-item__content {
          margin-left: 45px !important;
        }
      }
    }
  }
  .update-data-footer {
    width: calc((100vw / 100 * 70) - 270px);
    text-align: center;    
  }
  .el-step.is-horizontal .el-step__line {
    left: 70px;
    right: 20px;
  }
  .el-step__head {
    padding-left: 15px;
  }
}
</style>
