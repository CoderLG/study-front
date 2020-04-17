<template>
  <div class="search-control">
    <nav-component></nav-component>
    <open-layers-component :isResetPlugin='true'
                           :isSetBaseMap="true"
                           :isShowBaseMapButton="true"
                           ref="mapComponent">
    </open-layers-component>
    <div :class="{'hide-open': isShowSearchPanel}"
         class="open"
         @click="handleSearchCollapse(true)">
      <img src="../assets/open-search.png"
           height="25" />
    </div>
    <div :class="{'show-image-search': isShowSearchPanel}"
         class="image-search">
      <div class="image-search-title">
        <span v-if="!isShowSearchResult">
          数据流导出
        </span>
        <span v-if="isShowSearchResult">
          <i style="cursor: pointer;"
             class="el-icon-back"
             @click="goBackSearch"></i>
          查询结果
        </span>
        <img @click="handleSearchCollapse(false)"
             class="close"
             src="../assets/close-search.png"
             height="25" />
      </div>
      <div class="search search-group">
        <el-form :model="formData"
                 label-position="left"
                 :rules="formRules"
                 ref="searchForm">
          <div class="form-item change-button">
            <el-form-item prop="layername">
              <el-row>
                <el-col :span="5">
                  图层名称
                </el-col>
                <el-col :span="7"
                        class="value">
                  <el-input size="small"
                            v-model="formData.layername"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="datatype">
              <el-row>
                <el-col :span="5">
                    数据类型
                </el-col>
                <el-col :span="7"
                        class="value">
                  <el-select placeholder="请选择数据类型"
                             v-model="formData.datatype"
                             size="small"
                             clearable>
                    <el-option :value="0"
                               label='tif'></el-option>
                    <el-option :value="1"
                               label='bmp'></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="geo">
              <el-row>
                <el-col :span="5">
                    查询范围
                </el-col>
                <el-col :span="7"
                        class="value">
                  <el-tooltip placement="top"
                              effect="light">
                    <div slot="content">单击鼠标左键,移动光<br />标确定矩形范围,再次<br />单击鼠标左键完成绘制.</div>
                    <el-button size="small"
                               class="draw"
                               @click="drawing('Circle')">矩形</el-button>
                  </el-tooltip>
                  <!-- <el-tooltip placement="top" effect="light">
                  <div slot="content">依次单击鼠标左键确定<br/>多边形范围,双击鼠标<br/>左键完成绘制.</div>
                  <el-button class="draw polygon" size="small" @click="drawing('Polygon')">
                      多边形
                  </el-button>
                </el-tooltip> -->
                </el-col>
              </el-row>
            </el-form-item> 
          </div>
          <div class="form-item"
               v-show="isShowAreaType.area">
            <el-row>
              <el-col :span="19"
                      :offset="5"
                      class="value">
                <place-cascader-componment @change="areaChange"
                                           ref="placeCascaderComponent"></place-cascader-componment>
              </el-col>
            </el-row>
          </div>

          <el-form-item size="small"
                        class="search-buttons">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="searchBth">导出</el-button>
            <!-- <el-button icon="el-icon-refresh"
                       @click="resetForm">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <search-info-dialog ref="searchInfoDialog"
                        :activeFile="activeFile"></search-info-dialog>
  </div>
</template>

<script>
import NavComponent from './NavComponent';
import PlaceCascaderComponment from './PlaceCascaderComponent';
import OpenLayersComponent from './OpenLayersComponent';
import SearchInfoDialog from './SearchInfoDialog';
import { getdataTypeList } from '../api/fileApi';
import { getRangeTiff } from '../api/tileCacheApi'
// import UrlSetting from '../api/UrlSetting';

// const previewVector = UrlSetting.URLS.previewVector;

export default {
  components: {
    NavComponent,
    OpenLayersComponent,
    SearchInfoDialog,
    PlaceCascaderComponment,
  },
  name: 'image-search-componment',
  filters: {
    formatDataString (value) {
      return value ? value.split(' ')[0] : null;
    },
  },
  data () {
    return {
      row2OlFlag: 'row-ol-feature',
      areaFeatureId: 'area-feature',
      currentType: 'image',
      type: 'image',
      isShowAreaType: { lonLat: true },
      isShowWayType: { sensor: true },
      area: null,
      activeFile: null,
      position: {},
      isShowSearchResult: false,
      isShowSearchPanel: false,
      isShowFormItem: true,
      pageData: [],
      selections: [],
      timeIntervals: null,
      formData: {
        layername: null,
        satelliteId: null,
        sensorId: null,
        geo: null,
        level: null,
        datatype: null,
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
      dataTypeList: [],
      currentLevel: null,
      formRules: {
        layername: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { max: 50, message: '图层名称长度不能超过50字符', trigger: 'blur' }
        ],
        datatype: [
           { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        geo: [
          { required: true, message: '请确定矩形范围', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    mapComponent () {
      return this.$refs.mapComponent;
    },
    searchForm () {
      return this.$refs.searchForm;
    },
  },
  async created () {
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
    /**
     * 返回查询页面
     */
    goBackSearch () {
      this.isShowSearchResult = false;
      this.currentPage = 1;
    },
    /**
     * 控制高级查询的显示隐藏
     */
    handleSearchCollapse (bool) {
      this.isShowSearchPanel = bool;
      this.currentPage = 1;
    },
    /**
     * 更换数据类型查询
     * @param type:影像image，其余都按矢量处理
     */
    changeType (type) {
      this.currentType = type;
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
    changeAreaType (type) {
      this.isShowAreaType = {};
      this.isShowAreaType[type] = true;
      if (type === 'lonLat') {
        this.canNotEmpty(this.position);
      }
      if (type !== 'draw') {
        this.mapComponent.clearDraw();
      }
    },
    /**
     * 更换查询方式
     * @param type：sensor按卫星，resolution按分辨率
     */
    changeWayType (type) {
      this.isShowWayType = {};
      this.isShowWayType[type] = true;
    },
    /**
     * 范围图形变更
     * @param wkt：wkt参数，在图上画出范围
     */
    areaChange (wkt) {
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
     * 数据查询
     *构造查询参数，并清空图层
     */
    searchBth () {
      this.searchForm.validate(async (valid) => {
        if (valid) {
          const position = this.formData.geo.slice(9, this.formData.geo.length - 2).split(',');
          const minx = position[0].split(' ')[0];
          const miny = position[0].split(' ')[1];
          const maxx = position[2].split(' ')[0];
          const maxy = position[2].split(' ')[1];
          getRangeTiff(this.formData.layername, this.formData.datatype, this.currentLevel, minx, miny, maxx, maxy);
        }
        return false;
      });
    },
    /**
     * 绘制图形
     * @param type:Circle矩形，Polygon多边形
     */
    drawing (type) {
      this.mapComponent.drawing(type, (wkt) => {
        this.formData.geo = wkt;
        this.currentLevel = this.mapComponent.getLevel();
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.search-control {
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
    transition-delay: 0.9s;
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
      padding: 0px 10px;
      font-size: 16px;
      color: #6e7173;
      font-weight: bold;
      border-bottom: 1px solid #dbdbdb;
      .close {
        float: right;
        box-sizing: content-box;
        padding: 10px 0px;
      }
    }
    .search {
      position: absolute;
      width: 520px;
      height: calc(100vh - 108px);
      overflow-y: scroll;
      z-index: 20;
      .search-buttons {
        text-align: center;
      }
      .change-button {
        .el-button {
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
        .el-row {
          line-height: 32px;
        }
        /deep/ .el-form-item__error {
          margin-left: 100px;
        }
        .value {
          font-weight: normal;
          color: #646464;
        }
        .is-active {
          color: #409eff;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        .time {
          .el-date-editor--daterange {
            width: 100%;
          }
          .el-range-input,
          .el-range-separator {
            font-size: 12px;
          }
          .el-icon-date,
          .el-range-separator {
            line-height: 22px;
          }
        }
        .shp-name {
          font-weight: normal;
          color: #409eff;
        }
      }
      .draw {
        width: 100px;
        background-size: 13px 12px;
        background-repeat: no-repeat;
      }
      .rectangle {
        padding-left: 35px;
        background-position: 29px 10px;
        background-image: url("../assets/rectangle.png");
        &:hover,
        &:active,
        &:focus {
          background-image: url("../assets/rectangle-hover.png");
        }
      }
      .polygon {
        padding-left: 29px;
        background-position: 20px 10px;
        background-image: url("../assets/polygon.png");
        &:hover,
        &:active,
        &:focus {
          background-image: url("../assets/polygon-hover.png");
        }
      }
    }
  }
  .show-image-search,
  .show-result {
    left: 0px;
  }
  .hide-open {
    left: -40px;
  }
}
</style>
