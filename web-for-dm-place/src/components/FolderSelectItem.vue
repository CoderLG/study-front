<template>
  <div>
    <div class="folder-item" @click.self="handleNodeClick">
      <i class="fa fa-lg fa-fw expand-icon"
        :class="node.isExpand?'fa-caret-down':'fa-caret-right'"
        v-if="!node.empty" @click.stop="handleExpandIconClick"></i>
      <i v-else class="fa fa-fw fa-lg"></i>
      <div class="file-item" :class="{'is-active': tree.activeNode.id===node.id}">
        <i class="fa fa-folder fa-lg fa-fw" @click.self="handleNodeClick"></i>
        <template v-if="tree.isCreating && node.isCreating">
          <el-input ref="newFolderInput" v-model="node.fileName"
                    :placeholder="node.fileName"
                    style="width: 150px"
                    size="small"
                    @keyup.enter.native="submitCreateFolder"
                    :autofocus="true"
                    :clearable="true">
          </el-input>
          <span class="fa-stack" @click.stop="submitCreateFolder">
                            <i class="fa fa-square-o fa-stack-2x"></i>
                            <i class="fa fa-check fa-stack-1x"></i>
                          </span>
          <span class="fa-stack" @click.stop="cancelCreateFolder">
                            <i class="fa fa-square-o fa-stack-2x"></i>
                            <i class="fa fa-close fa-stack-1x"></i>
                          </span>
        </template>
        <span v-else @click.self="handleNodeClick" :title='node.fileName'>{{node.fileName}}</span>
      </div>
    </div>
    <div class="folder-item-children" v-if="node.isExpand">
      <folder-select-item
        class="folder"
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @node-click="handleNodeClick">
      </folder-select-item>
    </div>
  </div>
</template>

<script>

import { fileCreateNewFolder, getFoldersByParent } from '../api/fileApi';

export default {
  name: 'folder-select-item',
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },
    refreshTree: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tree: null,
    };
  },
  created() {
    let parent = this.$parent;
    while ((!parent.isTree) || !parent.tree) {
      parent = parent.$parent;
    }
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
    if (!this.tree.activeComponent) {
      this.tree.activeComponent = this;
      if (this.node.isExpand) {
        this.expand();
      }
    }
  },
  watch: {
    // eslint-disable-next-line
    'tree.isCreating' () {
      this.$nextTick(() => {
        this.selectInput();
      });
    },
    // eslint-disable-next-line
    'node.children' (newValue) {
      if (newValue) {
        this.$set(this.node, 'empty', newValue.length === 0);
      }
    },
    refreshTree() {
      this.expand();
    },
  },
  methods: {
    selectInput() {
      if (this.$refs.newFolderInput) {
        this.tree.activeComponent.$el.scrollIntoView();
        this.$refs.newFolderInput.select();
      }
    },

    async submitCreateFolder() {
      if (!this.node.fileName || this.node.fileName.length < 1) {
        this.$message.error('文件夹名称不能为空!');
        this.selectInput();
      } else {
        try {
          const result = await fileCreateNewFolder(this.node.fileName, this.tree.activeNode.id);
          this.cancelCreateFolder();
          this.tree.activeNode.children.push(result);
        } catch (e) {
          this.cancelCreateFolder();
        }
      }
    },
    cancelCreateFolder() {
      const children = this.tree.activeNode.children;
      if (this.tree.isCreating && children && children.length > 0) {
        const index = children.findIndex(item => item.isCreating);
        this.$delete(children, index);
      }
      this.tree.isCreating = false;
    },
    handleNodeClick() {
      this.cancelCreateFolder();
      this.tree.activeComponent = this;
    },
    handleExpandIconClick() {
      this.setExpandValue(!this.node.isExpand);
      if (this.node.isExpand) {
        this.expand();
      }
    },
    setExpandValue(value) {
      this.$set(this.node, 'isExpand', value);
    },
    async expand(done) {
      if (this.tree) {
        this.setExpandValue(true);
        const children = await getFoldersByParent(this.node.id || -1);
        if (typeof done === 'function') {
          done(children);
        }
        this.$set(this.node, 'children', children);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  $backgroundColor:#f4f9fd;
  .folder-item {
    padding: 2px 0;
    border-width: 1px 0;
    border-style: solid;
    border-color: #ffffff;
    cursor: default;
    .fa-lg {
      margin-right: 0px;
    }
    .file-item {
      display: inline-block;
      padding: 2px 5px 2px 0px;
      border: 1px solid white;
      &.is-active{
        background: #e5f0fb;
        border:1px solid #BBD4EF;
      }
      span {
        max-width: calc(100vw/2 - 135px);
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
    }    
    .expand-icon {
      cursor: pointer;
      color: #8c8c8c;
    }
    .fa-folder {
      color: #FFD02F;
    }
  }
  .folder-item-children {
    margin-left: 20px;
  }
</style>
