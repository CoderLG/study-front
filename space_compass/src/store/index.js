import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)

const state = {
    currentEarth:'', //当前选中的earth
    earthNum:1, //展示的球个数 1、2、3、4、6、9
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})