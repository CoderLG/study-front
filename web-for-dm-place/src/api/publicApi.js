import fetch from './../utils/fetch';
import URLSETTING from './UrlSetting';

const geoDataUrl = URLSETTING.URLS.geodata;
const dmUrl = URLSETTING.URLS.pan;

/**
 * 获取影像、矢量数据参数别名
 * @return {[<Promise>]}
 * @author tianff
 * @date 2018-12-19
 */
export function getDataParamsAlias() {
  return fetch.get(`../../static/json/alias.json`);
}

/**
 * 发布影像、矢量数据
 * @param paramsObj
 *  @param dataId 
 *  @param layerName
 *  @param gridSet
 *  @param mimeType
 *  @param minX
 *  @param minY
 *  @param maxX
 *  @param maxY
 *  @param minLevel
 *  @param maxLevel
 *  @param isNeedSeed
 *  @param isBase 非必填 默认是false
 *  @param transparentColor
 * @returns {Promise<*>}
 */
export function publishDataLayer(paramsObj) {
  return fetch.post(`${geoDataUrl}/layers`, paramsObj);
}

/**
 * 根据path获取icon图、拇指图
 * @param path 图片路径
 * @return {[<img>]}
 * @author tianff
 * @date 2019-8-5
 */
export function getIconOrThumbUrl(path) {
  return `${dmUrl}/api/v1/iconImage?path=${path}`;
}

/**
 * 根据影像数据的格网集、坐标计算层级范围
 * @param params
 * @param lowLeftLon
 * @param lowRightLat
 * @param lowRightLon
 * @param originGridSet
 * @param rasterXSize
 * @param rasterYSize
 * @param targetGridSet
 * @param upRightLat
 * @returns {Promise<*>}
 * @author lijy
 * @date 2019-11-21
 */
export function computeImageLevel(lowLeftLon,lowRightLat,lowRightLon,originGridSet,rasterXSize,rasterYSize,targetGridSet,upRightLat){
  //var newGridSet = gridSet.replace(':','%3A')
  return fetch.get(`${geoDataUrl}/images/level?lowLeftLon=${lowLeftLon}&lowRightLat=${lowRightLat}&originGridSet=${originGridSet}&lowRightLon=${lowRightLon}&rasterXSize=${rasterXSize}&rasterYSize=${rasterYSize}&targetGridSet=${targetGridSet}&upRightLat=${upRightLat}`)
}
