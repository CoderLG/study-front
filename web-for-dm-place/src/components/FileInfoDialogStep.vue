<template>
  <div v-show='dialogFormVisible' class='file-info-dialog-step'>             
    <el-tabs v-if='parseStatus === "2"' type="border-card" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane :label="tab" v-for="(tab, index) in tabs" :key="index" :name="index+'first'">
        <el-row v-if='tableDatas[index].length' type="flex" align="middle" justify="center">
          <el-col :span="8" style="max-height: 400px;margin-right: 15px;margin: 0 auto;position: relative;height: calc(100vh - 535px);">
            <img v-if="imageUrls[index]" :src="imageUrls[index]" style="max-width: 100%;max-height: calc(100vh - 425px);position: absolute;top: 50%;transform: translate(0, -50%);"/>
          </el-col>
          <el-col :span="16">
            <el-table
              :data="tableDatas[index]"
              :show-header="false"
              size="mini"
              class="file-info-dialog-table">
              <el-table-column
                width="150"
                align="center"
                prop="name" >
              </el-table-column>
              <el-table-column
                prop="value">
                <template slot-scope="scope">
                  <a target="_blank" :href="scope.row.value"
                    v-if="isUrl(scope.row.value)">{{scope.row.value}}</a>
                  <template v-else>
                    {{scope.row.value}}
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <p v-if='parseStatus === "1"' class="file-info-dialog-status" v-loading="loading" element-loading-text="解析中..."></p>
    <p v-if='parseStatus === "3"' class="file-info-dialog-status"><span>解析失败</span></p>
    <p v-if='parseStatus === null' class="file-info-dialog-status" v-loading='true'></p>
  </div>
</template>

<script>
import { getDataParamsAlias, getIconOrThumbUrl } from '../api/publicApi';
import { getdataDetail } from './../api/fileApi';

export default {
  name: 'file-info-dialog-step',
  props: {
    activeFile: {
      type: Object,
    },
    dialogFormVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      tableDatas: [],
      isMulti: false,
      tabs: [],
      imageUrls: [],
      unPublicIcon: '',
      activeName: '0first',
      loading: true,
      objectProperties: '', // 详情信息
      parseStatus: null,
      timer: null,
    };
  },
  watch: {
    dialogFormVisible(isTrue) {
      if (isTrue) this.open();
    },
    parseStatus(val) {
      if (val === '1') {
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setInterval(() => {
          this.open();
        }, 1000);
      }
    },
  },
  mounted() {
    this.open();
  },
  methods: {
    isUrl(url) {
      if (typeof url === 'string' && url.toLowerCase().startsWith('http')) {
        return true;
      }
      return false;
    },
    addTab(name, tabObject, imageUrl, fileDalias) {
      this.activeName = '0first';
      const tableDataOne = [];
      Object.keys(fileDalias).forEach((key) => {
        if (tabObject[key]) {
          tableDataOne.push({ name: fileDalias[key], value: tabObject[key] });
        }
      });
      this.tabs.push(name);
      this.imageUrls.push(imageUrl);
      this.tableDatas.push(tableDataOne);
    },
    init() {
      this.tableDatas = [];
      this.tabs = [];
      this.imageUrls = [];
    },
    async open() {
      this.init();
      // let dataType = this.activeFile.dataType;
      let fileDalias = await getDataParamsAlias();
      // 矢量获取未发布的详情需要单独获取
      let objectProperties;
      objectProperties = await getdataDetail(this.activeFile.id);
      this.objectProperties = objectProperties;
      this.parseStatus = objectProperties.status;
      if (this.parseStatus !== "2") {
        this.$emit('analysisError');
        return;
      }
      this.loading = false;
      clearInterval(this.timer);
      this.timer = null;
      // objectProperties = [...objectProperties.analysisBasicDatas, ...objectProperties.children];
      objectProperties = [...objectProperties.analysisBasicDatas];      
      if (objectProperties instanceof Array && objectProperties.length) {
        this.isMulti = true;
        for (let i = 0; i < objectProperties.length; i += 1) {
          const objectProperty = objectProperties[i].info ? objectProperties[i].info : objectProperties[i];
          objectProperty['fileName'] = objectProperties[i].fileName;
          const url = objectProperty.iconRelativePath ? getIconOrThumbUrl(objectProperty.iconRelativePath) : null;
          this.addTab(objectProperty['fileName'], objectProperty, url, fileDalias);
        }
        this.$emit('analysisSuccess');
      } else {
        alert('失败')
        // const url = getIconUrl(dataType, this.activeFile.publishId);
        // this.addTab(this.activeFile.name, objectProperties, url, fileDalias);
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
    // 标签页tab切换
    tabClick(tab) {
      var tabIndex = this.tabs.indexOf(tab.label)
      this.$emit('tabVectorLayerName', tab.label,tabIndex);
    },
  },
};
</script>

<style lang='scss'>
.file-info-dialog-step {
  .el-tabs--border-card {  
    box-shadow: none;
  }
  .el-table--border {
    height: calc(100vh - 550px);
    overflow-y: auto;
  }
  .el-row--flex.is-align-middle {
    align-items: flex-start;
  }
  .el-table td {
    border-bottom-width: 0px;
  }
  .file-info-error {
    height: calc(100vh - 544px);
    line-height: calc(100vh - 544px);
    min-height: 226px;
    color: #989797;
    text-align: center;
  }
  .file-info-loading {
    position: relative;
    height: calc(100vh - 500px);
    text-align: center;
  }
  .el-table::before {
    height: 0px;
  }
  .file-info-dialog-table {
    overflow-y: auto;
    height: calc(100vh - 535px);
    min-height: 230px;
  }
  .file-info-dialog-status {
    border: 1px solid #dcdfe6;
    height: calc(100vh - 468px);
    text-align: center;
    min-height: 296px;
    > span {
      line-height: calc(100vh - 468px);
    }    
  }
}
</style>