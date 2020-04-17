<template>
   <!-- 历史轨迹页面 -->
  <div class="real-time-data-preview">
    <div id='targetMap'></div>
    <div>
      <ul class='real-time-data-preview-tab'>
        <li v-for='(li, index) in previewType' :key="index" :class="{active : isIndex == index}"
         ref='typeItem' @click='tabPreviewType(li, index)'>
          <img :src="li.img" alt=""> 
          {{ li.name }}
        </li>
      </ul>
      <ul class='real-time-data-preview-select'>
        <li v-for='(li, index) in previewType1' :key="index" :class="{active1 : isIndex1 == index}"
         ref='typeItem1' @click='realTimeOrHistory(index)'>
          <img :src="li.img" alt="">
          <el-button type="text" :disabled='currentType === "热力图" && index === 0'>
            <span :class="{active1 : isIndex1 == index, active2 : isIndex1 != index,}">{{ li.name }}</span>
          </el-button>
        </li>
      </ul>
      <!-- <ul class='real-time-data-preview-select2'>
        <li>
          <el-switch v-model="fence" active-text="围栏"></el-switch>
        </li>
        <li>
          <el-switch v-model="warn" active-text="报警"></el-switch>          
        </li>
      </ul> -->
      <history-track ref="historyTrack" :lasterDate= "lasterDate" :currentType='currentType' v-show="isTimePicker"></history-track>
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
    <div class="real-time-data-preview-date">
      {{ lasterDate }}
    </div>
    <!--设置底图-->
    <base-map class="base-layer" ref="baseLayerRealtime" @changeMap="changeMap"></base-map>
  </div>
</template>

<script>
/* global ol */
import HistoryTrack from './HistoryTrack';
import FenceFunction from './FenceFunction';
import BaseMap from './BaseMap';
import arc from './arc';
import UrlSetting from '../api/UrlSetting';
import { getTargetList } from '../api/realTimeTaskApi';

const previewTile = UrlSetting.URLS.previewTile;

export default {
  data() {
    return {
      isA:true,
      isB:false,
      updateTime:6000,
      realTimer:null,
      isTimePicker:false,//历史轨迹选项
      previewType: [
        { img: '../static/images/target.png', name: '单目标', type: 'target'},
        { img: '../static/images/heatmap.png', name: '热力图', type: 'heatmap'}
      ],
      previewType1: [
        { img: '../static/images/target.png', name: '实时', type: 'realtime'},
        { img: '../static/images/heatmap.png', name: '回放', type: 'history'}
      ],
      fence: false,
      warn: false,
      isIndex:0,//切换单目标，热力图
      isIndex1:0,//切换实时，历史
      lon:null,
      lat:null,
      targetId:null,
      targetName:null,
      targetType:null,
      sourceId:null,
      restaurants: [],
      state: '',
      timeout:  null,
      level: 10,
      lasterDate: '',
      map:null,
      newtrack:[],
      lines_arr2:[],
      vector: null,
      value1:null,
      value11:null,
      startTime:null,
      endTime:null,
      value2:null,
      value21:null,
      lines_arr:[],
      lines_arr1:[],
      move_key:false,
      time : 45,
      animating :false,
      layer : null,
      isStart:false,
      data_c : null,// 数据层
      p_data : null,// marker
      startPoint:null,
      endPoint:null,
      pathIndex:0,
      now:null,
      curPoints:null,
      speed:100,
      isFirstPoint:true,
      pointsPerMs:0.1,
      flightsSource:null,
      flightsLayer :null,
      line_style :new ol.style.Style({
        stroke: new ol.style.Stroke({
          width: 10,
          color: [34, 139, 34, 0.6],
        })
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#EAE911',
          width: 2
        })
      }),
      currentType: '单目标',
      baseMapLayer: new ol.layer.Tile(),
    }
  },
  components:{
    BaseMap,
    HistoryTrack
  },
  watch: {
    fence(isTrue) {
      if (isTrue) {
        this.fenceFunction.init(this.stId);
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
  mounted() {
    const sourceId  = this.$route.query.sourceId;
    const targetName = this.$route.query.targetName;
    const targetId = this.$route.query.targetId;
    const lon = this.$route.query.lon;
    const lat = this.$route.query.lat;
    const targetType = this.$route.query.targetType;
    this.targetId = targetId;
    this.lon = lon;
    this.lat = lat;
    this.targetName = targetName;
    this.targetType = targetType;
    this.sourceId = sourceId;
    this.stId = this.$route.query.stId;
    // ========================================================
    const projection = ol.proj.get('EPSG:3857');// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = ol.extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    const forMax = 21;
    const forMin = 1;
    const is3857 = true;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, is3857 ? z : (z + 1)));
      matrixIds.push(`EPSG:3857:${z}`);
    }
    // ========================================================
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
    this.map = new ol.Map({
      layers: [this.baseMapLayer],
      target: 'targetMap',
      view: new ol.View({
        center: [116.3968849, 39.91855781],
        zoom: 10,
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
    this.fenceFunction = new FenceFunction(this.map);
    // 时钟
    setInterval(() => {
      this.lasterDate = this.getNowDate();
    }, 1000);
    //初始化单目标
    this.$refs.historyTrack.init(this.lon, this.lat, this.targetName, this.targetId, this.sourceId, this.targetType, this.stId);
    //开始绘制实时轨迹
    this.realTimeLayer();
  },
  methods: {
    //实时轨迹
    realTimeLayer(){
      window.clearInterval(this.realTimer);
      //this.$refs.historyTrack.init(this.lon, this.lat, this.targetName, this.targetId, this.sourceId, this.targetType);
      //var that = this;
      this.flightsSource = new ol.source.Vector({
        wrapX: false,
        loader:()=> {
          getTargetList(this.sourceId , this.targetName).then(res =>{
            if (this.isFirstPoint) {
              this.startPoint = [parseFloat(this.lon), parseFloat(this.lat)];
              this.isFirstPoint = false;
            } else {
              this.startPoint = this.endPoint;
            }
            this.endPoint = [parseFloat(res[0].lon),parseFloat(res[0].lat)]
            var flightsDataItem = [this.startPoint,this.endPoint];
            this.lines_arr1 = flightsDataItem;
            var flightsData = [];
            flightsData.push(flightsDataItem);
            for (var i = 0; i < flightsData.length; i++) {
              var flight = flightsData[i];
              var from = flight[0];
              var to = flight[1];
              // create an arc circle between the two locations
              var arcGenerator = new arc.GreatCircle(
                {x: parseFloat(from[0]), y: parseFloat(from[1])},
                {x: parseFloat(to[0]), y: parseFloat(to[1])});
              var arcLine = arcGenerator.Arc(100, {offset: 10});
              if (arcLine.geometries.length === 1) {
                this.curPoints = arcLine.geometries[0].coords;
                var line = new ol.geom.LineString(arcLine.geometries[0].coords);
                //console.log(line)
                var feature = new ol.Feature({
                  geometry: line,
                  finished: false
                });
                this.addLater(feature, i * 5000);
              }
            }
            this.map.on('postcompose', this.animateFlights);
            this.startAnimation();
          })
          this.realTimer = setInterval(()=>{
            getTargetList(this.sourceId , this.targetName).then(res =>{
            if (this.isFirstPoint) {
              this.startPoint = [parseFloat(this.lon), parseFloat(this.lat)];
              this.isFirstPoint = false;
            } else {
              this.startPoint = this.endPoint;
            }
            this.endPoint = [parseFloat(res[0].lon),parseFloat(res[0].lat)]
            var flightsDataItem = [this.startPoint,this.endPoint];
            this.lines_arr1 = flightsDataItem;
            var flightsData = [];
            flightsData.push(flightsDataItem);
            for (var i = 0; i < flightsData.length; i++) {
              var flight = flightsData[i];
              var from = flight[0];
              var to = flight[1];
              // create an arc circle between the two locations
              var arcGenerator = new arc.GreatCircle(
                  {x: from[0], y: from[1]},
                  {x: to[0], y: to[1]});
              var arcLine = arcGenerator.Arc(100, {offset: 10});
              if (arcLine.geometries.length === 1) {
                this.curPoints = arcLine.geometries[0].coords;
                var line = new ol.geom.LineString(arcLine.geometries[0].coords);
                var feature = new ol.Feature({
                  geometry: line,
                  finished: false
                });
                this.addLater(feature, i * 5000);
              }
            }
            this.map.on('postcompose', this.animateFlights);
            this.startAnimation();
          })
          },this.updateTime)
        }
      })
      this.flightsLayer = new ol.layer.Vector({
        source: this.flightsSource,
        style: (feature) =>{
            // if the animation is still active for a feature, do not
            // render the feature with the layer style
            if (feature.get('finished')) {
              return  this.style;
            } else {
              return null;
            }
          }
      })
      this.map.addLayer(this.flightsLayer)
    },
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
    tabPreviewType(item,index){
      this.isIndex = index;
      if (index==0) {
        this.currentType = '单目标';
        this.$refs.historyTrack.removeHeatMap();
        this.$refs.historyTrack.init(this.lon, this.lat, this.targetName, this.targetId, this.sourceId, this.targetType, this.stId);
        this.map.removeLayer(this.flightsLayer); 
        this.realTimeLayer();
        this.realTimeOrHistory(0);
      } else {
        this.currentType = '热力图';
        window.clearInterval(this.realTimer);
        this.$refs.historyTrack.init(this.lon, this.lat, this.targetName, this.targetId, this.sourceId, this.targetType, this.stId);
        this.map.removeLayer(this.flightsLayer);
        // 热力图只有回放没有实时
        this.realTimeOrHistory(1);
      }
    },
    realTimeOrHistory(index){
      if (this.currentType === '热力图' && index === 0) {
        return;
      }
      this.isIndex1 = index;
      if (index==0) {
        this.isA=true;
        this.isB=false;
        this.isTimePicker = false;
        this.$refs.historyTrack.init(this.lon, this.lat, this.targetName, this.targetId, this.sourceId, this.targetType, this.stId);
        this.realTimeLayer();
      } else {
        window.clearInterval(this.realTimer);
        this.stopAnimation();
        this.isA=false;
        this.isB=true;
        this.isTimePicker = true;
        this.$refs.historyTrack.init(this.lon, this.lat, this.targetName, this.targetId, this.sourceId, this.targetType, this.stId);
        this.map.removeLayer(this.flightsLayer);       
      }
    },    
    //车牌异步请求
    querySearchAsync(queryString, cb) {
      getTargetList(this.sourceId, queryString).then(res =>{
        this.restaurants = [];
        for(let i = 0;i<res.length; i++){
          this.restaurants[i] = {};
          this.restaurants[i].value = res[i].targetName;
          this.restaurants[i].address = res[i].targetId;
          this.restaurants[i].lon = res[i].lon;
          this.restaurants[i].lat = res[i].lat;
          this.restaurants[i].targetTime = res[i].targetTime;
          this.restaurants[i].sourceId = res[i].sourceId;
          this.restaurants[i].targetType = res[i].targetType;
        }
        var results = queryString ? this.restaurants.filter(this.createStateFilter(queryString)) : this.restaurants;
        cb(results);
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    // 点击车牌进行搜索,重新初始化。
    handleSelect(item) {
      this.$refs.historyTrack.init(item.lon, item.lat, item.value,item.address, item.sourceId, item.targetType, this.stId);
      this.lon = item.lon;
      this.lat = item.lat;
      this.targetId = item.address;
      this.targetName = item.value;
      this.sourceId = item.sourceId;
      this.targetType = item.targetType;
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
    },
    // line 动画
    animateFlights(event) {
      var vectorContext = event.vectorContext;
      var frameState = event.frameState;
      vectorContext.setStyle(this.style);
      var features = this.flightsSource.getFeatures();
      for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        if (!feature.get('finished')) {
          // only draw the lines for which the animation has not finished yet
          var coords = feature.getGeometry().getCoordinates();
          var elapsedTime = frameState.time - feature.get('start');
          var elapsedPoints = elapsedTime * this.pointsPerMs;
          if (elapsedPoints >= coords.length) {
            feature.set('finished', true);
          }
          
          var maxIndex = Math.min(elapsedPoints, coords.length);
          var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));

          // directly draw the line with the vector context
          vectorContext.drawGeometry(currentLine);
        }
      }
      // tell OpenLayers to continue the animation
      this.map.render();
    },
    //添加 line feature
    addLater(feature, timeout) {
      var that = this;
      window.setTimeout(function() {
        feature.set('start', new Date().getTime());
        that.flightsSource.addFeature(feature);
      }, timeout)
    },
    // marker point 动画开始
    startAnimation() {
      if (this.animating) {
        this.stopAnimation(false);
      } else {
        this.animating = true;
        this.now = new Date().getTime();
        this.map.on('postcompose', this.moveFeature);
        this.map.render();
      }
    },
    // marker point 动画
    moveFeature(event) {
      //当前祯属性
      var frameState = event.frameState;
      if (this.animating) {
        // 所需时间（经过的时间）每次刷新时间不一样，frameState.time当前祯所需时间
        var elapsedTime = frameState.time - this.now ;
        // 求整，speed即index与index+1之间的时长
        var index = Math.round(this.speed * elapsedTime/1000);
        if (index >= this.curPoints.length-1) {
          this.stopAnimation();
          return;
        }
        var old_p = this.curPoints[index];
        var new_p = this.curPoints[index+1];
        this.$refs.historyTrack.p_data.setGeometry(new ol.geom.Point(new_p));
        // 改变出租车方向
        this.$refs.historyTrack.p_data
        .getStyle()
        .getImage()
        .setRotation(this.$refs.historyTrack.point_rotation(new_p, old_p));
      }
      //开始渲染动画
      this.map.render();
    },
    // marker point 动画结束
    stopAnimation() {
      this.animating = false; 
      this.map.un('postcompose', this.moveFeature);
    }
  }
};
</script>

<style lang='scss' scoped>
#targetMap {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.real-time-data-preview {
  .class-a{
    left:480px;
  } 
  .class-b{
    left:1010px;
  }
  .real-time-data-preview-tab {
    position: absolute;
    height: 40px;
    line-height: 40px;
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
        width:20px;
        padding-right: 5px;
        vertical-align: text-bottom;
      }
    }
    li.active {
      background: #3385FF;
      color: #ffffff;
    }
  }
  .real-time-data-preview-select {
    @extend .real-time-data-preview-tab;
    left: 285px;
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
    li.active1 {
      background: #3385FF;
      color: #ffffff;
    }
    .active1 {
      background: #3385FF;
      color: #ffffff;
    }
    .active2 {
      color: #515a6e;
    }
  }
  .real-time-data-preview-select2 {
    @extend .real-time-data-preview-select;
    left: 60px;
    top: 70px;
  }
  .real-time-data-preview-timePicker{
     @extend .real-time-data-preview-tab;
     left: 490px;
     .el-input{
       width:45px!important
     }
  }
  .real-time-data-preview-search {
    position: absolute;
    right: 55px;
    top: 12px;
  }
  .real-time-data-preview-date {
    position: absolute;
    right: 50px;
    top: 60px;
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
