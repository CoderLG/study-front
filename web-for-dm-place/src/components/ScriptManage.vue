<template>
  <div>
    <div class="service-manage-title">脚本管理</div>
    <el-form class='service-manage-title-search'>
      <!-- <el-form-item>
        <el-input placeholder="请输入内容" v-model="searchData" clearable size="small"></el-input>
        <el-button icon="el-icon-search" type="primary"
         size="small" v-on:click="getScripts"></el-button>
      </el-form-item> -->
      <el-button type="primary" size="small" @click='addScript'>添加脚本</el-button>
      <el-button type="primary" plain size="small" icon='el-icon-refresh'
       style="margin-left: 5px" title='刷新' @click='init'></el-button>
    </el-form>
    <!--列表-->
    <el-table :data="scriptData" key="scriptData" v-loading='scriptLoad'>
      <el-table-column prop="name" label="脚本名称"
       align='left' sortable>
        <template slot-scope="scope">
          <p :title='scope.row.name' class="script-manage-overline">{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="scriptName" label="脚本文件名称"
       align='left' sortable>
        <template slot-scope="scope">
          <p :title='scope.row.scriptName' class="script-manage-overline">{{ scope.row.scriptName }}</p>
        </template>
      </el-table-column> -->
      <el-table-column align='center' label="脚本描述">
        <template slot-scope="scope">
          <p :title='scope.row.describe' class="script-manage-overline">{{ scope.row.describe }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align='center' label="更新时间" sortable>
        <template slot-scope="scope">
          <p>{{ scope.row.createTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="235" align='center'>
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="editScript(scope.row.id)">编辑</el-button>
          <el-button type="primary" plain size="small" @click="downScript(scope.row.id)">下载</el-button>
          <el-button type="primary" plain size="small" @click="deleteScript(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      :current-page="scriptCurrentPage"
      @current-change="currentChange"
      :page-size="scriptPageSize"
      :total="scriptTotal"
      layout="total, prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
import { getScriptList, removeScript, downloadScript } from '../api/scriptApi';

export default {
  data() {
    return {
      scriptData: [], // 列表数据
      scriptCurrentPage: 1, // 列表当前页数
      scriptPageSize: 20, // 列表每页条目数
      scriptTotal: 100, // 列表的总页数
      scriptLoad: false, // 样式表loading
    };
  },
  methods: {
    init() {
      this.scriptCurrentPage=1;
      this.getScripts();
    },
    // 获取样式列表
    async getScripts() {
      this.scriptLoad = true;
      await getScriptList(this.scriptCurrentPage, this.scriptPageSize).then(res => {
        this.scriptData = res.data;
        this.scriptTotal = res.total;
        this.scriptLoad = false;
      }).catch(() => {
        this.scriptLoad = false;
      });
      //为了处理因为删除导致的错误
      if(this.scriptData.length === 0 && this.scriptCurrentPage >1){
        this.scriptCurrentPage = this.scriptCurrentPage - 1;
        await getScriptList(this.scriptCurrentPage, this.scriptPageSize).then(res => {
        this.scriptData = res.data;
        this.scriptTotal = res.total;
        this.scriptLoad = false;
        }).catch(() => {
          this.scriptLoad = false;
        });
      }
    },
    // 下载
    downScript(id) {
      downloadScript(id);
    },
    // 删除
    removeScript(index, row) {
      this.$confirm('确定删除?', '提示', {
        type: 'warning',
      }).then(() => {
        removeScript(row.id).then(() => {
          this.getScripts();
          this.$message.success({ message: '删除成功', showClose: true });
        });
      });
    },
    // 添加样式表
    addScript() {
      this.$emit('addScriptTable');
    },
    // 编辑脚本
    editScript(id) {
      this.$emit('editScriptCon', id);
    },
    // 删除脚本
    deleteScript(scope) {
      this.removeScript(scope.$index, scope.row);
    },
    // 列表页面切换
    currentChange(val) {
      this.scriptCurrentPage = val;
      this.getScripts();
    },
  }
};
</script>

<style lang='scss' scoped>
  .script-manage-overline {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>


