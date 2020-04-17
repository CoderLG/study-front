<template>
  <div class="layerGroupComponent">
    <el-main v-show='showMain === 0'>
      <div class="service-manage-title">数据处理</div>
      <el-form :inline="true" class='service-manage-title-search'>
        <el-form-item>
          <el-input v-model="taskName" placeholder="请输入内容" clearable size="small"></el-input>
          <el-button icon="el-icon-search" type="primary"
                     size="small"></el-button>
        </el-form-item>
        <el-button type="primary" size="small" @click="changeNewTaskTab(1)">新建任务</el-button>
        <el-button type="primary" plain size="small" icon='el-icon-refresh'
                   style="margin-left: 5px"
                   title='刷新数据列表' @click='getTask'></el-button>
      </el-form>
      <!--任务列表-->
      <el-table v-loading="dataListLoading" :data="dataList" highlight-current-row style="width: 100%;">
        <el-table-column prop="taskName" label="任务名称"
          align='left' sortable>
          <template slot-scope="scope">
            <p :title='scope.row.taskName'>{{ scope.row.taskName }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="mimeType" sortable align='center' width='120' label="瓦片格式">
          <template slot-scope="scope">
            {{  changeMimeType(scope.row.mimeType) }}
          </template>
        </el-table-column>
        <el-table-column prop="gridSet" sortable align='center' width='120' label="格网集">
          <template slot-scope="scope">
            EPSG:{{ scope.row.gridSet }}
          </template>
        </el-table-column>
        <el-table-column label="层级范围" width='120' align='center'>
          <template slot-scope="scope">
            {{ scope.row.minLevel === -1 ? '' : scope.row.minLevel }} - {{ scope.row.maxLevel === -1 ? '' : scope.row.maxLevel  }}
          </template>
        </el-table-column>
        <el-table-column prop="status" sortable align='center' width='120' label="处理状态">
          <template slot-scope="scope">
            {{ scope.row.status | status}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width='300' align='center'>
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="showDataServerDetail(scope.row)" plain>详情</el-button>
            <el-button size="small" type="primary" @click="publishTask(scope.row)" plain :disabled="scope.row.status !=='FINISHED'">发布</el-button>
            <el-button size="small" type="danger" @click="deleteTask(scope.row.id)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--任务列表分页-->
      <el-pagination
        background
        @current-change="taskCurrentChange"
        :page-size="taskPageSize"
        :total="taskNumber"
        layout="total, prev, pager, next">
      </el-pagination>
    </el-main>
    <el-main v-show='showMain === 1'>
      <NewTask :currentType='currentType' :isGoBackNew = 'isGoBackNew' @goBack="changeNewTaskTab(0)" ></NewTask>
    </el-main>
    <el-dialog title="详情" :visible.sync="isShowDetail" class="data-process-details-wrap">
      <div class="data-process-details">
        <table>
          <tr v-for='(li, index) in dataDetail' :key='index' :title=li.title>
            <td>{{ li.name }}</td>
            <td class='long-text-style'>{{ li.value | status }}</td>
          </tr>
          <tr>
            <td>切片进度</td>
            <td><el-progress :text-inside="true" :stroke-width="18" :percentage="tilePercent"></el-progress></td>
          </tr>
        </table>
      </div>
      <el-button type="primary" class="data-process-details-bth"
                 size="small"  @click="isShowDetail = false">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
import NewTask from './NewTask';
import { getTaskList, deleteTaskById, getTaskDetail, getTimeTaskDetail } from '../api/tileBuilderApi';
import { getMbtilesDataInfo, getHbaseDataInfo, publishMbtilesService, publishOGCTHbaseService, publishHbaseService, publishTMbtilesService, getTMbtilesDataInfo } from '../api/imageApi';
import { getDataDir } from '../api/fileApi';

export default {
  components: {
    NewTask,
  },
  data() {
    return {
      showMain: 0,
      isShowDetail: false,
      dataList: [],
      dataListLoading: false,
      dataDetail: [],
      currentTaskPage: 1,
      taskPageSize: 12,
      taskName: null,
      taskNumber: 0,
      tilePercent: 0,
      typeCard: 'image',
      currentType: '',
      timer1: null,
      timer2: null,
      isGoBackNew:true,//检测是否点击了新建按钮，主要用户新建任务，回到第一步
      isNew:true, //当点击新建按钮，发生变化
      pathInDocker: '', //数据在docker中的根目录
      pathInHost: '', //数据真实的根目录
    };
  },
  watch: {
    taskName() {
      this.currentTaskPage = 1;
      this.getTask();
    },
    isShowDetail(isTrue) {
      if (!isTrue) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
      }      
    },
    isNew(){
      this.isGoBackNew = !this.isGoBackNew;
    }
  },
  async mounted() {
    // this.taskListTable('7');
    // 获取数据的物理地址以及docker中的地址
    var dirs = await getDataDir();
    this.pathInDokcer = dirs.inDocker;
    this.pathInHost = dirs.inHost;
  },
  methods: {
    // 创建切换
    changeNewTaskTab(index) {
      this.showMain = index;
      if(index === 0) {
        this.getTask();
      }
      this.isNew = !this.isNew
      this.currentType = this.typeCard;
    },
    taskListTable(index) {
      switch (index) {
        case '7':
        case '7-1':
          this.typeCard = 'image';
          break;
        case '7-2':
          this.typeCard = 'timeImage';
          break;
        case '7-3':
          this.typeCard = 'dem';
          break;
      }
      this.showMain = 0;
      this.taskName = '';
      this.currentTaskPage = 0;
      this.getTask();
    },
    // 任务详情
    showDataServerDetail(row) {
      if (this.typeCard === 'timeImage') {
        this.showDetail(row, getTimeTaskDetail);
      } else {
        this.showDetail(row, getTaskDetail);
      }
    },
    // 影像数据、地形数据的任务详情
    async showDetail(row, fun){
      this.isShowDetail = true;
      this.dataDetail = [
        { name:'任务名称', value: row.taskName },
        { name:'数据位置', value: this.getDataPath(row.dataPath), title:this.getPathTitle(row) },
        { name:'存放位置', value: this.getSavePath(row), title:this.getSavePathTitle(row) },
        { name:'瓦片格式', value: this.changeMimeType(row.mimeType) },
        { name:'格网集', value: `EPSG：${row.gridSet}` },
        { name:'层级范围', value: `${row.minLevel === -1 ? '' : row.minLevel}-${row.maxLevel === -1 ? '' : row.maxLevel}` },
        { name:'起始时间', value: row.createTime },
        { name:'完成时间', value: '' },
        { name:'任务状态', value: row.status },
      ];
      if (row.status === 'FINISHED') {
        this.dataDetail[this.dataDetail.length -2].value = row.lastTime;
        this.tilePercent = 100;
        return;
      }
      this.tilePercent = 0;
      clearInterval(this.timer1);

      this.timer1 = setInterval(() => {
        fun(row.id).then((res) => {
          if(!res.success){
            this.$message.error({ message: '获取切片进度失败', showClose: true });
            clearInterval(this.timer1);
            return;
          }
          this.dataDetail[this.dataDetail.length -1].value = res.status;
          this.tilePercent = parseFloat(res.progress);
          if('FINISHED'=== res.status || !this.isShowDetail) {
            this.tilePercent = 100;
            const date = new Date(res.lastTime);
            this.dataDetail[this.dataDetail.length -2].value = date.toLocaleDateString().replace(/\//g,'-') + ' '+ date.toTimeString().slice(0,8);
            this.getTask();
            clearInterval(this.timer1);
          }
          if('ERROR'=== res.status || 'RUNNING'=== res.status || !this.isShowDetail) {
            this.getTask();
            clearInterval(this.timer1);
          }
        });
      },2000);
    },
    // 时序影像的任务详情
    async showTimeImageDetail(row){
      this.isShowDetail = true;
      this.dataDetail = [
        { name:'任务名称', value: row.taskName },
        { name:'数据位置', value: row.dataPath },
        { name:'存放位置', value: row.savePath },
        { name:'瓦片格式', value: this.changeMimeType(row.mimeType) },
        { name:'格网集', value: `EPSG：${row.gridSet}` },
        { name:'层级范围', value: `${row.minLevel}-${row.maxLevel}` },
        { name:'起始时间', value: row.createTime },
        { name:'完成时间', value: '' },
        { name:'任务状态', value: row.status },
      ];
      if (row.status === 'FINISHED') {
        this.dataDetail[this.dataDetail.length -2].value = row.lastTime;
        this.tilePercent = 100;
        return;
      }
      this.tilePercent = 0;
      clearInterval(this.timer2);
      this.timer2 = setInterval(() => {
        getTimeTaskDetail(row.id).then((res) => {
          if(!res.success){
            this.$message.error({ message: '获取切片进度失败', showClose: true });
            clearInterval(this.timer2);
            return;
          }
          this.dataDetail[this.dataDetail.length -1].value = res.status;
          this.tilePercent = parseFloat(res.progress);
          if('FINISHED'=== res.status || !this.isShowDetail) {
            this.tilePercent = 100;
            const date = new Date(res.lastTime);
            this.dataDetail[this.dataDetail.length -2].value = date.toLocaleDateString().replace(/\//g,'-') + ' '+ date.toTimeString().slice(0,8);
            this.getTask();
            clearInterval(this.timer2);
          }
          if('ERROR'=== res.status || 'RUNNING'=== res.status || !this.isShowDetail) {
            this.getTask();
            clearInterval(this.timer2);
          }
        });
      },2000);
    },
    taskCurrentChange(val) {
      this.currentTaskPage = val;
      this.getTask();
    },
    //获取任务清单
    async getTask() {
      const params = {
        page: this.currentTaskPage,
        perPage: this.taskPageSize,
        taskName: this.taskName,
        type: this.typeCard,
      };
      this.dataListLoading = true;
      getTaskList(params).then((result) => {
        this.dataList = result.content;
        this.taskNumber = result.totalElements;
        this.dataListLoading = false;
      })
    },
    validateLayerName(value) {
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
        return '图层名只能包含数字、中文、字母、下划线、短横线！';
      } else if (!reStr.test(value)) {
        return '图层名必须以汉字或字母开头';
      } else if (value.length < 5) {
        return '图层名最少为5个字符';
      } else if (value.length > 50) {
        return '图层名长度不能超过50字符';
      }
    },
    changeLayerName(params, fun){
      let conditions = params;
      this.$prompt('请输入图层名称', '发布', {
        confirmButtonText: '发布',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValidator: this.validateLayerName,
        inputValue: params.layerName,
      }).then(({ value }) => {
        conditions.layerName = value;
        fun(params).then(() => {
          this.$notify({
            title: '成功',
            message: '任务发布成功',
            type: 'success',
          });
        });
      });
    },
    //把docker中目录隐藏
    getDataPath(path) {
      //当前获取到的数据的位置是在docker中的位置
      var dockerHidePath = path.slice(this.pathInDokcer.length, path.length);
      dockerHidePath = '根目录' + dockerHidePath
      return dockerHidePath  
    },
    //获取数据的真实目录，为了显示在详情的title中
    getPathTitle(row) {
      var dockerHidePath = row.dataPath.slice(this.pathInDokcer.length, row.dataPath.length);  //去掉根目录的文件目录
      var hostPath = this.pathInHost + dockerHidePath
      return hostPath ; 
    },
    //获取切片后数据存储位置的真实目录，为了显示在详情的title中
    getSavePathTitle(row) {
      if(row.tileType !== "hbase") {
        var dockerHidePath = row.savePath.slice(this.pathInDokcer.length, row.savePath.length);
        var hostPath = this.pathInHost + dockerHidePath
        return hostPath ;
      }
    },
    getSavePath(row) {
      var saveHbasePath = this.getDataPath(row.savePath);
      if(row.tileType === "hbase") {
        saveHbasePath = row.savePath.split('"')[7];
      } 
      return saveHbasePath;
    },
    publishTask(row) {
      switch (row.type){
        case 'image':
        case 'dem':
          this.publishDefaultTask(row);
          break;
        case 'timeImage':
          this.publishTimeTask(row);
          break;
      }
    },
    //发布任务
    async publishDefaultTask(row) {
      var taskMessage = {};
      if(row.tileType === 'hbase') {
        taskMessage = await getHbaseDataInfo(encodeURI(row.id))
      } else {
        taskMessage = await getMbtilesDataInfo(encodeURI(row.savePath));
      }      
      let params = {
        path: row.savePath,
        layerName: `${row.taskName}-${this.changeMimeType(row.mimeType)}-${row.gridSet}`,
        gridSet: taskMessage.gridSet,
        mimeType: this.changeMimeType(row.mimeType),
        maxLevel: taskMessage.maxLevel,
        minLevel: taskMessage.minLevel,
        minX: taskMessage.minX,
        minY: taskMessage.minY,
        maxX: taskMessage.maxX,
        maxY: taskMessage.maxY,
        isBase: true,
      };
      if (row.dataType === 'dem') {
        params.isBase = false;
        params.isTerrain = true;
      }
      if(row.tileType === 'hbase') {
        let params = {
          layerName: `${row.taskName}-${this.changeMimeType(row.mimeType)}-${row.gridSet}`,
          gridSet: taskMessage.gridSet,
          mimeType: this.changeMimeType(row.mimeType),
          maxLevel: taskMessage.maxLevel,
          minLevel: taskMessage.minLevel,
          minX: taskMessage.minX,
          minY: taskMessage.minY,
          maxX: taskMessage.maxX,
          maxY: taskMessage.maxY,
          isBase: true,
          tableName: taskMessage.tableName,
          layerId: taskMessage.layerId,
          isEncrypt: taskMessage.isEncrypt,
          regionNum: taskMessage.regionNum,
        };
        this.changeLayerName(params,publishHbaseService);
      } else {
        this.changeLayerName(params, publishMbtilesService);
      }
    },
    // 发布时序影像任务
    async publishTimeTask(row) {
      var taskMessage = {};
      if(row.tileType === 'hbase'){
        taskMessage = await getHbaseDataInfo(encodeURI(row.id))
        let params = {
          layerName: `${row.taskName}-${row.mimeType.toUpperCase()}-${row.gridSet}`,
          gridSet: taskMessage.gridSet,
          mimeType: this.changeMimeType(row.mimeType),
          maxLevel: taskMessage.maxLevel,
          minLevel: taskMessage.minLevel,
          minX: taskMessage.minX,
          minY: taskMessage.minY,
          maxX: taskMessage.maxX,
          maxY: taskMessage.maxY,
          isBase: false,
          layerId: taskMessage.layerId,
          subLayers: taskMessage.subLayers,
          tableName: taskMessage.tableName,
          regionNum: taskMessage.regionNum,
          isEncrypt: taskMessage.isEncrypt,
        };
        this.changeLayerName(params, publishOGCTHbaseService);
      } else {
        taskMessage = await getTMbtilesDataInfo(encodeURI(row.savePath));
        let params = {
          path: row.savePath,
          layerName: `${row.taskName}-${row.mimeType.toUpperCase()}-${row.gridSet}`,
          gridSet: taskMessage.gridSet,
          mimeType: this.changeMimeType(row.mimeType),
          maxLevel: taskMessage.maxLevel,
          minLevel: taskMessage.minLevel,
          minX: taskMessage.minX,
          minY: taskMessage.minY,
          maxX: taskMessage.maxX,
          maxY: taskMessage.maxY,
          isBase: false,
          isEncrypt: false,
          isTerrain: false,
        };
        this.changeLayerName(params, publishTMbtilesService);
      } 
    },
    //删除任务
    async deleteTask(id) {
      this.$confirm('此操作将永久删除任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTaskById(id).then(() => {
          this.$message.success({ message: '删除成功', showClose: true });
          if(this.dataList.length === 1 && this.taskNumber > 1) {
            this.currentTaskPage --;
          }
          this.getTask();
        })
      }).catch(() => {
      });
    },
    changeMimeType(value){
      switch (value){
        case 'terrain':
        case 'mesh':
          return 'TERRAIN';
        case 'tif':
          return 'TIFF';
        default :
          return value.toUpperCase();
      }
    }
  },
  filters: {
    status(value) {
      switch (value){
        case 'FINISHED':
          return 'SUCCESS';
        case 'ERROR':
          return 'FAIL';
        case 'CREATE':
          return 'READY';
        default :
          return value;
      }
    }
  }
};
</script>

<style lang="scss">
.data-process-details-wrap{
  .el-dialog__header {
    padding: 0px;
    line-height: 50px;
    background: #0c8bde;
    padding-left: 20px;
  }
}
.data-process-details {
  height: calc(100vh - 608px);
  min-height: 368px;
  overflow-y: auto;
  tr {
    td {
      width: 500px;
      min-width: 100px;
      line-height: 35px;
      .long-text-style {
        width: calc(100% - 85px);
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    td:first-of-type {
      width: 100px;
      color: #453e3e;
      font-weight: 700;
    }
  }
}
.data-process-details-bth {
  display: block;
  margin: 0 auto;
  margin-top: 15px;
}
</style>


