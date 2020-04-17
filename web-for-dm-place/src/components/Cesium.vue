<template>
  <globe-control :isResetPlugin='true' :is2D3DPlugin='true'
    class="data-preview-globel" :isScalePlugin='true' :isAddTerrain="isAddTerrain"
    :isAddTiltphoto="isAddTiltphoto" :isAddTimeImage='isAddTimeImage' :isAddStreetView='isAddStreetView' ref="mapComponent"
    @startAddTerrain="getTerrainMessage" @startAddTiltphoto="startAddTiltphoto"
    @startAddTimeImage='startAddTimeImage' @startAddStreetView='startAddStreetView'>
  </globe-control>
</template>

<script>
import GlobeControl from './GlobeControl';
import { getTimeImageInfo, getTileLayersInfo } from '../api/imageApi';
import { getStreetViewInfo } from '../api/streetViewApi';
import UrlSetting from '../api/UrlSetting';

const previewTile = UrlSetting.URLS.previewTile;
const tiltPhoto = UrlSetting.URLS.tiltPhoto;

export default {
  name: "Cesium",
  components: {
    GlobeControl,
  },
  data() {
    return {
      isAddTerrain: false,
      isAddTiltphoto: false,
      isAddTimeImage: false,
      isAddStreetView: false,
      streetId: null,// 街景ID
    }
  },
  mounted() {
    const type = this.$route.params.id.slice(0, this.$route.params.id.indexOf(':'));
    if (type === 'dem') {
      this.isAddTerrain = true;
    } else if (type === 'tiltphoto') {
      this.isAddTiltphoto = true;
    } else if (type === 'timeImage') {
      this.isAddTimeImage = true;
    } else if (type === 'streetView') {
      this.isAddStreetView = true;
      this.streetId = this.$route.params.id.slice(this.$route.params.id.indexOf(':') + 1, this.$route.params.id.length);
    }
  },
  computed: {
    mapComponent() {
      return this.$refs.mapComponent;
    },
  },
  methods: {
    //获取地形数据
    async getTerrainMessage() {
      const paramsId = this.$route.params.id;
      const id = paramsId.slice(paramsId.indexOf(':') + 1);
      const result = await getTileLayersInfo(id);
      const terrainMessage = {
        'tileType': 'DEM',
        'layerName': result.layerName,
        'url': previewTile + '/service/terrain/'+result.layerName,
        'rectangle':[result.minX, result.minY, result.maxX, result.maxY]
      };
      this.mapComponent.addTerrain(terrainMessage);
    },
    // 触发加载倾斜摄影
    startAddTiltphoto() {
      const paramsId = this.$route.params.id;
      let id = paramsId.slice(paramsId.indexOf(':') + 1);
      const type = id.slice(id.indexOf(':') + 1, id.length);
      id = id.slice(0, id.indexOf(':'));
      if (type === 'B3DM') {
        this.mapComponent.addTiltPhoto(`${tiltPhoto}/layers/dataset/${id}/tileset.json`);
      } else {
        this.mapComponent.addTiltPhotoForGrid(`${tiltPhoto}/layers/dataset/${id}/`);
      }      
    },
    // 触发加载时序影像
    async startAddTimeImage() {
      // Image_test-PNG-4326
      const timelineImageInfo = await getTimeImageInfo('icenter:YeiGuang', 116.391142, 39.907043, 2);
      this.mapComponent.addTimeImage(timelineImageInfo);
    },
    // 触发加载街景
    startAddStreetView() {
      getStreetViewInfo(this.streetId).then(res => {
        this.mapComponent.addStreetView(res);
      });
    },
  },
};
</script>

<style lang='scss'>
  .data-preview-globel {
    height: 100% !important;
  }
</style>
