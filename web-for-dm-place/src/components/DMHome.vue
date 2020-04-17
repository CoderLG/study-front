<template>
  <div>
    <NavComponent></NavComponent>
    <div class="dm-home-wrap">
      <el-carousel trigger="click">
        <el-carousel-item v-for="(item, index) in carouselList" :key="index">
          <div v-if='index === 0' class="logo">
            <div class="logo-title">{{ item.title }}</div>
            <div class="logo-content">
              <span>{{ item.desc }}</span>
            </div>
          </div>
          <div v-else class="centerLogo">
            <div class="logo-title logo-title-item">{{ item.title }}</div>
            <div class="logo-content">
              <span>{{ item.desc }}</span>
            </div>
          </div>
          <img :src="item.img">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="dm-home-Manage">
      <div class="dataManage" v-for='(li, index) in functionModuleList'
        :key='index' v-on:click="routeTab(li.path)">
        <div class="imgStyle">
          <img :src="li.img">
        </div>
        <div class= "title">
          <span>{{ li.title }}</span>
        </div>
        <div class= "content">
          <div>
            <span>{{ li.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <span>Copyright © 2006-2019中科星图股份有限公司</span>
    </div>
  </div>
</template>

<script>
import NavComponent from './NavComponent';

export default {
  name: 'dmhome',
  components: {
    NavComponent,
  },
  data() {
    return {
      carouselList: [{ title: 'GEOVIS iCenter', desc: '空天大数据共享服务云平台', img: '../../static/images/11.png' }],
      functionModuleList: [
        // { title: '数据管理', desc: '管理各类空天数据，元信息自动解析', img: '../../static/images/01.png', path: '/datamanager/-1' },
        { title: '服务管理', desc: '图层管理，服务发布与样式表管理', img: '../../static/images/02.png', path: '/servicemanager' },
        // { title: '高级查询', desc: '通过空间范围快速检索各类数据', img: '../../static/images/03.png', path: '/datasearch' },
        // { title: '运维管理', desc: '系统运行状态监控与系统相关设置', img: '../../static/images/04.png', path: '/ommanager' },
      ],
    };
  },
  methods: {
    routeTab(pathUrl) {
      this.$router.push({ path: pathUrl });
    },
  },
};
</script>

<style lang="scss">
  .dm-home-wrap {
    .el-carousel {
      width: 100%;
      font-family: 'Microsoft Yahei';
    }
    .el-carousel__container {
      min-height: calc((100vh - 90px) / 2 - 20px);
      position: relative;
    }
    .el-carousel__item.is-animating {
      img {
        width: 100%;
      }
    }
    .logo {
      z-index: 3;
      position: absolute;
      top: 50%;
      margin-left: 150px;
      transform: translate(0,-50%);
    }
    .logo-title {
      font-size: 60px;
      font-weight: 900;
      color: aliceblue;
    }
    .logo-title-item {
      text-align: center;
    }
    .logo-content span {
      font-size: 20px;
      font-weight: 500;
      color: aliceblue;
      letter-spacing:18px;
      padding: 10px;
    }
    .centerLogo {
      z-index: 3;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 45%;
      .logo-title {
        font-size: 50px;
        letter-spacing: 3px;
        line-height: 100px;
      }
      .logo-content span {
        letter-spacing: 0px;
        font-family: 'Microsoft Yahei';
      }
    }
  }
  .foot {
    width:100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-top: 1px solid rgb(235, 238, 245);
    box-sizing: border-box;
    span{
      font-size: 15px;
      color: #7d8088;
    }
  }
  .dm-home-Manage {
    height: calc((100vh - 90px) / 2 + 20px);
    text-align: center;
    position: relative;
    width: 90%;
    margin: 0 auto;
    .imgStyle {
      padding: 30px;
      height: 180px;
      background: #f4f7fb;
      box-shadow: none;
      transition: box-shadow 0.5s;
    }
    .imgStyle:hover {
      box-shadow: 0px 5px 18px 5px rgba(0, 0, 0, 0.1);
    }

    .title {
      line-height: 50px;
    }
    .title span {
      color: #424e68;
      font-size: 20px;
      font-weight: 700;
    }
    .content {
      display: inline-block;
      color: #1b3045;
    }
    .content div {
      width: 180px;
    }
    .dataManage {
      width: 25%;
      float: left;
      cursor: pointer;
      overflow: hidden;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      padding: 10px 30px;
      font-size: 16px;
    }
    .dataManage:nth-child(1) { left: 0%; }
    .dataManage:nth-child(2) { left: 25%; }
    .dataManage:nth-child(3) { left: 50%; }
    .dataManage:nth-child(4) { left: 75%; }
  }
  .dm-home-wrap .el-carousel__item.is-animating img {
    height: calc((100vh - 90px) / 2 - 20px);
  }
  .el-carousel__indicator {
    display: none;
  }
</style>
<style scoped>
@media screen and (max-width: 965px) {
  .dataManage {
    width: 50%;
  }
}
</style>
