<template>
  <div>
    <div id='map' class='base-map'></div>
    <LayersList></LayersList>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseMap from './lib/baseMap';
import LayersList from './LayersList';

export default {
  name: 'home',
  components: {
    LayersList,
  },
  mounted() {
		const baseMap = new BaseMap('map');
		baseMap.init();
  },
};
</script>

<style lang="scss" scoped>
.base-map {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 60px;
}
</style>