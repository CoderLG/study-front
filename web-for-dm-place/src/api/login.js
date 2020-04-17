import fetch from './../utils/fetch';
import UrlSetting from './UrlSetting';
import config from '../config';

const schema = config.isNeedAuth ? UrlSetting.URLS.user : UrlSetting.URLS.pan;
const schema1 = UrlSetting.URLS.user;
/**
 * 通过用户名密码登陆
 * @return {Promise}
 * @author gongzy
 * @date 2018-09-21
 */
export function loginByUsernameAndPwd(username, password) {
  return fetch.post(`${schema}/user/jwt/token`, {
    username,
    password,
  });
}

/**
 * 获取用户信息
 * @return {Promise}
 * @author gongzy
 * @date 2018-09-21
 */
export function getUserInfo() {
  return fetch.get(`${schema}/user/api/v1/user/userinfo`);
  // return {
  //   elements: [],
  //   menus: [],
  //   name:"管理员",
  //   username:"admin",
  //   id: "0",
  // }
}

/**
 * 修改用户密码
 * @return {Promise}
 * @author chenyun
 * @date 2018-11-21
 */
// export function changeUserPassword(id, params) {
//   return fetch.post(`${schema}/api/admin/user/${id}/passwd`, params);
// }

/**
 * 运维管理中修改密码
 * @param conditions
 *  @param userName 用户名
 *  @param oldPasswd 旧密码
 *  @param newPasswd 新密码
 * @return {Promise}
 * @author lijy
 * @date 2019-9-19
 */
export function changePassWork(conditions) {
  return fetch.post(`${schema1}/user/api/v1/user/password`, conditions);
}