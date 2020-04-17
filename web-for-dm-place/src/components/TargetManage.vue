<template>
  <div>
    <div class="service-manage-title">目标类型管理</div>
    <el-form :inline="true"  class="service-manage-title-search">
      <el-button type="primary" size="small" @click="addTarget">添加目标类型</el-button>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-refresh"
        style="margin-left: 5px"
        title="刷新"
        @click="getTargets"
      ></el-button>
    </el-form>
    <!--列表-->
    <el-table :data="targetData" key="targetData" v-loading="targetLoad">
      <el-table-column prop="tmId" label="目标类型ID" align="left" sortable>
        <template slot-scope="scope">
          <p :title="scope.row.tmId" class="Target-manage-overline">{{ scope.row.tmId }}</p>
        </template>
      </el-table-column>      
      <el-table-column align="center" label="目标类型描述">
        <template slot-scope="scope">
          <p :title="scope.row.tmDescribe" class="Target-manage-overline">{{ scope.row.tmDescribe }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="tmIcon" label="目标类型图标" align="center" sortable>
        <template slot-scope="scope">
          <img :src="geoLotUrl+'/IconStoreApi/iconStores/icon/'+scope.row.tmIcon" alt="" class="target-manage-icon">
        </template>
      </el-table-column>
      <el-table-column prop="tmUpdateTime" align="center" label="更新时间" sortable>
        <template slot-scope="scope">
          <p>{{ scope.row.tmUpdateTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="editTarget(scope.row.tmId)">编辑</el-button>
          <el-button type="primary" plain size="small" @click="deleteTarget(scope.row.tmId)">删除</el-button>          
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      :current-page="targetCurrentPage"
      @current-change="currentChange"
      :page-size="targetPageSize"
      :total="targetTotal"
      layout="total, prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import UrlSetting from '../api/UrlSetting';
import { getTargetManagerList, delTarget } from '../api/realTimeTaskApi';

const geoLotUrl = UrlSetting.URLS.geoLotUrl;

export default {
  data() {
    return {
      targetData: [],
      targetCurrentPage: 1, // 列表当前页数
      targetPageSize: 20, // 列表每页条目数
      targetTotal: 100, // 列表的总页数
      targetLoad: false, // 样式表loading
      geoLotUrl: '',
    }
  },
  mounted() {
    this.geoLotUrl = geoLotUrl;
  },
  methods: {
    init() {
      this.getTargets();
    },
    // 获取目标类型列表
    async getTargets() {
      this.targetLoad = true;
      getTargetManagerList(this.targetCurrentPage, this.targetPageSize).then(res => {
        this.targetData = res.data;
        this.targetTotal = res.total;
        this.targetLoad = false;
      }).catch(() => {
        this.targetLoad = false;
      });
    },
    // 添加样式表
    addTarget() {
      this.$emit('addTargetTable');
    },
    // 编辑脚本
    editTarget(ssId) { 
      this.$emit('editTargetCon', ssId);
    },
    deleteTarget(id){
      this.$confirm('确定删除?', '提示', {
        type: 'warning',
      }).then(() => {
        delTarget(id).then(() => {
          this.getTargets();
          this.$message.success({ message: '删除成功', showClose: true });
        });
      });
    },
    // 列表页面切换
    currentChange(val) {
      this.targetCurrentPage = val;
      this.getTargets();
    },
  }
};
</script>

<style lang="scss" scoped>
.Target-manage-overline {
  width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.target-manage-icon {
  max-height: 32px;
}
</style>