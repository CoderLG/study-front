/* global ol */
import { Notification } from 'element-ui';
import { getTaskFenceInfo, fenceWarnByWebSocket } from '../api/realTimeTaskApi';

export default class fenceFunction {
  constructor(map) {
    this.map = map;
    this.wktLayer = null;// 围栏图层
    this.wktSource = null;
    this.wktFormat = new ol.format.WKT();// 用于将坐标点wkt转feature
    this.timer = null;// 多围栏跳转定时器
  }
  async init(stId) {
    this.wktSource = new ol.source.Vector();
    this.wktLayer = new ol.layer.Vector({
      source: this.wktSource,
      // style: this.defaultStyle,
      extent: [-180, -90, 180, 90]
    });
    this.map.addLayer(this.wktLayer);
    // 根据任务ID 获取此条任务的围栏信息
    const taskFenceInfo = await getTaskFenceInfo(stId);
    let index = 0;
    let feature = this.wktFormat.readFeature(taskFenceInfo.data[index].gfData);
    this.addFeature(feature, true);
    this.timer = setInterval(() => {
      index++;
      if (index >= taskFenceInfo.data.length) { clearInterval(this.timer);return; }
      feature = this.wktFormat.readFeature(taskFenceInfo.data[index].gfData);
      this.addFeature(feature, true);
    }, 2000);
  }
  // 由于mapv是3857 所以需要重新设置投影
  async initHexagon(stId) {
    this.wktSource = new ol.source.Vector();
    this.wktLayer = new ol.layer.Vector({
      source: this.wktSource,
    });
    this.map.addLayer(this.wktLayer);
    // 根据任务ID 获取此条任务的围栏信息
    const taskFenceInfo = await getTaskFenceInfo(stId);
    let index = 0;
    let feature = this.wktFormat.readFeature(taskFenceInfo.data[index].gfData, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    this.addFeature(feature, true);
    this.timer = setInterval(() => {
      index++;
      if (index >= taskFenceInfo.data.length) { clearInterval(this.timer);return; }
      feature = this.wktFormat.readFeature(taskFenceInfo.data[index].gfData,{
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });
      this.addFeature(feature, true);
    }, 2000);
  }
  /**
   * 矢量图层添加feature
   * @param feature 需要添加的feature
   * @param isFlyTo 是否定位到feature位置
   */
  async addFeature(feature, isFlyTo) {
    if (feature) {
      this.wktSource.addFeature(feature);
    }
    if (isFlyTo) {
      await this.flyTo(feature.getGeometry().getExtent());
    }
  }
  // 视图定位到某个位置
  flyTo(extent) {
    this.map.getView().fit(extent, {
      duration: 1000,
    });
  }
  // 开启围栏告警
  startFenceWarn(stId) {
    this.webSocket = fenceWarnByWebSocket(stId);
    this.webSocket.onmessage = function (msg) {
      let info = msg.data.slice(msg.data.indexOf("#") + 1, msg.data.length);
      let target = JSON.parse(info).target_name;
      let fence = JSON.parse(info).gfName;
      let inoutFlag = JSON.parse(info).inoutFlag;
      let isIn = JSON.parse(info).isIn;
      if (inoutFlag === 0) {
        Notification.warning({ message: `目标${target}进入${fence}围栏`, offset: 50, showClose: true });
      } else if (inoutFlag === 1) {
        Notification.warning({ message: `目标${target}离开${fence}围栏`, offset: 50, showClose: true });
      } else if (inoutFlag === 2) {
        if (isIn === 1) {
          Notification.warning({ message: `目标${target}进入${fence}围栏`, offset: 50, showClose: true });
        } else {
          Notification.warning({ message: `目标${target}离开${fence}围栏`, offset: 50, showClose: true });
        }
      }
    };
  }
  // 关闭围栏告警
  closeFenceWarn() {
    this.webSocket.close();
    clearInterval(this.timer);
  }
  // 清除围栏
  clearFence() {
    clearInterval(this.timer);
    this.map.removeLayer(this.wktLayer);
  }
}
