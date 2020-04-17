import $ from 'jquery';
import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const basePanUrl = UrlSetting.URLS.pan;
const webManageUrl = UrlSetting.URLS.webManage;
const serviceManageUrl = UrlSetting.URLS.serviceManage;
const settingsUrl = UrlSetting.URLS.settings;

/**
 * 在浏览器中新打开一个窗口
 * @param url 地址
 * @author gongzy
 * @date 2018-10-26
*/
export function showWindow(url) {
  if ('gvPopupWindow' in window) {
    window.gvPopupWindow(url);
  } else {
    // window.open(url);
    // 优雅下载
    let eleForm = $("<form method='get'></form>");
    eleForm.attr("action", url);
    $(document.body).append(eleForm);
    //提交表单，实现下载
    eleForm.submit();
  }
}

/**
 * 判断当前目录是否已经存在该名称的文件
 * @param name 文件的名称
 * @param dataEntityId 父ID
 * @return {[Promise]}
 * @author gongzy
 * @date 2018-10-26
*/
export function checkSameName(name, dataEntityId) {
  return fetch.post(`${basePanUrl}/api/v1/files/checkSameName`, {
    dataEntityId,
    name,
  });
}

/**
 * 检查文件的md5
 * @param md5 文件md5码
 * @param fileSize 文件大小
 * @param md5CheckLength 用来检测分块文件md5码的长度
 * @return {[Promise]}
 * @author gongzy
 * @date 2018-10-26
*/
export function checkFileMd5(md5, fileSize, md5CheckLength) {
  return fetch.get(`${basePanUrl}/api/v1/files/checkFileMd5/${md5}/${fileSize}/${md5CheckLength}`);
}

/**
 * 检查分片是否存在
 * @param md5 文件md5码
 * @param blockMd5  分块文件md5码
 * @param md5CheckLength  用来检测分块文件md5码的长度
 * @param chunk  第几个分块,从0开始
 * @param chunks  总分块数
 * @param chunkStart  分块开始位于的文件位置
 * @param chunkEnd  分块结束位于的文件位置
 * @return {[Promise]}
 * @author gongzy
 * @date 2018-10-26
*/
export function checkChunk(md5, blockMd5, md5CheckLength, chunk, chunks, chunkStart, chunkEnd) {
  return fetch.get(`${basePanUrl}/api/v1/files/checkChunk/${md5}/${blockMd5}/${md5CheckLength}/${chunk}/${chunks}/${chunkStart}/${chunkEnd}`);
}

/**
 * 合并文件
 * @return {[Promise]}
 * @author gongzy
 * @date 2018-10-26
*/
export function mergeChunks(md5, name, ext, createTime, size, type, parentId, path, fileType) {
  return fetch.post(`${basePanUrl}/api/v1/files/mergeChunks`, {
    md5,
    name,
    ext,
    createTime,
    size,
    type,
    parentId,
    path,
    fileType,
  });
}

/**
 * 在浏览器中新打开一个窗口
 * @param url 地址
 * @author tianff
 * @date 2019-10-14
*/
export function showWindow2(url) {
  if ('gvPopupWindow' in window) {
    window.gvPopupWindow(url);
  } else {
    window.open(url);
  }
}

/**
 * 数管文件的预览
 * @param file 预览的文件
 * @return {[Url]}
 * @author gongzy
 * @date 2018-10-26
*/
export function previewFile(file) {
  let gateway;
  if (basePanUrl.indexOf('datamanager') !== -1) {
    gateway = 'gateway';
  } else {
    gateway = '';
  }
  showWindow2(`${basePanUrl}/api/v1/filePreview/${file.id}?gateway=${gateway}`);
}

/**
 * 重命名数管数据的名称
 * @param id 文件ID
 * @param name 新的名称
 * @param dir 是否为文件夹类型
 * @param parentId 文件的父ID
 * @return {Promise} [文件的条目信息]
 * @author gongzy
 * @date 2018-10-27
*/
export function renameFile(id, name, dir, parentId) {
  return fetch.put(`${basePanUrl}/api/v1/folders`, {
    id,
    name,
    dir,
    parentId,
  });
}

/**
 * 移动文件(可多个)
 * @param ids 文件ID集合
 * @param parentId 文件的父ID
 * @return {Promise}
 * @author gongzy
 * @date 2018-10-27
*/
export function moveFiles(ids, parentId) {
  return fetch.post(`${basePanUrl}/api/v1/files/move`, {
    ids,
    parentId,
  });
}

/**
 * 复制文件(可多个)
 * @param ids 文件ID集合
 * @param parentId 文件的父ID
 * @return {Promise}
 * @author gongzy
 * @date 2018-10-27
*/
export function copyFiles(ids, parentId) {
  return fetch.post(`${basePanUrl}/api/v1/files/copy`, {
    ids,
    parentId,
  });
}

/**
 * 根据ID删除数管的数据
 * @param id
 * @return {[Promise]}
 * @author tianff
 * @date 2018-11-16
*/
export function deleteFiles(ids) {
  return fetch.delete(`${basePanUrl}/api/v1/folders`, {
    data: { ids },
  });
}

/**
 * 创建新文件夹
 * @param name 文件夹名称
 * @param parentId 文件的父ID
 * @return {[Promise]}
 * @author tianff
 * @date 2018-11-16
*/
export function fileCreateNewFolder(name, parentId) {
  return fetch.post(`${basePanUrl}/api/v1/folders`, {
    name,
    dir: 1,
    parentId,
  });
}

/**
 * 获取数管文件列表
 * @params currentPage 当前页码
 * @params pageSize 每页条目数
 * @params parentId 父ID
 * @params name 根据名称检索过滤
 * @params orderColumn 排序条件（按照时间）
 * @params orderType 排序方式
 * @return {Promise} [文件列表]
 * @author gongzy
 * @date 2018-10-12
 */
export function pageFiles(page, pageSize, parentId, name, orderColumn, orderType) {
  return fetch.get(`${basePanUrl}/api/v1/folders`, {
    params: {
      page,
      pageSize,
      parentId,
      name,
      orderColumn,
      orderType,
    },
  });
}

/*
 * 获取数据所在服务目录的路径
 * @param dataID 数据ID
 * @return {[String]}
 * @author gongzy
 * @date 2018-11-19
 */
export function getFilePath(dataId) {
  return fetch.get(`${basePanUrl}/api/v1/files/${dataId}/pathRoad`);
}

/**
 * 获取数管主界面目录引导
 * @param id 文件ID
 * @return {[Promise]} [返回值为一个数组]
 * @author gongzy
 * @date 2018-11-16
*/
export function getPath(id) {
  return fetch.get(`${basePanUrl}/api/v1/files/${id}/path`);
}

/**
 * 获取左侧目录树
 * @param iparentIdd 父文件ID
 * @return {[Promise]} [返回值为一个数组]
 * @author gongzy
 * @date 2018-11-16
*/
export function getFoldersByParent(parentId) {
  return fetch.get(`${basePanUrl}/api/v1/folders/${parentId}/folders`);
}

/**
 * 通过文件id下载文件
 * @param id 文件ID
 * @return {[文件本身]}
 * @author gongzy
 * @date 2018-11-16
*/
export function downloadFileURL(fileId) {
  return `${basePanUrl}/api/v1/files/${fileId}/download`;
}

/**
 * 返回文件上传的路径
 * @return {[String]} [URL]
 * @author gongzy
 * @date 2018-11-16
*/
export function getUploadUrl() {
  return `${basePanUrl}/api/v1/files/upload`;
}

/**
 * 获取服务目录文件夹下的子文件夹 (用于从服务器导入添加数据部分 获取目录树)
 * @param path 文件路径
 * @param fileType 文件类型
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-11-01
 */
export function scanFiles(path, fileType) {
  return fetch.get(`${basePanUrl}/api/v1/server/scanFiles`, {
    params: {
      path,
      fileType,
    },
  });
}

/**
 * 从服务器导入数据
 * @param filePath 需要入库的文件路径
 * @param destPath 目的地路径
 * @param fileType 文件类型
 * @param parentId 父id
 * @param status 导入状态(复制、剪切)
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-11-01
 */
export function saveFiles(filePath, destPath, fileType, parentId, status) {
  return fetch.post(`${basePanUrl}/api/v1/server/fileImport`, {
    filePath,
    destPath,
    fileType,
    parentId,
    status,
  });
}

/*
 * 获取扫描入库的进度
 * @param sourcePath 需要入库的文件路径
 * @param targetPath 目的地路径
 * @ data 2018-12-24
 */
export function getFileProgress(sourcePath, targetPath, status) {
  return fetch.get(`${basePanUrl}/api/v1/server/fileImportProgress`, {
    params: {
      sourcePath,
      targetPath,
      status,
    },
  });
}

/*
 * 获取从服务器导入数据的目的地真实路径
 * @author tianff
 * @date 2018-12-18
 */
export function getRealFilePath() {
  return fetch.get(`${basePanUrl}/api/v1/files/getRealFilePath`);
}

/**
 * 入库监听(暂时舍弃)
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param currentPage 当前页
 * @param pageSize 每页的条目数
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-11-01
 */
export function storageMonitor(startTime, endTime, currentPage, pageSize) {
  return fetch.post(`${basePanUrl}/api/v1/files/monitor`,{
    startTime,
    endTime,
    currentPage,
    pageSize,
  });
}

/**
 * 获取服务器的目录 (用于发布服务、数据处理的选择数据部分)
 * @param path 路径
 * @returns {Promise<*>}
 * @author tianff
 * @date 2018-11-22
 */
export function getServerDirectory(filePath, direction) {
  return fetch.post(`${settingsUrl}/files/getSystemDirs`, {
    filePath,
    direction
  });
}

/**
 * 网盘存储的数据量统计-运维管理
 * @returns {Promise<*>} [返回数管的文件个数和文件大小]
 * @author tianff
 * @date 2018-11-22
 */
export function dataStatistics() {
  return fetch.get(`${basePanUrl}/api/v1/files/statistics`);
}

/*
 * 获取数据存储状态-运维管理
 * @returns {String} [警告、不足...]
 * @author tianff
 * @date 2018-11-22
 */
export function getDataStorageStatus() {
  return fetch.get(`${basePanUrl}/api/v1/files/spaceStatus`);
}

/*
 * 获取数据存储状态值-运维管理
 * @returns {Promise}
 * @author tianff
 * @date 2018-11-22
 */
export function getDataStorageParams() {
  return fetch.get(`${basePanUrl}/api/v1/files/statisticsSpace`);
}

/*
 * 获取系统服务状态值-运维管理
 * @returns {Promise}
 * @author tianff
 * @date 2018-11-22
 */
export function getSystemServerParams() {
  return fetch.get(`${serviceManageUrl}/service/statistic`);
}

/*
 * 获取服务器本身型号配置-运维管理
 * @returns {Promise} [CPU、RAM...]
 * @author tianff
 * @date 2018-11-22
 */
// export function getServerHardwareConfig() {
//   return fetch.get(`${webManageUrl}/api/v1/baseImages/status`);
// }

/*
 * 获取服务器类型
 * @returns {Promise} [linux、windows]
 * @author tianff
 * @date 2018-11-22
 */
export function getServerType() {
  return fetch.get(`${settingsUrl}/files/serviceType`);
}

/**
 * 新增用户底图配置信息列表
 * @author chenyunyun
 * @date 2018-12-24
 */
export function addBaseMapData(array) {
  return fetch.put(`${webManageUrl}/api/v1/files/baseMapConfigs`, array);
}

/**
 * 根据底图id，删除所有引用了该底图的配置项
 * @author chenyunyun
 * @date 2018-12-24
 */
export function delBaseMapData(baseMapId) {
  return fetch.delete(`${webManageUrl}/api/v1/files/baseMapConfigByMapIds?baseMapId=${baseMapId}`);
}

/**
 * 查询用户底图配置信息列表
 * @author chenyunyun
 * @date 2018-12-24
 */
export function getBaseMapData() {
  return fetch.get(`${webManageUrl}/api/v1/files/baseMapConfigs`);
}

/**
 * 设置该用户底图配置信息
 * @param <baseMapId> baseMapId属性
 * @author chenyunyun
 * @date 2018-12-24
 */
export function setBaseMapDefault(baseMapId) {
  return fetch.put(`${webManageUrl}/api/v1/files/defaultBaseMapConfig?baseMapId=${baseMapId}`);
}

/**
 * 查询该用户默认底图配置信息
 * @author chenyunyun
 * @date 2018-12-24
 */
export function getDefaultMap() {
  return fetch.get(`${webManageUrl}/api/v1/files/defaultBaseMapConfig`);
}

/**
 * 服务管理中删除同时删除底图配置数据
 * @param {*} id 传入id
 * @date 2018-12-24
 * @author chenyunyun
 */
export function delBaseMapCs(id) {
  return fetch.delete(`${webManageUrl}/api/v1/files/baseMapConfigByIds?id=${id}`);
}

/**
 * 分享网盘
 * @param deIds
 * @param userIds
 * @returns {*}
 */
export function shareFile(deIds, userIds) {
  return fetch.post(`${basePanUrl}/api/v1/files/shares`, {
    deIds,
    userIds,
  });
}

/**
 * 获取用户分享的数据
 */
export function getShares() {
  return fetch.get(`${basePanUrl}/api/v1/files/shares`);
}

/**
 * 通过id用户分享的数据
 * @param shareId
 * @author gongzy
 * @date 2018-06-20
 */
export function deleteShare(shareId) {
  return fetch.delete(`${basePanUrl}/api/v1/files/shares/${shareId}`);
}

/**
 * 获取被分享的数据
 */
export function getBeShares() {
  return fetch.get(`${basePanUrl}/api/v1/files/beShares`);
}

/**
 * 获取所有发布图层数据
 * @param {*} page 当前页
 * @param {*} pageSize 总页数
 * @param {*} orderType 排序
 * @param {*} name 关键字
 * @param {*} layerType 类型
 * @param {*} filter 过滤
 * @param {*} isBase 是否为基础数据
 * @returns { promises <array>}
 * @author chenyunyun
 * @date 2018-12-17
 */
export function getAllData(page, pageSize, orderType, name, isBase) {
  return fetch.get(`${webManageUrl}/api/v1/services`, {
    params: {
      page,
      pageSize,
      orderType,
      name,
      isBase,
    },
  });
}

/**
 * 获取已添加的数据类型列表
 * @return { Promise }
 * @author tianff
 * @date 2019-7-25
 */
export function getdataTypeList(page, size) {
  return fetch.get(`${basePanUrl}/api/v1/extendType/gettTypeList?currentPage=${page}&pageSize=${size}`);
}

/**
 * 获取数据类型详情
 * @return { Promise }
 * @author tianff
 * @date 2019-8-1
 */
export function getdataTypeInfo(dataType) {
  return fetch.get(`${basePanUrl}/api/v1/extendType/getExtendDataDetails/${dataType}`);
}

/**
 * 获取数管数据解析的详情
 * @return { Promise }
 * @author tianff
 * @date 2019-8-2
 */
export function getdataDetail(id) {
  return fetch.post(`${basePanUrl}/api/v1/files/FileDetails?id=${id}`);
}

/**
 * 获取服务器物理机路径
 * @return { String }
 * @author tianff
 * @date 2019-8-29
 */
export function getServerPath() {
  return fetch.get(`${settingsUrl}/files/importFilePath`);
}

/**
 * 获取iCenter中的服务器物理机路径以及docker里的路径
 * @return {Promise}
 * @author lijy
 * @date 2020-03-24
 */
export function getDataDir(){
  return fetch.get(`${serviceManageUrl}/service/datadir`)
}

/**
 * 对解析失败的数据 再次解析
 * @return { String }
 * @author tianff
 * @date 2019-8-29
 */
export function parseDataAgain(dataEntityId) {
  return fetch.get(`${basePanUrl}/api/v1/reAnalysisData/${dataEntityId}`);
}