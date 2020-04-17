<template>
  <div>
    <div class="service-manage-title">图层管理</div>
    <div class="service-manage-title-search">
      <el-button type="primary" size="small" @click='servicePublic'>发布服务</el-button>
      <el-button type="primary" plain size="small" icon='el-icon-refresh'
                 style="margin-left: 5px"
       title='刷新图层列表' @click='refreshData'></el-button>
      <div>
        <el-input v-if="currentTileType == 'image' || currentTileType == 'baseImage'" placeholder="请输入内容"
         v-model="imagemodel" clearable size="small"></el-input>
        <el-input v-if="currentTileType == 'shp'" placeholder="请输入内容"
         v-model="vectormodel" clearable size="small"></el-input>
        <el-input v-if="currentTileType == 'dem'" placeholder="请输入内容"
         v-model="demmodel" clearable size="small"></el-input>
        <el-input v-if="currentTileType == 'tiltphoto'" placeholder="请输入内容"
         v-model="tiltphotomodel" clearable size="small"></el-input>
        <el-input v-if="currentTileType == 'timeImage'" placeholder="请输入内容"
         v-model="timeimagemodel" clearable size="small"></el-input>
        <el-input v-if="currentTileType == 'streetView'" placeholder="请输入内容"
         v-model="streetViewmodel" clearable size="small"></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" v-if="currentTileType !== 'placeName'"></el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableDataLoading"
      v-show="currentTileType !== 'placeName' && currentTileType !== 'tiltphoto' && currentTileType !== 'streetView'">
      <el-table-column prop="layerName" label="图层名称" align='left' sortable>
        <template slot-scope="scope">
          <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="mimeType" label="瓦片格式" width='140' align='center' sortable></el-table-column>
      <el-table-column prop="gridSet" label="格网集" width='130' align='center' sortable></el-table-column>
      <el-table-column prop="levelarea" label="层级范围" width='120' align='center'>
        <template slot-scope="scope">
          {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
        </template>
      </el-table-column>
      <el-table-column prop="tileStatus" label="切片状态" width='120' align='center' sortable></el-table-column>
      <div v-if="currentTileType === 'image' || currentTileType === 'shp'">
        <el-table-column prop="status"
        label="发布状态" width='120' align='center' sortable>
        <template slot-scope="scope">
          {{ publisStatusMap[scope.row.status] }}
        </template>
         </el-table-column>
      </div>
      <el-table-column prop="work" width='360' label="操作" align='center'>
        <template slot-scope="scope">
          <!--仅矢量图层操作-->
          <div v-if='scope.row.status && scope.row.status !== "SUCCESS"'>
            <el-button v-if='scope.row.status === "FAILED"' size="small" type="primary" plain @click='showDetails(scope.row)'>详情</el-button>
            <el-button v-else size="small" type="primary" plain disabled>详情</el-button>
            <el-button size="small" type="primary" plain disabled >预览</el-button>
            <el-button size="small" type="primary" plain disabled >服务地址</el-button>
            <el-dropdown trigger="click" @command="handleCommand(scope, $event)">
              <el-button size="small" type="primary" plain
                class="el-dropdown-link">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="sliceTile" disabled>切片</el-dropdown-item>
                <el-dropdown-item command="edit" disabled>编辑</el-dropdown-item>
                <!-- 矢量图层无更新操作 -->
                <!-- <el-dropdown-item command="update" disabled>更新</el-dropdown-item> -->
                <el-dropdown-item command="delect">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!--所有图层操作-->
          <div v-else>
            <el-button size="small" type="primary" plain
             @click='showDetails(scope.row)'>详情</el-button>
            <el-button size="small" type="primary" plain :disabled='scope.row.tileStatus === "PROCESS" || (scope.row.mimeType && scope.row.mimeType.toUpperCase() === "TIFF") || scope.row.mimeType  === "RAW"'
             @click='previewLayer(scope.row)'>预览</el-button>
            <el-button size="small" type="primary" plain
             @click='showAddress(scope.row)'>服务地址</el-button>
            <el-dropdown trigger="click" @command="handleCommand(scope, $event)">
              <el-button size="small" type="primary" plain
                class="el-dropdown-link">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="sliceTile" v-if="currentTileType !== 'dem' && currentTileType !== 'timeImage' && scope.row.tileStatus !== 'PROCESS' && currentTileType !== 'baseImage'">切片</el-dropdown-item>
                <el-dropdown-item command="stopSliceTile" v-if="isBase !== true && currentTileType !== 'dem' && scope.row.tileStatus === 'PROCESS'">停止切片</el-dropdown-item>
                <el-dropdown-item command="edit" v-if="currentTileType == 'shp' && scope.row.mimeType
                 && scope.row.mimeType.toUpperCase() === 'PNG'">编辑</el-dropdown-item>
                <el-dropdown-item command="update" v-if="isBase === true && scope.row.storageType === 'GV_IMAGE_MBTILE' && scope.row.isEncrypt === true">更新</el-dropdown-item>
                <el-dropdown-item command="rollback" v-if="isBase === true && scope.row.partialUpdate == true">回滚</el-dropdown-item>
                <el-dropdown-item command="delect">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--倾斜摄影table模块-->
    <TiltPhotoList v-show="currentTileType === 'tiltphoto'" :tableData="tableData"
      @deleteSuccess='removeLayer' @tiltDetails='showDetails' @previewTilt='previewLayer' @serverAddress='showAddress'></TiltPhotoList>
    <!--地名模块-->
    <el-table :data="tableData" v-loading="tableDataLoading"
      v-show="currentTileType === 'placeName'">
      <el-table-column prop="name" label="名称" align='left' sortable></el-table-column>
      <el-table-column prop="serviceUrl" label="服务地址" align='left'>
        <template slot-scope="scope">
          <!-- {{scope.row.serviceUrl}} -->
          <a :href="scope.row.serviceUrl" target="_blank">{{ scope.row.serviceUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column width='130' label="操作" align='left'>
        <template slot-scope="scope">
          <el-button size="small" type="primary" plain @click='previewPlaceName'>预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--街景table模块-->
    <StreetViewList v-show="currentTileType === 'streetView'" :tableData="streetTableData"
      @streetDetails='showDetails' @previewStreet='previewLayer' @deleteStreet='removeStreetViewLayer' @serverAddress='showAddress'></StreetViewList>
    <!--分页-->
    <el-pagination
      background
      v-if="currentTileType !== 'placeName'"
      :current-page="layerCurrentPage"
      @current-change="tabPage"
      :page-size="layerPageSize"
      :total="layerTotal"
      layout="total, prev, pager, next">
    </el-pagination>
    <!--图层详情-->
    <el-dialog title="详情" :visible.sync="isShowDetails" :close-on-click-modal='false' class="server-manager-details">
      <div class="server-manager-layer-details">
        <table>
          <tr v-for='(li, index) in layerDetails' :key='index'>
            <td>{{ li.name }}</td>
            <td>{{ li.value }}</td>
          </tr>
          <tr v-show="currentTileType === 'image' || currentTileType === 'shp' ||
           currentTileType === 'baseImage' || currentTileType === 'dem'">
            <td>切片进度</td>
            <td><el-progress :text-inside="true" :stroke-width="18" :percentage="tilePercent"></el-progress></td>
          </tr>
        </table>
      </div>
      <el-button class="server-manager-layer-details-bth" type="primary"
       size="small" @click='isShowDetails = false'>确认</el-button>
    </el-dialog>
    <!--服务地址-->
    <el-dialog title="服务地址" :visible.sync="addressTableVisible"
     class='sever-address-dialog' :close-on-click-modal='false'>
      <div>
        <el-form :label-position="labelPosition" label-width="150px" class="serverUrlForm"
         v-for='(li, index) in serverUrlList' :key='index'>
          <el-form-item :label="li.name" class="serverUrlForm-label"></el-form-item>
          <el-form-item label="基础地址" v-if="li.url">
            <el-input v-model="li.url">
              <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="li.url"
               icon="el-icon-share" @click="copy"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="GetCapabilities示例" v-if="li.getCapabilitiesUrl">
            <el-input v-model="li.getCapabilitiesUrl">
              <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="li.getCapabilitiesUrl"
               icon="el-icon-share" @click="copy"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="iCenter Adapter" v-if="li.adapterUrl">
            <el-input v-model="li.adapterUrl">
              <el-button slot="append" title='复制' class='copybtn' :data-clipboard-text="li.adapterUrl"
               icon="el-icon-share" @click="copy"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button size="small" type="primary" @click='addressTableVisible = false'>确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import Clipboard from 'clipboard';
import TiltPhotoList from './TiltPhotoList';
import StreetViewList from './StreetViewList';
import UrlSetting from '../api/UrlSetting';
import { getTileLayersList, getLayersList, deletetileLayers, deleteLayers, sliceTileLayer, sliceTileLayerProgress, getBaseImageSliceTileProgress, stopLayerSliceTile } from '../api/imageApi';
import { delBaseMapCs, getFilePath, getServerType } from '../api/fileApi';
import { getTiltPhotoList, deleteTilePhotoLayer } from '../api/tiltphotoApi';
import { getStreetViewList, deleteStreetViewLayer } from '../api/streetViewApi';
import { baseDataRollback } from '../api/tileCacheApi';

const previewImage = UrlSetting.URLS.previewImage;
const previewTile = UrlSetting.URLS.previewTile;
const previewVectorUrl = UrlSetting.URLS.previewVector;
const tiltPhoto = UrlSetting.URLS.tiltPhoto;
const streetView = UrlSetting.URLS.streetView;

export default {
  name: 'tucengguanli',
  components: {
    TiltPhotoList,
    StreetViewList,
  },
  data() {
    return {
      tableData: [{
        layerName: '影像1',
        mimeType: 'png',
        tableName: '数据源名称',
      }],
      streetTableData: [],// 街景数据列表
      tableDataLoading: false,
      currentTileType: 'baseImage',
      currentLayerType: 'IMAGELAYER', // 当前的图层类型
      currentInputVal: '', // 当前输入框的内容
      isBase: true, // 是否为基础数据
      tilePercentTime: '', // 影像切片的定时器
      vectorPercentTime: '', // 矢量切片的定时器
      serverType: '', // 服务器类型
      imagemodel: '', // 影像的搜索内容
      vectormodel: '', // 矢量的搜索内容
      demmodel: '', // 高程的搜索内容
      tiltphotomodel: '', // 倾斜摄影的搜索内容
      timeimagemodel: '', // 时序影像的搜索内容
      streetViewmodel: '', // 街景数据搜索内容
      layerCurrentPage: 0, // 图层的当前页
      layerPageSize: 20, // 图层每页的条数
      layerTotal: 100, // 图层总条数
      isShowDetails: false, // 数据详情的显隐
      layerDetails: [
        {name: '服务名称', value: ''},
        {name: '瓦片格式', value: ''},
        {name: '格网集', value: ''},
      ], // 图层详情
      currentPageLayerList: [],
      tilePercent: 0, // 切片进度
      addressTableVisible: false, // 服务地址的显隐
      serverUrlList: [
        {  name: 'TMS',  url: '192...' },
        {  name: 'WMS',  url: '192...', getCapabilitiesUrl: '192...' },
        {  name: 'WMTS', url: '192...', getCapabilitiesUrl: '192...' },
        {  name: 'WFS', url: '192...', getCapabilitiesUrl: '192...' },
        {  name: 'DEM', url: '192...' },
        {  name: 'b3dmUrl', url: '192...' },
        {  name: 'osgbUrl', url: '192...' },
      ], // 服务地址
      labelPosition: 'left', // 服务地址标题位置
      publisStatusMap: {
        'NEW': '准备发布',
        'PROCESSING': '正在发布',
        'SUCCESS': '发布成功',
        'FAILED': '发布失败'
      },
    };
  },
  async mounted() {
      this.currentTileType = 'placeName';
      this.layerCurrentChange(1, '');
    this.serverType = await getServerType();
  },
  computed: { ...mapGetters([
    'userInfo',
  ])},
  watch: {
    imagemodel(val) {
      this.layerCurrentChange(1, 'IMAGELAYER', val);
    },
    vectormodel(val) {
      this.layerCurrentChange(1, 'VECTORLAYER', val);
    },
    demmodel(val) {
      this.layerCurrentChange(1, 'DEMLAYER', val);
    },
    tiltphotomodel(val) {
      this.layerCurrentChange(1, this.currentInputVal, val);
    },
    timeimagemodel(val) {
      this.layerCurrentChange(1, 'TIMELAYER', val);
    },
    streetViewmodel(val) {
      this.layerCurrentChange(1, '', val);
    },
    isShowDetails(isTrue) {
      if(!isTrue) clearInterval(this.tilePercentTime);
      if(!isTrue) clearInterval(this.vectorPercentTime);
    },
  },
  methods: {
    // 刷新数据列表
    refreshData() {
      this.layerCurrentChange(1, this.currentLayerType, this.currentInputVal);
    },
    // 切换分页
    tabPage(val) {
      this.layerCurrentChange(val, this.currentLayerType, this.currentInputVal);
      this.layerCurrentPage = val;
    },
    // 图层切换
    tabLayer(index) {
      switch (index) {
        case '0-1':
          this.currentTileType = 'baseImage';
          this.isBase = true;
          this.layerCurrentChange(1, 'IMAGELAYER', '');
          this.imagemodel = '';
          break;
        case '0-2':
          this.currentTileType = 'dem';
          this.isBase = false;
          this.layerCurrentChange(1, 'DEMLAYER', '');
          this.demmodel = '';
          break;
        case '0-3':
          this.currentTileType = 'image';
          this.isBase = false;
          this.layerCurrentChange(1, 'IMAGELAYER', '');
          this.imagemodel = '';
          break;
        case '0-5':
          this.currentTileType = 'shp';
          this.isBase = false;
          this.layerCurrentChange(1, 'VECTORLAYER', '');
          this.vectormodel = '';
          break;
        case '0-6':
          this.currentTileType = 'placeName';
          this.layerCurrentChange(1, '');
          break;
        case '0-7':
          this.currentTileType = 'tiltphoto';
          this.layerCurrentChange(1, '');
          this.tiltphotomodel = '';
          break;
        case '0-8':
          this.currentTileType = 'timeImage';
          this.isBase = false;
          this.layerCurrentChange(1, 'TIMELAYER', '');
          this.timeimagemodel = '';
          break;
        case '0-9':
          this.currentTileType = 'streetView';
          this.isBase = false;
          this.layerCurrentChange(1, '');
          this.streetViewmodel = '';
          break;
      }
    },
    // 服务发布
    servicePublic() {
      this.$emit('servicePublic');
    },
    // 图层页面切换
    async layerCurrentChange(currentPage, layerType, inputVal) {
      this.layerCurrentPage = currentPage;
      this.currentLayerType = layerType;
      this.currentInputVal = inputVal;
      this.tableDataLoading = true;
      this.tableData = [];
      this.currentPageLayerList = [];
      switch (this.currentTileType) {
        case 'baseImage':
        case 'dem':
        case 'timeImage':
          this.currentPageLayerList = await getTileLayersList(this.layerCurrentPage, this.layerPageSize, 'DESC', layerType, this.isBase, inputVal);
          this.tileLayerListReq(this.currentPageLayerList, 'DESC', layerType, inputVal);
          this.tableDataLoading = false;
        break;
        case 'image':
        case 'shp':
          this.currentPageLayerList = await getLayersList(this.layerCurrentPage, this.layerPageSize, 'DESC', layerType, this.isBase, inputVal);
          this.layerListReq(this.currentPageLayerList, 'DESC', layerType, inputVal);
          this.tableDataLoading = false;
        break;
        case 'placeName': {
          const placeNameList =[{
            'name': '地名服务',
            'serviceUrl': `${UrlSetting.URLS.placeName}/swagger-ui.html`,
          }];
          this.tableData = placeNameList;
          this.layerTotal = 1;
          this.tableDataLoading = false;
        }
        break;
        case 'tiltphoto':
          this.tiltPhotoListReq(inputVal);
          this.tableDataLoading = false;
        break;
        case 'streetView':
          this.streetViewListReq(inputVal);
          this.tableDataLoading = false;
        break;
        default:
          this.$message.error({ message: '暂不支持此数据类型', showClose: true });
      }
    },    
    // 图层详情
    async showDetails(row) {
      this.isShowDetails = true;
      this.tilePercent = 0;
      switch (this.currentTileType) {
        case 'baseImage':
        case 'dem': {
          this.sliceTileBaseImageStatusRes(row);
          this.layerDetails = [
            {name: '图层名称', value: row.layerName},
            {name: '瓦片格式', value: row.mimeType},
            {name: '格网集', value: row.gridSet},
            {name: '层级范围', value: `${row.minLevel}-${row.maxLevel}`},
            {name: '切片状态', value: row.tileStatus},
            {name: '创建时间', value: row.publishTime}
          ];
          break;
        }        
        case 'timeImage': {
          this.layerDetails = [
            {name: '图层名称', value: row.layerName},
            {name: '瓦片格式', value: row.mimeType},
            {name: '格网集', value: row.gridSet},
            {name: '层级范围', value: `${row.minLevel}-${row.maxLevel}`},
            {name: '切片状态', value: row.tileStatus},
            {name: '创建时间', value: row.publishTime}
          ];
          break;
        }
        case 'image':
        case 'shp': {
          this.sliceTileImageStatusRes(row);
          if (row.status === 'FAILED') {
            this.layerDetails = [
              {name: '图层名称', value: row.layerName},
              {name: '瓦片格式', value: row.mimeType},
              {name: '格网集', value: row.gridSet},
              {name: '层级范围', value: `${row.minLevel}-${row.maxLevel}`},
              {name: '切片状态', value: row.tileStatus},   
              {name: '发布状态', value: this.publisStatusMap[row.status]},
              {name: '失败原因', value: row.errorMessage},
              {name: '创建时间', value: row.createTime},
            ];
          } else {
            this.layerDetails = [
              {name: '图层名称', value: row.layerName},
              {name: '瓦片格式', value: row.mimeType},
              {name: '格网集', value: row.gridSet},
              {name: '层级范围', value: `${row.minLevel}-${row.maxLevel}`},
              {name: '切片状态', value: row.tileStatus},
              {name: '发布状态', value: this.publisStatusMap[row.status]},
              {name: '创建时间', value: row.createTime},
            ];
          }
          
          break;
        }
        case 'tiltphoto':
          this.tiltphotoTabDetails(row);
          break;
        case 'streetView': {
          this.layerDetails = [
            {name: '图层名称', value: row.svName},
            {name: '描述', value: row.description},
            {name: '最小经度', value: row.minX},
            {name: '最大经度', value: row.maxX},
            {name: '最小纬度', value: row.minY},
            {name: '最大纬度', value: row.maxY},
            {name: '创建时间', value: row.createTime},
          ];
          break;
        }
        default:
          this.$message.error({ message: '暂不支持此数据类型', showClose: true });
      }
      // dataId存在代表图层是由数管数据发布得来的
      if (row.dataId) {
        const pathArr = await getFilePath(row.dataId);
        this.layerDetails.push({name: '数据名称', value: pathArr.slice(pathArr.lastIndexOf('/') + 1, pathArr.length)});
        this.layerDetails.push({name: '数据位置', value: '全部文件 > ' + this.matchTabMark(pathArr)});
      }
    },
    // 匹配转换\/符号
    matchTabMark(pathArr) {
      if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        const str = pathArr.slice(pathArr.indexOf(`dir\\${this.userInfo.id}`) + Number(5+this.userInfo.id.toString().length), pathArr.length);
        const result=str.replace(/\\/g," > ");
        return result;
      } else {
        const str = pathArr.slice(pathArr.indexOf(`dir/${this.userInfo.id}`) + Number(5+this.userInfo.id.toString().length), pathArr.length);
        const result = str.replace(/\//g," > ");
        return result;
      }
    },
    // 删除图层
    removeLayer(row) {
      this.$confirm('删除服务会修改包含该服务的图层组，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        switch (this.currentTileType) {
          case 'baseImage':
          case 'dem':
          case 'timeImage':
            deletetileLayers(row.id).then(() => {
              this.layerCurrentChange(this.layerCurrentPage, this.currentLayerType);
              this.layerTotal -= 1; // 总量减1
              this.$message.success({ message: '删除成功', showClose: true });
            });
            break;
          case 'image':
          case 'shp':
            deleteLayers(row.id).then(() => {
              this.layerCurrentChange(this.layerCurrentPage, this.currentLayerType);
              this.layerTotal -= 1; // 总量减1
              this.$message.success({ message: '删除成功', showClose: true });
            });
            break;
          case 'tiltphoto':
            deleteTilePhotoLayer(row.id).then(() => {
              this.layerCurrentChange(this.layerCurrentPage);
              this.layerTotal -= 1; // 总量减1
              this.$message.success({ message: '删除成功', showClose: true });
            });
            break;
          case 'streetView':
            deleteStreetViewLayer(row.id).then(() => {
              this.layerCurrentChange(this.layerCurrentPage);
              this.layerTotal -= 1; // 总量减1
              this.$message.success({ message: '删除成功', showClose: true });
            });
            break;
          default:
            this.$message.warning({ message: '暂不支持此类型图层', showClose: true });
        }
        // 删除底图配置数据
        delBaseMapCs(row.id);
      }).catch(() => {});
    },
    // 删除街景图层
    removeStreetViewLayer(row) {
      this.$confirm('确定删除此图层?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
          deleteStreetViewLayer(row.id).then(() => {
            this.layerCurrentChange(this.layerCurrentPage);
            this.layerTotal -= 1; // 总量减1
            this.$message.success({ message: '删除成功', showClose: true });
          });
        // 删除底图配置数据
        delBaseMapCs(row.id);
      }).catch(() => {});
    },
    // 展示数据的服务地址
    showAddress(row) {
      switch (this.currentTileType) {
        case 'baseImage': {
          const layers = row.workspace ? (row.workspace + ':' + row.layerName) : row.layerName;
          this.serverUrlList = [
            {
              name: 'TMS',
              url: `${previewTile}/service/tms/1.0.0/${layers}@${row.gridSet}@${row.mimeType.toLowerCase()}`,
            },
            {
              name: 'WMS',
              url: `${previewTile}/service/wms?layer=${layers}&TILED=true`,
              getCapabilitiesUrl: `${previewTile}/service/wms?layer=${layers}&service=WMS&version=1.1.1&request=GetCapabilities`,
            },
            {
              name: 'WMTS',
              url: `${previewTile}/service/wmts?layer=${layers}`,
              getCapabilitiesUrl: `${previewTile}/service/wmts?layer=${layers}&service=WMTS&request=GetCapabilities`,
            },
            {
              name: 'GEOVIS iExplorer',
              adapterUrl: JSON.stringify(row),
            },
          ];
          this.addressTableVisible = true;
          }
          break;
        case 'image': {
          const layers = row.workspace ? (row.workspace + ':' + row.layerName) : row.layerName;
          this.serverUrlList = [
            {
              name: 'TMS',
              url: `${previewImage}/gwc/service/tms/1.0.0/${layers}@${row.gridSet}@${row.mimeType.toLowerCase()}`,
            },
            {
              name: 'WMS',
              url: `${previewImage}/gwc/service/wms?layer=${layers}&TILED=true`,
              getCapabilitiesUrl: `${previewImage}/gwc/service/wms?layer=${layers}&service=WMS&version=1.1.1&request=GetCapabilities`,
            },
            {
              name: 'WMTS',
              url: `${previewImage}/gwc/service/wmts?layer=${layers}`,
              getCapabilitiesUrl: `${previewImage}/gwc/service/wmts?layer=${layers}&service=WMTS&request=GetCapabilities`,
            },
            {
              name: 'GEOVIS iExplorer',
              adapterUrl: JSON.stringify(row),
            },
          ];
          this.addressTableVisible = true;
          }
          break;
        case 'shp': {
          const layers = row.workspace ? (row.workspace + ':' + row.layerName) : row.layerName;
          this.serverUrlList = [
            {
              name: 'TMS',
              url: `${previewVectorUrl}/gwc/service/tms/1.0.0/${layers}@${row.gridSet}@${row.mimeType.toLowerCase()}`,
            },
            {
              name: 'WMS',
              url: `${previewVectorUrl}/gwc/service/wms?layer=${layers}&TILED=true`,
              getCapabilitiesUrl: `${previewVectorUrl}/gwc/service/wms?service=WMS&version=1.1.1&request=GetCapabilities`,
            },
            {
              name: 'WMTS',
              url: `${previewVectorUrl}/gwc/service/wmts?layer=${layers}`,
              getCapabilitiesUrl: `${previewVectorUrl}/gwc/service/wmts?service=WMTS&request=GetCapabilities`,
            },
            {
              name: 'WFS',
              url: `${previewVectorUrl}/icenter/ows?service=WFS&version=1.0.0`,
              getCapabilitiesUrl: `${previewVectorUrl}/icenter/ows?service=WFS&request=GetCapabilities`,
            },
            {
              name: 'GEOVIS iExplorer',
              adapterUrl: JSON.stringify(row),
            },
          ];
          this.addressTableVisible = true;
          }
          break;
        case 'dem':
          if (row.mimeType === 'GRSTTERRAIN') {
            this.serverUrlList = [
              {
                name: 'TMS',
                url: `${previewTile}/service/tms/1.0.0/${row.layerName}@${row.gridSet}@${row.mimeType.toLowerCase()}`,
              },
              {
                name: 'WMS',
                url: `${previewTile}/service/wms?layer=${row.layerName}&TILED=true`,
                getCapabilitiesUrl: `${previewTile}/service/wms?layer=${row.layerName}&service=WMS&version=1.1.1&request=GetCapabilities`,
              },
              {
                name: 'WMTS',
                url: `${previewTile}/service/wmts?layer=${row.layerName}`,
                getCapabilitiesUrl: `${previewTile}/service/wmts?layer=${row.layerName}&service=WMTS&request=GetCapabilities`,
              },
            ];
          } else {
            this.serverUrlList = [
              {  name: '地形', url: `${previewTile}/service/terrain/${row.layerName}` },
              {
                name: 'GEOVIS iExplorer',
                adapterUrl: JSON.stringify(row),
              },
            ];
          }
          this.addressTableVisible = true;
          break;
        case 'tiltphoto':
          if (row.format === 'OSGB') {
            this.serverUrlList = [
              {  name: '倾斜摄影', url: `${tiltPhoto}/layers/dataset/${row.layerName}/output.osg` },
            ];
          } else if (row.format === 'B3DM') {
            this.serverUrlList = [
              {  name: '倾斜摄影', url: `${tiltPhoto}/layers/dataset/${row.layerName}/tileset.json` },
              {
                name: 'GEOVIS iExplorer',
                adapterUrl: JSON.stringify(row),
              },
            ];
          } else {
            this.serverUrlList = [
              {  name: '倾斜摄影', url: `${tiltPhoto}/layers/dataset/${row.layerName}/` },
              {
                name: 'GEOVIS iExplorer',
                adapterUrl: JSON.stringify(row),
              },
            ];
          }
          this.addressTableVisible = true;
          break;
        case 'timeImage':
          this.serverUrlList = [
            {  name: '时序影像', url: `${previewTile}/service/time?layer=${row.layerName}` },
          ];
          this.addressTableVisible = true;
          break;
        case 'streetView':
          this.serverUrlList = [
            {name: '街景', url: `${streetView}/${row.svName}` },
          ];
          this.addressTableVisible = true;
          break;
        default:
          this.$message.warning({ message: '暂不支持此类型图层', showClose: true });
      }
    },
    // 预览地名服务
    previewPlaceName() {
      const routeData = this.$router.resolve({
        path: '/PreviewPlaceName',
      });
      window.open(routeData.href);
    },
    // 移除问号？后面的参数
    sliceStr(str) {
      return str.slice(0, str.indexOf('?'));
    },
    // 复制服务地址
    copy() {
      const clipboard = new Clipboard('.copybtn');
      clipboard.on('success', () => {
        this.$notify({
          title: '复制成功',
          type: 'success',
        });
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        this.$notify({
          title: '复制失败',
          type: 'error',
        });
        clipboard.destroy();
      });
    },
    // 图层预览
    previewLayer(row) {
      switch (this.currentTileType) {
        case 'baseImage':
        case 'image':
        case 'shp': {
          const routeData = this.$router.resolve({
            path: `/open/${this.currentTileType}:${row.id}`,
          });
          window.open(routeData.href);
        }
        break;
        case 'dem': {
          const routeData = this.$router.resolve({
            path: `/Cesium/${this.currentTileType}:${row.id}`,
          });
          window.open(routeData.href);
        }
        break;
        case 'tiltphoto': {
          const routeData = this.$router.resolve({
            path: `/Cesium/${this.currentTileType}:${row.layerName}:${row.format}`,
          });
          window.open(routeData.href);
        }
        break;
        case 'streetView': {
          const routeData = this.$router.resolve({
            path: `/Cesium/${this.currentTileType}:${row.id}`,
          });
          window.open(routeData.href);
        }
        break;
        case 'timeImage': {
          const routeData = this.$router.resolve({
            path: `/demo/${row.id}`,
          });
          window.open(routeData.href);             
        }
        break;
        default: {
          this.$message.error({ message: '暂不支持此数据类型', showClose: true });
        }
      }
    },
    // 删除基础图层导致的页数、页面内容刷新
    async tileLayerListReq(currentPageLayerList, descType, layerType, inputVal) {
      this.tableData = currentPageLayerList.data;
      this.layerTotal = currentPageLayerList.total;
      if (this.tableData.length === 0 && this.layerCurrentPage > 1) {
        this.layerCurrentPage = this.layerCurrentPage - 1;
        this.currentPageLayerList = await getTileLayersList(this.layerCurrentPage, this.layerPageSize, descType, layerType, this.isBase, inputVal);
        this.tableData = this.currentPageLayerList.data;
      }
    },
    // 删除图层导致的页数、页面内容刷新
    async layerListReq(currentPageLayerList, descType, layerType, inputVal) {
      this.tableData = currentPageLayerList.data;
      this.layerTotal = currentPageLayerList.total;
      if (this.tableData.length === 0 && this.layerCurrentPage > 1) {
        this.layerCurrentPage = this.layerCurrentPage - 1;
        this.currentPageLayerList = await getLayersList(this.layerCurrentPage, this.layerPageSize, descType, layerType, this.isBase, inputVal);
        this.tableData = this.currentPageLayerList.data;
      }
    },
    // 删除图层导致的页数、页面内容刷新
    async tiltPhotoListReq(inputVal) {
      this.currentPageLayerList = await getTiltPhotoList(this.layerCurrentPage, this.layerPageSize, 'DESC', inputVal);
      this.tableData = this.currentPageLayerList.data;
      if (this.tableData.length === 0 && this.layerCurrentPage > 1) {
        this.layerCurrentPage = this.layerCurrentPage - 1;
        this.currentPageLayerList = await getTiltPhotoList(this.layerCurrentPage, this.layerPageSize, 'DESC', inputVal);
        this.tableData = this.currentPageLayerList.data;
      }
      this.layerTotal = this.currentPageLayerList.total;
    },
    // 删除图层导致的页数、页面内容刷新
    async streetViewListReq(inputVal) {
      this.currentPageLayerList = await getStreetViewList(this.layerCurrentPage, this.layerPageSize, inputVal, 'desc', 'createTime');
      this.streetTableData = this.currentPageLayerList.data;
      if (this.streetTableData.length === 0 && this.layerCurrentPage > 1) {
        this.layerCurrentPage = this.layerCurrentPage - 1;
        this.currentPageLayerList = await getStreetViewList(this.layerCurrentPage, this.layerPageSize, inputVal, 'desc', 'createTime');
        this.streetTableData = this.currentPageLayerList.data;
      }
      this.layerTotal = this.currentPageLayerList.total;
    },
    // 更多操作
    handleCommand(scope, command) {
      switch (command) {
        case 'sliceTile':
          this.sliceTile(scope.row);
          break;
        case 'stopSliceTile':
          this.stopSliceTile(scope.row);
          break;
        case 'delect':
          this.removeLayer(scope.row);
          break;
        case 'edit':
          this.vectorEdit(scope.row);
          break;
        case 'update':
          this.updateBaseData(scope.row);
          break;
        case 'rollback':
          this.rollbackBaseData(scope.row);
          break;
      }
    },
    // 图层切片
    sliceTile(row) {
      if (row.tileStatus === 'SUCCESS') {
        this.$message.warning({ message: '该图层已切片完成，无需重复切片!', showClose: true });
      } else {
        this.$confirm('确定切片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          switch (this.currentTileType) {
            case 'image':
            case 'shp':
              sliceTileLayer(row.id).then(() => {
                this.refreshData();
                this.$message.success({ message: '切片请求发送成功', showClose: true });
              });
              break;
            default:
              this.$message.error({ message: '暂不支持此数据类型', showClose: true });
          }
        }).catch(() => {});
      }
    },
    // 矢量编辑
    vectorEdit(row) {
      this.$emit('vectorStyleEdit', row);      
    },
    // 获取基処影像的切片进度
    sliceTileBaseImageStatusRes(row) {
      if (row.tileStatus !== 'SUCCESS') {
        getBaseImageSliceTileProgress(row.id).then(res => {
          this.tilePercent = Number(res.progress.toFixed(2));
          if (this.tilePercent === 100) {
           //this.$message.success({ message: `${row.layerName}切片完成`, showClose: true });             
            this.refreshData();
            this.layerDetails[4].value = 'SUCCESS';
          }
        });
        this.tilePercentTime = setInterval(() => {
          getBaseImageSliceTileProgress(row.id).then(res => {
            this.tilePercent = Number(res.progress.toFixed(2));
            if (this.tilePercent === 100) {
              this.$message.success({ message: `${row.layerName}切片完成`, showClose: true });
              clearInterval(this.tilePercentTime);              
              this.refreshData();
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
    // 获取影像的切片进度
    sliceTileImageStatusRes(row) {
      if (row.tileStatus !== 'SUCCESS') {
        sliceTileLayerProgress(row.id).then(res => {
          this.tilePercent = Number(res.progress.toFixed(2));
          if (this.tilePercent === 100) {
            //this.$message.success({ message: `${row.layerName}切片完成`, showClose: true });             
            this.refreshData();
            this.layerDetails[4].value = 'SUCCESS';
          }
        });
        this.tilePercentTime = setInterval(() => {
          sliceTileLayerProgress(row.id).then(res => {
            this.tilePercent = Number(res.progress.toFixed(2));
            if (this.tilePercent === 100) {
              this.$message.success({ message: `${row.layerName}切片完成`, showClose: true });
              clearInterval(this.tilePercentTime);              
              this.refreshData();
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
    // 倾斜摄影不同类型显示不同详情
    tiltphotoTabDetails(row) {
      if (row.format === 'B3DM' || row.format === 'B3DM_GRID') {
        this.layerDetails = [
          {name: '图层名称', value: row.layerName},
          {name: '数据类型', value: row.format},
          {name: '创建时间', value: row.createTime},
        ];
      } else {
        this.layerDetails = [
          {name: '图层名称', value: row.layerName},
          {name: '数据类型', value: row.format},
          {name: '中心点经度', value: row.longitude},
          {name: '中心点纬度', value: row.latitude},
          {name: '中心点高度', value: row.altitude},
          {name: '创建时间', value: row.createTime},
        ];
      }
    },
    // 基础数据局部更新
    updateBaseData(row) {
      this.$emit('updateBaseData', row);
    },
    // 回滚基础影像
    rollbackBaseData(row) {      
      this.$confirm('确定回滚此图层?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        baseDataRollback(row.id).then(() => {
          this.$message.success({ message: '基础影像回滚成功', showClose: true });
        });
      }).catch(() => {});
    },
    // 停止切片
    stopSliceTile(row) {
      stopLayerSliceTile(row.id).then(() => {
        this.refreshData();
        this.$message.success({ message: '停止切片请求发送成功', showClose: true });
      });
    },
  }
};
</script>