import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

export default class baseMap {
	constructor() {
		this.layer = null;
	}
	addLayer(style) {
    this.layer = new TileLayer({
      source: new XYZ({
        url: 'https://webst02.is.autonavi.com/appmaptile?style='+style+'&x={x}&y={y}&z={z}',
      })
    });
    window.map.addLayer(this.layer);
  }
  clear() {
    window.map.removeLayer(this.layer);
  }
}
