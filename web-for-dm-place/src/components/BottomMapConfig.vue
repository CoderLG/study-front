<template>
    <div class="bottomMapConfig">
    <el-dropdown size="small" @command="mapConfig" >
            <el-button type="primary" size='small' class="el-dropdown-link upload-btn">
            &nbsp;添加底图&nbsp;<i class="el-icon-caret-bottom"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="baseMap" style=" width: 140px;">
                已发布的基础服务
            </el-dropdown-item>
            <el-dropdown-item command="netMap" style=" width: 140px;">
                互联网地图
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <el-table :data="serviceDatas" highlight-current-row class="base-map-config">
        <el-table-column prop="layerName" label="底图名称" align='left' sortable>
          <template slot-scope="scope">
            <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="layerName" label="底图名称" align='left'></el-table-column> -->
        <el-table-column prop="tileType" label="底图来源" :formatter="baseFormatter" align='center'></el-table-column>
        <el-table-column prop="address" label="操作" align='center'>
            <template slot-scope="scope">
              <!-- <el-button type="primary" plain size="small"
                @click="setDefault(scope.$index, scope.row)" :class="scope.row.mapDefault === 1 ? 'active' : ''">设置默认</el-button> -->
            <el-button type="primary" plain size="small" v-if="scope.row.mapDefault === 0 "
              @click="setDefault(scope.$index, scope.row)">设置默认</el-button>
            <el-button type="primary" plain size="small" disabled
              @click="setDefault(scope.$index, scope.row)" v-if="scope.row.mapDefault === 1 ">当前默认</el-button>
              <el-button type="primary" plain size="small"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index, scope.row)">上移</el-button>
            <el-button type="primary" plain size="small"
              :disabled="scope.$index===(serviceDatas.length-1)"
              @click="moveDown(scope.$index, scope.row)">下移</el-button>
            <el-button type="danger" plain size="small"
              @click="removeStylesList(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 已发布的基础服务 -->
    <el-dialog
        title="已发布的基础服务"
        :visible.sync="baseDialogVisible"
        :show-close ="true"
        width="50%"
        :close-on-click-modal='false'
        center>
        <el-table v-loading="publishLoad" ref="multipleTable" :data="baseMapList"
        @selection-change="basetableSelectionChange"
        highlight-current-row
        :row-key="getRowKeys"
        class="published-services">
        <el-table-column type="selection" :reserve-selection="true" width="55" :selectable='checkboxInit'></el-table-column>
        <el-table-column prop="layerName" label="底图名称" align='left' sortable>
          <template slot-scope="scope">
            <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="layerName" label="底图名称"></el-table-column> -->
        <el-table-column prop="tileType" label="底图来源" align='center' :formatter="formatter"></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          :current-page="imageCurrentPage"
          @current-change="imageLayerCurrentChange"
          :page-size="imageLayerPageSize"
          :total="imageLayerTotal"
          layout="total, prev, pager, next">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="baseConfirm">确 定</el-button>
          <el-button size="small" @click="baseDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
     <!-- 互联网底图 -->
     <el-dialog
        title="互联网底图"
        :visible.sync="netDialogVisible"
        :show-close ="true"
        width="50%"
        :close-on-click-modal='false'
        center>
        <el-table v-loading="publishLoad" :data="netMapList" ref="multipleTable"
        @selection-change="netTableSelectionChange"
        highlight-current-row
        class="published-services">
        <el-table-column type="selection" width="55" :selectable='checkboxInit' ></el-table-column>
        <el-table-column prop="layerName" label="底图名称" align='left' sortable>
          <template slot-scope="scope">
            <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="layerName" label="底图名称"></el-table-column> -->
        <el-table-column prop="tileType" label="底图来源" align='center' :formatter="formatter"></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          :current-page="netConfigCurrentPage"
          :page-size="netConfiglayerPageSize"
          :total="netConfiglayerTotal"
          layout="total, prev, pager, next">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="netConfirm">确 定</el-button>
          <el-button size="small" @click="netDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import { getTileLayersList } from '../api/imageApi';
import { addBaseMapData, delBaseMapData, getBaseMapData, setBaseMapDefault } from '../api/fileApi';

const netMapDatas = require('../../static/netMapDatas.json');

export default {
  data() {
    return {
      publishLoad: false, 
      baseDialogVisible: false,
      netDialogVisible: false,
      currentLayerType: '',
      // layerCurrentPage: 0,
      baseMapList: [],
      serviceDatas: [],
      multipleSelection: [],
      baseSelections: [],
      netSelections: [],
      // 互联网底图
      netMapList: netMapDatas,
      netConfigCurrentPage: 1, // 图层列表当前页数
      netConfiglayerTotal: 100, // 图层列表的总页数
      netConfiglayerPageSize: 20, // 图层列表每页条目数
      // 已发布的基础服务底图
      imageCurrentPage: 1, // 互联网列表当前页数
      imageLayerTotal: 100, // 互联网列表的总页数
      imageLayerPageSize: 20, // 互联网列表每页条目数
       getRowKeys(row) {
        return row.id;
      },
    };
  },
  methods: {
    baseFormatter(row) {
      if (row && (row.tileType === 'NET' || row.tileType === 'NET-U')) {
        return '互联网地图';
      }
      return '已发布的基础服务';
    },
    formatter(row) {
      if (row && row.layerType === 'IMAGELAYER') {
        return '基础服务影像';
      } 
      return '互联网地图';
    },
    mapConfig(command) {
      switch (command) {
        case 'baseMap':
          this.getServiceLayerList();
          this.currentLayerType = 'BASE';
          this.baseDialogVisible = true;
          if (this.$refs.multipleTable) {
            this.$refs.multipleTable.clearSelection();
          }
          break;
        case 'netMap':
          this.currentLayerType = 'NET';
          this.netConfiglayerTotal = netMapDatas.length;
          this.netDialogVisible = true;
          if (this.$refs.multipleTable) {
            this.$refs.multipleTable.clearSelection();
          }
          break;
        default:
      }
    },
    // 数组排序
    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    refresh() {
      getBaseMapData().then(res => {
        this.serviceDatas = res.sort(this.compare('baseMapId'));
      });
    },
    //向上移动
    moveUp(index) {
      var that = this;
      if (index > 0) {
          let upDate = that.serviceDatas[index - 1];
          that.serviceDatas.splice(index - 1, 1);
          that.serviceDatas.splice(index,0, upDate);
      } else {
        this.$message.warning('已经是第一条，不可上移');
      }
    },
    //向下移动
    moveDown(index){
      var that = this;
      if ((index + 1) === that.serviceDatas.length){
        this.$message.warning('已经是最后一条，不可下移');
      } else {
        let downDate = that.serviceDatas[index + 1];
        that.serviceDatas.splice(index + 1, 1);
        that.serviceDatas.splice(index,0, downDate);
      }
    },
    // 删除
    async removeStylesList(index) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning',
      }).then(() => {
        if (this.serviceDatas.length !== 0) {
         delBaseMapData(this.serviceDatas[index].baseMapId).then(res => {
           this.$message.success({ message: res.resultInfo, showClose: true });
           this.refresh();
         });
        }
      }).catch(() => {
        this.$message.error({ message: '删除失败', showClose: true });
      });
    },
    // 分页获取数据
    async imageLayerCurrentChange(val) {
      this.imageCurrentPage = val;
      this.publishLoad = true;
      const imgePageLayerList = await getTileLayersList(this.imageCurrentPage, this.imageLayerPageSize, 'DESC', 'IMAGELAYER', true, '');
      this.baseMapList = imgePageLayerList.data;
      this.publishLoad = false;
    },
    // 获取服务列表
    async getServiceLayerList() {
      this.publishLoad = true;
      // this.layerCurrentPage = 1;
      // const demPageLayerList = await getTileLayersList(this.layerCurrentPage - 1, 20, 'DESC', 'DEM', 'BASE', '');
      // const imgePageLayerList = await getTileLayersList(this.layerCurrentPage - 1, 20, 'DESC', 'IMAGE', 'BASE', '');
      // this.baseMapList = demPageLayerList.content.concat(imgePageLayerList.content);
      const imgePageLayerList = await getTileLayersList(this.imageCurrentPage, this.imageLayerPageSize, 'DESC', 'IMAGELAYER', true, '');
      this.imageLayerTotal = imgePageLayerList.total;
      this.baseMapList = imgePageLayerList.data;
      this.publishLoad = false;
      this.refresh();
    },
    /**
       * 表格选中改变事件
       * @param value
       */
    basetableSelectionChange(value) {
      this.baseSelections = value;
    },
    netTableSelectionChange(value) {
      this.netSelections = value;
    },
    checkboxInit(row) {
     const list = this.serviceDatas;
      let element;
      for (let i = 0; i < list.length; i += 1) {
        element = list[i].id;
        if (row.id === element) {
          return 0;// 不可勾选
        }
      }
      return 1;// 可勾选
    },
    // 确定
    async baseConfirm() {
      if (this.baseSelections.length > 0) {
        // 添加数据
        addBaseMapData(this.baseSelections).then(() => {
          this.refresh();
          this.baseDialogVisible = false;
          this.$message.success({ message: "底图配置信息上传成功", showClose: true });
        });
      } else {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的数据', showClose: true });
      }
    },
    async netConfirm() {
      if (this.netSelections.length > 0) {
        addBaseMapData(this.netSelections).then(() => {
          this.refresh();
          this.netDialogVisible = false;
          this.$message.success({ message: "底图配置信息上传成功", showClose: true });
        });
      } else {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的数据', showClose: true });
      }
    },
    // 设置为默认图层
    setDefault(index, data) {
      this.$store.dispatch('getBaseImageObj', { state: data });
      setBaseMapDefault(data.baseMapId).then(res => {
        this.refresh();
        this.$notify({
          title: res.resultInfo,
          type: 'success',
        });
        // this.$message.success({ message: res.resultInfo, showClose: true });
      });
      return 'defaultMapBottom';
    },
  },
};
</script>
<style lang="scss">
 .el-message-box__btns button:nth-child(1) {
    margin-left: 10px;
    float: right;
  }
.el-dropdown-menu--small .el-dropdown-menu__item{
  width: 110px;
  text-align: center;
  line-height: 40px;
  padding: 0 15px;
}
.el-popper[x-placement^=bottom] {
  margin-top: 4px;
}
.bottomMapConfig{
   .el-pagination {
    line-height: 0px;
    padding-top: 10px;
    text-align: left;
    margin: 0px 20px;
  }
  .base-map-config{
    width: 100%;
    border-top: 1px solid rgb(235, 238, 245);
    line-height: 2.5;
    .el-table__body-wrapper {
      height: calc(100vh - 260px);
      overflow-y: auto;
    }
  }
  .published-services{
    width: 100%;
    height: 100%;
    border-top: 1px solid rgb(235, 238, 245);
    line-height: 2;
    height: calc(100vh - 419px);
    overflow-y: scroll;
    min-height: 366px;
  }
  .el-dropdown {
    padding: 0px 8px;
    padding-left: 20px;
  }
  .el-dialog__header {
    background: #0c8bde;;
    padding: 0px;
    text-align: left;
    padding-left: 20px;
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #fbfbfb;
  }
  .el-dialog__footer {
    padding: 0px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-dialog--center .el-dialog__body {
      text-align: initial;
      padding: 20px 20px 0px;
  }
  .active{
    color: #fff;
    background-color: #0c8bde;;
    border-color: #0c8bde;;
  }
 .el-table__body tr td, .el-table__header {
    padding-left: 15px;
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: 0 !important;
  }
  .dialog-footer > button {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .el-dialog__headerbtn {
    top: 17px !important;
    line-height: normal;
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-table::before {
    height: 0px;
  }
  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 1.5;    
  }
  .el-table td:first-of-type .cell {
    width: calc(100vw / 2 - 525px)!important;
    overflow: hidden;
    P {
      width: 100%;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
