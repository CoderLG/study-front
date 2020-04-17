<template>
  <el-dialog
    :title="title"
    :visible.sync="folderDialogVisible"
    @open="init"
    custom-class="folder-dialog"
    :close-on-click-modal='false'
  >
    <div class="file-tree-container" v-loading="loading">
      <folder-select-item
        v-for="child in data"
        :key="child.id"
        :node="child"
        :refreshTree='refreshTree'>
      </folder-select-item>
    </div>
    <el-row style="margin-top: 10px">
      <el-col :span="12">
        <el-button icon="fa fa-folder fa-lg"
                   @click="newFolder" size="small"
        > 新建文件夹
        </el-button>
      </el-col>
      <el-col :span="12" class="btns">
        <el-button @click="cancelSelect" size="small">取 消</el-button>
        <el-button type="primary" @click="submitSelect" size="small">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import FolderSelectItem from './FolderSelectItem';

export default {
  props: {
    title: {
      type: String,
      default: '选择文件夹',
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    FolderSelectItem,
  },
  name: 'folder-select-component',
  data() {
    return {
      isTree: true,
      tree: this,
      isCreating: false,
      activeComponent: null,
      inited: false,
      data: null,
      folderDialogVisible: false,
      refreshTree: false,
    };
  },
  computed: {
    activeNode() {
      return this.activeComponent != null ? this.activeComponent.node : null;
    },
  },
  methods: {
    init() {
      if (!this.inited) {
        this.isTree = true;
        this.tree = this;
        this.inited = true;
        this.data = [{ id: -1, fileName: '全部数据', isExpand: true }];        
      }
      this.refreshTree = !this.refreshTree;
    },
    submitTreeFolder() {
      if (this.activeComponent != null && this.isCreating) {
        this.activeComponent.submitCreateFolder();
      }
    },
    show() {
      this.folderDialogVisible = true;
    },
    hide() {
      this.folderDialogVisible = false;
    },
    cancelSelect() {
      this.cancelInput();
      this.hide();
      this.$emit('cancel');
    },
    submitSelect() {
      this.cancelInput();
      this.$emit('submit', this.activeNode);
    },
    cancelInput() {
      if (this.activeComponent != null && this.isCreating) {
        this.activeComponent.cancelCreateFolder();
      }
    },
    newFolder() {
      if (!this.isCreating && this.activeNode != null) {
        this.isCreating = true;
        const newFolder = { fileName: '新建文件夹', isCreating: true, empty: true };
        if (this.activeComponent != null) {
          this.activeComponent.expand((children) => {
            children.unshift(newFolder);
          });
        } else {
          this.$set(this.activeNode, 'children', this.activeNode.children || []);
          this.activeNode.children.unshift(newFolder);
        }
      } else if (this.activeComponent != null) {
        this.activeComponent.selectInput();
      }
    },
  },
};
</script>

<style lang="scss">
  .folder-dialog {
    .el-dialog__body {
      padding: 20px;
    }
  }
  .file-tree-container {
    height: calc(100vh - 403px);
    border: 1px solid #f2f2f2;
    overflow: auto;
    min-height: 368px;
  }

  .btns {
    & > * {
      float: right;
      &:not(:first-child) {
        margin-right: 10px;
      }
    }
  }
</style>
