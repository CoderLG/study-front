<template>
  <div class="data-server-wrap">
    <NavComponent></NavComponent>
    <el-container>
      <el-aside>
        <h3>
          <i class="el-icon-menu"></i>
          服务管理
        </h3>
        <CommonLeftNav :leftLists='leftNav' @tabMain='tabMain' :defaultActive='defaultActive' :defaultOpeneds='defaultOpeneds'></CommonLeftNav>
      </el-aside>
      <el-main class='data-server-el-main'>
        <!--图层管理-->
        <el-main v-show='showMain[0]'>
          <LayerManage ref='layerManage'></LayerManage>
        </el-main>
        
        <!--实时数据管理-->
        <el-main v-show='showMain[13]'>
          <RealTimeDataManage ref='realTimeDataManage' ></RealTimeDataManage>
        </el-main>
       
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavComponent from './NavComponent';
import RealTimeDataManage from './RealTimeDataManage';
import CommonLeftNav from './CommonLeftNav';
import LayerManage from './LayerManage';



export default {
  name: 'fuwuguanli',
  components: {
    NavComponent,
    RealTimeDataManage,
    CommonLeftNav,
    LayerManage
   
  },
  data() {
    return {
      leftNav: [
        { name: '图层管理', index: '0',
          items: [
          
            { name: '地名', index: '0-6' },
            { name: '倾斜摄影', index: '0-7' },

          ]
        }
      ],
      defaultActive: '0-6',
      defaultOpeneds: ['0'],
      showMain: [true, false, false, false, false, false, false, false, false],
      monitorChange: true,
      stylesInfo: '', // 用于编辑操作时 传递样式的信息
      rowInfo: {}, // 行信息
      rowInfoToke: true, // 更新操作的标识
      layerChange: true, // 矢量编辑标识
      layersInfo: '', // 用于矢量编辑操作时 传递图层的信息
      layerIndex: '', // 用于记录图层切换标记
      serviceType: '', // 当前TAB页图层类型
      defaultActiveLayer: '', // 用于记录图层管理部分的点击状态
      defaultActiveProcess: '', // 用于记录数据处理部分的点击状态
      defaultActiveRealTime: '', // 用于记录实时数据部分的点击状态
      isGoBackInit: true, // 检测是否点击了左侧的切换(主要用于发布服务步骤回归到第一步)
    };
  },
  watch: {
    showMain() {
      this.isGoBackInit = !this.isGoBackInit;
    },
  },
  methods: {
    // 切换左侧列表
    tabMain(index, row) {
      debugger
      if (row) this.stylesInfo = row;
      if (index === '3') this.monitorChange = !this.monitorChange;
      this.showMain = new Array(13).fill(false);
      if (index) this.showMain[Number(index.slice(0, 1))] = true;
      this.layerIndex = index;
      // 让实时数据恢复初始化状态 主要用于关闭统计的定时器
      this.$refs.realTimeDataManage.setInit();
      switch (index) {
        case '0':
           this.$refs.layerManage.tabLayer('0-6');
           break;
        case '0-1':
        case '0-2':
        case '0-3':
        case '0-4':
        case '0-5':
        case '0-6':
          window.open("/#/PreviewPlaceName");
          break;
        case '0-7':
           this.$refs.layerManage.tabLayer(index);
           break;
     
      }
    }
  
   
  },
};
</script>

<style lang="scss">
.data-server-wrap {
  .el-aside {
    width: 250px !important;
    height: calc(100vh - 60px);
    background-color: rgb(243, 244, 248);
    color: #5C5C5E;
    text-align: center;
    line-height: 200px;
    h3 {
      line-height: 50px;
      margin: 0;
      font-size: 17px;
      color: #6e7173;
      position: relative;
      padding-left: 50px;
      text-align: left;
      border-bottom: 1px solid #dbdbdb;
      i {
        line-height: 41px;
        text-align: left;
        position: absolute;
        top: 6px;
        left: 25px;
      }
    }
  }

  .el-main {
    background-color: #FFFFFF;
    color: #5C5C5E;
    line-height: 160px;
    padding: 0px;
    .el-table th.is-left, .el-table td.is-left {
      padding-left: 10px;
    }
    .el-table th {
      padding: 7px 0px;
    }
  }

  .el-pagination {
    display: inline-block;
    line-height: 0px;
    padding-top: 10px;
    text-align: left;
    margin: 0px 20px;
  }

  .el-dialog__body {
    .el-input {
      width: 95%;
    }
  }

  .data-server-el-main {
    .el-main {
      height: calc(100vh - 60px);
      line-height: 27px;
    }    
    .el-select {
      width: 72%;
      .el-input {
        width: 100% !important;
      }
    }
    .el-table__body-wrapper {
      height: calc(100vh - 260px);
      overflow-y: auto;
    }
    .el-dropdown {
      margin-left: 8px;
    }
    .server-manager-details {
      .el-dialog__header {
        padding: 0px;
        line-height: 50px;
        background: #0c8bde;
        padding-left: 20px;
      }
    }
    .server-manager-layer-details {      
      height: calc(100vh - 608px);
      min-height: 368px;
      overflow-y: auto;
      tr {
        td {
          width: 500px;
          min-width: 100px;
          line-height: 35px;
        }
        td:first-of-type {
          width: 100px;
          color: #453e3e;
          font-weight: 700;
        }
      }
      .el-progress-bar__innerText {
        color: #102e69;
      }
    }
    .server-manager-layer-details-bth {
      display: block;
      margin: 0 auto;
      margin-top: 15px;
    }
    .sever-address-dialog {
      .el-dialog__header {
        padding: 12px;
        background: #0c8bde;
        padding-left: 20px;
        line-height: unset;
      }
      .el-dialog__body {
        > div {
          height: calc(100vh - 427px);
          min-height: 388px;
          overflow-y: auto;
        }
        padding: 0px;
        > button {
          margin: 15px auto;
          display: block;
        }
      }
    }
    .el-table td:first-of-type .cell {
      width: calc(100vw / 2 - 535px);
      overflow: hidden;
      P {
        width: 100%;
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }

  .el-dialog__title {
    font-size: 16px;
    color: #ffffff;
  }

  .el-dialog__headerbtn {
    top: 17px !important;
    line-height: normal;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }

  .serverUrlForm {
    padding: 20px 20px 0px 20px;
    border-bottom: 1px solid #dcdfe6;
    .el-form-item {
      margin-bottom: 20px;
    }
  }

  .serverUrlForm:last-of-type {
    border-bottom-width: 0px;
  }

  .serverUrlForm-label .el-form-item__label{
    font-weight: 900;
    color: #453e3e;
  }

  .el-table--border::after, .el-table--group::after, .el-table::before {
    display: none;
  }
}

.el-dialog__body {
  padding: 20px 20px 15px 20px;
}

.el-table td.is-center,
.el-table th.is-center {
  padding-right: 15px;
}

.el-message-box__btns button:nth-child(1) {
  margin-left: 10px;
  float: right;
}
</style>

<style lang="scss">
  .service-manage-title {
    color: #626a77;
    font-size: 17px;
    line-height: 50px;
    margin-left: 20px;
    font-weight: 550;
    text-align: left;
  }

  .service-manage-title-search {
    border-top: 1px solid #ebeef5;
    padding-right: 22px;
    padding-left: 20px;
    line-height: 50px;

    .el-form-item {
      line-height: 0px;
      margin-top: 6px;
      margin-bottom: 0px;
      margin-right: 0px;
      float: right;
      .el-form-item__content {
        .el-input {
          width: 200px;
        }
      }
    }

    .el-button--mini {
      margin-left: 20px;
    }

    a {
      display: inline-block;
    }

    .el-input {
      width: 200px;
      line-height: 0px;
    }
    
    > div {
      float: right;
      line-height: 50px;
    }
  }
</style>