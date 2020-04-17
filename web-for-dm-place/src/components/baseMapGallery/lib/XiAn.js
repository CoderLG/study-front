import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import proj from 'ol/proj';
import extent from 'ol/extent';
import WMTS from 'ol/source/wmts';
import WMTSTileGrid from 'ol/tilegrid/wmts';

export default class baseMap {
	constructor() {
		this.layer = null;
	}
	addLayer() {
    window.map.setView(new View({
      center: [116.397128, 39.916527],
      zoom: 3,
      projection: 'EPSG:3857',
      minZoom: 3,
    }));

    const projection = proj.get('EPSG:3857');// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    const forMax = 21;
    const forMin = 1;
    const is3857 = true;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, is3857 ? z : (z + 1)));
      matrixIds.push(`EPSG:3857:${z}`);
    }

    this.layer = new TileLayer({
      source: new WMTS({
        url: 'http://192.168.48.15:8310/geoserverplus/gwc/service/wmts',
        layer: 'ChinaBlackV1-PNG-3857',
        format: 'image/png',
        matrixSet: 'EPSG:3857',
        projection,
        wrapX: true,
        tileGrid: new WMTSTileGrid({
          origin: extent.getTopLeft(projectionExtent),
          tileSize: [256, 256],
          extent: [-20037508.342789, -25227636.636413, 20032453.171912, 25225622.489893],
          resolutions,
          matrixIds,
        }),
      })
    });
    window.map.addLayer(this.layer);
  }
  clear() {
    window.map.removeLayer(this.layer);
  }
}
