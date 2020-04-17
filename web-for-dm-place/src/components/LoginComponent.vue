<template>
  <div class="full-container login-form-container">
    <div class="login-form-panel" style="display:none;">
      <el-form :model="loginForm" label-width="0" ref="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" autoComplete="on"
                    prefix-icon="fa fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password-class">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"
                    prefix-icon="fa fa-key"
                    @keyup.enter.native="submitForm"
            ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="loading"
                     @click="submitForm()">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-wrap">
      <div class="login-logo">
        <p>Welcome to GEOVIS iCenter</p>
        <span>空天大数据共享服务云平台</span>
      </div>
      <div class="login-form-panel">
        <el-form :model="loginForm" label-width="0" ref="loginForm" :rules="rules">
          <p>用户名</p>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"
             autoComplete="on"></el-input>
          </el-form-item>
          <p>密码</p>
          <el-form-item prop="password" class="password-class">
            <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"
                      @keyup.enter.native="submitForm"
              ></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <template>
              <el-checkbox v-model="isSaveUser">记住登录状态</el-checkbox>
            </template>
          </el-form-item> -->
        </el-form>
        <el-button type="primary" :loading="loading" @click="submitForm()">
          登 录
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getTokenExpiredTime, refreshToken } from '../api/user';
import { getToken } from '../utils/auth';

export default {
  data() {
    const validateEmpty = (rule, value, callback) => {
      if (!value) {
        if(rule.field === 'username') {
          callback(new Error('请输入用户名'));
        } else {
          callback(new Error('请输入密码'));
        }
      } else {
        callback();
      }
      if(rule.field === 'username') {
        this.loginForm.username = value.trim();
      }
    };
    const validateNameLength = (rule, value, callback) => {
     const str = value.trim();
     const length = str.length;
     if(length < 3 || length > 10) {
       callback(new Error('用户名长度3~10字符'));
     } else {
       callback();
     }
      this.loginForm.username = str;
    };
    const validatePassWordLength = (rule, value, callback) => {
      const length = value.length;
      if(length < 5 || length > 12) {
        callback(new Error('密码长度5~12字符'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: localStorage.getItem('network-pan-username') || 'admin',
        password: null,
      },
      rules: {
        username: [
          { required: true, validator: validateEmpty, trigger: 'blur' },
          { validator: validateNameLength, trigger: 'blur' },
        ],
        password: [
          { required: true,validator: validateEmpty, trigger: 'blur' },
          { validator: validatePassWordLength, trigger: 'blur' },
        ],
      },
      isSaveUser: true,
      loading: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch('loginByUser', this.loginForm);
            this.loading = false;
            localStorage.setItem('network-pan-username', this.loginForm.username);
            this.$router.push({
              path: '/',
            });
            this.keepToken();
          } catch (e) {
            this.loading = false;
          }
        }
      });
    },
    async keepToken() {      
      const tokenTime = await getTokenExpiredTime();
      setInterval(() => {
        this.refreshReq();
      }, tokenTime * 1000 / 2);
    },
    async refreshReq() {
      const token = await getToken();
      refreshToken(token).then(newToken => {
        this.$store.dispatch('refreshTokenByToken', newToken);
      });
    }
  },
};
</script>

<style lang="scss">
  @import "../styles/color";
  body {
    min-width: 1200px;
  }

  .login-form-container {
    background: url('../assets/loginbackground.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-wrap {
      width: 1230px;
      height: 330px;
      margin: 0 auto;
      .login-logo {
        width: 580px;
        height: 250px;
        background: rgba(255, 255, 255, 0.3);
        float: left;
        margin: 40px 0px;
        text-align: center;
        color: white;
        font-weight: 700;
        p {
          font-size: 35px;
          margin: 85px 0px 20px 0px;
          font-family: 'Microsoft Yahei';
        }
        span {
          font-size: 18px;
          letter-spacing: 6px;
          font-weight: 100;
          font-family: 'Microsoft Yahei';
        }
      }
    }
    .login-form-panel {
      width: 610px;
      height: 330px;
      position: relative;
      background: white;
      float: left;
      padding: 50px 60px;
      box-sizing: border-box;
      form {
        font-size: 18px;
      }
      >button {
        width: 416px;
        height: 65px;
        position: absolute;
        bottom: -35px;
        left: 50%;
        font-size: 18px;
        transform: translate(-50%);
        border-radius: 0px;
      }
      p {
        color: #797979;
        font-family: 'Microsoft Yahei';
        margin: 0px;
        font-weight: 700;
      }
      input {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
    }
    .el-form-item {
      margin-bottom: 40px;
      .el-input__inner {
        color: #797979;
        border-radius: 0px;
        border-width: 0px;
        border-bottom: 1px solid #dcdfe6;
        padding: 0px;
      }
    }
    .el-form-item:nth-child(4) {
      margin-bottom: 15px;
    }
    .el-form-item:nth-child(5) {
      padding-left: 2px;
      .el-checkbox__inner {
        border-radius: 10px;
        display: block;
      }
    }
    .password-class .el-input {
      -webkit-text-security:disc;
    }
  }
</style>
