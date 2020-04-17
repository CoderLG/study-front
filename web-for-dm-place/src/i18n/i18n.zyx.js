import Vue from 'vue';
import VueI18n from 'vue-i18n';
import languages from './languages';
import config from './../config.zyx';

Vue.use(VueI18n);
// 从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const i18n = new VueI18n({
  locale: localStorage.language || config.language,
  messages: languages,
});
export default i18n;
