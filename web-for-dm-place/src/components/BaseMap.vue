<template>
  <el-dropdown class="base-map-icon" trigger="click" @command="changeMap">
      <span class="el-dropdown-link">
        <img src="../assets/base-layer.svg" width="22" height="22">
      </span>
    <el-dropdown-menu class="base-map-list" slot="dropdown">
      <el-dropdown-item :class="{'active-map':currentMap && item.id === currentMap.id}"
        v-for="(item,index) in baseMapList" :key="index" :command="index">
        <div :title="item.layerName">{{item.layerName}}</div>
      </el-dropdown-item>
      <el-dropdown-item v-if="!baseMapList || !baseMapList[0]">
        <div title="您需要在运维管理中设置底图">{{'您需要在运维管理中设置底图'}}</div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { getDefaultMap, getBaseMapData } from '../api/fileApi';

export default {
  name: "BaseMap",
  data() {
    return {
      baseMapList: null,
      currentMap: null,
      localhostMap: {
        "tileType":"local",
        "gridSet":"EPSG:4326",
        "url":`http://${window.location.host}/static/tms/`,
      }
    }
  },
  methods: {
    async getMapList() {
      this.currentMap = await getDefaultMap() || this.localhostMap;
      this.baseMapList = await getBaseMapData();
    },
    changeMap(index) {
      this.currentMap = this.baseMapList[index];
      this.$emit('changeMap', this.currentMap);
    },
    // 用于过滤不同投影方式的图层
    async getProjLayerList(type) {
      const baseMapList = await getBaseMapData();
      this.baseMapList = [];
      baseMapList.forEach(res => {
        if (res.gridSet === type || res.tileType === 'NET-U') {
          this.baseMapList.push(res);
        }
      });
    },
  },
  mounted() {
    this.getMapList();
  },
};
</script>

<style lang="scss">
  .base-map-icon{
    .el-dropdown-link{cursor: pointer}
    .el-dropdown-link > img{margin-top: 7px;}
  }
  .base-map-list{
    max-height: calc(100vh - 200px);
    overflow-y: scroll;
    .el-dropdown-menu__item > div{
      width: 120px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    .active-map{background-color: #ecf5ff;color: #66b1ff;}
  }
</style>
