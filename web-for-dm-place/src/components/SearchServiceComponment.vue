<template>
  <div>
    <nav-component></nav-component>
    <globe-control :isResetPlugin='true' :is2D3DPlugin='true' :isScalePlugin='true' :isAddPlaceName='true' ref="mapComponent" />
    <div :class="{'hide-open': isShowSearchPanel}" class="open" @click="handleSearchCollapse(true)">
      <img src="../assets/open-search.png" height="25"/>
    </div>
    <div :class="{'show-image-search': isShowSearchPanel}" class="image-search">
      <div class="image-search-title">
        <!-- 全部服务数据 -->
        <span v-show="isShowFirstResult">高级查询</span>
        <span v-show="isShowSecendResult">
          <i style="cursor: pointer;" class="el-icon-back" @click="goBackFirstResult" />服务查询结果
        </span>
        <span v-show="isShowThirdResult">
          <i style="cursor: pointer;" class="el-icon-back" @click="goBackSecendResult" />查询结果
        </span> 
        <img @click="handleSearchCollapse(false)" class="close" src="../assets/close-search.png" height="25"/>
      </div>
      <div class="search search-group">
        <el-form :model="formData" label-position="left" ref="searchForm">
          <div class="form-item">
            <el-row>
              <el-col :span="5">关键字</el-col>
              <el-col :span="7" class="value">
                <el-input size="small" v-model="formData.imageName" clearable></el-input>
              </el-col>
            </el-row>
          </div>
          <div class="form-item">
            <el-row>
              <el-col :span="5">数据类型</el-col>
              <el-col :span="7" class="value">
                <el-select v-model="type" size="small" @change="changeType" disabled>
                  <!-- <el-option value="0201" label="影像"></el-option>
                  <el-option value="0202" label="矢量"></el-option> -->
                  <el-option value="0200" label="全部"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <!-- <div class="form-item change-button">
            <el-row>
              <el-col :span="5">查询范围</el-col>
              <el-col :span="18" class="value">
                <el-button-group>
                  <el-button size="small" @click="changeAreaType('lonLat')"
                             :class="{'is-active': isShowAreaType.lonLat}">经纬度</el-button>
                  <el-button size="small" @click="changeAreaType('area')"
                             :class="{'is-active': isShowAreaType.area}">行政区</el-button>
                  <el-button size="small" @click="changeAreaType('draw')"
                             :class="{'is-active': isShowAreaType.draw}">地图绘制</el-button>
                  <el-button size="small" @click="changeAreaType('shp')"
                             :class="{'is-active': isShowAreaType.shp}">SHP上传</el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </div>
          <div class="form-item" v-show="isShowAreaType.area">
            <el-row>
              <el-col :span="19" :offset="5" class="value">
                <place-cascader-componment @change="areaChange" ref="placeCascaderComponent"></place-cascader-componment>
              </el-col>
            </el-row>
          </div>
          <div class="form-item" v-show="isShowAreaType.lonLat" >
            <el-row>
              <el-col :span="5">左上角经度</el-col>
              <el-col :span="6" class="value">
                <el-input size="small" v-model="position.minX" @blur="canNotEmpty(position)" />
              </el-col>
              <el-col :span="5" :offset="1">左上角纬度</el-col>
              <el-col :span="6" class="value">
                <el-input size="small" v-model="position.maxY" @blur="canNotEmpty(position)" />
              </el-col>
            </el-row>
          </div>
          <div class="form-item" v-show="isShowAreaType.lonLat">
            <el-row>
              <el-col :span="5">右下角经度</el-col>
              <el-col :span="6" class="value">
                <el-input size="small" v-model="position.maxX" @blur="canNotEmpty(position)" />
              </el-col>
              <el-col :span="5" :offset="1">右下角纬度</el-col>
              <el-col :span="6" class="value">
                <el-input size="small" v-model="position.minY" @blur="canNotEmpty(position)" />
              </el-col>
            </el-row>
          </div>
          <div class="form-item" v-show="isShowAreaType.draw">
            <el-row>
              <el-col :span="18" :offset="5" class="value">
                <el-tooltip placement="top" effect="light">
                  <div slot="content">单击鼠标左键并保持,<br/>移动光标确定矩形范围,<br/>松开鼠标左键完成绘制.</div>
                  <el-button size="small" class="draw rectangle" @click="drawing('rectangle')">矩形</el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="light">
                  <div slot="content">依次单击鼠标左键确定<br/>多边形范围,单击鼠标<br/>右键完成绘制.</div>
                  <el-button class="draw polygon" size="small" @click="drawing('polygon')">多边形</el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </div> -->
          <el-form-item size="small" class="search-buttons">
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 全部服务数据 -->
       <div :class="{'show-result': isShowSecendResult}" class="result">
        <el-container class="full-container">
          <el-main class="full-container">
             <ul>
              <li v-for='(li, indexVal) in layerList' :key='indexVal'>
                <span class="layerName"> {{ li.layerName }}</span>
                <el-table class="full-container" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" v-loading="loading" :data="li.table" size="mini">
                  <el-table-column label="名称">
                    <template slot-scope="scope">
                      <span class="title" :title="scope.row.name">{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="采集时间" width="140" v-if="li.layerName === '倾斜摄影'">
                    <template slot-scope="scope"><span>{{ scope.row.startTime | formatDataString}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                      <i class="el-icon-info operate" style="position: relative;top: -1px;" title="详情" @click="showInfoDialog(scope.row)"></i>
                      <i class="el-icon-view operate bold" title="上球" :class="{'row-active':scope.row.active}" @click="addOnEarth(scope.row, scope.$index)">
                      </i>
                      <!-- <i class="el-icon-download operate bold" title="下载" @click="download(scope.row)"></i> -->
                    </template>
                  </el-table-column>
                </el-table>
                <div class="moreBtn-class"><el-button size="small" @click="moreData(li.type)">更多</el-button></div>
              </li>
            </ul>
          </el-main>
        </el-container>
      </div>
      <div :class="{'show-result': isShowThirdResult}" class="result">
        <el-container class="full-container">
          <el-main class="full-container">
            <el-table class="full-container"
                      ref="resultTable"
                      @cell-mouse-enter="cellMouseEnter"
                      @cell-mouse-leave="cellMouseLeave"
                      height="100%"
                      v-loading="loading"
                      :data="pageData" size="mini">
              <el-table-column label="名称">
              <template slot-scope="scope">
                <span class="title" :title="scope.row.name">
                  {{scope.row.name}}
                </span>
              </template>
            </el-table-column>
              <el-table-column label="采集时间" width="140" v-if="dataType && dataType === '0204'">
                <template slot-scope="scope">
                  <span>{{ scope.row.startTime | formatDataString}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                  <i class="el-icon-info operate"
                     style="position: relative;top: -1px;" title="详情" @click="showInfoDialog(scope.row)"></i>
                  <i class="el-icon-view operate bold" title="上球"
                     :class="{'row-active':scope.row.active}" @click="addOnEarth(scope.row, scope.$index)">
                  </i>
                  <!-- <i class="el-icon-download operate bold"
                     title="下载" @click="download(scope.row)"></i> -->
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto">
            <el-pagination
              background
              :pager-count="5"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              @current-change="currentPageChange"
              layout="total, slot, prev, pager, next">
            </el-pagination>
          </el-footer>
        </el-container>
      </div>
    </div>
    <search-service-info-dialog ref="SearchServiceInfoDialog" :activeFile="activeFile"></search-service-info-dialog>
    <input v-show="false" type="file" id="shpFile" @change="uploadShp">
    <!-- <remote-js :src="imageDictionaryUrl"></remote-js> -->
  </div>
</template>

<script>
/* eslint-disable no-param-reassign,no-undef,array-callback-return,no-mixed-operators */
import NavComponent from './NavComponent';
import PlaceCascaderComponment from './PlaceCascaderComponent';
import GlobeControl from './GlobeControl';
import SearchServiceInfoDialog from './SearchServiceInfoDialog';
import { uploadShpFile, getLayersList } from '../api/imageApi';
import { getTiltPhotoList } from '../api/tiltphotoApi';
import { downloadFileURL, showWindow, getAllData } from '../api/fileApi';
import UrlSetting from '../api/UrlSetting';

const previewVector = UrlSetting.URLS.previewVector;
const previewImage = UrlSetting.URLS.previewImage;
const tiltPhoto = UrlSetting.URLS.tiltPhoto;

export default {
  components: {
    NavComponent,
    GlobeControl,
    SearchServiceInfoDialog,
    PlaceCascaderComponment,
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  name: 'image-search-componment',
  filters: {
    formatDataString(value) {
      return value ? value.split(' ')[0] : null;
    },
  },
  data() {
    return {
      currentType: '0200',
      type: '0200',
      maxSize: 13,
      loading: false,
      imageLayers: {},
      isShowAreaType: { lonLat: true },
      area: null,
      activeFile: null,
      position: {},
      isShowSearchResult: false,
      isShowSearchPanel: false,
      isShowFormItem: true,
      pageData: [],
      // imageDictionaryUrl: getImageDictionaryUrl(),
      timeIntervals: null,
      formData: {
        imageName: '',
        satelliteId: null,
        sensorid: null,
        geo: null,
        level: null,
        maxResolution: null,
        cloudPercent: 0,
        minResolution: 0,
      },
      resolution: [1, 10],
      pageSize: 20,
      total: 0,
      currentPage: 1,
      dateRange: null,
      shpName: null,
      dictionary: {},
      //全部
      dataType: '',
      isShowFirstResult: true,
      isShowSecendResult: false,
      isShowThirdResult: false,
      tpData: [],
      shaData: [],
      imageData: [],
      demData: [],
      layerList: [
        { layerName: '影像数据', table: [], type: '0201'},
        { layerName: '矢量数据', table: [], type: '0202'},
        { layerName: '地形数据', table: [], type: '0203' },
        { layerName: '倾斜摄影', table: [], type: '0204' },
      ],
      tempArray: [],
      demTempArray: [],
    };
  },
  computed: {
    mapComponent() {
      return this.$refs.mapComponent;
    },
    resultTable() {
      return this.$refs.resultTable;
    },
    searchForm() {
      return this.$refs.searchForm;
    },
  },
  methods: {
    // 返回初始页
    goBackFirstResult(){
      this.isShowFirstResult = true;
      this.isShowSecendResult = false;
      this.isShowThirdResult = false;
    },
    // 返回第一页
    goBackSecendResult(){
      this.isShowFirstResult = false;
      this.isShowSecendResult = true;
      this.isShowThirdResult = false;
      this.allServiceSearch();
    },
    // 点击更多查询数据
    moreData(val){
      if (!this.formData.cloudPercent) {
        this.formData.cloudPercent = null;
      }
      this.currentPage = 1;
      this.dataType = val;
      this.layerListSearch(val);
      this.isShowFirstResult = false;
      this.isShowSecendResult = false;
      this.isShowThirdResult = true;
    },
    // 数据类型分页
    currentPageChange(value) {
      this.currentPage = value;
      this.layerListSearch(this.dataType);
    },
    handleSearchCollapse(bool) {
      this.isShowSearchPanel = bool;
      this.currentPage = 1;
      // this.resetForm();
    },
    changeType(type) {
      this.currentType = type;
      // this.resetForm();
      this.changeWayType('sensor');
      if (type === '0202' || type === '0200') {
        this.isShowFormItem = false;
      } else {
        this.isShowFormItem = true;
      }
    },
    changeAreaType(type) {
      this.isShowAreaType = {};
      this.isShowAreaType[type] = true;
      if (type === 'lonLat') {
        this.canNotEmpty(this.position);
      }
    },
    changeWayType(type) {
      this.isShowWayType[type] = true;
    },
    areaChange(wkt) {
      this.formData.geo = wkt;
      if (wkt) {
        this.mapComponent.drawArea(wkt, this.area);
      } else {
        this.mapComponent.clearAll();
        Object.keys(this.imageLayers).forEach((key) => {
          this.mapComponent.earth.imageryLayers.remove(
            this.imageLayers[key]);
          delete this.imageLayers[key];
        });
      }
    },
    openFile() {
      const file = document.getElementById('shpFile');
      file.click();
    },
    uploadShp(e) {
      if (e && e.target.files.length > 0) {
        const form = new FormData();
        form.append('file', e.target.files[0]);
        uploadShpFile(form).then((result) => {
          this.formData.geo = result;
          this.mapComponent.drawArea(result);
        });
        this.shpName = e.target.files[0].name;
        e.target.value = '';
      }
    },
    canNotEmpty(position) {
      if(position.minX.trim() === '') position.minX = '-180';
      if(position.minY.trim() === '') position.minY = '-90';
      if(position.maxX.trim() === '') position.maxX = '180';
      if(position.maxY.trim() === '') position.maxY = '90';
      const points = [
        [position.minX, position.minY],
        [position.maxX, position.maxY],
      ];
      this.changePoint2wkt(points);
    },
    initDictionary() {
      this.dictionary = window.dictionary || {};
    },
    dateRangeChange(values) {
      if (values) {
        this.timeIntervals = [{
          propertyName: 'startTime',
          start: new Date(values[0]).getTime(),
          end: new Date(values[1]).getTime(),
        }];
      } else {
        this.timeIntervals = null;
      }
    },
    download(row) {
      showWindow(downloadFileURL(row.dataId));
    },
    async showInfoDialog(fileObject) {
      if (fileObject.dataType === '0202') {
        fileObject.type = 'vector';
      } else {
        fileObject.type = 'images';
      }
      this.activeFile = fileObject;
      this.$refs.SearchServiceInfoDialog.visible = true;
    },
    // 查询上球数据信息
    activeSearch(item) {
      if(this.tempArray.length >0) {
        this.tempArray.map((list) => {
          if(list.id === item.id && list.active === true){
            this.$set(item, 'active', true);
          } else if(list.id === item.id && list.active === false){
            this.$set(item, 'active', false);
            this.tempArray.splice(this.tempArray.indexOf(list), 1);
          }
        });
      }
    },
    // 查询上球数据信息
    activeSearchDem(item) {
      if(this.demTempArray.length >0) {
        this.demTempArray.map((list) => {
          if(list.id === item.id && list.active === true){
            this.$set(item, 'active', true);
          }
        });
      }
    },
    // 查询各个类型数据
    async layerListSearch(type) {
      this.loading = false;
      this.pageData = [];
      let result;
       switch (type) {
        case '0202' :
          result = await getLayersList(this.currentPage, this.pageSize, 'DESC', 'VECTORLAYER', false, this.formData.imageName);
          break;
        case '0201' :
          result = await getLayersList(this.currentPage, this.pageSize, 'DESC', 'IMAGELAYER', false, this.formData.imageName);
          break;
        case '0203' :
          result = await getLayersList(this.currentPage, this.pageSize, 'DESC', 'DEMLAYER', false, this.formData.imageName);
          break;
        case '0204' :
          result = await getTiltPhotoList(this.currentPage, this.pageSize, 'DESC', this.formData.imageName);
          break;
        default:
          break;
      }
      this.total = result.total;
      result.data.map((item) => {
        this.activeSearch(item);
        item.name = item.layerName;
        if (type === '0204') {
          item.startTime = item.createTime.substring(0, 10);
        } else {
           item.startTime = '';
        }
        // item.startTime = '';
        // item.startTime = item.createTime.substring(0, 10);
        item.dataType = type;
        this.pageData.push(item);
      });
    },
    // 查询全部服务
    async allServiceSearch(){
      this.loading = true;
      this.isShowFirstResult = false;
      this.isShowSecendResult = true;
      this.isShowThirdResult = false;
      const listLayers = await getAllData(this.currentPage, 3, 'DESC', this.formData.imageName, false,);
      this.loading = false;
      if (listLayers.image.total !== 0) {
        this.imageData = [];
        listLayers.image.data.map((item) => {
          this.activeSearch(item);
          item.name = item.layerName;
          item.startTime = '';
          item.dataType = '0201';
          this.imageData.push(item);
          this.layerList[0].table = this.imageData;
        });
      }
      if (listLayers.vector.total !== 0) {
        this.shaData = [];
        listLayers.vector.data.map((item) => {
          this.activeSearch(item);
          item.name = item.layerName;
          item.startTime = '';
          item.dataType = '0202';
          this.shaData.push(item);
          this.layerList[1].table = this.shaData;
        });
      }
      if (listLayers.dem.total !== 0) {
        this.demData = [];
        listLayers.dem.data.map((item) => {
          this.activeSearchDem(item);
          item.name = item.layerName;
          item.startTime = '';
          item.dataType = '0203';
          this.demData.push(item);
          this.layerList[2].table = this.demData;
        });
      }
      if (listLayers.tp.total !== 0) {
        this.tpData = [];
        listLayers.tp.data.map((item) => {
          this.activeSearch(item);
          item.name = item.layerName;
          item.startTime = item.createTime.substring(0, 10);
          item.dataType = '0204';
          this.tpData.push(item);
          this.layerList[3].table = this.tpData;
        });
      }
    },
    // 查询
    search() {
      this.searchForm.validate(async (valid) => {
        if (valid) {
          const params = {};
          if (!this.formData.cloudPercent) {
            this.formData.cloudPercent = null;
          }
          Object.entries(this.formData).forEach((keyValue) => {
            if (keyValue[1] !== null) {
              if (keyValue[1] instanceof Array) {
                params[keyValue[0]] = keyValue[1].join(',');
              } else {
                params[keyValue[0]] = keyValue[1];
              }
            }
          });
          this.mapComponent.clearAll();
          Object.keys(this.imageLayers).forEach((key) => {
            this.mapComponent.earth.imageryLayers.remove(
              this.imageLayers[key]);
            delete this.imageLayers[key];
          });
          this.allServiceSearch(params);
        }
        return false;
      });
    },
    /**
     * 重置表单
     */
    resetForm() {
      // this.$refs.placeCascaderComponent.reset();
      this.isShowSearchResult = false;
      this.dateRange = null;
      this.timeIntervals = null;
      this.shpName = null;
      this.position = {
        minX: '-180',
        minY: '-90',
        maxX: '180',
        maxY: '90',
      };
      this.formData = {
        imageName: '',
        satelliteId: null,
        sensorid: null,
        geo: null,
        level: null,
        cloudPercent: 0,
        maxResolution: null,
        minResolution: 0,
      };
      this.tempArray = [];
      this.demTempArray = [];
      this.changeAreaType('lonLat');
      this.mapComponent.delTerrain();
      this.mapComponent.delTiltPhoto();
      this.mapComponent.flyToHome();
    },
    // 判断数据类型上球
    dataTypeOnEarth(row, index) {
      if (row.dataType === '0202') {
        this.addVector(row ,index);
      } else if (row.dataType === '0201'){
        this.addImage(row, index);
      } else if (row.dataType === '0203'){
        this.addDem(row, index);
      } else if (row.dataType === '0204'){
        this.addTiltPhoto(row, index);
      }
    },
    // 数据上球类型
    layerTypeData(row, flag) {
      if (this.tempArray.length === 0){
        this.tempArray.push(row);
      } else {
        this.tempArray.map(item => {
          if(item.id === row.id){
            this.tempArray.splice(this.tempArray.indexOf(item), 1);
            flag = true;
          }
        });
        if(!flag){
          this.tempArray.push(row);
          flag = false;
        }
      }
    },
    // 地形数据上球状态
    demLayerData(item) {
      this.demTempArray = [];
      this.demData.map((list) => {
        if(item.id !== list.id && list.active === true){
          this.$delete(list, 'active');
        }
      });
      this.layerListSearch('0203');
      this.demTempArray.push(item);
    },
    // 点击上球
    addOnEarth(row, index) {
      let flag = false;
      this.$set(row, 'active', !row.active);
      if(row.mimeType === 'TERRAIN' && row.active === true) {
        this.demLayerData(row);
      }else if(row.mimeType === 'TERRAIN'){
        this.demTempArray = [];
      }else {
        this.layerTypeData(row, flag);
      }
      this.dataTypeOnEarth(row, index);
    },
    getRotate(item) {
      const length = item.upleftLat - item.lowleftLat;
      const width = item.upleftLon - item.lowleftLon;
      if (length) {
        return Math.atan(width / length);
      }
      return 0;
    },
    // 影像上球
    addImage(row, index) {
      if (row.active) {
        const layerInfo = this.mapComponent.buildBaseMap(row);
        this.imageLayers[row.layerName + index] = this.mapComponent.earth.imageryLayers.addImageryProvider(layerInfo);
        this.mapComponent.flyTo({rectangle:[row.minX, row.minY, row.maxX, row.maxY]});
      } else {
        this.mapComponent.earth.imageryLayers.remove(this.imageLayers[row.layerName + index]);
        delete this.imageLayers[row.layerName + index];
      }
    },
    // 矢量上球
    async addVector(row, index) {
      if (row.active) {
        const wms = `${previewVector}/icenter/${row.layerName}/wms`;
        this.imageLayers[row.layerName + index] = this.mapComponent.addVector({ layerName: row.layerName,
          workspace: 'icenter',
          wms});
        this.mapComponent.earth.imageryLayers.add(this.imageLayers[row.layerName + index]);
        this.mapComponent.flyTo({rectangle:[row.minX, row.minY, row.maxX, row.maxY]});
      } else {
        this.mapComponent.earth.imageryLayers.remove(this.imageLayers[row.layerName + index]);
        delete this.imageLayers[row.layerName + index];
      }
    },
    // 地形上球
    async addDem(row, index) {
       if (row.active) {
        this.mapComponent.delTerrain();
        // const result = await getLayersInfo(row.id);
        this.imageLayers[row.layerName + index] = {
          'tileType': 'DEM',
          'layerName': row.layerName,
          'url': `${previewImage}/gwc/service/terrain/${row.layerName}`,
          'rectangle': [row.minX, row.minY, row.maxX, row.maxY]
        };
        this.mapComponent.addTerrain(this.imageLayers[row.layerName + index]);
      } else {
        this.mapComponent.delTerrain();
        // this.mapComponent.earth.imageryLayers.remove(
        //   this.imageLayers[row.layerName + index]);
        // delete this.imageLayers[row.layerName + index];
      }
    },
    // 倾斜摄影上球
    async addTiltPhoto(row) {
      if (row.active) {
        this.mapComponent.serviceAddTiltPhoto(`${tiltPhoto}/layers/dataset/${row.id}/tileset.json`,row.id);
      } else {
          const primitives =  this.mapComponent.earth.scene.primitives;
          for (let i = 0; i<primitives.length; i++) {
            const layerPrimitives = primitives.get(i);
            if(layerPrimitives.layerId && layerPrimitives.layerId.id === row.id){
              primitives.remove(layerPrimitives);
              break;
            }
          }
      }
    },
    // 绘制图形
    drawing(type) {
      this.mapComponent.drawing(type, this.changePoint2wkt);
    },
    changePoint2wkt(points) {
      if (points.length > 2) {
        points.push(points[0]);
        this.buildwkt(points);
      } else {
        const start = points[0];
        const end = points[1];
        points = [
          start,
          [start[0], end[1]],
          end,
          [end[0], start[1]],
          start,
        ];
        this.buildwkt(points);
      }
    },
    buildwkt(pointList) {
      const strList = [];
      pointList.forEach((item) => {
        strList.push(item.join(' '));
      });
      const wkt = `POLYGON((${strList.toString()}))`;
      this.formData.geo = wkt;
    },
    cellMouseEnter(row) {
      this.mapComponent.heightLight(row.entiy, true);
    },
    cellMouseLeave(row) {
      this.mapComponent.heightLight(row.entiy, false);
    },
  },
  mounted() {
    const animation = () => {
      this.initDictionary();
      if (Object.keys(this.dictionary).length === 0) {
        requestAnimationFrame(() => {
          animation();
        });
      }
    };
    animation();
  },
};
</script>

<style lang="scss" scoped>
  .open {
    position: absolute;
    top: 80px;
    left: 0px;
    padding: 6px 9px;
    border-radius: 3px;
    background-color: #ffffff;
    -moz-transition: left 1s; /* Firefox 4 */
    -webkit-transition: left 1s; /* Safari 和 Chrome */
    -o-transition: left 1s; /* Opera */
    transition-delay:0.9s;
  }
  .image-search {
    position: absolute;
    left: -522px;
    width: 520px;
    background-color: #ffffff;
    height:100%;
    -moz-transition: left 1s; /* Firefox 4 */
    -webkit-transition: left 1s; /* Safari 和 Chrome */
    -o-transition: left 1s; /* Opera */
    .image-search-title {
      height: 48px;
      line-height: 48px;
      padding:0px 10px;
      font-size: 16px;
      color: #6e7173;
      font-weight: bold;
      border-bottom: 1px solid #dbdbdb;
      .close {
        float: right;
        box-sizing: content-box;
        padding:10px 0px;
      }
    }
    .search{
      position: absolute;
      width: 520px;
      height: calc(100vh - 100px);
      overflow-y: scroll;
      z-index: 20;
      .search-buttons {
        text-align: center;
      }
      .change-button {
        .el-button{
          width: 87px;
          height: 32px;
          padding: 0px;
          font-size: 14px;
        }
      }
      .form-item {
        margin: 20px;
        box-sizing: border-box;
        font-size: 15px;
        font-weight: 600;
        color: #000;
        .el-row{
          line-height: 32px;
        }
        .value {
          font-weight: normal;
          color: #646464;
        }
        .is-active{
          color: #409EFF;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        .time {
          .el-date-editor--daterange{
            width:100%;
          }
          .el-range-input,.el-range-separator{
            font-size: 12px;
          }
          .el-icon-date, .el-range-separator{
            line-height: 22px;
          }
        }
        .shp-name{
          font-weight: normal;
          color: #409EFF;
        }
      }
      .draw{
        width: 100px;
        background-size:13px 12px;
        background-repeat:no-repeat;
      }
      .rectangle{
        padding-left: 35px;
        background-position: 29px 10px;
        background-image: url('../assets/rectangle.png');
        &:hover,&:active,&:focus{
          background-image: url('../assets/rectangle-hover.png');
        }
      }
      .polygon{
        padding-left: 29px;
        background-position: 20px 10px;
        background-image: url('../assets/polygon.png');
        &:hover,&:active,&:focus{
          background-image: url('../assets/polygon-hover.png');
        }
      }
    }
  }
  .result {
    position: absolute;
    left: -522px;
    width: 520px;
    background-color: #ffffff;
    z-index: 40;
    height: calc(100vh - 108px);
    -moz-transition: left 1s; /* Firefox 4 */
    -webkit-transition: left 1s; /* Safari 和 Chrome */
    -o-transition: left 1s; /* Opera */
    .el-table__row {
      .el-table_1_column_1,.el-table_1_column_2,.el-table_1_column_3{
        padding : 10px 0px;
      }
    }
    .title {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .operate {
      display: inline-block;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      cursor: pointer;
      color: #409EFF;
      background: #ecf5ff;
      border: 1px solid #b3d8ff;
      border-radius: 4px;
      &:hover{
        background: #409EFF;
        border-color: #409EFF;
        color: #fff;
      }
    }
    .bold {
      font-size: 14px;
      font-weight: bold;
    }
    .row-active {
      background: #409EFF;
      border-color: #409EFF;
      color: #fff;
    }
    .row-disabled{
      color: #8cc5ff !important;
      background-color: #ecf5ff !important;
      border-color: #d9ecff !important;
      cursor: not-allowed;
    }
    .el-footer {
      padding: 15px 10px;
    }
  }
  .show-image-search, .show-result {
    left: 0px;
  }
  .hide-open {
    left: -40px;
  }
  .layerName{
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
  .moreBtn-class{
    text-align: right;
  }
</style>
