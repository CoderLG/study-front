import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import TileImage from 'ol/source/tileimage';
import projzh from 'projzh';
import proj from 'ol/proj';
import Projection from 'ol/proj/projection';
import extent from 'ol/extent';
import TileGrid from 'ol/tilegrid/tilegrid';

export default class baseMap {
	constructor() {
		this.layer = null;
	}
	addLayer(style) {
    window.map.setView(new View({
      center: [116.397128, 39.916527],
      zoom: 2,
      projection: 'EPSG:3857',
      minZoom: 2,
    }));

    this.layer = new TileLayer({
      source: this.createBaiduMap({mapStyle: style})
    })    
    window.map.addLayer(this.layer);
  }
  createBaiduMap(opts) {
      let options = opts ? opts : {};

      // this.extent = [72.004, 0.8293, 137.8347, 55.8271];
      this.extent = [-179.99112222, -89.99112222, 179.99112222, 89.99112222];

      //定义百度坐标
      //地址：https://github.com/openlayers/openlayers/issues/3522
      var baiduMercator = new Projection({
        code: 'baidu',
        extent: extent.applyTransform(this.extent, projzh.ll2bmerc),
        units: 'm'
      });

      proj.addProjection(baiduMercator);
      proj.addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
      proj.addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);

      var resolutions = [];
      for(var i=0; i<23; i++){
        resolutions[i] = Math.pow(2, 18-i);
      }
      var tilegrid = new TileGrid({
        origin: [0,0],
        resolutions: resolutions,
        extent: extent.applyTransform(this.extent, projzh.ll2bmerc),
        tileSize: [256, 256]
      });

        // var satUrls = 'http://shangetu2.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150601';
        // var satUrls = 'https://api.map.baidu.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20190709&scale=1&ak=1XjLLEhZhQNUzd93EjU5nOGQ&customid=midnight'

        // var urls = 'http://online2.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1';
        var urls = 'https://api.map.baidu.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20190709&scale=1&ak=1XjLLEhZhQNUzd93EjU5nOGQ&customid='+options.mapStyle+''

      const tileImage = new TileImage({
        // crossOrigin: 'anonymous',   //跨域
        // cacheSize: options.cacheSize,
        // projection: proj.get('EPSG:3857'),
        projection:'baidu',
        tileGrid: tilegrid,
        tileUrlFunction: function(tileCoord){
          if(!tileCoord) return "";
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = tileCoord[2];
          // var hash = (x << z) + y;
          // var index = hash % urls.length;
          // index = index < 0 ? index + urls.length : index;
          // if(options.mapType == "sat"){
          //   return satUrls.replace('{x}', x).replace('{y}', y).replace('{z}', z);
          // }
          return urls.replace('{x}', x).replace('{y}', y).replace('{z}', z);
        },
        wrapX: true
      });

    return tileImage;
  }
  clear() {
    window.map.removeLayer(this.layer);
  }
}
