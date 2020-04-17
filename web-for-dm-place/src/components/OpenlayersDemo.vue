<template>
	<div class="time-image-wrap">
		<div id='map'></div>
		<div class="timelineDiv">
			<div class="timeline">
				<!-- <div id="totalSize"
					style="width: 30%;position: absolute; font-size: 12px; color: #003366; margin-left: 10px; margin-top: 3px;font-weight:bold;">
					<span></span>
				</div> -->
				<!-- <div id="timeLineClose"
					style="float: right; margin-right: 10px; margin-top: 3px;color: #003366;">
					<i class="el-icon-refresh" id="cyclePlayTimeLine" title="循环播放" style='font-weight:bold;'></i> -->
					<!-- <i class="el-icon-close" style='font-weight:bold;'></i> -->
				<!-- </div> -->
				<div class="timelineBox">
					<div id="playTimeLine" style="margin-left: -5px;float: left;"><img src="../../static/images/timeline/play.png" title="播放"/></div>
					<div class="LeftBtn1">
						<img class="LeftBtn1img" src="../../static/images/timeline/zuo.png">
					</div>
					<input type="hidden" class="single-slider" />
					<div class="RightBtn1">
						<img src="../../static/images/timeline/you.png">
					</div>
				</div>
				<!-- <div style="float: left;margin-left: 9px;margin-top: 6px;">
					<div class="firstLable">
						<span></span>
					</div>
					<div class="lastLable">
						<span></span>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import Map from 'ol/map';
import Tile from 'ol/layer/tile';
import View from 'ol/view';
import proj from 'ol/proj';
import XYZ from 'ol/source/xyz';
import WMTSTileGrid from 'ol/tilegrid/wmts';
import extent from 'ol/extent';
import $ from 'jquery';
import '../../static/jquery.range';
import '../../static/jquery.range.css';
import { getTimeImageInfo, getTileLayersInfo } from '../api/imageApi';
import UrlSetting from '../api/UrlSetting';

const previewTile = UrlSetting.URLS.previewTile;

export default {
	data() {
		return {
			map: null,
			layer: null,
			oldArray: [],
			pirorDate: null,
			freshMake: false,
			playTime: null,
			jRangeObj: null,
			layerName: 'world123',
			lon: '113.562927',
			lat: '22.163544',
			minLevel: 10,
			maxLevel: 10,
			gridSet: 'EPSG:3857',
			clickBtn: '暂停',
			extentVal: [],
		}
	},
	mounted() {
		const id = this.$route.params.id;
		getTileLayersInfo(id).then(res => {
			this.layerName = res.layerName;
			this.lon = (res.minX + res.maxX) / 2;
			this.lat = (res.minY + res.maxY) / 2;
			this.minLevel = res.minLevel;
			this.maxLevel = res.maxLevel;
			if(res.gridSet === 'EPSG:4490'){
				this.gridSet = 'EPSG:4326';
			}else{
				this.gridSet = res.gridSet;
			}
			// 设置图层的范围
			this.extentVal = [res.minX, res.minY, res.maxX, res.maxY];
			// 初始化地图
			this.map = new Map({
				layers: [],
				target: 'map',
				view: new View({
					center: [this.lon, this.lat],//视图的初始中心。使用projection选项指定中心的坐标系。默认为undefined，如果未设置，则不会获取图层源
					// constrainRotation: false,//旋转约束
					zoom: this.minLevel,//用于计算视图初始分辨率的缩放级别。
					projection: proj.get(this.gridSet),//投影。默认为EPSG:3857（球形墨卡托）。
					// extent: [-180, -90, 180, 90],//限制中心的程度，换句话说，中心不能设置在这个范围之外。默认是undefined。
					// rotation: 0, // 以弧度为单位的视图的初始旋转（顺时针正向旋转）。默认是0。
				})
			});
			this.map.getView().fit(this.extentVal);
			// 初始化加载
			this.measureExtent();
		})
	},
	methods: {
		// 请求时间信息
		measureExtent() {
			getTimeImageInfo(this.layerName, this.lon, this.lat, this.minLevel).then(data => {
				var r = data.timepojo;
        var a = [];
        if (r != null && r.length > 0) {
            // if (r.length == 1) {
            //   var i = item["year"] + "/" + item["month"] + "/" + item["day"];
            //   a.push("0");
            //   a.push(i)
            // } else {
              r.forEach(function(e) { // 时间格式转为2018/12/16
                var i = e["year"] + "/" + e["month"] + "/" + e["day"];
                a.push(i)
              })
            // }
            a = $.unique(a); // 去重
            // a.sort(function(e, r) { // 排序
            //   if (new Date(e) < new Date(r)) return - 1;
            //   else if (new Date(e) > new Date(r)) return 1;
            //   else return 0;
            // });
            this.sortArr(a);
            if (this.oldArray.length > 0) {
              // var n = this.oldArray.join(",");
              // var t = a.join(",");
              // if (n == t) {
              //   return;
              // } else {
                if (this.oldArray[this.oldArray.length - 1] != a[a.length - 1]) {
                  this.freshMake = true
                }
                this.oldArray = a;
              // }
            } else {
              this.oldArray = a; // 将时间数组赋值为一个【】空数组
              this.freshMake = true
            }
            this.initTimeLine(a) // 初始化时间轴
        } else {
          a.push(0);
          a.push(1);
          this.oldArray = a;
          this.initTimeLine(a)
        }
			});
		},
		// 初始化时间轴
		initTimeLine(e) {
			// e 时间数组
			$(".timelineBox").find("input").remove();
			$(".timelineBox div").each(function() {
				$(this).remove()
			});
			$(".timelineBox").append('<div class="LeftBtn1"><img class="LeftBtn1img" src="./static/images/timeline/zuo.png" style="vertical-align: middle;margin-left: 10px;"><img id="pauseTimeLine" src="../../static/images/timeline/'+this.clickBtn+'.png" title="暂停" style="margin-left: 10px;"/></div>' + '<div class="RightBtn1"><img src="./static/images/timeline/you.png"></div> ');
			$(".timelineBox").append('<input type="hidden" class="single-slider" />');
			$(".single-slider").val(0);			
			var r = Math.round(440 / (e.length - 1));
			this.jRangeObj = $(".single-slider").jRange({
				from: 0,
				to: e.length - 1,
				step: r,
				scale: e,
				format: "%s",
				width: 440,
				showLabels: true,
				showScale: true,
				onstatechange: (val) => {
					this.changeHistoryWp(val);
					if (val === e[e.length - 1]) {
						this.clickBtn = 'play';
						$('#pauseTimeLine').attr('src', '../../static/images/timeline/play.png');
						$('#pauseTimeLine').attr('title', '播放');
						clearInterval(this.playTime);
					}
				}
			});
			$(".slider-container").css('margin-left', '78px');
			$(".firstLable span").html(e[0]);
			$(".lastLable span").html(e[e.length - 1]);
			if (e[1] == 1) {
				// $("#totalSize span").html(0 + "个版本");
				$(".firstLable").parent().css("margin-left", "15%");
				return
			} else {
				// $("#totalSize span").html(e.length + "个版本")
			}
			if (this.pirorDate != null) {
				var i = this.getIndex(e, this.pirorDate);
				if (i > 0) {
					this.jRangeObj.setValue(i)
				} else {
					this.pirorDate = null;
					this.changeHistoryWp(e[0])
				}
			} else {
				if (this.freshMake) {
					this.changeHistoryWp(e[0])
				}
			}
			if (this.freshMake) {
				this.freshMake = false
			}
			// 初始化播放按钮被点击
			this.autoPlay(false, e);
			// 点击左边按钮
			$(".LeftBtn1img").click(() => {
				clearInterval(this.playTime);
				this.leftButClick(e);
			});
			// 点击右边按钮
			$(".RightBtn1").click(() => {
				clearInterval(this.playTime);
				this.rightButClick(e);
			});
			// 点击播放按钮
			$("#playTimeLine").click(() => {
				clearInterval(this.playTime);
				this.autoPlay(false, e);
			});
			// 点击暂停按钮
			$("#pauseTimeLine").click(() => {
				if (this.clickBtn === '暂停') {
					this.clickBtn = 'play';
					$('#pauseTimeLine').attr('src', '../../static/images/timeline/play.png');
					$('#pauseTimeLine').attr('title', '播放');
					clearInterval(this.playTime);
				} else {
					this.clickBtn = '暂停';
					$('#pauseTimeLine').attr('src', '../../static/images/timeline/暂停.png');
					$('#pauseTimeLine').attr('title', '暂停');
					clearInterval(this.playTime);
					this.autoPlay(true, e);
				}				
			});
			// 点击循环按钮
			$("#cyclePlayTimeLine").click(() => {
				clearInterval(this.playTime);
				this.autoPlay(true, e);
			})
		},
		// 获取索引
		getIndex(e, r) {
			var a = 0;
			for (var i = 0; i < e.length; i++) {
				if (e[i] == r) {
					a = i;
					break
				}
			}
			return a
		},
		// 排序
		sortArr(e) {
			e.sort(function(e, r) { // 排序
				if (new Date(e) < new Date(r)) return - 1;
				else if (new Date(e) > new Date(r)) return 1;
				else return 0;
			});
		},
		// 去重
		// unique(e) {
		// 	var r = [],
		// 	a = {};
		// 	for (var i = 0, n; (n = e[i]) != null; i++) {
		// 		if (!a[n]) {
		// 			r.push(n);
		// 			a[n] = true
		// 		}
		// 	}
		// 	return r
		// },
		// 改变历史..
		changeHistoryWp(e) {
			if (e.indexOf("/") > -1) {
				const r = e.split("/");
				const a = Number(r[0]);
				const i = Number(r[1]);
				const n = Number(r[2]);
				this.updateLayers(a, i, n)
			}
		},
		// 更新图层(参数为 年月日)
		updateLayers(e, r, a) {
      var i = previewTile+"/service/time?request=gettile" + "&yy=" + e + "&dd=" + a + "&mm=" + r;
      if (this.layer) {
        this.map.removeLayer(this.layer)
      }
      const projection = proj.get(this.gridSet);// 经纬度空间参考坐标系
      const projectionExtent = projection.getExtent();
      const size = extent.getWidth(projectionExtent) / 256;
      let resolutions = [];
      let matrixIds = [];
      // let url, index, layer, matrixSet;      
      const forMin = this.minLevel;
      const forMax = this.maxLevel;
      const is3857 = this.gridSet.indexOf(3857) > -1;
      for (let z = forMin; z <= forMax; z += 1) {
        resolutions.push(size / Math.pow(2, is3857 ? z : (z + 1)));
        matrixIds.push(`${this.gridSet}:${z}`);
      }
      this.layer = new Tile({
        source: new XYZ({
          projection: this.gridSet,//	投影。默认是EPSG:3857。
          reprojectionErrorThreshold: 0.5,//允许的最大重投影误差（以像素为单位）。默认是0.5。较高的值可以提高重投影性能，但会降低精度。
          tilePixelRatio:1,//tile服务使用的像素比率。默认是1
          url: i + "&layer="+this.layerName+"&zoo={z}&row={x}&col={y}",
          // url: "http://192.168.4.98:8310/geoserverplus/gwc/service/tms/1.0.0/icenter:World3857-PNG-3857@EPSG:3857@png/{z}/{x}/{y}.png",
          // url: "http://192.168.4.98:8310/geoserverplus/gwc/service/tms/1.0.0/icenter:World0426-PNG-4326@EPSG:4326@png/{z}/{x}/{y}.png",
          // url: "http://t6.tianditu.gov.cn/DataServer?T=cva_w&x=0&y=0&l=1&tk=2ce94f67e58faa24beb7cb8a09780552",
          tileUrlFunction: (xyz) => {
            let z = xyz[0] + this.minLevel;
            let x = Math.abs(xyz[1]);
            // let x = Math.abs(xyz[1]) * 2;
            let y = Math.abs(xyz[2]) - 1;
            // let y = Math.pow(2,z) - (Math.abs(xyz[2]) - 1) - 1;
            // let y = (Math.abs(xyz[2]) - 1) * 2;
            var url = i + "&layer="+this.layerName+"&zoo="+z+"&row="+x+"&col="+y+"";
            return url;
          },
          tileGrid: new WMTSTileGrid({
            origin: extent.getTopLeft(projectionExtent),
            // extent: [113.510828, 22.097712, 113.615026, 22.229376],
            // minZoom: 10,
            resolutions,
            matrixIds,
          }),
        })
      });
    //   this.layer.setExtent([-180, -90, 180, 90]);
      // this.layer.setExtent(projectionExtent);
      this.layer.setExtent(this.extentVal);
      this.map.addLayer(this.layer)
		},
		// 初始化自动播放
		autoPlay(e, r) {
			this.playTime = setInterval(() => {
				var a = $(".single-slider").val();
				var i = this.getIndex(r, a);
				if (i > r.length - 2) {
					if (e == true) {
						i = -1;
						$(".single-slider").val(r[0]);
						/* eslint-disable */
						e = false;
					} else {
						return
					}
				}
				this.jRangeObj.setValue(i + 1);
				var n = r[i + 1];
				this.pirorDate = n;
				this.changeHistoryWp(n)
			}, 2e3)
		},
		// 上一个时间
		leftButClick(e) {
			clearInterval(this.playTime);
			var r = $(".single-slider").val();
			var a = this.getIndex(e, r);
			if (a < 1) {
				return;
			}
			this.jRangeObj.setValue(a - 1);
			var i = e[a - 1];
			this.pirorDate = i;
			this.changeHistoryWp(i)
		},
		// 下一个时间
		rightButClick(e) {
			var r = $(".single-slider").val();
			var a = this.getIndex(e, r);
			if (a > e.length - 2) {
				return;
			}
			this.jRangeObj.setValue(a + 1);
			var i = e[a + 1];
			this.pirorDate = i;
			this.changeHistoryWp(i)
		}
	}
}
</script>

<style lang='scss' scoped>
.time-image-wrap {
	width: 100%;
	height: 100%;
}
#map {
	width: 100%;
	height: 100%;
}
.timelineDiv {
	position: absolute;
	top: 8px;
	left: 60px;
}

#autoPlayTimeLine {
	width:300px;
	height:30px;
	line-height:30px;
	position:absolute;
	top:40px;
	left:85px;
	z-index:9999;
	border-radius:5px;
}

#autoPlayTimeLine div {
	display:inline-block;
	width:30px;
	height:30px;
	line-height:30px;
	color:#eee;
	margin-left:20px;		
	cursor:pointer;	
}
.slider-container {
  width: 300px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.slider-container .back-bar {
  height: 10px;
  position: relative;
}
.slider-container .back-bar .selected-bar {
  position: absolute;
  height: 100%;
}
.slider-container .back-bar .pointer {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  cursor: col-resize;
  opacity: 1;
  z-index: 2;
}
.slider-container .back-bar .pointer.last-active {
  z-index: 3;
}
.slider-container .back-bar .pointer-label {
  position: absolute;
  top: -17px;
  font-size: 8px;
  white-space: nowrap;
  line-height: 1;
}
.slider-container .back-bar .focused {
  z-index: 10;
}
.slider-container .clickable-dummy {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.slider-container .scale {
  top: -10px;
  position: relative;
}
.slider-container .scale span {
  position: absolute;
  height: 5px;
  border-left: 1px solid #999;
  font-size: 0;
}
.slider-container .scale ins {
  font-size: 9px;
  text-decoration: none;
  position: absolute;
  left: 0;
  top: 5px;
  color: #999;
  line-height: 1;
}
.slider-container.slider-readonly .clickable-dummy,
.slider-container.slider-readonly .pointer {
  cursor: auto;
}
.theme-green .back-bar {
  height: 5px;
  border-radius: 2px;
  background-color: #eeeeee;
  background-color: #e7e7e7;
  background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
  background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
  background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0);
}
.theme-green .back-bar .selected-bar {
  border-radius: 2px;
  background-color: #a1fad0;
  background-image: -moz-linear-gradient(top, #bdfade, #76fabc);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#bdfade), to(#76fabc));
  background-image: -webkit-linear-gradient(top, #bdfade, #76fabc);
  background-image: -o-linear-gradient(top, #bdfade, #76fabc);
  background-image: linear-gradient(to bottom, #bdfade, #76fabc);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffbdfade', endColorstr='#ff76fabc', GradientType=0);
}
.theme-green .back-bar .pointer {
  width: 14px;
  height: 14px;
  top: -5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #AAA;
  background-color: #e7e7e7;
  background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
  background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
  background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0);
}
.theme-green .back-bar .pointer-label {
  color: #fff;
}
.theme-green .back-bar .focused {
  color: #FFEEEE;
}
.theme-green .scale span {
  border-left: 1px solid #e5e5e5;
}
.theme-green .scale ins {
  color: #999;
}
.theme-blue .back-bar {
  height: 5px;
  border-radius: 2px;
  background-color: #eeeeee;
  background-color: #e7e7e7;
  background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
  background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
  background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0);
}
.theme-blue .back-bar .selected-bar {
  border-radius: 2px;
  background-color: #92c1f9;
  background-image: -moz-linear-gradient(top, #b1d1f9, #64a8f9);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#b1d1f9), to(#64a8f9));
  background-image: -webkit-linear-gradient(top, #b1d1f9, #64a8f9);
  background-image: -o-linear-gradient(top, #b1d1f9, #64a8f9);
  background-image: linear-gradient(to bottom, #b1d1f9, #64a8f9);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0);
}
.theme-blue .back-bar .pointer {
  width: 14px;
  height: 14px;
  top: -5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #AAA;
  background-color: #e7e7e7;
  background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
  background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
  background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
  background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0);
}
.theme-blue .back-bar .pointer-label {
  color: #fff;
}
.theme-blue .back-bar .focused {
  color: #FFEEEE;
}
.theme-blue .scale span {
  border-left: 1px solid #e5e5e5;
}
.theme-blue .scale ins {
  color: #999;
}
.container{
	position: absolute;
	left: 5%;
	top: 2%;
	width: 460px;
	height: 85px;
	z-index: 400000;
	display: none;
}

.timelineDiv{
	width:515px;
	border-radius:6px;
	left: 50%;
    transform: translate(-50%);
}
.LeftBtn1{
	float: left;
  margin-left: 16px;
  margin-top: 0px;
	z-index:4500;
}

.RightBtn1{
	float: left;
  margin-left: 20px;
  margin-top: 0px;
  z-index: 4500;
}

.firstLable{
	float: left;
	width: 50px;
	height: 12px;				
	font-size:13px;
	color:#003366;
	font-weight:bold;
}
.lastLable{						
	width: 50px;
	height: 12px;
	margin-left:465px;
	font-size:13px;
	color:#003366;
	font-weight:bold;
}
.timeline{
	float: left;
	background-color:rgba(229,229,229,1);
	width: 585px;
	height: 90px;
	border-radius:4px;
}
.timelineBox{
	float: left;
	margin-left: 47px;
  margin-top: 40px;
}
</style>