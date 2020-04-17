import axios from 'axios';
import { Message } from 'element-ui';
import UrlSetting from './UrlSetting';

const ip = UrlSetting.URLS.serviceManage;
const serviceUrl = `http://${ip}/api/v1`;
const logWebSocketUrl = `ws://${ip}/websocket`;
const service = axios.create({
  // timeout: 200000, // 请求超时时间
});
service.interceptors.response.use((response) => {
  // 当返回中自定义的代码有权限问题时, 进行相应的控制
  const res = response.data;
  if (response.status !== 200 && res.status !== 200) {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000,
    });
  } else {
    return res;
  }
  return res;
}, ({ message, response }) => {
  let messageMsg = null;
  if (response) {
    messageMsg = '操作异常';
    switch (response.data.status) {
      case 404:
        messageMsg = '访问资源未发现';
        break;
      case 400:
        messageMsg = '错误的请求';
        break;
      default:
        messageMsg = response.data.message || messageMsg;
        break;
    }
  } else {
    messageMsg = message;
  }
  Message({
    message: messageMsg,
    type: 'error',
    duration: 5 * 1000,
  });
  return Promise.reject(messageMsg);
});

export function showWindow(url) {
  if ('gvPopupWindow' in window) {
    window.gvPopupWindow(url);
  } else {
    window.open(url);
  }
}
export function getServiceInfo() {
  return service.get(`${serviceUrl}/services`);
}

export function addServiceInfo(newServiceData) {
  return service.post(`${serviceUrl}/services`, newServiceData);
}

export function editServiceInfo(editData) {
  return service.put(`${serviceUrl}/services`, editData);
}

export function startServices(id) {
  return service.post(`${serviceUrl}/services/${id}/start`);
}

export function stopServices(id) {
  return service.post(`${serviceUrl}/services/${id}/stop`);
}

export function startAllServices() {
  return service.post(`${serviceUrl}/services/start`);
}

export function stopAllServices() {
  return service.post(`${serviceUrl}/services/stop`);
}

export function deleteServices(ids) {
  return service.delete(`${serviceUrl}/services/${ids}`);
}
export function getServiceStatus(ids) {
  return service.get(`${serviceUrl}/services/${ids}`);
}

export function upLoadServiceFile(id) {
  return `${serviceUrl}/services/upload/${id}`;
}

export function downloadServiceFile(id) {
  return `${serviceUrl}/services/download/${id}`;
}

export function getServiceConfigInfo(id) {
  return service.get(`${serviceUrl}/configs/${id}`);
}

export function editServiceConfigInfo(configServiceData) {
  return service.put(`${serviceUrl}/configs`, configServiceData);
}

export function getServiceLogContent(id) {
  return service.get(`${serviceUrl}/logs/content/${id}`);
}

export function downloadLogURL(id) {
  return `${serviceUrl}/logs/file/${id}`;
}

export function getLogByWebSocket(id) {
  return new WebSocket(`${logWebSocketUrl}/${id}`);
}

/**
 * 获取Hbase数据源列表
 * @return {Promise}
 * @author lijy
 * @date 2019-11-19
 */
export function getHbaseSourceList(){
  return service.get(`${ip}/hbase/config`);
}

/**
 * 通过名称来获取HBase集群的配置
 * @params name
 * @return {Promise}
 * @author lijy
 * @date 2019-11-19
 */
export function getDataSourcebyName(name){
  return service.get(`${ip}/hbase/config/${name}`)
}

