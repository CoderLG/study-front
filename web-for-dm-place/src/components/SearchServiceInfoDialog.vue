<template>
  <!--图层详情-->
  <el-dialog title="详情" :visible.sync="visible" class="search-service-details333" append-to-body @open="showDetails" :close-on-click-modal='false'>
    <div class="search-service-layer-details">
      <table>
        <tr v-for='(li, index) in layerDetails' :key='index'>
          <td>{{ li.name }}</td>
          <td>{{ li.value }}</td>
        </tr>
        <!-- <tr v-show="activeFile && !activeFile.format">
          <td>切片进度</td>
          <td><el-progress :text-inside="true" :stroke-width="18" :percentage="tilePercent"></el-progress></td>
        </tr> -->
      </table>
    </div>
    <el-button class="search-service-layer-details-bth" type="primary"
      size="small" @click="visible = false">确认</el-button>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { sliceTileLayerProgress } from '../api/imageApi';
import { getFilePath, getServerType } from '../api/fileApi';

export default {
  name: 'file-info-dialog',
  props: {
    activeFile: {
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      isShowDetails: false, // 数据详情的显隐
      tilePercent: 0, // 切片进度
      serverType: '', // 服务器类型
      layerDetails: [],
      tilePercentTime: '', // 影像切片的定时器
      vectorPercentTime: '', // 矢量切片的定时器
    };
  },
  watch: {
    isShowDetails(isTrue) {
      if(!isTrue) clearInterval(this.tilePercentTime);
      if(!isTrue) clearInterval(this.vectorPercentTime);
    },
  },  
  computed: { ...mapGetters([
    'userInfo',
  ])},
  async mounted() {
    this.serverType = await getServerType();
  },
  methods: {
    // 倾斜摄影不同类型显示不同详情
    tiltphotoTabDetails(row) {
      if (row.format === 'B3DM' || row.format === 'B3DM_GRID') {
        this.layerDetails = [
          {name: '图层名称', value: row.layerName},
          {name: '数据类型', value: row.format},
          {name: '创建时间', value: row.createTime},
        ];
      } else {
        this.layerDetails = [
          {name: '图层名称', value: row.layerName},
          {name: '数据类型', value: row.format},
          {name: '中心点经度', value: row.longitude},
          {name: '中心点纬度', value: row.latitude},
          {name: '中心点高度', value: row.altitude},
          {name: '创建时间', value: row.createTime},
        ];
      }
    },
    // 图层详情
    async showDetails() {
      const row = this.activeFile;
      this.isShowDetails = true;
      this.tilePercent = 0;
      switch (this.activeFile.layerType) {
        case 'IMAGELAYER':
        case 'VECTORLAYER': 
        case 'DEMLAYER': {
          // this.sliceTileImageStatusRes(row);
          this.layerDetails = [
            {name: '图层名称', value: row.layerName},
            {name: '瓦片格式', value: row.mimeType},
            {name: '格网集', value: row.gridSet},
            {name: '层级范围', value: `${row.minLevel}-${row.maxLevel}`},
            {name: '切片状态', value: row.tileStatus},
          ];
          break;
        }
        default:
         this.tiltphotoTabDetails(row);
        break;
      }
      // dataId存在代表图层是由数管数据发布得来的
      if (row.dataId) {
        const pathArr = await getFilePath(row.dataId);
        this.layerDetails.push({name: '数据名称', value: pathArr.slice(pathArr.lastIndexOf('/') + 1, pathArr.length)});
        this.layerDetails.push({name: '数据位置', value: '全部文件 > ' + this.matchTabMark(pathArr)});
      }
    },
    // 匹配转换\/符号
    matchTabMark(pathArr) {
      if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        const str = pathArr.slice(pathArr.indexOf(`dir\\${this.userInfo.id}`) + Number(5+this.userInfo.id.length), pathArr.length);
        const result=str.replace(/\\/g," > ");
        return result;
      } else {
        const str = pathArr.slice(pathArr.indexOf(`dir/${this.userInfo.id}`) + Number(5+this.userInfo.id.length), pathArr.length);
        const result = str.replace(/\//g," > ");
        return result;
      }
    },
    // 获取影像的切片进度
    sliceTileImageStatusRes(row) {
      if (row.tileStatus !== 'SUCCESS') {
        this.tilePercentTime = setInterval(() => {
          sliceTileLayerProgress(row.id).then(res => {
            this.tilePercent = Number(res.progress.toFixed(2));
            if (this.tilePercent === 100) {
              this.$message.success({ message: `${row.layerName}切片完成`, showClose: true });
              clearInterval(this.tilePercentTime);           
              this.refreshData();
              this.layerDetails[4].value = 'SUCCESS';
            }
          }).catch(() => {
            clearInterval(this.tilePercentTime);
          })
        }, 1000);
      } else {
        this.tilePercent = 100;
      }
    },
  },
};
</script>

<style lang="scss">
.search-service-details333 {
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: 0 !important;
    .el-dialog__header {
      padding: 0px;
      line-height: 50px;
      background: #0c8bde;
      padding-left: 20px;
      .el-dialog__headerbtn {
        top: 0px;
        i {
          color: white;
        }
      }
      span {
        color: white;
      }
    }
    .el-dialog__body {
      padding: 20px 20px 15px 20px;
    }
  }
  .search-service-layer-details-bth {
    display: block;
    margin: 0 auto;
    margin-top: 15px;
  }
  .search-service-layer-details {
    height: calc(100vh - 608px);
    min-height: 368px;
    overflow-y: auto;
    tr td:first-of-type {
      width: 100px;
      color: #453e3e;
      font-weight: 700;
    }
    tr td {
      width: 500px;
      min-width: 100px;
      line-height: 35px;
    }
  }
}
</style>
