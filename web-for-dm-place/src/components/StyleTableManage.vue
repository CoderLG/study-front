<template>
  <div>
    <div class="service-manage-title">样式表管理</div>
    <el-form :inline="true" :model="filters" class='service-manage-title-search'>
      <el-form-item>
        <el-input placeholder="请输入内容" v-model="stylesSearchData" clearable size="small"></el-input>
        <el-button icon="el-icon-search" type="primary"
         size="small" v-on:click="getStyles"></el-button>
      </el-form-item>
      <el-button type="primary" size="small" @click='addStyle'>添加样式表</el-button>
      <el-button type="primary" plain size="small" icon='el-icon-refresh'
       style="margin-left: 5px" title='刷新样式表' @click='getStyles'></el-button>
    </el-form>
    <!--列表-->
    <el-table :data="stylesData" key="stylesData" highlight-current-row v-loading='styleLoad'>
      <el-table-column prop="name" label="样式名称"
       align='left' sortable>
        <template slot-scope="scope">
          <p :title='scope.row.name'>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="category" align='center' label="样式类型" width="140" sortable>
      </el-table-column>
      <!-- <el-table-column prop="path" align='center' label="文件名称" width="200" sortable>
      </el-table-column> -->
      <el-table-column prop="format" align='center' label="文件类型" width="140" sortable>
      </el-table-column>
      <el-table-column prop="createTime" align='center' label="创建时间" width="190" sortable>
        <template slot-scope="scope">
          <p>{{ scope.row.createTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align='center'>
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="styleEdit(scope)">编辑</el-button>
          <el-button v-if='scope.row.name === "point" || scope.row.name === "line" || scope.row.name === "polygon"' type="danger"
           plain size="small" disabled>删除</el-button>
          <el-button v-else type="danger" plain size="small"
           @click="removeStylesList(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      :current-page="stylesCurrentPage"
      @current-change="stylesCurrentChange"
      :page-size="stylesPageSize"
      :total="stylesTotal"
      layout="total, prev, pager, next">
    </el-pagination>
  </div>
</template>
<script>
import { getVectorStyleList, removeStyle } from '../api/vectorApi';

export default {
  data() {
    return {
      stylesSearchData: '', // 样式的搜索内容
      stylesData: [], // 样式列表数据
      filters: {
        styleName: '',
      },
      stylesCurrentPage: 1, // 样式列表当前页数
      stylesPageSize: 20, // 样式列表每页条目数
      stylesTotal: 100, // 样式列表的总页数
      styleLoad: false, // 样式表loading
    };
  },
  watch: {
    stylesSearchData(val) {
      this.filters.styleName = val;
      this.getStyles();
    },
  },
  methods: {
    init() {
      this.getStyles();
    },
    // 获取样式列表
    async getStyles() {
      this.styleLoad = true;
      getVectorStyleList(this.filters.styleName, this.stylesCurrentPage, this.stylesPageSize).then(res => {
        this.stylesData = res.data;
        this.stylesTotal = res.total;
        this.styleLoad = false;
      }).catch(() => {
        this.styleLoad = false;
      });
    },
    // 删除
    removeStylesList(index, row) {
      this.$confirm('删除样式会修改包含该样式的图层(组)，确定删除?', '提示', {
        type: 'warning',
      }).then(() => {
        removeStyle(row.id).then(() => {
          if(this.stylesData.length === 1 && this.stylesCurrentPage > 1) {
            this.stylesCurrentPage = this.stylesCurrentPage - 1;
          }
          this.getStyles();
          this.$message.success({ message: '删除成功', showClose: true });
        });
      });
    },
    // 添加样式表
    addStyle() {
      this.$emit('addStyleTable');
    },
    // 编辑
    styleEdit(scope) {
      this.$emit('styleItemEdit', scope);      
    },
    // 样式列表页面切换
    stylesCurrentChange(val) {
      this.stylesCurrentPage = val;
      this.getStyles();
    },
  }
};
</script>


