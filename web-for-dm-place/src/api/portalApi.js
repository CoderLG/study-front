import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const portalBaseUrl = UrlSetting.URLS.portal;

/**
 * 保存基础底图
 * @param baseImageObject
 * @returns {AxiosPromise<any>}
 */
export function saveBaseImage(baseImageObject) {
  return fetch.post(`${portalBaseUrl}/api/v1/baseImages`, baseImageObject);
}

/**
 * 获取所有的基础底图
 * @returns {AxiosPromise<any>}
 */
export function getAllBaseImages() {
  return fetch.get(`${portalBaseUrl}/api/v1/baseImages`);
}
/**
 * 获取所有的基础底图
 * @returns {AxiosPromise<any>}
 */
export function getLayersByBaseImageId(id) {
  return fetch.get(`${portalBaseUrl}/api/v1/baseImages/layers/${id}`);
}
/**
 * 通过id 删除基础底图
 * @param id
 */
export function deleteBaseImage(id) {
  return fetch.delete(`${portalBaseUrl}/api/v1/baseImages/${id}`);
}

/**
 * 保存基础数据的关联图层
 * @param baseImageLayer
 * @returns {AxiosPromise<any>}
 */
export function saveBaseImageLayer(baseImageLayer) {
  return fetch.post(`${portalBaseUrl}/api/v1/baseImages/layers`, baseImageLayer);
}

/**
 * 通过图层id删除图层
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteImageLayer(id) {
  return fetch.delete(`${portalBaseUrl}/api/v1/baseImages/layers/${id}`);
}
/**
 *保存标记
*/
export function collectMark(name, desc, lon, lat, files) {
  const data = new FormData();
  files.forEach((val) => {
    data.append('files', val);
  });
  data.append('name', name);
  data.append('des', desc);
  data.append('lon', lon);
  data.append('lat', lat);
  return fetch.post(`${portalBaseUrl}/api/v1/markers`, data);
}
/**
 *通过id删除标记
*/
export function deleteMark(id) {
  return fetch.delete(`${portalBaseUrl}/api/v1/markers/${id}`);
}
/**
 *通过附件id获取附件
*/
export function formatAttachmentById(attachmentId) {
  return `${portalBaseUrl}/api/v1/markers/attachments/${attachmentId}`;
}
/**
 *分页获取标记
 * currentPage 当前页码
 * pageSize 每页条目数
*/
export function getMarkList(currentPage, pageSize) {
  return fetch.get(`${portalBaseUrl}/api/v1/markers`, {
    params: {
      currentPage,
      pageSize,
    },
  });
}
/**
 *保存视角
*/
export function collectCamera(nameval, base64, viewpointval) {
  const data = {
    name: nameval,
    img: base64,
    viewport: viewpointval,
  };
  return fetch.post(`${portalBaseUrl}/api/v1/viewports`, data);
}
/**
 *分页获取视角收藏
 * currentPage 当前页码
 * pageSize 每页条目数
*/
export function getCameraList(currentPage, pageSize) {
  return fetch.get(`${portalBaseUrl}/api/v1/viewports`, {
    params: {
      currentPage,
      pageSize,
    },
  });
}
/**
 *通过id删除视角
*/
export function deleteCamera(id) {
  return fetch.delete(`${portalBaseUrl}/api/v1/viewports/${id}`);
}
