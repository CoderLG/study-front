<template>
  <div>
    <div class="service-manage-title">围栏管理</div>
    <el-form :inline="true"  class="service-manage-title-search">
      <el-button type="primary" size="small" @click="addFence">添加围栏</el-button>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-refresh"
        style="margin-left: 5px"
        title="刷新"
        @click="init"
      ></el-button>
    </el-form>
    <!--列表-->
    <el-table :data="fenceData" key="fenceData" v-loading="targetLoad">
      <el-table-column prop="gfName" label="围栏名称" align="left" sortable>
        <template slot-scope="scope">
          <p :title="scope.row.gfName" class="Target-manage-overline">{{ scope.row.gfName?scope.row.gfName:'' }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="围栏描述">
        <template slot-scope="scope">
          <p :title="scope.row.gfDescribe" class="Target-manage-overline">{{ scope.row.gfDescribe }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="gfCreateTime" align="center" label="更新时间" sortable>
        <template slot-scope="scope">
          <p>{{ scope.row.gfCreateTime?scope.row.gfCreateTime:'' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="previewFence(scope.row.gfId)">预览</el-button>
          <el-button type="primary" plain size="small" @click="deleteFence(scope.row.gfId)">删除</el-button>
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
import { getGeoFenceList, delFence } from '../api/realTimeTaskApi';

export default {
  data() {
    return {
      fenceData: [],
      targetCurrentPage: 1, // 列表当前页数
      targetPageSize: 20, // 列表每页条目数
      targetTotal: 100, // 列表的总页数
      targetLoad: false, // 样式表loading
    }
  },
  methods: {
    init() {
      this.targetCurrentPage = 1;
      this.getTargets();
      this.$emit('destroyComponent');
    },
    // 获取围栏列表
    getTargets() {
      this.targetLoad = true;
      getGeoFenceList(this.targetCurrentPage, this.targetPageSize).then(res => {
        this.fenceData = res.data;
        this.targetTotal = res.total;
        this.targetLoad = false;
      }).catch(() => {
        this.targetLoad = false;
      });
    },
    // 添加围栏
    addFence() { 
      this.$emit('addFenceTable');
    },
    // 预览围栏
    previewFence(gfId) {
      this.$emit('previewFenceArea', gfId);
    },
    //删除围栏
    deleteFence(id){
      this.$confirm('确定删除?', '提示', {
        type: 'warning',
      }).then(() => {
        delFence(id).then(() => {
          if(this.fenceData.length === 1 && this.targetCurrentPage > 1) {
            this.targetCurrentPage = this.targetCurrentPage - 1;
          }
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
</style>