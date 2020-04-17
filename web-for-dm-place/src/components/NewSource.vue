<template>
  <div>
    <div class="new-style-title">
      <ul>
        <li @click='goBack'>返回</li>
      </ul>
    </div>
    <el-form :model="sourceForm" ref="sourceForm" :rules="sourceFormRule"
     v-loading='sourceLoad' class='new-style-main' enctype="multipart/form-data">
      <el-form-item label="数据源ID" prop="ssId">
        <el-input v-model="sourceForm.ssId"></el-input>
      </el-form-item>
      <el-form-item label="数据源描述" prop="ssDescribe">
        <el-input v-model="sourceForm.ssDescribe"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="submit-new-styles">
          <el-button type="primary" @click='validate' size="small">提交</el-button>
          <el-button @click='goBack' size="small">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- <iframe name="message" style="display: none"></iframe> -->
  </div>
</template>

<script>
import { addNewSource } from '../api/realTimeTaskApi';

export default {  
  data() {
    const validateStyleName = (rule, value, callback) => {
      const reStr =  /^[0-9a-zA-Z]+$/;
      if(!reStr.test(value)){
        callback(new Error('数据源ID只能包含字母和数字！'));
      } else {
        callback();
      }
    };
    const validateDescribe = (rule, value, callback) => {
      const val = value.trim();
      if(val === ''){
        callback(new Error('数据源描述不能仅含有空格'));
      } else {
        this.sourceForm.ssDescribe = value.trim();
        callback();
      }
    };
    return {
      sourceForm: {
        ssId: '',
        ssDescribe: '',
      },
      sourceFormRule: {
        ssId: [
          { required: true, message: '请输入数据源ID', trigger: 'blur' },
          { max: 6, message: '数据源ID长度不能超过6字符', trigger: 'blur' },
          { validator: validateStyleName, trigger: 'blur' },
        ],
        ssDescribe: [
          { required: true, message: '请输入数据源描述', trigger: 'blur' },
          { max: 200, message:'数据源描述的长度不能超过200字符', trigger:'blur'},
          { validator:validateDescribe, trigger:'blur'},
        ],
      },
      sourceLoad: false, // 新增数据源提交的loading
    };
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('goBack');
      this.sourceForm = {
        ssId: '',
        ssDescribe: '',
      };
    },
    validate() {
      this.$refs['sourceForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    // 提交
    submit() {      
      let formdata = this.sourceForm
      if (this.sourceForm.ssId && this.sourceForm.ssDescribe) {
        this.sourceLoad = true;
        addNewSource(formdata).then(() => {
          this.sourceLoad = false;
          this.$message.success({ message: '新增数据源成功', showClose: true });
          this.goBack();
        }).catch(() => {
          this.sourceLoad = false;
        });
      } else {
        this.$message.error('请输入完整参数');
      }
    },
  },
};
</script>

<style lang="scss">
.new-style-title{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ecebeb;
  padding-left: 25px;
  ul {
    li {
      a {
        display: inline-block;
        color: #606060;
      }
      float: left;
      font-size: 18px;
      font-weight: 700;
      line-height: 50px;
      cursor: pointer;
      i {
        font-weight: 700;
        color: #606060;
      }
    }
  }
}
.new-style-main {
  padding-top: 20px;
  .el-form-item {
    >label {
      width: 140px;
      display: inline-block;
      text-align: left;
      font-weight: 700;
      padding-left: 25px;
    }
    .el-form-item__content {
      display: inline-block;
      line-height: 22px;
      width: 600px;
    }
    .el-select {
      width: 100%;
    }
    .el-upload-list__item-name {
      padding-left: 0px;
    }
    .submit-new-styles {
      text-align: center;
      margin-left: 300px;
    }
  }
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    float: right;
  }
}
</style>
