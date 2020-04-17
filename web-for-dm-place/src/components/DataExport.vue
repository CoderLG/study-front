<template>
  <div class="data-export-component">
    <el-main v-show='showMain[0]'>
      <div class="service-manage-title">数据导出</div>
      <el-form :inline="true" class='service-manage-title-search'>
        <el-form-item>
          <el-input v-model="name" placeholder="请输入内容" clearable size="small"></el-input>
          <el-button icon="el-icon-search" type="primary"
                     size="small"></el-button>
        </el-form-item>
        <el-button type="primary" size="small" @click="tabMain(2)">新建任务</el-button>
        <el-button type="primary" plain size="small" icon='el-icon-refresh'
                 style="margin-left: 5px"
       title='刷新数据列表' @click='refreshData'></el-button>
      </el-form>
      <!--数据导出列表-->
      <el-table :data="dataExportData" key="dataExportData" highlight-current-row>
        <el-table-column prop="name" label="任务名称" align='left' sortable>
          <template slot-scope="scope">
            <p :title='scope.row.name'>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="dataSourceType" align='center' label="数据源类型" sortable width='130'>
          <template slot-scope="scope">
            <span v-if='scope.row.dataSourceType === 2'>GV MBTiles</span>
            <span v-else>GV HBase</span>
          </template>
        </el-table-column>
        <el-table-column label="层级范围" align='center'  width='120'>
          <template slot-scope="scope">
          {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
          </template>
        </el-table-column>
        <el-table-column prop="fileSize" align='center' label="数据量" sortable width='130' :formatter="formatterSize">
        </el-table-column>
        <el-table-column prop="status" label="状态" align='center' sortable width='110'>
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align='center' sortable width='200'>
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width='270' align='center'>
          <template slot-scope="scope">
            <el-button size="small" type="primary" plain
             @click='showDetails(scope.row)' >详情</el-button>
            <el-button size="small" type="primary" plain
             @click='publishData(scope.row)' :disabled='scope.row.status !== "SUCCESS"'>发布</el-button>
            <el-button size="small" type="primary" plain
             @click='deleteTask(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>      
      <el-dialog title="详情" :visible.sync="isShowDetails" :close-on-click-modal='false' class='layer-grop-details'>
        <div class="server-manager-layer-details">
          <table>
            <tr v-for='(li, index) in layerDetails' :key='index'>
              <td>{{ li.name }}</td>
              <td>{{ li.value }}</td>
            </tr>
            <tr>
              <td>任务进度</td>
              <td><el-progress :text-inside="true" :stroke-width="18" :percentage="tilePercent"></el-progress></td>
            </tr>
          </table>
          <el-table :data="layerListDetails" align='center' size="mini" border >
            <el-table-column type="index" label="序号"/>
            <el-table-column align='left' label="层级范围" width='100'>
              <template slot-scope="scope">
                {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
              </template>
            </el-table-column>
            <el-table-column prop="rangeArea" label="范围区域">
              <template slot-scope="scope">
                {{ scope.row.lonBegin }}  {{ scope.row.latEnd }} , {{ scope.row.lonEnd }}  {{ scope.row.latEnd }} , {{ scope.row.lonEnd }}  {{ scope.row.latBegin }} , {{ scope.row.lonBegin }}  {{ scope.row.latBegin }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button class="server-manager-layer-details-bth" type="primary"
         size="small" @click='isShowDetails = false'>确认</el-button>         
      </el-dialog>
      <!--图层组分页-->
      <el-pagination
        background
        :current-page="dataExportCurrentPage"
        @current-change="dataExportCurrentChange"
        :page-size="dataExportPageSize"
        :total="dataExportTotal"
        layout="total, prev, pager, next">
      </el-pagination>
    </el-main>
    <el-main v-show='showMain[2]'>
      <DataExportNewTask @goBack='goBack' :isNewButton = 'isNewButton'></DataExportNewTask>
    </el-main>
  </div>
</template>

<script>
import WebUploader from 'webuploader';
import { getDataExportList, deleteDataExportTask, getDataExportProgress } from '../api/tileCacheApi';
import { getMbtilesDataInfo, publishMbtilesService } from '../api/imageApi';
import DataExportNewTask from './DataExportNewTask';

export default {
  components: {
    DataExportNewTask,
  },
  data() {
    return {
      showMain: [true, false, false],
      isShowDetails: false, // 数据详情的显隐
      tilePercent: 0, // 切片进度
      // 图层组列表
      dataExportCurrentPage: 1, // 数据导出列表当前页数
      dataExportData: [], // 数据导出列表数据
      dataExportTotal: 100, // 数据导出列表的总页数
      dataExportPageSize: 20, // 数据导出列表每页条目数
      layerDetails: [],
      layerListDetails: [],
      currentInputVal: '',
      timer: null,// 获取进度定时器
      isNewButton:true,//检查是否点击了新建按钮
      name:null
    };
  },
  watch: {
    name() {
      this.dataExportCurrentPage = 1;
      this.dataExportListTable()
    },
    isShowDetails(isTrue) {
      if (!isTrue) {
        clearInterval(this.timer);
      }
      if (this.tilePercent === 100) {
        this.dataExportListTable();
      }
    }
  },
  methods: {
    formatterSize(row, index, cellValue) {
      return !cellValue ? '-' : this.formatSize(cellValue);
    },
    formatSize(value) {
      return WebUploader.Base.formatSize(value);
    },
    // 切换左侧列表
    tabMain(index) {
      this.showMain = [false, false, false];
      this.showMain[index] = true;
      this.isNewButton = !this.isNewButton;
    },
    // 返回
    goBack() {
      this.dataExportListTable();
      this.tabMain(0);
    },
    // 刷新数据列表
    refreshData() {
      this.dataExportListTable();
    },
    // 获取分页列表
    async dataExportCurrentChange(val) {
      this.tableData2Loading = true;
      this.dataExportCurrentPage = val;
      const dataExportDatas = await getDataExportList(this.dataExportCurrentPage, this.dataExportPageSize, '');
      this.dataExportData = dataExportDatas.items;
      this.dataExportTotal = dataExportDatas.total;
      this.tableData2Loading = false; 
    },
    // 数据导出列表获取
    async dataExportListTable() {
      this.tabMain(0);
      this.tableData2Loading = true;
      const dataExportList = await getDataExportList(this.dataExportCurrentPage, this.dataExportPageSize, this.name);
      this.dataExportData = dataExportList.items;
      this.dataExportTotal = dataExportList.total;
      this.tableData2Loading = false;      
    },
    // 图层详情
    async showDetails(row) {
      this.isShowDetails = true;
      this.tilePercent = 0;
      // const detailArray = [];
      // let max = 0;
      // if (row.subTasks) {
      //   max = row.subTasks.length;
      // }
      // for (let i = 0; i < max; i += 1) {
      //   detailArray.push(row.subTasks[i]);
      // }
      this.layerListDetails = row.subTasks;
      this.timer = null;
      if(row.status === 'NEW'){
        this.tilePercent = row.progress*100;
      }else if (row.status === 'RUNNING'){
        this.getProgress(row);// 定时获取进度
      }else if(row.status === 'FAILED'){
        this.$message.error({ message: row.errorMessage, showClose: true,customClass:'zZindex' });
      }else if(row.status === 'SUCCESS'){
        this.tilePercent = 100;
      }
      this.layerDetails = [
        {name: '任务名称', value: row.name},
        // {name: '基础影像数据', value: row.sourceAddress},
        {name: '存放位置', value: row.outputPath},
        {name: '任务状态', value: row.status},
      ];
    },
    // 定时获取进度
    getProgress(row) {
      this.timer = setInterval(() => {
        getDataExportProgress(row.id).then(res => {
          this.tilePercent = res * 100;
          if (res * 100 === 100) {
            clearInterval(this.timer);
          }
        });
      }, 1000);
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
    // 发布数据
    async publishData(row) {
      const results = await getMbtilesDataInfo(encodeURI(row.outputPath));
      const mbTilesParams = {
        layerName: `${row.name}-${results.mimeType.toUpperCase()}-${row.epsg.slice(row.epsg.indexOf(":") + 1, row.epsg.length)}`,
        path: row.outputPath,
        gridSet: `${row.epsg}`,
        mimeType: results.mimeType,
        minX: results.minX,
        maxX: results.maxX,
        minY: results.minY,
        maxY: results.maxY,
        minLevel: results.minLevel,
        maxLevel: results.maxLevel,
        isBase: true,
      };
      this.$prompt('请输入图层名称', '发布', {
        confirmButtonText: '发布',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputValidator: this.validateLayerName,
        inputValue: mbTilesParams.layerName,
      }).then(({ value }) => {
        mbTilesParams.layerName = value;
        publishMbtilesService(mbTilesParams).then(() => {
          this.$notify({
            title: '成功',
            message: '任务发布成功',
            type: 'success',
          });
        });
      });
    },
    // 删除数据导出任务
    deleteTask(row) {
      this.$confirm('删除该图层可能会影响业务运行，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDataExportTask(row.id).then(() => {
          if(this.dataExportData.length === 1 && this.dataExportCurrentPage > 1) {
            this.dataExportCurrentPage = this.dataExportCurrentPage - 1;
          }
          this.dataExportListTable();
          this.layerTotal -= 1; // 总量减1
          this.$message.success({ message: '删除成功！', showClose: true });
        });
      });
    },
  }
};
</script>

<style lang="scss">
.zZindex{
  z-index:3000 !important;
}
.data-export-component {
  .layer-grop-details {
    .el-dialog__header {
      padding: 0px;
      line-height: 50px;
      background: #0c8bde;
      padding-left: 20px;
    }
  }
  .server-manager-layer-details {
    .el-table__body-wrapper {
      height: auto;
      overflow-y: auto;
      .el-table thead {
        color: #453e3e;
        font-weight: 700;
      }
    }
    .el-table td.is-center {
      padding-right: 0px;
    }
  }
  .el-table td:first-of-type .cell {
    //width: auto !important;
    overflow: hidden;
    P {
      width: 100%;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>


