<template>
  <div id="earthContainer">
    <!--地理画布模块-->
    <div class="earth-container-slot">
      <slot></slot><!--用户的基本的HTML均显示在此插槽标签内-->
    </div>
    <!--设置底图-->
    <base-map class="base-layer" ref="baseLayer" @changeMap="changeMap"></base-map>
    <div class="SearchBox">
      <SearchBox @searchDem="searchDem"></SearchBox>
    </div>
    <div class="switch-class" v-show='isAddPlaceName'>
       <el-switch v-if="this.flag === true" v-model="value1" active-color="#00a0e9" inactive-color="#ff4949" @change="demClickEvent" title="关闭地名服务"></el-switch>
       <el-switch v-else v-model="value1" active-color="#00a0e9" inactive-color="#ff4949" @change="demClickEvent" title="打开地名服务"></el-switch>
    </div>
    <!--默认提供的界面-->
    <ul class="GCPlugin-controller">
      <li>
        <!--复位-->
        <div v-show='isResetPlugin' class="GCPlugin-reset" @click='flyToHome(3)'>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAA
          BkUlEQVRIS7WV3V
          UCQQyFbyoQO6ADoQIyFagVgB1sB2IFQgdagVjBhgrEDuxAOojn4gxnd9g/PDgv87Az39wkN1nBPy0Zy
          lVV5VkzsyF3zgEvI/iw961OsKreAZiLCPfjcvcNgHWX+kawqo4AvInI1N2pkOEnOKEqIkt3LwE8mNk+
          j+AEHKG88AmgSJdUtZYKnhORjbtfAQg5vAlMRSxSLfwcnBSGEMzdd2ZWVFXXwKx8VDHOFbSBVXUsIjt
          3n5jZV4Ln4BcA+/z1Pgeo6sm9GjiEwJeZ10FeTQ9Gjz+b2bSmOH6YxUrz9RQS1a+bFKsqc8rCcTEdi+
          igLYUdFEcw8/vo7q8ZeNUBpi0TeO7uT7E5f8GVCv85FSKyKsty0lY8qhuZ2aKvYNXvvcVrs05MV+Os4
          B0AHwCmrXaLAKq+MbOQqWoERyexXu0NEsFsVXbTN4D7rpaO8+Ta3bW3pRMcAG03A8AI3rMhdMs5AmAL
          YDFoCGXhc7gXIkLQcbk7H1qdPTZbfHu5Qd+g/vK/pnN8zbM/QU73F2amu5cAAAAASUVORK5CYII=">
        </div>
      </li>
      <li>
        <!--2/3D切换-->
        <div v-show='is2D3DPlugin' class="GCPlugin-tab2D3D" @click='tab2D3D'>{{ is2D3D }}</div>
      </li>
      <li>
        <!--缩放控件-->
        <div v-show='isScalePlugin' class="GCPlugin-scale">
          <div @click='earthZoomIn'>+</div>
          <div @click='earthZoomOut'>-</div>
        </div>
      </li>
    </ul>
    <!--时间轴组件-->
    <TimeLine v-show='isAddTimeImage' @startPlay='startTick' :currentDate='currentDate'
     @stopPlay='stopTick' @refreshPlay='renewTick'></TimeLine>
    <!--鼠标位置-->
    <div class="mouse-position">
      <div>
        <span>经度:</span>
        <span>{{position.log}}°</span>
      </div>
      <div>
        <span>纬度:</span>
        <span>{{position.lat}}°</span>
      </div>
      <div>
        <span>视角高:</span>
        <span>{{position.alti}}KM</span>
      </div>
    </div>
    <!--街景-->
    <div id="streetscape"></div>
  </div>
</template>

<script>
/* eslint-disable one-var,no-param-reassign,no-mixed-operators,no-unused-vars,no-case-declarations */
import $ from 'jquery';
import { Message } from 'element-ui';
import UrlSetting from '../api/UrlSetting';
import BaseMap from './BaseMap';
import SearchBox from './SearchBoxComponent';
import TimeLine from './TimeLine';
import StreetView from "../../static/streetView/streetView"; 
import "../../static/streetView/streetView.css";  
import { getTimeImageInfo } from '../api/imageApi';

const previewImage = UrlSetting.URLS.previewImage;
const placeNameUrl = UrlSetting.URLS.placeName;
const previewTimeImage = UrlSetting.URLS.previewTimeImage;
const previewTile = UrlSetting.URLS.previewTile;

let Cesium = null;
let _this = null;
export default {
  name: 'GlobeControl',
  components: {
    BaseMap,
    SearchBox,
    TimeLine,
  },
  beforeCreate() {
    const script1 = document.createElement('script');
    script1.src = './static/dist/GVML.min.js';
    const link1 = document.createElement('link');
    link1.href = './static/dist/Widgets/widgets.css';
    link1.rel = 'stylesheet';
    const link2 = document.createElement('link');
    link2.href = './static/css/customStyle.css';
    link2.rel = 'stylesheet';
    document.head.appendChild(script1);
    document.head.appendChild(link1);
    document.head.appendChild(link2);
  },
  created() {
    const checkCesiumAMap = () => {
      Cesium = window.Cesium;
      if (Cesium && this.baseLayer.currentMap !== null) {
        this.init(this.baseLayer.currentMap);
      } else {
        window.requestAnimationFrame(checkCesiumAMap);
      }
    };
    window.requestAnimationFrame(checkCesiumAMap);
  },
  mounted() {
    _this = this;
  },
  data() {
    return {
      //earth: '', // earth对象
      plugin: {
        measure: {obj: '', isMeasure: true},
        specialEffect: {obj: '', isSpecialEffect: true}
      }, // 插件集合对象
      is2D3D: '2D', // 标识2/3D切换
      position: {
        log: 0,
        lat: 0,
        alti: 0,
      },
      value1: false,
      value2: true,
      flag: false,
      placeSource: '',
      placeNameLocation: '',
      timeline: '',
      metalUrl: '',
      metalInfo: {},
      isPlay: false, // 是否自动播放
      timeTickEvt: '', // 时序影像定时器
      timeLayerUrl: '', // 时序影像URL
      tLayer: '',
      timelineInfo: {}, // 历史影像信息
      currentDate: '', // 历史影像的当前时间
      districtOutLine: [],//查询的区域的轮廓
    };
  },
  props: {
    isResetPlugin: {default: false}, // 默认不显示复位按钮
    is2D3DPlugin: {default: false}, // 默认不显示2/3D切换
    isScalePlugin: {default: false}, // 默认不显示缩放控制
    isAddTerrain: {default: false}, // 默认不显示地形
    isAddTiltphoto: {default: false}, // 默认不显示倾斜摄影
    isAddPlaceName: {default: false}, // 默认不显示地名开关
    isAddTimeImage: {default: false}, // 默认不添加时序影像
    isAddStreetView: {default: false}, // 默认不添加街景
  },
  computed: {
    baseLayer() {
      debugger
      return this.$refs.baseLayer;
    },
  },
  methods: {
    /**
     * 初始化方法
     */
    buildBaseMap(baseMapInfo) {
      let baseMap, wmtsUrl;
      switch (baseMapInfo.tileType) {
        case 'NET':
          wmtsUrl = baseMapInfo.wmtsurl;
          const index = wmtsUrl.indexOf('_');
          const tileMatrixLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
          baseMap = {
            url: wmtsUrl,
            layers: wmtsUrl.slice(index - 3, index),
            tileMatrixSetID: wmtsUrl.slice(index + 1, index + 2)
          };
          return new Cesium.WebMapTileServiceImageryProvider({
            url: baseMap.url,
            layer: baseMap.layers,
            format: 'tiles',
            tileMatrixSetID: baseMap.tileMatrixSetID,
            style: 'default',
            tilingScheme: baseMap.tileMatrixSetID === 'c' ? new Cesium.GeographicTilingScheme() : null,
            tileMatrixLabels: baseMap.tileMatrixSetID === 'c' ? tileMatrixLabels : null,
          });
        case 'NET-U':
          return new Cesium.UrlTemplateImageryProvider({
            url: baseMapInfo.wmtsurl,
          });
        case 'local':
          return new Cesium.createTileMapServiceImageryProvider({
            url: baseMapInfo.url,
          });
        case 'DEM':
          return new Cesium.CesiumTerrainProvider({
            url: baseMapInfo.url,
            requestVertexNormals: true
          });
        default:
          baseMap = {
            url: previewTile + '/service/wmts',
            layers: (baseMapInfo.workspace ? (baseMapInfo.workspace + ":") : "") + baseMapInfo.layerName,
            format: `image/${baseMapInfo.mimeType.toLowerCase()}`,
            srs: baseMapInfo.gridSet,
          };
          const matrixIds = new Array();
          for (let z = baseMapInfo.minLevel; z <= baseMapInfo.maxLevel; z += 1) {
            matrixIds[z] = `${baseMapInfo.gridSet}:${z}`;
          }
          return new Cesium.WebMapTileServiceImageryProvider({
            url: baseMap.url,
            layer: baseMap.layers,
            format: baseMap.format,
            tileMatrixSetID: baseMap.srs,
            tileMatrixLabels: matrixIds,
            tilingScheme: baseMapInfo.gridSet === 'EPSG:4326' ? new Cesium.GeographicTilingScheme() : new Cesium.WebMercatorTilingScheme(),
            style: 'default',
          });
      }
    },
    init(baseMapInfo) {
      this.earth = new Cesium.Viewer('earthContainer', {
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        animation: false,
        timeline: false,
      });
      this.changeMap(baseMapInfo);
      this.flyToHome();
      this.getMousePosition();
      const imgHTM = "<img src='../static/images/grid.png'>";
      $('.cesium-cesiumInspector-hide > div:nth-last-of-type(3)').attr('title', '三角网');
      $('.cesium-cesiumInspector-hide > div:nth-last-of-type(3)').append(imgHTM);        
    },
    changeMap(baseMapInfo) {
      const imageryProvider = this.buildBaseMap(baseMapInfo);
      _this.earth.imageryLayers.removeAll();
      _this.earth.imageryLayers.addImageryProvider(imageryProvider);
      // 天地图矢量增加注记
      if ([100000, 100001].includes(baseMapInfo.id)) {
        const labelLayer = {
          "wmtsurl": baseMapInfo.tmsurl,
          "tileType": 'NET'
        };
        const imageryLabelProvider = this.buildBaseMap(labelLayer);
        _this.earth.imageryLayers.addImageryProvider(imageryLabelProvider);
      }
      // 是否存在地形预览
      if (this.isAddTerrain) {
        this.$emit('startAddTerrain');
        _this.earth.extend(Cesium.viewerCesiumInspectorMixin);
      }
      // 是否添加倾斜摄影数据
      if (this.isAddTiltphoto) {
        this.$emit('startAddTiltphoto');
      }
      // 是否添加时序影像
      if (this.isAddTimeImage) {
        this.$emit('startAddTimeImage');
      }
      // 是否添加时序影像
      if (this.isAddStreetView) {
        this.$emit('startAddStreetView');
      }
    },
    // 添加历史影像数据
    addTimeImage(info) {
      this.timelineInfo = info;
      this.timeline = null;
      this.metalUrl = "http://www.huaruiview.cn:7000/service/query?request=GetMetadata&lon={lon}&lat={lat}&z={z}&format=jsonp";
      this.lat = 39.9046859347;
      this.lon = 116.3897190553;
      this.z = this.timelineInfo.tile.xyz[2] + 1;
      this.isPlay = false;

      setTimeout(() => {
        _this.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(this.lon, this.lat, 7000000),
          duration: 3.0,
        });
      }, 500);
      this.metalInfo = {};
      this.getMetal();
      // document.getElementById("tl_start").onclick = function () {
        _this.isPlay = true;
        const firstTime = this.timelineInfo.timepojo[0].year + "-" + (this.timelineInfo.timepojo[0].month > 9 ? this.timelineInfo.timepojo[0].month : "0" + this.timelineInfo.timepojo[0].month) + "-" + (this.timelineInfo.timepojo[0].day > 9 ? this.timelineInfo.timepojo[0].day : "0" + this.timelineInfo.timepojo[0].day);
        _this.earth.clock.currentTime = Cesium.JulianDate.fromIso8601(firstTime);
        _this.currentTimeTab(_this.earth.clock.currentTime);
        _this.startTick();
      // }
    },
    // 根据不同层级切换时间轴
    tabTimeLine() {
      // clearInterval(this.timeTickEvt);
      // this.z = 14;
      // getTimeImageInfo('Image_test-PNG-4326', 116.391142, 39.907043, 14).then(res => {
      //   this.timelineInfo = res;
      //   this.getMetal();
      //   _this.earth.clock.currentTime = Cesium.JulianDate.fromIso8601(this.timelineInfo.times[0]);
      //   _this.timeTickEvt = setInterval(function () {
      //     if (_this.isPlay) {
      //       _this.earth.clock.currentTime = Cesium.JulianDate.addDays(_this.earth.clock.currentTime, 360, _this.earth.clock.currentTime);
      //     }
      //   }, 3000);
      // });
    },
    // 循环从头开始播放
    renewTick() {
      clearInterval(this.timeTickEvt);
      const firstTime = this.timelineInfo.timepojo[0].year + "-" + (this.timelineInfo.timepojo[0].month > 9 ? this.timelineInfo.timepojo[0].month : "0" + this.timelineInfo.timepojo[0].month) + "-" + (this.timelineInfo.timepojo[0].day > 9 ? this.timelineInfo.timepojo[0].day : "0" + this.timelineInfo.timepojo[0].day);
      _this.earth.clock.currentTime = Cesium.JulianDate.fromIso8601(firstTime);
      let tokenNum = 0;
      _this.timeTickEvt = setInterval(function () {
        if (_this.isPlay && tokenNum === 0) {
          _this.earth.clock.currentTime = Cesium.JulianDate.addDays(_this.earth.clock.currentTime, 1800, _this.earth.clock.currentTime);
        } else {
          _this.earth.clock.currentTime = Cesium.JulianDate.addDays(_this.earth.clock.currentTime, 1440, _this.earth.clock.currentTime);
        }
        _this.currentTimeTab(_this.earth.clock.currentTime);
        tokenNum ++;
      }, 3000);
    },
    // 开始 or 继续播放
    startTick() {
      let tokenNum = 0;
      // this.timelineInfo.times = ["1992-01-01","1993-11-01","2000-01-10","2003-06-01","2010-08-01","2012-05-01","2013-01-01"];
      _this.timeTickEvt = setInterval(() => {
        // if (_this.isPlay && tokenNum === 0) {
          // _this.earth.clock.currentTime = Cesium.JulianDate.addDays(_this.earth.clock.currentTime, 1800, _this.earth.clock.currentTime);
        // } else {
          _this.earth.clock.currentTime = Cesium.JulianDate.fromIso8601(this.timelineInfo.times[tokenNum]);
        // }
        _this.currentTimeTab(_this.earth.clock.currentTime);
        tokenNum ++;
      }, 3000);
    },
    // 停止播放
    stopTick() {
      clearInterval(this.timeTickEvt);
      // _this.earth.clock.currentTime = Cesium.JulianDate.fromIso8601("2001-12-31");
    },
    // 创建时间轴
    createTimeLine() {
      if ($('.cesium-viewer-timelineContainer')) {
        $('.cesium-viewer-timelineContainer').remove();
        // this.remove();
      }
      var timelineContainer = document.createElement('div');
      timelineContainer.className = 'cesium-viewer-timelineContainer';
      // $('.cesium-viewer-timelineContainer').appendTo($('#timeLineWrap'));
      $('#timeLineWrap .timeline-wrap').append(timelineContainer);
      _this.timeline = new Cesium.Timeline(timelineContainer, _this.earth.clock);
      // _this.timeline.addEventListener('settime', this.onTimelineScrubfunction, false);
    },
    // 监听点击时间轴刻度事件
    onTimelineScrubfunction(e) {
      let clock = e.clock;
      clock.currentTime = _this.earth.clock.currentTime;
      this.currentTimeTab(e.timeJulian);
      // clock.shouldAnimate = false;
    },
    // 加载历史影像
    loadTimeLayer() {
      let start = this.metalInfo[0];        
      let stop = this.metalInfo[this.metalInfo.length - 1];
      // let isoStart = this.timelineInfo.times[0]; // start.year + "-" + start.month + "-" + start.day;
      const isoStart = this.timelineInfo.timepojo[0].year + "-" + (this.timelineInfo.timepojo[0].month > 9 ? this.timelineInfo.timepojo[0].month : "0" + this.timelineInfo.timepojo[0].month) + "-" + (this.timelineInfo.timepojo[0].day > 9 ? this.timelineInfo.timepojo[0].day : "0" + this.timelineInfo.timepojo[0].day);
      let isoStop = stop.year + "-" + (stop.month > 9 ? stop.month : "0" + stop.month) + "-" + (stop.day > 9 ? stop.day : "0" + stop.day);

      const times = Cesium.TimeIntervalCollection.fromIso8601({
        iso8601: isoStart + '/' + isoStop + '/P1M',
        //iso8601:  '2001-12-31/2017-12-31/P1M',
        leadingInterval: true,
        trailingInterval: true,
        isStopIncluded: false, // We want stop time to be part of the trailing interval
        dataCallback: this.dataCallback,
      });

      // this.timeLayerUrl = "http://www.huaruiview.cn:7000/service/query?Time=2003-12-03T00%3A00%3A00Z&yy={yy}&dd={dd}&mm={mm}&request=GetTile&service=wmts&format=jpeg&height=256&width=256&z={z}&x={x}&y={y}";
      // this.timeLayerUrl = "http://192.168.44.183/gwc/service/time?row={x}&col={y}&dd={dd}&layer=Image_test-PNG-4326&mm={mm}&request=gettile&yy={yy}&zoo={z}";
      this.timeLayerUrl = `${previewTimeImage}/gwc/service/time?request=gettile&layer=${this.timelineInfo.tile.layerName}&row={x}&col={y}&dd={dd}&mm={mm}&request=gettile&yy={yy}&zoo={z}`;
      let timeLayer = new Cesium.UrlTemplateTimeLayer({
        url: this.timeLayerUrl,
        tilingScheme: new Cesium.GeographicTilingScheme(),
        clock: _this.earth.clock,
        times: times
      });
      const imageryLayers = _this.earth.imageryLayers;
      this.tLayer = imageryLayers.addImageryProvider(timeLayer);
      timeLayer.readyPromise
        .then(function () {
          const start = Cesium.JulianDate.fromIso8601(isoStart);
          const stop = Cesium.JulianDate.fromIso8601(isoStop);
          //self.timeline.zoomTo(start, stop);
          let clock = _this.earth.clock;
          clock.startTime = start;
          clock.stopTime = stop;
          clock.currentTime = start;
          clock.clockRange = Cesium.ClockRange.LOOP_STOP;
          clock.multiplier = 86400;
        });
    },
    // 初始调用
    getMetal() {
      // let urlTem = this.metalUrl.replace("{lat}", this.lat).replace("{lon}", this.lon).replace("{z}", this.z);
      // fetch(urlTem).then(response => {
      //   response.json().then(data => {
          // let stData = data.sort((function (a, b) {
          //   return a.year - b.year
          // }))
          _this.metalInfo = this.timelineInfo.timepojo;
          _this.loadTimeLayer();
          _this.createTimeLine();
      //   })
      // });
    },
    // 时间创建回调
    dataCallback(interval, index) {
      let time;
      if (index === 0) { // leading
        time = Cesium.JulianDate.toIso8601(interval.stop);
      } else {
        time = Cesium.JulianDate.toIso8601(interval.start);
      }
      let parseTime = time.split('T')[0];
      const yy = parseTime.split('-')[0];
      const dd = parseTime.split('-')[1];
      const mm = parseTime.split('-')[2];
      return {
        Time: time,
        yy: yy,
        dd: dd,
        mm: mm
      };
    },
    currentTimeTab(time) {
      const dateStr = new Date(Cesium.JulianDate.toDate(time));
      this.currentDate = dateStr.getFullYear() + '-' + (dateStr.getMonth() + 1) + '-' + dateStr.getDate();
      if (dateStr.getFullYear() == 2016) {
        clearInterval(_this.timeTickEvt);
      }
    },
    // 移除时间轴
    remove() {
      _this.earth.clock.canAnimate = false;
      _this.earth.clock.shouldAnimate = false;
      _this.earth.imageryLayers.remove(_this.tLayer, true);
      _this.timeline.destroy();
    },
    // 搜索地名
    searchDem(param, name, level, district) {
      var districts = this.districtOutLine.length;
      const position = param.split(" ");
      //移除轮廓
      for (let i = 0; i < districts; i++) {
        this.earth.entities.remove(this.districtOutLine[i]);
      }
      this.earth.entities.remove(this.placeNameLocation); //移除位置标注
      if (district !== false) {
         this.addArea(district);
      } else {
        this.placeNameLocation = _this.earth.entities.add({
          position : Cesium.Cartesian3.fromDegrees(parseFloat(position[0]), parseFloat(position[1])),
          billboard : {
            image : '../../static/images/red_target.png',
            width : 16,
            height : 16
          },
          label : {
            text : name,
            font : '14pt monospace',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth : 2,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
            pixelOffset : new Cesium.Cartesian2(0, -9)
          }
        });  
      }
      _this.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(parseFloat(position[0]), parseFloat(position[1]), level),
        duration: 3.0,
      });
    },
    //添加区域轮廓
    addArea(district) {
      var districts = this.districtOutLine.length;
      for (let i = 0 ; i < districts; i++) {
        this.earth.entities.remove(this.districtOutLine[i]);
      }
      this.earth.entities.remove(this.districtOutLine);
      this.districtOutLine = new Array(district.length).fill([]); //创建存放数组的数组
      for (let i = 0 ; i < district.length; i++) {
        this.districtOutLine[i] = this.earth.entities.add({
          name : 'line',
          polyline : {
            positions : Cesium.Cartesian3.fromDegreesArray(district[i]),
            width : 2,
            // material : new Cesium.PolylineOutlineMaterialProperty({
            //   color: Cesium.Color.GOLD,
            // })
            //arcType : Cesium.ArcType.RHUMB,
            material: Cesium.Color.GOLD,
            //clampToGround: true
          }
        });
      }
    },
    /**
     * 添加地形数据
     * @param terrainMessage 地形参数
     */
    addTerrain(terrainMessage) {
      const terrainProvider = this.buildBaseMap(terrainMessage);
      _this.earth.terrainProvider = terrainProvider;
      const rectangle = terrainMessage.rectangle;
      if (rectangle[0] > -160
        && rectangle[1] > -70
        && rectangle[2] < 160
        && rectangle[3] < 70) {
        const lineList = [
          rectangle[0],
          rectangle[1],
          rectangle[0],
          rectangle[3],
          rectangle[2],
          rectangle[3],
          rectangle[2],
          rectangle[1],
          rectangle[0],
          rectangle[1],
        ];
        _this.drawPolyline(terrainMessage.layerName, lineList);
      }
      _this.flyTo(terrainMessage);
    },
    // 删除地形
    delTerrain(terrainMessage) {
      const terrainProvider =  new Cesium.EllipsoidTerrainProvider({});
      _this.earth.terrainProvider = terrainProvider;
      _this.earth.entities.removeAll();
    },
    /**
     * 添加倾斜摄影数据
     * @param address 数据地址
     */
    addTiltPhoto(address) {
      const viewer = _this.earth;
      const tileset = new Cesium.Cesium3DTileset({
        url: address
      });
      tileset.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset);
        viewer.flyTo(tileset);
      });
      viewer.scene.debugShowFramesPerSecond = false;
    },
    /**
     * 添加d大规模倾斜摄影数据
     * @param address 数据地址
     */
    addTiltPhotoForGrid(address) {
      const viewer = _this.earth;
      viewer.scene.debugShowFramesPerSecond =true;
      var TileCoordinatesImagery = new Cesium.TileCoordinatesImageryProvider();
      viewer.imageryLayers.addImageryProvider(TileCoordinatesImagery);//添加注记图层      

      setTimeout(() => {
        var initialPosition = Cesium.Cartesian3.fromDegrees(109.6072, 23.1191, 900);
        viewer.scene.camera.flyTo({
          destination: initialPosition,
          endTransform: Cesium.Matrix4.IDENTITY
        });
      }, 1000);
      
      const dataSource = new Cesium.ObliqueTileDataSource({
        scene: viewer.scene, 
        beginLevel: 13,
        url: address,
        minLevel: 16,
        bArea: true,
        minX: 13176,
        maxX: 13182,
        minY: 3043,
        maxY: 3047,
      })
      viewer.dataSources.add(dataSource);
    },
    // 添加街景数据
    addStreetView(info) {
      Message({
        showClose: true,
        message: '点击右键查看街景'
      });
      const viewer = _this.earth;
      viewer.entities.add({
        rectangle : {
          coordinates : Cesium.Rectangle.fromDegrees(info.minX, info.minY, info.maxX, info.maxY),
          material:Cesium.Color.fromCssColorString('rgba(255,255,255,0)'),
          fill : false,
          outline : true,
          outlineColor:Cesium.Color.fromCssColorString('##fb0101')
        },
      });
      let rectangle = {'rectangle' : [info.minX, info.minY, info.maxX, info.maxY]};
      this.flyTo(rectangle);
      this.streetView = new StreetView(viewer, {
        // flyOptions: {
        //   point: { lng: (info.minX + info.maxX) / 2, lat: (info.minY + info.maxY) / 2 },
        //   duration: 2
        // },
        isFly: false,
        parentDom: document.getElementById("streetscape"),
        miniMapUrl: "http://icenter.geovis.online/geoserverplus/gwc/service/wmts",
        scapeUrl: `${UrlSetting.URLS.streetView}/${info.svName}`,
        // scapeUrl: info.url
      });
    },
    /**
     * 服务查询添加倾斜摄影数据
     * @param address 地址
     * @param layerId 图层id
     */
    serviceAddTiltPhoto(address,layerId) {
      const viewer = _this.earth;
      const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: address,
          // maximumScreenSpaceError:32
        })
      );
      tileset.layerId={id:layerId};
      viewer.flyTo(tileset);
    },
    // 删除倾斜摄影数据
    delTiltPhoto() {
      const viewer = _this.earth;
      // viewer.scene.primitives.removeAll();
      const primitives =  viewer.scene.primitives;
      for (let i = 0; i<primitives.length; i++) {
        const layerPrimitives = primitives.get(i);
        primitives.remove(layerPrimitives);
      }
    },
    /**
     * 相机飞到初始位置(复位)
     * @param time 飞到初始位置花费的时间
     * @param callback 飞行结束后的回调方法，飞行过程中按空格触发复位相机位置则自动调用该回调方法
     */
    flyToHome() {
      _this.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(109, 35, 22000000),
        duration: 3.0,
      });
    },
    /**
     * 相机飞到指定位置
     * @param configObj viewpoint设置(例如经纬度 视点距离 俯仰角等等)
     矩形的顺序xMin yMin xMax yMax
     * @param time 飞到飞到指定位置花费的时间以秒为单位
     * @param callback 飞行结束后的回调方法
     */
    flyTo(configObj, time) {
      // _this.earth.camera.flyTo(configObj, time, callback);
      if (configObj.location) {
        if (!configObj.range) {
          configObj.range = 6000000;
        }
        _this.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(Number(configObj.location[0]), Number(configObj.location[1]), Number(configObj.range)),
          duration: time,
        });
      } else {
        _this.earth.camera.flyTo({
          destination: Cesium.Rectangle.fromDegrees(configObj.rectangle[0], configObj.rectangle[1], configObj.rectangle[2], configObj.rectangle[3]),
        });
      }
    },
    getMousePosition() {
      const handler = new Cesium.ScreenSpaceEventHandler(_this.earth.canvas);
      handler.setInputAction(function (movement) {
        const cartesian = _this.getCartesian3(movement.endPosition);
        if (cartesian) {
          const cartographic = _this.getCartographicFromCartesian3(cartesian);
          //将地图坐标（弧度）转为十进制的度数
          _this.position = {
            lat: Cesium.Math.toDegrees(cartographic.latitude).toFixed(4),
            log: Cesium.Math.toDegrees(cartographic.longitude).toFixed(4),
            alti: (_this.earth.camera.positionCartographic.height / 1000).toFixed(2),
          };
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    /**
     * 添加点
     * @param lon 经度
     * @param lat 纬度
     * @param pointSize 点的大小
     * @param pointColor 点的颜色 Cesium.Color.YELLOW
     */
    addPoint(worldPosition, pointSize) {
      const point = _this.earth.entities.add({
        position: worldPosition,
        point: {
          pixelSize: pointSize,
          color: Cesium.Color.GREEN,
        },
      });
      return point;
    },
    /**
     * 绘制线
     * @param nodeName 名称 名称不可重复？？？？？？
     * @param pathArr 路径数组
     */
    drawRectangle(nodeName, path) {
      function callBackPos() {
        const rects = [];
        path.forEach((item) => {
          rects.push(_this.getCartographicFromCartesian3(item));
        });
        return _this.getRectangleFromPoint(rects);
      }

      const rectangle = _this.earth.entities.add({
        name: nodeName,
        rectangle: {
          coordinates: new Cesium.CallbackProperty(callBackPos, false),
          material: Cesium.Color.GREEN.withAlpha(0.4),
        },
      });
      return rectangle;
    },
    drawPolyline(nodeName, linePositionList) {
      const polyline = _this.earth.entities.add({
        name: nodeName,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(linePositionList),
          width: 3,
          material: Cesium.Color.YELLOW,
          clampToGround: true,
        },
      });
      return polyline;
    },
    /**
     * 绘制多边形
     * @prams vertices 矩形范围 [[0,0,111], [10,0,111], [10,10,111], [0,10,111]]
     */
    drawPloygon(polygonName, verticeArr) {
      function callBackPos() {
        return verticeArr;
      }

      const polygon = _this.earth.entities.add({
        name: polygonName,
        polygon: {
          hierarchy: new Cesium.CallbackProperty(callBackPos, false),
          material: Cesium.Color.GREEN.withAlpha(0.4),
        },
      });
      return polygon;
    },
    /**
     * 2D3D切换
     */
    tab2D3D() {
      if (_this.earth.currentMode === '3D') {
        _this.earth.currentMode = '2D';
        _this.is2D3D = '3D';
        _this.earth.scene.morphTo2D(2);
      } else if (_this.earth.currentMode === '2D') {
        _this.earth.currentMode = '3D';
        _this.is2D3D = '2D';
        _this.earth.scene.morphTo3D(2);
      } else {
        _this.earth.currentMode = '2D';
        _this.is2D3D = '3D';
        _this.earth.scene.morphTo2D(2);
      }
    },
    /**
     * 地球放大
     */
    earthZoomIn() {
      // this.earth.camera.zoom(-0.1);
      this.earth.camera.zoomIn(100000);
    },
    /**
     * 地球缩小
     */
    earthZoomOut() {
      // this.earth.camera.zoom(0.1);
      this.earth.camera.zoomOut(100000);
    },
    clearAll() {
      this.earth.entities.removeAll();
    },
    /**
     * 为高级查询提供接口
     */
    getPolygonWkt(wkt, bool) {
      const coords = [];
      const coordParts = [];
      let coordStr,
        ringList;
      if (bool) {
        coordStr = wkt.substring(wkt.indexOf('(') + 2, wkt.length - 2);
        ringList = coordStr.split(/\)+,\s*\(+/);
      } else {
        coordStr = wkt.substring(wkt.indexOf('(') + 1, wkt.length - 1);
        ringList = coordStr.split('), (');
      }
      if (ringList.length === 1) {
        const ringStr = ringList[0];
        const str = ringStr.substring(ringStr.indexOf('(') + 1, ringStr.length - 1);
        coordParts.push(str.replace(new RegExp(',\\s*', 'gm'), ' ').split(' '));
      } else {
        ringList.forEach((ring, index) => {
          if (index === 0) {
            ring = ring.substring(ring.indexOf('(') + 1, ring.length);
          } else if (index === ringList.length - 1) {
            ring = ring.substring(0, ring.length - 1);
          }
          coordParts.push(ring.replace(new RegExp('(,)\\s*', 'gm'), ' ').split(' '));
        });
      }
      coordParts.forEach((part) => {
        const points = [];
        part.forEach((par) => {
          points.push(parseFloat(par));
        });
        coords.push(points);
      });
      return coords;
    },
    heightLight(entities, bool) {
      if (entities) {
        if (bool) {
          _this.changeColor(entities, Cesium.Color.RED);
        } else {
          _this.changeColor(entities, Cesium.Color.ROYALBLUE);
        }
      }
    },
    changeColor(entities, color) {
      entities.forEach((item) => {
        const entiy = _this.earth.entities.getById(item);
        entiy.polyline.material = color;
      });
    },
    drawImageEntities(images) {
      const imageEntities = [];
      const borderColor = Cesium.Color.ROYALBLUE;
      images.forEach((item) => {
        if (item.lowleftLon > -160
          && item.lowleftLat > -70
          && item.uprightLon < 160
          && item.uprightLat < 70) {
          item.entiy = [];
          const coords = _this.getPolygonWkt(item.validArea);
          coords.forEach((part, index) => {
            const entity = _this.earth.entities.add({
              id: `${item.id}${index}`,
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(part),
                material: borderColor,
                width: 2,
                clampToGround: true,
              },
            });
            item.entiy.push(`${item.id}${index}`);
            imageEntities.push(entity);
          });
        }
      });
      _this.earth.flyTo(imageEntities);
    },
    drawArea(wkt) {
      _this.clearAll();
      const areaEntities = [];
      const coords = _this.getPolygonWkt(wkt, true);
      coords.forEach((part, index) => {
        const entity = _this.earth.entities.add({
          id: `area${index}`,
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(part),
            material: Cesium.Color.YELLOW,
            width: 2,
            clampToGround: true,
          },
        });
        areaEntities.push(entity);
      });
      _this.earth.flyTo(areaEntities);
    },
    addImage(item, index) {
      let imageOverLay;
      let west,
        south,
        east,
        north;
      if (item.rotate) {
        imageOverLay = {
          id: item.id,
          polygon: {
            height: index * 100,
            hierarchy: Cesium.Cartesian3.fromDegreesArray(item.rectangle),
            material: item.url,
            stRotation: item.rotate,
          },
        };
        const width = item.rectangle[4] - item.rectangle[0];
        const height = item.rectangle[5] - item.rectangle[1];
        west = item.rectangle[0] - 0.5 * width;
        south = item.rectangle[1] - 0.5 * height;
        east = item.rectangle[4] + 0.5 * width;
        north = item.rectangle[5] + 0.5 * height;
      } else {
        imageOverLay = {
          id: item.id,
          rectangle: {
            height: index * 100,
            coordinates: Cesium.Rectangle.fromDegrees(
              item.rectangle[0],
              item.rectangle[1],
              item.rectangle[2],
              item.rectangle[3]),
            material: item.url,
          },
        };
        const width = item.rectangle[2] - item.rectangle[0];
        const height = item.rectangle[3] - item.rectangle[1];
        west = item.rectangle[0] - 0.5 * width;
        south = item.rectangle[1] - 0.5 * height;
        east = item.rectangle[2] + 0.5 * width;
        north = item.rectangle[3] + 0.5 * height;
      }
      const position = [
        west < -180 ? -180 : west,
        south < -90 ? -90 : south,
        east > 180 ? 180 : east,
        north > 90 ? 90 : north,
      ];
      _this.earth.entities.add(imageOverLay);
      _this.flyTo({rectangle: position});
    },
    addVector(item) {
      const imageProvider = new Cesium.WebMapServiceImageryProvider({
        url: item.wms,
        layers: `${item.workspace}:${item.layerName}`,
        parameters: {
          transparent: 'true',
          format: 'image/png',
        },
      });
      return new Cesium.ImageryLayer(imageProvider);
    },
    removeImage(item) {
      _this.earth.entities.removeById(item.id);
    },
    movePoint(pointList, position) {
      const point = _this.getCartesian3(position);
      if (point && pointList.length) {
        pointList.pop();
        pointList.push(point);
      }
    },
    translatePoints(pointList){
      const points = [];
      pointList.forEach((item) => {
        const point = _this.getCartographicFromCartesian3(item);
        points.push(_this.getWgs84CoordsFromCartographic(point));
      });
      return points;
    },
    rectangleRightClickPoint(pointList,callBack) {
      const points = this.translatePoints(pointList);
      callBack(points);
    },
    polygonRightClickPoint(pointList,callBack) {
      pointList.pop();
      const points = this.translatePoints(pointList);
      callBack(points);
    },
    /**
     * 球上画图
     * type 图形类型 ：rectangle， polygon
     * callBack 回调函数，用于点坐标转wkt
     */
    drawing(type, callBack) {
      const handler = new Cesium.ScreenSpaceEventHandler(_this.earth.canvas);
      const pointsList = [];
      const earthContainer = document.getElementById('earthContainer');
      earthContainer.style.cursor = 'crosshair';
      _this.earth.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      _this.clearAll();
      switch (type) {
        case 'rectangle':
          handler.setInputAction((evt) => {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
            _this.earth.scene.screenSpaceCameraController.enableRotate = false;
            _this.earth.scene.screenSpaceCameraController.enableTranslate = false;
            const point = _this.getCartesian3(evt.position);
            if (point) {
              if(pointsList.length === 0) {
                pointsList.push(point);
              }
              pointsList.push(point);
              _this.addPoint(point, 3);
              _this.drawRectangle('rectangle', pointsList);
            }
          }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
          handler.setInputAction((evt) => {
            _this.movePoint(pointsList, evt.endPosition);
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          handler.setInputAction(() => {
            earthContainer.style.cursor = '';
            _this.earth.scene.screenSpaceCameraController.enableRotate = true;
            _this.earth.scene.screenSpaceCameraController.enableTranslate = true;
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
            _this.rectangleRightClickPoint(pointsList, callBack);
          }, Cesium.ScreenSpaceEventType.LEFT_UP);
          break;
        case 'polygon':
          _this.drawPloygon('polygon', pointsList);
          handler.setInputAction((evt) => {
            const point = _this.getCartesian3(evt.position);
            if (point) {
              if(pointsList.length === 0) {
                pointsList.push(point);
              }
              pointsList.push(point);
              _this.addPoint(point, 3);
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          handler.setInputAction((evt) => {
            _this.movePoint(pointsList, evt.endPosition);
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          handler.setInputAction(() => {
            earthContainer.style.cursor = '';
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            _this.polygonRightClickPoint(pointsList, callBack);
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
          break;
        default:
          break;
      }
    },
    // 屏幕坐标转世界坐标
    getCartesian3(pt) {
      const scene = _this.earth.scene;
      const cartesian = _this.earth.camera.pickEllipsoid(pt, scene.globe.ellipsoid);
      if (cartesian) {
        return cartesian;
      }
    },
    // 世界坐标转弧度
    getCartographicFromCartesian3(cartesian3) {
      return _this.earth.scene.globe.ellipsoid.cartesianToCartographic(cartesian3);
    },
    // 弧度转WGS-84坐标
    getWgs84CoordsFromCartographic(cartographic) {
      return [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];
    },
    // 转换点为矩形范围
    getRectangleFromPoint(points) {
      return Cesium.Rectangle.fromCartographicArray(points);
    },
    // 地名服务按钮
    demClickEvent() {
      if( this.flag === true) {
        this.flag = false;
        _this.earth.dataSources.remove(this.placeSource, true);
      } else {
        // 定制地名层级与影像层级映射表
        const table = new Map();
        table.set(1, [0, 1, 2]);
        table.set(3, [4, 5]);
        table.set(5, [6, 7, 8]);
        table.set(7, [9, 10]);
        table.set(9, [11, 12]);
        table.set(11, [13, 14]);
        table.set(13, [15, 16]);
        table.set(15, [17, 18]);
        // 定制地名的显示样式
        const styles = new Map();
        styles.set(1, {
          font: '15pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 6
        });
        styles.set(3, {
          font: '15pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 4
        });
        styles.set(5, {
          font: '12pt monospace',
          fillColor: new Cesium.Color(230,230,250,0.5),
          outlineColor: new Cesium.Color(190,120,72,1),
          outlineWidth: 0.5
        });
        styles.set(7, {
          font: '14pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 4
        });
        styles.set(9, {
          font: '14pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 3
        });
        styles.set(11, {
          font: '14pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 2
        });
        styles.set(13, {
          font: '14pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 2
        });
        styles.set(15, {
          font: '14pt monospace',
          fillColor: new Cesium.Color(230,230,250, 1),
          outlineColor: new Cesium.Color(	0,0,0,1),
          outlineWidth: 2
        });
        this.placeSource = new Cesium.PlaceTileDataSource({
          name: 'placename',
          scene: _this.earth.scene,
          url: `${placeNameUrl}/api/v1/query/dlbm=`,
          // url:`http://icenter.geovis.ai/place/api/v1/query/dlbm=`,
          table: table._c ? table._c : table,
          styles: styles._c ? styles._c : styles
        });
        _this.earth.dataSources.add(this.placeSource); 
        this.flag = true;
      }
    }
  },
};
</script>

<style scoped>
  /*初始化样式*/
  ul {
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  div, tr, td, ul, li {
    user-select: none;
  }

  /*地球的初始化*/
  #earthContainer {
    width: 100%;
    height: calc(100% - 0px);
    position: absolute;
  }

  /*用户的内容分发*/
  .earth-container-slot {
    height: 100%;
    position: absolute;
    z-index: 1;
  }

  /*信息提示框*/
  .info-prompt-module-main > p {
    line-height: 110px;
    text-align: center;
    margin: 0;
  }

  .info-prompt-module-main > button {
    position: absolute;
    right: 15px;
    padding: 5px 20px;
    border-width: 0px;
    background: #2baae6;
    color: white;
    bottom: 15px;
  }

  /*公共的提示框动画效果*/
  @keyframes commonPromptAnimit {
    0% {
      top: 48%;
    }
    100% {
      top: 50%;
    }
  }

  /*GlobeControl独有的插件样式*/
  /*globeControl里引入的控件的控制器*/
  .GCPlugin-controller {
    position: absolute;
    right: 25px;
    bottom: 50px;
    z-index: 1;
  }

  /*复位*/
  .GCPlugin-reset {
    width: 35px;
    height: 35px;
    margin-bottom: 8px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
    box-sizing: border-box;
    background: #f1f1f1;
    color: #414141;
    border-radius: 50%;
  }

  .GCPlugin-reset > img {
    margin-top: 7px;
  }

  /*2/3D切换*/
  .GCPlugin-tab2D3D {
    width: 35px;
    height: 35px;
    margin-bottom: 8px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    box-sizing: border-box;
    background: #f1f1f1;
    color: #414141;
    font-size: 14px;
    border-radius: 50%;
    font-weight: 600;
  }

  /*缩放控制*/
  .GCPlugin-scale > div {
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    margin-bottom: 8px;
    box-sizing: border-box;
    background: #f1f1f1;
    color: #414141;
    font-size: 25px;
    border-radius: 50%;
  }

  .GCPlugin-scale > div:last-of-type {
    font-size: 30px;
  }

  /*更换底图按钮*/
  .base-layer {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 35px;
    line-height: 35px;
    text-align: center;
    height: 35px;
    background: #f1f1f1;
    z-index: 40;
    border-radius: 4px
  }

  .mouse-position {
    position: absolute;
    right: 5px;
    bottom: 10px;
    color: #fff;
    z-index: 100;
  }

  .mouse-position > div {
    display: inline-block;
    font-size: 14px;
    width: 110px;
  }

  .mouse-position > div:last-child {
    width: 150px;
  }
</style>
<style>
  body {
    overflow: hidden;
  }

  /*去除鸟瞰图的 关闭按钮*/
  #moveDiv > .title > .del {
    display: none;
  }

  /*特效面板的样式重置*/
  .skyAndOcean-container .title-container .close {
    display: none;
  }

  /*地形三角网挂件*/
  .cesium-viewer-cesiumInspectorContainer {
    position: unset !important;
  }
  .cesium-cesiumInspector {
    position: unset !important;
  }
  .cesium-cesiumInspector-hide > div:nth-last-of-type(3){
    width: 35px;    
    height: 35px;
    position: absolute;
    top: 70px;
    right: 20px;
    color: rgba(0,0,0,0);
  }
  .cesium-cesiumInspector-hide > div:nth-last-of-type(3) input{
    width: 35px;
    height: 35px;
    position: absolute;
    z-index: 1;
    opacity: 0;
  }
  .cesium-cesiumInspector-hide > div:nth-last-of-type(3) img{
    position: absolute;
    top: 0;
    left: 0;
  }
  .SearchBox{
    position: absolute;
    z-index: 1;
    right: 266px;
    padding-top: 20px;
  }
  .el-input--small .el-input__inner {
    height: 35px !important;
  }
  .switch-class {
    position: absolute;
    z-index: 1;
    right: 16px;
    padding-top: 70px;
  }
</style>
