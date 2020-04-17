<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
    class="changePassword-ruleForm">
    <el-form-item label="用户名" prop="username" class="label-name-class">
      <el-input v-model="userInfo.username" type="text" :disabled="true"/>
    </el-form-item>
    <el-form-item label="旧密码" prop="oldPass" class="label-class">
      <!-- <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input> -->
      <el-input type="text" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass" class="label-class">
      <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass" class="label-class">
      <el-input type="text" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class="ruleFormBtn">
      <el-button type="primary" size="mini" @click="submitForm('ruleForm2')">提交</el-button>
      <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex';
import { changePassWork } from './../api/login';
import { getRsaPassWord } from './../utils/passWordRsa';
import { getServerTime } from './../api/user';


export default {
  data() {
    /** ***检验两次密码是否一致** */
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else if(value.length > 12 || value.length < 5 ){
        callback(new Error('密码长度5-12位！'));
      }else {
        // if (this.ruleForm2.checkPass !== '') {
        //   this.$refs.ruleForm2.validateField('checkPass');
        // }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if(value.length > 12 || value.length < 5 ){
        callback(new Error('密码长度5-12位！'));
      }else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        oldPass: '',
        pass: '',
        checkPass: '',
        age: '',
      },
      rules2: {
        oldPass: [
          { validator: validatePass1, trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  computed: { ...mapGetters([
    'userInfo',
  ]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const time = await getServerTime();
          const obj = {
            userName: this.userInfo.username,
            oldPasswd: getRsaPassWord(time+this.ruleForm2.oldPass),
            newPasswd: getRsaPassWord(time+this.ruleForm2.pass),
          };
          // const params = JSON.stringify(obj);
          changePassWork(obj).then(() => {
            this.$message.success('修改密码成功');
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.changePassword-ruleForm {
  width: 700px;
  padding-top: 20px;
  margin: 0px 22px;
}
.ruleFormBtn {
  text-align: center;
  padding: 0px 2px;
}
.label-class {
  font-size: 14px;
  font-weight: 600;
  color: #181819 !important;
  .el-input {
    -webkit-text-security:disc;
  }
}
.label-name-class {
  font-size: 14px;
  font-weight: 600;
  color: #181819 !important;
}
</style>

<style lang="scss">
.changePassword-ruleForm {
  .el-form-item__label {
    text-align: left;
  }
  .el-input__suffix {
    -webkit-text-security: initial;
  }
}
</style>