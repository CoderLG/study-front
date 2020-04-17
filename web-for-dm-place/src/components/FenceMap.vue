<template>
  <div>
    <div id="fenceMap" class="map"></div>
  </div>
</template>

<script>
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import Vector from 'ol/layer/vector';
import SourceVector from 'ol/source/vector';
import WKT from 'ol/format/wkt';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Color from 'ol/color';
import Draw from 'ol/interaction/draw';
import OSM from 'ol/source/osm';

export default {
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
        measure: { obj: '', isMeasure: true },
        specialEffect: { obj: '', isSpecialEffect: true }
      },
      stamenLayer: null,
    }
  },
  methods: {
    init() {
      setTimeout(() => {
        this.wktSource = new SourceVector({
          features: this.features,
        });
        this.stamenLayer = new TileLayer({
          source: new OSM()
        });
        this.defaultStyle = new Style({
          stroke: new Stroke({
            color: Color.fromString('#409EFF'),
            width: 2,
          }),
          zIndex: 1,
        });
        const wktLayer = new Vector({
          source: this.wktSource,
          style: this.defaultStyle,
          extent: [-180, -90, 180, 90]
        });
        if (!this.map) {
          this.map = new Map({
            target: 'fenceMap',
            view: new View({
              projection: 'EPSG:4326',
              center: [116, 39],
              zoom: 5,
            }),
            layers: [
              wktLayer,
            ],
          });
        }
        //定位中国
        this.flyTo([73.60732421875014, 18.21826171875, 134.75234375000014, 53.555615234375125])
        this.map.addLayer(this.stamenLayer);
      }, 100)
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
    /**
     * 通过id获取feature
     * @param id feature id
     */
    getFeatureById(id) {
      return this.wktSource.getFeatureById(id);
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
          color: Color.fromString('#409EFF'),
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
    /**
     * 清空图层
     */
    clear() {
      this.wktSource.clear();
      this.map.removeLayer(this.stamenLayer);
      for (const key in this.lineLayer) {
        this.map.removeLayer(this.lineLayer[key]);
      }
    },
    clearDraw() {
      if (this.draw) {
        this.lineLayer.getSource().clear();
        this.map.removeInteraction(this.draw);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
}
</style>