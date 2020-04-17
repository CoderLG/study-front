export default {
     //设置被选中球的id并保证只有一个球处于选中状态
    SET_CURRENT_EARTH: (state, earth) => {
        if (state.currentEarth !== '') state.currentEarth.isSelect = false; //保证只有一个球处于选中状态

        state.currentEarth = earth;
        state.currentEarth.isSelect = true;
    },
    //设置多球个数
    SET_EARTH_NUM: (state, num) => {
        state.earthNum = num; 
    }
}