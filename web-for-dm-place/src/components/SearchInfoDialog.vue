<template>
  <el-dialog class="search-info-dialog" title="数据详情" :visible.sync="visible" append-to-body
             @open="open">
    <div class="body">
      <el-row type="flex" align="middle" justify="center">
        <el-col v-if="activeFile && activeFile.id" :span="8" style="height: 100%">
          <img :src="dataUrl" width="100%"/>
        </el-col>
        <el-col :span="16">
          <el-table
            :data="tableDatas"
            border
            stripe
            :show-header="false"
            size="mini">
            <el-table-column
              width="150"
              align="right"
              prop="key" >
            </el-table-column>
            <el-table-column
              prop="value">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
  </el-dialog>
</template>

<script>
import { getIconOrThumbUrl, getDataParamsAlias } from '../api/publicApi';

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
      tableDatas: [],
      dataUrl: null,
    };
  },
  methods: {
    async open() {
      this.tableDatas = [];
      this.dataUrl = null;
      let fileDalias;
      // if(this.activeFile.dataType === 'vector') {
      //   fileDalias = {
      //     layerName: "数据名称",
      //     location: "数据位置",
      //     maxx: "最大经度",
      //     maxy: "最大纬度",
      //     minx: "最小经度",
      //     miny: "最小纬度",
      //     url: "预览地址",
      //   };
      // } else {
        fileDalias = await getDataParamsAlias();
        // fileDalias = this.sortObj(fileDalias);
      // }
      this.dataUrl = this.activeFile.thumbnailRelativePath ? getIconOrThumbUrl(this.activeFile.thumbnailRelativePath) : null;
      Object.keys(fileDalias).forEach((keyValue) => {
        // 是否在可显示字段内
        if ((this.activeFile[keyValue] === 0 || this.activeFile[keyValue]) && keyValue !== 'url') {
          this.tableDatas.push({ key: fileDalias[keyValue], value: this.activeFile[keyValue] });
        }
      });
    },
    translate(value) {
      switch (value){
        case '0201':
          return '局部影像';
        case '0901':
          return '原始数据';
        default:
          return value;

      }
    },
    // 倒叙json对象
    sortObj(obj) {
      const arr = [];
      for (const i in obj) {
        arr.push([obj[i], i]);
      }
      arr.reverse();
      const len = arr.length;
      const object = {};
      for (let i = 0; i < len; i += 1) {
        object[arr[i][1]] = arr[i][0];
      }
      return object;
    },
  },
};
</script>
<style lang="scss">
  .search-info-dialog{
    .el-dialog__header{
      padding: 0px;
      background: #0c8bde;
      padding-left: 20px;
      .el-dialog__title{
        font-size: 16px;
        line-height: 50px;
        color: #ffffff;
      }
      .el-dialog__close{
        color: #fff;
      }
    }
    .el-table--border {
      height: calc(100vh - 420px);
      overflow-y: auto;
      min-height: 350px;
    }
    .el-dialog__footer{
      text-align: center;
    }
    .body{
      border: 1px solid #dcdfe6;
      padding:10px;
      text-align: left;
      img {
        width: 96%;
        max-height:400px;
      }
    }
    .el-dialog__body {
      padding: 20px 20px 15px 20px;
      text-align: center;
      > button {
        margin-top: 15px;
      }
    }
  }
</style>
