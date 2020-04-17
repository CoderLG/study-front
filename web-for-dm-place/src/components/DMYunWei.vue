<template>
  <div class="yun-wei-wrap">
    <NavComponent></NavComponent>
    <el-container>
      <el-aside>
        <h3>
          <i class="el-icon-menu"></i>
          运维管理
        </h3>
        <CommonLeftNav :leftLists='leftNav' @tabMain='tabMain'
         :defaultActive='defaultActive' :defaultOpeneds='defaultOpeneds'></CommonLeftNav>
      </el-aside>
      <el-main class='yunwei-manage-el-main'>
        <el-main v-show='showMain[0]'>
          <div class="yunwei-manage-base">管理首页</div>
          <div class="echarts-top">
            <p class="echarts-title">数据存储</p>
            <p v-bind:class="{ 'echarts-top-center': dmDataStatusIndex === 0,
             'echarts-top-center-warning': dmDataStatusIndex === 1, 
             'echarts-top-center-error': dmDataStatusIndex === 2 }">{{ dmDataStatus }}</p>
            <ul>
              <li v-for='(li, index) in dmDataState' :key='index' :class="{ 'text-warning': index === 1 && dmDataStatusIndex === 1, 'text-error': index === 1 && dmDataStatusIndex === 2 }">{{ li.name }}{{ li.value}}</li>
            </ul>
          </div>
          <div class="echarts-top">
            <p class="echarts-title">系统服务</p>
            <p v-bind:class="{ 'echarts-top-center': dmServerStatusIndex === 0,
             'echarts-top-center-warning': dmServerStatusIndex === 1, 
             'echarts-top-center-error': dmServerStatusIndex === 2 }">{{ dmServerStatus }}</p>
            <ul class="echarts-top-ul">
              <li v-for='(li, index) in serverState' :key='index' :class="{ 'text-warning': index === 0 && dmServerStatusIndex === 1, 'text-error': index === 1 && dmServerStatusIndex === 2 }">{{ li.name }}{{ li.value}}</li>
            </ul>
          </div>
          <div class="echarts-middle">
            <p class="echarts-title">数据量统计</p>
            <div id="echarts1" class="echarts-table"></div>
          </div>
          <div class="echarts-middle">
            <p class="echarts-title">文件个数统计(个)</p>
            <div id="echarts2" class="echarts-table"></div>
          </div>
          <!-- <div class="yun-wei-service">
            <p class="echarts-title">服务器</p>
            <div>
              <table>
                <tr v-for='(li, index) in serviceInfo' :key='index'>
                  <td>{{ li.name }}</td>
                  <td>{{ li.value }}</td>
                </tr>
              </table>
              <div>
                <el-progress type="circle" :stroke-width='15' :percentage="percentageCPU" color="#f13a3a"></el-progress>
                <p>CPU使用率</p>
              </div>
              <div>
                <el-progress type="circle" :stroke-width='15' :percentage="percentageRAM" color="#17a912"></el-progress>
                <p>内存使用率</p>
              </div>
              <div>
                <el-progress type="circle" :stroke-width='15' :percentage="percentageSPACE" color="#f39e28"></el-progress>
                <p>存储空间使用率</p>
              </div>
            </div>
          </div> -->
        </el-main>
        <el-main v-show='showMain[1]'>
          <div class="yunwei-manage-base">底图设置</div>
          <BottomMapConfig ref="child"></BottomMapConfig>
        </el-main>
        <el-main v-show='showMain[2]'>
          <div class="yunwei-manage-base">修改密码</div>
          <ChangePassword></ChangePassword>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import echarts from 'echarts';
import NavComponent from './NavComponent';
import CommonLeftNav from './CommonLeftNav';
import ChangePassword from './ChangePassword';
import BottomMapConfig from './BottomMapConfig';
import { dataStatistics, getDataStorageStatus, getDataStorageParams, getSystemServerParams } from '../api/fileApi';

export default {
  name: 'yunwei',
  components: {
    NavComponent,
    CommonLeftNav,
    ChangePassword,
    BottomMapConfig,
  },
  data() {
    return {
      leftNav: [
        { name: '运维首页', index: '0' },
        { name: '底图设置', index: '1' },
        { name: '修改密码', index: '2' },
      ],
      showMain: [true, false, false],
      defaultActive: '0',
      defaultOpeneds: ['0'],
      dataStatistics: '', // 数据统计结果
      dmDataState: [],
      dmDataStatus: '', // 数据存储的状态
      dmDataStatusIndex: 0, // 数据存储状态索引
      serverState: [],
      dmServerStatus: '', // 系统服务状态
      dmServerStatusIndex: 0, // 系统服务状态索引
      percentageCPU: 0,
      percentageRAM: 0,
      percentageSPACE: 0,
      serverInterVal: null, // 获取服务器配置的定时器
      serverInterValData: null, // 获取数据存储的定时器
      serverInterValServer: null, // 获取系统服务的定时器
      serviceInfo: [
        // { name: '型号：', value: '' },
        // { name: 'CPU：', value: '' },
        { name: '内存：', value: '0G' },
        { name: '存储：', value: '0TB' },
      ],
      options1: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : ({d}%)',
        },
        legend: {
          orient: 'vertical',
          data: ['矢量数据(7G)', '文档数据(200M)', '切片数据(1G)', '地形数据(3G)', '影像数据(10G)'],
          right: '10%',
          top: 75,
          bottom: 20,
        },
        calculable: true,
        series: [
          {
            name: '数据量统计',
            type: 'pie',
            minAngle: 10,
            radius: '50%',
            center: ['35%', '50%'],
            data: [
              { value: 1, name: '矢量数据(7G)' },
              { value: 5, name: '文档数据(200M)' },
              { value: 25, name: '切片数据(1G)' },
              { value: 20, name: '地形数据(3G)' },
              { value: 35, name: '影像数据(10G)' },
            ],
          },
        ],
      },
      options2: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: [],
        },
        yAxis:{
          type: 'value',
          splitNumber: 4,
        },
        grid: {
          left: '90px',
          right: '7%',
        },
        barMaxWidth: 50,
        series: [{
          barMinHeight: 10,
          data: [],
          type: 'bar',
        }],
      },
    };
  },
  destroyed() {
    clearInterval(this.serverInterVal);
    clearInterval(this.serverInterValData);
    clearInterval(this.serverInterValServer);
  },
  async mounted() {
    // 数据存储统计
    this.dataStore();
    // 系统服务
    this.systemServer();
    // 服务器
    // this.serverDetails();
    // this.serverInterVal = setInterval(() => {
    //   // 服务器
    //   this.serverDetails();
    // }, 5000);
    // this.serverInterValData = setInterval(() => {
    //   // 数据存储统计
    //   this.dataStore();
    // }, 5000);
    // this.serverInterValServer = setInterval(() => {
    //   // 系统服务
    //   this.systemServer();
    // }, 5000);
    this.dataStatistics = await dataStatistics();
    const sizeStatistics = this.dataStatistics.size;
    const countStatistics = this.dataStatistics.count;

    // 数据量统计
    let options1Legend = [];
    this.options1.series[0].data = [];
    sizeStatistics.forEach(res => {
      options1Legend.push(`${res.name}(${this.getDataSize(res.value)})`);
      this.options1.series[0].data.push({ value: res.value, name: `${res.name}(${this.getDataSize(res.value)})` });
    });
    this.options1.legend.data = options1Legend;

    // 文件个数统计(个)
    const colorArr = ['#37A2DA', '#32C5E9', '#9FE6B8', '#FFDB5C', '#FF9F7F', '#FB7293', '#e7bcf3'];
    this.options2.xAxis.data = [];
    this.options2.series[0].data = [];
    countStatistics.forEach((res, index) => {
      this.options2.xAxis.data.push(res.name);
      this.options2.series[0].data.push({
        name: res.name,
        value: res.value,
        itemStyle: {
          color: colorArr[index],
        },
      });
    });

    setTimeout(() => {
      this.createCharts('echarts1', 'light', this.options1);
      this.createCharts('echarts2', 'light', this.options2);
    }, 500);
  },
  methods: {
    // 切换左侧列表
    tabMain(index) {
      this.showMain = [false, false, false];
      this.showMain[index] = true;
      if (index === '1') {
        this.$refs.child.refresh();
      }
    },
    // 数据存储
    dataStore() {
      getDataStorageStatus().then(res => {
        getDataStorageParams().then(val => {
          if (res.status === 'normal') {
            this.dmDataStatus = '正常';
            this.dmDataStatusIndex = 0;
          } else if (res.status === 'warning') {
            this.dmDataStatus = '告警';
            this.dmDataStatusIndex = 1;
          } else if (res.status === 'insufficient') {
            this.dmDataStatus = '不足';
            this.dmDataStatusIndex = 2;
          }
          this.dmDataState =  [
            { name: '总空间：', value: this.getDataSize(val.totalSpace) },
            { name: '剩余：', value: this.getDataSize(val.freeSpace) },
            { name: '数据：', value: this.getDataSize(val.panSpace) },
            // { name: '备份x2：', value: this.getDataSize(val.backups) },
          ];
        }).catch(() => {
          clearInterval(this.serverInterValData);
          return false;
        });
      }).catch(() => {
        clearInterval(this.serverInterValData);
        return false;
      });      
    },
    // 系统服务
    systemServer() {
      getSystemServerParams().then(res => {
        this.serverState = [
          { name: '系统服务启动中：', value: res.startingCount },
          { name: '系统服务异常：', value: res.downCount },
        ];
        if (res.downCount > 0) {
          this.dmServerStatus = '异常';
          this.dmServerStatusIndex = 2;
          return;
        } else if (res.startingCount > 0) {
          this.dmServerStatus = '启动中';
          this.dmServerStatusIndex = 1;
          return;
        } else {
          this.dmServerStatus = '正常';
          this.dmServerStatusIndex = 0;
        }
      }).catch(() => {
        clearInterval(this.serverInterValServer);
        return false;
      });      
    },
    // 服务器检测
    // serverDetails() {
    //   getServerHardwareConfig().then(res => {
    //     this.percentageCPU = Number(Number(res[0].cpuUse).toFixed(2));
    //     this.percentageRAM = Number(Number(res[4].memUsed / res[3].memTotal * 100).toFixed(2));
    //     this.percentageSPACE = Number(Number(res[2].diskUsed / res[1].diskTotal * 100).toFixed(2));
    //     this.serviceInfo[0].value = this.getDataSize(res[3].memTotal);
    //     this.serviceInfo[1].value = this.getDataSize(res[1].diskTotal);
    //   }).catch(() => {
    //     clearInterval(this.serverInterVal);
    //     return false;        
    //   });      
    // },
    // echarts3 方法
    genData() {
      const nameList = [
        '赵', '钱', '孙', '滕', '殷', '罗', '毕', '郝', '娄', '危',
      ];
      const legendData = [];
      const seriesData = [];
      const selected = {};
      function makeWord(max, min) {
        const nameLen = Math.ceil((Math.random() * max) + min);
        const name = [];
        for (let i = 0; i < nameLen; i += 1) {
          name.push(nameList[Math.round((Math.random() * nameList.length) - 1)]);
        }
        return name.join('');
      }
      for (let i = 0; i < 10; i += 1) {
        const name = Math.random() > 0.65
          ? `${makeWord(4, 1)}·${makeWord(3, 0)}`
          : makeWord(2, 1);
        legendData.push(name);
        seriesData.push({
          name,
          value: Math.round(Math.random() * 100000),
        });
        selected[name] = i < 6;
      }
      return {
        legendData,
        seriesData,
        selected,
      };
    },
    // 创建图表格
    createCharts(divObj, theme, options) {
      const myChart = echarts.init(document.getElementById(divObj), theme);
      // 绘制图表
      myChart.setOption(options);
      // myChart.registerTheme()
    },
    // 判断数据是否存在
    isHave(value) {
      if (value) {
        return value;
      }
      return 0;
    },
    // 计算数据的大小
    getDataSize(value) {
      const kb = parseInt(value / 1024, 10);
      const mb = (value / 1024 / 1024).toFixed(2);
      const gb = (value / 1024 / 1024 / 1024).toFixed(2);
      const tb = (value / 1024 / 1024 / 1024 / 1024).toFixed(2);
      if (tb > 1) {
        return `${tb}T`;
      } else if (gb > 1) {
        return `${gb}G`;
      } else if (mb > 1) {
        return `${mb}M`;
      }
      return `${kb}k`;
    },
  },
};
</script>

<style lang="scss">
  .yun-wei-wrap{
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
        color: #6e7173;
        border-bottom: 1px solid #c0c4cc;
        font-size: 17px;
        position: relative;
        padding-left: 50px;
        text-align: left;
        i {
          line-height: 41px;
          text-align: left;
          position: absolute;
          top: 6px;
          left: 25px;
        }
      }
    }
    .yunwei-manage-el-main {
      font-size: 16px;
      .yunwei-manage-base {
        color: #626a77;
        font-size: 17px;
        line-height: 50px;
        padding-left: 20px;
        font-weight: 550;
        text-align: left;
        border-bottom: 1px solid #ebeef5;
      }
      .echarts-title {
        color: #626a77;
        font-size: 17px;
        line-height: 50px;
        padding-left: 20px;
        font-weight: 700;
        border-bottom: 1px solid #ebeef5;
      }
      .echarts-table {
        width: 100%;
        height: 300px;
      }
      .echarts-top {
        width: calc((100vw - 350px) / 2);
        box-shadow: 0 0 10px #c7c0c0;
        margin: 20px;
        float: left;
        border-radius: 5px;
        height: 300px;
        position: relative;
        background: url('../assets/timg.jpg') no-repeat;
        background-size: 80% 100%;
        background-position: center;
        ul {
          margin: 0 auto;
          display: block;
          width: 360px;
          height: 10px;
          margin-top: 145px;
          li {
            width: 180px;
            float: left;
            padding: 0px 15px;
            text-align: left;
            color: #838080;
            line-height: 35px;
          }
        }
        .echarts-top-ul {
          width: 180px;
          li {
            text-align: center;
          }
        }
        .echarts-top-center {
          width: 150px;
          height: 40px;
          background: rgba(1, 188, 85, 0.9);
          color: white;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%);
        }
        .echarts-top-center-warning {
          @extend .echarts-top-center;
          background: rgba(241, 150, 13, 0.8);
        }
        .echarts-top-center-error {
          @extend .echarts-top-center;
          background: rgba(255,0,0,0.8);
        }
        .text-warning {
          color: rgb(241, 150, 13);
        }
        .text-error {
          color: rgb(255,0,0);
        }
        .echarts-warn{
          background: rgba(251, 188, 06, 0.9);
        }
        .echarts-danger{
          background: rgba(245, 108, 108, 0.9);
        }
        .echarts-down{
          background: rgba(166, 169, 173, 0.9);
        }
      }
      .echarts-middle {
        width: calc((100vw - 350px) / 2);
        box-shadow: 0 0 10px #c7c0c0;
        margin: 20px;
        float: left;
        border-radius: 5px;
      }
      .echarts-bottom {
        @extend .echarts-middle;
        width: calc((100vw - 350px) / 3);
      }
      .yun-wei-service {
        width: calc(100vw - 310px);
        height: 300px;
        box-shadow: 0 0 10px #c7c0c0;
        margin: 20px;
        float: left;
        border-radius: 5px;
        line-height: 35px;
        > div {
          padding: 38px 0px;
          div {
            width: calc((100vw - 600px) / 3);
          }
        }
        div {
          display: inline-block;
          text-align: center;
          color: #838080;
        }
        table {
          display: inline-block;
          vertical-align: top;
          margin: 0px 55px;
          text-align: left;
        }
      }
    }
    .el-main {
      height: calc(100vh - 60px);
      line-height: 50px;
      padding: 0px !important;
      overflow-y: hidden;
    }
  }
</style>
