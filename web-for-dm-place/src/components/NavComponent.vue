<template>
  <div class="nav-wrap">
    <div class="nav-wrap-logo">
      <img src="../assets/dmearth.png">
      GEOVIS iCenter
    </div>
    <img class="nav-wrap-sanjiao" src="../assets/dmsanjiao.png">
    <ul>
      <li v-for='(li, indexVal) in routerList' :key='indexVal'
       @click='routeLiClick(li, indexVal)' ref='routeLi' class="nav-list-item">
        <router-link :to='li.route'>
          {{ li.name }}
        </router-link>
      </li>
      <!-- <li class="help-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            帮助<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a href="../static/doc/GEOVIS iCenter V1.1.2 用户手册.pdf" target="_blank" width="100%" height="100%">
                  <span style= "color:#606266;">用户手册</span>
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="../static/doc/GEOVIS iCenter V1.1.2 服务接口文档.pdf" target="_blank" width="100%" height="100%">
                  <span style= "color:#606266;"> 接口文档</span>
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="../static/doc/GEOVIS iCenter V1.1.2 二次开发教程.pdf" target="_blank" width="100%" height="100%">
                  <span style= "color:#606266;">开发教程</span>
              </a>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="versionMessage" style="color:#606266;">关于&#8194;&#8194;</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li> -->
    </ul>
    <el-dropdown size="small"  @command="handleCommand"
     style="float: right;margin-right: 30px;margin-top: 17px;color:white;">
        <span class="el-dropdown-link">
          <img src="../assets/yonghu.png" style="height: 23px;margin: 0px 4px;">
          <!-- <i class="fa fa-user-circle-o"></i> -->
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  command="quit">
          <i class="fa fa-sign-out"></i>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import axios from 'axios';
import {
  mapGetters,
} from 'vuex';
import store from '../store';

export default {
  name: 'nav-component',
  computed: { ...mapGetters([
    'userInfo',
  ]),
  },
  data() {
    return {
      routerList: [
        { name: '首页', route: '/' },
        // { name: '数据管理', route: '/datamanager' },
        { name: '服务管理', route: '/servicemanager' },
        // { name: '高级查询', route: '/datasearch' },
        // { name: '运维管理', route: '/ommanager' },
        // { name: '帮助手册', route: '/help' },
        // { name: '服务查询', route: '/searchService' },
      ],
    };
  },
  mounted() {
    const currentRoute = this.$router.currentRoute.path.lastIndexOf('/') === 0 ? this.$router.currentRoute.path : this.$router.currentRoute.path.slice(0, this.$router.currentRoute.path.lastIndexOf('/'));
    this.routerList.forEach((res, index) => {
      if (res.route === currentRoute) {
        this.$refs.routeLi[index].style.background = '#0093E3';
        this.$refs.routeLi[index].style.borderBottom = '5px solid #E1A200';
      } else if (currentRoute === '/scanStorage') {
        this.$refs.routeLi[1].style.background = '#0093E3';
        this.$refs.routeLi[1].style.borderBottom = '5px solid #E1A200';
      }
    });
  },
  methods: {
    handleCommand(command) {
      if (command === 'quit') {
        this.$store.dispatch('fedLogOut')
          .then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
      }
    },
    routeLiClick(li, index) {
      const liArr = document.querySelectorAll('.nav-list-item');
      if (!store.getters.isInLoaing) {
        liArr.forEach((val) => {
          const value = val;
          value.style.background = '#24A5F8';
          value.style.borderBottom = '5px solid #24A5F8';
        });
        liArr[index].style.background = '#0093E3';
        liArr[index].style.borderBottom = '5px solid #E1A200';
      }      
    },
    //点击关于显示版本信息
    versionMessage(){
      axios.get("../static/json/version.json",{}).then((res)=>{
        const h = this.$createElement;
        this.$msgbox({
          title: '关于',
          message: h('p', null, [
            h('div', { style: 'height: 12px;width:15px' }, ""),
            h('div', null, res.data.product),
            h('div', null, res.data.name),
            h('div', null, res.data.version),
            h('div', { style: 'height: 12px;width:15px' }, ""),
            h('div', { style: 'color: #999' }, res.data.date)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
        })
      })    
    }
  },
};
</script>

<style scoped>
.nav-wrap{height: 60px;background: #24A5F8;}
.nav-list{float: left;}
div {box-sizing: border-box;}
@media screen and (max-width: 965px) {
  .nav-wrap ul li a {
    padding: 0px 15px;
  }
}
</style>
<style lang="scss">
.nav-wrap {
  font-size: 16px;
  .nav-wrap-sanjiao {float: left; height: 60px;}
  .nav-wrap-logo {
    float: left;
    width: 260px;
    height: 100%;
    line-height: 60px;
    color: white;
    font-size: 23px;
    font-weight: 700;
    background: #E18500;
    img {
      width: 30px;
      vertical-align: text-top;
      padding: 0px 3px 0px 20px;
      box-sizing: content-box;
    }
  }
  ul {margin: 0; padding: 0;}
  ul li {list-style: none; float: left; line-height: 55px;box-sizing: border-box;}
  ul li a {display: inline-block; text-decoration: none;padding: 0px 25px;box-sizing: border-box;color: white;}
  ul li span {display: inline-block; text-decoration: none;padding: 0px 25px;box-sizing: border-box;color: white;font-size:16px;}
  ul li:hover {background: #0093E3 !important;border-bottom:4px solid #0093E3}
}
</style>
