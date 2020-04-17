<template>
  <div>
    <div class="new-style-title">
      <ul>
        <li @click="goBack">返回</li>
      </ul>
    </div>
    <div id='previewFenceMap' v-loading='fenceLoad'>
      <component v-bind:is="currentComponent" :isResetPlugin='true' :isSetBaseMap="true"
       :isShowBaseMapButton="true" ref="mapComponent"></component>
    </div>
  </div>
</template>

<script>
import FenceMap from './FenceMap';
import OpenLayersComponent from './OpenLayersComponent';
import { getFenceGeo } from '../api/realTimeTaskApi';

export default {
  components: {
    FenceMap,
    'openLayersComponent': OpenLayersComponent,
  },
  data() {
    return {
      map: null,
      currentComponent: null,// 当前动态组件
      wktSource: null,// 围栏数据资源
      wktLayer: null,// 围栏图层
      fenceLoad: false,
    }
  },
  methods: {
    init(id) {
      this.currentComponent = 'openLayersComponent';
      setTimeout(async () => {
        this.$refs.mapComponent.clear();
        this.$refs.mapComponent.clearDraw();
        this.fenceLoad = true;
        const geo = await getFenceGeo(id);
        this.$refs.mapComponent.addWKTFeature(geo.data.gfData);
        this.fenceLoad = false;
      }, 500)
    },
    // 矢量图层添加feature
    addFeature(feature, isFlyTo) {
      if (feature) {
        this.wktSource.addFeature(feature);
      }
      if (isFlyTo) {
        this.flyTo(feature.getGeometry().getExtent());
      }
    },
    // 视图定位到某个位置
    flyTo(extent) {
      this.map.getView().fit(extent, {
        duration: 1000,
      });
    },
    // 返回
    goBack() {
      // this.map.removeLayer(this.wktLayer);
      this.$refs.mapComponent.clear();
      this.$refs.mapComponent.clearDraw();
      this.$emit('goBack');
    },
  },
};
</script>
<style lang="scss" scoped>
#previewFenceMap {
  position: absolute;
  width: calc(100vw - 250px);
  height: calc(100vh - 110px);
}
</style>
