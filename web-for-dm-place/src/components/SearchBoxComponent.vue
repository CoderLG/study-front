<template>
  <div class="searchBox">
    <el-input v-model='searchName' class='input-search' placeholder="请输入名称" clearable size="small" @keyup.enter.native="startAddSearchPlace"></el-input>
    <el-button icon="el-icon-search" type="primary" size="small" @click="startAddSearchPlace"></el-button>
    <ul class="list-module" v-show="length">
      <li v-for ="(item,index) in datalist" @click="listClick(item)" :key="index" :title='item.DMDZ'>
        <p class="list-item-text">{{ item.DMMC }}</p>
        <p class="list-item-ms">{{ item.DMDZ }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import WKT from 'ol/format/wkt';
import { getPlaceName, getGeometryByCode, getGeometryByCountryName } from '../api/placeApi';
import GlobeControl from './GlobeControl';

export default {
  name: "SearchBox",
  components: {
    GlobeControl,
  },
  data() {
    return {
      searchName: '',
      datalist:[],
      wktFormat: new WKT(),
    };
  },
  computed: {
    length() {
      return this.datalist.length;
    }
  },
  watch: {
    searchName(val) {
      this.searchName = val;
      if(val!=""){
         this.startAddSearchPlace();
      } else {
        this.datalist = [];
      }
    },
  },
  methods: {
     // 搜索
     async startAddSearchPlace() {
       if(this.searchName !=""){
         this.datalist = await getPlaceName(this.searchName);
       } else {
         this.datalist = [];
       }
      
      // if (this.datalist.length === 0) {
      //   this.$message.warning({ message: '该位置信息不存在！', showClose: true });
      //   return;
      // }
    },
    // 地图层级对应高度
    altitudeMap (LV) {
      let altitude = '';
      if (LV === 9) {
        altitude = 3;
      } else if (LV === 13) {
        altitude = 1;
      }else if (LV === 7) {
        altitude = 120;
      }else if (LV === 5) {
        altitude = 1000;
      }else if (LV === 3) {
        altitude = 5150;
      }
      return altitude * 1000;
    },
    // 点击
    async listClick(data) {
      const position = data.WZ;
      const mapAlt = this.altitudeMap(data.LV);
      var district = false;
      const point = position.substring(position.indexOf('(') + 1, position.indexOf(')'));
      if (data.polygon !== null ) {
        district =  await this.getArea(data.polygon);
        this.$emit('searchDem', point, data.DMMC, mapAlt, district);
      } else {
        this.$emit('searchDem', point, data.DMMC, mapAlt, false);
      }
    },
    //通过code获取区域范围
    async getArea(code) {
      var area = '';
      if (!isNaN(Number(code))) {
        area = await getGeometryByCode(code);
      } else {
        area = await getGeometryByCountryName(code);
      }
      var newAreaPoints = [];
      var dataGeometry = this.wktFormat.readGeometry(area);
      var allAreaPoints = dataGeometry.flatCoordinates //一个数组存放所有的坐标点
      var ends = [];
      if (dataGeometry.endss_[0].length > 1) {
        ends = dataGeometry.endss_[0];
      } else {
        dataGeometry.endss_.forEach((arrs) => {
          arrs.forEach((arr) => {
            ends.push(arr);
          })
        })
      }
      if (ends.length === 1) {
        newAreaPoints = [allAreaPoints];
      } else {
        for( let i = 0 ; i < ends.length; i++) {
          if (i === 0 ){
            newAreaPoints.push(allAreaPoints.slice(0, ends[i]));
          } else {
            newAreaPoints.push(allAreaPoints.slice(ends[i-1], ends[i]));
          }
        }
      }
      return newAreaPoints;
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBox {
  width: 340px;  
  position: absolute;
  z-index: 1;
  left: -140px;
  .input-search {
    width: 290px;
  }
  button {
    height: 35px;
    background: #24A5F8;
    vertical-align: top;
  }
  .list-module {
    max-height: 580px;
    overflow-y: auto;
    background: white;
    li {
      &._self-hide {
          display: none;
      }
      margin-top: 0.5em;
      padding: 0.5em;
      &:hover {
        cursor:pointer;
        color: #fff;
        background: #00a0e9;
      }
    }
  }
  .list-item-text {
    font-size: 14px;
  }
  .list-item-ms {
    width: 315px;
    display: inline-block;
    vertical-align: text-bottom;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 10px;
    color: #b8b8b8;
    font-size: 12px;
  }
}
</style>


