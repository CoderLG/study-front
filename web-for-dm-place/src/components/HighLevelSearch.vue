<template>
  <div>
    <div class="data-search-condition">
      <p>筛选</p>
      <el-form :inline="true" :model="form" ref='form' :rules="rules">
        <el-form-item label="数据类型" :label-width="formLabelWidth">
          <el-select v-model="form.dataType" clearable placeholder="请选择" @change='tabItem'>
            <el-option label="全部" value='all'></el-option>
            <el-option label="影像" value='image'></el-option>
            <el-option label="矢量" value='shp'></el-option>
            <el-option label="高程" value='dem'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采集时间" :label-width="formLabelWidth">
          <el-date-picker v-model='form.captureTime' unlink-panels type='daterange'
              range-separator='至' start-placeholder='开始' end-placeholder='结束'></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="坐标系统" :label-width="formLabelWidth">
          <el-select v-model="form.wkt" placeholder="请选择">
            <el-option label="WGS84" value="WGS84"></el-option>
          </el-select>
        </el-form-item> -->
        <br />
        <el-form-item label="左上角经度" :label-width="formLabelWidth" prop="ltlon">
          <el-input v-model.number="form.ltlon" placeholder='左上角经度' class='search-coordinate'>
          </el-input>
        </el-form-item>
        <el-form-item label="左上角纬度" :label-width="formLabelWidth" prop="ltlat">
          <el-input v-model.number="form.ltlat" placeholder='左上角纬度' class='search-coordinate'>
          </el-input>
        </el-form-item>
        <el-form-item label="右下角经度" :label-width="formLabelWidth" prop="rblon">
          <el-input v-model.number="form.rblon" placeholder='右下角经度' class='search-coordinate'>
          </el-input>
        </el-form-item>
        <el-form-item label="右下角纬度" :label-width="formLabelWidth" prop="rblat">
          <el-input v-model.number="form.rblat" placeholder='右下角纬度' class='search-coordinate'>
          </el-input>
        </el-form-item>
        <!--影像独有的发布条件-->
        <div v-show='imageItem'>
          <el-form-item label="产品等级" :label-width="formLabelWidth">
            <el-select v-model="form.image.productLevel" clearable placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item  label="负载类型" :label-width="formLabelWidth">
            <el-input v-model="form.image.loadsType" auto-complete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="卫星" :label-width="formLabelWidth">
            <el-select v-model="form.image.satellite" clearable placeholder="请选择">
              <el-option label="GF-1" value="GF-1"></el-option>
              <el-option label="GF-2" value="GF-2"></el-option>
              <el-option label="GF-3" value="GF-3"></el-option>
              <el-option label="GF-4" value="GF-4"></el-option>
              <el-option label="GF-5" value="GF-5"></el-option>
              <el-option label="ZY3" value="ZY3"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分辨率" :label-width="formLabelWidth">
            <el-select v-model="form.image.resolution" clearable placeholder="请选择">
              <el-option label="0.5" value="0.5"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="16" value="16"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="云量" :label-width="formLabelWidth">
            <el-slider v-model="form.image.cloud" range show-stops :max="100"
                       class='server-search-size'></el-slider>
          </el-form-item>
        </div>
        <!--矢量独有的发布条件-->
        <div v-show='vectorItem'>
          <!-- <el-form-item  label="比例尺" :label-width="formLabelWidth">
            <el-input v-model="form.vector.resolution" auto-complete="off"></el-input>
          </el-form-item> -->
          <!-- <el-form-item  label="专题类型" :label-width="formLabelWidth">
            <el-input v-model="form.vector.topicType" auto-complete="off"></el-input>
          </el-form-item> -->
          <!-- <el-form-item  label="编码方式" :label-width="formLabelWidth">
            <el-select v-model="form.vector.encoding" placeholder="请选择">
              <el-option label="UTF-8" value="utf8"></el-option>
              <el-option label="GBK" value="gbk"></el-option>
            </el-select>
          </el-form-item> -->
        </div>
        <!--高程独有的发布条件-->
        <div v-show='demItem'>
          <el-form-item label="格网大小" :label-width="formLabelWidth">
            <el-select v-model="form.dem.resolution" clearable placeholder="请选择">
              <el-option label="30" value="30"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <el-button type="success" round class="server-search-btn" @click='searthPublicationList'>
        检索
      </el-button>
    </div>
    <div class="data-search-show-list">
      <p>检索结果</p>
      <el-table :data="dataTable" :header-row-class-name="tableHeaderClass"
                :row-class-name="tableRowClassName" @cell-click="viewGraphics">
        <el-table-column prop="layerName" label="名称"></el-table-column>
        <el-table-column prop="wkt" label="坐标系统"></el-table-column>
        <el-table-column prop="captureTime" label="采集时间"></el-table-column>
        <el-table-column prop="centerPoint" label="中心点"></el-table-column>
        <!--影像参数-->
        <el-table-column prop="satellite" label="卫星"></el-table-column>
        <el-table-column prop="cloud" label="云量"></el-table-column>
        <el-table-column prop="loadsType" label="负载类型"></el-table-column>
        <el-table-column prop="productLevel" label="产品等级"></el-table-column>
        <el-table-column prop="resolution1" label="分辨率"></el-table-column>
        <!--矢量参数-->
        <el-table-column prop="resolution2" label="比例尺"></el-table-column>
        <el-table-column prop="topicType" label="专题类型"></el-table-column>
        <el-table-column prop="encoding" label="编码方式"></el-table-column>
        <!--高程参数-->
        <el-table-column prop="resolution3" label="格网大小"></el-table-column>
        <el-table-column prop="dataFormat" label="数据类型"></el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                  :page-size='pageNum' :total="totalPage"
                  :page-sizes="[10]"
                  class='publicationList-fenye' @current-change='tabPage'
                  :current-page.sync='initPage'></el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import URLSETTING from '../api/UrlSetting';

export default {
  data() {
    const lonValidator = (rule, value, callback) => {
      if (value < 0 || value > 180) {
        callback(new Error('请输入正确的范围'));
      } else {
        callback();
      }
    };
    const latValidator = (rule, value, callback) => {
      if (value < 0 || value > 90) {
        callback(new Error('请输入正确的范围'));
      } else {
        callback();
      }
    };
    return {
      dataTable: [{
        layerName: '',
        wkt: '',
        captureTime: '',
        centerPoint: [],
        dataFormat: '',
        satellite: '',
        cloud: '',
        loadsType: '',
        productLevel: '',
        resolution1: '',
        resolution2: '',
        resolution3: '',
        topicType: '',
        encoding: '',
      }],
      totalPage: 0,
      previewImage: URLSETTING.URLS.previewImage,
      initPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        dataType: '',
        ltlat: '',
        ltlon: '',
        rblon: '',
        rblat: '',
        captureTime: [],
        wkt: '',
        image: {
          resolution: '',
          productLevel: '',
          loadsType: '',
          satellite: '',
          cloud: ['0', '100'],
        },
        vector: {
          resolution: '',
          topicType: '',
          encoding: '',
        },
        dem: {
          resolution: '',
        },
      },
      formLabelWidth: '120px',
      imageItem: false,
      vectorItem: false,
      demItem: false,
      beginPage: 1,
      pageNum: 10,
      minCapture: '',
      maxCapture: '',
      rules: {
        ltlon: [
          {
            type: 'number',
            message: '请输入数字',
            trigger: ['change'],
            transform(value) {
              return Number(value);
            },
          }, { validator: lonValidator, message: '请输入正确的范围' },
        ],
        rblon: [
          {
            type: 'number',
            message: '请输入数字',
            trigger: ['change'],
            transform(value) {
              return Number(value);
            },
          }, { validator: lonValidator, message: '请输入正确的范围' },
        ],
        ltlat: [
          {
            type: 'number',
            message: '请输入数字',
            trigger: ['change'],
            transform(value) {
              return Number(value);
            },
          }, { validator: latValidator, message: '请输入正确的范围' },
        ],
        rblat: [
          {
            type: 'number',
            message: '请输入数字',
            trigger: ['change'],
            transform(value) {
              return Number(value);
            },
          }, { validator: latValidator, message: '请输入正确的范围' },
        ],
      },
    };
  },
  methods: {
    viewGraphics(row) {
      if (row.dataFormat === 'shp') {
        window.open(`${this.previewImage}/gwc/demo/shp:${row.layerName}?gridSet=EPSG:4326&format=image/png`);
      } else if (row.dataFormat === 'image') {
        window.open(`${this.previewImage}/gwc/demo/image:${row.layerName}?gridSet=EPSG:4326&format=image/png`);
      }
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'active-style';
      }
      return '';
    },
    tableHeaderClass({ rowIndex }) {
      if (rowIndex === 0) {
        return 'tableHeaderClass';
      }
      return '';
    },
    searthPublicationList() {
      this.initPage = 1;
      this.getPublicationList();
    },
    getPublicationList() {
      if (this.form.captureTime) {
        if (this.form.captureTime[0]) {
          this.minCapture = this.getTrueTime(this.form.captureTime[0]);
        } else {
          this.minCapture = '';
        }
        if (this.form.captureTime[1]) {
          this.maxCapture = this.getTrueTime(this.form.captureTime[1]);
        } else {
          this.maxCapture = '';
        }
      } else {
        this.minCapture = '';
        this.maxCapture = '';
      }
      axios.get(URLSETTING.URLS.publish, {
        params: {
          pageIndex: this.beginPage, // 开始的页数
          pageSize: this.pageNum, // 每页显示的条目数
          dataformat: this.form.dataType === 'all' ? '' : this.form.dataType, // 数据类型
          minCaptureTime: this.minCapture, // 开始时间
          maxCaptureTime: this.maxCapture, // 终止时间
          minCloud: this.form.image.cloud[0], // 最小云量
          maxCloud: this.form.image.cloud[1], // 最大云量
          minLon: this.form.ltlon, // 左上角经度
          maxLat: this.form.ltlat, // 左上角纬度
          maxLon: this.form.rblon, // 右下角经度
          minLat: this.form.rblat, // 右下角纬度
          productLevel: this.form.image.productLevel, // 产品等级
          resolution: this.form.dataType === 'image' ?
            this.form.image.resolution.slice(0, this.form.image.resolution.indexOf('m')) : this.form.dem.resolution, // 分辨率 格网大小
          satellite: this.form.image.satellite, // 卫星
        },
      })
        .then((response) => {
          const listArr = response.data.layers;
          this.totalPage = response.data.total;
          this.dataTable = [];
          listArr.forEach((val) => {
            if (val.dataformat === 'image') {
              this.dataTable.push({
                layerName: val.layerName,
                wkt: val.wkt,
                captureTime: val.captureTime,
                centerPoint: `${this.formatDegree(val.centerPoint[0])} ， ${this.formatDegree(val.centerPoint[1])}`,
                dataFormat: val.dataformat,
                satellite: val.satellite,
                cloud: val.cloud,
                loadsType: val.loadsType,
                productLevel: val.productLevel,
                resolution1: val.resolution,
                resolution2: '-',
                resolution3: '-',
                topicType: '-',
                encoding: '-',
              });
            } else if (val.dataformat === 'dem') {
              this.dataTable.push({
                layerName: val.layerName,
                wkt: val.wkt,
                captureTime: val.captureTime,
                centerPoint: `${this.formatDegree(val.centerPoint[0])} ， ${this.formatDegree(val.centerPoint[1])}`,
                dataFormat: val.dataformat,
                satellite: '-',
                cloud: '-',
                loadsType: '-',
                productLevel: '-',
                resolution1: '-',
                resolution2: '-',
                resolution3: val.resolution,
                topicType: '-',
                encoding: '-',
              });
            } else if (val.dataformat === 'shp') {
              this.dataTable.push({
                layerName: val.layerName,
                wkt: val.wkt,
                captureTime: val.captureTime,
                centerPoint: `${this.formatDegree(val.centerPoint[0])} ， ${this.formatDegree(val.centerPoint[1])}`,
                dataFormat: val.dataformat,
                satellite: '-',
                cloud: '-',
                loadsType: '-',
                productLevel: '-',
                resolution1: '-',
                resolution2: val.resolution,
                resolution3: '-',
                topicType: val.topicType,
                encoding: val.encoding,
              });
            }
          });
        })
        .catch(() => {
          this.$alert('获取数据失败', '', {
            confirmButtonText: '确定',
          });
        });
    },
    getTrueTime(dateObj) {
      const d = new Date(dateObj);
      const month = (d.getMonth() + 1) >= 10 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`;
      const date = d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`;
      const hours = d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`;
      const minutes = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`;
      const seconds = d.getSeconds() >= 10 ? d.getSeconds() : `0${d.getSeconds()}`;
      return `${d.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    },
    tabItem(val) {
      // 每次切换数据类型时，都需要将其他字段置空
      this.form = {
        dataType: val,
        captureTime: [],
        ltlat: '',
        ltlon: '',
        rblon: '',
        rblat: '',
        wkt: '',
        image: { resolution: '', productLevel: '', loadsType: '', satellite: '', cloud: ['0', '100'] },
        vector: { resolution: '', topicType: '', encoding: '' },
        dem: { resolution: '' },
      };
      switch (val) {
        case 'all':
          this.imageItem = false;
          this.vectorItem = false;
          this.demItem = false;
          break;
        case 'image':
          this.imageItem = true;
          this.vectorItem = false;
          this.demItem = false;
          break;
        case 'shp':
          this.imageItem = false;
          this.vectorItem = true;
          this.demItem = false;
          break;
        case 'dem' :
          this.imageItem = false;
          this.vectorItem = false;
          this.demItem = true;
          break;
        default:
          break;
      }
    },
    tabPage(currentPage) {
      this.beginPage = currentPage;
      this.getPublicationList();
      this.beginPage = 1;// 请求完之后将初始页归为1
    },
    // 经纬度转为度分秒
    formatDegree(value) {
      const va = Math.abs(value);
      const v1 = Math.floor(va);// 度
      const v2 = Math.floor((va - v1) * 60);// 分
      const v3 = Math.round(((va - v1) * 3600) % 60);// 秒
      return `${v1}°${v2}'${v3}"`;
    },
  },
};
</script>

<style scoped>
  .header {
    background: #333;
  }

  .left-nav {
    width: 200px;
    background: #ccc;
  }

  /*右侧主体部分*/
  .server-search-wrap {
    background: #ebeef5;
  }

  .server-search-btn {
    padding: 8px 50px;
    font-size: 15px;
    letter-spacing: 6px;
    float: right;
  }

  /*检索条件界面*/
  .data-search-condition {
    padding: 20px 30px 50px 30px;
    background: white;
    box-shadow: 0px 0px 10px #ccc;
    color: #807c7c;
  }

  .data-search-condition > p {
    font-size: 18px;
    font-weight: 700;
    color: #3769D7;
  }

  .server-search-sensor {
    margin: 15px 10px;
  }

  .server-search-area {
    margin: 0px 10px;
  }

  /*检索结果界面*/
  .data-search-show-list {
    margin-top: 55px;
    padding: 10px 30px;
    background: white;
    box-shadow: 0px 0px 10px #ccc;
  }

  .data-search-show-list > p {
    font-size: 18px;
    font-weight: 700;
    color: #3769D7;
  }

  .search-coordinate {
    width: 150px;
    height: 30px;
  }

  .server-search-size {
    width: 300px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
  }

  /*分页样式*/
  .publicationList-fenye {
    text-align: center;
    margin: 20px 0px;
  }
</style>
<style>
  /*对element组件设置class*/
  .el-table .active-style {
    background: #f4f5f7;
  }

  .tableHeaderClass > th {
    background: #4c89f5;
    color: white;
  }
  .search-coordinate {
    width: 217px !important;
  }
</style>
