/* global ol */
/* global mapv */
import { Loading } from 'element-ui';
import { getRealTimeData, getTaskInfo } from '../api/realTimeTaskApi';

export default class openLayers1 {
  constructor() {
    this.initHexagonTimer = null;// 初始化定时器
    this.refreshHexagonTimer = null;// 刷新数据的定时器
    this.isEnd = true;// 用于判断上次执行是否结束 模拟防抖
    this.mapvLayer = null;// mapv图层
    this.mapvSource = null;// mapv资源
    this.mapvOptions = null;// mapv样式选项
    this.loadingInstance = null;// loading
  }
  async initHexagon(stId) {
    this.loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0,0,0,0.6)' });
    // 根据任务ID 获取此条任务的详情参数
    const taskInfo = await getTaskInfo(stId);
    window.map.setView(new ol.View({
      center: ol.proj.transform([taskInfo.data.initLon, taskInfo.data.initLat], 'EPSG:4326' ,'EPSG:3857'),
      zoom: taskInfo.data.layerMinLevel,
      projection: 'EPSG:3857',
      minZoom: 3,
      maxZoom: 20 - 4,
    }));
    setTimeout(() => {
      const pixelRange = window.map.getSize();
      let leftTop = window.map.getCoordinateFromPixel([0, 0]);
      let rightBottom = window.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
      leftTop = ol.proj.transform(leftTop, 'EPSG:3857' ,'EPSG:4326');
      rightBottom = ol.proj.transform(rightBottom, 'EPSG:3857' ,'EPSG:4326');
      const minlon = leftTop[0];
      const maxlon = rightBottom[0];
      const minLat = rightBottom[1];
      const maxLat = leftTop[1];
      // 加载实时数据
      this.renderRealTime(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat, taskInfo.data.layerMinLevel);
      this.initHexagonTimer = null;
      this.initHexagonTimer = setInterval(() => {
        this.refreshHexagonData(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat, taskInfo.data.layerMinLevel);
      }, 3000);
    }, 300);
  }
  addMapv(data) {
    if (this.mapvLayer) {
      // this.mapvSource.clearData();
      const dataSet = new mapv.DataSet(data);
      const options = {
        data: dataSet,
      };
      // this.mapvSource.addData(data, this.mapvOptions);
      this.mapvSource.update(options);
    } else {
      // window.map.removeLayer(this.mapvLayer);
      const dataSet = new mapv.DataSet(data);
      this.mapvOptions = {
        fillStyle: 'rgba(255,255,255,1)',
        shadowColor: 'rgba(255, 255, 255, 0.65)',
        shadowBlur: 1,
        max: 100,
        size: 65,
        label: {
          show: true,
          fillStyle: 'white'
        },
        globalAlpha: 1,
        lineWidth: 5,
        // gradient: {0.25: "rgb(101, 239, 243)", 0.55: "rgb(88, 224, 224)", 0.85: "rgb(49, 193, 193)", 1.0: "rgb(48, 162, 189)"},
        // gradient: {1: "rgb(252, 255, 30)", 0.85: "rgb(232, 232, 2)", 0.55: "rgb(187, 187, 3)", 0.25: "rgb(141, 141, 2)"},
        gradient: {1: "rgba(27, 96, 223, 0.9)", 0.5: "rgba(27, 96, 223, 0.8)", 0.4: "rgba(27, 96, 223, 0.55)", 0.15: "rgba(27, 96, 223, 0.35)"},
        // gradient: {1: "rgba(255,0,0,1)", 0.5: "rgba(0,255,0,1)", 0.4: "rgba(0,0,255,1)", 0.15: "rgba(255,255,255,1)"},
        draw: 'honeycomb'
      };
      const options = {
        map: window.map, dataSet: dataSet, mapvOptions: this.mapvOptions
      };
      this.mapvSource = new ol.source.Mapv(options);
      this.mapvLayer = new ol.layer.Image({
        source: this.mapvSource
      });
      window.map.addLayer(this.mapvLayer);
    }
    // 关闭loading
    this.loadingInstance.close();
  }
  refreshData(sourceId, minlon, maxlon, minLat, maxLat, zoom) {
    clearInterval(this.initHexagonTimer);
    clearInterval(this.refreshHexagonTimer);
    this.refreshHexagonData(sourceId, minlon, maxlon, minLat, maxLat, zoom);
    this.refreshHexagonTimer = null;
    this.refreshHexagonTimer = setInterval(() => {
      this.refreshHexagonData(sourceId, minlon, maxlon, minLat, maxLat, zoom);
    }, 3000);
  }
  // 刷新更新蜂窝数据
  refreshHexagonData(sourceId, minLon, maxLon, minLat, maxLat, level) {
    var data = [];
    getRealTimeData(sourceId, minLon, maxLon, minLat, maxLat, level + 2).then(res => {
      // res.data.xyz.forEach((val, index) => {
      res.grids.forEach((val, index) => {
        // const x = Number(val.xyz.split(',')[0]);
        // const y = Number(val.xyz.split(',')[1]);
        // const z = Number(val.xyz.split(',')[2]);
        // var minlon = x / Math.pow(2.0, z+1) * 360.0 - 180;
        // var maxlat = y / Math.pow(2.0,z)*180 -90;
        // var maxlon = (x+1) / Math.pow(2.0, z+1) * 360.0 - 180;
        // var minlat = (y+1) / Math.pow(2.0,z)*180 -90;

        var minlon = val.boundingBox.minLon;
        var maxlat = val.boundingBox.maxLat;
        var maxlon = val.boundingBox.maxLon;
        var minlat = val.boundingBox.minLat;

        data[index] = {
          geometry: {
            type: 'Point',
            coordinates: ol.proj.transform([(minlon+maxlon) / 2, (minlat + maxlat) / 2], 'EPSG:4326', 'EPSG:3857')
          },
          // count: val.totalCount,
          count: val.count,
        };
      })
      // 更新mapv
      this.addMapv(data);
    })
  }
  // 获取实时数据，加载到地图
  renderRealTime(sourceId, minLon, maxLon, minLat, maxLat, level) {
    if (this.isEnd) {
      this.isEnd = false;
      // window.map.removeLayer(this.mapvLayer);
      let data = [];
      getRealTimeData(sourceId, minLon, maxLon, minLat, maxLat, level + 2).then(res => {
        // res.data.xyz.forEach((val, index) => {
        res.grids.forEach((val, index) => {
          // const x = Number(val.xyz.split(',')[0]);
          // const y = Number(val.xyz.split(',')[1]);
          // const z = Number(val.xyz.split(',')[2]);        
          // var minlon = x / Math.pow(2.0, z+1) * 360.0 - 180;
          // var maxlat = y / Math.pow(2.0,z)*180 -90;
          // var maxlon = (x+1) / Math.pow(2.0, z+1) * 360.0 - 180;
          // var minlat = (y+1) / Math.pow(2.0,z)*180 -90;

          var minlon = val.boundingBox.minLon;
          var maxlat = val.boundingBox.maxLat;
          var maxlon = val.boundingBox.maxLon;
          var minlat = val.boundingBox.minLat;

          data[index] = {
            geometry: {
              type: 'Point',
              coordinates: ol.proj.transform([(minlon+maxlon) / 2, (minlat + maxlat) / 2], 'EPSG:4326', 'EPSG:3857')
            },
            // count: val.totalCount,
            count: val.count,
          };
        })
        // 绘制Mapv
        this.addMapv(data);
        this.isEnd = true;
      });
    }
  }
  // 清除
  clearLayer() {
    clearInterval(this.initHexagonTimer);
    clearInterval(this.refreshHexagonTimer);
    window.map.removeLayer(this.mapvLayer);
    this.mapvLayer = null;    
  }
}
