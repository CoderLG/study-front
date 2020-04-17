// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import 'ol/ol.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'ztree';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import VueContextMenu from 'vue-contextmenu';
import 'font-awesome/css/font-awesome.css';
import { getToken } from './utils/auth';
import '../static/zTreeStyle.css';
import '../static/css/reset.css';// 初始化样式
import '../static/css/customStyle.css'; // 自定义全局样式

import App from './App';
import router from './router';
import store from './store';
import i18n from './i18n/i18n';

import { refreshToken } from './api/user';

Vue.use(VueContextMenu);
Vue.use(iview);
Vue.use(ElementUI);
Vue.config.productionTip = false;
const whiteList = ['/login', '/authredirect', '/service'];// 不重定向白名单
// 刷新界面时刷新一下token
const refresh = async () => {
  const token = await getToken();
  if (token) {
    refreshToken(token).then(newToken => {
      store.dispatch('refreshTokenByToken', newToken);
    });
  }
};
refresh();

router.beforeEach(async (to, from, next) => {
  // 判断icenter是否有正在进行的网络请求
  if (store.getters.isInLoaing && to.path.slice(0, 5) !== from.path.slice(0, 5)) {
    if (confirm('正在导入数据, 是否离开')) {
      store.dispatch('getIsInLoaing', { state: false });
      next();
    } else {
      next(false);
      return;
    }
  }
  // 开启加载进度条
  NProgress.start();
  // 判断是否有token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else if (store.getters.menus === undefined) {
      try {
        await store.dispatch('getUserInfo');
        next({ ...to });
      } catch (e) {
        await store.dispatch('logout');
        next({ path: '/login' });
      }
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    next();
  } else {
    next({ path: '/login' }); // 否则全部重定向到登录页
  }
});
router.afterEach(() => {
  // 结束Progress
  NProgress.done();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
});
