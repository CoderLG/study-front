import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const tiltPhotoUrl = UrlSetting.URLS.tiltPhoto;

/**
 * 获取倾斜摄影列表
 * @param {*} paramsObj
 *  @param name 图层名称
 *  @param page 当前页码
 *  @param pageSize 每页条目数
 *  @param layerName 搜索关键字
 *  @param orderType 排序类型
 * @return {Promise}
 * @author tianff
 * @date 2018-12-01
 */
export function getTiltPhotoList(page, pageSize, orderType, layerName) {
  return fetch.get(`${tiltPhotoUrl}/layers`, {
    params: {
      page,
      pageSize,
      orderType,
      layerName,
    },
  });
}

/**
 * 删除倾斜摄影图层
 * @param id
 * @return {Object}
 * @author tianff
 * @date 2018-12-01
 */
export function deleteTilePhotoLayer(id) {
  return fetch.delete(`${tiltPhotoUrl}/layers`, {
		data: {
			"ids": [
				id
			]
		},
  });
}

/**
 * 解析osgb的xml文件
 * @param dir
 * @param format
 * @return {Promise}
 * @author tianff
 * @date 2018-12-01
 */
export function resolveOsgbInfo(dir, format) {
  return fetch.post(`${tiltPhotoUrl}/layers/parseDoc`, {
    dir,
    format
  });
}

/**
 * 判断数据是否符合要求
 * @param dir
 * @param format
 * @return {Boolean}
 * @author tianff
 * @date 2018-12-01
 */
export function fileIsExist(dir, format) {
  return fetch.post(`${tiltPhotoUrl}/layers/fileIsExist`, {
    dir,
    format
  });
}

/**
 * 倾斜摄影-发布服务
 * @param {*} paramsObj
 *  @param name 图层名称
 *  @param dir
 *  @param format
 * @return {Promise}
 * @author tianff
 * @date 2018-12-01
 */
export function publishTilePhotoService(paramsObj) {
  return fetch.post(`${tiltPhotoUrl}/layers`, paramsObj);
}