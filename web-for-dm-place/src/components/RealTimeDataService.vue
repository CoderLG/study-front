<template>
  <div>
    <div class="service-manage-title">实时数据管理</div>
    <div class="service-manage-title-search">
      <el-button type="primary" size="small" @click='servicePublic'>发布服务</el-button>
      <el-button type="primary" plain size="small" icon='el-icon-refresh'
                 style="margin-left: 5px"
       title='刷新' @click='refreshData'></el-button>
      <!-- <div>
        <el-input placeholder="请输入内容"
         v-model="inputVal" clearable size="small"></el-input>
      </div> -->
    </div>
    <el-table :data="tableData" v-loading="tableDataLoading">
      <el-table-column prop="sourceId" label="sourceId" align='left' sortable></el-table-column>
      <el-table-column prop="describe" label="服务描述" align='center'>
        <template slot-scope="scope">
          <p :title='scope.row.describe' class="real-time-manage-overline">{{ scope.row.describe }}</p>
        </template>
      </el-table-column>      
      <el-table-column prop="scriptName" label="服务脚本" align='center' sortable>
        <template slot-scope="scope">
          <p :title='scope.row.scriptName' class="real-time-manage-overline">{{ scope.row.scriptName }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="isRunning" label="状态" align='center' width='100' sortable>
        <template slot-scope="scope">
          <p v-if='scope.row.isRunning === 1'>启动</p>
          <p v-if='scope.row.isRunning === 0'>停止</p>
        </template>
      </el-table-column>
      <el-table-column prop="iconId" label="图标" align='center'>
        <template slot-scope="scope">
          <img :src="'../../static/images/'+ scope.row.iconId +'.png'">
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align='center' sortable width='200'></el-table-column>      
      <el-table-column width='310' label="操作" align='center'>
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain :disabled='scope.row.isRunning === 1'
           @click='startRowTask(scope.row)'>启动</el-button>
          <el-button size="small" type="primary" plain :disabled='scope.row.isRunning === 0'
           @click='stopRowTask(scope.row)'>停止</el-button>
          <el-button size="small" type="primary" plain
           @click='previewTask(scope.row)'>预览</el-button>
          <!-- <el-button size="small" type="primary" plain
           @click='delectTask(scope.row)'>删除</el-button> -->
          <el-dropdown trigger="click" @command="handleCommand(scope, $event)">
            <el-button size="small" type="primary" plain
              class="el-dropdown-link">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="serviceAddress">服务地址</el-dropdown-item>
              <el-dropdown-item command="delect">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      :current-page="currentPage"
      @current-change="tabPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next">
    </el-pagination>
    <!--服务地址-->
    <el-dialog title="服务地址" :visible.sync="isServiceAddress"
     class='sever-address-dialog' :close-on-click-modal='false'>
      <div>
        <el-form :label-position="labelPosition" label-width="150px" class="serverUrlForm">
          <el-form-item label="实时数据" class="serverUrlForm-label"></el-form-item>
          <el-form-item label="目标">
            <el-input v-model="targetUrl">
              <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="targetUrl"
               icon="el-icon-share" @click="copy"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="聚合">
            <el-input v-model="clusterUrl">
              <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="clusterUrl"
               icon="el-icon-share" @click="copy"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button size="small" type="primary" @click='isServiceAddress = false'>确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import UrlSetting from '../api/UrlSetting';
import { getRealTimeList, startTask, stopTask, removeTask } from '../api/realTimeTaskApi';

const geoIotUrl = UrlSetting.URLS.geoLotUrl;

export default {
  name: '',
  data() {
    return {
      tableData: [],
      tableDataLoading: false,
      currentPage: 1, // 当前页
      pageSize: 20, // 每页的条数
      total: 100, // 总条数
      isServiceAddress: false,
      labelPosition: 'left', // 服务地址标题位置
      targetUrl: '',// 目标地址
      clusterUrl: '',// 聚合地址
    };
  },
  async mounted() {
    // this.getDataList();
  },
  methods: {
    // 初始化
    init() {
      this.currentPage = 1;
      this.getDataList();
    },
    // 刷新数据列表
    refreshData() {
      this.getDataList();
    },
    // 切换分页
    tabPage(val) {
      this.currentPage = val;
      this.getDataList(val);
    },
    // 服务发布
    servicePublic() {
      this.$emit('servicePublic');
    },
    // 获取数据列表
    async getDataList() {
      await getRealTimeList(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data;
        this.total = res.total;
      })
      if(this.tableData.length === 0 && this.currentPage > 1){
        await getRealTimeList(this.currentPage-1, this.pageSize).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        }) 
      }
    },
    // 启动
    startRowTask(row) {
      startTask(row).then(() => {
        this.$message.success({ message: '启动成功', showClose: true });
        this.refreshData();
      })
    },
    // 停止
    stopRowTask(row) {
      stopTask(row).then(() => {
        this.$message.success({ message: '停止成功', showClose: true });
        this.refreshData();
      })
    },
    // 预览
    previewTask(row) {
      if (row.isRunning === 1) {
        const routeData = this.$router.resolve({
          path: `/openRealTime/realTime:${row.id}`,
        });
        window.open(routeData.href);
      } else {
        this.$message.warning({ message: '请先启动服务', showClose: true });
      }
    },
    delectTask(row) {
      this.$confirm('确定删除?', '提示', {
        type: 'warning',
      }).then(() => {
        removeTask(row.id).then(() => {
          this.refreshData();
          this.$message.success({ message: '删除成功', showClose: true });
        });
      });
    },
    // 更多操作
    handleCommand(scope, command) {
      switch (command) {
        case 'serviceAddress':
          this.targetUrl = `${geoIotUrl}/data/targets?sourceId=${scope.row.sourceId}`;
          this.clusterUrl = `${geoIotUrl}/data/cluster?sourceId=${scope.row.sourceId}`;
          this.isServiceAddress = true;
          break;
        case 'delect':
          this.$confirm('确定删除?', '提示', {
            type: 'warning',
          }).then(() => {
            removeTask(scope.row.id).then(() => {
              this.refreshData();
              this.$message.success({ message: '删除成功', showClose: true });
            });
          });
          break;
      }
    },
    // 复制服务地址
    copy() {
      const clipboard = new Clipboard('.copybtn');
      clipboard.on('success', () => {
        this.$notify({
          title: '复制成功',
          type: 'success',
        });
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        this.$notify({
          title: '复制失败',
          type: 'error',
        });
        clipboard.destroy();
      });
    },
  }
};
</script>

<style lang='scss' scoped>
  .real-time-manage-overline {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>