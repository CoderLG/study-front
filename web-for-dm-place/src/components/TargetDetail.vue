<template>
  <!-- 单个车辆marker detail -->
  <transition name="el-fade-in-linear">
    <div id='popup1' v-show="isStart" >
      <div class="openlayersTitle4">
        <div class="titleContent">{{targetName}}</div>
        <div class="markerDelete" @click="popupSH">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="startTime">
        <div>{{lon}}</div>
        <div>{{lat}}</div>
      </div>
      <div class="startButton" @click="start(sourceId)">查看目标</div>
    </div>
  </transition>
</template>

<script>
/* global ol */
import UrlSetting from '../api/UrlSetting';
import { getTargetManagerList } from '../api/realTimeTaskApi';

const geoLotUrl = UrlSetting.URLS.geoLotUrl;

export default {
  data() {
    return {
      newtrack:[],
      vector: null,
      level: 10,
      lon:null,
      lat:null,
      value2:null,
      value21:null,
      lines_arr:[],
      lines_arr1:[],
      lines_arr2:[],
      startTime:null,
      endTime:null,
      targetId:null,
      stId: null,
      targetName:null,
      targetType: null,
      targetTime:null,
      sourceId:null,
      move_key:false,
      time : 45,
      animating :false,
      layer : null,
      isStart:false,
      data_c : null,// 数据层
      p_data : null,// marker
      pathIndex:0,
      now:null,
      speed:10,
      index:0,
      iconUrl: null,
    }
  },  
  methods: {    
    popupSH(){
      this.isStart = false;
    },
    init(lon, lat, targetId, targetName, sourceId, targetTime, stId, targetType) {
      this.isStart = false;
      window.map.getView().setMinZoom(0);
      window.map.getView().setCenter([lon, lat])
      window.map.removeLayer(this.layer); 
      this.targetName = targetName;
      this.targetId = targetId;
      this.stId = stId;
      this.targetTime = this.format(targetTime);
      this.sourceId = sourceId;
      this.lon = lon;
      this.lat = lat;
      this.targetType = targetType;
      this.lines_arr[0] = [];
      this.lines_arr[0][0] = lon;
      this.lines_arr[0][1] = lat;
      // 根据targetType获取匹配的目标图标
      getTargetManagerList(1, 1000).then(res => {
        res.data.forEach((val) => {
          if (val.tmId === targetType) {// targetType
            this.iconUrl = `${geoLotUrl}/IconStoreApi/iconStores/icon/${val.tmIcon}`;
          }
        })
      });
      // 没有匹配的targetType 使用默认icon
      if (!this.iconUrl) {
        this.iconUrl = '../../static/images/defaulticon.png';
      }
      this.historyLayer();
      this.historyPoint();
      let element = document.getElementById('popup1');
      let popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -17]
      });
      window.map.addOverlay(popup);
      window.map.on('click', (evt)=>{
        let feature = window.map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
              return feature;
            });
        if (feature) {
          var coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          this.isStart = true;
        } 
      });
    },    
    historyLayer() {
      // 矢量容器层
      this.layer = new ol.layer.Vector();
      // 注入数据层--可以注入多个Feature，每个feature有自己的数据和样式
      this.data_c = new ol.source.Vector();
      this.layer.setSource(this.data_c);
      // 打到地图上
      window.map.addLayer(this.layer);
    },
    historyPoint() {
      var that = this;
      // 创建一个活动图标需要的Feature，并设置位置，第一个点
      this.p_data = new ol.Feature({
        // 就一个参数啊，定义坐标
        geometry: new ol.geom.Point(this.lines_arr[0])
      });
      this.p_data.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            src: this.iconUrl,
            // 这个是相当于是进行切图了
            // 注意这个，竟然是比例 左上[0,0]  左下[0,1]  右下[1，1]
            anchor: [0.5, 0.5],
            // 这个直接就可以控制大小了
            scale: 1,
            // 开启转向
            rotateWithView: true,
            // rotation: 0,
          }),
          text: new ol.style.Text({
            // 对其方式
            textAlign: 'center',
            // 基准线
            textBaseline: 'middle',
            offsetY: -30,
            // 文字样式
            font: 'normal 16px 黑体',
            // 文本内容
            text: that.targetName,
            // 文本填充样式
            fill: new ol.style.Fill({
              color: 'rgba(0,0,0,1)'
            }),
            padding: [5, 5, 5, 5],
            backgroundFill: new ol.style.Fill({
              color: 'rgba(255,255,255,0.9)'
            }),
          })
        }),
      );
      // 数据层收集marker
      this.data_c.addFeature(this.p_data);
      // 拿到全局
      //p_data = p_data;
      //p_data = null;
    },    
    // 点击marker选择时间--点击开始按钮--请求数据渲染linestring--开始动画
    start() {
      const routeData = this.$router.resolve({
        name: 'OpenLayerTarget',
        query:{
          lon:this.lon,
          lat:this.lat,
          sourceId:this.sourceId,
          targetName:this.targetName,
          targetId:this.targetId,
          stId:this.stId,
          targetType: this.targetType,
        }
      });
      window.open(routeData.href, '_blank');      
    },
    // 时间戳转换
    add0(m){return m<10?'0'+m:m },
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate()+1;
      var h = time.getHours()+1;
      var mm = time.getMinutes()+1;
      var s = time.getSeconds()+1;
      return y+'-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    },
    clearLayer() {
      window.map.removeLayer(this.layer);
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
#popup1 {
  padding:0px;
  flex-direction: column;
  justify-content: space-between;
  display: block;
  width: 150px;
  height: 100px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(51, 51, 51, 0.66) 2px 2px 7px -1px;
  border-radius: 3px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}
#popup1 .openlayersTitle4{
  width:100%;
  background:#F5F5F5;
  box-sizing:border-box;
  height:30px;
  line-height:30px; 
  padding:0 10px; 
  margin-bottom:5px
}
#popup1 .openlayersTitle4 img{
  width:10px;
  vertical-align: middle;
  
}
.titleContent{
  float:left;
  font-size:14px;
  color:#000;
  font-weight: 700;
}
.start1, .start2, .end1, .end2{
  width:130px;
  height:20px;
  line-height: 20px;
  vertical-align: middle;
}
.markerDelete{
  float: right;
}
.startTime,.endTime{
  flex:1;
  display: flex;
  line-height:30px;
  justify-content: space-around;
  
}
.startButton{
  font-weight: bold;
  text-decoration: underline;
  color: rgba(64,158,255,1);
}
</style>