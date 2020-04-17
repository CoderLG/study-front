<template>
  <el-table :data="data" size="mini" border>
    <el-table-column
      label="名称"
      sortable>
      <template slot-scope="scope">
        <i class="fa fa-lg"
           :class="scope.row.dir?'fa-folder':'fa-file'">
        </i>
        {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column
      sortable
      label="可用者">
      <template slot-scope="scope">
        <el-tag v-for="user of scope.row.shareUsers" :key="user"
                size="mini"
                style="margin: 5px">
          {{user}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="createTime"
      label="分享时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="delShare(scope.row.id)">取消</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getShares, deleteShare } from '../api/fileApi';

export default {
  name: 'MyShareComponment',
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    async initTableData() {
      this.data = await getShares();
    },
    delShare(shareId) {
      if (shareId > 0) {
        this.$confirm('此操作将取消永久所选择的共享, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const result = await deleteShare(shareId);
          if (result === 1) {
            const index = this.data.findIndex(item => item.id === shareId);
            this.$delete(this.data, index);
            this.$message.success('删除成功!');
          }
        });
      } else {
        this.$message.warning('所选条目异常!');
      }
    },
  },
};
</script>

<style scoped>

</style>
