import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

export default class baseMap {
  constructor() {
    this.layer = null;
  }
  addLayer(style) {
    this.layer = new TileLayer({
      source: new XYZ({
        url: 'https://t5.tianditu.gov.cn/DataServer?T='+style+'&X={x}&Y={y}&L={z}&tk=3cf2285447247c7191415c8725cc2e78',
      })
    });
    window.map.addLayer(this.layer);
  }
  clear() {
    window.map.removeLayer(this.layer);
  }
}
