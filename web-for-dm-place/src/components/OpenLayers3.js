/* global ol */
import { Loading } from 'element-ui';
// import UrlSetting from '../api/UrlSetting';
import { getTargetData, getTaskInfo } from '../api/realTimeTaskApi';

// const geoLotUrl = UrlSetting.URLS.geoLotUrl;

export default class openLayers3 {
  constructor() {
    this.vector = null;
    this.vectorSource = null;
    this.initPointTimer = null;// 初始化点的定时器
    this.refreshPointTimer = null;// 实时刷新点的定时器
    this.refreshTargetTimer = null;// 实时刷新车辆的定时器
    this.dataMinLevel = 15;// 获取此数据最小层级，默认是根据聚合时的最大层级+2得来
    this.iconUrl = '';// 根据sourceId获取不同的icon
    this.clickEvent = null;
    this.popup = null;// 创建的目标面板对象
    this.element = null;// 创建的面板元素
    this.stId = null;
    this.loadingInstance = null;// loading
    this.iconId = null;// icon的id 绘制出对应的图片
  }
  async initTarget(stId) {
    this.loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0,0,0,0.6)' });
    // 根据任务ID 获取此条任务的详情参数
    const taskInfo = await getTaskInfo(stId);
    this.dataMinLevel = taskInfo.data.layerMinLevel + 5;
    this.iconId = taskInfo.data.iconId;
    this.stId = stId;

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
      this.renderPointRealTime(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat);
      this.initPointTimer = null;
      this.initPointTimer = setInterval(() => {
        this.refreshPointData(taskInfo.data.sourceId, minlon, maxlon, minLat, maxLat);
      }, 2000);
    }, 300);
    // 根据targetType获取匹配的目标图标
    // getTargetManagerList(1, 1000).then(res => {
    //   this.targetData = res.data;
    // });
  }
  // 初始化加载点数据
  renderPointRealTime(sourceId, minLon, maxLon, minLat, maxLat) {
    window.map.removeLayer(this.vector);
    let targetPoints = [];
    // 第二份数据
    getTargetData(sourceId, minLon, maxLon, minLat, maxLat).then(res => {
      res.forEach((val, index) => {
        targetPoints[index] = new ol.Feature({
          geometry: new ol.geom.Point([val.lon, val.lat]),
          Properties: { "targetName": val.targetName, "targetId": val.targetId,
           "sourceId": val.sourceId, "targetType": val.targetType }
        })
      })  
      this.vectorSource = new ol.source.Vector();
      this.vectorSource.addFeatures(targetPoints);
      this.vector = new ol.layer.Vector({
        source: this.vectorSource,
        zIndex:10,
        style: new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({color: '#124fde'}),
            stroke: new ol.style.Stroke({color: '#f7f100', width: 2})
          })
        })
      });
      window.map.addLayer(this.vector);
      // 关闭loading
      this.loadingInstance.close();
    });
    this.element = document.createElement('div');
    this.element.className = 'targetPanel';
    this.clickEvent = (evt) => {
      let feature = window.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        return feature;
      });
      if (feature) {
        let targetName = feature.N.Properties.targetName;
        let sourceId = feature.N.Properties.sourceId;
        let targetId = feature.N.Properties.targetId;
        let targetType = feature.N.Properties.targetType;
        var coordinates = feature.getGeometry().getCoordinates();        
        // --创建目标详情界面--
        if (this.popup) {window.map.removeOverlay(this.popup);}
        this.popup = new ol.Overlay({
          element: this.detailPanel(targetName, coordinates, sourceId, targetId, this.stId, targetType),
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, -17]
        });        
        window.map.addOverlay(this.popup);
        // --创建目标详情界面 END--
        this.popup.setPosition(coordinates);
      }
    };
    window.map.on('click', this.clickEvent);
  }
  // 初始化加载车辆数据
  renderRealTime(sourceId, minLon, maxLon, minLat, maxLat) {
    window.map.removeLayer(this.vector);
    let targetPoints = [];
    // 第二份数据
    getTargetData(sourceId, minLon, maxLon, minLat, maxLat).then(res => {
      res.forEach((val, index) => {
        targetPoints[index] = new ol.Feature({
          geometry: new ol.geom.Point([val.lon, val.lat]),
          Properties: { "targetName": val.targetName, "targetId": val.targetId,
           "sourceId": val.sourceId, "targetType": val.targetType }
        })
        targetPoints[index].setStyle(
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({color: '#124fde'}),
              stroke: new ol.style.Stroke({color: '#f7f100', width: 1})
            })
          })
        );
      })  

      this.vectorSource = new ol.source.Vector();
      this.vectorSource.addFeatures(targetPoints);
      this.vector = new ol.layer.Vector({
        source: this.vectorSource
      });

      window.map.addLayer(this.vector);
    })
  }
  refreshData(sourceId, minlon, maxlon, minLat, maxLat, zoom) {
    if (zoom < this.dataMinLevel + 1) {
      clearInterval(this.initPointTimer);
      clearInterval(this.refreshPointTimer);
      clearInterval(this.refreshTargetTimer);
      this.refreshPointData(sourceId, minlon, maxlon, minLat, maxLat);
      this.refreshPointTimer = null;
      this.refreshPointTimer = setInterval(() => {
        this.refreshPointData(sourceId, minlon, maxlon, minLat, maxLat);
      }, 2000);
    } else {
      clearInterval(this.initPointTimer);
      clearInterval(this.refreshPointTimer);      
      clearInterval(this.refreshTargetTimer);
      this.refreshTargetData(sourceId, minlon, maxlon, minLat, maxLat);
      this.refreshTargetTimer = null;
      this.refreshTargetTimer = setInterval(() => {
        this.refreshTargetData(sourceId, minlon, maxlon, minLat, maxLat);
      }, 2000);
    }
  }
  // 实时刷新车辆
  refreshTargetData(sourceId, minLon, maxLon, minLat, maxLat) {
    let targetPoints = [];
    getTargetData(sourceId, minLon, maxLon, minLat, maxLat).then(res => {
      res.forEach((val, index) => {
        targetPoints[index] = new ol.Feature({
          geometry: new ol.geom.Point([val.lon, val.lat]),
          Properties: { "targetName": val.targetName, "targetId": val.targetId,
           "sourceId": val.sourceId, "targetType": val.targetType }
        })
        // 设置当前icon
        // this.targetData.forEach((item) => {
          // if (item.tmId === val.targetType) {// targetType
            this.iconUrl = `../../static/images/${this.iconId}.png`;
          // }
        // });
        // 没有匹配的targetType 使用默认icon
        // if (!this.iconUrl) {
        //   this.iconUrl = '../../static/images/defaulticon.png';
        // }
        // 设置样式
        targetPoints[index].setStyle(
          new ol.style.Style({
            image: new ol.style.Icon({
              src: this.iconUrl
            })
          })
        );
      })
      this.vectorSource.clear();
      this.vectorSource.addFeatures(targetPoints);
    });    
  }
  // 创造目标详情面板
  detailPanel(targetName, coordinates, sourceId, targetId, stId, targetType) {
    this.element.style.display = 'block';
    this.element.style.width = '150px';
    this.element.style.height = '95px';
    this.element.style.background = 'rgba(255,255,255,1)';
    this.element.style.boxShadow = '2px 2px 7px -1px rgba(51,51,51,0.66)';
    this.element.style.borderRadius = '3px';
    this.element.style.lineHeight = '30px';
    this.element.style.textAlign = 'center';
    this.element.style.fontSize = '14px';
    // 点击查看目标 要跳转的地址
    const href = `${window.location.href.slice(0, window.location.href.indexOf('#'))}#/openTarget?lon=${coordinates[0]}&lat=${coordinates[1]}&sourceId=${sourceId}&targetId=${targetId}&stId=${stId}&targetName=${targetName}&targetType=${targetType}`
    this.element.innerHTML = `<p style='text-align: left;padding-left: 20px;width: 100%;background: #F5F5F5;box-sizing: border-box;height: 30px;line-height: 30px;padding: 0 10px;margin-bottom: 5px;font-weight: 700;'>
      ${targetName}<i class='el-icon-close' id='detailPanelClose' style='float: right;margin-top: 8px;' }></i><p><p>${coordinates[0]} , ${coordinates[1]}<p>
      <a style='font-weight: bold;text-decoration: underline;color: rgba(64,158,255,1);'
      href=${href} target='_blank'>查看目标</a>`;
    this.closePanle();
    return this.element;
  }
  closePanle() {
    setTimeout(() => {
      document.getElementById('detailPanelClose').onclick = () => {
        this.element.style.display = 'none';
      }
    }, 500);
  }
  // 实时刷新点
  refreshPointData(sourceId, minLon, maxLon, minLat, maxLat) {
    let points = [];
    // 第二份数据
    getTargetData(sourceId, minLon, maxLon, minLat, maxLat).then(res => {
      res.forEach((val, index) => {
        points[index] = new ol.Feature({
          geometry: new ol.geom.Point([val.lon, val.lat]),
          Properties: { "targetName": val.targetName, "targetId": val.targetId,
           "sourceId": val.sourceId, "targetType": val.targetType }
        })
      })  
      this.vectorSource.clear();
      this.vectorSource.addFeatures(points);
    })
  }
  // 清除
  clearLayer() {
    window.map.removeEventListener('click', this.clickEvent);
    if (this.element) this.element.style.display = 'none';
    window.map.removeLayer(this.vector);
    clearInterval(this.initPointTimer);
    clearInterval(this.refreshPointTimer);
    clearInterval(this.refreshTargetTimer);
  }
}