<template>
  <el-dialog title="查看服务" :visible.sync="dialogServiceList"
             @open="open" class='service-list-wrap' :close-on-click-modal='false'>
    <p class="service-list-title" v-if='this.activeFile'>{{ this.activeFile.name }}发布的服务：</p>
    <ul class="service-list-main" v-if='serviceList.length'>
      <li v-for='(li, index) in serviceList' :key='index'>
        {{ li.layerName }}
      </li>
    </ul>
    <div class="service-list-main-none" v-else>未发布</div>
    <div class="service-ist-footer">
      <el-button type="primary" size='small' @click="dialogServiceList = false">确 定</el-button>          
    </div>
  </el-dialog>
</template>

<script>
import { getDataLayersList, getTerrainDataLayersList } from '../api/imageApi';

export default {
  props: {
    activeFile: {
      type: Object,
    },
  },
  data() {
    return {
      dialogServiceList: false, // 数据编辑的显隐
      serviceList: [
        {'layerName': '暂未发布'},
      ],
    };
  },
  methods: {
    show() {
      this.dialogServiceList = true;
    },
    hidden() {
      this.dialogServiceList = false;
    },
    async open() {
      if (this.activeFile.dataType === 'terrain') {
        getTerrainDataLayersList(this.activeFile.id).then(res => {
          this.serviceList = res;
        });
      } else {
        getDataLayersList(this.activeFile.id).then(res => {
          this.serviceList = res;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.service-list-wrap{
  .service-list-title {
    color: #0C0C0C;
    font-size: 16px;
    font-weight: 600;
  }
  .service-list-main {
    height: calc(100vh - 439px);
    border: 1px solid #ECECEC;
    min-height: 332px;
    overflow-y: auto;
    margin-top: 15px;
    li {
      border-bottom: 1px solid #EBEFFA;
      padding: 10px;
      color: #737478;
    }    
  }
  .service-list-main-none {
    @extend .service-list-main;
    color: #989797;
    line-height: 330px;
    text-align: center;
  }
  .service-ist-footer {
    text-align: center;
    margin-top: 15px;
  }
}
</style>