<template>
  <div class="Home">
    <el-container>
      <!-- 头部面板 -->
      <el-header height="56px">
        <button style="position:absolute" @click="changeLog()">多球选择</button>
        <multiGlobeVue />
      </el-header>
      <!-- 地球面板 -->
      <el-main>
          <transition>
              <keep-alive>
                  <router-view></router-view>
              </keep-alive>
          </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import multiGlobeVue from './GlobalSetting/multiGlobe.vue'
export default {
  name: 'Home',
  components:{
    multiGlobeVue
  },
  methods:{
    changeLog(){
      this.$bus.emit("toggleMultiGlobe");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Home{
  width: 100%;
  height: 100%;
  position: relative;
}
.el-container {
    height: 100%;
}
.home{
  width: 100%;
  height: 100%;
  position:absolute;
  z-index:10;
}
.el-main {
    padding: 0px;
}
</style>
