<template>
  <div class="layerGroupComponent">
    <el-main v-show='showMain[0]'>
      <div class="service-manage-title">图层组管理</div>
      <el-form :inline="true" class='service-manage-title-search'>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="layerGroupSearchData" clearable size="small"></el-input>
          <el-button icon="el-icon-search" type="primary"
          size="small"></el-button>
        </el-form-item>
        <el-button type="primary" size="small" @click="addLayerGroup">添加图层组</el-button>
        <el-button type="primary" plain size="small" icon='el-icon-refresh'
                 style="margin-left: 5px"
       title='刷新图层组列表' @click='refreshData'></el-button>
      </el-form>
      <!--图层组列表-->
      <el-table :data="layerGroupData" key="layerGroupData" highlight-current-row>
        <!-- <el-table-column align='left' prop="layerName" label="图层组名称" sortable>
        </el-table-column> -->
        <el-table-column prop="layerName" label="图层名称" align='left' sortable>
          <template slot-scope="scope">
            <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="mimeType" align='center' label="瓦片格式" sortable width='130'>
        </el-table-column>
        <el-table-column prop="gridSet" label="格网集" align='center' sortable width='130'></el-table-column>
        <el-table-column prop="levelarea" label="层级范围" align='center'  width='120'>
          <template slot-scope="scope">
          {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
          </template>
        </el-table-column>
        <el-table-column prop="tileStatus" label="切片状态" align='center' sortable width='120'>
          <template slot-scope="scope">{{ scope.row.tileStatus }}</template>
        </el-table-column>
        <el-table-column label="操作" width='360' align='center'>
          <template slot-scope="scope">
            <el-button size="small" type="primary" plain
             @click='showDetails(scope.row)' >详情</el-button>
            <el-button size="small" type="primary" plain
             @click='previewLayer(scope.row)' :disabled='scope.row.tileStatus === "PROCESS"'>预览</el-button>
            <el-button size="small" type="primary" plain
             @click='showAddress(scope.row)'>服务地址</el-button>
            <el-dropdown trigger="click" @command="handleCommand(scope, $event)">
              <el-button size="small" type="primary" plain
              class="el-dropdown-link">更多</el-button>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="sliceTile" v-if="scope.row.tileStatus !== 'PROCESS'">切片</el-dropdown-item>
              <el-dropdown-item command="stopSliceTile" v-if="scope.row.tileStatus === 'PROCESS'">停止切片</el-dropdown-item>
              <el-dropdown-item command="delect">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="服务地址" :visible.sync="addressTableVisible" class='sever-address-dialog' :close-on-click-modal='false'>
        <div>
          <el-form :model="serverUrlForm" :label-position="labelPosition" label-width="150px" class="serverUrlForm">
            <!-- tms -->
            <el-form-item label="TMS" class="serverUrlForm-label" v-if="serverUrlForm.tmsurl"></el-form-item>
            <el-form-item label="基础地址" v-if="serverUrlForm.tmsurl">
              <el-input v-model="serverUrlForm.tmsurl">
                <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="serverUrlForm.tmsurl"
                  icon="el-icon-share" @click="copy"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <el-form :model="serverUrlForm" :label-position="labelPosition" label-width="150px" class="serverUrlForm">
            <!-- wms -->
            <el-form-item label="WMS" class="serverUrlForm-label" v-if="serverUrlForm.wmsurl"></el-form-item>
            <el-form-item label="基础地址" v-if="serverUrlForm.wmsurl">
              <el-input v-model="serverUrlForm.wmsurl">
                <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="serverUrlForm.wmsurl"
                  icon="el-icon-share" @click="copy"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="GetCapabilities示例" v-if="serverUrlForm.getCapabilitiesWmsUrl">
              <el-input v-model="serverUrlForm.getCapabilitiesWmsUrl">
                <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="serverUrlForm.getCapabilitiesWmsUrl"
                  icon="el-icon-share" @click="copy"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <el-form :model="serverUrlForm" :label-position="labelPosition" label-width="150px" class="serverUrlForm">
            <!-- wmts -->
            <el-form-item label="WMTS" class="serverUrlForm-label" v-if="serverUrlForm.wmtsurl"></el-form-item>
            <el-form-item label="基础地址" v-if="serverUrlForm.wmtsurl">
              <el-input v-model="serverUrlForm.wmtsurl">
                <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="serverUrlForm.wmtsurl"
                  icon="el-icon-share" @click="copy"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="GetCapabilities示例" v-if="serverUrlForm.getCapabilitiesWmtsUrl">
              <el-input v-model="serverUrlForm.getCapabilitiesWmtsUrl">
                <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="serverUrlForm.getCapabilitiesWmtsUrl"
                  icon="el-icon-share" @click="copy"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="基础地址" v-if="serverUrlForm.url">
              <el-input v-model="serverUrlForm.url">
                <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="serverUrlForm.url"
                  icon="el-icon-share" @click="copy"></el-button>
              </el-input>
            </el-form-item>  
          </el-form>
        </div>
        <el-button size="small" type="primary" @click='addressTableVisible = false'>确定</el-button>
      </el-dialog>
      <el-dialog title="详情" :visible.sync="isShowDetails" :close-on-click-modal='false' class='layer-grop-details'>
        <div class="server-manager-layer-details">
          <table>
            <tr v-for='(li, index) in layerDetails' :key='index'>
              <td>{{ li.name }}</td>
              <td>{{ li.value }}</td>
            </tr>
            <tr>
              <td>切片进度</td>
              <td><el-progress :text-inside="true" :stroke-width="18" :percentage="tilePercent"></el-progress></td>
            </tr>
          </table>
          <el-table :data="layerListDetails" align='center' size="mini" border >
            <el-table-column type="index" label="序号"/>
            <el-table-column align='left' prop="layerName" label="图层名称" />
            <el-table-column prop="layerType" label="图层来源" align='center' :formatter="formatter"/>
          </el-table>
        </div>
        <el-button class="server-manager-layer-details-bth" type="primary"
         size="small" @click='isShowDetails = false'>确认</el-button>         
      </el-dialog>
      <!--图层组分页-->
      <el-pagination
        background
        :current-page="layerGroupCurrentPage"
        @current-change="layerGroupCurrentChange"
        :page-size="layerGroupPageSize"
        :total="layerGroupTotal"
        layout="total, prev, pager, next">
      </el-pagination>
    </el-main>
    <el-main v-show='showMain[2]'>
      <LayerGroupPublishService :isAddLayerGroup ='isAddLayerGroup' @goBack='goBack'></LayerGroupPublishService>
    </el-main>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import { getLayersList, deleteLayers, sliceTileLayer, stopLayerSliceTile, sliceTileLayerProgress } from '../api/imageApi';
import UrlSetting from '../api/UrlSetting';
import LayerGroupPublishService from './LayerGroupPublishService';

export default {
  components: {
    LayerGroupPublishService,
  },
  props:{
    isGoBackInit:{
      type:Boolean,
    },
  },
  data() {
    return {
      showMain: [true, false, false],
      currentTileType: 'layerGroup',
      labelPosition: 'left',
      addressTableVisible: false, // 服务地址的显隐
      isShowDetails: false, // 数据详情的显隐
      tilePercentTime: '', // 切片的定时器
      tilePercent: 0, // 切片进度
      // 图层组列表
      layerGroupSearchData: '', // 图层组的搜索内容
      layerGroupCurrentPage: 1, // 图层组列表当前页数
      layerGroupData: [], // 图层组列表数据
      layerGroupTotal: 100, // 图层组列表的总页数
      layerGroupPageSize: 20, // 图层组列表每页条目数
      serverUrlForm: {
        tmsurl: '192...',
        wmsurl: '192...',
        getCapabilitiesWmsUrl: '192...',
        wmtsurl: '192...',
        getCapabilitiesWmtsUrl: '192...',
        dataId: ''
      },
      layerDetails: [
        {name: '服务名称', value: ''},
        {name: '瓦片格式', value: ''},
        {name: '格网集', value: ''},
      ],
      layerListDetails: [],
      currentInputVal: '',
      isAddLayerGroup:true,//用于记录是否点击新建按钮
    };
  },
  watch: {
    isGoBackInit(){
      this.showMain = [true, false, false];
    },
    layerGroupSearchData(val) {
      this.currentInputVal = val;
      this.layerGroupListTable(1, val);
    },
    isShowDetails(isTrue) {
      if (!isTrue) clearInterval(this.tilePercentTime);
        if (this.tilePercent === 100){
        this.layerGroupListTable();
      }
    }
  },
  methods: {
    formatter(row) {
      if (row && row.layerType === 'IMAGELAYER') {
        return '影像图层';
      } else if (row.layerType === 'VECTORLAYER') {
        return '矢量图层';
      }
    },
    //添加图层组
    addLayerGroup(){
      this.tabMain(2);
      this.isAddLayerGroup = !this.isAddLayerGroup;
    },
    // 切换左侧列表
    tabMain(index) {
      this.showMain = [false, false, false];
      this.showMain[index] = true;
    },
    // 返回
    goBack() {
      this.layerGroupListTable();
      this.tabMain(0);
    },
     // 刷新数据列表
    refreshData() {
      this.layerGroupListTable( 1, this.currentInputVal );
    },
    // 获取分页列表
    async layerGroupCurrentChange(val) {
      this.layerGroupCurrentPage = val;
      const layerGroupDatas = await getLayersList(
        this.layerGroupCurrentPage, this.layerGroupPageSize, 'DESC', 'LAYERGROUP', false, '');
      this.layerGroupData = layerGroupDatas.data;
      this.layerGroupTotal = layerGroupDatas.total;
    },
    // 搜索查询
    async layerGroupListTable(val, input) {
      const LayerGroupList = await getLayersList(val, this.layerGroupPageSize, 'DESC', 'LAYERGROUP', false, input );
      this.layerGroupData = LayerGroupList.data;
      this.layerGroupTotal = LayerGroupList.total;
      this.tableData2Loading = false;      
    },
    // 复制事件
    copy() {
      const clipboard = new Clipboard('.copybtn');
      clipboard.on('success', () => {
        this.$notify({
          title: '复制成功',
          type: 'success'
        });
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        this.$notify({
          title: '复制失败',
          type: 'error'
        });
        clipboard.destroy();
      });
    },
    // 图层详情
    async showDetails(row) {
      this.isShowDetails = true;
      this.tilePercent = 0;
      const detailArray = [];
      let max = 0;
      if (row.tileLayers) {
        max = row.tileLayers.length;
      }
      for (let i = 0; i < max; i += 1) {
        detailArray.push(row.tileLayers[i].layermember);
      }
      this.layerListDetails = detailArray;
      this.sliceTileImageStatusRes(row);
      this.layerDetails = [
        {name: '图层名称', value: row.layerName},
        {name: '瓦片格式', value: row.mimeType},
        {name: '格网集', value: row.gridSet},
        {name: '层级范围', value: `${row.minLevel}-${row.maxLevel}`},
        {name: '切片状态', value: row.tileStatus},
        // {name: '切片进度', value: this.tilePercent},
      ];
    },
    sliceTileImageStatusRes(row) {
      if (row.tileStatus !== 'SUCCESS') {
        this.tilePercentTime = setInterval(() => {
          sliceTileLayerProgress(row.id).then(res => {
            this.tilePercent = Number(res.progress.toFixed(2));
            if (this.tilePercent === 100) {
              clearInterval(this.tilePercentTime);              
               this.layerGroupListTable();
              this.layerDetails[4].value = 'SUCCESS';
            }
          }).catch(() => {
            clearInterval(this.tilePercentTime);
          })
        }, 1000);
      } else {
        this.tilePercent = 100;
      }
    },
    // 图层预览
    previewLayer(row) {
      const routeData = this.$router.resolve({
        path: `/open/${this.currentTileType}:${row.id}`
      });
      window.open(routeData.href);
    },
    // 展示数据的服务地址
    showAddress(row) {
      this.serverUrlForm = {
        tmsurl: UrlSetting.URLS.previewImage+'/gwc/service/tms/1.0.0/'+row.layerName+'@'+row.gridSet+'@'+row.mimeType.toLowerCase() ,
        wmsurl: UrlSetting.URLS.previewImage+'/gwc/service/wms?layers='+row.layerName+'&TILED=true',
        getCapabilitiesWmsUrl: UrlSetting.URLS.previewImage + '/gwc/service/wms?layers='+row.layerName+'&service=WMS&version=1.1.1&request=GetCapabilities',
        wmtsurl: UrlSetting.URLS.previewImage + '/gwc/service/wmts?layers='+row.layerName,
        getCapabilitiesWmtsUrl: UrlSetting.URLS.previewImage + '/gwc/service/wmts?layers='+row.layerName+'&service=WMTS&request=GetCapabilities',
        dataId: row.dataId,
      };
      this.addressTableVisible = true;
    },
    // 删除图层组
    removeLayer(row) {
      this.$confirm('删除该图层可能会影响业务运行，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLayers(row.id).then(() => {
          if(this.layerGroupData.length === 1 && this.layerGroupCurrentPage > 1) {
            this.layerGroupCurrentPage = this.layerGroupCurrentPage - 1;
          }
          this.layerGroupListTable(this.layerGroupCurrentPage);
          this.layerTotal -= 1; // 总量减1
          this.$message.success({ message: '删除成功！', showClose: true });
        });
      });
    },
    // 切片
    sliceTile(row) {
      if (row.tileStatus !== 'SUCCESS') {
        this.$confirm('确定切片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          sliceTileLayer(row.id).then(() => {
            this.layerGroupListTable();
            this.$message.success({ message: '切片请求发送成功', showClose: true });
          });
        }).catch(() => {});
      } else {
        this.$message.warning({ message: '该数据已切片完成', showClose: true });
      }
    },
    // 停止切片
    stopSliceTile(row) {
      stopLayerSliceTile(row.id).then(() => {
        this.layerGroupListTable();
        this.$message.success({ message: '停止切片请求发送成功', showClose: true });
      });
    },
    // 更多操作
    handleCommand(scope, command) {
      switch (command) {
        case 'sliceTile':
          this.sliceTile(scope.row);
          break;
        case 'delect':
          this.removeLayer(scope.row);
          break;
        case 'stopSliceTile':
          this.stopSliceTile(scope.row);
          break;
        case 'edit':
          this.vectorEdit(scope.row);
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.layerGroupComponent {
  .layer-grop-details {
    .el-dialog__header {
      padding: 0px;
      line-height: 50px;
      background: #0c8bde;
      padding-left: 20px;
    }
  }
  .server-manager-layer-details {
    .el-table__body-wrapper {
      height: auto;
      overflow-y: auto;
      .el-table thead {
        color: #453e3e;
        font-weight: 700;
      }
    }
    .el-table td.is-center {
      padding-right: 0px;
    }
  }
  .sever-address-dialog {
    .el-dialog__body {
      height: calc(100vh - 365px);
      min-height: 450px;
      overflow-y: auto;
      padding: 0px;
      > button {
        margin: 15px auto;
        display: block;
        margin-bottom: 15px;
      }
    }
    .el-dialog__body > div {
      height: calc(100vh - 427px);
      min-height: 388px;
      overflow-y: auto;
        > button {
        margin: 15px auto;
        display: block;
      }
    }
  }
  .el-table td:first-of-type .cell {
    width: calc(100vw / 2 - 535px)!important;
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


