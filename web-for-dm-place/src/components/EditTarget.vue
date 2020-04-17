<template>
  <div>
    <div class="new-style-title">
      <ul>
        <li @click="goBack">返回</li>
      </ul>
    </div>
    <el-form
      :model="targetForm"
      ref="targetForm"
      :rules="targetFormRule"
      v-loading="targetLoad"
      class="new-style-main"
      enctype="multipart/form-data"
    >
      <el-form-item label="目标类型ID" prop="tmId">
        <el-input v-model="tmId" value="tmId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="目标类型描述" prop="tmDescribe">
        <el-input v-model="targetForm.tmDescribe" prepend="targetForm.tmDescribe"></el-input>
      </el-form-item>
      <!-- <el-form-item label="目标类型图标" prop="tmIcon">
        <el-select v-model="targetForm.tmIcon" placeholder="请选择">
          <el-option v-for="item in icon" :key="item.value" :label="item.label" :value="item.value">
            <i style="float: left; color:#333;" :class="item.class"></i>
            <span style="float: left; padding-left: 15px;">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="目标类型图标" prop="tmIcon">
        <ul class="new-target-icon-manager">
          <li v-for="(item, index) in iconList" :key="index">
            <el-radio v-model="checkIcon" :label="index">
              {{ item.name }}&nbsp;&nbsp;
            </el-radio>
            <img :src="geoLotUrl+'/IconStoreApi/iconStores/icon/'+item.id" alt="">
          </li>
          <li>
            <el-radio v-model="checkIcon" label="自定义"></el-radio>
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              element-loading-spinner="el-icon-loading"
              v-loading='isIconEnd'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
        </ul>
      </el-form-item>
      <el-form-item>
        <div class="submit-new-styles">
          <el-button type="primary" @click="validate" size="small">提交</el-button>
          <el-button @click="goBack" size="small">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- <iframe name="message" style="display: none"></iframe> -->
  </div>
</template>

<script>
import UrlSetting from '../api/UrlSetting';
import { editTarget, getDefaultIcon } from '../api/realTimeTaskApi';

const geoLotUrl = UrlSetting.URLS.geoLotUrl;

export default {
  props: ['tmId'],
  data() {
    return {
      targetForm: {
        tmDescribe: '',
        tmIcon: null,
      },
      targetFormRule: {
        tmDescribe: [
          { required: true, message: '请输入目标类型描述', trigger: 'blur' },
        ],
      },
      imgFile: null,// 图片文件
      targetLoad: false, // 新增目标类型提交的loading
      actionUrl: 'https://jsonplaceholder.typicode.com/posts/',// 上传的地址
      imageUrl: '',
      checkIcon: 0,
      isIconEnd: false,// 判断图片是否上传成功
      geoLotUrl: '',
      iconList: [],// 默认icon列表
    };
  },
  async mounted() {
    this.geoLotUrl = geoLotUrl;
    this.iconList = await getDefaultIcon(1, 1000);
    this.iconList = this.iconList.data;
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('goBack');
      this.targetForm = {
        tmDescribe: '',
        tmIcon: null,
      };
      this.imageUrl = '';
      this.checkIcon = 0;
    },
    validate() {
      this.$refs['targetForm'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      this.isIconEnd = true;
      this.checkIcon = '自定义';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isPNG) {
        this.$message.warning('上传图片只能是 png 格式!');
        this.isIconEnd = false;
      }
      if (!isLt2M) {
        this.$message.warning('上传图片大小不能超过 1MB!');
        this.isIconEnd = false;
      }
      return isPNG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.isIconEnd = false;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgFile = file.raw;
    },
    // 提交
    submit() {
      let formdata = new FormData();
      formdata.append('tmId', this.tmId);
      formdata.append('tmDescribe', this.targetForm.tmDescribe);
      if (this.iconList[this.checkIcon]) {
        formdata.append('iconId', this.iconList[this.checkIcon].id);
      } else {
        formdata.append('mulfile', this.imgFile);
        formdata.append('iconId', -1);
      }
      if (this.tmId && this.targetForm.tmDescribe) {
        this.targetLoad = true;        
        editTarget(formdata).then(() => {
          this.targetLoad = false;
          this.$message.success({ message: '编辑目标类型成功', showClose: true });
          this.goBack();
        }).catch(() => {
          this.targetLoad = false;
        });
      } else {
        this.$message.error('请输入完整参数');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-style-title {
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
    > label {
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
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    float: right;
  }
}
.new-target-icon-manager {
  li {
    margin-bottom: 13px;
    margin-top: 7px;
    img {
      vertical-align: middle;
    }
    > div {
      display: inline-block;
      vertical-align: middle;
      margin-top: 5px;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.avatar {
  width: 32px;
  height: 32px;
  display: block;
}
</style>
