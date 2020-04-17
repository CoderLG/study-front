<template>
  <el-dialog title="波段设置" :visible.sync="updateBands"
   class='update-bands-dialog' :show-close='false'>
   <div class="form-style-main">
    <el-form ref="waveSet" :model="waveSet" label-width="80px">
      <div class='waveset-form'>
      <el-form-item label="渲染类型">
        <el-select v-model="waveSet.type" >
          <el-option label="单波段灰度" value="单波段灰度"></el-option>
          <el-option label="多波段彩色" value="多波段彩色"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="灰度波段" v-if='waveSet.type === "单波段灰度"' prop='grayBand'>
        <el-select v-model="waveSet.grayBand">
          <el-option  v-for='(band, indexVal) in bandsList' :key='indexVal' :label=band :value=band></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="红色波段" v-if='waveSet.type === "多波段彩色"' prop='redBand'>
        <el-select v-model="waveSet.redBand" >
          <el-option  v-for='(band, indexVal) in bandsList' :key='indexVal' :label=band :value=band></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绿色波段" v-if='waveSet.type === "多波段彩色"' prop='greenBand'>
        <el-select v-model="waveSet.greenBand" >
          <el-option  v-for='(band, indexVal) in bandsList' :key='indexVal' :label=band :value=band></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="蓝色波段" v-if='waveSet.type === "多波段彩色"' prop='blueBand'>
        <el-select v-model="waveSet.blueBand" >
          <el-option  v-for='(band, indexVal) in bandsList' :key='indexVal' :label=band :value=band></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拉伸">
        <el-select v-model="waveSet.grayStretching" >
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="透明色" prop="transparentColor" class="publish-data-color" v-if="mimeType === 'png'">
        <el-color-picker v-model="waveSet.transparentColor"></el-color-picker>
      </el-form-item>
    </div>
    <div class='update-bands-footer'>
      <el-button type="primary" size='small' @click='makeSure'>确定</el-button>
      <el-button size='small' @click='cancelSelect'>取消</el-button>
      <el-button type="primary" size='small' @click='applyUpdate' :disabled='canPreview === false'>预览</el-button>
    </div>
  </el-form>
   </div>
   <div class="preview-img-style" v-loading='previewLoad'>
     <img :src=previewImg v-if='canPreview === true'> 
     <span v-if='canPreview === false' class='preview-text-style'>图片像素过大，不支持预览</span>
  </div>
  </el-dialog>
</template>

<script>
  import { preview } from '../api/tileBuilderApi';

  export default {
    name: '',
    props: {
      waveSet: {
        type: Object,
      },
      bandsList: {
        type: Array,
      },
      path: {
        type: String,
      },
      mimeType: {
        type: String,
      },
      canPreview: {
        type: Boolean,
      },
      bandsListMap: {
        type: Object,
      },
      originalBand: {
        type: Object,
      }
    },
    data() {
      return {
        updateBands: false, // 弹出框的显隐
        form: {},
        previewImg: '', //预览图片的地址
        previewLoad: false, //预览加载
      };
    },
    methods: {
      //通过波段设置，得到rgbIndex字段
      getRgbIndex(waveSet){
        var rgbIndex = '';
        var redIndex = '';
        var greenIndex = '';
        var blueIndex = '';
        if(waveSet.type === "多波段彩色") {
          redIndex = this.bandsListMap[waveSet.redBand];
          greenIndex = this.bandsListMap[waveSet.greenBand];
          blueIndex = this.bandsListMap[waveSet.blueBand];
          rgbIndex = redIndex + ',' + greenIndex + ',' + blueIndex;
        } else {
          rgbIndex = this.bandsListMap[this.waveSet.grayBand];
        }
        return rgbIndex
      },
      // 确定
      makeSure() {
        // var rgbIndex = '';
        // rgbIndex = this.getRgbIndex(this.waveSet);
        // this.$emit('makeSure',rgbIndex);
        this.checkedTableData = [];
        this.updateBands = false; //关闭对话框
        this.previewLoad = false; // 停止加载
        this.previewImg = '';//预览为空
      },
      // 取消
      cancelSelect() {
        this.updateBands = false;
        this.previewLoad = false; // 停止加载
        this.previewImg = '';//预览为空
        this.waveSet.type = this.originalBand.type;
        if (this.originalBand.type === '多波段彩色'){  
          this.waveSet.redBand = this.originalBand.redBand;
          this.waveSet.greenBand = this.originalBand.greenBand;
          this.waveSet.blueBand = this.originalBand.blueBand;
        } else {
          this.waveSet.grayBand = this.originalBand.grayBand;
        }
        this.waveSet.grayStretching = '否';
        this.waveSet.transparentColor = '';
        // var rgbIndex = '';
        // rgbIndex = this.getRgbIndex(this.waveSet);
        // this.$emit('makeSure',rgbIndex);
      },
      async applyUpdate(){
        var rgbIndex = ''; //波段
        var grayStretching = false; //是否拉伸
        var path = ''; //存放路径
        var transparentColor = ''; //透明色，去除掉的颜色
        rgbIndex = this.getRgbIndex(this.waveSet)
        if(this.waveSet.grayStretching === '是'){
          grayStretching = true;
        } else {
          grayStretching = false;
        }
        path = encodeURIComponent(this.path)
        rgbIndex = encodeURIComponent(rgbIndex)
        transparentColor = encodeURIComponent(this.waveSet.transparentColor)
        this.previewImg = '';
        this.previewLoad = true;
        this.previewImg =  await preview(grayStretching,this.mimeType,path,rgbIndex,transparentColor)
        this.previewImg = URL.createObjectURL(this.previewImg);
        this.previewLoad = false;
      }
    },
  };
</script>

<style lang='scss' >
  .update-bands-dialog {
    .el-dialog__body {
      //width:800px;
      padding: 20px;
      padding-bottom: 15px;
      text-align: left;
      line-height: 25px;
    }
    .el-item__content{
      margin-left:40px;
    }
    .el-dialog {
      width:940px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
    }
  }
  .form-style-main{
    float:left;
    width:300px;
    height:405px;
    margin-bottom: 38px;
    .el-form{
      margin:10px;
      height:425px;
    }
    .waveset-form{
      height:360px;
    }
  }
  .preview-img-style{
    float: left;
    width: 574px;
    height: 401px;
    margin-bottom: 38;
    margin-top: 10px;
    border: 1px solid #dcdfe6;
    position: relative;
    img {
      max-width: 574px;
      max-height: 401px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .preview-text-style {
      display: block;
      color: red;
      font-size: 20px;
      padding: 165px;
    }
  }
  .update-bands-footer{
    text-align: center;
    padding-top: 10px;
  }
</style>
