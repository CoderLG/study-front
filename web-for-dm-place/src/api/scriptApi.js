import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const geoLotUrl = UrlSetting.URLS.geoLotUrl;

/**
 * 获取脚本列表
 * @param page 当前页
 * @param size 条目数
 * @return {Promise}
 * @author tianff
 * @date 2018-05-30
 */
export function getScriptList(page, size) {
  return fetch.get(`${geoLotUrl}/SiddhiManagerApi/findSiddhiManagerAll?page=${page}&size=${size}`);
}

/**
 * 删除脚本
 * @param id
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function removeScript(id) {
  return fetch.delete(`${geoLotUrl}/SiddhiManagerApi/delSiddhiManager?id=${id}`);
}

/**
 * 新增脚本
 * @param formData 表单数据
 * @param file 脚本文件
 * @param smSourceId 一个没用的占位参数
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function addNewScript(formData) {
  return fetch.post(`${geoLotUrl}/SiddhiManagerApi/addSiddhiManager`, formData);
}

/**
 * 解析脚本
 * @param formData 表单数据
 * @param file 脚本文件
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function analysisScript(formData) {
  return fetch.post(`${geoLotUrl}/SiddhiManagerApi/siddhiNameAndDescribe`, formData);
}

/**
 * 下载脚本
 * @param id 脚本ID
 * @return 脚本文件
 * @author tianff
 * @date 2018-06-17
 */
export function downloadScript(id) {
  window.open(`${geoLotUrl}/SiddhiManagerApi/download/${id}`);
}

/**
 * 获取脚本内容
 * @param id 脚本ID
 * @return 脚本内容
 * @author tianff
 * @date 2018-06-18
 */
export function getScriptContent(id) {
  return fetch.get(`${geoLotUrl}/SiddhiManagerApi/findFileContentBySmId?id=${id}`);
}

/**
 * 校验脚本内容
 * @param content 脚本内容
 * @return {Promise}
 * @author tianff
 * @date 2018-06-18
 */
export function verifyScriptContent(content) {
  return fetch.post(`${geoLotUrl}/SiddhiManagerApi/checkFileContent`, content, {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  });
}

/**
 * 编辑修改脚本内容
 * @param name 脚本名称
 * @param createTime 脚本创建时间
 * @param describe 脚本描述
 * @param id 脚本ID
 * @param scriptName 脚本文件名称
 * @param smFileContent 脚本内容
 * @return {Promise}
 * @author tianff
 * @date 2018-06-18
 */
export function editScriptContent(params) {
  return fetch.post(`${geoLotUrl}/SiddhiManagerApi/editSiddhiManager`, params);
}

/**
 * 获取脚本关联的任务的信息
 * @param id 脚本ID
 * @return {Promise}
 * @author tianff
 * @date 2018-06-18
 */
export function getScriptTaskInfo(id) {
  return fetch.get(`${geoLotUrl}/RunSiddhiFileApi/taskStatusBySmid?scriptId=${id}`);
}

/**
 * 文件热更新
 * @param id 脚本ID
 * @return {Promise}
 * @author tianff
 * @date 2018-06-18
 */
export function siddhiHeatUpdate(id) {
  return fetch.post(`${geoLotUrl}/RunSiddhiFileApi/siddhiChange`, id, {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  });
}