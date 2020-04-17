<template>
  <el-table :data="tableData" v-loading="tableDataLoading">
    <el-table-column prop="layerName" label="图层名称"
     align='left' sortable>
       <template slot-scope="scope">
          <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
        </template>
     </el-table-column>
    <el-table-column prop="format" label="数据类型"
     width='140' align='center' sortable></el-table-column>
    <el-table-column prop="createTime" label="创建时间"
     width='210' align='center' sortable></el-table-column>
    <el-table-column prop="work" width='360' label="操作" align='center'>
      <template slot-scope="scope">
        <el-button size="small" type="primary" plain @click='showDetails(scope.row)'>详情</el-button>
        <el-button size="small" type="primary" plain
         v-if='scope.row.format === "B3DM" || scope.row.format === "B3DM_GRID"' @click='previewTilt(scope.row)'>预览</el-button>
        <el-button size="small" type="primary" plain v-else disabled>预览</el-button>
        <el-button size="small" type="primary" plain @click='serverAddress(scope.row)'>服务地址</el-button>
        <el-dropdown trigger="click" @command="handleCommand(scope, $event)">
          <el-button size="small" type="primary" plain >更多</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="delect">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'tiltphoto',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      tableDataLoading: false,
    };
  },
  methods: {
    // 详情
    showDetails(row) {
      this.$emit('tiltDetails', row);      
    },
    previewTilt(row) {
      this.$emit('previewTilt', row);
    },
    serverAddress(row) {
      this.$emit('serverAddress', row);
    },
    // 更多操作
    handleCommand(scope, command) {
      switch (command) {
        case 'delect':
          this.$emit('deleteSuccess', scope.row);
          break;
      }
    },
  },
};
</script>

<style lang="scss">

</style>
