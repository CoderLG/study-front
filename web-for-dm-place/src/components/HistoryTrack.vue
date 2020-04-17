<template>
  <div>
    <div class="real-time-data-preview-timePicker1">
      <div class="triangle"></div>
      <el-date-picker
        v-model="timeValue"
        type="datetimerange"
        size='mini'
        value-format="timestamp"
        :picker-options="pickerOptions"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-select style="width: 78px" v-model="selectValue" size='mini'
       v-show='currentType === "单目标"' filterable placeholder="选择">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button icon="el-icon-caret-right" size='mini' @click="startBtn()"></el-button>
    </div>
    <div class="processcontainer" v-show='currentType === "单目标"'>
      <el-progress style="width:100%;height:100%;" :stroke-width="12" :text-inside="true"
       :percentage="percentage" color="#666666"></el-progress>
      <p v-if='format(newTimePoint) !== "NaN-NaN-NaN NaN:NaN:NaN"'
       v-bind:style="{ left: percentage+'%', position: 'absolute', color: '#ffcc00', top: '-15px', width: '120px' }">{{format(newTimePoint)}}</p>
      <div class="dateValue">
        <ul>
          <li>
            <div v-if="timeValue">{{format(timeValue[0])}}</div>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            <div v-if="timeValue">{{format(timeValue[1])}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import UrlSetting from '../api/UrlSetting';
import { getTrackData, getTargetHeatMapData, getTaskInfo } from '../api/realTimeTaskApi';
import arc from './arc';
const geoLotUrl = UrlSetting.URLS.geoLotUrl;
let choiceDate = '';

export default {
  data() {
    return {
      percentage: 0,
      selectOptions: [{
        value: '1',
        label: '1倍速'
      }, {
        value: '2',
        label: '2倍速'
      }, {
        value: '4',
        label: '4倍速'
      }, {
        value: '8',
        label: '8倍速'
      }],
      selectValue: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          choiceDate = minDate.getTime();
          if (maxDate) {
            choiceDate = '';
          }
        },
        disabledDate(time) {
          if (Boolean(choiceDate)) {
            const one = 30 * 24 * 3600 * 1000;
            const minTime = choiceDate - one;
            const maxTime = choiceDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime;
          }
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      timeValue: '',
      allPointData:null,
      allPointDataWithTime:null,
      newtrack:[],
      vector: null,
      level: 10,
      value1:null,
      value11:null,
      value2:null,
      value21:null,
      lines_arr:[],
      lines_arr1:[],
      lines_arr2:[],
      startTime:null,
      endTime:null,
      targetId:null,
      targetName:null,
      sourceId:null,
      move_key:false,
      time : 45,
      animating :false,
      layer : null,
      isStart:false,
      data_c : null,// 数据层
      p_data : null,// marker
      line_style :new ol.style.Style({
        stroke: new ol.style.Stroke({
          width: 5,
          color: [34, 139, 34, 0.6],
        })
      }),
      pathIndex:0,
      now:null,
      speed:1000,
      elapsedTime:null,
      geoMarker:new ol.style.Style({
        // 设置一个标识
        image: new ol.style.Icon({
          src: '../../static/images/user.png',
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
          text: "success",
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
      bartimer:null,
      heatmapLayer: null,// 热力图图层
      iconUrl: null,
      newTimePoint: null,
      iconId: null,// icon的id 用于绘图
    }
  }, 
  props: ['lasterDate', 'currentType'],
  methods: {    
    popupSH(){
      this.isStart = false;
    },
    removeHeatMap() {
      this.$parent.map.removeLayer(this.heatmapLayer);
    },
    async init(lon, lat, targetName, targetId, sourceId, targetType, stId) {
      // 根据任务ID 获取此条任务的详情参数
      const taskInfo = await getTaskInfo(stId);
      this.iconId = taskInfo.data.iconId;
      this.sourceId = sourceId
      this.isStart = false;
      this.animating = false;
      this.$parent.map.getView().setMinZoom(0);
      this.$parent.map.getView().setCenter([parseFloat(lon), parseFloat(lat)]);
      if(this.layer){
        this.$parent.map.removeLayer(this.layer);
      }
      this.targetName = targetName;
      this.targetId = targetId;
      this.lines_arr[0] = [];
      this.lines_arr[0][0] = parseFloat(lon);//openlayer不能接收字符串，会有意外报错
      this.lines_arr[0][1] = parseFloat(lat);
      // 根据targetType获取匹配的目标图标
      // await getTargetManagerList(1, 1000).then(res => {
        // res.data.forEach((val) => {
          // if (val.tmId === targetType) {// targetType
            this.iconUrl = `../../static/images/${this.iconId}.png`;
            // this.iconUrl = `../../static/images/1.png`;
          // }
        // })
      // });
      // 没有匹配的targetType 使用默认icon
      // if (!this.iconUrl) {
      //   this.iconUrl = '../../static/images/defaulticon.png';
      // }
      this.historyLayer();
      this.historyPoint();
    },
    // 绘制热力图
    renderHeatMapRealTime() {
      const pixelRange = this.$parent.map.getSize();
      const leftTop = this.$parent.map.getCoordinateFromPixel([0, 0]);
      const rightBottom = this.$parent.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
      const minlon = leftTop[0];
      const maxlon = rightBottom[0];
      const minLat = rightBottom[1];
      const maxLat = leftTop[1];
      this.$parent.map.removeLayer(this.heatmapLayer);
      let heatPoints = [];
      // 第二份数据
      getTargetHeatMapData(this.sourceId, this.targetId, this.timeValue[0], this.timeValue[1], minlon, maxlon, minLat, maxLat)
      .then(res => {
        res.track.forEach((val, index) => {
          heatPoints[index] = new ol.Feature({
            geometry: new ol.geom.Point([val.lon, val.lat]),
            Properties: { "value": '1' },// 当前权值除以最大权值，将范围控制在0-1之间
          })
        })
        // 绘制热力图
        this.vectorSource = new ol.source.Vector({
          features: heatPoints,
        });
        this.heatmapLayer = new ol.layer.Heatmap({
          source: this.vectorSource,
          blur: 20,
          radius: 10
        });
        // 设置热力图的权值
        this.heatmapLayer.getSource().getFeatures().forEach((feature) => {
          feature.set('weight', feature.N.Properties.value);
        });
        this.$parent.map.addLayer(this.heatmapLayer);
      });
    },
    // 刷新热力图数据
    refreshHeatMap(sourceId, targetId, minlon, maxlon, minLat, maxLat) {
      let heatPoints = [];
      getTargetHeatMapData(sourceId, targetId, this.timeValue[0], this.timeValue[1], minlon, maxlon, minLat, maxLat).then(res => {
        res.track.forEach((val, index) => {
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
    },
    bestFit(data_c) {
      var that = this;
      var point_arr = [];
      data_c.getFeatures().forEach(function(ele) {
        point_arr.push(that.one(ele.getGeometry()));
      })
      // 假设第一个点为最合适的点
      var fit_point = point_arr[0];
      point_arr.forEach(function(point) {
        that.firstPointEach(fit_point,point);
      });
      
      // 没有数据
      if (data_c.getFeatures().length == 0) {
        return;
      }
      // 单个DOM
      else if (data_c.getFeatures().length == 1) {
        //定位中心点
        that.$parent.map.getView()
          .centerOn(
            [fit_point[0], fit_point[1]],
            that.$parent.map.getSize(), [document.body.style.width / 2, document.body.style.height / 2]);
        that.$parent.map.getView().setZoom(12);
      }
      // 多个dom
      else {
        that.$parent.map.getView()
          .fit(fit_point, {
            size: this.$parent.map.getSize(),
            padding: [100, 100, 100, 100],
            constrainResolution: false
          });
      }
    },
    firstPointEach(fit_point,point) {
      // 最小经度
      if (point[0] < fit_point[0]) {
        fit_point[0] = point[0];
      }
      // 最小纬度
      if (point[1] < fit_point[1]) {
        fit_point[1] = point[1];
      }
      // 最大经度
      if (point[2] > fit_point[2]) {
        fit_point[2] = point[2];
      }
      // 最大纬度
      if (point[3] > fit_point[3]) {
        fit_point[3] = point[3];
      }
    },
    // 单个点的最小经纬度/最大经纬度
    one(dom) {
      // 4点数组
      var that = this;
      var one_p = null;
      // 类型
      var type = dom.getType();
      // 每个类型的坐标值
      var path = dom.getCoordinates();
      if (type == 'Point') {
        one_p = [path[0], path[1], path[0], path[1]];
      }
      // 多边形
      else if (type == 'Polygon') {
        var line_path = path[0];
        one_p = [line_path[0][0], line_path[0][1], line_path[0][0], line_path[0][1]];
        line_path.forEach(function(p) {
          that.PolygonEach(one_p,p)
        });
      }
      // 线
      else if (type == 'LineString') {
        one_p = [path[0][0], path[0][1], path[0][0], path[0][1]];
        path.forEach(function(p) {
          that.PolygonEach(one_p,p);
        });
      }
      // 圆
      else if (type == 'Circle') {
        path = dom.getCenter();
        one_p = [path[0], path[1], path[0], path[1]];
      }
      return one_p;
    },
    PolygonEach(one_p,p) {
      // 最小经度
      if (p[0] < one_p[0]) {
        one_p[0] = p[0];
      }
      // 最小纬度
      if (p[1] < one_p[1]) {
        one_p[1] = p[1];
      }
      // 最大经度
      if (p[0] > one_p[2]) {
        one_p[2] = p[0];
      }
      // 最大纬度
      if (p[1] > one_p[3]) {
        one_p[3] = p[1];
      }
    },
    LineStringEach(one_p,p) {
      // 最小经度
      if (p[0] < one_p[0]) {
        one_p[0] = p[0];
      }
      // 最小纬度
      if (p[1] < one_p[1]) {
        one_p[1] = p[1];
      }
      // 最大经度
      if (p[0] > one_p[2]) {
        one_p[2] = p[0];
      }
      // 最大纬度
      if (p[1] > one_p[3]) {
        one_p[3] = p[1];
      }
    },
    point_rotation(new_p, old_p) {
      // 90度的PI值
      var pi_90 = Math.atan2(1, 0);
      // 当前点的PI值
      var pi_ac = Math.atan2(new_p[1] - old_p[1], new_p[0] - old_p[0]);
      return pi_90 - pi_ac;
    },
    historyLayer() {
      // 矢量容器层
      this.layer = new ol.layer.Vector();
      // 注入数据层--可以注入多个Feature，每个feature有自己的数据和样式
      this.data_c = new ol.source.Vector();
      // 
      this.layer.setSource(this.data_c);
      // 打到地图上
      this.$parent.map.addLayer(this.layer);
    },
    historyPoint() {
      // 创建一个活动图标需要的Feature，并设置位置，第一个点
      this.p_data = new ol.Feature({
        // 就一个参数啊，定义坐标
        geometry: new ol.geom.Point(this.lines_arr[0])
      });
      this.p_data.setStyle(
        new ol.style.Style({
          // 设置一个标识
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
            text: this.targetName,
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
      //this.p_data = null;
    },
    historyLine() {
      var line_data = new ol.Feature({
        geometry: new ol.geom.LineString(this.allPointData)
      });
      line_data.setStyle(this.line_style);
      // 注入数据层
      this.data_c.addFeature(line_data);
      line_data = null;
    },
    //点击marker选择时间--点击开始按钮--请求数据渲染linestring--开始动画
    startBtn() {
      if (this.layer) {
        this.$parent.map.removeLayer(this.layer);
      }
      if (!this.timeValue) {
        this.$message.warning({ message: '请输入时间', showClose: true }); 
      } else if (this.currentType === '热力图') {
        this.renderHeatMapRealTime();
        // 先不刷新
        // this.$parent.map.on("moveend", () => {
        //   console.log('00000000')
        //   var zoom = this.$parent.map.getView().getZoom();
        //   this.level = zoom;
        //   const visibleArea = this.getVisibleArea();
        //   const minlon = visibleArea[0];
        //   const maxlon = visibleArea[1];
        //   const minLat = visibleArea[2];
        //   const maxLat = visibleArea[3];
        //   // 刷新                    
        //   this.refreshHeatMap(this.sourceId, this.targetId, minlon, maxlon, minLat, maxLat);
        // });
      } else if (this.currentType === '单目标') {
        this.isStart = false;
        this.animating = false;
        this.$parent.map.removeLayer(this.heatmapLayer); 
        this.historyLayer();
        this.historyPoint();
        this.percentage = 0;
        this.getTrackData();
      }
    },
    // 实时获取当前可视区域
    getVisibleArea() {
      const pixelRange = this.$parent.map.getSize();
      let leftTop = this.$parent.map.getCoordinateFromPixel([0, 0]);
      let rightBottom = this.$parent.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
      // 判断当前的投影 为3857时转换坐标
      if (this.$parent.map.getView().getProjection().wb === 'EPSG:3857') {
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
    equals(arr){
      var bool=true;
      for(var i=1,len=arr.length;i<len;i++){
          if(arr[i].join('')!==arr[0].join('')){bool=false}
      }
      return bool;
    },
    getTrackData() {
      const total = this.timeValue[1] - this.timeValue[0];
      getTrackData(this.sourceId, this.targetId, this.timeValue[0], this.timeValue[1]).then(res => {
        this.newtrack = res.track;
        const prevNum = res.track[0].targetTime - this.timeValue[0];
        // 计算时间是从哪里开始的
        this.percentage = prevNum/total*100;
        this.lines_arr1 = [];
        for(var i=0; i<res.track.length; i++){
            this.lines_arr1[i] = [];
            this.lines_arr1[i][0] = res.track[i].lon;
            this.lines_arr1[i][1] = res.track[i].lat;
        }
        var HistoryData = [];
        for(let i = 0;i<this.lines_arr1.length-1;i++){
            HistoryData[i] = [this.lines_arr1[i],this.lines_arr1[i+1]];
        }
        this.allPointData = [];
        this.allPointDataWithTime = [];
        console.log(HistoryData)
        for (let i = 0; i < HistoryData.length-1; i++) {
          var flight = HistoryData[i];
          var from = flight[0];
          var to = flight[1];
          // create an arc circle between the two locations
          var arcGenerator = new arc.GreatCircle(
            {x: from[0], y: from[1]},
            {x: to[0], y: to[1]});
          //进行距离计算,咱不
          var arcLine = arcGenerator.Arc(100, {offset: 10});
          if (arcLine.geometries.length === 1) {
            this.allPointData = this.allPointData.concat(arcLine.geometries[0].coords);
            for(let j = 0; j < arcLine.geometries[0].coords.length - 1; j++){
              let q = res.track[i].targetTime;
              arcLine.geometries[0].coords[j].push(q)
            }
            this.allPointDataWithTime = this.allPointDataWithTime.concat(arcLine.geometries[0].coords);
          }
        }
        if(this.equals(this.lines_arr1)){
            this.$message.warning({ message: '数据无法绘制历史轨迹', showClose: true });
            this.isStart = false;
            return;
        }
        this.isStart=false;
        this.historyLine();
        this.bestFit(this.data_c);
        this.startAnimation() 
        //开始进度条
        const endNum = res.track[res.track.length - 1].targetTime - this.timeValue[0];
        const endPercent = endNum/total*100;
        window.clearInterval(this.bartimer)
        this.bartimer = setInterval(()=>{
          this.percentage += 100/(this.allPointData.length/this.speed);
          if (this.percentage > endPercent) {
            // this.percentage = 100;
            window.clearInterval(this.bartimer);
            return;
          }
        }, 1000);        
      })
    },
    //计算两点之间的距离
    getFlatternDistance(lat1,lon1,lat2,lon2){
      var EARTH_RADIUS = 6378137.0;    //单位M
      var PI = Math.PI;
      
      function getRad(d){
          return d*PI/180.0;
      }
      var f = getRad((lat1 + lat2)/2);
      var g = getRad((lat1 - lat2)/2);
      var l = getRad((lon1 - lon2)/2);
      
      var sg = Math.sin(g);
      var sl = Math.sin(l);
      var sf = Math.sin(f);
      
      var s,c,w,r,d,h1,h2;
      var a = EARTH_RADIUS;
      var fl = 1/298.257;
      
      sg = sg*sg;
      sl = sl*sl;
      sf = sf*sf;
      
      s = sg*(1-sl) + (1-sf)*sl;
      c = (1-sg)*(1-sl) + sf*sl;
      
      w = Math.atan(Math.sqrt(s/c));
      r = Math.sqrt(s*c)/w;
      d = 2*w*a;
      h1 = (3*r -1)/2/c;
      h2 = (3*r +1)/2/s;
      
      return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    },
    startAnimation() {
      if (this.animating) {
        this.stopAnimation(false);
      } else {
        this.animating = true;
        this.now = new Date().getTime();
        this.$parent.map.on('postcompose', this.moveFeature);
        this.$parent.map.render();
      }
    },
    moveFeature : function(event) {
      //var vectorContext = event.vectorContext;
      //当前祯属性
      var frameState = event.frameState;
      if (this.animating) {
        // 所需时间（经过的总时间）每次刷新当前祯，frameState.time当前祯所需总时间
        var elapsedTime = frameState.time - this.now;
        this.elapsedTime = elapsedTime;
        // 求整，speed即index与index+1之间的时长
        // 计算速度  选择总时长大于
        if(this.timeValue[1]-this.timeValue[0]<3600000){
          this.speed = this.allPointData.length/(this.timeValue[1]-this.timeValue[0])*1000;//当前真实的时间间隔。
        }else{
          this.speed = this.allPointData.length/3600;//超过一个小时，都按一个小时算
        }
        var index = Math.round(this.speed * this.selectValue * elapsedTime/1000);
        if (index >= this.allPointData.length) {
          this.stopAnimation();
          return;
        }
        
        var old_p = this.allPointData[index];
        var new_p = this.allPointData[index+1];
        this.p_data.setGeometry(new ol.geom.Point(new_p));
        // 改变出租车方向
        this.p_data
        .getStyle()
        .getImage()
        .setRotation(this.point_rotation(new_p, old_p));
        this.newTimePoint = this.allPointDataWithTime[index][2];
        this.p_data
        .getStyle()
        .getText()
        .setText(this.format(this.newTimePoint));  
      }
      //开始渲染动画
      this.$parent.map.render();
    },
    stopAnimation(){
      this.animating = false; 
      this.$parent.map.un('postcompose', this.moveFeature);
    },
    // 时间戳转换
    add0(m){return m<10?'0'+m:m },
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    },
    clearLayer() {
      this.$parent.map.removeLayer(this.layer);
      this.$parent.map.un('postcompose', this.moveFeature);
      window.clearInterval(this.bartimer)
    },
  },
};
</script>

<style lang="scss">
.real-time-data-preview-timePicker1{
  position: absolute;
  height: 40px;
  line-height: 40px;
  padding: 0px 5px;
  background: rgba(255,255,255,1);
  top: 12px;
  box-shadow:0px 0px 4px 0px rgba(1,1,1,0.15);
  left: 490px;
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:380px;
  }
  .triangle{
    position: absolute;
    width: 13px;
    height: 13px;
    left: -6px;
    top: 15px;
    background: #fff;
    transform: rotate(45deg);
  }
  .el-input__suffix{
    line-height: 25px;
  }
}
.processcontainer{  
   position:absolute;
   bottom:50px;
   left:20%;
   width:60%;
} 
.dateValue ul{ 
  display:flex;
  justify-content: space-around;
} 
.dateValue ul li{
  width:2px;
  height:12px;
  background:#889093;
  position: relative;  
} 
.dateValue ul li div{
  position: absolute;
  bottom:-15px;
  left:-60px;
  width:130px;
  color:#ddd;
}
.processcontainer {
  .el-progress-bar__outer{
    background: rgba(39,70,100,0.4)
  }
  .el-progress-bar__innerText{
    background: #FFCC00;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    color: transparent;
    margin:0;
    margin-top: -3px;
  }
}

</style>