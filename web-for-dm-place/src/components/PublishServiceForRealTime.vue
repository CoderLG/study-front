<template>
	<div class="publish-service-componment">
    <div class="publish-service-title">
			<ul>
				<li @click='goBack'>返回</li>
			</ul>
    </div>
    <div class="publish-service-select">
			<span>服务类型：</span>
			<el-select v-model="serviceType" size='small' placeholder="请选择">
				<el-option v-for='(li, index) in servicetype'
					:key='index' :value='li.value' :label="li.name"></el-option>
			</el-select>
    </div>
    <div class="publish-service-main">
			<el-steps :active="active" finish-status="success">
				<el-step title="选择脚本"></el-step>
        <el-step title="设置参数"></el-step>
				<el-step title="围栏选择"></el-step>
				<el-step title="发布完成"></el-step>
			</el-steps>
			<div>
        <!--选择数据-->
				<div v-show='stepModule[0]'>
					<el-button type="primary" size="mini" @click='showServerDirectory'>选择脚本</el-button>
				</div>
        <!--设置参数-->
				<div v-show='stepModule[1]' class="publishService-Params">
          <el-form :model="ruleFormScript"
            ref="ruleFormScript" :rules="rulesScript" v-loading='publishLoad' label-width="100px">
            <el-form-item label="数据源ID" prop="sourceId">
              <el-input v-model="ruleFormScript.sourceId"></el-input>
            </el-form-item>
            <el-form-item label="服务描述" prop="describe">
              <el-input v-model="ruleFormScript.describe"></el-input>
            </el-form-item>
            <el-form-item label="服务脚本" prop="scriptName">
              <el-input disabled v-model="ruleFormScript.scriptName"></el-input>
            </el-form-item>
            <el-form-item label="预览图标" prop="iconId">
              <ul class="new-target-icon-manager">
                <li v-for="(item, index) in iconList" :key="index">
                  <el-radio v-model="ruleFormScript.iconId" :label="item.id">
                    {{ item.name }}&nbsp;&nbsp;
                  </el-radio>
                  <img :src="item.img" alt="">
                </li>
              </ul>
            </el-form-item>            
            <!-- <el-form-item label="数据层级" prop="layerMinLevel">
              <el-input v-model.number="ruleFormScript.layerMinLevel"></el-input>
            </el-form-item> -->
          </el-form>
          <div class="publish-service-center-point">
            <h3>数据位置 <span>{{ centerPoint[0] }} , {{ centerPoint[1] }}</span></h3>
            <div id='centerWrap' class="publish-service-center-point-map">
              <img src="../../static/images/red_target.png" alt="" class="publish-service-center-point-icon">
            </div>
          </div>
				</div>
        <!--设置围栏-->
        <div v-show='stepModule[2]' class="publish-service-select-fence">
          <div>
            <el-radio v-model="isSetFence" label="1">设置围栏</el-radio>
            <el-radio v-model="isSetFence" label="2">不设置围栏</el-radio>
          </div>
          <el-button v-show='isSetFence === "1"' type="primary" size="mini" @click='showFenceList'>添加围栏</el-button>
        </div>
        <!--发布完成-->
				<div v-show='stepModule[3]' class="hBasePublishLayerListDetails">
					<h1><i class="el-icon-success"></i>发布成功！</h1>
          <table>
            <tr v-for='(li, index) in tableDatas' :key='index'>
              <td>{{ li.name }}</td>
              <td>{{ li.value }}</td>
            </tr>
          </table>
				</div>
        <!-- 脚本表格 -->
        <div v-show='stepModule[0]' class="hBasePublishLayerListDetails">
          <table>
            <tr v-for='(li, index) in showScriptListParams' :key='index'>
              <td>{{ li.name }}</td>
              <td :title = li.value class='script-list-params-overline'>{{ li.value }}</td>
            </tr>
          </table>
        </div>
        <!-- 脚本列表数据 -->
        <el-dialog title="选择脚本" :visible.sync="scriptDialogVisible" :show-close ="true"
          width="50%" center class='publish-service-hbase' :close-on-click-modal='false'>
          <el-table ref="scriptMultipleTable" :data="scriptDataList.data"            
            highlight-current-row
            class="published-services">
            <el-table-column width="30">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="scriptRadio" @change.native="scriptTableSelectionChange(scope.row)" :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="name" align='left' label="脚本名称" sortable></el-table-column>
            <el-table-column prop="describe" align='center' label="脚本描述" sortable></el-table-column>
            <el-table-column prop="createTime" align='center' label="更新时间" sortable></el-table-column>            
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-pagination
              background
              :current-page="scriptCurrentPage"
              @current-change="scriptCurrentChange"
              :page-size="scriptPageSize"
              :total="scriptTotal"
              layout="total, prev, pager, next">
            </el-pagination>
            <el-button type="primary" size="small" @click="scriptConfirm">确 定</el-button>
            <el-button size="small" @click="scriptDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <!--围栏表格-->
        <el-table v-show='stepModule[2] && isSetFence === "1"' :data="fenceSelections" border class='publish-service-fence-list' height = '500'>
          <el-table-column type="index" label="序号" align='left' width="50"></el-table-column>
          <el-table-column prop="gfName" label="围栏名称"></el-table-column>
          <el-table-column label="关注事件" align='center'>
            <template slot-scope="scope">
              <!-- <el-radio v-model="inOutFence[scope.$index]" label="0">进入</el-radio>
              <el-radio v-model="inOutFence[scope.$index]" label="1">离开</el-radio>
              <el-radio v-model="inOutFence[scope.$index]" label="2">全选</el-radio> -->
              <el-checkbox-group v-model="inOutFence[scope.$index]">
                <el-checkbox label="0">进入</el-checkbox>
                <el-checkbox label="1">离开</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column label="操作" align='center' width='100'>
            <template slot-scope="scope">
              <i class="el-icon-delete" @click='deleteFence(scope)'></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- 围栏列表数据 -->
        <el-dialog title="选择围栏" :visible.sync="fenceDialogVisible" :show-close ="true"
          width="50%" center class='publish-service-hbase' :close-on-click-modal='false' @close="selectDialogClose">
          <el-table ref="fenceMultipleTable" :data="fenceDataList"            
            highlight-current-row
            :row-key="getRowKyes"
            class="published-services"
            @selection-change="fenceSelectionChange">
            <el-table-column type="selection" width="55" :reserve-selection="true" :selectable='checkboxInit'></el-table-column>
            <el-table-column prop="gfName" label="围栏名称" sortable></el-table-column>          
            <el-table-column prop="gfDescribe" label="围栏描述" sortable></el-table-column>          
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-pagination
              background
              :current-page="fenceCurrentPage"
              @current-change="fenceCurrentChange"
              :page-size="fencePageSize"
              :total="fenceTotal"
              layout="total, prev, pager, next">
            </el-pagination>
            <el-button type="primary" size="small" @click="fenceConfirm">确 定</el-button>
            <el-button size="small" @click="selectDialogClose">取 消</el-button>
          </span>
        </el-dialog>
			</div>
    </div>
    <div class="publish-service-footer" v-show='isPublish[0]'>
			<el-button size="small" type="primary" @click="nextStep">下一步</el-button>
      <el-button size="small" @click="goBack">取消</el-button>
		</div>
    <div class="publish-service-footer" v-show='isPublish[1]'>
      <el-button size="small" @click="prevStep">上一步</el-button>
      <el-button size="small" type="primary" @click="nextStep">下一步</el-button>
      <el-button size="small" @click="goBack">取消</el-button>
    </div>
    <div class="publish-service-footer" v-show='isPublish[2]'>
			<el-button size="small" @click="prevStep">上一步</el-button>
      <el-button size="small" type="primary" @click="publishService">发布服务</el-button>
      <el-button size="small" @click="goBack">取消</el-button>
		</div>
		<div class="publish-service-footer" v-show='isPublish[3]'>
			<el-button type="primary" size="small" @click='goBack'>进入发布列表</el-button>
		</div>
   </div>
</template>

<script>
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import { getScriptList } from '../api/scriptApi';
import { publishRealTimeService, getGeoFenceList } from '../api/realTimeTaskApi';

export default {
  data() {
    // const validateLayerName = (rule, value, callback) => {
    //   // const patrn = /[\\/\\"<>\\?|\\*]/;
    //   const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
    //   const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
    //   const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
    //   if (regEn.test(value) || regCn.test(value)) {
    //       callback(new Error('图层名只能包含数字、中文、字母、下划线、短横线！'));
    //     } else if(!reStr.test(value)){
    //       callback(new Error('图层名必须以汉字或字母开头'));
    //     }else if(value.length > 100){
    //       callback(new Error('图层名长度范围0-100'));
    //     }else {
    //       callback();
    //   }
    // };
    const validateLayerName = (rule, value, callback) =>{
      const val = value.trim();
      this.ruleFormScript.describe = value.trim();
      if (val === '') {
        callback(new Error('请输入服务描述'));
      } else {
        callback();
      }
    }
    const validateLayerNumber = (rule,value,callback) =>{
      if (value <10 || value >20){
        callback(new Error('数据层级的范围是10-20'));
      }else{
        callback();
      }
    };
    const validateSourceId = (rule,value,callback) => {
      const regEnNum = /^[a-zA-Z0-9]+$/;
      if (!regEnNum.test(value)) {
        callback(new Error('数据源ID只能包含字母或数字！'))
      } else {
        callback();
      }
    };
    return {
      servicetype: [
        { name: '实时数据服务', value: '实时数据服务' },
      ],
      serviceType: '实时数据服务',
      stepModule: [true, false, false, false],
      active: 0,
      publishLoad: false, // 发布服务的loading
      isPublish: [true, false, false, false], // 判断是否已发布
      ruleFormScript: {
        describe: '',
        siddhi: '',
        sourceId: '',
        layerMinLevel: '10',
        iconId: '1',
      },
      rulesScript: {
        describe: [
          { required: true, message: '请输入服务描述', trigger: 'blur' },
          { max: 200, message: '服务描述长度不能超过200字符', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
        sourceId: [
          { required: true, message: '请输入数据源ID', trigger: 'blur' },
          { max: 10, message: '数据源ID长度不能超过10字符', trigger: 'blur' },
          { validator: validateSourceId, trigger:'blur'},
        ],
        layerMinLevel: [
          { required: true, message: '输入数据显示层级', trigger: 'blur' },
          { type: 'number', message: '层级必须为数字值',trigger:'blur'},
          { validator: validateLayerNumber,trigger:'blur'},
        ],
      },      
      tableDatas: [],
      checkedDataPath: '', // 选中的节点的路径
      serverType: '', // 服务器类型
      scriptDialogVisible: false, // 控制脚本弹框显隐
      scriptDataList: [], // 脚本列表
      scriptSelections: [], // 脚本选中的条目
      scriptRadio: null,
      scriptCurrentPage: 1, // 列表当前页数
      scriptPageSize: 10, // 列表每页条目数
      scriptTotal: 10, // 列表的总页数
      showScriptListParams: [],
      map: null,
      centerPoint: [], // 中心点经纬度
      fenceDialogVisible: false, // 控制围栏弹框显隐
      fenceDataList: [], // 围栏列表
      fenceSelections: [], // 围栏选中的条目
      isSetFence: "1", // 是否设置围栏
      fenceCurrentPage: 1, // 列表当前页数
      fencePageSize: 10, // 列表每页条目数
      fenceTotal: 10, // 列表的总页数
      inOutFence: [], // 设置围栏是进入还是离开
      currentFenceSelections: [],
      getRowKyes(row){
        return row.gfId;
      },
      iconList: [
        { name: '飞机', img: '../../static/images/1.png', id: '1'},
        { name: '舰船', img: '../../static/images/2.png', id: '2'},
        { name: '汽车', img: '../../static/images/3.png', id: '3'},
        { name: '人员', img: '../../static/images/4.png', id: '4'},
        { name: '其他', img: '../../static/images/5.png', id: '5'},
      ],
    };
  },  
  methods: {
    init() {
      this.active = 0;
      this.isPublish = [true, false, false, false];
      this.stepModule = [true, false, false, false];
      this.ruleFormScript = {
        describe: '',
        siddhi: '',
        sourceId: '',
        layerMinLevel: '10',
        iconId: '1',
      };
      this.fenceSelections = [];
      this.inOutFence = [];
      this.showScriptListParams = [];
      this.$refs['ruleFormScript'].resetFields();
    },
    // 选择数据
    showServerDirectory() {
      if (this.serviceType === '实时数据服务') {
        this.getScripts();
      } else {
        this.$message.warning({ message: '请选择数据源', showClose: true });
      }
    },
    // 获取脚本列表
    async getScripts() {
      this.publishLoad = true;
      this.scriptDialogVisible = true;
      this.scriptDataList = await getScriptList(this.scriptCurrentPage, this.scriptPageSize);
      this.scriptTotal = this.scriptDataList.total;
      this.publishLoad = false;
    },
    // 脚本列表页面切换
    scriptCurrentChange(val) {
      this.scriptCurrentPage = val;
      this.getScripts();
    },
    scriptTableSelectionChange(row) {
      this.scriptSelections = [];
      this.scriptSelections.push(row);
    },
    // 脚本选择确定
    scriptConfirm() {
      if (this.scriptSelections.length === 1) {
        this.scriptDialogVisible = false;
        this.showScriptListParams = [
          {name: '脚本名称', value: this.scriptSelections[0].name},
          {name: '脚本描述', value: this.scriptSelections[0].describe},
          {name: '脚本更新时间', value: this.scriptSelections[0].createTime},
        ];
        this.checkedDataPath = this.scriptSelections[0].name;
      } else if (this.scriptSelections.length > 1 ) {
        this.$message.warning({ message: '请选择一条数据!', showClose: true });
      } else if (this.scriptSelections.length < 1 ) {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的数据', showClose: true });
      }
      this.scriptRadio = null;
    },
    // 下一步
    nextStep() {
      if (!this.showScriptListParams.length) {
        this.$message.warning({ message: '请选择一条数据', showClose: true });
        return;
      }
      // 设置参数
      if (this.active === 0) {        
        this.isPublish = [false, true, false, false];
        this.stepModule = [false, true, false, false];
        this.setRealTimeParams();
      }
      // 设置围栏
      if (this.active === 1) {
        return this.checkParams();
      }
      // 发布完成
      if (this.active === 2) {
        this.isPublish = [false, false, false, true];
        this.stepModule = [false, false, false, true];
        this.active = 4;
      }
      this.active++;
    },
    // 检查参数
    checkParams() {
      this.$refs['ruleFormScript'].validate((valid) => {
        if (valid) {
          this.isPublish = [false, false, true, false];
          this.stepModule = [false, false, true, false];
          this.active++;
        } else {
          return false;
        }
      });
    },
    // 设置实时数据服务参数
    async setRealTimeParams() {
      this.ruleFormScript.describe = this.ruleFormScript.describe;
      this.ruleFormScript.sourceId = this.ruleFormScript.sourceId;
      this.ruleFormScript.layerMinLevel = '10';
      this.ruleFormScript.scriptName = this.scriptSelections[0].name;
      // 创建地图
      setTimeout(() => {
        if (this.map) { return }
        const raster = new TileLayer({
          source: new OSM(),
          extent: [-180, -90, 180, 90],
        });
        // 创建地图对象
        this.map = new Map({
          layers: [raster],
          target: 'centerWrap',
          view: new View({
            center: [116.3968849, 39.91855781],
            zoom: 3,
            projection: 'EPSG:4326',
            extent: [-180, -90, 180, 90],
          })
        });
        // 监听鼠标移动事件
        this.map.on("moveend", () => {
          let pixelRange = this.map.getSize();
          this.centerPoint = this.map.getCoordinateFromPixel([pixelRange[0] / 2, pixelRange[1] / 2]);
        });
      }, 100);
    },
    // 判断值是否可以勾选
    checkboxInit(row){
      const list = this.fenceSelections;
      if(list){
        let element;
        for (let i = 0; i < list.length; i += 1) {
          element = list[i].gfId;
          if (row.gfId === element) {
            return 0; // 不可勾选
          }
        }
        return 1; // 可勾选
      }
    },
    // 选择围栏数据
    async showFenceList() {
      const result = await getGeoFenceList(this.fenceCurrentPage, this.fencePageSize);
      this.fenceDataList = result.data;
      this.fenceTotal = result.total;
      this.fenceDialogVisible = true;
    },
    fenceSelectionChange(val) {
      this.currentFenceSelections = val;
    },
    // 围栏列表页面切换
    fenceCurrentChange(val) {
      this.fenceCurrentPage = val;
      this.showFenceList();
    },
    //关闭选择围栏页面
    selectDialogClose(){
      this.fenceDialogVisible = false;
      if(this.$refs.fenceMultipleTable){
        this.$refs.fenceMultipleTable.clearSelection();
        }
    },
    // 围栏选择确定
    fenceConfirm() {
      if (this.currentFenceSelections.length < 1 ) {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的围栏', showClose: true });
      } else {
        this.inOutFence = new Array(this.currentFenceSelections.length).fill([])
        this.currentFenceSelections.forEach((value) => {
          if (JSON.stringify(this.fenceSelections).indexOf(JSON.stringify(value))==-1) {
            this.fenceSelections.push(value)
          }
        })
        //this.fenceSelections = this.currentFenceSelections;
        this.fenceDialogVisible = false;
      }
    },
    //判断对象是否在数组中
    // 删除选中的围栏
    deleteFence(scope) 
    {
      this.$confirm('此操作将删除选中的围栏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {      
        this.inOutFence.splice(scope.$index, 1);
        this.fenceSelections.splice(scope.$index, 1);
        },).catch(() => {
      });
    },
    //判断数组中是否有空数组
    isArrayEmpty(inOutFenceList) {
      var isEmpty = false;
      inOutFenceList.forEach((val) => {
        if (val.length === 0) {
          isEmpty = true;  //含有空数组
        }
      })
      return isEmpty;
    },
    // 发布
    publishService() {
      // 对围栏进行判别
      let fenceList = [];
      if (this.isSetFence === "1" && this.fenceSelections.length < 1) {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的围栏', showClose: true });
        return;
      } else if (this.isSetFence === "1" && this.isArrayEmpty(this.inOutFence)) {
        this.$message.warning({ message: '请您选择围栏的关注事件', showClose: true });
        return;
      } else {
        if (this.inOutFence.length !== this.fenceSelections.length) {
          this.$message.warning({ message: '请选择全部围栏的关注事件', showClose: true });
           return;
        }
        this.inOutFence.forEach((res, index) => {
          fenceList.push({
            'gfId': this.fenceSelections[index].gfId,
            'gfInout': res.length === 2 ? 2 : Number(res),
          })
        });
        const realTimeParams = {
          gfInfos: fenceList,
          scriptId: this.scriptSelections[0].id,
          describe: this.ruleFormScript.describe,
          sourceId: this.ruleFormScript.sourceId,
          iconId: this.ruleFormScript.iconId,
          layerMinLevel: '10',
          initLon: this.centerPoint[0],
          initLat: this.centerPoint[1],
        };
        publishRealTimeService(realTimeParams).then(() => {
          this.nextStep();
          this.ruleFormScript = {
            describe: '',
            siddhi: '',
            sourceId: '',
            layerMinLevel: '10',
            iconId: '1',
          };
          this.showScriptListParams = [];
        });
      }        
    },
    // 上一步
    prevStep() {
      this.active--;
      this.isPublish = [false, false, false, false];
      this.stepModule = [false, false, false, false];
      this.isPublish[this.active] = true;
      this.stepModule[this.active] = true;
    },
    // 返回
    goBack() {
      this.active = 0;
      this.isPublish = [true, false, false, false];
      this.stepModule = [true, false, false, false];
      this.ruleFormScript = {
        describe: '',
        siddhi: '',
        sourceId: '',
        layerMinLevel: '10',
        iconId: '1',
      };
      this.fenceSelections = [];
      this.inOutFence = [];
      this.showScriptListParams = [];
      this.$refs['ruleFormScript'].resetFields();
      this.$emit('goBack');
    },
  },
};
</script>

<style lang="scss" scoped>
.publish-service-componment{
  .publish-service-title{
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
  .publish-service-select {
    height: 60px;
    padding-left: 25px;
    line-height: 60px;
    border-bottom: 1px solid #ecebeb;
    .el-select {
      width: 170px !important;
      margin-right: 20px;
    }
    .el-input--small .el-input__inner {
      height: 32px !important;
      line-height: 32px !important;
    }
  }
  .publish-service-main {
    padding-left: 155px;
    height: calc(100vh - 213px);
    overflow: hidden;    
    .el-table__body, .el-table__footer, .el-table__header {
      width: 100% !important;
    }
    .el-table th.is-left {
      padding-left: 0px !important;
    }
    >div {
      > img {
        margin: 20px 0px;
      }
    }
    .el-dialog__body {
      text-align: center;
      padding: 20px 20px 15px 20px;
    }
    .el-dialog__header {
      padding: 0px;
      background: #0c8bde;
      text-align: left;
      padding-left: 20px;
      line-height: 50px;
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
    .script-list-params-overline{
      width: calc(100vh - 410px);
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h1 {
      font-size: 36px;
      color: #24A5F8;
      i {
        color: #67c23a;
        margin-right: 16px;
        font-size: 27px !important;
      }
    }
    .publish-service-center-point {
      width: 55%;
      float: left;
      height: calc(100vh - 450px);
      overflow-y: auto;
      position: relative;
      h3 {
        color: #303133;
        font-weight: 700;
        padding: 5px 0px;
        margin-bottom: 8px;
      }
      .publish-service-center-point-map {
        width: 100%;
        height: calc(100vh - 500px);
        .publish-service-center-point-icon {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
    .publish-service-hbase {
      .el-dialog .el-table__body-wrapper {
        height: calc(100vh - 461px);
        overflow-y: auto;
        min-height: 284px;
      }
      .el-dialog__footer {
        padding: 0px 0px 15px 0px;
      }
      .dialog-footer {
        .el-button {
          vertical-align: bottom;
        }
      }
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
    .el-table .cell {
      line-height: 30px;
      font-size: 13px;
    }
    .tableDatas-success .el-table__body-wrapper {
      height: calc(100vh - 380px);
      overflow-y: auto; 
    }
    .el-form {
      width: 345px;
      height: calc(100vh - 325px);
      overflow-y: auto;
      float: left;
    }  
    .hBasePublishLayerListDetails {
      font-size: 14px;
      padding-top: 15px;
      tr td:first-of-type {
        width: 100px;
        color: #453e3e;
        font-weight: 700;
      }
      tr td {
        padding-top: 15px;
      }
    }
    .el-step__title.is-wait, .el-step__title.is-process, .el-step__title.is-success{
      margin-left: -12px;
    }
    .el-loading-spinner {
      top: 30%;
      margin-top: 0px;
      width: 65%;
      text-align: center;
      position: absolute;
    }
    .publish-data-level {
      .el-input {
        width: 125px !important;
      }
      .el-form-item__content {
        margin-left: 45px !important;
      }
    }
    .publishService-Params {
      width: 100%;
      .el-form-item__label{
        text-align: left;
        color: #303133;
        font-weight: 700;
      }
      .el-input {
        width: 225px;
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
    }
    .publish-layerGroups-result {
      color: #409EFF;
      line-height: 23px;
      
    }
    .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
      float: right;
      margin-right: 15px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .publish-service-select-fence {
      button {
        margin-top: 15px;
      }
    }
    .publish-service-fence-list {
      width: calc(50vw);
      margin-top: 20px;
      .el-icon-delete {
        color: #CC3333;
        font-size: 16px;
      }
    }
  }
  .el-step.is-horizontal .el-step__line {
    left: 50px;
    right: 20px;
  }
  .publish-service-footer {
    text-align: center;
    padding-right: 30%;
    padding-left: 155px;
  }
}
</style>
<style lang='scss'>
.publish-service-main {
  .publish-service-fence-list {
    .el-table__body-wrapper {
      height: auto;
    }    
  }
  .el-table td.is-center,
  .el-table th.is-center {
    padding-right: 0px;
  }
  .el-steps--horizontal {
    padding-left: 11px;
  }
}
</style>
