<template>
  <div>
    <div class="edit-style-title">
      <ul>
        <li @click='goBack'>返回</li>
      </ul>
    </div>
    <div class="edit-style-main" ref='editStyleMain'>
      <span>预览图层</span>
      <el-select v-model="layerObjIndex" placeholder="请选择" @change='addLayer'>
        <el-option
          v-for="(item, index) in layersList"
          :key="item.id"
          :label="item.layerName"
          :value="index"
          :disabled='item.status !== "SUCCESS"'>
          <span style="float: left">{{ item.layerName }}</span>
          <span style="float: right; color: #C0C4CC; font-size: 12px">{{ publisStatusMap[item.status] }}</span>
        </el-option>
      </el-select><br />
      <span>样式预览</span>
      <div id="map" ref='styleMap' class="map"></div><br />
      <span>样式表文件</span>
      <i>{{ stylesInfo.path }}</i><br />
      <span>样式表描述</span>
      <pre class="edit-style-content" v-loading='styleConLoad'>
        <code contenteditable="true" class="XML" ref='textarea'>
          <!-- {{ styleCon }} -->
        </code>
      </pre><br />      
      <div class="edit-style-btn">
        <el-button size='small' type="primary" plain @click='verifyStyle' :disabled='isDisabled'>校验</el-button>
        <div>
          <el-button size='small' type="primary" @click='saveStyle' :disabled='isDisabled'>保存</el-button>
          <el-button size='small' plain @click='goBack'>取消</el-button>
        </div>
      </div>
      <div v-show='errorInfo' :class="{'edit-style-success-info': errorInfo === 'SUCCESS',
       'edit-style-error-info': errorInfo !== 'SUCCESS'}">{{ errorInfo }}</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import proj from 'ol/proj';
import { getStyleContent, updateStyleContent, verifyStyleContent } from '../api/vectorApi';
import { getLayersList, getLayersInfo } from '../api/imageApi';
import UrlSetting from '../api/UrlSetting';

export default {
  data() {
    return {
      layerObjIndex: null,
      layersList: [],
      errorInfo: '', // 样式表错误信息
      styleConLoad: false, // 样式表内容加载
      isDisabled: false, // 通用点线面禁用“保存”
      publisStatusMap: {
        'NEW': '准备发布',
        'PROCESSING': '正在发布',
        'SUCCESS': '发布成功',
        'FAILED': '发布失败'
      },
    };
  },
  props: ['monitorChange', 'stylesInfo'],
  watch: {
    async monitorChange() {
      this.layerObjIndex = null;
      this.$refs.styleMap.innerHTML = '';
      // 获取图层列表
      const layersList = await getLayersList(1, 1000, 'DESC', 'VECTORLAYER', false, '');
      // 过滤geojson的数据
      this.layersList = [];
      layersList.data.forEach(res => {
        if (res.mimeType.toUpperCase() === 'PNG') {
          this.layersList.push(res);
        }
      });
      this.previewLayer();
    },
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('goBack');      
    },
    async previewLayer() {
      this.styleConLoa = true;
      this.isDisabled = false;
      if (this.stylesInfo.name === 'point' || this.stylesInfo.name === 'line' || this.stylesInfo.name === 'polygon') {
        this.isDisabled = true;
      }
      // 获取对应样式的内容
      getStyleContent(this.stylesInfo.id).then((res) => {
        this.$refs.textarea.innerText = res;
        $('pre code').each((i, block) => {
          hljs.highlightBlock(block);
        });
        this.styleConLoa = false;
      });
    },
    // 加载图层
    async addLayer() {
      this.$refs.styleMap.innerHTML = '';
      if (this.layersList[this.layerObjIndex] && this.stylesInfo) {
        // 获取矢量数据 渲染矢量图层
        this.getVectorMessage(this.layersList[this.layerObjIndex].id);
      }
    },
    //获取矢量数据
    async getVectorMessage(id) {
      // 获取勾选的矢量图层详情
      const result = await getLayersInfo(id);
      const getTimestamp = new Date().getTime();
      const layer = result.workspace ? `${result.workspace}:${result.layerName}` : result.layerName;
      // 加载图层
      const layers = [
        new TileLayer({
          source: new TileWMS({
            url: `${UrlSetting.URLS.previewVector}/${result.workspace}/${result.layerName}/wms?timestamp=${getTimestamp}`,
            params: { LAYERS: `${layer}`, singleTile: true, STYLES: this.stylesInfo.name },
          }),
        }),
      ];
      const earthView = new View({
        center: [0, 0],
        zoom: 2,
        projection: proj.get('EPSG:4326'),
      });
      const map = new Map({
        layers,
        target: 'map',
        view: earthView,
      });
      let extentVal = null;
      extentVal = [parseFloat(result.minX), parseFloat(result.minY), parseFloat(result.maxX), parseFloat(result.maxY)];
      if (result.gridSet === 'EPSG:3857') {
        const a = proj.transform([result.minX, result.minY], 'EPSG:3857' ,'EPSG:4326');
        const b = proj.transform([result.maxX, result.maxY], 'EPSG:3857' ,'EPSG:4326');
        extentVal = a.concat(b);
      }
      map.getView().fit(extentVal);
    },
    // 校验
    verifyStyle() {
      verifyStyleContent(this.$refs.textarea.innerText).then(() => {
        this.$message.success('样式校验成功');
        this.errorInfo = 'SUCCESS';
        setTimeout(() => {
          this.$refs.editStyleMain.scrollTop = this.$refs.editStyleMain.scrollHeight;
        }, 500);
      }).catch(res => {
        this.errorInfo = res;
        setTimeout(() => {
          this.$refs.editStyleMain.scrollTop = this.$refs.editStyleMain.scrollHeight;
        }, 500);
      });
    },
    // 保存 更新样式 首先校验格式
    saveStyle(){
      verifyStyleContent(this.$refs.textarea.innerText).then(() => {
        this.errorInfo = 'SUCCESS';
        updateStyleContent(this.stylesInfo.name, this.$refs.textarea.innerText).then(() => {
          this.$message.success('样式更新成功');
          this.addLayer();
        });
        setTimeout(() => {
          this.$refs.editStyleMain.scrollTop = this.$refs.editStyleMain.scrollHeight;
        }, 500);
      }).catch(res => {
        this.$message.error('样式校验失败,无法保存');
        this.errorInfo = res;
        setTimeout(() => {
          this.$refs.editStyleMain.scrollTop = this.$refs.editStyleMain.scrollHeight;
        }, 500);
      });
    },
  },
};
</script>

<style lang="scss">
.edit-style-title {
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
.edit-style-main {
  height: calc(100vh - 111px);
  overflow-y: auto;
  line-height: 40px;
  .el-select {
    width: 300px !important;
    margin-top: 15px;
    .el-input--suffix .el-input__inner {
      border-color: #bdbfc4;
    }
  }
  .map {
    width: calc(100vw - 500px);
    height: 341px;
    border: 1px solid #bdbfc4;
    display: inline-block;
    vertical-align: text-top;
    border-radius: 5px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .edit-style-content {
    width: calc(100vw - 500px);
    height: 325px;
    line-height: 22px;
    color: wheat;
    display: inline-block;
    vertical-align: text-top;
    background: #282c34;
    margin: 0px;
    border-radius: 5px;
    font-size: 15px;
    > code {
      height: 303px;
      border-radius: 5px;
    }
  }
  >span {
    width: 115px;
    display: inline-block;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
  }
  >i {
    font-weight: 700;
    font-size: 16px;
  }
  .edit-style-error-info {
    width: calc(100vw - 500px);
    margin: 5px 120px 15px 120px;
    border: 1px solid #FBC4C4;
    background: #FEF0F0;
    color: #F66C6C;
    border-radius: 5px;
    line-height: 35px;
    padding: 10px;
  }
  .edit-style-success-info {
    @extend .edit-style-error-info;
    border: 1px solid #91C76D;
    background: #F2F9EC;
    color: #91C76D;
  }
  .edit-style-btn {
    line-height: 50px;
    position: relative;
    > button {
      margin-left: 120px;
      margin-top: 12px;
      position: absolute;
      margin-left: 120px;
    }
    > div {
      text-align: center;
      button {
        margin-top: 12px;
      }
    }
  }
}
</style>