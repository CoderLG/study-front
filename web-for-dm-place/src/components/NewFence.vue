<template>
  <div>
    <div class="new-style-title">
      <ul>
        <li @click="goBack">返回</li>
      </ul>
    </div>
    <div class="search-control">
      <component v-bind:is="currentComponent" :isResetPlugin='true' :isSetBaseMap="true"
       :isShowBaseMapButton="true" ref="mapComponent"></component>
      <div class="image-search">
        <div class="search search-group">
          <el-form :model="formData"
                   label-position="left"
                   ref="searchForm" 
                   :rules = 'fenceFormRule'>
            <div class="form-item">
              <el-row>
                <el-col :span="5">
                  围栏名称<span class = "red_start">*</span>
                </el-col>
                <el-col :span="16" class="value">
                  <el-form-item prop="gfName">
                    <el-input size="small" v-model="formData.gfName" style="width: 43%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="form-item change-button">
              <el-row>
                <el-col :span="5">
                  围栏范围<span class = "red_start">*</span>
                </el-col>
                <el-col :span="18" class="value">
                  <el-button-group>         
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
                    ref="placeCascaderComponent" :isAddFence ='isAddFence'></place-cascader-componment>
                </el-col>
              </el-row>
            </div>
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
                               icon="el-icon-upload2" :loading="fileLoading">文件上传</el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="11">
                  <u class="shp-name">{{shpName}}</u>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row>
                <el-col :span="5">
                  围栏描述<span class = "red_start">*</span>
                </el-col>
                <el-col :span="13" class="value">
                  <el-form-item prop="gfDescribe">
                    <el-input type="textarea" size="small" v-model="formData.gfDescribe"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-form-item size="small" class="search-buttons">
              <el-button type="primary" @click="addNewFence">确定</el-button>
              <el-button @click="goBack">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <input v-show="false" type="file" id="shpFile" @change="uploadShp" accept="application/zip">
    </div>
  </div>
</template>

<script>
import PlaceCascaderComponment from './PlaceCascaderComponent';
import OpenLayersComponent from './OpenLayersComponent';
import { uploadShpFile } from '../api/imageApi';
import { addOrEditNewFence } from '../api/realTimeTaskApi';

export default {
  name: 'new-fence',
  components: {
    'openLayersComponent': OpenLayersComponent,
    PlaceCascaderComponment,
  },  
  data() {
    const validateFenceName = (rule, value, callback) => {
      const val = value.trim();
      this.formData.gfName = value.trim();
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if(val === ''){
        callback(new Error('请输入围栏名称'));
      } else if (regEn.test(val) || regCn.test(val)) {
        callback(new Error('围栏名称只能包含数字、中文、字母、下划线、短横线！'));
      } else {
        callback();
      }
    };
    const validateFenceDescribe = (rule, value, callback) => {
      const val = value.trim();
      this.formData.gfDescribe = value.trim();
      if(val === ''){
        callback(new Error('请填写围栏描述'));
      } else {
        callback();
      }
    };
    return {
      currentComponent: null,// 当前动态组件
      row2OlFlag: 'row-ol-feature',
      areaFeatureId: 'area-feature',
      maxSize: 13,
      loading: false,
      isShowAreaType: { area: true },
      isShowWayType: { sensor: true },
      area: null,
      activeFile: null,
      position: {},
      isShowFormItem: true,
      isAddFence:true,
      formData: {
        gfName: null,
        gfDescribe: null,
        gfData: null,
      },
      resolution: [1, 10],
      pageSize: 13,
      total: 0,
      currentPage: 1,
      shpName: null,
      fenceFormRule: {
        gfName: [
          { required: true, message: '请输入围栏名称', trigger: 'blur' },
          { max: 50, message: '围栏名称长度不能超过50字符', trigger: 'blur'},
          { validator: validateFenceName, trigger:'blur'}
        ],
        gfDescribe: [
          { required: true, message: '请输入围栏描述', trigger: 'blur' },
          { max: 200, message: '围栏描述长度不能超过200字节', trigger: 'blur'},
          { validator: validateFenceDescribe, trigger:'blur'},
        ],
      },
      fileLoading: false,
    };
  },
  computed: {
    // mapComponent() {
    //   return this.$refs.mapComponent;
    // },
    searchForm() {
      return this.$refs.searchForm;
    },
  },
  methods: {
    init() {
      this.currentComponent = 'openLayersComponent';
      setTimeout(() => {
        this.$refs.mapComponent.clear();
        this.$refs.mapComponent.clearDraw();
      }, 200);
      this.shpName = ''
      this.fileLoading = false;
      this.formData = {
        gfName: null,
        gfDescribe: null,
        gfData: null,
      };
      this.$refs['searchForm'].resetFields();
      this.isAddFence = !this.isAddFence;
    },
    // 返回
    goBack() {
      this.$emit('goBack');
      this.$refs.mapComponent.clear();
      this.$refs.mapComponent.clearDraw();
      this.shpName = ''
      this.fileLoading = false;
      this.formData = {
        gfName: null,
        gfDescribe: null,
        gfData: null,
      };
      this.$refs.placeCascaderComponent.reset();
      this.currentComponent = null;
    },
    destroyComponent() {
      this.currentComponent = null;
    },
    getRowFeature(row) {
      return row[this.row2OlFlag];
    },
    /**
     * 更换查询范围类型
     * @param type：lonLat经纬度，area行政区，draw底图绘制，shpSHP上传
    */
    changeAreaType(type) {
      this.isShowAreaType = {};
      this.isShowAreaType[type] = true;
      if(type !== 'draw'){
        this.$refs.mapComponent.clearDraw();
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
      let areaFeature = this.$refs.mapComponent.getFeatureById(this.areaFeatureId);
      if (areaFeature) {
        this.$refs.mapComponent.removeFeature(areaFeature);
      }
      this.formData.gfData = wkt;
      if (wkt) {
        areaFeature = this.$refs.mapComponent.addWKTFeature(wkt);
        areaFeature.setId(this.areaFeatureId);
      }
    },
    /**
     * SHP上传
    */
    openFile() {
      this.$refs.mapComponent.clear();
      // this.$refs.mapComponent.clearDraw();
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
          this.fileLoading = false;
          this.formData.gfData = result;
          this.areaChange(result);
        })
        .catch(() => {
          this.fileLoading = false;
          this.shpName = '';
        });
        this.shpName = e.target.files[0].name;
        e.target.value = '';
        this.fileLoading = true;
      }
    },
    // 新增围栏
    addNewFence() {
      if (this.formData.gfName && this.formData.gfData && this.formData.gfDescribe && this.formData.gfDescribe.length <= 255) {
        const params = {};
        Object.entries(this.formData).forEach((keyValue) => {
          if (keyValue[1] !== null) {
            if (keyValue[1] instanceof Array) {
              params[keyValue[0]] = keyValue[1].join(',');
            } else {
              params[keyValue[0]] = keyValue[1];
            }
          }
        });        
        this.loading = true;
        addOrEditNewFence(params).then(() => {
          this.$message.success({ message: '新增围栏成功', showClose: true });
          this.goBack();
        });
      } else {
        this.$message.warning({ message: '请填写完整且正确的参数', showClose: true });
      }
    },
    /**
     * 绘制图形
     * @param type:Circle矩形，Polygon多边形
     */
    drawing(type) {
      this.$refs.mapComponent.drawing(type, (wkt) => {
        this.formData.gfData = wkt;
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
      this.formData.gfData = wkt;
    },
  }
};
</script>

<style lang="scss" scoped>
.red_start{
  color:#F56C6C;
  margin-left:20px;
}
.search-control{
  position: relative;
  height: calc(100vh - 110px);
  .open {
    position: absolute;
    top: 0px;
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
    top: 0px;
    left: 0px;
    width: 520px;
    background-color: #ffffff;
    height: calc(100vh - 110px);
    -moz-transition: left 1s; /* Firefox 4 */
    -webkit-transition: left 1s; /* Safari 和 Chrome */
    -o-transition: left 1s; /* Opera */
    .search{
      position: absolute;
      width: 520px;
      height: calc(100vh - 110px);
      z-index: 20;
      .search-buttons {
        text-align: center;
      }
      .change-button {
        margin-top: -20px !important;
        .el-button{
          width: 87px;
          height: 32px;
          padding: 0px;
          font-size: 14px;
        }
      }
      .form-item {
        margin: 20px 25px;
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
  .show-result {
    left: 0px;
  }
  .hide-open {
    left: -40px;
  }
}
.new-style-title {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ecebeb;
  padding-left: 25px;
  ul {
    li {
      a {
        display: inline-block;
        color: #606060;
      }
      float: left;
      font-size: 18px;
      font-weight: 700;
      line-height: 50px;
      cursor: pointer;
      i {
        font-weight: 700;
        color: #606060;
      }
    }
  }
}
</style>
