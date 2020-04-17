<template>
  <div>
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
        label="分享人">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            style="margin: 5px">
            {{scope.row.shareUser}}
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
          <el-button v-if="!scope.row.dir"
                     type="primary"
                     size="mini"
                     icon="fa fa-lg fa-download"
                      @click="downLoad(scope.row.deId)">
            下载
          </el-button>
          <el-button type="success"
                     icon="fa fa-lg fa-save"
                     size="mini" @click="saveTo(scope.row.deId)">
            保存至网盘
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <folder-select-component ref="folderSelectComponent"
                             @submit="submitFolderSelect"
    ></folder-select-component>
  </div>

</template>

<script>
import { copyFiles, downloadFileURL, getBeShares, showWindow } from '../api/fileApi';
import FolderSelectComponent from './FolderSelectComponent';

export default {
  name: 'ShareMeComponment',
  components: {
    FolderSelectComponent,
  },
  data() {
    return {
      data: [],
      activeId: null,
    };
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    async initTableData() {
      this.data = await getBeShares();
    },
    saveTo(deId) {
      this.activeId = deId;
      this.$refs.folderSelectComponent.show();
    },
    async submitFolderSelect(node) {
      const result = await copyFiles([this.activeId], node.id);
      if (result.code === 1) {
        this.$message.success('保存完成');
        this.$refs.folderSelectComponent.hide();
      } else {
        this.$message.error('保存失败');
      }
    },
    downLoad(deId) {
      showWindow(downloadFileURL(deId));
    },
  },
};
</script>

<style scoped>

</style>
