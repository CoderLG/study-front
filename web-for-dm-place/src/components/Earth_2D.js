import 'ol/ol.css';
import WMTS from 'ol/source/wmts';
import WMS from 'ol/source/tilewms';
import VectorSource from 'ol/source/vectortile';
import FormatGeojson from 'ol/format/geojson';
import WMTSTileGrid from 'ol/tilegrid/wmts';
import proj from 'ol/proj';
import extent from 'ol/extent';
import UrlSetting from '../api/UrlSetting';

// let _this;
export default class previewImgShp {
  constructor(map) {
    // _this = this;
    this.map = map;
    this.previewImage = UrlSetting.URLS.previewImage;
    this.previewTile = UrlSetting.URLS.previewTile;
    this.previewVector = UrlSetting.URLS.previewVector;
    // this.map = null,
    this.imageSource = null;
    this.Layers = [];
    this.baseImageUrl = '/service/wmts';
    this.ImgShpUrl = '/gwc/service/wmts';
    this.paramVersionLayer = '?Request=GetTile&Service=WMTS&Version=1.0.0&layer=';
    this.paramFormatTile = '&Format=application%2Fjson%3Btype%3Dgeojson&TileCol={x}&TileRow={y}&tilematrixset=';
    this.paramTileMatrix = '&TileMatrix=';
    this.position = {
      log: 0,
      lat: 0,
    };
  }
  image_4326_png_jpeg_tiff(dataInfo, isTrue) {
    let epsgVal = 'EPSG:4326';
    const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    const forMax = dataInfo.maxLevel ? dataInfo.maxLevel : 21;
    const forMin = dataInfo.minLevel ? dataInfo.minLevel : 1;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, z + 1));
      matrixIds.push(`${epsgVal}:${z}`);
    }
    let previewUrl;
    if (isTrue) {
      previewUrl = this.previewTile + this.baseImageUrl;
    } else {
      previewUrl = this.previewImage + this.ImgShpUrl;
    }
    return new WMTS({
      url: previewUrl,
      layer: dataInfo.workspace ? `${dataInfo.workspace}:${dataInfo.layerName}` : dataInfo.layerName,
      format: `image/${dataInfo.mimeType.toLowerCase()}`,
      matrixSet: 'EPSG:4326',
      projection,
      wrapX: true,
      tileGrid: new WMTSTileGrid({
        origin: extent.getTopLeft(projectionExtent),
        tileSize: [256, 256],
        extent: [dataInfo.minX, dataInfo.minY, dataInfo.maxX, dataInfo.maxY],
        resolutions,
        matrixIds,
      }),
    });
  }
  image_4490_png_jpeg_tiff(dataInfo, isTrue) {
    let epsgVal = 'EPSG:4326';
    const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    const forMax = dataInfo.maxLevel ? dataInfo.maxLevel : 21;
    const forMin = dataInfo.minLevel ? dataInfo.minLevel : 1;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, z + 1));
      matrixIds.push(`${epsgVal}:${z}`);
    }
    let previewUrl;
    if (isTrue) {
      previewUrl = this.previewTile + this.baseImageUrl;
    } else {
      previewUrl = this.previewImage + this.ImgShpUrl;
    }
    return new WMTS({
      url: previewUrl,
      layer: dataInfo.workspace ? `${dataInfo.workspace}:${dataInfo.layerName}` : dataInfo.layerName,
      format: `image/${dataInfo.mimeType.toLowerCase()}`,
      matrixSet: 'EPSG:4490',
      projection,
      wrapX: true,
      tileGrid: new WMTSTileGrid({
        origin: extent.getTopLeft(projectionExtent),
        tileSize: [256, 256],
        extent: [dataInfo.minX, dataInfo.minY, dataInfo.maxX, dataInfo.maxY],
        resolutions,
        matrixIds,
      }),
    });
  }
  image_3857_png_jpeg_tiff(dataInfo, isTrue) {
    let epsgVal = 'EPSG:3857';
    const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    const forMax = dataInfo.maxLevel ? dataInfo.maxLevel : 21;
    const forMin = dataInfo.minLevel ? dataInfo.minLevel : 1;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, z));
      matrixIds.push(`${epsgVal}:${z}`);
    }
    let previewUrl;
    if (isTrue) {
      previewUrl = this.previewTile + this.baseImageUrl;
    } else {
      previewUrl = this.previewImage + this.ImgShpUrl;
    }
    return new WMTS({
      url: previewUrl,
      layer: dataInfo.workspace ? `${dataInfo.workspace}:${dataInfo.layerName}` : dataInfo.layerName,
      format: `image/${dataInfo.mimeType.toLowerCase()}`,
      matrixSet: 'EPSG:3857',
      projection,
      wrapX: true,
      tileGrid: new WMTSTileGrid({
        origin: extent.getTopLeft(projectionExtent),
        tileSize: [256, 256],
        extent: [dataInfo.minX, dataInfo.minY, dataInfo.maxX, dataInfo.maxY],
        resolutions,
        matrixIds,
      }),
    });
  }
  shp_4326_png(dataInfo) {
    return new WMS({
      url: `${this.previewVector}/${dataInfo.workspace}/${dataInfo.layerName}/wms`,
      params: {
        'LAYERS': dataInfo.layer,
        'TILED': true,
      },
      projection: 'EPSG:4326'
    });
  }
  shp_3857_png(dataInfo) {
    return new WMS({
      url: `${this.previewVector}/${dataInfo.workspace}/${dataInfo.layerName}/wms`,
      params: {
        'LAYERS': dataInfo.layer,
        'TILED': true,
      },
      projection: 'EPSG:3857'
    });
  }
  shp_4326_geojson(dataInfo) {
    let epsgVal = 'EPSG:4326';
    const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    let url;
    const forMax = dataInfo.maxLevel ? dataInfo.maxLevel : 21;
    const forMin = dataInfo.minLevel ? dataInfo.minLevel : 1;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, z));
      matrixIds.push(`${epsgVal}:${z}`);
    } 
    setTimeout(() => {
      this.map.getView().setZoom(this.map.getView().getZoom() + 1);
    }, 2000);
    url = this.previewVector + this.ImgShpUrl + this.paramVersionLayer
      + dataInfo.layer + this.paramFormatTile + epsgVal + this.paramTileMatrix
      + epsgVal + ':{z}';
    return new VectorSource({
      url: url,
      format: new FormatGeojson({}),
      projection,
      tileGrid: new WMTSTileGrid({
        origin: extent.getTopLeft(projectionExtent),
        tileSize: [256, 256],
        resolutions,
        matrixIds,
      }),
    });
  }
  shp_3857_geojson(dataInfo) {
    let epsgVal = 'EPSG:4326';
    const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    let url;
    const forMax = dataInfo.maxLevel ? dataInfo.maxLevel : 21;
    const forMin = dataInfo.minLevel ? dataInfo.minLevel : 1;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2, z));
      matrixIds.push(`${epsgVal}:${z}`);
    } 
    setTimeout(() => {
      this.map.getView().setZoom(this.map.getView().getZoom() + 1);
    }, 2000);
    url = this.previewVector + this.ImgShpUrl + this.paramVersionLayer
      + dataInfo.layer + this.paramFormatTile + epsgVal + this.paramTileMatrix
      + epsgVal + ':{z}';
    return new VectorSource({
      url: url,
      format: new FormatGeojson({}),
      projection,
      tileGrid: new WMTSTileGrid({
        origin: extent.getTopLeft(projectionExtent),
        tileSize: [256, 256],
        resolutions,
        matrixIds,
      }),
    });
  }
  shp_4490_png(dataInfo) {
    const data = this.is4490(dataInfo);
    return new WMS({
      url: `${this.previewVector}/${data.workspace}/${data.layerName}/wms`,
      params: {
        'LAYERS': data.layer,
        'TILED': true,
      },
      projection: 'EPSG:4326'
    });
  }
  shp_4490_geojson(dataInfo) {
    const data = this.is4490(dataInfo);
    let epsgVal = 'EPSG:4326';
    const projection = proj.get(epsgVal);// 经纬度空间参考坐标系
    const projectionExtent = projection.getExtent();
    const size = extent.getWidth(projectionExtent) / 256;
    let resolutions = [];
    let matrixIds = [];
    let url;
    const forMax = data.maxLevel ? data.maxLevel : 21;
    const forMin = data.minLevel ? data.minLevel : 1;
    for (let z = forMin; z <= forMax; z += 1) {
      resolutions.push(size / Math.pow(2,  z ));
      matrixIds.push(`${epsgVal}:${z}`);
    }
    setTimeout(() => {
      this.map.getView().setZoom(this.map.getView().getZoom() + 1);
    }, 2000);
    url = this.previewVector + this.ImgShpUrl + this.paramVersionLayer
      + data.layer + this.paramFormatTile + epsgVal + this.paramTileMatrix
      + epsgVal + ':{z}';
    return new VectorSource({
      url: url,
      format: new FormatGeojson({}),
      projection,
      tileGrid: new WMTSTileGrid({
        origin: extent.getTopLeft(projectionExtent),
        tileSize: [256, 256],
        resolutions,
        matrixIds,
      }),
    });
  }
  /**
   * 不同坐标系下范围转换
   * @param extent 经纬度组成的矩形范围
   * @param epsg1 转换前的坐标系
   * @param epsg2 转换后的坐标系
   */
  change24326(extent, epsg1, epsg2) {
    return proj.transformExtent(extent, epsg1, epsg2);
  }
  /**
   * 鼠标获取屏幕位置
   * @param evt 屏幕坐标
   */
  getMousePosition(evt) {
    this.position.log = evt.coordinate[0] < -180 ? -180 : evt.coordinate[0] > 180 ? 180 : evt.coordinate[0].toFixed(4);
    this.position.lat = evt.coordinate[1] < -90 ? -90 : evt.coordinate[1] > 90 ? 90 : evt.coordinate[1].toFixed(4);
  }
  /**
   * 视图定位到某个位置
   * @param extent 经纬度坐标
   */
  flyTo(extent) {
    this.map.getView().fit(extent, {
      duration: 1000,
    });
  }
}

