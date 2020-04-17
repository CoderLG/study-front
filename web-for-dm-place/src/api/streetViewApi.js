import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const streetViewUrl = UrlSetting.URLS.streetView;

/**
 * 获取街景数据列表
 * @param {*} paramsObj
 *  @param currentPage 当前页码
 *  @param pageSize 每页条目数
 *  @param svName 搜索关键字
 *  @param orderType 排序类型
 * @return {Promise}
 * @author tianff
 * @date 2019-8-7
 */
export function getStreetViewList(currentPage, pageSize, svName, orderType, orderColumn) {
  return fetch.get(`${streetViewUrl}/layers`, {
    params: {
      currentPage,
      pageSize,
      svName,
      orderType,
      orderColumn,
    },
  });
}

/**
 * 删除街景图层
 * @param id
 * @return {Object}
 * @author tianff
 * @date 2019-8-7
 */
export function deleteStreetViewLayer(id) {
  return fetch.delete(`${streetViewUrl}/layers`, {
		data: {
			"ids": [
				id
			]
		},
  });
}

/**
 * 解析街景文件 获取经纬度范围
 * @param dir 文件路径
 * @return {Promise}
 * @author tianff
 * @date 2019-8-7
 */
export function resolveStreetInfo(dir) {
  return fetch.post(`${streetViewUrl}/layers/getRange`, {
    dir,
  });
}

/**
 * 街景-发布服务
 * @param {*} paramsObj
 *  @param svName 图层名称
 *  @param dir 文件路径
 *  @param description 描述
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 * @return {Promise}
 * @author tianff
 * @date 2019-8-7
 */
export function publishStreetViewService(paramsObj) {
  return fetch.post(`${streetViewUrl}/layers`, paramsObj);
}

/**
 * 获取街景数据详情
 * @param id
 * @return {Promise}
 * @author tianff
 * @date 2019-8-16
 */
export function getStreetViewInfo(id) {
  return fetch.get(`${streetViewUrl}/layerInfo?id=${id}`);
}