<template>
  <open-layers-component ref="mapComponent"></open-layers-component>
</template>

<script>
/* eslint-disable no-param-reassign */
import OpenLayersComponent from './OpenLayersComponent';
import { getLayersInfo, getTileLayersInfo } from '../api/imageApi';

export default {
  name: 'openLayers',
  components: {
    OpenLayersComponent
  },
  computed: {
    mapComponent() {
      return this.$refs.mapComponent;
    }
  },
  mounted() {
    this.differentiatingLayer(this.$route.params.id);
  },
  methods: {
    // 获取影像数据
    async getBaseImageMessage(id) {
      const result = await getTileLayersInfo(id);
      this.buildLayers(result, true);
    },
    // 获取影像数据
    async getImageMessage(id) {
      const result = await getLayersInfo(id);
      this.buildLayers(result);
    },
    // 获取图层组数据
    async getImageVectorGroupMessage(id) {
      const result = await getLayersInfo(id);
      this.buildLayers(result);
    },
    // 获取矢量数据
    async getVectorMessage(id) {
      const result = await getLayersInfo(id);
      result.layer = result.workspace ? `${result.workspace}:${result.layerName}` : result.layerName;
      if (result.mimeType === 'PNG') {
        result.tileType = 'vector-png';
        //result.gridSet = 'EPSG:4326';
      } else {
        result.tileType = 'vector-geojson';
      }
      this.buildLayers(result);
    },
    // 加载图层
    buildLayers(data, isTrue) {
      const source = this.mapComponent.buildLayers(data, isTrue);
      let extent = this.mapComponent.change24326([data.minX, data.minY, data.maxX, data.maxY], data.gridSet, data.gridSet);
      // 针对geojson的3857数据
      if (data.tileType === 'vector-geojson' && data.gridSet === 'EPSG:3857') {
        extent = this.mapComponent.change24326([data.minX, data.minY, data.maxX, data.maxY], data.gridSet, 'EPSG:4326');
      }
      if (data.tileType === 'vector-geojson') {
        this.mapComponent.vectorMapLayer.setSource(source);
        this.mapComponent.vectorMapLayer.setExtent(extent);
      } else {
        this.mapComponent.baseMapLayer.setSource(source);
        this.mapComponent.baseMapLayer.setExtent(extent);
      }
      this.mapComponent.flyTo(extent);
    },
    // 根据paramsId的不同加载不同的图层
    differentiatingLayer(paramsId) {
      const type = paramsId.slice(0, paramsId.indexOf(':'));
      const id = paramsId.slice(paramsId.indexOf(':') + 1);
      switch (type) {
        case 'baseImage' :
          this.getBaseImageMessage(id);
          break;
        case 'image' :
          this.getImageMessage(id);
          break;
        case 'shp':
          this.getVectorMessage(id);
          break;
        case 'layerGroup':
          this.getImageVectorGroupMessage(id);
          break;
        default:
          break;
      }
    }
  },  
};
</script>
