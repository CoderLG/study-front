<template>
  <div class="real-time-data-preview">
    <div id='map'></div>
    <!-- <h1 style='position: absolute;top:65px;right: 0;z-index: 10;color: red;font-size: 95px;'>{{ Math.round(level) }}</h1> -->
    <target-detail ref="targetDetail"></target-detail>
    <!--展示形式切换-->
    <div>
      <ul class='real-time-data-preview-tab'>
        <li v-for='(li, index) in previewType' :key="index" ref='typeItem' @click='tabPreviewType(li, index)'>
          <img :src="li.img" alt="">
          {{ li.name }}
        </li>
      </ul>
      <ul class='real-time-data-preview-select'>
        <li>
          <el-switch v-model="fence" active-text="围栏"></el-switch>
        </li>
        <li>
          <el-switch v-model="warn" active-text="报警"></el-switch>
        </li>
      </ul>
      <div class='real-time-data-preview-search'>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          placeholder="搜索"
          clearable
          size='medium'
          @select="handleSelect"
        ></el-autocomplete>
        <!-- <el-button type="primary" icon="el-icon-search" @click="getTargetList()" size='small'></el-button> -->
      </div>
    </div>
    <!--时钟-->
    <div class="real-time-data-preview-date">
      {{ lasterDate }}
    </div>
    <!--设置底图-->
    <base-map class="base-layer" ref="baseLayerRealtime" @changeMap="changeMap"></base-map>
  </div>
</template>

<script>
/* global ol */
import OpenLayers1 from './OpenLayers1';
import OpenLayers2 from './OpenLayers2';
import OpenLayers3 from './OpenLayers3';
import OpenLayers4 from './OpenLayers4';
import TargetDetail from './TargetDetail';
import FenceFunction from './FenceFunction';
import BaseMap from './BaseMap';
import UrlSetting from '../api/UrlSetting';
import { getTargetList, getTaskInfo } from '../api/realTimeTaskApi';

// const previewImage = UrlSetting.URLS.previewImage;
const previewTile = UrlSetting.URLS.previewTile;

export default {
  data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null,
      previewType: [
        { img: '../static/images/tile.png', name: '瓦片聚合', type: 'gather'},
        { img: '../static/images/tile.png', name: '蜂窝聚合', type: 'hexagon'},
        { img: '../static/images/heatmap.png', name: '热力图', type: 'heatmap'},
        { img: '../static/images/target.png', name: '目标', type: 'target'},
      ],
      fence: false,
      warn: false,
      level: 10,
      lasterDate: '',
      currentType: 'gather',// 当前预览的类型
      stId: null,// 路由获取来的任务ID
      sourceId: null,// 数据源ID
      openLayers1: null,
      openLayers2: null,
      openLayers3: null,
      openLayers4: null,
      activities: [
        {
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        },
        {
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        },
        {
          timestamp: '2018-04-03 20:46',
          size: 'large'
        },
        {
          timestamp: '2018-04-03 20:46'
        }
      ],
      fenceFunction: null,
      baseMapLayer: new ol.layer.Tile(),
    }
  },
  components: {
    TargetDetail,
    BaseMap,
  },
  watch: {
    fence(isTrue) {
      if (isTrue) {
        if (this.currentType === 'hexagon') {
          this.fenceFunction.initHexagon(this.stId);
        } else {
          this.fenceFunction.init(this.stId);
        }        
      } else {
        this.fenceFunction.clearFence();
        this.warn = false;
      }
    },
    warn(isTrue) {
      if (isTrue) {
        this.fenceFunction.startFenceWarn(this.stId);
      } else {
        this.fenceFunction.closeFenceWarn();
      }
    },
  },
  async mounted() {
    const id = this.$route.params.id.slice(this.$route.params.id.indexOf(':') + 1);
    this.stId = id;
    // 根据任务ID 获取此条任务的详情参数
    const taskInfo = await getTaskInfo(this.stId);
    this.sourceId = taskInfo.data.sourceId;
    // ========================================================
    // const projection = ol.proj.get('EPSG:3857');// 经纬度空间参考坐标系
    // const projectionExtent = projection.getExtent();
    // const size = ol.extent.getWidth(projectionExtent) / 256;
    // let resolutions = [];
    // let matrixIds = [];
    // const forMax = 21;
    // const forMin = 1;
    // const is3857 = true;
    // for (let z = forMin; z <= forMax; z += 1) {
    //   resolutions.push(size / Math.pow(2, is3857 ? z : (z + 1)));
    //   matrixIds.push(`EPSG:3857:${z}`);
    // }
    
    // const raster = new ol.layer.Tile({
    //   source: new ol.source.WMTS({
    //     url: 'http://192.168.48.15:8310/geoserverplus/gwc/service/wmts',
    //     layer: 'ChinaBlackV1-PNG-3857',
    //     format: 'image/png',
    //     matrixSet: 'EPSG:3857',
    //     projection,
    //     wrapX: true,
    //     tileGrid: new ol.tilegrid.WMTS({
    //       origin: ol.extent.getTopLeft(projectionExtent),
    //       tileSize: [256, 256],
    //       extent: [-20037508.342789, -25227636.636413, 20032453.171912, 25225622.489893],
    //       resolutions,
    //       matrixIds,
    //     }),
    //   })
    // });
    // ========================================================
    // 创建地图对象
    window.map = new ol.Map({
      layers: [this.baseMapLayer],
      target: 'map',
      view: new ol.View({
        center: [taskInfo.data.initLon, taskInfo.data.initLat],
        zoom: taskInfo.data.layerMinLevel,
        projection: 'EPSG:4326'
      })
    });

    const setMap = () => {
      if (this.$refs.baseLayerRealtime.currentMap) {
        this.changeMap(this.$refs.baseLayerRealtime.currentMap);
      } else {
        requestAnimationFrame(setMap);
      }
    };
    setMap();

    // 实例化围栏对象
    this.fenceFunction = new FenceFunction(window.map);
    // 初始化需要渲染的图层
    setTimeout(() => {
      this.openLayers1 = new OpenLayers1();
      this.openLayers2 = new OpenLayers2();
      this.openLayers3 = new OpenLayers3();
      this.openLayers4 = new OpenLayers4();
      // 默认加载瓦片聚合
      this.openLayers1.initGather(this.stId);
      // 监听鼠标移动事件
      window.map.on("moveend", () => {
        var zoom = window.map.getView().getZoom();
        this.level = zoom;
        const visibleArea = this.getVisibleArea();
        const minlon = visibleArea[0];
        const maxlon = visibleArea[1];
        const minLat = visibleArea[2];
        const maxLat = visibleArea[3];
        // 刷新                    
        switch (this.currentType) {
          case 'gather':
            this.openLayers1.refreshData(this.sourceId, minlon, maxlon, minLat, maxLat, this.level);
          break;
          case 'heatmap':
            this.openLayers2.refreshData(this.sourceId, minlon, maxlon, minLat, maxLat);
          break;
          case 'target':
            this.openLayers3.refreshData(this.sourceId, minlon, maxlon, minLat, maxLat, this.level)
          break;
          case 'hexagon':
            this.openLayers4.refreshData(this.sourceId, minlon, maxlon, minLat, maxLat, this.level)
          break;
        }
      });
    }, 1000);
    // 时钟
    setInterval(() => {
      this.lasterDate = this.getNowDate();
    }, 2000);
  },
  methods: {
    // 图层切换
    changeMap(baseMapInfo) {
      const source = this.buildLayers(baseMapInfo);
      this.baseMapLayer.setSource(null);
      this.baseMapLayer.setSource(source);
      // this.baseMapLayer.setExtent([-180, -90, 180, 90]);
    },
    // 构造图层数据
    buildLayers(data) {
      const projection = ol.proj.get(data.gridSet);// 经纬度空间参考坐标系
      const projectionExtent = projection.getExtent();
      const size = ol.extent.getWidth(projectionExtent) / 256;
      let resolutions = [];
      let matrixIds = [];
      let url, index, layer, matrixSet;
      const forMax = data.maxLevel ? data.maxLevel : 21;
      const forMin = data.minLevel ? data.minLevel : 1;
      const is3857 = data.gridSet.indexOf(3857) > -1 || (data.tileType && data.tileType.indexOf('geojson') > -1);
      for (let z = forMin; z <= forMax; z += 1) {
        resolutions.push(size / Math.pow(2, is3857 ? z : (z + 1)));
        matrixIds.push(`${data.gridSet}:${z}`);
      }
      switch (data.tileType) {
        case "local":
          return new ol.source.XYZ({
            projection,
            tileGrid: new ol.tilegrid.createXYZ({extent: projectionExtent}),
            tileUrlFunction(tileCoord) {
              return data.url + (tileCoord[0] - 1) + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) + '.jpg';
            }
          });
        case "NET-U":
          return new ol.source.XYZ({
            url: data.wmtsurl,
          });
        case "NET":
          resolutions = [];
          matrixIds = [];
          for(let z = 0; z <= 21; z += 1){
            resolutions.push(size / Math.pow(2, z));
            matrixIds.push(z);
          }
          url = data.wmtsurl;
          index = url.indexOf('_');
          layer = url.slice(index - 3, index);
          matrixSet = url.slice(index + 1, index + 2);
          return new ol.source.WMTS({
            url,
            layer,
            matrixSet,
            format: 'tiles',
            wrapX: true,
            projection,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(projectionExtent),
              resolutions,
              matrixIds,
            })
          });
        default: {
          // let previewUrl;
          // if (true) {
          let  previewUrl = previewTile + '/service/wmts';
          // } else {
            // previewUrl = previewImage + '/gwc/service/wmts';
          // }
          return new ol.source.WMTS({
            url: previewUrl,
            layer: data.workspace ? `${data.workspace}:${data.layerName}` : data.layerName,
            format: `image/${data.mimeType.toLowerCase()}`,
            matrixSet: data.gridSet,
            projection,
            wrapX: true,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(projectionExtent),
              tileSize: [256, 256],
              extent: [data.minX, data.minY, data.maxX, data.maxY],
              resolutions,
              matrixIds,
            }),
          });
        }
      }
    },
    // 切换预览方式  
    tabPreviewType(row, index) {
      // 关闭围栏和告警
      this.fence = false;
      this.warn = false;
      // 调整样式
      this.$refs.typeItem.forEach((li, num) => {
        const imgsrc = li.children[0].src;
        /* eslint-disable */
        if (imgsrc.slice(imgsrc.lastIndexOf('/') + 1, imgsrc.length).slice(0, 1) === 'b') {
          li.children[0].src = `${imgsrc.slice(0, imgsrc.lastIndexOf('/') + 1)}${imgsrc.slice(imgsrc.lastIndexOf('/') + 2, imgsrc.length)}`;
        }        
        li.style.background = '#ffffff';
        li.style.color = '#515a6e';
        if (num === index) {
          li.style.background = '#3385FF';
          li.style.color = '#ffffff';    
          li.children[0].src = `${imgsrc.slice(0, imgsrc.lastIndexOf('/') + 1)}b${imgsrc.slice(imgsrc.lastIndexOf('/') + 1, imgsrc.length)}`;
        }
        /* eslint-disable */
      });
      // 销毁上一个图层
      this.openLayers1.clearLayer();
      this.openLayers2.clearLayer();
      this.openLayers3.clearLayer();
      this.openLayers4.clearLayer();
      this.$refs.targetDetail.clearLayer();
      // 初始化新的图层
      this.currentType = row.type;
      switch (this.currentType) {
        case 'gather':
          this.openLayers1.initGather(this.stId);
        break;
        case 'heatmap':
          this.openLayers2.initHeatMap(this.stId);
        break;
        case 'target':
          this.openLayers3.initTarget(this.stId);
        break;
        case 'hexagon':
          this.openLayers4.initHexagon(this.stId);
        break;
        case 'search':
          console.log('初始化搜索')
        break;
      }
    },
    // 实时获取当前可视区域
    getVisibleArea() {
      const pixelRange = window.map.getSize();
      let leftTop = window.map.getCoordinateFromPixel([0, 0]);
      let rightBottom = window.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
      // 判断当前的投影 为3857时转换坐标
      if (window.map.getView().getProjection().wb === 'EPSG:3857') {
        leftTop = ol.proj.transform(leftTop, 'EPSG:3857' ,'EPSG:4326');
        rightBottom = ol.proj.transform(rightBottom, 'EPSG:3857' ,'EPSG:4326');
      }
      const minlon = leftTop[0] < -180 ? -180 : leftTop[0];
      const maxlon = rightBottom[0] > 180 ? 180 : rightBottom[0];
      const minLat = rightBottom[1] < -90 ? -90 : rightBottom[1];
      const maxLat = leftTop[1] > 90 ? 90 : leftTop[1];
      let arr = [minlon, maxlon, minLat, maxLat];
      return arr;
    },
    // 车牌异步请求
    querySearchAsync(queryString, cb) {
      getTargetList(this.sourceId, queryString).then(res =>{
        for(var i = 0;i<res.length; i++){
          this.restaurants[i] = {};
          this.restaurants[i].value = res[i].targetName;
          this.restaurants[i].address = res[i].targetId;
          this.restaurants[i].lon = res[i].lon;
          this.restaurants[i].lat = res[i].lat;
          this.restaurants[i].sourceId = res[i].sourceId;
          this.restaurants[i].targetTime = res[i].targetTime;
          this.restaurants[i].targetType = res[i].targetType;
        }
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    // 点击车牌进行搜索
    handleSelect(item) {
      console.log(item)
      this.tabPreviewType({ type: 'search' }, null);
      this.$refs.targetDetail.init(item.lon, item.lat, item.address, item.value, item.sourceId, item.targetTime, this.stId, item.targetType);
    },
    // 获取当前时间
    getNowDate() {
      const date = new Date();
      const seperator1 = "-";
      const seperator2 = ":";
      const month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      const strDate = date.getDate() <10 ? "0" + date.getDate():date.getDate();
      const hours = date.getHours() <10 ? "0" + date.getHours():date.getHours();
      const minutes = date.getMinutes() <10 ? "0" + date.getMinutes():date.getMinutes();
      const seconds = date.getSeconds() <10 ? "0" + date.getSeconds():date.getSeconds();
      const currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + hours  + seperator2  + minutes
          + seperator2 + seconds;
      return currentdate;
    }
  },
};
</script>

<style lang='scss' scoped>
#map {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.real-time-data-preview {
  .real-time-data-preview-tab {
    position: absolute;
    height: 35px;
    line-height: 35px;
    background: rgba(255,255,255,1);
    border-radius: 2px;
    top: 12px;
    left: 60px;
    box-shadow:0px 0px 4px 0px rgba(1,1,1,0.15);
    li {
      float: left;
      padding: 0px 20px;
      cursor: pointer;
      border-right: 1px solid #FFEEEEEE;
      font-size: 13px;
      img {
        padding-right: 5px;
        vertical-align: text-bottom;
      }
    }
    li:first-child {
      background: #3385FF;
      color: #ffffff;
    }
  }
  .real-time-data-preview-select {
    @extend .real-time-data-preview-tab;
    left: 500px;
    li:first-child {
      background: none;
      color: #ffffff;
    }
    .el-switch {
      vertical-align: unset;
      display: inline-block;      
    }    
  }
  .real-time-data-preview-search {
    position: absolute;
    right: 55px;
    top: 12px;
  }
  .real-time-data-preview-date {
    position: absolute;
    right: 270px;
    top: 12px;
    font-size:20px;
    font-family:RTWSYueRoudGoDemo-Regular;
    font-weight:bold;
    color: #3385FF;
    padding: 3px 0px;
  }
  .base-layer {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 35px;
    line-height: 35px;
    text-align: center;
    height: 35px;
    background: #f1f1f1;
    z-index: 40;
    border-radius: 4px
  }
}
</style>
