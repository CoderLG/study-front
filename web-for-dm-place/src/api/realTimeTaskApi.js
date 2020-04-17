import fetch from '../utils/fetch';
import UrlSetting from './UrlSetting';

const geoLotUrl = UrlSetting.URLS.geoLotUrl;
const fenceWarnWebSocketUrl = `ws://${geoLotUrl.slice(geoLotUrl.indexOf(':') + 3, geoLotUrl.length)}/webSocket/taskStreamDataSend`;

/**
 * 获取实时任务列表
 * @param page 当前页
 * @param size 条目数
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function getRealTimeList(page, size) {
  return fetch.get(`${geoLotUrl}/RunSiddhiFileApi/findTaskAll?page=${page}&size=${size}`);
}

/**
 * 启动任务
 * @param createTime 创建时间
 * @param id 任务ID
 * @param isRunning 任务状态
 * @param stRunningIp 远行节点
 * @param scriptId 脚本ID
 * @param stTaskName 任务名称
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function startTask(taskObj) {
  return fetch.post(`${geoLotUrl}/RunSiddhiFileApi/startTask`, taskObj);
}

/**
 * 停止任务
 * @param createTime 创建时间
 * @param id 任务ID
 * @param isRunning 任务状态
 * @param stRunningIp 远行节点
 * @param scriptId 脚本ID
 * @param stTaskName 任务名称
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function stopTask(taskObj) {
  return fetch.post(`${geoLotUrl}/RunSiddhiFileApi/stopTask`, taskObj);
}

/**
 * 删除任务
 * @param id 任务ID
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function removeTask(id) {
  return fetch.delete(`${geoLotUrl}/RunSiddhiFileApi/delTask?id=${id}`);
}

/**
 * 发布实时数据服务(任务)
 * @param smid 脚本ID
 * @param sourceId 数据源ID
 * @param stServiceName 服务名称
 * @param initLon 中心点经度
 * @param initLat 中心点纬度
 * @return {Promise}
 * @author tianff
 * @date 2018-05-31
 */
export function publishRealTimeService(params) {
  return fetch.post(`${geoLotUrl}/RunSiddhiFileApi/createTask`, params);
}

/**
 * 获取聚合图数据
 * @param sourceId 数据源ID
 * @param minLon 最小经度
 * @param maxLon 最大经度
 * @param minLat 最小纬度
 * @param maxLat 最大纬度
 * @param level 层级
 * @return {Promise}
 * @author tianff
 * @date 2018-06-5
 */
// http://192.168.4.24:8580/api/v1/data/clusterGeohash?sourceId=1&minLon=116.7&maxLon=116&minLat=39.7&maxLat=40.2&level=11
export function getRealTimeData(sourceId, minLon, maxLon, minLat, maxLat, level) {
  return fetch.get(`${geoLotUrl}/data/cluster?sourceId=${sourceId}&minLon=${minLon}&maxLon=${maxLon}&minLat=${minLat}&maxLat=${maxLat}&level=${level}`);
}

/**
 * 获取目标最新数据
 * @param sourceId 数据源ID
 * @param minLon 最小经度
 * @param maxLon 最大经度
 * @param minLat 最小纬度
 * @param maxLat 最大纬度
 * @return {Promise}
 * @author tianff
 * @date 2018-06-5
 */
export function getTargetData(sourceId, minLon, maxLon, minLat, maxLat) {
  return fetch.get(`${geoLotUrl}/data/targets?sourceId=${sourceId}&minLon=${minLon}&maxLon=${maxLon}&minLat=${minLat}&maxLat=${maxLat}`,{});
}

/**
 * 获取历史轨迹
 * @param sourceId 数据源ID
 * @param targetId 目标ID
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @return {Promise}
 * @author fanmh
 * @date 2018-06-12
 */
export function getTrackData(sourceId, targetId, startTime, endTime) {
  return fetch.get(`${geoLotUrl}/data/track?sourceId=${sourceId}&targetId=${targetId}&startTime=${startTime}&endTime=${endTime}`);
}

/**
 * 获取历史轨迹
 * @param sourceId 数据源ID
 * @param targetId 目标ID
 * @param targetName 
 * @return {Promise}
 * @author fanmh
 * @date 2018-06-13
 */
export function getTargetList(sourceId, targetName) {
  return fetch.get(`${geoLotUrl}/data/target?sourceId=${sourceId}&targetName=${targetName}`);
}

/**
 * 获取数据源列表
 * @param page 当前页
 * @param size 条目数
 * @return {Promise}
 * @author liuxj
 * @date 2019-06-21
 */
// export function getSourceList(page, size) {
//   return fetch.get(`${geoLotUrl}/SiddhiSourceApi/findSiddhiSourceAll?page=${page}&size=${size}`);
// }

/**
 * 删除数据源
 * @param id
 * @return {Promise}
 * @author liuxj
 * @date 2019-06-21
 */
export function removeSource(ssId) {
  return fetch.delete(`${geoLotUrl}/SiddhiSourceApi/delSiddhiSource?ssId=${ssId}`);
}

/**
 * 新增数据源
 * @param formData 表单数据
 * @param smSourceId 一个数据源Id
 * @return {Promise}
 * @author liuxj
 * @date 2019-06-21
 */
export function addNewSource(formData) {
  return fetch.post(`${geoLotUrl}/SiddhiSourceApi/addSiddhiSource`, formData);
}

/**
 * 编辑数据源
 * @param formData 表单数据
 * @param smSourceId 一个数据源Id
 * @return {Promise}
 * @author liuxj
 * @date 2019-06-21
 */
export function editNewSource(formData) {
  return fetch.post(`${geoLotUrl}/SiddhiSourceApi/editSiddhiSource`, formData);
}

/**
 * 获取目标类型列表
 * @param page 当前页
 * @param size 条目数
 * @return {Promise}
 * @author liuxj
 * @date 2019-06-24
 */
export function getTargetManagerList(page, size) {
  return fetch.get(`${geoLotUrl}/TargetManagerApi/targetTypes?page=${page}&size=${size}`);
}

/**
* 新增目标类型
* @param formData 表单数据
* @return {Promise}
* @author liuxj
* @date 2019-06-24
*/
export function addNewTarget(formData) {
  return fetch.post(`${geoLotUrl}/TargetManagerApi/addTargetType`, formData);
}

/**
* 修改目标类型
* @param formData 表单数据
* @return {Promise}
* @author liuxj
* @date 2019-06-24
*/
export function editTarget(formData) {
  return fetch.post(`${geoLotUrl}/TargetManagerApi/updateTargetType`, formData);
}

/**
* 删除目标类型
* @param tmId 目标类型Id
* @return {Promise}
* @author liuxj
* @date 2019-06-24
*/
export function delTarget(tmId) {
  return fetch.delete(`${geoLotUrl}/TargetManagerApi/delTargetType?tmId=${tmId}`);
}

/**
 * 根据任务ID获取任务详情
 * @param id 数据源ID
 * @return {Promise}
 * @author tianff
 * @date 2018-06-25
 */
export function getTaskInfo(id) {
  return fetch.get(`${geoLotUrl}/RunSiddhiFileApi/findSiddhiTaskByStId?id=${id}`);
}

/**
 * 获取围栏列表
 * @param page 起始页
 * @param size 每页的条目数
 * @return {Promise}
 * @author liuzj
 * @date 2018-06-28
 */
export function getGeoFenceList(page, size) {
  return fetch.get(`${geoLotUrl}/GeoFenceApi/findGeoFenceVOAll?page=${page}&size=${size}`);
}

/**
 * 新增或修改围栏数据
 * @param formData 表单数据
 * @return {Promise}
 * @author liuxj
 * @date 2019-06-28
 */
export function addOrEditNewFence(formData) {
  return fetch.post(`${geoLotUrl}/GeoFenceApi/addOrEditGeoFence`, formData);
}

/**
* 删除围栏数据
* @param gfId 目标类型Id
* @return {Promise}
* @author liuxj
* @date 2019-06-28
*/
export function delFence(gfId) {
  return fetch.delete(`${geoLotUrl}/GeoFenceApi/delGeoFence?gfId=${gfId}`);
}

/**
 * 根据任务ID获取任务关联的围栏
 * @param stId 数据源ID
 * @return {Promise}
 * @author tianff
 * @date 2018-07-03
 */
export function getTaskFenceInfo(gfStid) {
  return fetch.get(`${geoLotUrl}/RunSiddhiFileApi/findGeoFenceVOByTaskId?gfStid=${gfStid}`);
}

/**
 * 简历围栏告警的推送
 * @param id 任务id
 * @return Promise}
 * @author tianff
 * @date 2019-7-3
 */
export function fenceWarnByWebSocket(id) {
  return new WebSocket(`${fenceWarnWebSocketUrl}/${id}`);
}

/**
 * 获取单目标热力图数据
 * @param sourceId 数据源ID
 * @param targetId 目标ID
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param minLon 最小经度
 * @param maxLon 最大经度
 * @param minLat 最小纬度
 * @param maxLat 最大纬度
 * @return {Promise}
 * @author tianff
 * @date 2018-07-22
 */
export function getTargetHeatMapData(sourceId, targetId, startTime, endTime, minLon, maxLon, minLat, maxLat) {
  return fetch.get(`${geoLotUrl}/data/track?sourceId=${sourceId}&targetId=${targetId}&startTime=${startTime}&endTime=${endTime}&minLon=${minLon}&maxLon=${maxLon}&minLat=${minLat}&maxLat=${maxLat}`);
}

/**
 * 查询所有内置的目标icon图标
 * @param page 当前页数
 * @param size 每页条目数
 * @return Promise
 * @author tianff
 * @date 2019-7-22
 */
export function getDefaultIcon(page, size) {
  return fetch.get(`${geoLotUrl}/IconStoreApi/iconStores?page=${page}&size=${size}`);
}

/**
 * 获取历史前60分钟的数据接入速率（ES）
 * @return Promise
 * @author tianff
 * @date 2019-8-13
 */
export function getHistroySpeed() {
  return fetch.get(`${geoLotUrl}/statistics/hisSpeed`);
}

/**
 * 获取当前数据接入速率（ES）
 * @return Promise
 * @author tianff
 * @date 2019-8-13
 */
export function getCurrentSpeed() {
  return fetch.get(`${geoLotUrl}/statistics/currentSpeed`);
}

/**
 * 获取当前数据总量
 * @return Promise
 * @author tianff
 * @date 2019-8-13
 */
export function getCurrentTotalData() {
  return fetch.get(`${geoLotUrl}/statistics/currentTotal`);
}

/**
 * 获取围栏geo
 * @return String
 * @author tianff
 * @date 2019-10-15
 */
export function getFenceGeo(id) {
  return fetch.get(`${geoLotUrl}/GeoFenceApi/findGeoFence?id=${id}`);
}