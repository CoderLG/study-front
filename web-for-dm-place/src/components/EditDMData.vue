<template>
  <el-dialog title="编辑数据" :visible.sync="dialogFormVisiblePublish"
             @open="open" :close-on-click-modal='false'>
    <el-form :model="editForm" ref="editForm" label-width="110px" class="editForm-wrap" v-loading="publishload">
      <el-form-item label="影像名称" prop="imageName">
        <el-input v-model="editForm.imageName" disabled></el-input>
      </el-form-item>
      <el-form-item label="影像格式" prop="format">
        <el-select v-model="editForm.format" placeholder="请选择" disabled>
          <el-option label="1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="影像级别" prop="level">
        <el-select size="small" placeholder="请选择产品级别" v-model="editForm.level"
          @clear="editForm.level = ''"
          @focus="initDictionary('level')" clearable>
          <el-option
            v-for="item in dictionary.level"
            :key="item.key"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="editForm.keyword"></el-input>
      </el-form-item>
      <el-form-item label="采集时间" prop="startTime">
        <el-date-picker type="datetime" v-model="editForm.startTime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="卫星型号" prop="satelliteId">
        <el-select size="small" v-model="editForm.satelliteId"
                   clearable placeholder="请选择卫星"
                   @change="editForm.sensorId = null"
                   @clear="editForm.satelliteId = '';editForm.sensorId = ''"
                   @focus="initDictionary('satelliteId')">
          <el-option
            v-for="item in dictionary.satelliteId"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="传感器" prop="sensorId">
        <el-select size="small" v-model="editForm.sensorId" clearable
                   :disabled="!editForm.satelliteId" placeholder="请选择传感器">
          <el-option
            v-for="item in dictionary[`satelliteId.${editForm.satelliteId}`]"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据类型" prop="dataType">
        <el-select v-model="editForm.dataType" placeholder="请选择" disabled>
          <el-option label="1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="云量" prop="cloudPercent">
        <el-slider v-model="editForm.cloudPercent"></el-slider>
      </el-form-item>
      <el-form-item label="坐标系" prop="earthMode">
        <el-select v-model="editForm.earthMode" placeholder="请选择" disabled>
          <el-option label="EPSG:4326" value="EPSG:4326"></el-option>
          <el-option label="EPSG:900913" value="EPSG:900913"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input type="textarea" v-model="editForm.description"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button type="primary" size='small' @click="submitForm">确 定</el-button>
      <el-button size='small' @click="dialogFormVisiblePublish = false">取消</el-button> 
    </div>
  </el-dialog>
</template>

<script>
import { editImageAttributes, getImageDictionary } from '../api/imageApi';
import { getdataDetail } from './../api/fileApi';

export default {
  props: {
    activeFile: {
      type: Object,
    },
  },
  data() {
    return {
      dataType: null,
      editForm: {
        imageName: '',
        format: '',
        level: '',
        keyword: '',
        startTime: '',
        satelliteId: '',
        sensorId: '',
        dataType: null,
        cloudPercent: null,
        earthMode: '',
        description: '',
      },
      imageFormat: [], // 影像格式
      keyTabValue: {
        'tif' : 'TIF格式',
        'tiff' : 'TIFF格式',
        'img' : 'IMG格式',
        'vrt' : 'VRT格式',
        '0201': '局部影像',
        '0702': 'PNG图片',
        '0901': '原始数据',
        '0203': '局部高程',
      }, // 请求到的默认值转为用户看到的value值
      objectProperties: [], // 数据解析以后得到的参数值
      publishload: false, // 发布的loading
      dialogFormVisiblePublish: false, // 数据编辑的显隐
      dictionary: {},
    };
  },
  watch: {
    // dialogFormVisiblePublish(isTrue) {
      // if (isTrue) this.open();
    // },
  },
  methods: {    
    show() {
      this.dialogFormVisiblePublish = true;
    },
    hidden() {
      this.dialogFormVisiblePublish = false;
    },
    init() {
      this.publishload = false;
      this.dataType = null;
      this.editForm = {
        imageName: '',
        format: '',
        level: '',
        keyword: '',
        startTime: '',
        satelliteId: '',
        sensorId: '',
        dataType: null,
        cloudPercent: 0,
        earthMode: '',
        description: '',
      };
    },
    async open() {
      this.init();
      this.publishload = true;
      try {
        // 获取数据类型
        this.dataType = this.activeFile.dataType;
        this.objectProperties = await getdataDetail(this.activeFile.id);
        Object.keys(this.editForm).forEach(val => {
          if (this.keyTabValue[this.objectProperties[0][val]]) {
            this.editForm[val] = this.keyTabValue[this.objectProperties[0][val]];
          } else {
            this.editForm[val] = this.objectProperties[0][val];
          }
        });
        this.publishload = false;
      } catch (e) {
        setTimeout(() => {
          this.hidden();
          this.$message.error({ message: '数据解析失败，不支持编辑操作', showClose: true });
        }, 1000);
      }
    },
    submitForm() {
      this.publishload = true;
      let editdataInfo = {};
      Object.keys(this.editForm).forEach(key => {
        if (this.editForm[key] !== null) {
          if(key === 'startTime') {
            editdataInfo[key] = new Date(this.editForm[key]);
          } else {
            editdataInfo[key] = this.editForm[key];
          }
        }
      });
      editImageAttributes(this.activeFile.id, editdataInfo).then(() => {
        this.$message.success({ message: '修改成功', showClose: true });
        this.dialogFormVisiblePublish = false;
      }).catch(() => {
        this.dialogFormVisiblePublish = true;
      });
    },
    /**
     * 加载影像参数
     */
    async initDictionary(key) {
      if(this.dictionary[key]) {
        return
      }
      const result = await getImageDictionary(key);
      this.$set(this.dictionary, key, result.dictionarys);
      result.dictionarys.map((item) => {
        if(item.dictionarys.length > 0) {
          this.$set(this.dictionary, `${key}.${item.key}`, item.dictionarys);
          let evt = item;
          delete evt.dictionarys;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  .editForm-wrap {
    padding: 0 100px;
    overflow-y: auto;
    height: calc(100vh - 402px);
    min-height: 368px;
    .el-form-item__content {
      & > div {
        width: 100%;
      }
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
  .dialog-footer {
    margin-top: 15px;
    text-align: center;
  }
</style>
