<template>
  <el-dialog title="发布数据" :visible.sync="publishdialogVisible" @open="open"
   class="publish-data-step" :close-on-click-modal='false'>
    <el-steps :active="active" finish-status="success" align-left>
      <el-step title="选择数据"></el-step>
      <el-step title="设置参数"></el-step>
      <el-step title="发布完成"></el-step>
    </el-steps>
    <div v-show='stepModule[0]' class="publication-data-auto-main">
      <file-info-dialog-step :dialogFormVisible='dialogFormVisible' :activeFile="activeFile"
        @analysisError='analysisError' @analysisSuccess='analysisSuccess'
        @tabVectorLayerName='tabVectorLayerName'></file-info-dialog-step>
    </div>
    <div v-show='stepModule[1]' class="publication-data-auto-main">
      <publication-data-auto :dialogFormVisiblePublish='dialogFormVisiblePublish'
        :activeFile="activeFile" :isPublishData='isPublishData' :vectorLayerInfo='vectorLayerInfo'
        @publishSuccess='publishSuccess' @publishError='publishError'></publication-data-auto>
    </div>
    <div v-show='stepModule[2]' class="publication-data-auto-main publication-data-auto-main-finish">
      <h1><i class="el-icon-success"></i>发布成功！</h1>
      <el-tabs type="border-card">
        <el-tab-pane v-for='(li, index) in layerInfo' :key='index' :label="li.layerName">
          <el-row v-for='(item, num) in imagelayerKey' :key='num' v-if='li[item.value]'>
            <el-col :span="4">{{ item.title }}</el-col>
            <el-col :span="19">{{ li[item.value] }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">层级范围</el-col>
            <el-col :span="19">{{ li.minLevel }} - {{ li.maxLevel }}</el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div class="publication-data-btn">
      <el-button size='small' @click="publishdialogVisible = false" v-if='nextTtext === "确定"' >{{ nextTtext }}</el-button>
      <el-button size='small' @click="next" v-else type="primary">{{ nextTtext }}</el-button>
      <el-button size='small' @click="publishdialogVisible = false" v-if='prevTtext === "取消"'>{{ prevTtext }}</el-button>
      <el-button size='small' @click="prevStep" v-else>{{ prevTtext }}</el-button>
    </div> -->
    <div class="publication-data-btn" v-show='isPublish[0]'>
			<el-button type="primary" size="small" @click="next">下一步</el-button>
      <el-button size="small" @click="publishdialogVisible = false">取消</el-button>
		</div>
    <div class="publication-data-btn" v-show='isPublish[1]'>
			<el-button size="small" @click="prevStep">上一步</el-button>
      <el-button type="primary" size="small" @click="nextPublish">发布服务</el-button>
      <el-button size="small" @click="publishdialogVisible = false">取消</el-button>
		</div>
    <div class="publication-data-btn" v-show='isPublish[2]'>
			<el-button type="primary" size="small" @click='publishdialogVisible = false'>确定</el-button>
		</div>
  </el-dialog>
</template>

<script>
import PublicationDataAuto from './PublicationDataAuto';
import FileInfoDialogStep from './FileInfoDialogStep';

export default {
  props: {
    activeFile: {
      type: Object,
    },
  },
  data() {
    return {
      isPublish: [true, false, false], // 判断是否已发布
      publishdialogVisible: false,
      active: 0,
      stepModule: [true, false, false],
      prevTtext: '上一步',
      nextTtext: '下一步',
      dialogFormVisible: false, // 选择数据的显隐
      dialogFormVisiblePublish: false, // 设置参数的显隐
      isPublishData: false, // 用于触发发布数据使用
      layerInfo: [], // 所发图层的信息集合
      imagelayerKey: [
        { title: '图层名称', value: 'layerName'},
        { title: '瓦片格式', value: 'mimeType'},
        { title: '格网集', value: 'gridSet'},
        { title: '字符编码', value: 'chartCode'},
        { title: '样式表', value: 'styleName'},        
      ],
      vectorLayerInfo: {}, // 矢量shp的信息
      resolveFailed: true, // 是否解析失败
      // resolveMult: false, // 矢量解析出多条数据
    };
  },
  watch: {
    publishdialogVisible(isShow) {
      if (isShow) {
        this.dialogFormVisible = true;
      } else {
        this.dialogFormVisible = false;
      }
    },
  },
  methods: {
    show() {
      this.publishdialogVisible = true;
    },
    open() {
      this.active = 0;
      this.prevTtext = '取消'; this.nextTtext = '下一步';
      this.dialogFormVisiblePublish = false;
      this.stepModule = [true, false, false];
      this.isPublish = [true, false, false];
    },
    // 详情解析出现问题
    analysisError() {
      this.resolveFailed = true;
    },
    // 详情解析成功
    analysisSuccess() {
      this.resolveFailed = false;
    },
    // 上一步
    prevStep() {
      this.isPublish = [true, false, false];
      if (this.active === 1) { this.nextTtext = '下一步'; }
      if (this.active-- < 1) this.active = 0;
      if (this.active === 2) this.active = 1;
      this.stepModule = [false, false, false];
      this.stepModule[this.active] = true;
    },
    // 下一步
    next() {
      if (this.resolveFailed) {
        this.$message.warning({ message: '数据未解析成功，暂时无法发布', showClose: true });
      } else if (this.nextTtext === '下一步') {
        this.stepModule = [false, false, false];
        this.isPublish = [false, true, false];
        if (this.active === 0) { this.dialogFormVisiblePublish = true;this.active++; }
        // if (this.active === 0) { this.dialogFormVisiblePublish = true;this.nextTtext = '发布服务';this.active++; }
        // if (this.active++ > 0) { this.active = 3; this.stepModule[2] = true; this.isPublishData = true; this.prevTtext = '取消'; this.nextTtext = '查看发布的服务'; return; }
        this.stepModule[this.active] = true;
      }
    },
    // 发布
    nextPublish() {
      this.isPublishData = !this.isPublishData;      
    },
    publishSuccess(response) {
      // if (this.activeFile.dataType === 'vector') {
        // this.layerInfo = [response];
      // } else {
        this.layerInfo = [response];
      // }
      this.stepModule = [false, false, true];
      this.isPublish = [false, false, true];
      this.active += 2;
      // if (this.active++ > 0) { this.active = 3; this.stepModule[2] = true; this.prevTtext = '取消'; this.nextTtext = '确定'; return; }
    },
    publishError() {
      this.stepModule = [false, true, false];
    },
    // 切换多shp文件的矢量包中的layername
    tabVectorLayerName(currentName,tabIndex) {
      this.vectorLayerInfo = { 'name': currentName,'tabIndex':tabIndex };
    },
  },
  components: {
    PublicationDataAuto,
    FileInfoDialogStep,
  },
};
</script>

<style lang="scss">
.publish-data-step {
  .el-steps--horizontal {
    margin-bottom: 10px;
  }
  .el-table--border {
    height: calc(100vh - 473px);
    overflow-y: auto;
    min-height: 297px;
  }
  .publication-data-auto-main {
    height:calc(100vh - 468px);
    min-height: 297px;
    .el-form-item__label {
      text-align: left;
      color: #303133;
      font-weight: 700;
    }
    h1 {
      font-size: 36px;
      color: #24A5F8;
      i {
        color: #67c23a;
        margin-right: 16px;
        font-size: 27px !important;
      }
    }
  }
  .publication-data-auto-main-finish {
    .el-tabs--border-card {
      height: calc(100vh - 533px);
      box-shadow: none;
      margin-top: 10px;
      line-height: 30px;
      .el-tabs__content {
        height: calc(100vh - 580px);
        overflow-y: scroll;
      }
    }
  }
  .el-dialog__body {
    button {
      margin-top: 15px;
    }
    .el-tabs {
      min-height: 230px;
    }
    .el-tabs__content {
      min-height: 190px;
    }
  }
  .publication-data-btn {
    text-align: center;
  }
  .el-step.is-horizontal .el-step__line {
    left: 70px;
  }
  .el-step__head {
    padding-left: 20px;
  }
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    float: right;
    margin-right: 0px;
  }
}
</style>
