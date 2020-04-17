import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const placeNameUrl = `${UrlSetting.URLS.placeName}/api/v1`;

/**
 * 返回省市县名称的树状结构
 * @return {[Promise]}
 * @author yangshuai
 * @date 2018-11-09
 */
export function getTree() {
  return fetch.get(`${placeNameUrl}/vectors/district/treelist`);
}

/**
 * 返回省市县名称以及范围
 * @param code码
 * @return {[Promise]}
 * @author yangshuai
 * @date 2018-11-09
 */
export function getGeometryByCode(code) {
  return fetch.get(`${placeNameUrl}/vectors/district`, {
    params: {
      code,
      returnGeometry: true,
    },
  });
}

/**
 * 返回国家数据的列表信息
 * @return {[Promise]}
 * @author yangshuai
 * @date 2018-12-09
 */
export function getCountries() {
  return fetch.post(`${placeNameUrl}/vectors/district/world`,{
    returnGeometry: false,
  });
}

/**
 * 返回单个国家的geometry
 * @return {[Promise]}
 * @param dataName 国家名称
 * @author yangshuai
 * @date 2018-12-09
 */
export function getGeometryByCountryName(dataName) {
  return fetch.post(`${placeNameUrl}/vectors/district/world`, {
    dataName,
    returnGeometry: true,
  });
}

/**
 * 搜索地名
 * @param {*} param 地名
 * @returns {promises <array>} 返回数据对象
 * @author chenyunyun
 * @date 2019-01-07
 */
export function getPlaceName(param) {
  return fetch.get(`${placeNameUrl}/query/placeName=${param}`);
}