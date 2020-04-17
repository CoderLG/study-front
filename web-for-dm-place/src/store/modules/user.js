import { Message } from 'element-ui';
import { getToken, removeToken, setToken } from '../../utils/auth';
import { getUserInfo, loginByUsernameAndPwd } from '../../api/login';
import { getMarkList, getCameraList } from '../../api/portalApi';
import { getRsaPassWord } from '../../utils/passWordRsa';
import { getServerTime } from '../../api/user';

export default {
  state: {
    name: '',
    token: getToken(),
    menus: undefined,
    elements: undefined,
    info: {},
    markcollect: {},
    cameracollect: {},
    isInLoaing: false,
    baseImageObj: {},
    fileType: '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements;
    },
    GET_MARKER: (state, markcollect) => {
      state.markcollect = markcollect;
    },
    GET_CAMERA: (state, cameracollect) => {
      state.cameracollect = cameracollect;
    },
    GET_IsInLoaing: (state, isInLoaing) => {
      state.isInLoaing = isInLoaing;
    },
    GET_BaseImageObj: (state, baseImageObj) => {
      state.baseImageObj = baseImageObj;
    },
    SET_FileType: (state, fileType) => {
      state.fileType = fileType;
    },
  },
  actions: {
    async loginByUser({ commit }, userInfo) {
      const username = userInfo.username.trim();
      commit('SET_TOKEN', undefined);
      removeToken();
      // rsa加密
      const time = await getServerTime();
      const encrypted = getRsaPassWord(time+userInfo.password);
      const response = await loginByUsernameAndPwd(username, encrypted);
      // const response = await loginByUsernameAndPwd(username, userInfo.password);
      const token = response.token;
      if (token === null || token === '') {
        Message({
          message: '账户或密码错误！',
          type: 'warning',
        });
      } else {
        setToken(token);
        commit('SET_TOKEN', token);
        // 将用户信息存储在localstorage中 供系统管理使用 前提两个环境没有跨域
        const userresult = await getUserInfo(token);
        // 判断用户是否有权限登陆
        let roleList = [];
        userresult.baseRoles.map((item) => {
          roleList.push(item.id);
        });
        localStorage.setItem('role', roleList);
      }
    },
    async refreshTokenByToken({ commit }, params) {
      const token = params.token;
      commit('SET_TOKEN', undefined);
      removeToken();
      if (token === null || token === '') {
        /* eslint-disable */
        console.warn('刷新token失败')
        /* eslint-enable */
      } else {
        setToken(token);
        commit('SET_TOKEN', token);
      }
    },
    async getUserInfo({ commit, state }) {
      const response = await getUserInfo(state.token);
      // 判断用户是否有权限登陆
      let roleList = [];
      response.baseRoles.map((item) => {
        roleList.push(item.id);
      });
      if (roleList.indexOf(3) === -1) {
        Message({
          message: '当前用户无相关操作权限！',
          type: 'error',
        });
        commit('SET_TOKEN', '');
        commit('SET_MENUS', undefined);
        commit('SET_ELEMENTS', undefined);
        removeToken();
        return Promise.reject('error');
      }
      let data = response;
      data.menus = [];
      data.elements = [];
      commit('SET_INFO', data);
      const menus = {};
      for (let i = 0; i < data.menus.length; i += 1) {
        menus[data.menus[i].code] = true;
      }
      commit('SET_MENUS', menus);
      const elements = {};
      for (let i = 0; i < data.elements.length; i += 1) {
        elements[data.elements[i].code] = true;
      }
      commit('SET_ELEMENTS', elements);
      return data;
    },
    // 前端 登出
    fedLogOut({
      commit,
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_MENUS', undefined);
        commit('SET_ELEMENTS', undefined);
        removeToken();
        resolve();
      });
    },
    // 登出
    async logout({ commit }) {
      commit('SET_TOKEN', undefined);
      removeToken();
    },
    // 获取注记收藏
    async getMyMarkList({ commit }, params) {
      const list = await getMarkList(params.currentPage, params.pageSize);
      commit('GET_MARKER', list);
    },
    // 获取视角收藏
    async getMyCameraList({ commit }, params) {
      const list = await getCameraList(params.currentPage, params.pageSize);
      commit('GET_CAMERA', list);
    },
    // 获取icenter是否正在进行网络请求
    async getIsInLoaing({ commit }, params) {
      commit('GET_IsInLoaing', params.state);
    },
    // 获取icenter中的基础底图
    async getBaseImageObj({ commit }, params) {
      commit('GET_BaseImageObj', params.state);
    },
    // 设置数据管理中上传文件的类型
    async setFileType({ commit }, params) {
      commit('SET_FileType', params.state);
    },
  },
};
