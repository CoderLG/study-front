<template>
  <div>
    <NavComponent></NavComponent>
    <el-container class="full-container cloud-home-com" style='height: calc(100vh - 60px);'>
      <!-- <el-menu class="left-nav"
               background-color="#F3F4F8"
               :default-active="activeUrl()"
               :router="true"
               @open='openIndex'
               @close='openIndex'
               :unique-opened='true'
               :default-openeds='defaultOpeneds'
               text-color="#5C5C5E">
        <h3>
          <i class="el-icon-menu"></i>
          数据管理
        </h3>               
        <el-submenu index="/datamanager">
          <template slot="title">
            <img src="../assets/allfolder.png" v-show='folderIsOpened'>
            <img src="../assets/allfolderclose.png" v-show='!folderIsOpened'>
            <span slot="title" @click='showAllFilter'>全部文件</span>
          </template>
          <el-menu-item-group>            
            <div id='filterTree' class="ztree"></div>
          </el-menu-item-group>
        </el-submenu>
      </el-menu> -->
      <div class="left-nav">
        <h3>
          <i class="el-icon-menu"></i>
          数据管理
        </h3>
        <div class="left-nav-all">
          <img src="../assets/floder.png" v-show='folderIsOpened'>
          <img src="../assets/allfolderclose.png" v-show='!folderIsOpened'>
          <span slot="title" @click='showAllFilter'>全部数据</span>
        </div>
        <div id='filterTree' class="ztree"></div>
      </div>
      <el-container>
        <el-main class="full-container">
          <router-view @createNewFolderTree='createNewFolderTree' @editFolderTree='editFolderTree' @removeFolderTree='removeFolderTree' @initTree='initTree'></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import $ from 'jquery';
import NavComponent from './NavComponent';
import { getFoldersByParent } from '../api/fileApi';

export default {
  name: 'home-component',
  data() {
    return {
      defaultOpeneds: ['/datamanager'],
      zTreeObj: {},
      setting: {
        callback: {
          beforeExpand: this.zTreeBeforeExpand,
          beforeCollapse: this.zTreeBeforeExpand,
          onClick: this.zTreeBeforeClick,
        },
        data: {
          key: {
            name: "fileName",
          }
        },
      },
      zNodes: [],
      watchToken: false,
      folderIsOpened: true,
      theme2: 'light',
    };
  },
  async mounted() {
    this.zTreeObj = $.fn.zTree.init($('#filterTree'), this.setting, this.zNodes);
    this.initTree();
  },
  watch: {
    $route(to) {
      if (to.path.slice(1, 4) === 'pan') {
        // 当前的id
        const id = to.path.slice(5, to.path.length);
        // 将当前的文件夹展开
        if (id === '-1') {
          this.zTreeObj.expandAll(false);
        } else {
          const child = this.zTreeObj.getNodeByParam('id', id);
          this.zTreeObj.expandNode(child, true, false, true, true);
          child.children.forEach((res) => {
            if (res.empty === false) {
              this.zTreeObj.expandNode(res, false, false, true, false);
            }
          });
        }
      }
    },
  },
  methods: {
    // 新建文件夹触发tree更新
    createNewFolderTree() {
      // info
      // const currentRouteId = this.$router.currentRoute.path.slice(5, this.$router.currentRoute.path.length);
      // this.zTreeObj.addNodes(this.zTreeObj.getNodeByParam('id', currentRouteId), -1, [ info ], true);
      // this.zTreeObj.addNodes(this.zTreeObj.getNodeByParam('id', info.id), -1, [], true);
      this.initTree();
    },
    // 修改节点触发tree更新
    editFolderTree(info) {
      this.zTreeObj.getNodeByParam('id', info.id).name = info.fileName;
      this.zTreeObj.updateNode(this.zTreeObj.getNodeByParam('id', info.id));
      this.initTree()
    },
    // 删除节点触发tree更新
    removeFolderTree(info) {
      info.forEach(res => {
        this.zTreeObj.removeNode(this.zTreeObj.getNodeByParam('id', res));
      });
    },
    initTree() {
      getFoldersByParent(-1).then((res) => {
        res.reverse().forEach((val) => {
          if (val.empty === false) {
            getFoldersByParent(val.id).then((result) => {
              /* eslint-disable */
              val.children = result;
              /* eslint-enable */
              this.zNodes = res;
              this.zTreeObj = $.fn.zTree.init($('#filterTree'), this.setting, this.zNodes);
            });
          } else {
            this.zNodes = res;
            this.zTreeObj = $.fn.zTree.init($('#filterTree'), this.setting, this.zNodes);
            // if (val.pId === -1) {
            //   this.zTreeObj.addNodes(val, 0, [], true);
            //   this.zTreeObj.addNodes(null, 0, val, true);
            // } else {
            //   this.zTreeObj.addNodes(val, 0, [], true);
            // }
          }
        });
      });
    },
    zTreeBeforeExpand(treeId, treeNode) {
      this.watchToken = false;
      // this.$router.push({ path: `/datamanager/${treeNode.id}` });
      // 将当前的文件夹展开
      treeNode.children.forEach((val) => {
        if (val.empty === false) {
          getFoldersByParent(val.id).then((result) => {
            if (!val.children) {
              this.zTreeObj.addNodes(val, 0, result, true);
            }
          });
        } else {
          this.zTreeObj.addNodes(val, 0, [], true);
        }
      });
    },
    zTreeBeforeClick(event, treeId, treeNode) {
      this.$router.push({ path: `/datamanager/${treeNode.id}` });
    },
    // 展示全部文件
    showAllFilter() {
      this.$router.push({ path: '/datamanager' });
    },
    // 监听是否展开的是网盘
    openIndex(index) {
      if (index === '/datamanager') {
        this.$router.push({ path: '/datamanager' });
      }
      this.folderIsOpened = !this.folderIsOpened;
    },
    activeUrl() {
      const currentPath = this.$router.currentRoute.path;
      const index = currentPath.indexOf('/datamanager/');
      if (index > -1) {
        return currentPath.substr(0, index + 4);
      }
      return currentPath;
    },
  },
  components: {
    NavComponent,
  },
};
</script>

<style lang="scss">
  @import "../styles/color";
  .el-table th {
    padding: 7px 0px;
  }
  .cloud-home-com {
    .el-submenu__title {
      font-size: 14px;
      height: 30px;
      line-height: 37px;
      &:hover {
        background-color: rgb(243, 244, 248) !important;
      }
    }
  }
  #filterTree {
    overflow-x: scroll;
    padding-left: 27px;
    padding-bottom: 10px;
    height: calc(100vh - 145px);
    a {
      color: #5C5C5E;
    }
  }
  .left-nav {
    background-color: rgb(243, 244, 248);
    border-right: solid 1px #e6e6e6;
    .left-nav-all {
      font-size: 14px;
      line-height: 16px;
      padding-top: 15px;
      padding-left: 26px;
      img, span {
        cursor: pointer;
      }
      span {
        padding-left: 5px;
      }
    }
    h3 {
      line-height: 50px;
      margin: 0;
      font-size: 17px;
      color: #6e7173;
      position: relative;
      padding-left: 50px;
      text-align: left;
      border-bottom: 1px solid #dbdbdb;
      i {
        line-height: 41px;
        text-align: left;
        position: absolute;
        top: 6px;
        left: 25px;
      }
    }
    .fa-folder {
      color: #ffd02f;
      font-size: 20px;
    }
    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
    .el-submenu__icon-arrow {
      left: 30px;
      right: inherit;
      display: none;
    }
    &:not(.el-menu--collapse){
      width: 250px;
    }
    & .logo{
      text-align:center;
      padding: 0!important;
      background-color: #ffffff!important;
      height: auto;
    }
    height: 100%;
    & a{
      text-decoration: none;
    }
    .el-menu-item-group__title {
      padding: 0px;
    }
  }
</style>
