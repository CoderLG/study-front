/* global ol */
import { Loading } from 'element-ui';
import { getTargetData, getTaskInfo } from '../api/realTimeTaskApi';

export default class openLayers2 {
  constructor() {
    this.vector = null;
    this.vectorSource = null;
    this.initHeatmapTimer = null;// 初始化定时器
    this.refreshHeatmapTimer = null;// 刷新数据的定时器
    this.loadingInstance = null;// loading
  }
  async initHeatMap(stId) {
    this.loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0,0,0,0.6)' });
    // 根据任务ID 获取此条任务的详情参数
    const taskInfo = await getTaskInfo(stId);

    window.map.setView(new ol.View({
      center: [taskInfo.data.initLon, taskInfo.data.initLat],
      zoom: taskInfo.data.layerMinLevel + 5,
      projection: 'EPSG:4326',
      minZoom: taskInfo.data.layerMinLevel + 5,
      maxZoom: 20,
    }));
    setTimeout(() => {
      const pixelRange = window.map.getSize();
      const leftTop = window.map.getCoordinateFromPixel([0, 0]);
      const rightBottom = window.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
      const minlon = leftTop[0];
      const maxlon = rightBottom[0];
      const minLat = rightBottom[1];
      const maxLat = leftTop[1];
      this.renderHeatMapRealTime(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat);
      this.initHeatmapTimer = null;
      this.initHeatmapTimer = setInterval(() => {
        this.refreshHeatMapRealTime(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat);
      }, 2000);
    }, 300)
  }
  refreshData(sourceId, minlon, maxlon, minLat, maxLat) {
    clearInterval(this.initHeatmapTimer);
    clearInterval(this.refreshHeatmapTimer);
    this.refreshHeatMapRealTime(sourceId, minlon, maxlon, minLat, maxLat);
    this.refreshHeatmapTimer = null;
    this.refreshHeatmapTimer = setInterval(() => {
      this.refreshHeatMapRealTime(sourceId, minlon, maxlon, minLat, maxLat);
    }, 2000);
  }
  // 首次渲染
  renderHeatMapRealTime(sourceId, minLon, maxLon, minLat, maxLat) {
    window.map.removeLayer(this.vector);
    let heatPoints = [];
    // 第二份数据
    getTargetData(sourceId, minLon, maxLon, minLat, maxLat).then(res => {
      res.forEach((val, index) => {
        heatPoints[index] = new ol.Feature({
          geometry: new ol.geom.Point([val.lon, val.lat]),
          Properties: { "value": '1' },// 当前权值除以最大权值，将范围控制在0-1之间
        })
      })
      // 绘制热力图
      this.vectorSource = new ol.source.Vector({
        features: heatPoints,
      });
      this.vector = new ol.layer.Heatmap({
        source: this.vectorSource,
        blur: 20,
        radius: 10
      });
      // 设置热力图的权值
      this.vector.getSource().getFeatures().forEach((feature) => {
        feature.set('weight', feature.N.Properties.value);
      });
      window.map.addLayer(this.vector);
      // 关闭loading
      this.loadingInstance.close();
    })
  }
  // 刷新数据
  refreshHeatMapRealTime(sourceId, minLon, maxLon, minLat, maxLat) {
    clearInterval(this.refreshHeatmapTimer);
    let heatPoints = [];
    // 
    getTargetData(sourceId, minLon, maxLon, minLat, maxLat).then(res => {
      res.forEach((val, index) => {
        heatPoints[index] = new ol.Feature({
          geometry: new ol.geom.Point([val.lon, val.lat]),
          Properties: { "value": '1' },// 当前权值除以最大权值，将范围控制在0-1之间
        })
      })
      
      this.vectorSource.clear();
      this.vectorSource.addFeatures(heatPoints);
      // 设置热力图的权值
      this.vector.getSource().getFeatures().forEach((feature) => {
        feature.set('weight', feature.N_.Properties.value);
      });
    })
  }
  // 清除
  clearLayer() {
    clearInterval(this.initHeatmapTimer);
    clearInterval(this.refreshHeatmapTimer);
    window.map.removeLayer(this.vector);
  }
}
