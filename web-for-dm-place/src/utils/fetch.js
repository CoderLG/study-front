import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from '../store';
import {
  getTokenExpiredTime,
  refreshToken
} from '../api/user';

import {
  getToken
} from './auth';

const AUTHOR = 'Authorization';
let tokenExpiredTime = 360; // 默认一小时360s
getTokenExpiredTime().then(res => {
  tokenExpiredTime = res;
})
let currentReqTime;
let lastReqTime;
let timeSpace;
// 创建axios实例
const service = axios.create({
  // timeout: 200000, // 请求超时时间
});
service.defaults.withCredentials = false;
// 添加请求拦截器
service.interceptors.request.use((config) => {
  if (lastReqTime) {
    currentReqTime = new Date().getTime();
    // 最新一次操作距离上一次操作过了多久
    timeSpace = (currentReqTime - lastReqTime) / 1000;
    // 用户停止操作的时间超过token有效时间 自动退出登陆
    if (timeSpace > tokenExpiredTime) { // 当请求间隙 超过tokrn有效时间时 退出登录
      store.dispatch('fedLogOut').then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    } else if ((timeSpace + 1) > tokenExpiredTime) { // 当请求间隙+1超过token有效期 刷新token
      refreshToken(getToken()).then(newToken => {
        store.dispatch('refreshTokenByToken', newToken);
      });
    }
  }
  lastReqTime = new Date().getTime(); // 毫秒 1s == 1000ms
  // 使每个请求都携带token
  if (store.getters.token) {
    // eslint-disable-next-line    
    config.headers[AUTHOR] = getToken();
  }
  if (config.url.indexOf('mergeChunks') > -1) {
    // eslint-disable-next-line
    config.timeout = 3600000;
  }
  return config;
}, error => Promise.reject(error));
// 添加相应拦截器
service.interceptors.response.use((response) => {
  // 当返回中自定义的代码有权限问题时, 进行相应的控制
  const res = response.data;
  if (response.status === 401 || res.status === 40101) {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      store.dispatch('fedLogOut').then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    });
    return Promise.reject('error');
  } else if (res.status === 40301) {
    MessageBox.confirm('当前用户无相关操作权限！', '提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      store.dispatch('fedLogOut').then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    });
    return Promise.reject('error');
  }
  if (response.status !== 200 && res.status !== 200) {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true,
    });
  } else {
    return res;
  }
  return res;
}, ({
  message,
  response
}) => {
  let messageMsg = null;
  if (response) {
    // messageMsg = '操作异常';
    messageMsg = response.data.msg;
    switch (response.data.status) {
      case 404:
        // messageMsg = '404-访问资源未发现';
        messageMsg = '';
        break;
      case 400:
        messageMsg = '错误的请求';
        break;
      default:
        messageMsg = response.data.message || messageMsg || response.data.status || response.status;
        break;
    }
  } else {
    messageMsg = message;
  }
  // if (messageMsg === 'Network Error') messageMsg = '服务异常，请重启服务！';
  if (messageMsg) {
    if (messageMsg === '删除失败,该任务有正在执行的任务，请先停止任务') {
      Message({
        message: messageMsg,
        type: 'warning',
        duration: 5 * 1000,
        showClose: true,
      });
    } else {
      Message({
        message: messageMsg,
        type: 'error',
        duration: 5 * 1000,
        showClose: true,
      });
    }

  }
  return Promise.reject(messageMsg);
});
export default service;
