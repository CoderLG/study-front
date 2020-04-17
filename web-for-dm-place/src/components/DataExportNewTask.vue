<template>
  <div>
    <div class="new-data-export-task-title">
      <ul>
        <li @click="goBack">返回</li>
      </ul>
    </div>
    <div class="new-data-export-task-select">
      <span>数据类型：</span>
      <el-select v-model="currentData" size='small' placeholder="请选择" :disabled="stepModule > 0">
        <el-option v-for='(li, index) in dataType'
                   :key='index' :value='li.value' :label="li.name"></el-option>
      </el-select>
      <span>数据源：</span>
      <el-select v-model="currentSource" size='small' placeholder="请选择" :disabled="stepModule > 0"
       @change="tabDataSource">
        <el-option v-for='(li, index) in dataSourceType' :key='index'
                   :value='li.value' :label="li.name"></el-option>
      </el-select>
    </div>
    <div v-loading='createTaskLoad' class="new-data-export-task">
      <div class="new-data-export-task-main">
        <el-steps :active="stepModule" finish-status="success">
          <el-step title="选择数据"></el-step>
          <el-step title="设置参数"></el-step>
          <el-step title="创建完成"></el-step>
        </el-steps>
        <div>
          <div v-if='stepModule === 0'>
            <div style="margin-bottom: 10px;" v-if='currentSource === "GV MBTiles"'>
              <el-button type="primary" size="mini" @click="showDataDirectory('选择数据')">选择数据</el-button>
              <span :title='checkedDataRealPath' v-show='checkedDataRealPath' class='longdatapath-overline'>
                <span :title='serverPath'>根目录</span>
                {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
              </span>
              <span></span>
            </div>
            <div style="margin-bottom: 10px;" v-if='currentSource === "GV HBase"'>
              <!-- <el-button type="primary" size="mini" @click="checkHbaseSource">HBase数据源</el-button> -->
              <div class='hbase-position-style'>
                <span>HBase数据源</span>
              </div>
              <!-- <span v-if='hbaseSourceSelections[0]'>{{ hbaseSourceSelections[0].name }}</span> -->
              <span v-if='activeHBase !== false'> {{activeHBase}}</span>
              <span class = 'without-activate-Hbase' v-if='activeHBase === false'>{{'当前无可用HBase数据源'}}</span>
            </div>
            <div style="margin-bottom: 10px;" v-if='currentSource === "GV HBase"'>
              <el-button type="primary" size="mini" @click="checkHbase" :disabled='activeHBase === false'>&nbsp;&nbsp;&nbsp;&nbsp;选择数据&nbsp;&nbsp;&nbsp;</el-button>
              <span v-if='hbaseSelections[0]'>{{ hbaseSelections[0].layerName }}</span>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="showDataDirectory('存放位置')" v-if='currentSource === "GV HBase"' :disabled='activeHBase === false'>&nbsp;&nbsp;&nbsp;&nbsp;存放位置&nbsp;&nbsp;&nbsp;</el-button>
              <el-button type="primary" size="mini" @click="showDataDirectory('存放位置')" v-else>存放位置</el-button>
              <span :title='saveDataRealPath' class='longdatapath-overline' v-show='saveDataRealPath'>
                <span :title='serverPath'>根目录</span>
                {{ this.saveDataRealPath.slice(serverPath.length, this.saveDataRealPath.length) }}
              </span>
              <span></span>
            </div>
            <ServerDirectoryDialog ref='serverDirectoryDialog' :checkFolder='isCheckFolder' :rootUrl='rootUrl' @makeSure='checkedDataConfrim' :importExportType='importExportType'></ServerDirectoryDialog>
          </div>
          <div v-if='stepModule === 1'>
            <el-form :rules="rules" :model="dataFormSql" ref="dataFormSql" label-width="100px">
              <el-form-item class="task-name" label="任务名称" prop="name">
                <el-input v-model="dataFormSql.name" ></el-input>
              </el-form-item>
              <div class="params" v-if='hbaseSourceSelections[0]'>
                <label>HBase数据源</label>
                <span>{{ hbaseSourceSelections[0].name }}</span>
              </div>
              <div class="params">
                <label>基础影像数据</label>
                <span v-if='checkedDataPath' :title='checkedDataRealPath' class='longdatapath-overline'>
                  根目录{{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
                </span>
                <span v-else>{{ hbaseSelections[0].layerName }}</span>
              </div>
              <div class="params">
                <label>存放位置</label>
                <span :title='saveDataRealPath' class='longdatapath-overline' v-show='saveDataRealPath'>
                  根目录{{ this.saveDataRealPath.slice(serverPath.length, this.saveDataRealPath.length) }}
                </span>
              </div>
              <el-button size="small" type="primary" @click='addExtent'>添加范围</el-button>
              <el-table :data="levelAreaTable" border class='new-data-export-sub-task'>
                <el-table-column prop="levelRange" label="层级范围" width="100" align='left'></el-table-column>
                <el-table-column prop="rangeType" label="范围类型" width="100" align='center'></el-table-column>
                <el-table-column prop="rangeArea" label="范围区域"></el-table-column>
                <el-table-column label="操作" width="100" align='center'>
                  <template slot-scope="scope">
                    <el-button type="danger" plain size="small" @click='delectLevelArea(scope.$index)'>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </div>
          <div v-if='stepModule >= 2' style="margin-left: 14px;">
            <h1><i class="el-icon-success"></i>创建成功！</h1>
            <table>
              <tr v-for='(li, index) in tableDatas' :key='index'>
                <td class="table-head">{{ li.name }}</td>
                <td class="table-body" :title= 'li.value'>{{ li.value }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="new-data-export-task-footer">
        <el-button v-if="stepModule === 1" type="primary" size="small" @click="stepModule--">上一步</el-button>
        <el-button v-if="stepModule === 0" type="primary" size="small" @click="nextStep" :disabled='currentSource === "GV HBase" && activeHBase === false'>下一步</el-button>
        <el-button v-if="stepModule === 1" type="primary" size="small" @click="createNewTask">创建任务</el-button>
        <el-button v-if="stepModule >= 2" type="primary" size="small" @click="goBack">进入任务列表</el-button>
        <el-button v-if="stepModule < 2" size="small" @click="goBack">取消</el-button>
      </div>
      <!-- HBase数据源选择 -->
      <el-dialog title="选择数据源" :visible.sync="hbaseSourceDialogVisible" :show-close ="true"
        width="50%" center class='data-export-hbase' :close-on-click-modal='false'>
        <el-table ref="multipleTable" :data="hbaseSourceDataList"            
          highlight-current-row
          v-loading='hbaseLoading'>
          <el-table-column width="30">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="hbaseSourceRadio" @change.native="hbaseSourcetableSelectChange(scope.row)" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="address" label="数据源地址" align='center'></el-table-column>          
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="hbaseSourceConfirm">确 定</el-button>
          <el-button size="small" @click="hbaseSourceDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- HBase表数据选择 -->
      <el-dialog title="选择数据" :visible.sync="hbaseDialogVisible" :show-close ="true"
        width="50%" center class='data-export-hbase' :close-on-click-modal='false'>
        <div class='hbase-title'>
          <div class = 'hbase-title-content'>
            <span>HBase数据源>&nbsp;&nbsp;&nbsp; </span><span>{{ activeHBase }}</span>
          </div>
          <div class='hbase-title-search'>
            <el-input  
              placeholder="请输入内容"
              v-model="hbaseKeyWord" 
              clearable size="small">
            </el-input>
          </div>
        </div>
        <el-table 
          ref="multipleTable"  
          :data="hbaseDataList"             
          highlight-current-row
          v-loading='hbaseLoading'>
          <el-table-column width="30">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="hbaseRadio" @change.native="hbasetableSelectChange(scope.row)" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="名称"></el-table-column> -->
          <!-- <el-table-column prop="mimetype" label="瓦片格式" align='center'></el-table-column>
          <el-table-column prop="gridSet" label="瓦片集"></el-table-column>
          <el-table-column prop="levelarea" label="层级范围" width='120' align='center' sortable>
            <template slot-scope="scope">
              {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
            </template>
          </el-table-column> -->
          <el-table-column prop="layerName" label="名称"></el-table-column>
            <el-table-column prop="mimeType" label="瓦片格式" align='center'></el-table-column>
            <el-table-column prop="gridSet" label="瓦片集"></el-table-column>
            <el-table-column prop="levelarea" label="层级范围" width='120' align='center' sortable>
              <template slot-scope="scope">
                {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
              </template>
            </el-table-column> 
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-pagination
            background
            :current-page="hbaseCurrentPage"
            @current-change="hbaseCurrentChange"
            :page-size="hbasePageSize"
            :total="hbaseTotal"
            layout="total, prev, pager, next">
            </el-pagination>
          <el-button type="primary" size="small" @click="hbaseConfirm">确 定</el-button>
          <el-button size="small" @click="hbaseDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--添加范围-->
      <el-dialog title="添加范围" :visible.sync="dialogVisible">
        <div class="new-data-export-task-earth">
          <component v-bind:is="currentComponent" :isResetPlugin='true' :isSetBaseMap="true"
           :isShowBaseMapButton="true" ref="mapComponent"></component>
          <div class="new-data-export-task-input">
            <div class="search search-group">
              <el-form :model="formData" label-position="left" ref="searchForm">
                <div class="form-item">
                  <el-row>
                    <el-col :span="6">
                      层级范围
                    </el-col>
                    <el-col :span="7" class="value">
                      <el-select v-model="formData.minLevel" placeholder="请选择">
                        <el-option v-for="(item, index) in levelOptions" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="3" class="value"> &nbsp;&nbsp;&nbsp;到</el-col>
                    <el-col :span="7" class="value">
                      <el-select v-model="formData.maxLevel" placeholder="请选择">
                        <el-option v-for="(item, index) in levelOptions" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </div>
                <div class="form-item change-button">
                  <el-row>
                    <el-col :span="6">
                      区域范围
                    </el-col>
                    <el-col :span="18" class="value">
                      <el-button-group>
                        <el-button size="small" @click="changeAreaType('draw')"
                                   :class="{'is-active': isShowAreaType.draw}">地图绘制</el-button>
                        <el-button size="small" @click="changeAreaType('shp')"
                                   :class="{'is-active': isShowAreaType.shp}">全部范围</el-button>
                      </el-button-group>
                    </el-col>
                  </el-row>
                </div>
                <div class="form-item" v-show="isShowAreaType.draw">
                  <el-row>
                    <el-col :span="18" :offset="6" class="value">
                      <el-tooltip placement="top" effect="light">
                        <div slot="content">单击鼠标左键,移动光<br/>标确定矩形范围,再次<br/>单击鼠标左键完成绘制.</div>
                        <el-button size="small" class="draw rectangle" @click="drawing('Circle')">
                          矩形
                        </el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </div>
                <div class="form-item" v-show="isShowAreaType.shp">
                  <el-row>
                    <el-col :offset="6" class="value">
                      所选层级全部数据
                    </el-col>
                  </el-row>
                </div>
                <el-form-item size="small" class="search-buttons">
                  <el-button type="primary" @click="makeSureArea">确定</el-button>
                  <el-button @click= "addExtentGoBack">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import proj from 'ol/proj';
import OpenLayersComponent from './OpenLayersComponent';
import ServerDirectoryDialog from './ServerDirectoryDialog';
import { getServerType, getServerPath } from '../api/fileApi';
import { addDataExportTask, getHbaseDataSourceList } from '../api/tileCacheApi';
import { getMbtilesDataInfo, getHbaseLayerList } from '../api/imageApi';
import { getHbaseSourceList } from '../api/serviceApi';

export default {
  components: {
    'openLayersComponent': OpenLayersComponent,
    ServerDirectoryDialog,
  },
  data() {
    const validateLayerName = (rule, value, callback) => {
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
        callback(new Error('任务名只能包含数字、中文、字母、下划线、短横线！'));
      } else if(!reStr.test(value)){
        callback(new Error('任务名必须以汉字或字母开头'));
      } else if(value.length > 50){
        callback(new Error('任务名长度不能超过50字符'));
      } else {
        callback();
      }
    };
    return {
      scanLoading: false,
      fileType:[],
      directoryTitle: null,//文件选择框标题
      checkedDataPath:null,//服务器数据路径
      checkedDataRealPath:'',//服务器数据真实路径
      saveDataPath: null,//服务器保存路径
      saveDataRealPath: null,//服务器保存路径
      isCheckFolder: true, // 是否需要勾选文件夹
      rootUrl: 'null',
      dataType: [
        { name: '基础影像数据', value: '基础影像数据' },
      ],
      currentData: '基础影像数据',//当前数据类型
      dataSourceType: [
        { name: 'GV MBTiles', value: 'GV MBTiles' },
        { name: 'GV HBase', value: 'GV HBase' },
      ],
      currentSource: 'GV MBTiles',//当前数据源
      dialogVisible: false,// 控制范围选择显隐
      currentComponent: null,// 当前动态组件
      stepModule: 0,//第几步操作
      dataFormSql: {},//参数表格数据
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          // { max: 50, message: '任务名长度不能超过50字符', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
      },
      isShowAreaType: { draw: false },
      formData: {
        minLevel: null,
        maxLevel: null,
        gfData: null,
      },// 新增范围的表数据
      tableDatas: [],//创建后任务数据
      activeHBase: '', //当前启动的集群的名字
      typeValue: 'image', // 用于区分数据类型
      createTaskLoad: false, // 创建任务时的loading
      hbaseDataList: [],// habse数据列表
      hbaseSourceDataList: [],// habse数据源列表
      hbaseSelections: [],// 选中的habse数据
      hbaseSourceSelections: [],// 选中的habse数据源
      hbaseRadio: null,
      hbaseSourceRadio: null,
      hbaseDialogVisible: false,// habse列表弹框
      hbaseSourceDialogVisible: false,// habse数据源列表弹框
      hbaseLoading: false,// habseloading
      serverType: '', // 服务器类型
      rangeArea: '',// 区域范围值
      levelAreaTable: [],// 选择的区域数据表格
      levelAreaParams: [],// 选择的区域 发布的参数
      importExportType: '1',// 用于数据的导入导出
      levelOptions: [],// 数据解析出来的层级范围数组
      serverPath: '',
      dataExtent: [],
      hbaseData: {}, //包括hbase列表，以及总数
      hbaseCurrentPage: 1,
      hbasePageSize: 10,
      hbaseTotal: 10,
      hbaseKeyWord: '', //搜索hbase列表的关键词
    };
  },
  props: {
    isNewButton: {
      type: Boolean,
    },
  },
  created(){
    this.init();
  },
  async mounted() {
    this.serverType = await getServerType();
    this.serverPath = await getServerPath();
  },
  watch:{
    isNewButton() {
      this.stepModule = 0; //当点击新建按钮时，回到第一步；
      this.checkedDataPath = '';
      this.checkedDataRealPath = '';
      this.saveDataPath = '';
      this.saveDataRealPath = '';
      this.hbaseSelections = [];
      this.hbaseSourceSelections = [];
      this.currentSource = "GV MBTiles";
    },
    async hbaseKeyWord() {
      this.publishLoad = true;
      this.hbaseData = await getHbaseLayerList(this.hbaseKeyWord,1,this.hbasePageSize);
      this.publishLoad = false;
      this.hbaseDataList = this.hbaseData.metaList; //hbase列表
      this.hbaseTotal = this.hbaseData.total; //hbase总数
    }
  },
   methods: {
    // 初始化
    init(){
      this.stepModule = 0;
      this.dataFormSql = {
        name: '',
      };
      this.checkedDataPath = null;
      this.checkedDataRealPath = '';
      this.saveDataPath = null;
      this.saveDataRealPath = '';
    },
    // 切换数据源
    async tabDataSource() {
      this.checkedDataPath = null;
      this.checkedDataRealPath = '';
      this.saveDataPath = null;
      this.saveDataRealPath = '';
      this.hbaseSelections = [];
      this.hbaseSourceSelections = [];
      if (this.currentSource === 'GV HBase' ) {
        this.activeHBase = await this.getActiveDataSource();
      }
    },
    //退出添加范围界面
    addExtentGoBack(){
      this.dialogVisible = false;
      this.isShowAreaType = { 
        draw: false, 
        shp: false,
      };
    },
    // 选择hbase数据源
    async checkHbaseSource() {
      this.hbaseLoading = true;
      this.hbaseSourceDialogVisible = true;
      this.hbaseSourceSelections = [];
      this.hbaseSourceRadio = null;
      this.hbaseSourceDataList = await getHbaseDataSourceList(1, 1000, 1);
      this.hbaseSourceDataList = this.hbaseSourceDataList.items;
      this.hbaseLoading = false;
    },
    //点击页码，进入新的页码
    async hbaseCurrentChange(val) {
      this.hbaseRadio = null; //清空选择项
      this.hbaseSelections = [];
      this.hbaseCurrentPage = val;
      this.publishLoad = true;
      this.hbaseData = await getHbaseLayerList(this.hbaseKeyWord,val,this.hbasePageSize);
      this.publishLoad = false;
      this.hbaseDataList = this.hbaseData.metaList; //hbase列表
      this.hbaseTotal = this.hbaseData.total; //hbase总数
    },
    // 选择hbase数据
    async checkHbase() {
      // if (!this.hbaseSourceSelections[0]) {
      //   this.$message.warning({ message: '请先选择数据源', showClose: true });
      //   return;
      // }
      this.hbaseLoading = true;
      this.hbaseDialogVisible = true;
      this.hbaseSelections = [];
      this.hbaseRadio = null;
      // this.hbaseDataList = await getHbaseTablesList(this.hbaseSourceSelections[0].id);
      this.hbaseData = await getHbaseLayerList(this.hbaseKeyWord,1,this.hbasePageSize)
      // this.hbaseDataList = this.hbaseDataList.items;
      this.hbaseDataList = this.hbaseData.metaList; //hbase列表
      this.hbaseTotal = this.hbaseData.total; //hbase总数
      this.hbaseLoading = false;
    },
    // hbase数据源选择
    hbaseSourcetableSelectChange(row) {
      this.hbaseSourceSelections = [];
      this.hbaseSourceSelections.push(row);
    },
    //获取启动的集群名称，节点，端口号
    async getActiveDataSource() {
      var activeCluster = false;
      var hosts = [];  //集群中的节点列表
      var name = '';  //集群的名字
      var hostsList = []; //集群中节点的名字列表
      var port = ''; //集群的端口号
      await getHbaseSourceList().then((cluster) => {
        cluster.forEach(element => {
          if (element.active === true) {
            name = element.name;
            hosts = element.hosts;
            hosts.forEach((host) => {
              hostsList.push(host['host'])
            })
            port = element.port;
            activeCluster = name + '（' + hostsList.join(",") + ':' + port + '）'
          }
        });           
      }).catch(() => {
        activeCluster = false;
      });
      return activeCluster;
    },
    // hbase表选择
    hbasetableSelectChange(row) {
      this.hbaseSelections = [];
      this.hbaseSelections.push(row);
    },
    // HBase数据源确定
    async hbaseSourceConfirm() {
      if (this.hbaseSourceSelections.length === 1) {
        this.hbaseSourceDialogVisible = false;
      } else if (this.hbaseSourceSelections.length > 1 ) {
        this.$message.warning({ message: '请选择一条数据!', showClose: true });
      } else if (this.hbaseSourceSelections.length < 1 ) {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的数据', showClose: true });
      }
    },
    // HBase确定
    async hbaseConfirm() {
      if (this.hbaseSelections.length === 1) {
        this.hbaseDialogVisible = false;
        this.dataExtent = [this.hbaseSelections[0].lonBegin, this.hbaseSelections[0].latBegin, this.hbaseSelections[0].lonEnd, this.hbaseSelections[0].latEnd];
        // 限制用户所选的层级 待hbase模块理清楚再具体给值
        const f = length => Array.from({length}).map((v, k) => k)
        this.levelOptions = f(Number(this.hbaseSelections[0].maxLevel) + 1);
        this.levelOptions = this.levelOptions.slice(this.hbaseSelections[0].minLevel, this.levelOptions.length);
        if (this.hbaseSelections[0].gridSet == 'EPSG:3857') {
          let minXY = [this.hbaseSelections[0].minX, this.hbaseSelections[0].minY];
          minXY = proj.transform(minXY, 'EPSG:3857', 'EPSG:4326');
          let maxXY = [this.hbaseSelections[0].maxX, this.hbaseSelections[0].maxY];
          maxXY = proj.transform(maxXY, 'EPSG:3857', 'EPSG:4326');
          this.dataExtent = [minXY[0], minXY[1], maxXY[0], maxXY[1]];
        } else {
          this.dataExtent = [this.hbaseSelections[0].minX, this.hbaseSelections[0].minY, this.hbaseSelections[0].maxX, this.hbaseSelections[0].maxY];
        }
      } else if (this.hbaseSelections.length > 1 ) {
        this.$message.warning({ message: '请选择一条数据!', showClose: true });
      } else if (this.hbaseSelections.length < 1 ) {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的数据', showClose: true });
      }
    },
    // 判断系统环境
    buildName() {
      let checkedDataPath = this.checkedDataPath;
      if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        checkedDataPath = checkedDataPath.split('\\')[checkedDataPath.split('\\').length - 1];
      }
      const lastIndex = checkedDataPath.lastIndexOf('/');
      const pointIndex = checkedDataPath.lastIndexOf('.');
      if(pointIndex > 0 && pointIndex > lastIndex ) {
        this.dataFormSql.name = checkedDataPath.substring(lastIndex + 1, pointIndex);
      } else {
        this.dataFormSql.name = checkedDataPath.substring(lastIndex + 1, this.checkedDataPath.length);
      }
     },
    // 下一步
    async nextStep() {
      // if (this.currentSource === 'GV HBase' && this.hbaseSourceSelections.length < 1 ) {
      //   this.$message.warning({ message: '请选择数据源', showClose: true });
      //   return;
      // }
      if (!this.checkedDataPath && (!this.hbaseSelections[0] || !this.hbaseSelections[0].layerName)) {
        this.$message.warning({ message: '请选择数据', showClose: true });
        return;
      }
      if(!this.saveDataPath) {
        this.$message.warning({ message: '请选择存放位置', showClose: true });
        return;
      }
      if (this.currentSource === "GV HBase") {
        this.dataFormSql.name = this.hbaseSelections[0].layerName;
      }
      if (this.checkedDataPath) {
        this.buildName();
      }      
      this.stepModule ++;
    },
    // 选择数据
    showDataDirectory(title) {
      this.directoryTitle = title;
      if (title === '选择数据') {
        this.importExportType = '1';
        // this.fileType = ['tif'];
        if(this.currentSource === 'TIF 文件') {
          this.isCheckFolder = false;
        } else {
          this.isCheckFolder = true;
        }
      } else {
        this.importExportType = '2';
        // this.fileType = [null];
        this.isCheckFolder = true;
      }
      this.$refs.serverDirectoryDialog.checkTargetFile = true;
    },
    // 确认选中的文件
    checkedDataConfrim(data){
      if (this.currentSource === 'GV MBTiles' && data.type === 'file') {
        this.$message.warning({ message: '请选择文件夹类型', showClose: true });
        return;
      }
      if (this.directoryTitle === '选择数据') {
        // 解析数据信息 设置参数的范围(日后有新增数据源这里要进行修改 判断不同数据源)
        if (this.currentSource === 'GV MBTiles') {
          getMbtilesDataInfo(data.path).then(res => {
            if (res.gridSet == 'EPSG:3857') {
              let minXY = [res.minX, res.minY];
              minXY = proj.transform(minXY, 'EPSG:3857', 'EPSG:4326');
              let maxXY = [res.maxX, res.maxY];
              maxXY = proj.transform(maxXY, 'EPSG:3857', 'EPSG:4326');
              this.dataExtent = [minXY[0], minXY[1], maxXY[0], maxXY[1]];
            } else {
              this.dataExtent = [res.minX, res.minY, res.maxX, res.maxY];
            }
            // 限制用户所选的层级
            const f = length => Array.from({length}).map((v, k) => k)
            this.levelOptions = f(Number(res.maxLevel) + 1);
            this.levelOptions = this.levelOptions.slice(res.minLevel, this.levelOptions.length);
            this.checkedDataPath = data.path;
            this.checkedDataRealPath = data.fileRealPath;
          }).catch(() => {
            return;
          });
        }
      } else {
        this.saveDataPath = data.path;
        this.saveDataRealPath = data.fileRealPath;
      }
      this.$refs.serverDirectoryDialog.checkTargetFile = false;
    },
    // 添加范围
    addExtent() {
      this.dialogVisible = true;
      this.currentComponent = "openLayersComponent";
      this.formData = {
        minLevel: null,
        maxLevel: null,
        gfData: null,
      };
      setTimeout(() => {
        this.$refs.mapComponent.flyTo(this.dataExtent);
        this.$refs.mapComponent.drawPloygon(this.dataExtent[0], this.dataExtent[1], this.dataExtent[2], this.dataExtent[3]);
      }, 500)
    },
    /**
     * 更换查询范围类型
     * @param type：lonLat经纬度，area行政区，draw底图绘制，shpSHP上传
    */
    changeAreaType(type) {
      if (type === 'shp') {
        var minX = this.dataExtent[0];
        var minY = this.dataExtent[1];
        var maxX = this.dataExtent[2];
        var maxY = this.dataExtent[3];
        var lonLat1 = minX + ' ' + maxY;
        var lonLat2 = maxX + ' ' + maxY;
        var lonLat3 = maxX + ' ' + minY;
        var lonLat4 = minX + ' ' + minY;
        //this.rangeArea = '-180 90,180 90,180 -90,-180 -90';
        this.rangeArea = lonLat1 + ',' + lonLat2 + ',' + lonLat3 + ',' + lonLat4;
        this.formData.latBegin = minY;
        this.formData.latEnd = maxY;
        this.formData.lonBegin = minX;
        this.formData.lonEnd = maxX;
        // this.formData.latBegin = -90;
        // this.formData.latEnd = 90;
        // this.formData.lonBegin = -180;
        // this.formData.lonEnd = 180;
      }
      this.isShowAreaType = {};
      this.isShowAreaType[type] = true;
      if(type !== 'draw'){
        this.$refs.mapComponent.clearDraw();
      }
    },
    /**
     * 绘制图形
     * @param type:Circle矩形，Polygon多边形
     */
    drawing(type) {
      this.$refs.mapComponent.drawing(type, (wkt) => {
        this.rangeArea = wkt.slice(9, wkt.length - 2).slice(0, wkt.slice(9, wkt.length - 2).lastIndexOf(','));
        const pointArr = wkt.slice(9, wkt.length - 2).split(',');
        this.formData.latBegin = pointArr[0].split(' ')[1];
        this.formData.latEnd = pointArr[2].split(' ')[1];
        this.formData.lonBegin = pointArr[0].split(' ')[0];
        this.formData.lonEnd = pointArr[2].split(' ')[0];
      });
    },
    // 确认区域范围
    makeSureArea() {
      if (this.formData.minLevel === null || this.formData.maxLevel === null || (parseInt(this.formData.minLevel) > parseInt(this.formData.maxLevel))) {
        this.$message.warning({ message: '请填写完整且正确的层级范围', showClose: true });
        return;
      } else if (!this.formData.latBegin || !this.formData.latEnd || !this.formData.lonBegin || !this.formData.lonEnd) {
        this.$message.warning({ message: '请选择区域', showClose: true });
        return;
      } else {
         if(!this.isExistLevels(this.formData.minLevel,this.formData.maxLevel,this.levelAreaTable)){
           this.levelAreaTable.push({
          levelRange: `${this.formData.minLevel} - ${this.formData.maxLevel}`,
          rangeType: '经纬度',
          rangeArea: this.rangeArea,
        });
        this.levelAreaParams.push({
          latBegin: this.formData.latBegin,
          latEnd: this.formData.latEnd,
          maxLevel: this.formData.maxLevel,
          minLevel: this.formData.minLevel,
          lonBegin: this.formData.lonBegin,
          lonEnd: this.formData.lonEnd,
        });
        this.dialogVisible = false;
        this.$message.success({ message: '添加范围成功', showClose: true });
      }else{
        this.$message.warning({ message: '添加层级范围有重叠,请重新选择',showClose: true});
      }
      this.isShowAreaType = { 
              draw: false, 
              shp: false,
            };
         }
        
    },
    //判断层级范围是否已被选中
    isExistLevels(minLevel, maxLevel, levelTable) {
      let levels;
      let min;  //层级范围中已存在的最小层级
      let max; //层级范围中已存在的最大层级范围
      let isRep = 0;  //判断是否有重复
      let minlevel = parseInt(minLevel);  //用户当前已选的较小层级
      let maxlevel = parseInt(maxLevel);  //用户当前已选的较大层级
      levelTable.forEach((obj) => {
        levels = obj.levelRange.split(" - ");
        min = parseInt(levels[0]);
        max = parseInt(levels[1]);
        if (this.IsIntersection([minlevel,maxlevel],[min,max])) {
          isRep = isRep + 1;
        }
      }) 
      //层级范围无重叠，返回0,可以添加层级
      return isRep;
    },
    // 删除已添加的区域
    delectLevelArea(index) {
      this.levelAreaTable.splice(index, 1);
      this.levelAreaParams.splice(index, 1);
    },
    //判断两个数组是否有重叠
    IsIntersection(array1,array2) {
      var min1 = array1[0];
      var min2 = array2[0];
      var max1 = array1[1];
      var max2 = array2[1];
      if (max2 < min1 || max1 < min2) {
        return false; //不存在交集
      } else {
        return true; //存在交集
      }
    },
    // 创建任务
    createNewTask(){
      this.$refs['dataFormSql'].validate((valid) => {
        if (this.levelAreaTable.length === 0) {
          this.$message.warning({ message: '请添加范围', showClose: true });
          return;
        }
        if (valid) {
          this.createTaskLoad = true;
          let params;
          if (this.checkedDataPath) {
            params = {
              mbtilePath: this.checkedDataPath,
              name: this.dataFormSql.name,
              outputPath: this.saveDataPath,
              subTasks: this.levelAreaParams,
            };
          } else {
            // console.log(this.hbaseSourceSelections[0])
            params = {
              // dataSourceName: this.hbaseSourceSelections[0] ? this.hbaseSourceSelections[0].tableName : null,
              hbaseTableName: this.hbaseSelections[0] ? this.hbaseSelections[0].layerName : null,
              name: this.dataFormSql.name,
              outputPath: this.saveDataPath,
              subTasks: this.levelAreaParams,
            };
          }
          addDataExportTask(params).then(() => {
            this.tableDatas = [
              {name:'任务名称', value: this.dataFormSql.name},
              {name:'基础影像数据', value: this.checkedDataPath ? `根目录${this.checkedDataRealPath.slice(this.serverPath.length, this.checkedDataRealPath.length)}` : this.hbaseSelections[0].layerName },
              {name:'存放位置', value: `根目录${this.saveDataRealPath.slice(this.serverPath.length, this.saveDataRealPath.length)}` },
            ];
            this.stepModule = 3;
            this.createTaskLoad = false;
          }).catch(() => {
            this.createTaskLoad = false;
          });
        } else {
          return false;
        }
      });
    },
    // 返回
    goBack() {
      this.$emit('goBack');
      this.levelAreaTable = [];
      this.stepModule = 0;
      this.checkedDataPath = null;//服务器数据路径
      this.checkedDataRealPath = '';
      this.saveDataPath = null;//服务器保存路径
      this.saveDataRealPath = '';
      this.hbaseSelections = [];// 选中的habse数据
      this.hbaseSourceSelections = [];// 选中的habse数据源
      this.levelAreaParams = [];// 子任务数据范围
      this.formData = {
        minLevel: null,
        maxLevel: null,
        gfData: null,
      };
    },
  },
};
</script>

<style lang="scss">
  .new-data-export-task-title {
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
  .hbase-position-style {
      float: left;
      background: #dcdfe6;
      border-radius: 3px;
      margin-right: 3px;
      span {
        font-size: 12px;
        margin: 16px;
        font-weight: 700;
        color: white;
      }
    }
  .new-data-export-task-select {
    height: 60px;
    padding-left: 25px;
    line-height: 60px;
    border-bottom: 1px solid #ecebeb;
    .el-select {
      width: 160px !important;
      margin-right: 20px;
    }
    .el-input--small .el-input__inner {
      height: 32px !important;
      line-height: 32px !important;
    }
  }
  .new-data-export-task {
    .el-dialog__header {
      padding: 0px;
      background: #0c8bde;
      text-align: left;
      padding-left: 20px;
      line-height: 50px;
    }
    .data-export-hbase {
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
      .hbase-title {
        font-size: 16px;
        text-align: left;
        margin-left: 12px;
        margin-bottom: 10px;
        .hbase-title-content {
          float: left;
          width: 70%;
        }
        .hbase-title-search {
          float: right;
          width: 30%;
          padding-left: 10px;
        }
      }
    }
    .without-activate-Hbase {
      color:red;
      font-size:12px;
    }
  }
  .longdatapath-overline{
    width: calc(100% - 118px);
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  .new-data-export-task-main {
    padding-left: 155px;
    padding-right: 20%;
    height: calc(100vh - 213px);
    overflow: hidden;
    >div {
      > img {
        margin: 20px 0px;
      }
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
    h1 {
      font-size: 36px;
      color: #24A5F8;
      i {
        color: #67c23a;
        margin-right: 16px;
        font-size: 27px !important;
      }
    }
    .el-steps--horizontal {
      width: calc((100vw / 100 * 60) - 200px);
      margin: 20px 0px 20px 0px;;
    }
    .new-data-export-sub-task {
      margin-top: 30px;
      .el-table__body-wrapper {
        max-height: calc(100vh - 615px);
        height: auto;
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
      left: 70px;
      right: 20px;
    }
    .el-step__head {
      padding-left: 15px;
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
      height: calc(100vh - 316px);
      overflow-y: auto;
      margin-left: 14px;
      .el-form-item{
        margin-bottom: 15px;
      }
      .el-form-item__label{
        text-align: left;
        color: #303133;
        font-weight: 700
      }
    }
    .table-head{
      padding-top: 15px;
      width: 100px;
      color: #453e3e;
      font-weight: 700;
      font-size: 14px;
    }
    .table-body{
      padding-top: 15px;
      font-size: 14px;
      width: 600px;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .new-data-export-task-footer {
    width: calc((100vw / 100 * 60) - 30px);
    text-align: center;
    padding-left: 155px;
  }
  .new-data-export-task-earth {
    position: relative;
    width: 100%;
    height: 500px;
    .new-data-export-task-input {
      position: absolute;
      top: 0px;
      bottom: -1px;
      left: 0px;
      width: 300px;
      background-color: #ffffff;
      .search {
        position: absolute;
        width: 100%;
        .search-buttons {
          text-align: center;
          margin-top: 20px;
        }
        .change-button {
          .el-button{
            width: 87px;
            height: 32px;
            padding: 0px;
            font-size: 14px;
          }
        }
        .form-item {
          margin-top: 20px;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          .el-row{
            line-height: 32px;
          }
          .value {
            font-weight: normal;
            color: #646464;
          }
          .is-active{
            color: #409EFF;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
          }
          .time {
            .el-date-editor--daterange{
              width:100%;
            }
            .el-range-input,.el-range-separator{
              font-size: 12px;
            }
            .el-icon-date, .el-range-separator{
              line-height: 22px;
            }
          }
          .shp-name{
            font-weight: normal;
            color: #409EFF;
          }
        }
        .draw {
          width: 100px;
          background-size:13px 12px;
          background-repeat:no-repeat;
        }
        .rectangle {
          padding-left: 35px;
          background-position: 29px 10px;
          background-image: url('../assets/rectangle.png');
          &:hover,&:active,&:focus{
            background-image: url('../assets/rectangle-hover.png');
          }
        }
        .polygon {
          padding-left: 29px;
          background-position: 20px 10px;
          background-image: url('../assets/polygon.png');
          &:hover,&:active,&:focus{
            background-image: url('../assets/polygon-hover.png');
          }
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .data-level{
    .el-input {
      width: 125px;
    }
  }
  .task-name{
    .el-form-item__content{
      width: 290px;
    }
    .el-form-item__label:before{
      float: right;
      margin-right: 24px !important;
    }
  }
  .params{
    height: 40px;
    margin-bottom: 15px;
    font-size: 14px;
    label{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 100px;
      padding-right: 12px;
      text-align: left;
      color: #303133;
      font-weight: 700
    }
  }
  .directory-file {
    padding-left: 15px;
  }
</style>
