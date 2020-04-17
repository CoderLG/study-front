import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

export default class baseMap {
	constructor() {
		this.layer = null;
	}
	addLayer(style) {
    this.layer = new TileLayer({
      source: new XYZ({
        url: 'http://mt1.google.cn/vt/lyrs='+style+'&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
      })
    });
    this.getCurrentExtent();
    window.map.addLayer(this.layer);
  }
  getCurrentExtent() {
    const pixelRange = window.map.getSize();
    const leftTop = window.map.getCoordinateFromPixel([0, 0]);
    const rightBottom = window.map.getCoordinateFromPixel([pixelRange[0], pixelRange[1]]);
    const minlon = leftTop[0] < -180 ? -180 : leftTop[0];
    const maxlon = rightBottom[0] > 180 ? 180 : rightBottom[0];
    const minLat = rightBottom[1] < -90 ? -90 : rightBottom[1];
    const maxLat = leftTop[1] > 90 ? 90 : leftTop[1];
    const extentObj = {
      'minlon': minlon,
      'maxlon': maxlon,
      'minLat': minLat,
      'maxLat': maxLat,
    };
    window.extent = extentObj;
  }
  clear() {
    window.map.removeLayer(this.layer);
  }
}
