<template>
  <el-table :data="tableData" v-loading="tableDataLoading">
    <el-table-column prop="svName" label="图层名称"
     align='left' sortable>
       <template slot-scope="scope">
          <p :title='scope.row.svName'>{{ scope.row.svName }}</p>
        </template>
     </el-table-column>
    <el-table-column prop="description" label="描述"
     width='140' align='center' sortable></el-table-column>
    <el-table-column prop="createTime" label="创建时间"
     width='210' align='center' sortable></el-table-column>
    <el-table-column prop="work" width='360' label="操作" align='center'>
      <template slot-scope="scope">
        <el-button size="small" type="primary" plain @click='showDetails(scope.row)'>详情</el-button>
        <el-button size="small" type="primary" plain @click='previewStreet(scope.row)'>预览</el-button>
        <el-button size="small" type="primary" plain @click='serverAddress(scope.row)'>服务地址</el-button>
        <el-button size="small" type="primary" plain @click='deleteStreet(scope.row)'>删除</el-button>
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
      this.$emit('streetDetails', row);      
    },
    previewStreet(row) {
      this.$emit('previewStreet', row);
    },
    serverAddress(row) {
      this.$emit('serverAddress', row);
    },
    deleteStreet(row) {
      this.$emit('deleteStreet', row);
    },
  },
};
</script>

<style lang="scss">

</style>
