import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const dmUrl = UrlSetting.URLS.pan;
const geoDataUrl = UrlSetting.URLS.geodata;
const tileCacheUrl = UrlSetting.URLS.tileCache;
const previewTileUrl = UrlSetting.URLS.previewTile;

/**
 * 根据数据ID获取影像详情
 * @param dataId
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-12-19
 */
// export function getImageDetails(dataId) {
//   return fetch.get(`${geoDataUrl}/images/dmData/${dataId}`);
// }

/**
 * 获取数据发布的影像、矢量服务列表(查看服务)
 * @param dataId
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-12-20
 */
export function getDataLayersList(dataId) {
  return fetch.get(`${geoDataUrl}/${dataId}/layers`);
}

/**
 * 获取数据发布的地形服务列表(查看服务)
 * @param dataId
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-09-12
 */
export function getTerrainDataLayersList(dataId) {
  return fetch.get(`${tileCacheUrl}/layers/terrain/info/${dataId}`);
}

/**
 * 获取图层(组)列表
 * @params page 当前页码
 * @params pageSize 每页条目数
 * @params order 排序方式
 * @params layerType 瓦片类型 (IMAGELAYER \ VECTORLAYER \ DEMLAYER \ LAYERGROUP)
 * @params isBase 图层类型 true false (base、layer)
 * @params layerName 使用图层名称过滤
 * @params sortBy 按照哪个字段排序(默认是id)
 * @return {Promise} [图层列表]
 * @author tianff
 * @date 2018-12-19
 */
export function getLayersList(page, pageSize, order, layerType, isBase, layerName, sortBy) {
  return fetch.get(`${geoDataUrl}/layers`, {
    params: {
      page,
      pageSize,
      order,
      isBase,
      layerType,
      layerName,
      sortBy,
    },
  });
}

/**
 * 删除图层（图层组）
 * @params id 需要删除的图层id
 * @return {Object}
 * @author tianff
 * @date 2018-12-18
 */
export function deleteLayers(id) {
  return fetch.delete(`${geoDataUrl}/layers/${id}`);
}

/**
 * 图层(组)切片
 * @param id
 * @return {[Object]}
 * @author tianff
 * @date 2018-12-19
 */
export function sliceTileLayer(id) {
  return fetch.post(`${geoDataUrl}/layers/${id}/tileTask`);
}

/**
 * 获取切片/局部更新进度
 * @param id
 * @return {[Number]}
 * @author tianff
 * @date 2018-12-19
 */
export function sliceTileLayerProgress(id) {
  return fetch.get(`${geoDataUrl}/layers/${id}/tileTask/progress`);
}

/**
 * 获取MBTiles数据的字段信息
 * @param dirPath MBTiles数据的路径
 * @return {Promise} [包含mimetype、maxlevel等字段的信息]
 * @author tianff
 * @date 2019-7-2
 */
export function getMbtilesDataInfo(dirPath) {
  return fetch.get(`${tileCacheUrl}/layers/mbtiles/metadata?path=${dirPath}`);
}

/**
 * 获取Huarui数据的字段信息
 * @param dirPath    HuaRui数据的路径
 * @return {Promise} [包含mimetype、maxlevel等字段信息]
 * @author lijy
 * @date 2020-3-17
 */
export function getHuaruiDataInfo(dirPath) {
  return fetch.get(`${tileCacheUrl}/layers/huarui/metadata?path=${dirPath}`);
}

/**
 * 数据处理中，存储到Hbase的图层通过图层Id获取图层的字段信息(基础影像、时序影像)
 * @param  layerId 存储到Hbase的数据图层Id
 * @return {Promise} [包含mimetype、maxlevel等字段的信息]
 * @author lijy
 * @date 2019-11-25
 */
export function getHbaseDataInfo(layerId) {
  return fetch.get(`${tileCacheUrl}/layers/hbase/metadata/layerid/${layerId}`);
}

/**
 *  基础影像的Huarui IDB数据-发布服务
 *  @param paramsObj
 *  @param layername 图层名称
 *  @param path 数据路径
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param isBase 是否为基础数据，非必填，默认为true
 *  @returns {Promise<*>}
 *  @author lijy
 *  @date 2020-3-17
 */
export function publishIDBService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/ogchuarui`, paramsObj);
}

/**
 * 基础影像、地形的mbtiles切片-发布服务
 * @param paramsObj
 *  @param layername 图层名称
 *  @param path 数据路径
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param isBase 是否为基础数据，非必填，默认为true
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-7-2
 */
export function publishMbtilesService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/mbtiles`, paramsObj);
}

/**
 * 获取待发布Hbase图层列表信息
 * @param keyword 搜索关键词
 * @param page 当前页
 * @param pageSize 每页的数量
 * @returns {Promise<*>}
 * @author lijy
 * @date 2019-12-11
 */
export function getHbaseLayerList(keyword,page,pageSize) {
  return fetch.get(`${tileCacheUrl}/layers/hbase/metadata?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
}

/**
 * 获取待发布时序影像Hbase图层列表信息
 * @param keyword 搜索关键词
 * @param page 页码
 * @param pageSize 每页的数量
 * @returns {Promise<*>}
 * @author lijy
 * @date 2019-12-11
 */
export function getOGCTHbaseLayerList(keyword,page,pageSize) {
  return fetch.get(`${tileCacheUrl}/layers/ogcthbase/metadata?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
}

/**
 * hbase瓦片-发布服务
 * @param paramsObj
 *  @param layername 图层名称
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param layerId 图层ID
 *  @param tableName 表名
 *  @param isBase 是否为基础数据，非必填，默认为true
 * @returns {Promise<*>}
 * @author chenyun
 * @date 2018-12-20
 */
export function publishHbaseService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/hbase`, paramsObj);
}

/**
 * 时序影像hbase瓦片-发布服务
 * @param paramsObj
 *  @param layerName 图层名称
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param layerId 图层ID
 *  @param tableName 表名
 *  @param isBase 是否为基础数据，非必填，默认为true
 * @param subLayers
 * @param regionNum
 * @returns {Promise<*>}
 * @author lijy
 * @date 2019-11-22
 */
export function publishOGCTHbaseService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/ogcthbase`, paramsObj);
}

/**
 * 获取待发布数据(tiff/img/tiffdir)信息
 * @param path tif数据的路径
 * @returns {Promise<*>}
 * @author chenyun
 * @date 2018-12-20
 */
export function getTifDataInfo(path,epsg) {
  return fetch.post(`${geoDataUrl}/layers/images/metadata?path=${path}&epsg=${epsg}`);
}

/**
 * tif、img、tif文件夹-发布服务
 * @param paramsObj
 *  @param layerName 图层名称
 *  @param path 文件(文件夹)路径
 *  @param mimeType 瓦片格式
 *  @param gridSet 格网集
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 * @return {Promise}
 * @author chenyun
 * @date 20418-12-20
 */
export function publishTifService(paramsObj) {
  return fetch.post(`${geoDataUrl}/layers`, paramsObj);
}

/**
 * 基础影像的局部更新
 * @param id
 * @param path 局部数据服务器路径
 * @return {Promise}
 * @author tianff
 * @date 2018-12-19
 */
export function updateBaseImage(id, path) {
  return fetch.post(`${tileCacheUrl}/layers/${id}/partupdatetask?path=${path}`);
}

/**
 * 编辑影像属性信息
 * @param dataId
 * @param imageMeta  参数对象
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-11-12
 */
export function editImageAttributes(dataId, imageMeta) {
  return fetch.put(`${geoDataUrl}/images/dmData/${dataId}`, imageMeta);
}

/**
 * 发布图层组
 * @param paramsObj
 * @return {Promise}
 * @author chenyun
 * @date 2018-12-20
 */
export function publishLayerGroup(paramsObj) {
  return fetch.post(`${geoDataUrl}/layers/layerGroup`, paramsObj);
}

/**
 * 根据ID查询图层（组）信息
 * @param id 需要查询图层id
 * @return {Promise} [用于图层预览]
 * @author tianff
 * @date 2018-12-20
 */
export function getLayersInfo(id) {
  return fetch.get(`${geoDataUrl}/layers/${id}`);
}

/**
 * 图层(组)停止切片
 * @param id
 * @return {Object}
 * @author chenyun
 * @date 2018-12-19
 */
export function stopLayerSliceTile(id) {
  return fetch.delete(`${geoDataUrl}/layers/${id}/tileTask`);
}

/**
 * 高级查询检索
 * @param searchParams
 *  @param currentPage 当前页
 *  @param pageSize 每页条目数
 *  @param dataType 数据类型
 *  @param geo 查询范围(wkt格式)
 *  @param keyWordName 关键字
 * @return {Promise}
 * @author tianff
 * @date 2019-08-8
 */
export function advancedSearch(searchParams) {
  return fetch.post(`${dmUrl}/api/v1/advancedSearch`, searchParams);
}

/**
 * 高级查询 - 上传矢量文件
 * @author yangshuai
 */
export function uploadShpFile(data) {
  return fetch.post(`${dmUrl}/api/v1/shpUpload`, data);
}

/**
 * 高级查询 - 获取卫星，产品级别等信息
 * @params key 卫星，产品级别对应关键词
 * @returns {Promise<*>}
 * @author yangshuai
 * @date 2019-01-04
 */
export function getImageDictionary(key) {
  return fetch.get(`${dmUrl}/api/v1/dictionaries/${key}`);
}

/**
 * 根据瓦片经纬度查询时序影像信息
 * @params 
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-01-10
 */
export function getTimeImageInfo(layerName, lon, lat, level) {
  return fetch.get(`${previewTileUrl}/service/time?lat=${lat}&layer=${layerName}&lon=${lon}&request=gettime&zoo=${level}`);
}

/**
 * 解析RocksDB数据-发布基础影像模块
 * @params path rocksdb数据的路径
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-03-14
 */
export function getRocksDBInfo(path) {
  return fetch.get(`${tileCacheUrl}/layers/rbtiles/metadata?path=${path}`);
}

/**
 * 发布RocksDB数据-发布基础影像模块
 * @param paramsObj
 *  @param layerName 图层名称
 *  @param path 文件(文件夹)路径
 *  @param isBase 是否为基础影像服务
 *  @param isTerrain 是否为地形服务
 *  @param mimeType 瓦片格式
 *  @param gridSet 格网集
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param zip 是否为压缩包
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-03-14
 */
export function publishRocksDbService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/rbtiles`, paramsObj);
}

/**
 * 发布时序影像mbtiles服务
 * @param paramsObj
 *  @param layername 图层名称
 *  @param path 数据路径
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param isEncrypt 是否加密
 *  @param isBase 是否为基础数据，非必填，默认为true
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-04-23
 */
export function publishTMbtilesService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/ogctmbtiles`, paramsObj);
}

/**
 * 获取MBTiles数据的字段信息
 * @param dirPath MBTiles数据的路径
 * @return {Promise} [包含mimetype、maxlevel等字段的信息]
 * @author tianff
 * @date 2018-04-23
 */
export function getTMbtilesDataInfo(dirPath) {
  return fetch.get(`${tileCacheUrl}/layers/ogctmbtiles/metadata?path=${dirPath}`);
}

/**
 * 获取瓦片图层(基础影像、地形、时序影像)列表
 * @params page 当前页码
 * @params pageSize 每页条目数
 * @params order 排序方式
 * @params layerType 瓦片类型 (IMAGELAYER \ VECTORLAYER \ DEMLAYER \ LAYERGROUP)
 * @params isBase 图层类型 true false (base、layer)
 * @params layerName 使用图层名称过滤
 * @params sortBy 按照哪个字段排序(默认是id)
 * @return {Promise} [图层列表]
 * @author tianff
 * @date 2019-7-2
 */
export function getTileLayersList(page, pageSize, order, layerType, isBase, layerName, sortBy) {
  return fetch.get(`${tileCacheUrl}/layers`, {
    params: {
      page,
      pageSize,
      order,
      isBase,
      layerType,
      layerName,
      sortBy,
    },
  });
}

/**
 * 删除瓦片图层（基础影像、地形、时序影像）
 * @params id 需要删除的图层id
 * @return {Object}
 * @author tianff
 * @date 2019-7-2
 */
export function deletetileLayers(id) {
  return fetch.delete(`${tileCacheUrl}/layers/${id}`);
}

/**
 * 根据ID查询瓦片图层（基础影像、地形、时序影像）信息
 * @param id 需要查询图层id
 * @return {Promise} [用于图层预览]
 * @author tianff
 * @date 2019-7-2
 */
export function getTileLayersInfo(id) {
  return fetch.get(`${tileCacheUrl}/layers/${id}`);
}

/**
 * 解析tpk数据-发布基础影像模块
 * @params path tpk数据的路径
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-07-4
 */
export function getTpkInfo(path) {
  return fetch.get(`${tileCacheUrl}/layers/tpk/metadata?path=${path}`);
}

/**
 * 基础影像tpk-发布服务
 * @param paramsObj
 *  @param layerName 图层名称
 *  @param path 数据路径
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param isBase 是否为基础数据，非必填，默认为true
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-7-2
 */
export function publishTpkService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/tpk`, paramsObj);
}

/**
 * 解析grst数据-发布基础影像模块
 * @params path grst数据的路径
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-08-19
 */
export function getGrstInfo(path) {
  return fetch.get(`${tileCacheUrl}/layers/grst/metadata?path=${path}`);
}

/**
 * 基础影像grst-发布服务
 * @param paramsObj
 *  @param layerName 图层名称
 *  @param path 数据路径
 *  @param gridSet 网格
 *  @param mimeType 瓦片格式
 *  @param minX 最小经度
 *  @param maxX 最大经度
 *  @param minY 最小纬度
 *  @param maxY 最大纬度
 *  @param minLevel 最小层级
 *  @param maxLevel 最大层级
 *  @param isBase 是否为基础数据，非必填，默认为true
 * @returns {Promise<*>}
 * @author tianff
 * @date 2019-8-19
 */
export function publishGrstService(paramsObj) {
  return fetch.post(`${tileCacheUrl}/layers/grst`, paramsObj);
}

/**
 * 获取基础影像切片进度
 * @param id
 * @return {[Number]}
 * @author tianff
 * @date 2019-09-10
 */
export function getBaseImageSliceTileProgress(id) {
  return fetch.get(`${tileCacheUrl}/layers/${id}/tileTask/progress`);
}