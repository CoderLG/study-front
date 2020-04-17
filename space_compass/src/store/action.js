export default {
    async setCurrentEarth({commit}, earth) {
        console.log(earth)
        commit('SET_CURRENT_EARTH', earth);
    },
    async setEarthNum({commit}, num) {
        commit('SET_EARTH_NUM', num);
    },
}