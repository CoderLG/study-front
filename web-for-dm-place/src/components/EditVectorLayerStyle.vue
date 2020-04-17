<template>
  <div>
    <div class="edit-vector-style-title">
      <ul>
        <li @click='goBack'>返回</li>
      </ul>
    </div>
    <div class="edit-vector-style-main">
      <span>样式选择</span>
      <el-select v-model="styleName" placeholder="请选择" @change='addLayer'>
        <el-option
          v-for="item in styleList"
          style='width: 300px'
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select><br />
      <span>预览图层</span>
      <div id="vectorEditMap" ref='vectorMap' class="map"></div><br />    
      <div class="edit-style-btn">
        <div>
          <el-button size='small' type="primary" @click='saveStyle'>保存</el-button>
          <el-button size='small' plain @click='goBack'>取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import TileWMS from 'ol/source/tilewms';
import proj from 'ol/proj';
import { updateVectorLayerStyle, getVectorStyleList } from '../api/vectorApi';
import { getLayersInfo } from '../api/imageApi';
import UrlSetting from '../api/UrlSetting';
// import { getToken } from '../utils/auth';

export default {
  data() {
    return {
      styleName: '',
      styleList: [],
    };
  },
  props: ['layerChange', 'layersInfo'],
  watch: {
    async layerChange() {
      this.styleName = this.layersInfo.styleName;
      // 获取样式列表
      const styleList = await getVectorStyleList('', 1, 1000); // 默认最多请求1000个样式
      this.styleList = styleList.data;
      this.addLayer();
    },
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('goBack');
      this.styleName = '';
      this.$refs.vectorMap.innerHTML = '';
    },
    // 加载图层
    async addLayer() {
      this.$refs.vectorMap.innerHTML = '';
      if (this.styleName && this.layersInfo) {
        // 获取矢量数据 渲染矢量图层
        this.getVectorMessage(this.layersInfo.id);
      }
    },
    //获取矢量数据
    async getVectorMessage(id) {
      // 获取勾选的矢量图层详情
      const result = await getLayersInfo(id);
      const layer = result.workspace ? `${result.workspace}:${result.layerName}` : result.layerName;
      const getTimestamp = new Date().getTime();
      // 加载图层
      const layers = [
        new TileLayer({
          source: new TileWMS({
            url: `${UrlSetting.URLS.previewVector}/${result.workspace}/${result.layerName}/wms?timestamp=${getTimestamp}`,
            params: { LAYERS: `${layer}`, singleTile: true, STYLES: this.styleName },
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
        target: 'vectorEditMap',
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
    // 保存 更新样式
    saveStyle() {
      this.$confirm('更新样式会清空该服务及所在图层组已生成的所有瓦片，确定更新?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // const token = await getToken();
        // 设置样式
        const dataObj = { 'layerName': this.layersInfo.layerName, 'styleName': this.styleName };
        // formData.append("token", token);
        updateVectorLayerStyle(dataObj).then(() => {
          this.$message.success({ message: '图层样式更新成功', showClose: true });
        });
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.edit-vector-style-title{
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
.edit-vector-style-main {
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
  .map{
    width: calc(100vw - 500px);
    height: calc(100vh - 255px);
    border: 1px solid #bdbfc4;
    display: inline-block;
    vertical-align: text-top;
    border-radius: 5px;
    margin-top: 8px;
    margin-bottom: 8px;
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