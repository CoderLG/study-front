/* global ol */
import { Loading } from 'element-ui';
import { getRealTimeData, getTaskInfo } from '../api/realTimeTaskApi';

let _this;

export default class openLayers1 {
  constructor() {
    _this = this;
    this.vector = null;// 矢量图层
    this.maxFeatureCount = 0;
    this.currentResolution = null;
    this.initGatherTimer = null;// 初始化定时器
    this.refreshGatherTimer = null;// 刷新数据的定时器
    this.featureSource = null;// 数据图层源
    this.isEnd = true;// 用于判断上次执行是否结束 模拟防抖
    this.clusterMaxCount = 0;// 聚合数据的最大权值
    this.loadingInstance = null;// loading
  }
  async initGather(stId) {
    this.loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0,0,0,0.6)' });
    // 根据任务ID 获取此条任务的详情参数
    const taskInfo = await getTaskInfo(stId);

    window.map.setView(new ol.View({
      center: [taskInfo.data.initLon, taskInfo.data.initLat],
      zoom: taskInfo.data.layerMinLevel,
      projection: 'EPSG:4326',
      minZoom: 2,
      maxZoom: 20 - 1,
    }));
    setTimeout(() => {
      const pixelRange = window.map.getSize();
      const leftTop = window.map.getCoordinateFromPixel([0, 0]);
      const rightBottom = window.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
      const minlon = leftTop[0];
      const maxlon = rightBottom[0];
      const minLat = rightBottom[1];
      const maxLat = leftTop[1];
      // 加载实时数据
      this.renderRealTime(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat, taskInfo.data.layerMinLevel);
      this.initGatherTimer = null;
      this.initGatherTimer = setInterval(() => {
        this.refreshGatherData(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat, taskInfo.data.layerMinLevel);
      }, 3000);
    }, 300);
  }
  refreshData(sourceId, minlon, maxlon, minLat, maxLat, zoom) {
    clearInterval(this.initGatherTimer);
    clearInterval(this.refreshGatherTimer);
    this.refreshGatherData(sourceId, minlon, maxlon, minLat, maxLat, zoom);
    this.refreshGatherTimer = null;
    this.refreshGatherTimer = setInterval(() => {
      this.refreshGatherData(sourceId, minlon, maxlon, minLat, maxLat, zoom);
    }, 3000);
  }
  // 刷新更新聚合数据
  refreshGatherData(sourceId, minLon, maxLon, minLat, maxLat, level) {
    let features = [];
    getRealTimeData(sourceId, minLon, maxLon, minLat, maxLat, level + 1).then(res => {
      this.clusterMaxCount = res.maxCount;
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

        var polygon = new ol.geom.Polygon([[[minlon, maxlat], [maxlon, maxlat], [maxlon, minlat], [minlon, minlat], [minlon, maxlat]]]);
        features[index] = new ol.Feature({
          geometry: polygon,
          // weight: val.totalCount,// 上图文本
          weight: val.count,// 上图文本
          // Properties: { "value": val.totalCount }
          Properties: { "value": val.count }
        })
      })
      // console.log(this.featureSource)
      this.featureSource.clear();
      this.featureSource.addFeatures(features);
    })
  }
  // 配色方案
  colorConfig(weight) {
    let levelStage = this.clusterMaxCount / 6;
    var color = weight > (levelStage * 4) ? "244, 244, 3, 1" : weight > (levelStage * 2.5) ? "244, 244, 3, 0.85" :
      weight > (levelStage * 1.5) ? "244, 244, 3, 0.7" : weight > (levelStage) ? "244, 244, 3, 0.5" : weight > (levelStage / 2) ? "244, 244, 3, 0.35" : "244, 244, 3, 0.25";
    return color;
  }
  // 获取多边形内点的方法
  geometryFunc (feature) {
    return feature.getGeometry().getInteriorPoint();
  }
  // 创建多边形及样式
  createPolygonStyle(feature) {
    // let weight = feature.values_.weight;
    let weight = feature.N.Properties.value;
    let color = _this.colorConfig(weight);
    let style;
    // if (_highlightfeatureId == feature.attributes.id) {
    // if (feature.values_.Properties.value > 10) {
    // if (false) {
    //     // 高亮样式
    //     style = new ol.style.Style({
    //       geometry: feature.getGeometry(),
    //       fill: new ol.style.Fill({
    //         color: "rgba(" + color + ")"
    //       }),
    //       stroke: new ol.style.Stroke({
    //         color: '#CC3333',
    //         width: 1
    //       }),
    //       image: new ol.style.Circle({
    //         stroke: new ol.style.Stroke({
    //           color: 'rgb(20,102,102)',
    //           width: 1
    //         }),
    //         radius: 6,
    //         fill: new ol.style.Fill({
    //           color: "rgba(" + color + ")"
    //         })
    //       }),
    //       text: new ol.style.Text({
    //         text: weight.toString(),
    //         textAlign: "center",
    //         textBaseline: 'middle',
    //         font: "14px serif",
    //         fill: new ol.style.Fill({ color: "#FFFFFF" }),
    //         stroke: new ol.style.Stroke({ color: "#000000", width: 3 })
    //       })
    //     });
    //     return style;
    // } else {
      // 普通多边形的样式
      style = new ol.style.Style({
        geometry: feature.getGeometry(),
        fill: new ol.style.Fill({
          color: "rgba(" + color + ")", // 根据不同的权值 显示不同的填充颜色
        }),
        stroke: new ol.style.Stroke({
          color: "rgba(244, 244, 3, 0.1)", // 多边形的边框颜色
          width: 1
        }),
        text: new ol.style.Text({
          text: weight.toString(), // 显示feture中设置好的权重值
          fill: new ol.style.Fill({ color: '#fffff' }),
          textBaseline: 'middle',
        })
      });
      return style;
    // }
  }  
  // 计算当前resolution下feature之间的距离以形成聚合图形的基础信息
  calculateClusterInfo(resolution) {
    this.maxFeatureCount = 0;
    let features = this.vector.getSource().getFeatures();
    let feature, radius;
    for (let i = features.length - 1; i >= 0; --i) {
      feature = features[i];
      let originalFeatures = feature.get('features');
      let extent = ol.extent.createEmpty();
      let j, jj;
      for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
          ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
      }
      this.maxFeatureCount = Math.max(this.maxFeatureCount, jj);
      radius = 0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /resolution;
      feature.set('radius', radius);
    }
  }
  // 聚合图的样式
  styleFunction(feature, resolution) {
    if (resolution != _this.currentResolution) {
      // 根据resolution处理图形聚合状态
      _this.calculateClusterInfo(resolution);
      _this.currentResolution = resolution;
    }
    var style;
    // 根据聚合的不同大小 显示不同的聚合颜色
    var size = feature.get('features').length;
    var color = _this.colorConfig(size);
    // 聚合数大于1 即聚合存在时
    if (size > 1) {
      // 聚合图形样式，自动获取对应半径，调整颜色深度
      style = new ol.style.Style({
        // image: new RegularShape({// 聚合为一个多边形
        //   radius: feature.get('radius'),// 正多边形的半径
        //   points: 4,
        //   angle: 156654,
        //   stroke: new ol.style.Stroke({
        //     color: "#333333",
        //     width: 1,
        //   }),
        //   rotation: 40,
        //   fill: new ol.style.Fill({
        //     color: "rgba(" + color + ",0.5)"
        //   })
        // }),
        geometry: feature.get('features')[1].getGeometry(),
        fill: new ol.style.Fill({
          color: "rgba(" + color + ")", // 根据不同的权值 显示不同的填充颜色
        }),
        stroke: new ol.style.Stroke({
          color: "rgba(83, 247, 18, 0.52)", // 多边形的边框颜色
          width: 1
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: "#333333"
          }),
        }),
      });
    } else {
      var originalFeature = feature.get('features')[0];
      // 单个图形样式处理方法
      style = _this.createPolygonStyle(originalFeature);
    }
    return style;
  } 
  // 获取实时数据，加载到地图
  renderRealTime(sourceId, minLon, maxLon, minLat, maxLat, level) {
    if (this.isEnd) {
      this.isEnd = false;
      window.map.removeLayer(this.vector);
      let features = [];
      // fetch.get('./static/001.txt').then(res => {
      getRealTimeData(sourceId, minLon, maxLon, minLat, maxLat, level + 1).then(res => {
        this.clusterMaxCount = res.maxCount;
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

          var polygon = new ol.geom.Polygon([[[minlon, maxlat], [maxlon, maxlat], [maxlon, minlat], [minlon, minlat], [minlon, maxlat]]]);
          features[index] = new ol.Feature({
            geometry: polygon,
            // weight: val.totalCount,// 上图文本
            weight: val.count,// 上图文本
            // Properties: { "value": val.totalCount }
            Properties: { "value": val.count }
          })
        })
        // 创建图层数据源
        this.featureSource = new ol.source.Vector();
        this.featureSource.addFeatures(features);
        const clusterSource = new ol.source.Cluster({
          distance: 10,
          source: this.featureSource,
          geometryFunction: this.geometryFunc,// 获取多边形内点的方法
        })          
        // 矢量图层
        this.vector = new ol.layer.Vector({
          source: clusterSource,
          style: this.styleFunction,           
        });
        window.map.addLayer(this.vector);
        this.isEnd = true;
        // 关闭loading
        this.loadingInstance.close();
      });
    }
  }
  // 清除
  clearLayer() {
    clearInterval(this.initGatherTimer);
    clearInterval(this.refreshGatherTimer);
    window.map.removeLayer(this.vector);
  }
}
