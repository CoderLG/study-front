<template>
  <div class="search-control">
    <nav-component></nav-component>
    <open-layers-component :isResetPlugin='true' :isSetBaseMap="true" :isShowBaseMapButton="true" ref="mapComponent">
    </open-layers-component>
    <div :class="{'hide-open': isShowSearchPanel}"
         class="open" @click="handleSearchCollapse(true)">
      <img src="../assets/open-search.png" height="25"/>
    </div>
    <div :class="{'show-image-search': isShowSearchPanel}" class="image-search">
      <div class="image-search-title">
        <span v-if="!isShowSearchResult">
          高级查询
        </span>
        <span v-if="isShowSearchResult">
          <i style="cursor: pointer;" class="el-icon-back" @click="goBackSearch"></i>
          查询结果
        </span>
        <img @click="handleSearchCollapse(false)" class="close"
             src="../assets/close-search.png" height="25"/>
      </div>
      <div class="search search-group">
        <el-form :model="formData"
                 label-position="left"
                 ref="searchForm">
          <div class="form-item">
            <el-row>
              <el-col :span="5">
                关键字
              </el-col>
              <el-col :span="7" class="value">
                <el-input size="small"  v-model="formData.keyWordName"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class="form-item">
            <el-row>
              <el-col :span="5">
                数据类型
              </el-col>
              <el-col :span="7" class="value">
                <el-select v-model="type"
                           size="small"
                           @change="changeType">
                  <el-option v-for='(li, index) in dataTypeList' :key='index' :title='li.serviceName'
                   :label="li.serviceName" :value="li.typeIdentify"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="form-item change-button">
            <el-row>
              <el-col :span="5">
                查询范围
              </el-col>
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
                <place-cascader-componment
                  @change="areaChange"
                  ref="placeCascaderComponent"></place-cascader-componment>
              </el-col>
            </el-row>
          </div>
          <el-form :model="position" :rules="positionRules" ref="position" label-width="1px">
            <div class="form-item" v-show="isShowAreaType.lonLat" style="margin: 0px 20px;">
              <el-row>
                <el-col :span="5">
                  左上角经度
                </el-col>
                <el-col :span="6" class="value">
                  <!-- <el-input size="small" v-model="position.minX" @blur="canNotEmpty(position)">
                  </el-input> -->
                  <el-form-item prop="minX">
                    <el-input size="small" v-model="position.minX" @blur="canNotEmpty(position)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  左上角纬度
                </el-col>
                <el-col :span="6" class="value">
                  <!-- <el-input size="small" v-model="position.maxY" @blur="canNotEmpty(position)">
                  </el-input> -->
                  <el-form-item prop="maxY">
                    <el-input size="small" v-model="position.maxY" @blur="canNotEmpty(position)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>            
            </div>
            <div class="form-item" v-show="isShowAreaType.lonLat" style="margin: 0px 20px;">
              <el-row>
                <el-col :span="5">
                  右下角经度
                </el-col>
                <el-col :span="6" class="value">
                  <!-- <el-input size="small" v-model="position.maxX" @blur="canNotEmpty(position)">
                  </el-input> -->
                  <el-form-item prop="maxX">
                    <el-input size="small" v-model="position.maxX" @blur="canNotEmpty(position)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  右下角纬度
                </el-col>
                <el-col :span="6" class="value">
                  <!-- <el-input size="small" v-model="position.minY" @blur="canNotEmpty(position)">
                  </el-input> -->
                  <el-form-item prop="minY">
                    <el-input size="small" v-model="position.minY" @blur="canNotEmpty(position)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <div class="form-item" v-show="isShowAreaType.draw">
            <el-row>
              <el-col :span="18" :offset="5" class="value">
                <el-tooltip placement="top" effect="light">
                  <div slot="content">单击鼠标左键,移动光<br/>标确定矩形范围,再次<br/>单击鼠标左键完成绘制.</div>
                  <el-button size="small" class="draw rectangle" @click="drawing('Circle')">
                    矩形
                  </el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="light">
                  <div slot="content">依次单击鼠标左键确定<br/>多边形范围,双击鼠标<br/>左键完成绘制.</div>
                  <el-button class="draw polygon" size="small" @click="drawing('Polygon')">
                    多边形
                  </el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
          <div class="form-item" v-show="isShowAreaType.shp">
            <el-row>
              <el-col :span="7" :offset="5" class="value">
                <el-tooltip placement="top" effect="light">
                  <!-- <div slot="content">1. 请确保您上传的Shp文件<br/>是WGS-84坐标系；
                    <br/>2. 至少包含：.dbf、.shp、.shx和 .prj<br/>四类文件。</div> -->
                    <div slot="content">
                      1.只支持上传zip格式的压缩包；<br/>
                      2.压缩包内至少包含.shp、.shx、.dbf、.prj<br/>四类文件；<br/>
                      3.只支持上传WGS84坐标系的矢量数据。<br/>
                      4.压缩包应小于10M。<br/>
                    </div>
                  <el-button size="small" @click="openFile"
                             icon="el-icon-upload2">文件上传</el-button>
                </el-tooltip>
              </el-col>
              <el-col :span="11">
                <u class="shp-name">{{shpName}}</u>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" class="form-item change-button" style="margin: 0px 20px;">
            <el-row>
              <el-col :span="5">
                查询方式
              </el-col>
              <el-col :span="18" class="value">
                <el-button-group>
                  <el-button size="small" @click="changeWayType('sensor')"
                             :class="{'is-active': isShowWayType.sensor}">按卫星</el-button>
                  <el-button size="small" @click="changeWayType('resolution')"
                             :class="{'is-active': isShowWayType.resolution}">按分辨率</el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" v-show="isShowWayType.sensor" class="form-item">
            <el-row>
              <el-col :span="5">
                卫星
              </el-col>
              <el-col :span="7" class="value">
                <el-select size="small" v-model="formData.satelliteId"
                           clearable placeholder="请选择卫星"
                           @change="formData.sensorId = null"
                           @focus="initDictionary('satelliteId')">
                  <el-option
                    v-for="item in dictionary.satelliteId"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" v-show="isShowWayType.sensor" class="form-item">
            <el-row>
              <el-col :span="5">
                传感器
              </el-col>
              <el-col :span="7" class="value">
                <el-select size="small" v-model="formData.sensorId" clearable
                           :disabled="!formData.satelliteId" placeholder="请选择传感器">
                  <el-option
                    v-for="item in dictionary[`satelliteId.${formData.satelliteId}`]"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" v-show="isShowWayType.resolution" class="form-item">
            <el-row>
              <el-col :span="5">
                分辨率 &lt;=
              </el-col>
              <el-col :span="7" class="value">
                <el-select placeholder="请选择分辨率" v-model="formData.maxResolution"
                           size="small" clearable>
                  <el-option :value="1"> </el-option>
                  <el-option :value="3"> </el-option>
                  <el-option :value="5"> </el-option>
                  <el-option :value="8"> </el-option>
                  <el-option :value="20"> </el-option>
                  <el-option :value="30"> </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" class="form-item">
            <el-row>
              <el-col :span="5">
                产品级别
              </el-col>
              <el-col :span="7" class="value">
                <el-select size="small" placeholder="请选择产品级别" v-model="formData.level" @focus="initDictionary('level')" clearable>
                  <el-option
                    v-for="item in dictionary.level"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" class="form-item">
            <el-row>
              <el-col :span="5">
                云量
              </el-col>
              <el-col :span="9" class="value">
                <el-slider :show-tooltip="false" v-model="formData.cloudPercent"></el-slider>
              </el-col>
              <el-col v-if="formData.cloudPercent" :offset="1" :span="1" class="value">
                <div>{{formData.cloudPercent}}</div>
              </el-col>
            </el-row>
          </div>
          <div v-if="isShowFormItem" class="form-item">
            <el-row>
              <el-col :span="5">
                采集时间
              </el-col>
              <el-col :span="13" class="time value">
                <el-date-picker
                  size="small"
                  align="right"
                  type="daterange"
                  unlink-panels
                  v-model="dateRange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="dateRangeChange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-col>
            </el-row>
          </div>
          <el-form-item size="small" class="search-buttons">
            <el-button type="primary" icon="el-icon-search" @click="searchBth">查询</el-button>
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div :class="{'show-result': isShowSearchResult}" class="result">
        <el-container class="full-container">
          <el-main class="full-container">
            <el-table class="full-container"
                      ref="resultTable"
                      @cell-mouse-enter="cellMouseEnter"
                      @cell-mouse-leave="cellMouseLeave"
                      height="100%"
                      v-loading="loading"
                      :data="pageData" size="mini">
              <el-table-column label="缩略图"  width="60">
                <template slot-scope="scope">
                  <img :src="scope.row.url" height="40px" width="45px">
                </template>
              </el-table-column>
              <el-table-column label="名称">
              <template slot-scope="scope">
                <span class="title" :title="scope.row.name">
                  {{scope.row.name}}
                </span>
              </template>
            </el-table-column>
              <el-table-column v-if= "type !== 'originalImage'" label="上传时间" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDataString }}</span>
                </template>
              </el-table-column>
              <el-table-column v-else label="采集时间" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.gatherTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="110">
                <template slot-scope="scope">
                  <i class="el-icon-info operate"
                     style="position: relative;top: -1px;"
                             title="详情" @click="showInfoDialog(scope.row)"></i>
                  <i class="el-icon-view operate bold" title="上球"
                     :class="{'row-active':scope.row.active,
                     'row-disabled':!scope.row.isEffectiveUrl}" @click="addOnEarth(scope.row, scope.$index)">
                  </i>
                  <i class="el-icon-download operate bold"
                     title="下载" @click="download(scope.row)"></i>
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
    <search-info-dialog ref="searchInfoDialog" :activeFile="activeFile"></search-info-dialog>
    <input v-show="false" type="file" id="shpFile" @change="uploadShp" accept="application/zip">
  </div>
</template>

<script>
import NavComponent from './NavComponent';
import PlaceCascaderComponment from './PlaceCascaderComponent';
import OpenLayersComponent from './OpenLayersComponent';
import SearchInfoDialog from './SearchInfoDialog';
import { getImageDictionary, advancedSearch, uploadShpFile } from '../api/imageApi';
import { downloadFileURL, showWindow, getdataTypeList } from '../api/fileApi';
import { getIconOrThumbUrl } from '../api/publicApi';
// import UrlSetting from '../api/UrlSetting';

// const previewVector = UrlSetting.URLS.previewVector;

const oneDay = 3600 * 1000 * 24;
const setHourToZero = (date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
};
export default {
  components: {
    NavComponent,
    OpenLayersComponent,
    SearchInfoDialog,
    PlaceCascaderComponment,
  },
  name: 'image-search-componment',
  filters: {
    formatDataString(value) {
      return value ? value.split(' ')[0] : null;
    },
  },
  data() {
    const validateMinX = (rule, value, callback) => {
      if (value > 180 || value < -180) {
        callback(new Error('经度范围为-180 ~ 180!'));
      } else if (value > Number(this.position.maxX)) {
        callback(new Error('左上角经度不能大于右下角经度'));
      }  else if (value.length > 10) {
        callback(new Error('经度小数点保留5位！'));
      }  else if (isNaN(Number(value))) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    const validateMaxX = (rule, value, callback) => {
      if (value > 180 || value < -180) {
        callback(new Error('经度范围为-180 ~ 180!'));
      } else if (value < Number(this.position.minX)) {
        callback(new Error('右下角经度不能小于左上角经度'));
      }  else if (value.length > 10) {
        callback(new Error('经度小数点保留5位！'));
      }  else if (isNaN(Number(value))) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    const validateMinY = (rule, value, callback) => {
      if (value > 90 || value < -90) {
        callback(new Error('纬度范围为-90 ~ 90!'));
      } else if (value > Number(this.position.maxY)) {
        callback(new Error('右下角经度不能大于左上角纬度'));
      }  else if (value.length > 10) {
        callback(new Error('纬度小数点保留5位！'));
      }  else if (isNaN(Number(value))) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    const validateMaxY = (rule, value, callback) => {
      if (value > 90 || value < -90) {
        callback(new Error('纬度范围为-90 ~ 90!'));
      } else if (value < Number(this.position.minY)) {
        callback(new Error('左上角纬度不能小于右下角纬度'));
      }  else if (value.length > 10) {
        callback(new Error('纬度小数点保留5位！'));
      }  else if (isNaN(Number(value))) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    return {
      row2OlFlag: 'row-ol-feature',
      areaFeatureId: 'area-feature',
      currentType: 'image',
      type: 'image',
      maxSize: 13,
      loading: false,
      isShowAreaType: { lonLat: true },
      isShowWayType: { sensor: true },
      area: null,
      activeFile: null,
      position: {},
      positionRules: {
        minX: [
          { validator: validateMinX, trigger: 'blur' }
        ],
        maxX: [
          { validator: validateMaxX, trigger: 'blur' }
        ],
        minY: [
          { validator: validateMinY, trigger: 'blur' }
        ],
        maxY: [
          { validator: validateMaxY, trigger: 'blur' }
        ],
      },
      isShowSearchResult: false,
      isShowSearchPanel: false,
      isShowFormItem: true,
      pageData: [],
      selections: [],
      timeIntervals: null,
      formData: {
        keyWordName: null,
        satelliteId: null,
        sensorId: null,
        geo: null,
        level: null,
        maxResolution: null,
        cloudPercent: 0,
        minResolution: 0,
      },
      resolution: [1, 10],
      pageSize: 13,
      total: 0,
      currentPage: 1,
      dateRange: null,
      shpName: null,
      dictionary: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (oneDay * 7));
            setHourToZero(start);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (oneDay * 30));
            setHourToZero(start);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (oneDay * 90));
            setHourToZero(start);
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      dataTypeList: [],
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
  async created() {
    this.dataTypeList = await getdataTypeList(1, 1000);
    let tempArr = [];
    this.dataTypeList.items.forEach(res => {
      if (res.serviceName !== '图片' && res.serviceName !== '文档' && res.serviceName !== '其他') {
        tempArr.push(res);
      }
    });
    this.dataTypeList = tempArr;
  },
  methods: {
    getRowFeature(row) {
      return row[this.row2OlFlag];
    },
    /**
     * 返回查询页面
     */
    goBackSearch() {
      this.isShowSearchResult = false;
      this.currentPage = 1;
    },
    /**
     * 控制高级查询的显示隐藏
     */
    handleSearchCollapse(bool) {
      this.isShowSearchPanel = bool;
      this.currentPage = 1;
      this.resetForm();
    },
    /**
     * 页面切换查询
     */
    currentPageChange(value) {
      this.currentPage = value;
      this.searchBth();
    },
    /**
     * 更换数据类型查询
     * @param type:影像image，其余都按矢量处理
     */
    changeType(type) {
      this.currentType = type;
      //this.resetForm();
      this.changeWayType('sensor');
      if (type === 'image' || type === 'originalImage') {
        this.isShowFormItem = true;
      } else {
        this.isShowFormItem = false;
      }
    },
    /**
     * 更换查询范围类型
     * @param type：lonLat经纬度，area行政区，draw底图绘制，shpSHP上传
     */
    changeAreaType(type) {
      this.isShowAreaType = {};
      this.isShowAreaType[type] = true;
      if (type === 'lonLat') {
        this.canNotEmpty(this.position);
      }
      if(type !== 'draw'){
        this.mapComponent.clearDraw();
      }
    },
    /**
     * 更换查询方式
     * @param type：sensor按卫星，resolution按分辨率
     */
    changeWayType(type) {
      this.isShowWayType = {};
      this.isShowWayType[type] = true;
    },
    /**
     * 范围图形变更
     * @param wkt：wkt参数，在图上画出范围
     */
    areaChange(wkt) {
      let areaFeature = this.mapComponent.getFeatureById(this.areaFeatureId);
      if (areaFeature) {
        this.mapComponent.removeFeature(areaFeature);
      }
      this.formData.geo = wkt;
      if (wkt) {
        areaFeature = this.mapComponent.addWKTFeature(wkt);
        areaFeature.setId(this.areaFeatureId);
      }
    },
    /**
     * SHP上传
     */
    openFile() {
      const file = document.getElementById('shpFile');
      file.click();
    },
    uploadShp(e) {
      if (e && e.target.files.length > 0) {
        let name = e.target.files[0].name;
        if (name.slice(name.lastIndexOf('.')) != '.zip') {
          this.$message.error('需要上传的zip压缩文件！');
          return
        } else if ( e.target.files[0].size > 10 * 1024 * 1024) {
          this.$message.error('单个上传的文件不能大于10M');
          return
        }
        const form = new FormData();
        form.append('file', e.target.files[0]);
        uploadShpFile(form).then((result) => {
          this.formData.geo = result;
          this.areaChange(result);
        });
        this.shpName = e.target.files[0].name;
        e.target.value = '';
      }
    },
    /**
     * 控制经纬度填写不能为空
     */
    canNotEmpty(position) {
      let position1 = position;
      if(position.minX.trim() === '') position1.minX = '-180';
      if(position.minY.trim() === '') position1.minY = '-90';
      if(position.maxX.trim() === '') position1.maxX = '180';
      if(position.maxY.trim() === '') position1.maxY = '90';
      const points = [
        [position1.minX, position1.minY],
        [position1.maxX, position1.maxY],
      ];
      this.changePoint2wkt(points);
    },
    /**
     * 加载影像参数
     */
    async initDictionary(key) {
      if(this.dictionary[key]) {
        return
      }
      const result = await getImageDictionary(key);
      this.$set(this.dictionary, key, result.dictionarys);
      result.dictionarys.map((item) => {
        if(item.dictionarys.length > 0) {
          this.$set(this.dictionary, `${key}.${item.key}`, item.dictionarys);
          let evt = item;
          delete evt.dictionarys;
        }
      });
    },
    /**
     * 时间范围变更
     * @param values:获取时间控件的时间
     */
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
    /**
     *下载
     * @param row:单条影像或矢量信息
     */
    download2(id) {
      showWindow(downloadFileURL(id));
    },
    download(row) {
      row.downloadids.split(',').forEach(id => {
        setTimeout(() => {
          this.download2(id);
        }, 200);
      });
    },
    /**
     *查看详情
     * @param fileObject:单条影像或矢量信息
     */
    async showInfoDialog(fileObject) {
      // let fileObject1 = fileObject;
      // if (fileObject1.dataType === '0202') {
      //   fileObject1.type = 'vector';
      // } else {
      //   fileObject1.type = 'images';
      // }
      this.activeFile = fileObject;
      this.$refs.searchInfoDialog.visible = true;
    },
    /**
     * 影像查询
     *@param params:查询参数
     */
    async imageSearch(params) {
      let conditions = params;
      conditions.pageSize = this.maxSize;
      conditions.currentPage = this.currentPage;
      conditions.timeIntervals = this.timeIntervals;
      this.isShowSearchResult = true;
      const result = await advancedSearch(conditions);
      this.pageData = [];
      this.total = result.total;
      const lastCount = this.total - (this.currentPage - 1) * this.maxSize;
      const count = lastCount > this.maxSize ? this.maxSize : lastCount;
      const geometries = [];
      result.items.map((item) => {
        let evt = item;
        if (!evt.validArea || evt.validArea.indexOf('EMPTY') > -1) {
          evt.validArea = evt.geo;
        }
        evt.name = evt.fileName;
        evt.url = evt.thumbnailRelativePath ? getIconOrThumbUrl(evt.thumbnailRelativePath) : null;
        evt.iconUrl = evt.iconRelativePath ? getIconOrThumbUrl(evt.iconRelativePath) : null;
        const feature = this.mapComponent.formatterWKT2Feature(evt.validArea);
        feature.setId(evt.id);
        this.$set(evt, this.row2OlFlag, feature);
        this.mapComponent.addFeature(feature);
        geometries.push(feature.getGeometry());
        evt.isEffectiveUrl = true;
        this.pageData.push(evt);
        if (this.pageData.length === count) {
          this.mapComponent.flyToGeometries(geometries);
          this.loading = false;
        }
      });
      if (!this.total) {
        this.loading = false;
      }
    },
    /**
     * 矢量查询
     *@param params:查询参数
     */
    async vectorSearch(params) {
      const conditions = {
        currentPage: this.currentPage,
        pageSize: this.maxSize,
        geo: params.geo,
        dataType: params.dataType,
        keyWordName: params.keyWordName || ''
      };
      this.pageData = [];
      this.isShowSearchResult = true;
      const result = await advancedSearch(conditions);
      this.total = result.total;
      const lastCount = this.total - (this.currentPage - 1) * this.maxSize;
      const count = lastCount > this.maxSize ? this.maxSize : lastCount;
      result.items.map((item) => {
        let evt = item;
        evt.name = evt.fileName;
        evt.url = evt.thumbnailRelativePath ? getIconOrThumbUrl(evt.thumbnailRelativePath) : null;
        evt.iconUrl = evt.iconRelativePath ? getIconOrThumbUrl(evt.iconRelativePath) : null;
        // evt.startTime = evt.date ? evt.date.substring(0, 10) : null;
        // evt.isEffectiveUrl = evt.tileLayers.length > 0 ? true : false;
        evt.isEffectiveUrl = true;
        this.pageData.push(evt);
        if (this.pageData.length === count) {
          this.loading = false;
        }
      });
      if (!this.total) {
        this.loading = false;
      }
    },
    /**
     * 数据查询
     *构造查询参数，并清空图层
     */
    searchBth() {
      this.searchForm.validate(async (valid) => {
        this.$refs['position'].validate((valid2) => {
          if (valid && valid2) {
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
            this.mapComponent.clear();
            this.mapComponent.clearDraw();
            this.loading = true;
            switch (this.currentType) {
              case 'image' :
              case 'originalImage' :
              case 'terrain' :
                params.dataType = this.currentType;
                this.imageSearch(params);
                break;           
              default:
                params.dataType = this.currentType;
                this.vectorSearch(params);
                break;
            }
          }
          return false;
        });
      });
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.placeCascaderComponent.reset();
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
        keyWordName: null,
        satelliteId: null,
        sensorId: null,
        geo: null,
        level: null,
        cloudPercent: 0,
        maxResolution: null,
        minResolution: 0,
      };
      this.changeAreaType('lonLat');
      this.mapComponent.clear();
      this.mapComponent.clearDraw();
    },
    /**
     * 影像矢量上球
     */
    addOnEarth(row, index) {
      if (!row.isEffectiveUrl) {
        return;
      }
      this.$set(row, 'active', !row.active);
      if (row.dataType === 'vector') {
        this.addVector(row ,index);
      } else {
        this.addImage(row, index);
      }
    },
    /**
     * 影像图片旋转和长、宽参数计算
     * @param item:单条影像数据
     */
    getTransForm(item) {
      const length1 = item.upLeftLat - item.lowLeftLat;
      const width1 = item.lowLeftLon - item.upLeftLon;
      const width2 = item.upLeftLat - item.upRightLat;
      const length2 = item.upRightLon - item.upLeftLon;
      const rotatey = length1 ? Math.atan(width1 / length1) : 0;
      const rotatex = length2 ? Math.atan(width2 / length2) : 0;
      const length = Math.sqrt(Math.pow(length2,2) + Math.pow(width2,2));
      const width = Math.sqrt(Math.pow(length1,2) + Math.pow(width1,2));
      return {
        rotatex,
        rotatey,
        length,
        width
      };
    },
    /**
     * 矢量图片旋转和长、宽参数计算
     * @param item:单条影像数据
     */
    getTransFormVector(item) {
      const length1 = item.maxY - item.minY;
      const width1 = item.minX - item.minX;
      const width2 = item.maxY - item.maxY;
      const length2 = item.maxX - item.minX;
      const rotatey = length1 ? Math.atan(width1 / length1) : 0;
      const rotatex = length2 ? Math.atan(width2 / length2) : 0;
      const length = Math.sqrt(Math.pow(length2,2) + Math.pow(width2,2));
      const width = Math.sqrt(Math.pow(length1,2) + Math.pow(width1,2));
      return {
        rotatex,
        rotatey,
        length,
        width
      };
    },
    /**
     * 影像上球数据构造
     * @param row:单条影像数据
     */
    addImage(row) {
      const imageData = {
        id: `image${row.id}`,
      };
      if (row.active) {
        imageData.transform = this.getTransForm(row);
        imageData.outExtent = [
          Math.min(row.upLeftLon, row.lowLeftLon),
          Math.min(row.lowLeftLat, row.lowRightLat),
          Math.max(row.lowRightLon, row.upRightLon),
          Math.max(row.upLeftLat, row.upRightLat)
        ];
        imageData.polygon = [
          row.upLeftLon, row.upLeftLat,
          row.lowLeftLon, row.lowLeftLat,
          row.lowRightLon, row.lowRightLat,
          row.upRightLon, row.upRightLat,
        ];
        imageData.url = row.iconRelativePath ? getIconOrThumbUrl(row.iconRelativePath) : null;
      }
      this.mapComponent.imageOnMap(row.active, imageData);
    },
    /**
     * 矢量上球数据构造
     * @param row:单条矢量数据
     * @param index:第几条矢量数据，构造id，防止layerName一样
     */
    addVector(row) {
      // const vectorData = {
      //   id: row.layerName + index
      // };
      // if(row.active) {
      //   const tileLayers = row.tileLayers[0];
      //   vectorData.layer = tileLayers.layerName;
      //   vectorData.tileType = 'vector-png';
      //   vectorData.wmsUrl = `${previewVector}/${tileLayers.workspace}/${tileLayers.layerName}/wms`;
      //   vectorData.extent = [parseFloat(row.minx), parseFloat(row.miny), parseFloat(row.maxx), parseFloat(row.maxy)];
      // }
      // this.mapComponent.vectorOnMap(row.active, vectorData);

      const vectorData = {
        id: `image${row.id}`,
      };
      if (row.active) {
        vectorData.transform = this.getTransFormVector(row);
        vectorData.outExtent = [row.minX, row.minY, row.maxX, row.maxY];
        vectorData.polygon = [
          row.minX, row.maxY,
          row.maxX, row.maxY,
          row.maxX, row.minY,
          row.minX, row.minY,
        ];
        vectorData.url = row.iconRelativePath ? getIconOrThumbUrl(row.iconRelativePath) : null;
      }
      this.mapComponent.imageOnMap(row.active, vectorData);
    },
    /**
     * 绘制图形
     * @param type:Circle矩形，Polygon多边形
     */
    drawing(type) {
      this.mapComponent.drawing(type, (wkt) => {
        this.formData.geo = wkt;
      });
    },
    /**
     * 坐标点转wkt
     * @param points:点列表
     */
    changePoint2wkt(points) {
      if (points.length > 2) {
        points.push(points[0]);
        this.buildwkt(points);
      } else {
        const start = points[0];
        const end = points[1];
        const points1 = [
          start,
          [start[0], end[1]],
          end,
          [end[0], start[1]],
          start,
        ];
        this.buildwkt(points1);
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
    /**
     * 图上画出的图形高亮
     * @param row:单条数据
     * @param isHighlight:是否高亮
     */
    highlightRow(row, isHighlight) {
      const feature = this.getRowFeature(row);
      if (!feature) {
        return;
      }
      if (isHighlight) {
        this.mapComponent.highLightFeature(feature);
      } else  {
        this.mapComponent.defaultFeature(feature);
      }
    },
    /**
     * 鼠标移入
     */
    cellMouseEnter(row) {
      this.highlightRow(row, true);
    },
    /**
     * 鼠标移出
     */
    cellMouseLeave(row) {
      this.highlightRow(row, false);
    },
  }
};
</script>

<style lang="scss">
  .search-control{
    height: calc(100vh - 60px);
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
      top: 60px;
      left: -522px;
      width: 520px;
      background-color: #ffffff;
      height: calc(100vh - 60px);
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
        height: calc(100vh - 108px);
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
      .cell {
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
  }
</style>
