<template>
  <div id="olMap" class="open-layers-map">
    <!--设置底图-->
    <base-map v-if="isShowBaseMapButton" class="base-layer" ref="baseLayer" @changeMap="changeMap"></base-map>
    <!--默认提供的界面-->
    <ul class="GCPlugin-controller">
      <li>
        <!--复位-->
        <div v-show='isResetPlugin' class="GCPlugin-reset" @click='flyTo([-90, -45, 90, 45])'>
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
    </ul>
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
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import VectorTile from 'ol/layer/vectortile';
import Vector from 'ol/layer/vector';
import ImageLayer from 'ol/layer/image';
import SourceVector from 'ol/source/vector';
import WMTS from 'ol/source/wmts';
import WMS from 'ol/source/tilewms';
import XYZ from 'ol/source/xyz';
import VectorSource from 'ol/source/vectortile';
import FormatGeojson from 'ol/format/geojson';
import Static from 'ol/source/imagestatic';
import WMTSTileGrid from 'ol/tilegrid/wmts';
import tileGrid from 'ol/tilegrid';
import proj from 'ol/proj';
import extent from 'ol/extent';
import WKT from 'ol/format/wkt';
import GeometryCollection from 'ol/geom/geometrycollection';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Color from 'ol/color';
import Draw from 'ol/interaction/draw';
import Feature from 'ol/feature';
import Polygon from 'ol/geom/polygon';
import UrlSetting from '../api/UrlSetting';
import BaseMap from './BaseMap';

const previewImage = UrlSetting.URLS.previewImage;
const previewTile = UrlSetting.URLS.previewTile;
const previewVector = UrlSetting.URLS.previewVector;

export default {
  name: 'OpenLayersComponent',
  components: {
    BaseMap
  },
  mounted() {
    this.wktSource = new SourceVector({
      features: this.features,
    });
    this.defaultStyle = new Style({
      stroke: new Stroke({
        color: Color.fromString('#ffcc33'),
        width: 2,
      }),
      zIndex: 1,
    });
    this.highLightStyle = new Style({
      stroke: new Stroke({
        color: Color.fromString('#ff0000'),
        width: 2,
      }),
      zIndex: 10,
    });
    const wktLayer = new Vector({
      source: this.wktSource,
      style: this.defaultStyle,
      extent: [-180, -90, 180, 90]
    });
    this.map = new Map({
      target: 'olMap',
      layers: [
        this.baseMapLayer,
        this.vectorMapLayer,
        wktLayer
      ],
      // view: new View({
      //   projection: 'EPSG:4326',
      //   center: [0, 0],
      //   zoom: 3,
      // }),
    });
    this.map.on('pointermove', this.getMousePosition);
    jQuery(this.map.getViewport()).on("contextmenu", function(e){
      e.preventDefault();
    });
    if (this.isSetBaseMap) {
      const setMap = () => {
        if (this.baseLayer.currentMap) {
          this.changeMap(this.baseLayer.currentMap);
        } else {
          requestAnimationFrame(setMap);
        }
      };
      setMap();
    }
  },
  data() {
    return {
      map: null,
      wktSource: null,
      imageSource: null,
      lineLayer: null,
      draw: null,
      Layers: [],
      wktFormat: new WKT(),
      defaultStyle: null,
      highLightStyle: null,
      plugin: {
        measure: {obj: '', isMeasure: true},
        specialEffect: {obj: '', isSpecialEffect: true}
      }, // 插件集合对象
      baseMapLayer: new Tile(),
      vectorMapLayer: new VectorTile(),
      position: {
        log: 0,
        lat: 0,
      },
      polygonLayer: null,
    };
  },
  props: {
    isResetPlugin: {default: false}, // 默认不显示复位按钮
    isSetBaseMap: {default: false}, // 默认不设置底图
    isShowBaseMapButton: {default: false}, // 默认不显示切换地图按钮
  },
  computed: {
    baseLayer() {
      return this.$refs.baseLayer;
    },
  },
  methods: {
    /**
     * 图层切换
     * @param baseMapInfo 图层信息
     */
    changeMap(baseMapInfo) {
      const source = this.buildLayers(baseMapInfo, true);
      // 设置view(避免底图切换以后 行政区绘制位置错误)
      this.map.setView(new View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 3,
      }));
      this.baseMapLayer.setSource(null);
      this.baseMapLayer.setSource(source);
      this.baseMapLayer.setExtent([-180, -90, 180, 90]);
    },
    /**
     * 构造图层数据
     * @param data 图层信息
     */
    buildLayers(dataInfo, isTrue) {
      const gridSetTrue = dataInfo.gridSet;
      const data = this.is4490(dataInfo);
      // 设置view
      this.map.setView(new View({
        projection: data.gridSet,
        center: [0, 0],
        zoom: 3,
      }));
      // 用于适配geojson的3857预览而写
      let epsgVal = this.gerEpsgVal(data);
      const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
      const projectionExtent = projection.getExtent();
      const size = extent.getWidth(projectionExtent) / 256;
      let resolutions = [];
      let matrixIds = [];
      let url, index, layer, matrixSet;
      const forMax = data.maxLevel ? data.maxLevel : 21;
      const forMin = data.minLevel ? data.minLevel : 1;
      const is3857 = data.gridSet.indexOf(3857) > -1 || (data.tileType && data.tileType.indexOf('geojson') > -1);
      for (let z = forMin; z <= forMax; z += 1) {
        resolutions.push(size / Math.pow(2, is3857 ? z : (z + 1)));
        matrixIds.push(`${epsgVal}:${z}`);
      }
      switch (data.tileType) {
        case "local":
          return new XYZ({
            projection,
            tileGrid: new tileGrid.createXYZ({extent: projectionExtent}),
            tileUrlFunction(tileCoord) {
              return data.url + (tileCoord[0] - 1) + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) + '.jpg';
            }
          });
        case "NET-U":
          return new XYZ({
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
          return new WMTS({
            url,
            layer,
            matrixSet,
            format: 'tiles',
            wrapX: true,
            projection,
            tileGrid: new WMTSTileGrid({
              origin: extent.getTopLeft(projectionExtent),
              resolutions,
              matrixIds,
            })
          });
        case 'vector-png':
          return new WMS({
            url: `${previewVector}/${data.workspace}/${data.layerName}/wms`,
            params: {
              'LAYERS': data.layer,
              'TILED': true,
            },
            projection: data.gridSet
          });
        case 'vector-geojson':
          setTimeout(() => {
            this.map.getView().setZoom(this.map.getView().getZoom() + 1);
          }, 2000);
          // 用于geojson的3857数据设置view
          this.map.setView(new View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 3,
          }));
          url = previewVector + '/gwc/service/wmts' + '?Request=GetTile&Service=WMTS&Version=1.0.0&layer='
            + data.layer + '&Format=application%2Fjson%3Btype%3Dgeojson&TileCol={x}&TileRow={y}&tilematrixset=' + epsgVal + '&TileMatrix='
            + epsgVal + ':{z}';
          return new VectorSource({
            url: url,
            // tileUrlFunction: (xyz) => {
            //   console.log(xyz)
            //   let z = xyz[0];
            //   let x = (Math.abs(xyz[1]) - 1) / 2;
            //   let y = (Math.abs(xyz[2]) - 2) / 2;
            //   var url = previewVector + '/gwc/service/wmts' + '?Request=GetTile&Service=WMTS&Version=1.0.0&layer='
            //     + data.layer + '&Format=application%2Fjson%3Btype%3Dgeojson&TileCol='+x+'&TileRow='+y+'&tilematrixset=' + epsgVal + '&TileMatrix='
            //     + epsgVal + ':'+z;
            //   return url;
            // },
            format: new FormatGeojson({}),
            projection,
            tileGrid: new WMTSTileGrid({
              origin: extent.getTopLeft(projectionExtent),
              tileSize: [256, 256],
              resolutions,
              matrixIds,
            }),
          });
        default: {
          let previewUrl;
          if (isTrue) {
            previewUrl = previewTile + '/service/wmts';
          } else {
            previewUrl = previewImage + '/gwc/service/wmts';
          }
          return new WMTS({
            url: previewUrl,
            layer: data.workspace ? `${data.workspace}:${data.layerName}` : data.layerName,
            format: `image/${data.mimeType.toLowerCase()}`,
            matrixSet: gridSetTrue,
            projection,
            wrapX: true,
            tileGrid: new WMTSTileGrid({
              origin: extent.getTopLeft(projectionExtent),
              tileSize: [256, 256],
              extent: [data.minX, data.minY, data.maxX, data.maxY],
              resolutions,
              matrixIds,
            }),
          });
        }
      }
    },    
    gerEpsgVal(data) {
      let epsgVal = null;
      if (data.tileType && data.tileType.indexOf('geojson') > -1) {
        epsgVal = 'EPSG:4326';
      } else {
        epsgVal = data.gridSet;
      }
      return epsgVal;
    },
    is4490(data) {
      if (data.gridSet === 'EPSG:4490') {
        /* eslint-disable */
        data.gridSet = 'EPSG:4326';
        /* eslint-enable */
        return data;
      }
      return data;
    },
    /**
     * 不同坐标系下范围转换
     * @param extent 经纬度组成的矩形范围
     * @param epsg1 转换前的坐标系
     * @param epsg2 转换后的坐标系
     */
    change24326(extent, epsg1, epsg2) {
      return proj.transformExtent(extent, epsg1, epsg2);
    },
    /**
     * 鼠标获取屏幕位置
     * @param evt 屏幕坐标
     */
    getMousePosition(evt) {
      this.position.log = evt.coordinate[0] < -180 ? -180 : evt.coordinate[0] > 180 ? 180 : evt.coordinate[0].toFixed(4);
      this.position.lat = evt.coordinate[1] < -90 ? -90 : evt.coordinate[1] > 90 ? 90 : evt.coordinate[1].toFixed(4);
    },
    /**
     * wkt转feature，并添加feature
     */
    addWKTFeature(wkt) {
      const feature = this.formatterWKT2Feature(wkt);
      this.addFeature(feature, true);
      return feature;
    },
    /**
     * 矢量图层添加feature
     * @param feature 需要添加的feature
     * @param isFlyTo 是否定位到feature位置
     */
    addFeature(feature, isFlyTo) {
      if (feature) {
        this.wktSource.addFeature(feature);
      }
      if (isFlyTo) {
        this.flyTo(feature.getGeometry().getExtent());
      }
    },
    /**
     * 视图定位到某个位置
     * @param extent 经纬度坐标
     */
    flyTo(extent) {
      this.map.getView().fit(extent, {
        duration: 1000,
      });
    },
    flyToGeometries(geometries) {
      this.flyTo(this.createGeometryCollection(geometries).getExtent());
    },
    /**
     * 通过id获取feature
     * @param id feature id
     */
    getFeatureById(id) {
      return this.wktSource.getFeatureById(id);
    },
    /**
     * 矢量图层移除feature
     * @param feature 移除的feature
     */
    removeFeature(feature) {
      this.wktSource.removeFeature(feature);
    },
    /**
     * wkt转feature
     * @param wkt 坐标点的wkt格式
     */
    formatterWKT2Feature(wkt) {
      return this.wktFormat.readFeature(wkt);
    },
    /**
     * feature转wkt
     * @param feature 需要转换的feature
     */
    formatterFeature2WKT(feature) {
      return this.wktFormat.writeFeature(feature);
    },
    /**
     * 清空图层
     */
    clear() {
      this.wktSource.clear();
      for (const key in this.Layers) {
        this.map.removeLayer(this.Layers[key]);
      }
    },
    createGeometryCollection(geometries) {
      return new GeometryCollection(geometries);
    },
    /**
     * 样式高亮
     */
    highLightFeature(feature) {
      feature.setStyle(this.highLightStyle);
    },
    /**
     * 默认样式
     */
    defaultFeature(feature) {
      feature.setStyle(this.defaultStyle);
    },
    /**
     * 影像上球
     * @param bool 加载移除图层
     * @param image 图层参数
     */
    imageOnMap(bool, image) {
      if (bool) {
        const staticImage = new Static({
          url: image.url,
          projection: 'EPSG:4326',
          imageExtent: image.outExtent,
          imageLoadFunction: function (image, src) {
            let img = image;
            img.getImage().src = src;
          }
        });
        staticImage.on("imageloadend", (event) => {
          const canvas = event.image.image_;
          const newCanvas = document.createElement('canvas');
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.height;
          const ctx = newCanvas.getContext('2d');
          const unit = newCanvas.width/(image.outExtent[2] - image.outExtent[0]);
          ctx.beginPath();
          ctx.moveTo((image.polygon[0]-image.outExtent[0])*unit, (image.outExtent[3]-image.polygon[1])*unit);
          ctx.lineTo((image.polygon[2]-image.outExtent[0])*unit, (image.outExtent[3]-image.polygon[3])*unit);
          ctx.lineTo((image.polygon[4]-image.outExtent[0])*unit, (image.outExtent[3]-image.polygon[5])*unit);
          ctx.lineTo((image.polygon[6]-image.outExtent[0])*unit, (image.outExtent[3]-image.polygon[7])*unit);
          ctx.closePath();
          ctx.clip();
          const scaleX = image.transform.length/(image.outExtent[2] - image.outExtent[0]);
          const scaleY = image.transform.width/(image.outExtent[3] - image.outExtent[1]);
          ctx.transform(scaleX, image.transform.rotatex, image.transform.rotatey, scaleY, canvas.width/2, canvas.height/2);
          ctx.drawImage(canvas, -canvas.width/2,-canvas.height/2);
          event.target.image_.setImage(newCanvas);
        });
        this.Layers[image.id] = new ImageLayer({
          source: staticImage,
        });
        this.map.addLayer(this.Layers[image.id]);
        this.flyTo(image.outExtent);
      } else {
        this.map.removeLayer(this.Layers[image.id]);
        this.Layers[image.id] = null;
      }
    },
    /**
     * 矢量图层加载
     * @param bool 加载移除图层
     * @param vector 图层参数
     */
    vectorOnMap(bool, vector) {
      if (bool) {
        this.Layers[vector.id] = new Tile({
          source: new WMS({
            url: vector.wmsUrl,
            params: {
              'LAYERS': vector.layer,
              'TILED': true
            },
          }),
          extent: vector.extent
        });
        this.map.addLayer(this.Layers[vector.id]);
        this.flyTo(vector.extent);
      } else {
        this.map.removeLayer(this.Layers[vector.id]);
        this.Layers[vector.id] = null;
      }
    },
    /**
     * openlayers上画图形
     * @param type 图形类型 Circle：矩形，Polygon：多边形
     * @param callback 回调函数，返回图形画完后的wkt格式
     */
    drawing(type, callback) {
      this.clearDraw();
      const lineSource = new SourceVector();
      const lineStyle = new Style({
        stroke: new Stroke({
          color: Color.fromString('#fedcba'),
          width: 2,
        }),
        zIndex: 20,
      });
      this.lineLayer = new Vector({
        source: lineSource,
        style: lineStyle,
      });
      this.lineLayer.setExtent([-180, -90, 180, 90]);
      this.map.addLayer(this.lineLayer);
      this.draw = new Draw({
        source: lineSource,
        type,
        geometryFunction: type === 'Circle' ? Draw.createBox() : null
      });
      this.map.addInteraction(this.draw);
      this.draw.on('drawstart', () => {
        this.lineLayer.getSource().clear();
      });
      this.draw.on('drawend', (e) => {
        callback(this.formatterFeature2WKT(e.feature));
      });
    },
    clearDraw() {
      if (this.draw) {
        this.lineLayer.getSource().clear();
        this.map.removeInteraction(this.draw);
      }
    },
    getLevel() {
      return this.map.getView().getZoom();
    },
    drawPloygon(minX, minY, maxX, maxY) {
      var polygonFeature = new Feature(
        new Polygon([[[minX, minY], [maxX, minY],
          [maxX, maxY], [minX, maxY], [minX, minY]]])
      );
      if (this.polygonLayer) {
        this.map.removeLayer(this.polygonLayer);
      }
      this.polygonLayer = new Vector({
        source: new SourceVector({
          features: [polygonFeature]
        })
      });
      this.polygonLayer.setExtent([-180, -90, 180, 90]);
      this.map.addLayer(this.polygonLayer);
    },
  },
};
</script>

<style lang="scss">
.open-layers-map{
  height: 100%;
  /*引入的控件的控制器*/
  .GCPlugin-controller {
    position: absolute;
    right: 25px;
    bottom: 148px;
    z-index: 1;
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
      & img {
        margin-top: 7px;
      }
    }
  }
  /*更换底图按钮*/
  .base-layer {
    position: absolute;
    top: 90px;
    right: 20px;
    width: 35px;
    line-height: 35px;
    text-align: center;
    height: 35px;
    background: #f1f1f1;
    z-index: 40;
    border-radius: 4px
  }
  /*鼠标位置*/
  .mouse-position {
    position: absolute;
    right: 5px;
    bottom: 10px;
    color: #000;
    z-index: 100;
    & div {
      display: inline-block;
      font-size: 14px;
      width: 110px;
    }
  }
  /*放大缩小样式修改*/
  .ol-zoom {
    position: absolute;
    right: 23px;
    bottom: 50px;
    top: unset;
    left: unset;
    background-color: transparent !important;
    .ol-zoom-in, .ol-zoom-out {
      width: 35px;
      height: 35px;
      background-color: #f1f1f1 !important;
      color: #000;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  /*隐藏openlayes中i图标*/
  .ol-attribution {
    display: none;
  }
}
</style>

