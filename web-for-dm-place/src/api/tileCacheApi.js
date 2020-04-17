import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const tileCacheUrl = UrlSetting.URLS.tileCache;

/**
 * 获取数据导出任务列表
 * @param {*} paramsObj
 *  @param page 当前页码
 *  @param pageSize 每页条目数
 *  @param name 搜索关键字
 * @return {Promise}
 * @author tianff
 * @date 2019-8-6
 */
export function getDataExportList(page, pageSize, name) {
  return fetch.get(`${tileCacheUrl}/task/tasks`, {
    params: {
      page,
      pageSize,
      name,
    },
  });
}

/**
 * 新增数据导出任务
 * @param {*} params
 *  @param name 任务名称
 *  @param outputPath 导出地址
 *  @param sourceAddress 数据源地址
 *  @param sourceTablename 表名称
 *  @param subTasks 子任务
 *   @param layerMin 开始层级
 *   @param layerMax 结束层级
 *   @param lonBegin 最小经度
 *   @param lonEnd 最大经度
 *   @param latBegin 最小纬度
 *   @param latEnd 最大纬度
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-8-7
 */
export function addDataExportTask(params) {
  return fetch.post(`${tileCacheUrl}/task/new`, params);
}

/**
 * 删除数据导出任务
 * @param id 任务ID
 * @return {Object}
 * @author tianff
 * @date 2019-8-07
 */
export function deleteDataExportTask(id) {
  return fetch.delete(`${tileCacheUrl}/task/${id}`);
}

/**
 * 获取habse数据源列表
 * @param {*} paramsObj
 *  @param page 当前页码
 *  @param pageSize 每页条目数
 *  @param type 类型（1:hbase 2:mbtiles）
 * @return {Promise}
 * @author tianff
 * @date 2019-8-7
 */
export function getHbaseDataSourceList(page, pageSize, type) {
  return fetch.get(`${tileCacheUrl}/datasources`, {
    params: {
      page,
      pageSize,
      type,
    },
  });
}

/**
 * 获取habse数据源对应的表的列表
 * @param id hbase数据源ID
 * @return {Promise}
 * @author tianff
 * @date 2019-8-7
 */
export function getHbaseTablesList(id) {
  return fetch.get(`${tileCacheUrl}/datasource/hbasetables/${id}`);
}

/**
 * 基础影像回滚
 * @param id
 * @return {Promise}
 * @author tianff
 * @date 2019-8-12
 */
export function baseDataRollback(id) {
  return fetch.post(`${tileCacheUrl}/layers/${id}/restore`);
}

/**
 * 获取数据导出进度
 * @param taskId 任务ID
 * @return {Promise}
 * @author tianff
 * @date 2019-8-20
 */
export function getDataExportProgress(id) {
  return fetch.get(`${tileCacheUrl}/task/taskProgress?id=${id}`);
}

/**
 * 发布地形数据
 * @param paramsObj
 *  @param dataEntityId 
 *  @param taskName
 *  @param dataPath
 *  @param gridSet
 *  @param mimeType
 *  @param minLevel
 *  @param maxLevel
 *  @param transparentColor
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-8-27
 */
export function publishTerrainLayer(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/terrain`, paramsObj);
}

/**
 * 获取地形数据层级
 * @param path
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-8-28
 */
export function getTerrainLayerInfo(path) {
  return fetch.get(`${tileCacheUrl}/layers/terrain/info?path=${path}`);
}

/**
 * 合并瓦片返回影像（54s）
 * @param layerName 图层名称
 * @param dataType 数据类型 0：tif，1：bmp
 * @param level 层级
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-12-05
 */
export function getRangeTiff(layerName, dataType, level, minx, miny, maxx, maxy) {
  if ('gvPopupWindow' in window) {
    window.gvPopupWindow(`${tileCacheUrl}/layers/combineTiles/?layerName=${layerName}&dataType=${dataType}&level=${level}&maxX=${maxx}&maxY=${maxy}&minX=${minx}&minY=${miny}`);
  } else {
    window.open(`${tileCacheUrl}/layers/combineTiles/?layerName=${layerName}&dataType=${dataType}&level=${level}&maxX=${maxx}&maxY=${maxy}&minX=${minx}&minY=${miny}`);
  }
}
