import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const baseTileBuilderUrl = UrlSetting.URLS.tileBuilder;

/**
 * 创建任务
 * @param params
 *  @param taskName 任务名称
 *  @param mimeType 瓦片格式
 *  @param gridSet 格网集
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param dataPath 数据位置
 *  @param savePath 存放位置
 *  @param dataType 数据类型
 *  @param tileType 切片方式
 * @return {Promise}
 * @author yangshuai
 * @date 2019-01-04
 */
export function createTask(params) {
  return fetch.post(`${baseTileBuilderUrl}/tile/task.json`, params);
}

/**
 * 获取层级范围
 * @param params
 *  @param taskName 任务名称
 *  @param mimeType 瓦片格式
 *  @param gridSet 格网集
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param dataPath 数据位置
 *  @param savePath 存放位置
 *  @param dataType 数据类型
 *  @param tileType 切片方式
 * @return {Promise}
 * @author yangshuai
 * @date 2019-01-04
 */
export function getTaskLevel(params) {
  return fetch.post(`${baseTileBuilderUrl}/tile/taskinfo.json`, params);
}

/**
 * 影像预览
 * @param params
 *  @param grayStretching 灰度拉伸
 *  @param mimeType 瓦片格式
 *  @param path  路径
 *  @param rgbIndex  波段
 *  @param transparentColor 透明色
 * @return {png}
 * @author lijy
 * @date 2019-11-26
 */
export function preview(grayStretching, mimeType, path, rgbIndex, transparentColor){
  return fetch.get(`${baseTileBuilderUrl}/tile/preview?grayStretching=${grayStretching}&mimeType=${mimeType}&path=${path}&rgbIndex=${rgbIndex}&transparentColor=${transparentColor}`,{responseType: 'blob'})
}

/**
 * 获取任务列表
 * @param params
 *  @param taskName 任务名称(模糊查询)
 *  @param page 当前页
 *  @param perPage 每页数量
 * @return {Promise}
 * @author yangshuai
 * @date 2019-01-04
 */
export function getTaskList(params) {
  return fetch.get(`${baseTileBuilderUrl}/tile/tasks.json`, {
    params
  });
}

/**
 * 获取切片任务
 * @param taskId 任务id
 * @return {Promise}
 * @author yangshuai
 * @date 2019-01-04
 */
export function getTaskDetail(taskId) {
  return fetch.get(`${baseTileBuilderUrl}/tile/task.json?taskId=${taskId}`);
}

/**
 * 删除任务
 * @param taskId 任务id
 * @return {Promise}
 * @author yangshuai
 * @date 2019-01-04
 */
export function deleteTaskById(taskId) {
  return fetch.delete(`${baseTileBuilderUrl}/tile/task.json?taskId=${taskId}`);
}

/**
 * 创建时序影像任务
 * @param params
 *  @param taskName 任务名称
 *  @param mimeType 瓦片格式
 *  @param gridSet 格网集
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param dataPath 数据位置
 *  @param savePath 存放位置
 *  @param dataType 数据类型
 *  @param tileType 切片方式
 * @return {Promise}
 * @author tianff
 * @date 2019-04-26
 */
export function createTimeImageTask(params) {
  return fetch.post(`${baseTileBuilderUrl}/time/timeTile.json`, params);
}
/**
 * 判断读取的时序影响文件的格式是否正确
 * @param dataPath
 *  @param dataType 
 *  @param grayStretching 
 *  @param gridSet 
 *  @param maxLevel 
 *  @param mimeType 
 *  @param minLevel 
 *  @param rgbIndex 
 *  @param savePath 
 *  @param show 
 *  @param taskName 
 *  @param tileType 
 *  @param transparentColor 
 *  @param type 
 * @return {Promise}
 * @author lijy
 * @date 2019-11-14
 */
export function getTimeTifTask(dataPath) {
  return fetch.post(`${baseTileBuilderUrl}/time/historicalImage`, {
    dataPath
  });
}

/**
 * 获取时序数据切片任务
 * @param taskId 任务id
 * @return {Promise}
 * @author tianff
 * @date 2019-04-23
 */
export function getTimeTaskDetail(taskId) {
  return fetch.get(`${baseTileBuilderUrl}/time/task.json?taskId=${taskId}`);
}