<template>
  <div>
    <div class="new-task-title">
      <ul>
        <li @click="goBack">返回</li>
      </ul>
    </div>
    <div class="new-task-select">
      <span>数据类型：</span>
      <el-select v-model="currentData" size='small' @change="changeCurrentData" placeholder="请选择" :disabled="stepModule > 0">
        <el-option v-for='(li, index) in dataType'
                   :key='index' :value='li.value' :label="li.name"></el-option>
      </el-select>
      <span>数据源：</span>
      <el-select v-model="currentSource" size='small' placeholder="请选择" :disabled="stepModule > 0 || createTaskLoad" @change="tabDataSource">
        <el-option v-for='(li, index) in dataSourceType' :key='index'
                   :value='li.value' :label="li.name"></el-option>
      </el-select>
      <span>瓦片存储：</span>
      <el-select v-model="currentTile" size='small' placeholder="请选择" :disabled="stepModule > 0 || createTaskLoad" @change='tabTileType'>
        <el-option v-for='(li, index) in tileType' :key='index'
                   :value='li.value' :label="li.name"></el-option>
      </el-select>
    </div>
    <div v-loading='createTaskLoad' element-loading-text="拼命加载中">
      <div class="new-task-main">
        <el-steps :active="stepModule" finish-status="success">
          <el-step title="选择数据"></el-step>
          <el-step title="设置参数"></el-step>
          <el-step title="创建完成"></el-step>
        </el-steps>
        <div>
          <div v-if='stepModule === 0'>
            <div style="margin-bottom: 10px;">
              <el-button type="primary" size="mini" @click="showDataDirectory('选择数据')">选择数据</el-button>
              <span :title='checkedDataRealPath' class='long-text-style' v-show='checkedDataRealPath'>
                <span :title='serverPath'>根目录</span>
                {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
              </span>
              <span></span>
            </div>
            <div>
              <el-button type="primary" v-if='currentTile != "hbase"' size="mini" @click="showDataDirectory('存放位置')">存放位置</el-button>
              <div class = 'save-position-style'> 
                <span  v-if='currentTile === "hbase"' >存放位置</span>
              </div>
              <span class = 'has-activate-Hbase' v-if='currentTile === "hbase" && activeHBase != false'>{{activeHBase}}</span>
              <span class = 'without-activate-Hbase' v-if='currentTile === "hbase" && activeHBase === false'>{{'当前无可用HBase数据源'}}</span>
              <span v-if='currentTile != "hbase"' :title='saveDataRealPath' class='long-text-style' v-show='saveDataRealPath'>
                <span :title='serverPath'>根目录</span>
                {{ this.saveDataRealPath.slice(serverPath.length, this.saveDataRealPath.length) }}
              </span>
              <span></span>
            </div>
            <div v-if='currentData === "timeTif"' class="new-task-prompt">
              <p><i class="el-icon-bell"></i>提示</p>
              <ul>
                <li>1. 在服务器目录中勾选包含时序影像数据的文件夹，点击确定。</li>
                <li>2. 时序影像数据文件夹内应包含多个按时间划分的子文件夹，命名格式为yyyy_mm_dd。如2017_12_13。</li>
                <li>3. 每个时间子文件夹内应包含1个或多个影像数据TIF文件。</li>
              </ul>
            </div>
            <ServerDirectoryDialog ref='serverDirectoryDialog' :fileType="fileType" :checkFolder='isCheckFolder' :rootUrl='rootUrl' @makeSure='checkedDataConfrim' :importExportType='importExportType'></ServerDirectoryDialog>
          </div>
          <div v-if='stepModule === 1'>
            <el-form :rules="rules" :model="dataFormSql" ref="dataFormSql" label-width="100px">
              <el-form-item class="task-name" label="任务名称" prop="taskName">
                <el-input v-model="dataFormSql.taskName" ></el-input>
              </el-form-item>
              <div class="params">
                <label>{{translate(currentData)}}</label>
                <span :title='checkedDataRealPath' v-show='checkedDataRealPath'>
                  根目录{{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
                </span>
              </div>
              <div class="params">
                <label>存放位置</label>
                <span v-if='currentTile != "hbase"' :title='saveDataRealPath' v-show='saveDataRealPath'>
                  根目录{{ this.saveDataRealPath.slice(serverPath.length, this.saveDataRealPath.length) }}
                </span>
                <span v-if='currentTile === "hbase"' >{{activeHBase}}</span>
              </div>
              <el-form-item label="瓦片格式" prop="mimeType">
                <el-radio-group v-model="dataFormSql.mimeType" @change="getLevelByGridSet">
                  <el-radio v-if="currentData === 'tif' || currentData === 'timeTif'" label="png">PNG</el-radio>
                  <el-radio v-if="currentData === 'tif' || currentData === 'timeTif'" label="jpeg">JPEG</el-radio>
                  <el-radio v-if="currentData === 'tif'" label="tif">TIFF</el-radio>
                  <el-radio v-if="currentData === 'dem'" label="terrain">TERRAIN(heightmap)</el-radio>
                  <el-radio v-if="currentData === 'dem'" label="mesh">TERRAIN(quantized-mesh)</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="格网集" prop="gridSet">
                <el-radio-group v-model="dataFormSql.gridSet" @change="getLevelByGridSet">
                  <el-radio label="4326">EPSG:4326</el-radio>
                  <el-radio v-if="currentData === 'tif' || currentData === 'timeTif'" label="3857">EPSG:3857</el-radio>
                  <el-radio v-if="currentData === 'tif' || currentData === 'timeTif'" label="4490">EPSG:4490</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="层级范围" prop="level" class="data-level" v-if='currentData !== "timeTif"'>
                <el-input v-model.number="dataFormSql.minLevel"></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="dataFormSql.maxLevel"></el-input> <span>有效的层级范围：</span><span v-if="dataFormSql.gridSet==='4326'">0-21</span><span v-if="dataFormSql.gridSet==='3857'">0-30</span><span v-if="dataFormSql.gridSet==='4490'">0-21</span>
              </el-form-item>
              <el-form-item v-if='currentData === "timeTif" && dataFormSql.mimeType === "png"' label="透明色" prop="transparentColor" class="publish-data-color">
                <el-color-picker v-model="dataFormSql.transparentColor"></el-color-picker>
              </el-form-item>
              <el-form-item label="波段设置" prop='waveSet' v-if='currentData === "tif" && dataFormSql.mimeType !== "tif"'>
                <div class='new-task-waveset'>
                  <el-form-item label="渲染类型" prop="type" class="data-level">
                    <el-input v-model="waveSet.type" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="灰度波段" prop="grayBand" class ="data-level"  v-if='waveSet.type === "单波段灰度"'>
                    <el-input v-model="waveSet.grayBand" disabled></el-input>
                  </el-form-item>
                  <el-form-item  v-if='waveSet.type === "多波段彩色"' class='color-bandset'> 
                    <el-form-item label="红色波段" prop="redBand" class ="data-level" >
                      <el-input v-model="waveSet.redBand" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="绿色波段" prop="greenBand" class ="data-level">
                      <el-input v-model="waveSet.greenBand" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="蓝色波段" prop="blueBand" class ="data-level">
                      <el-input v-model="waveSet.blueBand" disabled></el-input>
                    </el-form-item>
                    <!-- <div class = "waveset-item" >
                        <span >红色波段</span>
                        <el-input v-model="waveSet.redBand" disabled> </el-input>
                    </div>
                    <div class="waveset-item" >
                        <span >绿色波段</span>
                        <el-input v-model="waveSet.greenBand" disabled> </el-input>
                    </div>
                    <div class="waveset-item" >
                      <span >蓝色波段</span>
                      <el-input v-model="waveSet.blueBand" disabled></el-input>
                    </div>   -->
                  </el-form-item>
                  <el-form-item label="拉伸" prop="grayStretching" class="data-level">
                    <el-input v-model="waveSet.grayStretching" disabled></el-input>
                  </el-form-item> 
                  <el-form-item label="透明色" prop="transparentColor" class="publish-data-color" v-if="dataFormSql.mimeType === 'png'">
                    <el-color-picker v-model="waveSet.transparentColor" disabled></el-color-picker>
                  </el-form-item>
                  <div style="text-align:center;">
                    <el-button size="small" type="primary" plain @click="updateBands">修改</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <UpdateBandsDialog 
              ref='UpdateBandsDialog' 
              :waveSet=waveSet 
              :bandsList=bandsList 
              :path=checkedDataPath
              :mimeType=dataFormSql.mimeType
              :canPreview=canPreview
              :bandsListMap=bandsListMap
              :originalBand=originalBand >
            </UpdateBandsDialog>
          </div>
          <div v-if='stepModule >= 2' style="margin-left: 14px;">
            <h1><i class="el-icon-success"></i>创建成功！</h1>
            <table>
              <tr v-for='(li, index) in tableDatas' :key='index'>
                <td class="table-head">{{ li.name }}</td>
                <td class="table-body" :title='li.title'>{{ li.value }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="new-task-footer">
        <el-button v-if="stepModule === 1" type="primary" size="small" @click="stepModule--">上一步</el-button>
        <el-button v-if="stepModule === 0" type="primary" size="small" @click="nextStep" :disabled='activeHBase === false && currentTile === "hbase"'>下一步</el-button>
        <el-button v-if="stepModule === 1" type="primary" size="small" @click="createNewTask">创建任务</el-button>
        <el-button v-if="stepModule >= 2" type="primary" size="small" @click="goBack">进入任务列表</el-button>
        <el-button v-if="stepModule < 2" size="small" @click="goBack">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';

  import { createTask, getTaskLevel, createTimeImageTask, getTimeTifTask } from '../api/tileBuilderApi';
  import ServerDirectoryDialog from './ServerDirectoryDialog';
  import UpdateBandsDialog from './UpdateBandsDialog';
  import { getServerType, getServerPath } from '../api/fileApi';
  import { getHbaseSourceList} from '../api/serviceApi';

  export default {
    components: {
      ServerDirectoryDialog,
      UpdateBandsDialog,
    },
    data() {
      const validateLayerName = (rule, value, callback) => {
        const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
        const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
        if (regEn.test(value) || regCn.test(value)) {
          callback(new Error('任务名名只能包含数字、中文、字母、下划线、短横线！'));
        } else if(!reStr.test(value)){
          callback(new Error('任务名必须以汉字或字母开头'));
        } else {
          callback();
        }
      };
      const validateLevel = (rule, value, callback) => {
        if(this.currentData === 'dem' && this.dataFormSql.minLevel > 0) {
          callback(new Error('地形数据最小层级只能为0'));
        } else if (this.dataFormSql.maxLevel < this.dataFormSql.minLevel) {
          callback(new Error('最大层级不能小于最小层级'));
        } else if ((this.dataFormSql.minLevel < 0 ||
          (this.dataFormSql.gridSet==='4326' && this.dataFormSql.maxLevel > 21) ||
          (this.dataFormSql.gridSet==='3857' && this.dataFormSql.maxLevel > 30))) {
          callback(new Error('层级不在有效范围'));
        } else {
          callback();
        }
      };
      const validateNumber = (rule, value, callback) => {
        if (!Number.isInteger(this.dataFormSql.minLevel) || !Number.isInteger(this.dataFormSql.maxLevel)) {
          callback(new Error('请输入数字'));
        } else {
          callback();
        }
      };
      return {
        // nextLoading: false,// 下一步添加loading
        scanLoading: false,
        fileType:[],
        directoryTitle: null,//文件选择框标题
        checkedDataPath:null,//服务器数据路径
        checkedDataRealPath:null,//服务器数据真实路径
        saveDataPath: null,//服务器保存路径
        saveDataRealPath: null,//服务器保存路径
        isCheckFolder: true, // 是否需要勾选文件夹
        rootUrl: 'null',
        dataType: [
          { name: '影像数据', value: 'tif' },
          { name: '时序影像数据', value: 'timeTif' },
          { name: '地形数据', value: 'dem' },
        ],
        currentData:'tif',//当前数据类型
        dataSourceType: [
          { name: 'TIF/IMG 文件', value: 'TIF/IMG 文件' },
          { name: 'TIF 目录', value: 'TIF 目录' },
        ],
        currentSource:'TIF/IMG 文件',//当前数据源
        tileType:[
          { name: 'GV MBTiles', value: 'mbtiles' },
          { name: 'GV HBase', value: 'hbase'}
          // { name: '散列', value: '散列' },
        ],
        currentTile:'mbtiles',//当前瓦片存储
        stepModule: 0,//第几步操作
        dataFormSql: {},//参数表格数据
        isGray: false,//判断是否为单波段灰度
        //波段设置
        waveSet: {
          type: '',
          grayBand: '', //灰色波段
          redBand: '', //红色波段
          greenBand: '', //绿色波段
          blueBand: '', //蓝色波段
          transparentColor: '', //透明色
          grayStretching: '', //是否拉伸
        },
        originalBand:{
          type: '', //原始的波段类型
          redBand: '', //原始红色波段
          greenBand: '', //原始绿色波段
          blueBand: '', //原始蓝色波段
          grayBand: '', //原始灰色波段
          grayStretching: '否', //原始是否拉伸
          transparentColor: '', //原始是否具有透明色
        },
        bandsList: [],
        bandsListMap: {}, //波段映射
        rgbIndex: '',
        canPreview: false,//是否可以预览
        rules: {
          taskName: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
            { max: 50, message: '任务名称长度不能超过50字符', trigger: 'blur' },
            { validator: validateLayerName, trigger: 'blur' },
          ],
          level: [
            { validator: validateLevel, trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' },
          ]
        },
        tableDatas:[],//创建后任务数据
        level:{},
        typeValue: 'image', // 用于区分数据类型
        createTaskLoad: false, // 创建任务时的loading
        serverType: '', // 服务器类型
        importExportType: '1', //  用于数据的导入导出
        serverPath: '',
        activeHBase:'', //当前启动的集群的名字
      };
    },
    props: {
      isGoBackNew: {
        type: Boolean,
      },
      currentType:{
        type: String,
      }
    },
    created() {
      this.init();
    },
    async mounted() {
      this.serverType = await getServerType();
      this.serverPath = await getServerPath();
      // this.activeHBase = await this.getActiveDataSource();
    },
    watch: {
      currentType(val) {
        switch (val) {
          case 'image':
            this.currentData = 'tif';
            break;
          case 'timeImage':
            this.currentData = 'timeTif';
            break;
          case 'dem':
            this.currentData = 'dem';
            break;
        }
        this.changeCurrentData(this.currentData);
      },
      isGoBackNew() {
        this.stepModule = 0;   //点击新建按钮时，回到第一步
        this.checkedDataPath = '';  //把数据地址初始化为空
        this.checkedDataRealPath = '';
        this.saveDataPath = ''; //把存储位置地址初始化为空
        this.saveDataRealPath = '';
        this.currentTile = 'mbtiles';
        //this.activeHBase = await this.getActiveDataSource(); //当点击新建任务时，获取集群的存放位置
      },
    },
    methods: {
      // 初始化
      init() {
        this.stepModule = 0;
        this.dataFormSql = {
          taskName: '',
          mimeType:'png',
          gridSet: '4326',
          minLevel: 0,
          maxLevel: 5,
          transparentColor:null
        };
        this.checkedDataPath = '';
        this.checkedDataRealPath = '';
        this.saveDataPath = '';
        this.saveDataRealPath = '';
      },
      // 返回
      goBack() {
        this.$emit('goBack');
        this.stepModule = 0;
        this.checkedDataPath = '';
        this.checkedDataRealPath = '';
        this.saveDataPath = '';
        this.saveDataRealPath = '';
        this.createTaskLoad = false;
      },
      //获取启动的集群名称，节点，端口号
      async getActiveDataSource() {
        var activeCluster = false;
        var hosts = [];  //集群中的节点列表
        var name = '';  //集群的名字
        var hostsList = []; //集群中节点的名字列表
        var port = ''; //集群的端口号
        await getHbaseSourceList().then((cluster)=>{
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
      tabDataSource() {
        this.checkedDataPath = '';
        this.checkedDataRealPath = '';
      },
      async tabTileType() {
        if (this.currentTile === 'hbase') {
          this.activeHBase = await this.getActiveDataSource();
        }
      },
      async getLevel() {
        if (this.currentData === "dem") {
          this.dataFormSql.gridSet = '4326';
        }
        this.bandsList = [];
        const params = {
          taskName: '1',
          mimeType: 'png',
          gridSet: this.dataFormSql.gridSet,
          minLevel: 0,
          maxLevel: 30,
          dataPath: this.checkedDataPath,
          savePath: this.currentTile === 'hbase' ? this.activeHBase : this.saveDataPath,
          dataType: this.currentData === 'timeTif' ? 'tif' : this.currentData,
          tileType: this.currentTile ==='hbase' ? "hbase" : "mbtiles",
          type: this.typeValue,
        };
        if (this.currentData === "timeTif") {
          this.createTaskLoad = false;
          this.stepModule ++;
        } else {
          try {
            const res = await getTaskLevel(params);
            this.level = res.result;
          } catch (error) {
            this.createTaskLoad = false;
            return;
          }
          this.createTaskLoad = false;
          if (this.level) {
            this.stepModule ++;
          }
          if (this.currentData === 'dem') {
            this.dataFormSql.minLevel = 0;
          } else {
            this.dataFormSql.minLevel = this.level.min;
            this.canPreview = this.level.canPreview; //是否可以预览
            var bands = this.level.bands;
            this.getBandsMessage(bands)
          }
          this.dataFormSql.maxLevel = this.level.max;
        }
      },
      //通过格网集变化，切换影像和地形的层级
      async getLevelByGridSet() {
        const params = {
          taskName: '1',
          mimeType: 'png',
          gridSet: this.dataFormSql.gridSet,
          minLevel: 0,
          maxLevel: 30,
          dataPath: this.checkedDataPath,
          savePath: this.currentTile === 'hbase'?this.activeHBase:this.saveDataPath,
          dataType: this.currentData === 'timeTif' ? 'tif' : this.currentData,
          tileType: this.currentTile ==='hbase'?"hbase": "mbtiles",
          type: this.typeValue,
        };
        const respone = await getTaskLevel(params);
        this.level = respone.result;
        if (this.currentData === 'dem') {
          this.dataFormSql.minLevel = 0;
        } else {
          this.dataFormSql.minLevel = this.level.min;
        }
        this.dataFormSql.maxLevel = this.level.max;
        this.waveSet.grayStretching = '否';
        this.getBandsMessage(this.level.bands)
      },
      // 处理波段信息
      getBandsMessage(bands) {
        this.bandsList = [];
        this.bandsListMap = {};
        var bandsList = Object.keys(bands); //获取对象的长度
        for (let j = 0; j<bandsList.length; j++) {
          if (bands[bandsList[j]] === "Undefined") {
            this.bandsList.push('波段'+ bandsList[j])
            this.bandsListMap['波段'+ bandsList[j]] = bandsList[j] //波段映射
          } else {
            this.bandsList.push('波段'+ bandsList[j]+'('+ bands[bandsList[j]]+')')
            this.bandsListMap['波段'+ bandsList[j]+'('+ bands[bandsList[j]]+')'] = bandsList[j]
          }
        }
        if (bandsList < 3) {
          this.waveSet.type = "单波段灰度";
          this.waveSet.grayBand = this.bandsList[0];
          this.waveSet.redBand = this.bandsList[0]; 
          this.waveSet.greenBand =  this.bandsList[0];
          this.waveSet.blueBand = this.bandsList[0];
        } else {
          this.waveSet.type = "多波段彩色";
          this.waveSet.redBand = this.bandsList[0] ;
          this.waveSet.greenBand =  this.bandsList[1];
          this.waveSet.blueBand = this.bandsList[2];
          this.waveSet.grayBand = this.bandsList[0];
        }
        this.waveSet.grayStretching = '否';
        this.waveSet.transparentColor = '';
        // if (this.waveSet.type === "多波段彩色") {
        //   this.rgbIndex = this.bandsListMap[this.waveSet.redBand] + ',' + this.bandsListMap[this.waveSet.greenBand] + ',' + this.bandsListMap[this.waveSet.blueBand];
        // } else {
        //   this.rgbIndex = this.bandsListMap[this.waveSet.grayBand];
        // }
        this.originalBand.type = this.waveSet.type;
        this.originalBand.redBand = this.waveSet.redBand;
        this.originalBand.greenBand = this.waveSet.greenBand;
        this.originalBand.blueBand = this.waveSet.blueBand;
        this.originalBand.grayBand = this.waveSet.grayBand;
      },
      //修改波段信息
      updateBands() {
        this.$refs.UpdateBandsDialog.updateBands = true;
      },
      buildName() {
        let checkedDataPath = this.checkedDataPath;
        if (this.serverType.resultInfo === 'WindowsSingleVersion') {
          checkedDataPath = checkedDataPath.split('\\')[checkedDataPath.split('\\').length - 1];
        }
        const lastIndex = checkedDataPath.lastIndexOf('/');
        const pointIndex = checkedDataPath.lastIndexOf('.');
        if (pointIndex > 0 && pointIndex > lastIndex ) {
          this.dataFormSql.taskName = checkedDataPath.substring(lastIndex + 1, pointIndex);
        } else {
          this.dataFormSql.taskName = checkedDataPath.substring(lastIndex + 1, this.checkedDataPath.length);
        }
      },
      //确定修改波段信息
      // waveSetMakeSure(rgbIndex) {
      //   this.rgbIndex = rgbIndex;
      // },
      //通过波段设置，得到rgbIndex字段
      getRgbIndex(waveSet) {
        var rgbIndex = '';
        var redIndex = '';
        var greenIndex = '';
        var blueIndex = '';
        if (waveSet.type === "多波段彩色") {
          redIndex = this.bandsListMap[waveSet.redBand];
          greenIndex = this.bandsListMap[waveSet.greenBand];
          blueIndex = this.bandsListMap[waveSet.blueBand];
          rgbIndex = redIndex + ',' + greenIndex + ',' + blueIndex;
        } else {
          rgbIndex = this.bandsListMap[this.waveSet.grayBand];
        }
        return rgbIndex
      },
      // 下一步
      async nextStep() {
        this.createTaskLoad = true;
        if (!this.checkedDataPath) {
          this.$message.warning({ message: '请选择数据', showClose: true });
          this.createTaskLoad = false;
          return;
        }
        if (this.currentTile != 'hbase') {
          if (!this.saveDataPath) {
            this.$message.warning({ message: '请选择存放位置', showClose: true });
            this.createTaskLoad = false;
            return;
          }
        }
        if (this.currentTile === 'hbase') {
          if (!this.activeHBase){
            this.$message.warning({ message: '无可使用HBase数据源', showClose:true });
            this.createTaskLoad = false;
            return;
          }
        }
        if (this.currentData === "timeTif" ) {
          try {
            await getTimeTifTask(this.checkedDataPath)
          } catch (error) {
            this.createTaskLoad = false;
            return;
          }
        }
        this.getLevel();
        this.buildName();
      },
      // 选择数据
      showDataDirectory(title) {
        this.directoryTitle = title;
        if (title === '选择数据') {
          this.importExportType = '1';
          this.fileType = ['tif'];
          if (this.currentSource === 'TIF/IMG 文件' || this.currentSource === 'TIF/IMG/BIL 文件') {
            this.isCheckFolder = false;
          } else {
            this.isCheckFolder = true;
          }
          this.createTaskLoad = false;
        } else {
          this.importExportType = '2';
          this.fileType = [null];
          this.isCheckFolder = true;
        }
        this.$refs.serverDirectoryDialog.checkTargetFile = true;
      },
      changeCurrentData(currentData) {
        this.dataSourceType = [
          { name: 'TIF/IMG 文件', value: 'TIF/IMG 文件' },
          { name: 'TIF 目录', value: 'TIF 目录' },
        ];
        this.currentSource = 'TIF/IMG 文件';
        //地形对应的数据源和瓦片存储
        if (currentData === 'dem') {
          this.dataSourceType = [
            { name: 'TIF/IMG/BIL 文件', value: 'TIF/IMG/BIL 文件' },
            { name: 'TIF/IMG/BIL 目录', value: 'TIF/IMG/BIL 目录' },
          ];
          this.currentSource = 'TIF/IMG/BIL 文件';
          this.dataFormSql.mimeType = 'terrain';
          this.tileType = [
            { name: 'GV MBTiles(Terrain)', value: 'mbtiles' },
          ];
          this.currentTile = 'mbtiles';
          this.typeValue = 'dem';
        } else if (currentData === 'timeTif') {
          this.dataSourceType = [
            { name: 'TIF 目录', value: 'TIF 目录' },
          ];
          this.currentSource = 'TIF 目录';
          this.dataFormSql.mimeType = 'png';
          this.tileType = [
            { name: 'GV MBTiles(History)', value: 'mbtiles' },
            { name: 'GV HBase(History)', value: 'hbase',}
          ];
          this.currentTile = 'mbtiles';
          this.typeValue = 'timeImage';
        } else {
          this.dataFormSql.mimeType = 'png';
          this.tileType = [
            { name: 'GV MBTiles', value: 'mbtiles' },
            { name: 'GV HBase', value: 'hbase'},
          ];
          this.currentTile = 'mbtiles';
          this.typeValue = 'image';
        }
        this.checkedDataPath = '';
        this.checkedDataRealPath = '';
        this.saveDataPath = '';
        this.saveDataRealPath = '';
        this.createTaskLoad = false;
      },
      // 确认选中的文件
      checkedDataConfrim(data) {
        if (this.currentSource === 'TIF 目录' && data.type === 'file') {
          this.$message.warning({ message: '请选择文件夹类型', showClose: true });
          return;
        }
        if (this.directoryTitle === '选择数据') {
          if (!this.checkDataPathLength(data.path)) {
            this.checkedDataPath = null;
            this.checkedDataRealPath = null;
          } else {
            this.checkedDataPath = this.checkDataPathLength(data.path)
            // this.checkedDataPath = this.isTifFile(this.currentSource,data.path)
            this.checkedDataRealPath = data.fileRealPath;
          } 
        } else {
            this.saveDataPath = this.checkDataPathLength(data.path)
            this.saveDataRealPath = data.fileRealPath;
        }
        this.$refs.serverDirectoryDialog.checkTargetFile = false;
      },
      // 判断数据的路径的长度是否大于235，若大于235则提醒
      checkDataPathLength(datapath) {
        if (datapath.length > 235) {
          this.$message.warning({message:'文件路径不能超过235个字符',showClose:true});
          return null
        } else {
          return datapath
        }
      },
      // 判断输入是否是Tif文件
      isTifFile(currentSource,datapath) {
        if (currentSource === 'TIF/IMG 文件') {
          if (datapath.indexOf(".tif") === -1 && datapath.indexOf(".img") === -1) {
            this.$message.warning({message:'只能选择tif文件或img文件',showClose:true});
            return null
          } else {
            return datapath
          }
        } else {
          return datapath
        }
      },
      createNewTask() {
        if (this.currentData === 'timeTif') {
          if (this.currentTile === 'hbase') {
            this.saveDataPath = this.activeHBase;
          }
          this.createTimeTask();
        } else {
          if (this.currentTile === 'hbase') {
            this.saveDataPath = this.activeHBase;
          }
          this.tableDatas = [
            {name:'任务名称', value: this.dataFormSql.taskName},
            {name:'数据位置', value: this.checkedDataPath,title:this.checkedDataPath},
            {name:'存放位置', value: this.saveDataPath,title:this.saveDataPath}, 
            {name:'瓦片存储', value: this.translate(this.currentData+this.currentTile)},
            {name:'瓦片格式', value: this.translate('mineType-'+this.dataFormSql.mimeType)},
            {name:'格网集', value: this.translate(this.dataFormSql.gridSet)},
            {name:'层级范围', value: `${this.dataFormSql.minLevel}-${this.dataFormSql.maxLevel}`},
          ];
          if (this.dataFormSql.mimeType === 'png' || this.dataFormSql.mimeType === 'jpeg') {
            if (this.waveSet.type === '单波段灰度' ) {
              this.tableDatas.push({name:'渲染类型', value:'单波段灰度'});
              this.tableDatas.push({name:'灰色波段', value:this.waveSet.grayBand});
              this.tableDatas.push({name:'拉伸', value:this.waveSet.grayStretching});
            } else if (this.waveSet.type === '多波段彩色') {
              this.tableDatas.push({name:'渲染类型', value:'多波段彩色'});
              this.tableDatas.push({name:'红色波段', value:this.waveSet.redBand});
              this.tableDatas.push({name:'绿色波段', value:this.waveSet.greenBand});
              this.tableDatas.push({name:'蓝色波段', value:this.waveSet.blueBand});
              this.tableDatas.push({name:'拉伸', value:this.waveSet.grayStretching});
            }
          }   
          this.createDefaultTask();
        }
      },
      // 创建任务
      async createDefaultTask(){
        // var hbaseMessage = await getDataSourcebyName(this.activeHBase)
        // hbaseMessage = JSON.stringify(hbaseMessage)
        this.$refs.dataFormSql.validate(async (valid) => {
          if (valid) {
            this.createTaskLoad = true;
            const params = {
              taskName: this.dataFormSql.taskName,
              mimeType: this.dataFormSql.mimeType,
              gridSet: this.dataFormSql.gridSet,
              minLevel: this.dataFormSql.minLevel,
              maxLevel: this.dataFormSql.maxLevel,
              dataPath: this.checkedDataPath,
              savePath: this.saveDataPath,
              dataType: this.currentData,
              tileType: this.currentTile,
              type: this.typeValue,
            };
            var grayStretch = false;
            if (this.waveSet.grayStretching === '是') {
              grayStretch = true;
            } else {
              grayStretch = false;
            }
            // if(this.currentData === 'tif') {
            if (this.dataFormSql.mimeType === 'png') {
              params.transparentColor = this.waveSet.transparentColor;
              params.rgbIndex = this.getRgbIndex(this.waveSet);
              params.grayStretching = grayStretch
            }   
            if (this.dataFormSql.mimeType === 'jpeg') {
              params.rgbIndex = this.getRgbIndex(this.waveSet);
              params.grayStretching = grayStretch;
            }  
            createTask(params).then((res) => {
              if (res && res.success) {
                this.stepModule = 3;
              } else{
                this.showMessage(res.msg);
              }
              this.createTaskLoad = false;
            }).catch(() => {
              this.createTaskLoad = false;
            });
          }
        });
      },
      //创建时序影像任务
      async createTimeTask(){
        this.$refs.dataFormSql.validate(async (valid) => {
          if (valid) {
            this.createTaskLoad = true;
            const params = {
              taskName: this.dataFormSql.taskName,
              mimeType: this.dataFormSql.mimeType,
              gridSet: this.dataFormSql.gridSet,
              // minLevel: this.dataFormSql.minLevel,
              // maxLevel: this.dataFormSql.maxLevel,
              dataPath: this.checkedDataPath,
              savePath: this.saveDataPath,
              dataType: this.currentData === 'timeTif' ? 'tif' : this.currentData,
              tileType: this.currentTile,
              type: this.typeValue,
            };
            if (this.currentData === 'tif' || this.currentData === 'timeTif') {
              params.transparentColor = this.dataFormSql.transparentColor;
            }
            createTimeImageTask(params).then((res) => {
              if (res && res.success) {
                this.tableDatas = [
                  {name:'任务名称', value: this.dataFormSql.taskName},
                  {name:'数据位置', value: this.checkedDataPath, title: this.checkedDataPath},
                  {name:'存放位置', value: this.saveDataPath, title:this.saveDataPath},
                  {name:'瓦片存储', value: this.translate(this.currentData+this.currentTile)},
                  {name:'瓦片格式', value: this.translate('mineType-'+this.dataFormSql.mimeType)},
                  {name:'格网集', value: this.translate(this.dataFormSql.gridSet)},
                  // {name:'层级范围', value: `${this.dataFormSql.minLevel}-${this.dataFormSql.maxLevel}`},
                ];
                this.stepModule = 3;
              } else{
                this.showMessage(res.msg);
              }
              this.createTaskLoad = false;
            }).catch(() => {
              this.createTaskLoad = false;
            });
          }
        });
      },
      showMessage(message) {
        let translate;
        switch (message) {
          // case 'Task name already exists':
          //   translate = '任务名称已经存在';
          //   break;
          // case 'The save folder already has the same task name.':
          //   translate = '与任务名称相同的目录已经存在';
          //   break;
          default:
            translate = message;
            break;
        }
        Message({
          message: translate,
          type: 'error',
          duration: 2 * 1000,
          showClose: true,
        });
      },
      // 转换
      translate(value) {
        switch (value) {
          case 'tif':
          case 'timeTif':
            return '影像数据';
          case 'dem':
            return '地形数据';
          case 'tifmbtiles':
            return 'GV MBTiles';
          case 'timeTifmbtiles':
            return 'GV MBTiles(History)';
          case 'demmbtiles':
            return 'GV MBTiles(Terrain)';
          case 'tifhbase':
            return 'GV HBase';
          case 'timeTifhbase':
            return 'GV HBase(History)';
          case 'mineType-png':
            return 'PNG';
          case 'mineType-jpeg':
            return 'JPEG';
          case 'mineType-tif':
            return 'TIFF';
          case 'mineType-terrain':
            return 'TERRAIN(heightmap)';
          case 'mineType-mesh':
            return 'TERRAIN(quantized-mesh)';
          case '4326':
          case '3857':
            return 'EPSG:'+value;
          default:
            return value;
        }
      },
    },
  };
</script>

<style lang="scss">
  .new-task-title{
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
  .new-task-select {
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
  .new-task-main {
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
      // width: calc((100vw / 100 * 60) - 200px);
      margin: 20px 0px 20px 0px;;
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
      height: calc(100vh - 333px);
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
  .new-task-waveset{   
    border: 1px solid #dcdfe6;
    padding: 10px;
    margin-right: 110px;
    .el-form-item.color-bandset {
      margin-bottom: 0px;
      .el-form-item {
        float:left; 
        margin-right:20px;
      }
    }
  }
  .new-task-footer {
    // width: calc((100vw / 100 * 60) - 30px);
    text-align: center;
    padding-left: 155px;
    padding-right: 20%;
  }
  .data-level {
    .el-input {
      width: 130px;
    }
  }
  .waveset-item {
    float:left;
    width:250px;
    .el-input {
      width: 130px;
    }
    span {
      font-weight: 700;
      margin-right: 38px;
    }
  }
  .task-name{
    .el-form-item__content{
      width: 283px;
    }
    .el-form-item__label:before{
      float: right;
      margin-right: 24px !important;
    }
  }
  .params{
    //height: 40px;
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
    span{
      width: calc(100% - 118px);
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .directory-file {
    padding-left: 15px;
  }
  .long-text-style {
    width: calc(100% - 85px);
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .save-position-style {
    float: left;
    background: #dcdfe6;
    border-radius: 3px;
    span {
      font-size: 12px;
      margin: 16px;
      font-weight: 700;
      color: white;
    }
    
  }
  .without-activate-Hbase {
    color:red;
    font-size:12px;
  }
  .has-activate-Hbase {
    margin-left: 5px;
  }
</style>
