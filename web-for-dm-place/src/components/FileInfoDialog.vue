<template>
  <el-dialog title="数据详情" :visible.sync="visible" append-to-body
   @open="open" class='file-info-dialog' :close-on-click-modal='false'>
    <el-tabs v-if='parseStatus === "2"' type="border-card" v-model="activeName" v-loading="loading" >
      <el-tab-pane :label="tab" v-for="(tab, index) in tabs" :key="index" :name="index+'first'">
        <el-row type="flex" align="middle" justify="center">
          <el-col :span="8" style="max-height: 400px;margin-right: 15px;margin: 0 auto;">
            <img v-if="imageUrls[index]" :src="imageUrls[index]" style="max-width: 100%;max-height: calc(100vh - 425px);display: block;"/>
          </el-col>
          <el-col :span="16">
            <el-table
              :data="tableDatas[index]"
              border
              stripe
              :show-header="false"
              size="mini">
              <el-table-column
                width="150"
                align="right"
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
    <el-button type="primary" size='small' @click='parseAgain' v-if='parseStatus === "3"'>再次解析</el-button>
    <el-button type="primary" size='small' @click='makeSure'>确定</el-button>
  </el-dialog>
</template>

<script>
import { getDataParamsAlias, getIconOrThumbUrl } from '../api/publicApi';
import { getdataDetail, parseDataAgain } from './../api/fileApi';

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
      isMulti: false,
      tabs: [],
      imageUrls: [],
      activeName: '0first',
      loading: true,
      parseStatus: null,
      timer: null,
      parseErrorId: '',
    };
  },
  watch: {
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
        if (tabObject[key] || tabObject[key] == 0) {
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
      // this.loading = false;
      // 矢量获取未发布的详情需要单独获取
      let objectProperties;
      objectProperties = await getdataDetail(this.activeFile.id);
      if (objectProperties.dataEntityId) {
        this.parseErrorId = objectProperties.dataEntityId;
      }
      this.parseStatus = objectProperties.status;
      if (this.parseStatus !== "2") {
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
      } else {
        alert('失败');
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
    // 再次解析
    parseAgain() {
      this.loading = true;
      parseDataAgain(this.parseErrorId).then(() => {
        this.open();
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    //点击确定，退出，并初始化解析状态
    makeSure(){
      this.visible = false;
      this.parseStatus = null;
    },
  },
};
</script>

<style lang='scss'>
.file-info-dialog {
  .el-tabs--border-card {
    text-align: left;
    box-shadow: none;
  }
  .el-table--border {
    height: calc(100vh - 473px);
    overflow-y: auto;
    min-height: 297px;
  }
  .el-table::before {
    z-index: inherit;
  }
  .file-info-loading {
    position: relative;
    height: calc(100vh - 435px);
    text-align: center;
  }
  .file-info-error {
    height: calc(100vh - 679px);
    min-height: 297px;
    color: #989797;
    text-align: center;
    line-height: 308px;
  }
  .el-dialog__body {
    text-align: center;
    > button {
      margin-top: 15px;
    }
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    max-width: calc(100vw / 2 - 415px);
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .file-info-dialog-status {
    border: 1px solid #dcdfe6;
    height: 530px;
    > span {
      line-height: 530px;
    }    
  }
}
.el-dialog__body {
  padding: 20px 20px 15px 20px;
}
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
}
</style>
