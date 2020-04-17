<template>
  <div>
    <div class="service-manage-title">数据源管理</div>
    <el-form :inline="true"  class="service-manage-title-search">
      <el-button type="primary" size="small" @click="addSource">添加数据源</el-button>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-refresh"
        style="margin-left: 5px"
        title="刷新"
        @click="getSources"
      ></el-button>
    </el-form>
    <!--列表-->
    <el-table :data="sourceData" key="sourceData" v-loading="sourceLoad">
      <el-table-column prop="ssId" label="数据源ID" align="left" sortable>
        <template slot-scope="scope">
          <p :title="scope.row.ssId" class="Source-manage-overline">{{ scope.row.ssId }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据源描述">
        <template slot-scope="scope">
          <p :title="scope.row.ssDescribe" class="Source-manage-overline">{{ scope.row.ssDescribe }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="ssCreateTime" align="center" label="更新时间" sortable>
        <template slot-scope="scope">
          <p>{{ scope.row.ssCreateTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="editSource(scope.row.ssId)">编辑</el-button>
          <el-button type="primary" plain size="small" @click="deleteSource(scope.$index, scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      :current-page="sourceCurrentPage"
      @current-change="currentChange"
      :page-size="sourcePageSize"
      :total="sourceTotal"
      layout="total, prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
// import { getSourceList, removeSource } from '../api/realTimeTaskApi';

// export default {
//   data() {
//     return {
//       sourceData: [],
//       sourceCurrentPage: 1, // 列表当前页数
//       sourcePageSize: 20, // 列表每页条目数
//       sourceTotal: 100, // 列表的总页数
//       sourceLoad: false, // 样式表loading
//     }
//   },
//   methods: {
//     init() {
//       this.getSources();
//     },
//     // 获取数据源列表
//     async getSources() {
//       this.sourceLoad = true;
//       getSourceList(this.sourceCurrentPage, this.sourcePageSize).then(res => {
//         this.sourceData = res.data;
//         this.sourceTotal = res.total;
//         this.sourceLoad = false;
//       }).catch(() => {
//         this.sourceLoad = false;
//       });
//     },
//     // 添加样式表
//     addSource() { 
//       this.$emit('addSourceTable');
//     },
//     // 编辑脚本
//     editSource(ssId) { 
//       this.$emit('editSourceCon', ssId);
//     },
//     deleteSource(index, row){
//       this.$confirm('确定删除?', '提示', {
//         type: 'warning',
//       }).then(() => {
//         removeSource(row.ssId).then(() => {
//           this.getSources();
//           this.$message.success({ message: '删除成功', showClose: true });
//         });
//       });
//     },
//     // 列表页面切换
//     currentChange(val) {
//       this.sourceCurrentPage = val;
//       this.getSources();
//     },
//   }
// };
</script>

<!-- <style lang="scss" scoped>
  .Source-manage-overline {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style> -->