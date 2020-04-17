<template>
	<div class="layerGroup-publish-service">
    <div class="layerGroup-publish-service-title">
			<ul>
				<li @click='goBack'>返回</li>
			</ul>
    </div>
    <div class="layerGroup-publish-service-main">
			<el-steps :active="active" finish-status="success">
				<el-step title="选择图层"></el-step>
				<el-step title="设置参数"></el-step>
				<el-step title="发布完成"></el-step>
			</el-steps>
      <div v-show='stepModule[0]' class="layerGroup-class">
				<el-button type="primary" size="mini" @click='getLayerGroup' v-show='stepModuleButton'>添加图层</el-button>
        <!-- <span class="publish-layerGroups-result">* 只能添加相同瓦片格式和格网集的图层</span> -->
        <!-- 选择的图层数据 -->
        <div v-show='stepModule[3]'>
          <el-table :data="publishLayerList"
           highlight-current-row
           :show-header="true"
           class="publishLayerList-services">
            <el-table-column type="index" label="序号" />
            <el-table-column align='left' prop="layerName" label="图层名称"/>
            <el-table-column prop="layerType" label="图层类型" :formatter="formatter" align='center'/>
            <el-table-column prop="address" label="操作" align='center' width='220'>
              <template slot-scope="scope">
                <el-button type="primary" plain size="small"
                  :disabled="scope.$index===0"
                  @click="moveUp(scope.$index, scope.row)">上移</el-button>
                <el-button type="primary" plain size="small"
                 :disabled="scope.$index===(publishLayerList.length-1)"
                  @click="moveDown(scope.$index, scope.row)">下移</el-button>
                <el-button type="danger" plain size="small"
                 @click="removePublishLayerList(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <p class="publish-layerGroups-result">* 序号最小的图层最先被绘制，即位于最下层</p>           -->
        </div>
        <div v-show='active == 0' class="new-task-prompt">
          <p><i class="el-icon-bell"></i>提示</p>
          <ul>
            <li>1. 只能添加相同瓦片格式和格网集的图层。</li>
            <li>2. 序号最小的图层最先被绘制，即位于最下层。</li>
          </ul>
        </div>
        <div>
          <!-- 添加图层组 -->
          <el-dialog
            title="添加图层组"
            :visible.sync="layerGroupDialogVisible"
            :show-close ="true"
            width="50%"
            :close-on-click-modal='false'
            center>
            <div class="layerGroup-publish-service-select">
              <span>图层类型</span>
              <el-select v-model="filesType" placeholder="请选择" size='small' @change="selectDataType(filesType)">
                <el-option
                  v-for="(li, index) in filtertypeTab"
                  :key="index"
                  :label="li.name"
                  :value="li.value">
                </el-option>
              </el-select>
            </div>
            <el-table v-loading="publishLoad" ref="multipleTable" :data="layerGroupList"
              @selection-change="layerGroupSelectionChange"
              :row-key="getRowKeys"
              highlight-current-row              
              class="layerGroup-published-services" >
              <el-table-column type="selection" :reserve-selection="true" width="60" :selectable='checkboxInit' />
              <el-table-column prop="layerName" label="图层名称"
                align='left' sortable>
                  <template slot-scope="scope">
                    <p :title='scope.row.layerName'>{{ scope.row.layerName }}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="status" label="发布状态" width='150'
                align='left' sortable>
                  <template slot-scope="scope">
                    <p :title='scope.row.status'>{{ publisStatusMap[scope.row.status]}}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="layerType" label="图层来源" width='150' align='center' :formatter="formatter" />              
            </el-table>
               <!--分页-->
              <el-pagination
                background
                :current-page="layerCurrentPage"
                @current-change="layerCurrentChange"
                :page-size="layerPageSize"
                :total="layerTotal"
                layout="total, prev, pager, next">
              </el-pagination>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" type="primary" @click="layerGroupConfirm">确 定</el-button>
              <el-button size="small" @click="layerGroupDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </div>
				<div v-show='stepModule[1]' class="publish-layerGroups-params">
          <el-form v-if='ruleForm[0]' :model="ruleFormImgSql" :rules='rulesFormImgSql' ref="ruleFormImgSql" class="publishForm"
           label-width="100px" v-loading="publishLoad">
            <el-form-item label="图层组名称" prop="layerName" class="publish-layer-group-name">
              <el-input v-model="ruleFormImgSql.layerName"></el-input>
            </el-form-item>
            <el-form-item label="瓦片格式" prop="mimeType">
              <el-radio-group v-model="ruleFormImgSql.mimeType">
                <el-radio label="PNG" disabled></el-radio>
                <el-radio label="JPEG" disabled></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="格网集" prop="gridSet">
              <el-radio-group v-model="ruleFormImgSql.gridSet">
                <el-radio label="EPSG:4326" disabled></el-radio>
                <el-radio label="EPSG:3857" disabled></el-radio>
                <el-radio label="EPSG:4490" disabled></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
              <el-input v-model.number="ruleFormImgSql.minLevel"></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="ruleFormImgSql.maxLevel"></el-input>
              <span v-if='ruleFormImgSql.gridSet === "EPSG:4326"'> &nbsp;有效的层级范围：0-21</span>
              <span v-else > &nbsp;有效的层级范围：0-30</span>
            </el-form-item>
            <p class="publish-layerGroups-result" v-if='ruleFormImgSql.layerName && ruleFormImgSql.mimeType && ruleFormImgSql.gridSet'>将生成1个图层：</p>
            <p class="publish-layerGroups-result" v-else>将生成0个图层：</p>
            <div class="publish-layerGroups-result">
              <p v-if='ruleFormImgSql.layerName && ruleFormImgSql.mimeType && ruleFormImgSql.gridSet'>
                {{ ruleFormImgSql.layerName  + '-' +  ruleFormImgSql.mimeType + '-' + ruleFormImgSql.gridSet.slice(ruleFormImgSql.gridSet.indexOf(':') + 1, ruleFormImgSql.gridSet.length) }}
              </p>
            </div>
          </el-form>
				</div>
				<div v-show='stepModule[2]' class="publishLayerSuccess">
					<h1><i class="el-icon-success"></i>图层组发布成功！</h1>
          <div class="publishLayer-layerGroup-details">
            <table>
              <tr v-for='(li, index) in tableDatas' :key='index'>
                <td>{{ li.name }}</td>
                <td>{{ li.value }}</td>
              </tr>
            </table>
            <el-table :data="publishLayerListTable" align='center' size="mini">
              <el-table-column type="index" label="序号" />
              <el-table-column align='left' prop="layerName" label="图层名称" />
              <el-table-column prop="layerType" label="图层来源" align='center' :formatter="formatter" />
            </el-table>
          </div>
        </div>
			</div>
    </div>
    <div class="publish-service-footer" v-show='isPublish[0]'>
			<el-button type="primary" size="small" @click="nextStep">下一步</el-button>
      <el-button size="small" @click="goBack">取消</el-button>
		</div>
    <div class="publish-service-footer" v-show='isPublish[1]'>
			<el-button size="small" @click="prevStep" :disabled="publishFlag">上一步</el-button>
      <el-button type="primary" size="small" @click="publishLayerGroupDatas" :disabled="publishFlag">发布服务</el-button>
      <el-button size="small" @click="goBack" :disabled="publishFlag">取消</el-button>
		</div>
		<div class="publish-service-footer" v-show='isPublish[2]'>
			<el-button type="primary" size="small" @click='gotoPublishList'>进入发布列表</el-button>
		</div>
  </div>
</template>

<script>
import { getLayersList, publishLayerGroup } from '../api/imageApi';

export default {
  data() {
    const validateLayerName = (rule, value, callback) => {
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
        callback(new Error('图层组名称只能包含数字、中文、字母、下划线、短横线！'));
      } else if(!reStr.test(value)){
        callback(new Error('图层组名称必须以汉字或字母开头'));
      } else if(value.length > 50){
        callback(new Error('图层组名称长度不能超过50字符'));
      } else {
        callback();
      }
    };
    const validateMin = (rule, value, callback) => {
      if (!Number.isInteger(this.ruleFormImgSql.maxLevel)) {
        callback(new Error('请输入数字'));        
      } else if (value > this.ruleFormImgSql.maxLevel) {
        callback(new Error('最小层级不能大于最大层级'));
      } else if(this.ruleFormImgSql.gridSet === 'EPSG:3857'&& (this.ruleFormImgSql.maxLevel>30 || value < 0)) {
        callback(new Error('层级范围0-30'));
      } else if((this.ruleFormImgSql.gridSet === 'EPSG:4326' || this.ruleFormImgSql.gridSet === 'EPSG:4490') && (this.ruleFormImgSql.maxLevel>21 || value <0)){
        callback(new Error('层级范围0-21'));
      }else {
        callback();
      }
    };
    return {
      filtertypeTab: [{ name: '影像图层', value: '2' }, { name: '矢量图层', value: '1' }],
      filesType: '2', // 文件类型
      layerGroupList: [], //添加图层组列表
      publishLayerList: [], //已选择的图层数据
      publishLayerListTable: [],
      layerGroupSelections: [], //勾选图层数据
      isGridSetEqual:true, //用户判断图层的格网集是否相同
      layerGroupDialogVisible: false,
      stepModule: [true, false, false, false],
      stepModuleButton: true,
      active: 0,
      disabled: false,
      ruleForm: [false, false, false],
      publishLoad: false, // 发布服务的loading
      isPublish: [true, false, false], // 判断是否已发布
      ruleFormImgSql: {
        layerName: '',
        gridSet: 'EPSG:4326',
        mimeType: 'PNG',
        layerType: 'LAYERGROUP',
        minLevel: '',
        maxLevel: '',
      },
      rulesFormImgSql: {
        layerName: [
          { required: true, message: '请输入图层组名称', trigger: 'blur' },
           {validator: validateLayerName, trigger: 'blur' },
        ],
         minLevel: [
          { type: 'number', message: '请输入数字', trigger: 'blur'},
          { validator: validateMin, trigger: 'blur' },
        ],
      },
      tableDatas: [
        {name: '图层名称', value: 'dfd'},
        {name: '网格', value: '泛光灯'},
        {name: '最小层级', value: '的风格地方'},
        {name: '最大层级', value: 'dfd'},
        {name: '瓦片格式', value: '泛光灯'},
        {name: '图层类型', value: '的风格地方'},
        {name: '切片状态', value: '泛光灯'},
        {name: '瓦片类型', value: '的风格地方'},
      ],
      publisStatusMap: {
        'NEW': '准备发布',
        'PROCESSING': '正在发布',
        'SUCCESS': '发布成功',
        'FAILED': '发布失败'
      },
      layerCurrentPage: 1, // 图层列表当前页数
      layerTotal: 100, // 图层列表的总页数
      layerPageSize: 20, // 图层列表每页条目数
      getRowKeys(row) {
        return row.id;
      },
      publishFlag: false,
    };
  },
  props:{
    isAddLayerGroup:{
      type:Boolean,
    },
  },
  watch:{
    isAddLayerGroup(){
      this.stepModule = [true, false, false, false];
    }
  },
  methods: {
    formatter(row) {
      if (row && row.layerType === 'IMAGELAYER') {
        return '影像图层';
      } else if (row && row.layerType === 'VECTORLAYER') {
        return '矢量图层';
      }
    },
    layerGroupSelectionChange(value) {
      this.layerGroupSelections = value;
    },
    checkboxInit(row) {
      if(row.status && row.status !== 'SUCCESS') {
        return 0;
      }
      const list = this.publishLayerList;
      if(list){
        let element;
        for (let i = 0; i < list.length; i += 1) {
          element = list[i].id;
          if (row.id === element) {
            return 0; // 不可勾选
          }
        }
        return 1; // 可勾选
      }
    },
    // 添加图层组
    getLayerGroup() {
      this.layerGroupDialogVisible = true;
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
       this.selectDataType(this.filesType);
     
    },
    // 确定
    async layerGroupConfirm() {
      if (this.layerGroupSelections.length > 0) {
        this.stepModule[3] = true;
        const arrayLayer = this.publishLayerList;
        const newArrayList = arrayLayer.concat(this.layerGroupSelections);
        this.publishLayerList = newArrayList;
        this.layerGroupDialogVisible = false;
      } else {
        this.$message.warning({
          message: '当前没有数据，请您选择要添加的数据',
          showClose: true
        });
      }
    },
    // 获取分页列表
    async layerCurrentChange(val) {
      this.layerCurrentPage = val;
      if (this.filesType === '2') {
        const layerImageDatas = await getLayersList(this.layerCurrentPage, this.layerPageSize, 'DESC', 'IMAGELAYER', false, '');
        this.layerGroupList = layerImageDatas.data;
        this.layerTotal = layerImageDatas.total;
      }else if (this.filesType === '1'){
        const vectorDatas = await getLayersList(this.layerCurrentPage, this.layerPageSize, 'DESC', 'VECTORLAYER', false, '');
        this.layerGroupList = vectorDatas.data;
        this.layerTotal = vectorDatas.total;
      }
    },
    // 选择数据类型
    async selectDataType(filesType) {
      this.publishLoad = true;
      this.layerCurrentPage = 1;
      if (filesType === '1') {
        const shpLayerList = await getLayersList(this.layerCurrentPage, this.layerPageSize, 'DESC', 'VECTORLAYER', false, '');
        this.layerGroupList = shpLayerList.data;
        this.layerTotal = shpLayerList.total;
      } else if (filesType === '2') {
        const layerImageList = await getLayersList(this.layerCurrentPage, this.layerPageSize, 'DESC', 'IMAGELAYER', false, '');
        this.layerGroupList = layerImageList.data;
        this.layerTotal = layerImageList.total;
        // const imageLayerList = await getLayersList(0,20,'DESC','IMAGE','LAYER','');
        // this.layerGroupList = imageLayerList.content;
      } else if (filesType === '3') {
        const demLayerList = await getLayersList(1, 20, 'DESC', 'DEMLAYER', false, '');
        this.layerGroupList = demLayerList.data;
      }
      this.publishLoad = false;
    },
    // 删除
    removePublishLayerList(index) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning',
      }).then(() => {
       this.publishLayerList.splice(index, 1);
      });
    },
    //向上移动
    moveUp(index) {
      var that = this;
      if (index > 0) {
          let upDate = that.publishLayerList[index - 1];
          that.publishLayerList.splice(index - 1, 1);
          that.publishLayerList.splice(index,0, upDate);
      } else {
        this.$message.warning('已经是第一条，不可上移');
      }
    },
    // 向下移动
    moveDown(index){
      var that = this;
      if ((index + 1) === that.publishLayerList.length){
        this.$message.warning('已经是最后一条，不可下移');
      } else {
        let downDate = that.publishLayerList[index + 1];
        that.publishLayerList.splice(index + 1, 1);
        that.publishLayerList.splice(index,0, downDate);
      }
    },
    // 上一步
    prevStep() {
      if (this.active-- < 1) this.active = 0; this.disabled = false;
      if (this.active === 2) this.active = 1;
      this.stepModule = [false, false, false, false];
      if(this.active === 0){
        this.stepModule[3] = true;
      }
      this.stepModule[this.active] = true;
      this.stepModuleButton = true; 
      this.isPublish = [true, false, false];
    },
    // 发布
    publishLayerGroupDatas() {
      const regPos = /^\d+(\.\d+)?$/; //非负浮点数
      if (!regPos.test(this.ruleFormImgSql.minLevel) || !regPos.test(this.ruleFormImgSql.maxLevel) ||  this.ruleFormImgSql.maxLevel < this.ruleFormImgSql.minLevel) {
        this.$message.warning({ message: '请填写正确的层级范围！', showClose: true });
        return;
      } else if (this.ruleFormImgSql.gridSet === "EPSG:4326" && 21 < this.ruleFormImgSql.maxLevel) {
        this.$message.warning({ message: '请填写正确的层级范围！', showClose: true });
        return;
      } else if (this.ruleFormImgSql.gridSet === "EPSG:3857" && 30 < this.ruleFormImgSql.maxLevel) {
        this.$message.warning({ message: '请填写正确的层级范围！', showClose: true });
        return;
      }
      const layerGroupParams = {
        layerName: this.ruleFormImgSql.layerName + '-' + this.ruleFormImgSql.mimeType + '-' + this.ruleFormImgSql.gridSet.slice(this.ruleFormImgSql.gridSet.indexOf(':') + 1, this.ruleFormImgSql.gridSet.length),
        gridSet: this.ruleFormImgSql.gridSet,
        mimeType: this.ruleFormImgSql.mimeType,
        layerType: this.ruleFormImgSql.layerType,
        minLevel: this.ruleFormImgSql.minLevel,
        maxLevel: this.ruleFormImgSql.maxLevel,
        tileLayers: this.ruleFormImgSql.tileLayers,
        workspace: 'icenter',
      };
      this.setOptions('ruleFormImgSql', layerGroupParams, publishLayerGroup);
    },
    //判断添加的图层组中的格网集\瓦片格式是不是一致
    isEqual(publishLayerList){
      var layerNameList = [];
      var gridSet = '';
      var mimeType = '';
      var NameList = [];
      publishLayerList.forEach((val)=>{
        NameList = val.layerName.split('-') //按照-分割字符串，倒数第二个是瓦片格式，倒数第一个是格网集
        gridSet = NameList[NameList.length - 1];
        mimeType = NameList[NameList.length - 2];
        layerNameList.push(mimeType + '-' + gridSet);
      })
      //判断数组中的元素是否全部相同
      var isTrue = true;//判断变量
      var leng = layerNameList.length;//数组的长度
      for(var i=0;i<leng-1;i++){
        for(var j=i+1;j<leng;j++)
          if(layerNameList[i]!=layerNameList[j]){
            isTrue = false;
          }
        }
      return isTrue;
    },
    // 下一步
    async nextStep() {
      this.isGridSetEqual = this.isEqual(this.publishLayerList)
      if (this.publishLayerList.length === 0) {
        this.$message.warning({ message: '请选择图层数据！', showClose: true });
        return;
      } else if (this.publishLayerList.length < 2) {
        this.$message.warning({ message: '图层组至少2条数据，请正确添加图层数据！', showClose: true });
        return;
      } else if(!this.isGridSetEqual){
        this.$message.warning({message: '图层组的格网集、瓦片格式必须全部相同！', showClose: true });
        return;
      }
      // 根据所选的第一个图层设置默认值
      this.ruleFormImgSql.gridSet = this.publishLayerList[0].gridSet;
      this.ruleFormImgSql.mimeType = this.publishLayerList[0].mimeType;
      // this.isPublish = [false, true, false];
      if (this.active === 0) {
        const layerListInfo = [];
        for (let i = 0; i < this.publishLayerList.length; i += 1) {
          // 子图层
          this.ruleFormImgSql.tileLayers = {
            'layermember': {
              'layerName': this.publishLayerList[i].layerName,
              'minLevel': this.publishLayerList[i].minLevel,
              'maxLevel': this.publishLayerList[i].maxLevel,
              'layerType': this.publishLayerList[i].layerType,
              'workspace': this.publishLayerList[i].workspace,
              'mimeType': this.publishLayerList[i].mimeType,
              'tileStatus': this.publishLayerList[i].tileStatus,
              'minX': this.publishLayerList[i].minX,
              'minY': this.publishLayerList[i].minY,
              'maxX': this.publishLayerList[i].maxX,
              'maxY': this.publishLayerList[i].maxY,
              'styleName': this.publishLayerList[i].styleName ? this.publishLayerList[i].styleName : null,
            },
            'sort': i,
          }
          this.ruleFormImgSql.layerName = 'LayerGroup';
          layerListInfo.push(this.ruleFormImgSql.tileLayers);
        }
        this.ruleFormImgSql.tileLayers = layerListInfo;
        const levelArray = [];
        // 将所有图层中的层级范围放入一个空数组
        this.ruleFormImgSql.tileLayers.forEach(res => {
          levelArray.push(res.layermember.minLevel);
          levelArray.push(res.layermember.maxLevel);                  
        });
        this.isPublish = [false, true, false];
        this.ruleFormImgSql.minLevel = Math.min(...levelArray);
        this.ruleFormImgSql.maxLevel = Math.max(...levelArray);
        this.ruleForm[0] = true;
        this.disabled = true;
        this.stepModule = [true, true, false];
        this.stepModuleButton = false;
        if (this.active++ > 2) { 
          this.active = 3; 
          this.stepModule[2] = true; 
          return; 
        }
        // this.stepModule[1] = true;
      } 
    },
    // 进入发布列表
    gotoPublishList() {
      this.active = 0;
      this.disabled = false;
      this.stepModule = [true, false, false]; 
      this.stepModuleButton = true;     
      this.isPublish = [true, false, false];
      this.$emit('goBack');
    },
    // 设置参数
    async setOptions(refObj, ruleForm, funObj) {
      const imagesFileTab = {
        layerName: '图层组名称',
        mimeType: '瓦片格式',
        gridSet: '格网集',
        minMaxLevel:'层级范围',
      };
      this.$refs[refObj].validate((valid) => {
        if (valid) {
          this.publishLoad = true;
          this.publishFlag = true;
          funObj(ruleForm).then((res) => {
            this.stepModule = [true, false, true];
            this.stepModuleButton = false;
            this.active = 3; 
            // this.stepModule[2] = true;
            this.addTab(res, imagesFileTab);
            this.publishLoad = false;
            this.isPublish = [false, false, true];
            this.$refs[refObj].resetFields();
            this.publishLayerList =  [];
             this.publishFlag = false;
          }).catch(() => {
            this.publishLoad = false;
            this.publishFlag = false;
          });
        } else {
          this.$message.warning({ message: '请输入完整参数', showClose: true });
        }
      });
    },
    addTab(tabObject, fileDalias) {
      const tableDataOne = [];
      Object.keys(fileDalias).forEach((key) => {
        if(fileDalias[key] === '层级范围'){
          tableDataOne.push({ name: fileDalias[key], value: tabObject.minLevel + '-' +  tabObject.maxLevel });
        } else if (tabObject[key]) {
          tableDataOne.push({ name: fileDalias[key], value: tabObject[key] });
        }
      });
      this.tableDatas = tableDataOne;
      this.publishLayerListTable = this.publishLayerList;
    },
    // 返回
    goBack() {
      this.active = 0;
      this.disabled = false;
      this.stepModule = [true, false, false];
      this.stepModuleButton = true;   
      this.isPublish = [true, false, false];
      this.publishLayerList =  [];
      this.$emit('goBack');
    },
  },
};
</script>

<style lang="scss">
.layerGroup-publish-service{
  .layerGroup-publish-service-title{
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
  .el-dialog--center .el-dialog__body {
      text-align: initial;
      padding: 20px 25px 0px;
  }
  .layerGroup-publish-service-select{
    height: 50px;
    padding-left: 22px;
    .el-select {
      width: 200px !important;
    }
  }
  .layerGroup-publish-service-main {
    padding-left: 155px;
    height: calc(100vh - 173px);
    .el-select {
      width: 100% ;
    }
    .el-table__body-wrapper {
      height: auto !important;
    }
    .el-dialog .el-table__body-wrapper {
      height: calc(100vh - 452px) !important;
      border-top: 1px solid #ebeef5;
      min-height: 318px;
    }
    .el-dialog__header {
      padding: 0px 20px;
      line-height: 50px;
      background: #0c8bde;
      text-align: left;
      .el-dialog__title {
        color: white;
      }
      .el-dialog__headerbtn {
        top: 16px;
        .el-dialog__close {
          color: white;
        }
      }
    }
    h1 {
      font-size: 36px;
      color: #24A5F8;
      padding-left: 0px;
      padding-bottom: 15px;
      padding-top: 31px;
      i {
        color: #67c23a;
        margin-right: 16px;
        font-size: 27px !important;
      }
    }
    .el-steps--horizontal {
      width: calc((100vw / 100 * 60) - 200px);
      margin: 20px 0px 20px 0px;
     
    }
    .el-step__icon {
      width: 35px;
      height: 35px;
    }
    .el-step__icon.is-text {
      border-width: 2px;
    }
    .el-step.is-horizontal .el-step__line {
      top: 17px;
    }
    .el-step__icon-inner {
      font-size: 23px;
    }
    .el-table td:first-of-type .cell {
      width: calc(100vw / 2 - 525px)!important;
      overflow: hidden;
      P {
        width: 100%;
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .el-table td.is-center {
      padding-right: 0px;
    }
  }
  .publish-service-footer {
    text-align: center;
    padding-right: 30%;
  }
  .publishLayerList-services{
    padding-top: 25px;
    width: calc((100vw / 100 * 60) - 200px);
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: 0 !important;
  }
  .dialog-footer > button {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .el-dialog__footer {
    padding: 0px;
  }
 .publishLayerSuccess {
    width: 60%;
    overflow: auto;
    height: calc(100vh - 291px) !important;
    .el-table {
      position: inherit;
      font-size: small;
    }
    .el-table__body-wrapper{
      border-top: 1px solid #ebeef5;
      position: inherit;
      height: calc(100vh - 695px) !important;
      border-top: 0;
      min-height: 137px;
    }
    .publishLayer-layerGroup-details {
      font-size: 14px;
      tr td:first-of-type {
        width: 100px;
        color: #453e3e;
        font-weight: 700;
      }
      tr td {
       padding-top: 15px;
      }
    }
  }
  .publish-data-level {
    .el-input {
      width: 125px;
    }
    // .el-form-item__content {
    //   margin-left: 45px !important;
    // }
  }
  .publish-layerGroups-result {
      color: #409EFF;
      font-size: small;
      padding-top: 6px;
  }
  .publish-layerGroups-params {
    .el-form-item__label {
      text-align: left;
      color: #303133;
      font-weight: 700;
    }
    .publish-layer-group-name {
      width: 550px;
    }
  }
  .layerGroup-class{
    overflow-y: auto;
    height: calc(100vh - 269px);
    .new-task-prompt {
      padding-top: 20px;
      font-size: 14px;
      p {
        font-weight: 700;
        color: #303133;
        font-size: 16px;
        line-height: 36px;
        i {
          padding-right: 8px;
          font-weight: 700;
        }
      }
    }
  }
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    float: right;
    margin-right: 5px;
  }
  .el-step__title.is-wait, .el-step__title.is-process, .el-step__title.is-success{
    margin-left: -12px;
  }
  .el-step.is-horizontal .el-step__line {
    left: 50px;
    right: 20px;
  }
}
</style>
