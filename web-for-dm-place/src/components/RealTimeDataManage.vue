<template>
  <div>
    <!--实时数据服务-->
    <RealTimeDataService v-show='showMain[0]' ref='RealTimeDataService'
     @servicePublic='servicePublic'></RealTimeDataService>
    <!--实时数据发布-->
    <PublishServiceForRealTime v-show='showMain[4]' @goBack='goBackRealTime' ref='PublishServiceForRealTime'></PublishServiceForRealTime>
    <!--脚本管理-->
    <ScriptManage v-show='showMain[1]' ref='scriptTableManage'
     @addScriptTable='addScriptTable' @editScriptCon='editScriptCon'></ScriptManage>
    <!--新增脚本-->
    <NewScript v-show='showMain[2]' ref="newScriptChild" @goBack='goBackPrev("script")'></NewScript>
    <!--编辑脚本-->
    <EditScript v-show='showMain[3]' :scriptId='scriptId' :refresh='refreshScript' @goBack='goBackPrev("script")'></EditScript>
    <!--围栏管理-->
    <FenceManage v-show='showMain[5]' ref='fenceTableManage'
     @addFenceTable='tabMain("13-7");' @previewFenceArea='previewFenceArea' @destroyComponent='destroyComponent'></FenceManage>
    <!--新增围栏-->
    <NewFence v-show='showMain[6]' ref="newFenceChild" @goBack='goBackPrev("fence")'></NewFence>
    <!--预览围栏-->
    <PreviewFence v-show='showMain[13]' ref='previewFence' @goBack='goBackPrev("fence")'></PreviewFence>
    <!--数据源管理-->
    <!-- <SourceManage v-show='showMain[7]' ref='sourceTableManage'
     @addSourceTable='tabMain("13-9")' @editSourceCon='editSourceCon'></SourceManage> -->
    <!--新增数据源-->
    <!-- <NewSource v-show='showMain[8]' ref="newSourceChild" @goBack='goBackPrev("source")'></NewSource> -->
    <!--编辑数据源-->
    <!-- <EditSource v-show='showMain[9]' :ssId='sourceId' @goBack='goBackPrev("source")'></EditSource> -->
    <!--目标类型管理-->
    <!-- <TargetManage v-show='showMain[10]' ref='targetTableManage'
     @addTargetTable='tabMain("13-12")' @editTargetCon='editTargetCon'></TargetManage> -->
    <!--新增目标管理-->
    <!-- <NewTarget v-show='showMain[11]' ref="newTargetChild" @goBack='goBackPrev("target")'></NewTarget> -->
    <!--编辑目标管理-->
    <!-- <EditTarget  v-show='showMain[12]' :tmId='targetId' @goBack='goBackPrev("target")'></EditTarget> -->
    <!--数据统计-->
    <RealDataStatistics v-show='showMain[14]' ref='realDataStatistics'></RealDataStatistics>
  </div>
</template>

<script>
import RealTimeDataService from './RealTimeDataService';
import PublishServiceForRealTime from './PublishServiceForRealTime';
import ScriptManage from './ScriptManage';
import NewScript from './NewScript';
import EditScript from './EditScript';
import SourceManage from './SourceManage';
import NewSource from './NewSource';
import EditSource from './EditSource';
import TargetManage from './TargetManage';
import NewTarget from './NewTarget';
import EditTarget from './EditTarget';
import FenceManage from './FenceManage';
import NewFence from './NewFence';
import PreviewFence from './PreviewFence';
import RealDataStatistics from './RealDataStatistics';

export default {
  components: {
    RealTimeDataService,
    PublishServiceForRealTime,
    ScriptManage,
    NewScript,
    EditScript,
    SourceManage,
    NewSource,
    EditSource,
    TargetManage,
    NewTarget,
    EditTarget,
    FenceManage,
    NewFence,
    PreviewFence,
    RealDataStatistics,
  },
  data() {
    return {
      showMain: [true, false, false, false, false],
      scriptId: null,
      sourceId: null,
      targetId: null,
      refreshScript: false,
    }
  },
  methods: {
    tabMain(index, id) {
      const num = (Number(index.slice(index.indexOf('-')+1, index.length)) - 1).toString();
      this.showMain = [false, false, false, false, false, false, false, false, false, false, false];
      if (num) this.showMain[Number(num)] = true;
      switch (num) {
        case '0':
          this.$refs.RealTimeDataService.init();
          break;
        case '1':
          this.$refs.scriptTableManage.init();
          break;
        case '3':
          this.scriptId = id;
          this.refreshScript = !this.refreshScript;
          break;
        case '5':
          this.$refs.fenceTableManage.init();
          break;
        case '6':
          this.$refs.newFenceChild.init();
          this.isAddFence = !this.isAddFence;
          break;
        case '7':
          this.$refs.sourceTableManage.init();
          break;
        case '9':
          this.sourceId = id;
          break;
        case '10':
          this.$refs.targetTableManage.init();
          break;
        case '12':
          this.targetId = id;
          break;
        case '13':
          this.$refs.previewFence.init(id);
          break;
        case '14':
          this.$refs.realDataStatistics.init();
          break;
      }
    },
    destroyComponent() {
      this.$refs.newFenceChild.destroyComponent();
    },
    // 发布按钮点击默认为实时数据
    servicePublic() {
      this.tabMain('13-5');
      this.$refs.PublishServiceForRealTime.init();
    },
    //点击添加脚本
    addScriptTable() {
      this.tabMain("13-3");
      this.$refs.newScriptChild.init();
    },
    // 编辑脚本
    editScriptCon(id) {
      this.tabMain('13-4', id);
    },
    // 预览围栏
    previewFenceArea(id) {
      this.tabMain('13-14', id);
    },
    goBackRealTime() {
      this.tabMain('13-1');
    },
    goBackPrev(type) {
      this.$emit('goBackPrev', type);
    },
    //编辑数据源
    editSourceCon(id){
      this.tabMain('13-10', id);
    },
    //编辑目标类型
    editTargetCon(id){
      this.tabMain('13-13', id);
    },
    // 返回初始化状态
    setInit() {
      this.$refs.realDataStatistics.destroyStatisticsTimer();
    },
  }
};
</script>


