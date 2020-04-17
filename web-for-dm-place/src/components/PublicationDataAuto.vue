<template>
  <div v-show='dialogFormVisiblePublish'>
    <el-form
      :model="publishForm"
      :rules='publishFormRules'
      ref="publishForm"
      class="publishForm"
      size="small"
      label-width="80px"
      v-loading="publishload">
      <el-form-item label="服务名称" prop="fileName" class="publish-data-name">
        <el-input v-model="publishForm.fileName"></el-input>
      </el-form-item>
      <el-form-item v-show='dataType === "vector"' label="字符编码" prop="chartCode" class="publish-data-name">
        <el-select v-model="publishForm.chartCode" placeholder="请选择">
          <el-option label="GBK" value="GBK"></el-option>
          <el-option label="UTF-8" value="UTF-8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show='dataType === "vector"' label="样式表" prop="styleName" class="publish-data-name">
        <el-select v-model="publishForm.styleName" placeholder="请选择" clearable
         :disabled='publishForm.mimeType === "GEOJSON"'>
          <el-option
            v-for="item in styleList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="瓦片格式" prop="mimeType" v-if='dataType === "terrain"'>
        <el-radio-group v-model="publishForm.mimeType">
          <el-radio label="TERRAIN(heightmap)"></el-radio>
          <el-radio label="TERRAIN(quantized-mesh)"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="瓦片格式" prop="mimeType" v-else>
        <el-radio-group v-model="publishForm.mimeType">
          <el-radio label="PNG"></el-radio>
          <el-radio v-if='dataType === "vector"' label="GEOJSON"></el-radio>
          <el-radio v-else label="JPEG"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="格网集" prop="gridSet" class="publish-data-gridSet">
        <el-radio-group v-model="publishForm.gridSet" @change = 'changeGrid'>
          <el-radio label="EPSG:4326"></el-radio>
          <el-radio v-if='dataType !== "terrain"' label="EPSG:3857"></el-radio>
          <el-radio v-if='dataType !== "terrain"' label="EPSG:4490"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
        <el-input v-model.number="publishForm.minLevel" :disabled ='dataType === "terrain"'></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="publishForm.maxLevel"></el-input>
        <span v-if='publishForm.gridSet === "EPSG:3857"'> &nbsp;有效的层级范围：0-30</span>
        <span v-else> &nbsp;有效的层级范围：0-21</span>
      </el-form-item>
      <el-form-item v-if='dataType === "image"' label="透明色" prop="transparentColor" class="publish-data-color">
        <el-color-picker v-model="publishForm.transparentColor"></el-color-picker>
      </el-form-item>
      <el-form-item v-show='dataType !== "terrain"' label="立即切片" prop="needSeed" class="publish-data-cut">
        <el-switch v-model="publishForm.needSeed"
         active-color="#0c8bde">
        </el-switch>
      </el-form-item>
      <p class="publish-data-result" v-if='publishForm.fileName && publishForm.mimeType && publishForm.gridSet'>将生成1个图层：</p>
      <p class="publish-data-result" v-else>将生成0个图层：</p>
      <div class="publish-data-result">
        <p v-if='publishForm.fileName && publishForm.mimeType && publishForm.gridSet'>
          {{ publishForm.fileName + '-' + (publishForm.mimeType.indexOf('(') === -1 ? publishForm.mimeType : publishForm.mimeType.slice(0, publishForm.mimeType.indexOf('('))) + '-' + publishForm.gridSet.slice(publishForm.gridSet.indexOf(':') + 1, publishForm.gridSet.length) }}
        </p>
        <!-- <p v-if='publishForm.fileName && publishForm.mimeType && publishForm.gridSet && dataType !== "vector"'>
          {{ publishForm.fileName + '-' + publishForm.mimeType + '-' + publishForm.gridSet.slice(publishForm.gridSet.indexOf(':') + 1, publishForm.gridSet.length) }}
        </p> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import { getdataDetail } from '../api/fileApi';
import { publishDataLayer, computeImageLevel} from '../api/publicApi';
import { publishTerrainLayer, getTerrainLayerInfo } from '../api/tileCacheApi';
import { getVectorStyleList } from '../api/vectorApi';

export default {
  props: {
    activeFile: {
      type: Object,
    },
    dialogFormVisiblePublish: {
      type: Boolean,
    },
    isPublishData: {
      type: Boolean,
    },
    vectorLayerInfo: {
      type: Object,
    },
  },
  data() {
    const validateName = (rule, value, callback) => {
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
        callback(new Error('图层名只能包含数字、中文、字母、下划线、短横线！'));
      } else if(!reStr.test(value)){
        callback(new Error('图层名必须以汉字或字母开头'));
      } else if(value.length > 50){
        callback(new Error('图层名长度不能超过50字符'));
      } else {
        callback();
      }
    };
    const validateMin = (rule, value, callback) => {
      if (!Number.isInteger(this.publishForm.maxLevel)) {
        callback(new Error('请输入数字'));        
      } else if (value > this.publishForm.maxLevel) {
        callback(new Error('最小层级不能大于最大层级'));
      } else if(this.publishForm.gridSet === 'EPSG:3857'&& (this.publishForm.maxLevel>30 || value < 0)) {
        callback(new Error('层级范围0-30'));
      } else if((this.publishForm.gridSet === 'EPSG:4326' || this.publishForm.gridSet === 'EPSG:4490') && (this.publishForm.maxLevel>21 || value <0)){
        callback(new Error('层级范围0-21'));
      } else {
        callback();
      }      
    };    
    return {
      dataType: null,
      styleList: [], // 样式列表
      lowLeftLon:0,
      lowRightLat:0,
      lowRightLon:0,
      originGridSet:'',
      rasterXSize:0,
      rasterYSize:0,
      targetGridSet:'',
      upRightLat:0,
      imageGridSet:'',//记录成果影像的格网集
      publishForm: {
        fileName: '',
        mimeType: 'PNG',
        gridSet: 'EPSG:4326',
        minLevel: null,
        maxLevel: null,
        needSeed: false,
        transparentColor: null,
        chartCode: '',
        styleName: '',
        shpName: '',
        dataLocation: '',
        tabIndex:0,//记录多个矢量数据中的，当前矢量的index
      },
      publishFormRules: {
        fileName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' },
        ],
        mimeType: [
          { required: true, message: '请勾选瓦片格式', trigger: 'blur' },
        ],
        gridSet: [
          { required: true, message: '请勾选格网集', trigger: 'blur' },
        ],
        minLevel: [
          { type: 'number', message: '请输入数字', trigger: 'blur'},
          { validator: validateMin, trigger: 'blur' },
        ],
        chartCode: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
      },
      dataInfo: [], // 数据解析以后得到的参数值
      publishload: false, // 发布的loading
      needSeed: false, // 是否切片
      obj: {}, // 矢量包数据信息
      extName: '',
    };
  },
  watch: {
    dialogFormVisiblePublish(isTrue) {
      if (isTrue) {
        this.open();
      } else {
        this.obj = {};
      }
    },
    isPublishData() {
      this.submitForm('publishForm');
    },
    vectorLayerInfo(obj) {
      this.obj = obj;
      this.publishForm.fileName = obj.name.slice(0, obj.name.indexOf('.'));
      this.tabIndex = obj.tabIndex;
      //this.publishForm.dataLocation = `/${obj.name}`;
      // this.publishForm.shpName = obj.name;
      // this.publishForm.dataLocation = obj.location;
    },
  },
  methods: {
    show() {
      this.dialogFormVisiblePublish = true;
    },
    init() {
      this.dataType = null;
    },
    async open() {
      this.init();
      // 获取数据类型      
      this.dataType = this.activeFile.dataType;
      this.extName = this.activeFile.extName;
      // 矢量获取未发布的详情需要单独获取
      this.$refs['publishForm'].resetFields();
      this.publishForm = {
        fileName: '',
        mimeType: 'PNG',
        gridSet: 'EPSG:4326',
        minLevel: null,
        maxLevel: null,
        needSeed: false,
        transparentColor: null,
        chartCode: 'UTF-8',
        styleName: '',
        shpName: '',
        dataLocation: '',
      };
      // 获取详情
      let objectProperties = await getdataDetail(this.activeFile.id);
      this.dataInfo = objectProperties;
      let originalobject;
      if(this.tabIndex){
        originalobject = objectProperties.analysisBasicDatas[this.tabIndex];
        objectProperties = objectProperties.analysisBasicDatas[this.tabIndex].info;
        this.tabIndex = 0;
      }else{
        originalobject = objectProperties.analysisBasicDatas[0];
        objectProperties = objectProperties.analysisBasicDatas[0].info;
        this.tabIndex = 0;
      }
      // 设置发布参数
      if(this.dataType!='vector' && this.dataType!='terrain'){
        //this.publishForm.fileName = objectProperties.fileName.slice(0, objectProperties.fileName.indexOf('.'));
        this.publishForm.fileName = originalobject.fileName.slice(0, originalobject.fileName.indexOf('.'));
        this.imageGridSet = objectProperties.gridSet;//获取数据的原始格网集
        //const levelRes = this.computeLevelRange(objectProperties.rasterXSize, objectProperties.rasterYSize, objectProperties.lowLeftLon, objectProperties.lowLeftLat, objectProperties.upRightLon, objectProperties.upRightLat);
        this.lowLeftLon = objectProperties.lowLeftLon;
        this.lowRightLat = objectProperties.lowRightLat;
        this.lowRightLon = objectProperties.lowRightLon;
        this.rasterXSize = objectProperties.rasterXSize;
        this.rasterYSize = objectProperties.rasterYSize;
        this.upRightLat = objectProperties.upRightLat;
        var levelRes = await this.computeImageLevel(this.lowLeftLon,this.lowRightLat,this.lowRightLon,this.imageGridSet,this.rasterXSize,this.rasterYSize,this.publishForm.gridSet,this.upRightLat );
        //this.publishForm.minLevel = Math.floor(levelRes[0]);
        //this.publishForm.maxLevel = Math.ceil(levelRes[1]);
        this.publishForm.minLevel = levelRes.minLevel;
        this.publishForm.maxLevel = levelRes.maxLevel;
      }
      // 矢量独有参数
      if (this.dataType === 'vector') {
        this.publishForm.fileName = this.obj.name ? this.obj.name.slice(0, this.obj.name.indexOf('.')) : originalobject.fileName.slice(0, originalobject.fileName.indexOf('.'));
        const styleList = await getVectorStyleList('', 1, 1000); // 默认最多请求1000个样式
        this.styleList = styleList.data;
        this.publishForm.dataLocation = objectProperties.fileRelativePath ? objectProperties.fileRelativePath : `/${originalobject.fileName}`
        this.publishForm.shpName = this.obj.name ? this.obj.name : originalobject.fileName;
        this.publishForm.chartCode = (!objectProperties.charCode ? 'UTF-8' : objectProperties.charCode);
        this.publishForm.minLevel = 0;
        this.publishForm.maxLevel = 5;
      }
      // 地形
      if (this.dataType === 'terrain') {
        this.publishForm.fileName = originalobject.fileName.slice(0, originalobject.fileName.indexOf('.'));
        this.publishForm.mimeType = 'TERRAIN(heightmap)';
        getTerrainLayerInfo(this.dataInfo.filePath).then(res => {
          this.publishForm.minLevel = 0;
          this.publishForm.maxLevel = res.result.max;
        });
      }
    },
    //改变格网集，切换层级范围
    async changeGrid(grid) {
      var targetGridSet = grid //目标格网集
      if(this.dataType != 'vector' && this.dataType != 'terrain') {
        var levelRes = await this.computeImageLevel(this.lowLeftLon,this.lowRightLat,this.lowRightLon,this.imageGridSet,this.rasterXSize,this.rasterYSize,targetGridSet,this.upRightLat );
        this.publishForm.minLevel = levelRes.minLevel;
        this.publishForm.maxLevel = levelRes.maxLevel;
      }
    },
    //后端计算层级
    async computeImageLevel(lowLeftLon,lowRightLat,lowRightLon,imageGridSet,rasterXSize,rasterYSize,targetGridSet,upRightLat ) {
      var levels = {
        minLevel: 0,
        maxLevel: 0,
      }
      if (lowLeftLon !== null && lowRightLat !== null  && lowRightLon !== null  && upRightLat !== null ) {
        var levelRes = await computeImageLevel(lowLeftLon,lowRightLat,lowRightLon,imageGridSet,rasterXSize,rasterYSize,targetGridSet,upRightLat );
        levels.minLevel= levelRes.minLevel;
        levels.maxLevel= levelRes.maxLevel;
      } else {
        this.$message.warning({ message:'图像元信息不完整，投影信息缺失，不建议发布。', showClose: true });
        levels.minLevel = 0;
        levels.maxLevel = 0;
      }
      return levels;
    },
    // 计算层级范围的函数
    computeLevelRange(rasterX, rasterY, minX, minY, maxX, maxY) {
      const defaulttilesize = 256;
      // 数组0为经度，1为纬度 左下
      let leftDown = [minX, minY];
      // 右上经纬度
      let rightUp = [maxX, maxY];
      const xl = rightUp[0] - leftDown[0];
      const yl = rightUp[1] - leftDown[1];
      const levelZeroRange = 180.0;
      // 获取每个像素对应的经纬跨度
      const xr = xl / rasterX;
      const yr = yl / rasterY;
      const resolutions = [ xr, yr ];
      const levelatX = (Math.log(Math.abs(resolutions[0] * defaulttilesize) / levelZeroRange) / Math.log(0.5));
      const levelatY = (Math.log(Math.abs(resolutions[1] * defaulttilesize) / levelZeroRange) / Math.log(0.5));
      const bestSuit = Math.ceil(((levelatX + levelatY) / 2.0) - 0.4);
      const step = xl > yl ? xl : yl;
      const maxLevel = bestSuit;
      let minLevel = Math.log(180.0 / step) / Math.log(2.0) - 0.4;
      minLevel = Math.max(minLevel, 0);
      return [minLevel, maxLevel];
    },
    submitForm(formName) {
      this.publishload = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.publish();
          return true;
        }
        this.publishload = false;
        return false;
      });
    },
    async publish() {
      let publishFormNew = this.publishForm;
      // 地形图层发布
      if (this.dataType === 'terrain') {
        const publishParams = {
          "dataEntityId": this.dataInfo.analysisBasicDatas[0].dataEntityId,
          "dataPath": this.dataInfo.filePath,
          "dataType": "dem",
          "gridSet": 4326,
          "minLevel": publishFormNew.minLevel,
          "maxLevel": publishFormNew.maxLevel,
          "mimeType": publishFormNew.mimeType === 'TERRAIN(heightmap)' ? 'terrain' : 'mesh',
          "taskName": `${publishFormNew.fileName}-TERRAIN-${publishFormNew.gridSet.slice(publishFormNew.gridSet.indexOf(':') + 1, publishFormNew.gridSet.length)}`,
          "tileType": "mbtiles",
          "type": "dem"
        };
        publishTerrainLayer(publishParams).then(res => {
          this.publishload = false;
          this.$emit('publishSuccess', res);
        }).catch(() => {
          this.publishload = false;
          this.$emit('publishError');
        });
        return;
      }
      // 地形以外的图层      
      let publishParams = {};
      publishParams = {
        "dataType": this.dataType,
        "dataEntityId": this.dataInfo.analysisBasicDatas[0].dataEntityId,
        "layerName": `${publishFormNew.fileName}-${publishFormNew.mimeType}-${publishFormNew.gridSet.slice(publishFormNew.gridSet.indexOf(':') + 1, publishFormNew.gridSet.length)}`,
        "mimeType": publishFormNew.mimeType,
        "minLevel": publishFormNew.minLevel,
        "maxLevel": publishFormNew.maxLevel,
        "filePath": this.dataInfo.filePath,
        "gridSet": publishFormNew.gridSet,
        "charCode": (this.dataType === 'vector'? publishFormNew.chartCode:'UTF-8'),
        "needSeed": publishFormNew.needSeed ? publishFormNew.needSeed : false,
        "transparentColor": publishFormNew.transparentColor ? publishFormNew.transparentColor : '',
        "styleName": publishFormNew.styleName ? publishFormNew.styleName : '',
        "dataLocation": publishFormNew.dataLocation ? publishFormNew.dataLocation : '',
        "shpName": publishFormNew.shpName ? publishFormNew.shpName : '',
      };
      if (this.dataType === 'vector') {
        publishParams.epsg = '4326';
        // publishParams.mimeType = this.publishForm.mimeType.toLowerCase();
      }
      publishDataLayer(publishParams).then(res => {
        this.publishload = false;
        this.$emit('publishSuccess', res);
      }).catch(() => {
        this.publishload = false;
        this.$emit('publishError');
      });      
    },
  },
};
</script>
<style lang="scss">
  .publishForm {
    padding: 0 50px;
    padding-top: 20px;
    overflow-y: auto;
    height: calc(100vh - 468px);
    min-height: 301px;
    .el-form-item__content {
      & > div {
        width: 100%;
      }
    }
    .publish-data-name {
      .el-form-item__content {
        & > div {
          width: 70%;
        }
      }
    }
    .publish-data-gridSet {
      min-width: 220px;
      .el-checkbox+.el-checkbox {
        margin-left: 0px;
        margin-top: 21px;
      }
      .el-checkbox, .el-checkbox__input {
        display: block;
      }
      .el-checkbox__input {
        display: inline-block !important;
      }
    }
    .publish-data-level {
      .el-input {
        width: 17%;
      }
      // .el-form-item__content {
      //   margin-left: 45px !important;
      // }
    }
    .publish-data-color, .publish-data-cut {
      clear: both;
    }
    .publish-data-result {
      color: #409EFF;
      line-height: 23px;
    }
  }
</style>