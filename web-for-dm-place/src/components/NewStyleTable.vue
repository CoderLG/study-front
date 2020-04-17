<template>
  <div>
    <div class="new-style-title">
      <ul>
        <li @click='goBack'>返回</li>
      </ul>
    </div>
    <el-form :model="styleForm" ref="styleForm" :rules="styleFormRule"
      v-loading='stylesLoad' class='new-style-main' enctype="multipart/form-data" target="message" >
      <el-form-item label="上传样式文件" prop="temp">
        <div name='temp'>
          <input type="file" name="file" id='fileObj' value="选择文件" @change='tabFile' />
        </div>
      </el-form-item>
      <el-form-item label="样式表名称" prop="name">
        <el-input v-model="styleForm.name" name="name"></el-input>
      </el-form-item>
      <el-form-item label="样式表格式" prop="format">
        <el-select v-model="styleForm.format" name="format" placeholder="请选择">
          <el-option label="SLD" value="SLD"></el-option>
          <!-- <el-option label="ZIP" value="ZIP"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="样式类型" prop="category">
        <el-select v-model="styleForm.category" name="category" placeholder="请选择">
          <el-option label="POINT" value="POINT"></el-option>
          <el-option label="LINE" value="LINE"></el-option>
          <el-option label="POLYGON" value="POLYGON"></el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <div class="submit-new-styles">
          <el-button type="primary" @click='validate' size="small">提交</el-button>
          <el-button @click='goBack' size="small">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <iframe name="message" style="display: none"></iframe>
  </div>
</template>

<script>
import { addNewVectorStyle } from '../api/vectorApi';
import UrlSetting from '../api/UrlSetting';

export default {  
  data() {
    const validateStyleName = (rule, value, callback) => {
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
        callback(new Error('样式名称只能包含数字、中文、字母、下划线、短横线！'));
      } else if(!reStr.test(value)){
        callback(new Error('样式名称必须以汉字或字母开头'));
      } else if(value.length > 50){
        callback(new Error('样式名称长度不能超过50字符'));
      } else {
        callback();
      }
    };
    return {
      styleForm: {
        name: '',
        format: 'SLD',
        category: '',
        path: '',
        file: '',
        temp: 'temp',
      },
      styleFormRule: {
        name: [
          { required: true, message: '请输入样式名称', trigger: 'blur' },
          // { max: 255, message: '样式表名称长度不能超过255字节', trigger: 'blur' },
          { validator: validateStyleName, trigger: 'blur' },
        ],
        path: [
          { required: true, message: '请上传样式文件', trigger: 'blur' },
        ],
        temp: [
          { required: true, message: '请上传样式文件', trigger: 'blur' },
        ],
      },
      stylesLoad: false, // 新建样式提交的loading
      vectorUrl: `${UrlSetting.URLS.vector}/styles/file`,
    };
  },
  methods: {
    init() {
      document.getElementById('fileObj').value = '';
      this.$refs['styleForm'].resetFields();
    },
    // 返回
    goBack() {
      this.$emit('goBack');
      document.getElementById('fileObj').value = '';
      this.styleForm.name = '';
      this.styleForm.category = '';
      //重置表单
      this.$refs['styleForm'].resetFields();
    },
    validate() {
      this.$refs['styleForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    // 监听文件上传 设置默认名称
    tabFile() {
      const fileObjName = document.getElementById('fileObj').files[0].name;
      this.styleForm.name = fileObjName.slice(0, fileObjName.indexOf('.'));
    },
    // 提交
    submit() {      
      let formdata = new FormData();
      this.styleForm.file = document.getElementById('fileObj').files[0];
      formdata.append('file', this.styleForm.file);
      formdata.append('name', this.styleForm.name);
      formdata.append('format', this.styleForm.format);
      formdata.append('category', this.styleForm.category);
      if (this.styleForm.name.indexOf('.') !== -1) {
        this.$message.warning('请去除样式表名称的后缀');
        return;
      } else if (!this.styleForm.file) {
        this.$message.error('请选择样式文件');
        return;
      } else if (this.styleForm.file.name.slice(this.styleForm.file.name.indexOf('.') + 1, this.styleForm.file.name.length) !== 'sld') {
        this.$message.error('文件格式错误');
        return;
      } else if (this.styleForm.name && this.styleForm.file) {
        formdata.append('path', `${this.styleForm.name}.sld`)
        addNewVectorStyle(formdata).then(() => {
          this.$message.success({ message: '新增样式成功', showClose: true });
          this.goBack();
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
