<template>
  <div>
    <!-- <nav-component></nav-component> -->
    <globe-control :isResetPlugin='true' :is2D3DPlugin='true' :isScalePlugin='true' ref="mapComponent" />
  </div>
</template>

<script>
// import NavComponent from './NavComponent';
import GlobeControl from './GlobeControl';

export default {
  components: {
    // NavComponent,
    GlobeControl,
  },
  mounted() {
    setTimeout(() => {
      this.$refs.mapComponent.demClickEvent();
    }, 1000)
  },
};
</script>

