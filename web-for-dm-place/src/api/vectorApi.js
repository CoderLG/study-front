import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const geoDataUrl = UrlSetting.URLS.geodata;
const dmUrl = UrlSetting.URLS.pan;

/**
 * 获取矢量数据的详情 解析矢量
 * @param dataId 数据的id
 * @param path 矢量数据的服务路径
 * @return {[Promise]}
 * @author tianff
 * @date 2018-12-19
*/
// export function getVectorDetails(dataId, path) {
//   return fetch.post(`${geoDataUrl}/vectors/parser`, {
//     dataId,
//     path,
//   });
// }

/**
 * 分页获取样式列表
 * @param styleName 样式名称
 * @param currentPage 当前页码
 * @param pageSize 每页条目数
 * @return {[Promise]} [样式列表]
 * @author tianff
 * @date 2018-12-19
 */
export function getVectorStyleList(styleName, currentPage, pageSize) {
  return fetch.get(`${geoDataUrl}/styles`, {
    params: {
      styleName,
      currentPage,
      pageSize,
    },
  });
}

/**
 * 删除某个样式
 * @param id 需要删除的图层id
 * @return {[Object]}
 * @author tianff
 * @date 2018-11-02
 */
export function removeStyle(id) {
  return fetch.delete(`${geoDataUrl}/styles/${id}`);
}

/**
 * 新增矢量样式表
 * @param formData 表单数据
 * @param file 样式文件本身
 * @param name样式表名称
 * @param format 样式表格式 (sld)
 * @param category 样式类型
 * @param path 样式文件路径
 * @return {[Object]}
 * @author tianff
 * @date 2018-12-19
*/
export function addNewVectorStyle(formData) {
  return fetch.post(`${geoDataUrl}/styles/file`, formData);
}

/**
 * 获取样式文件中的内容
 * @param id 样式id
 * @return {样式实体}
 * @author tianff
 * @date 2018-12-19
*/
export function getStyleContent(id) {
  return fetch.get(`${geoDataUrl}/styles/${id}`);
}

/**
 * 更新矢量图层样式
 * @param dataObj 数据对象
 * @param layerName 图层名称
 * @param styleName 样式名称
 * @return {[Object]}
 * @author tianff
 * @date 2018-12-19
*/
export function updateVectorLayerStyle(dataObj) {
  return fetch.put(`${geoDataUrl}/layers/styles`, dataObj);
}

/**
 * 修改样式文件中的内容
 * @param styleName 样式名称
 * @param sldContent 样式内容
 * @return {[Object]}
 * @author tianff
 * @date 2018-11-02
*/
export function updateStyleContent(styleName, sldContent) {
  return fetch.put(`${geoDataUrl}/styles?styleName=${styleName}`, sldContent, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

/**
 * 校验样式文件中的内容
 * @param sldContent 样式内容
 * @return {Object}
 * @author tianff
 * @date 2018-12-19
*/
export function verifyStyleContent(sldContent) {
  return fetch.post(`${geoDataUrl}/styles/validate`, sldContent, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

/**
 * 根据范围查询矢量数据 (矢量高级查询检索)
 * @param searchParams 查询需要的参数
 * @param layerName 图层名称
 * @param page 起始页
 * @param perPage 每页条目数
 * @param wkt 范围
 * @return {[Promise]}
 * @author yangshuai
 * @date 2018-11-05
 */
export function searchVectors(searchParams) {
  return fetch.post(`${dmUrl}/api/v1/vectors`, searchParams);
}
