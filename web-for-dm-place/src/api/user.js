import packageFetch from './../utils/fetch';
import UrlSetting from './UrlSetting';

const schema = UrlSetting.URLS.user;

/**
 * 分页获取用户信息
 */
export function getUserByPage(page, limit, name) {
  return packageFetch.get(`${schema}/api/admin/user/page`, { params: { page, limit, name } });
}

/**
 * 获取token过期时间
 * @return {String}
 * @author tianff
 * @date 2018-12-02
 */
export function getTokenExpiredTime() {
  return fetch(`${schema}/user/jwt/timeout`).then(res => res.json());
}

/**
 * 刷新token
 * @param token 旧的token
 * @return {String} [新的token]
 * @author tianff
 * @date 2018-12-02
 */
export function refreshToken(token) {
  return fetch(`${schema}/user/jwt/refresh?token=${token}`).then(res => res.json());
}

/**
 * 获取服务器上的时间
 * @return {String}
 * @author tianff
 * @date 2019-10-23
 */
export function getServerTime() {
  return packageFetch.get(`${schema}/user/jwt/time`);
}
