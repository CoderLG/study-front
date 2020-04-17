<template>
  <div :id="earthId" class="Earth"></div>
</template>

<script>
import { createGuid } from "../assets/utils";
export default {
    name:'Earth',
    data(){
        return{
            earthId: ""
        }
    },
    created(){
        this.earthId = createGuid();
        let that = this;
        this.$nextTick(()=>{
            that.earth = new GV.GeoCanvas(this.earthId, {
                baseLayerPicker: false,
                imageryProvider: new Cesium.WebMapServiceImageryProvider({
                    url: `http://icenter.geovis.online/geoserverplus/gwc/service/wms`,
                    layers: "image_globle_base-PNG-4326",
                    parameters: {
                    format: "image/png"
                    },
                    srs: "EPSG:4326"
                })
            });
            window.earth = that.earth;
        })
    }
}
</script>

<style>
.Earth {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>