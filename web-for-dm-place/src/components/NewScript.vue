<template>
  <div>
    <div class="new-style-title">
      <ul>
        <li @click='goBack'>返回</li>
      </ul>
    </div>
    <el-form :model="scriptForm" ref="scriptForm" :rules="scriptFormRule"
      v-loading='scriptLoad' class='new-style-main' enctype="multipart/form-data">      
      <el-form-item label="上传脚本文件" prop="temp">
        <div name='temp'>
          <input type="file" name="file" id='scriptObj' value="选择文件" @change='checkFile()'/>
        </div>
      </el-form-item>
      <el-form-item label="脚本名称" prop="name">
        <el-input v-model="scriptForm.name"></el-input>
      </el-form-item>
      <el-form-item label="脚本描述" prop="describe">
        <el-input v-model="scriptForm.describe"></el-input>
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
import { addNewScript, analysisScript } from '../api/scriptApi';

export default {  
  data() {
    const validateStyleName = (rule, value, callback) => {
      const val = value.trim();
      this.scriptForm.name = value.trim();
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(val) || regCn.test(val)) {
        callback(new Error('脚本名只能包含数字、中文、字母、下划线、短横线！'));
      } else if(!reStr.test(val)){
        callback(new Error('脚本名必须以汉字或字母开头'));
      } else if(val.length > 50){
        callback(new Error('脚本名长度不能超过50字符'));
      } else {
        callback();
      }
    };
    const validateStyleDescribe = (rule, value, callback) => {
      const val = value.trim();
      this.scriptForm.describe = value.trim();
      if (val === '') {
        callback(new Error('请输入脚本描述'));
      } else {
        callback();
      }
    };
    return {
      scriptForm: {
        name: '',
        describe: '',
        file: '',
      },
      scriptFormRule: {
        name: [
          { required: true, message: '请输入脚本名称', trigger: 'blur' },
          // { max: 50, message: '脚本名长度不能超过50字符', trigger: 'blur' },
          { validator: validateStyleName, trigger: 'blur' },
        ],
        describe: [
          { required: true, message: '请输入脚本描述', trigger: 'blur' },
          { max: 200, message: '脚本描述长度不能超过200字符', trigger: 'blur'},
          { validator: validateStyleDescribe, trigger: 'blur' },
        ],
      },
      scriptLoad: false, // 新增脚本提交的loading
    };
  },
  methods: {
    init(){
      //重置表单
      document.getElementById('scriptObj').value = '';
      this.$refs['scriptForm'].resetFields();
    },
    checkFile() {
      let formdata = new FormData();
      this.scriptForm.file = document.getElementById('scriptObj').files[0];
      if(this.scriptForm.file != undefined){
        let name = this.scriptForm.file.name;
        if (name.slice(name.lastIndexOf('.')) != '.siddhi') {
          this.$message.error('需要上传.siddhi文件！');
          return
        } else if ( this.scriptForm.file.size > 2 * 1024 * 1024) {
          this.$message.error('单个上传的文件不能大于2M');
          return
        }
        formdata.append('file', this.scriptForm.file);
          analysisScript(formdata).then(res => {
          this.scriptForm.name = res.data.name;
          this.scriptForm.describe = res.data.describe;
        });
      }else{
        this.scriptForm.name = '';
        this.scriptForm.describe = '';
      }
      
    },
    // 返回
    goBack() {
      this.$emit('goBack');
      document.getElementById('scriptObj').value = '';
      this.scriptForm = {
        name: '',
        describe: '',
        file: '',
      };
    },
    validate() {
      this.$refs['scriptForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    // 提交
    submit() {      
      let formdata = new FormData();
      this.scriptForm.file = document.getElementById('scriptObj').files[0];
      formdata.append('file', this.scriptForm.file);
      formdata.append('name', this.scriptForm.name);
      formdata.append('describe', this.scriptForm.describe);
      if (!this.scriptForm.file) {
        this.$message.error('请选择脚本文件');
        return;
      } else if (this.scriptForm.name && this.scriptForm.describe) {
        this.scriptLoad = true;
        addNewScript(formdata).then(() => {
          this.scriptLoad = false;
          this.$message.success({ message: '新增脚本成功', showClose: true });
          this.goBack();
        }).catch(() => {
          this.scriptLoad = false;
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
