<template>
	<div class="scan-storage-wrap">
		<NavComponent></NavComponent>		
		<el-container>
			<!-- <el-aside>
				<CommonLeftNav :leftLists='leftNav' @tabMain='tabMain' :defaultActive='defaultActive' :defaultOpeneds='defaultOpeneds'></CommonLeftNav>
			</el-aside> -->
			<el-main class='scan-storage-el-main'>
				<el-main v-show='showMain[0]'>
					<!-- <div class="scan-storage-base">扫描文件</div> -->
					<div class="scan-storage-title">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item v-for='(li, index) in routerNav'
								:key='index' :to='li.route'>{{ li.name }}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="scan-manage-select">
						<span>数据类型</span>
						<el-select v-model="filesType" placeholder="请选择" :disabled='scanLoading' size='small'>
							<el-option
								v-for="(li, index) in filtertypeTab"
								:key="index"
								:label="li.serviceName"
								:value="li.typeIdentify">
							</el-option>
						</el-select>
						<span>存放位置 </span>
						<el-input placeholder="请输入内容" clearable :value='mountPointNodeName'
							:disabled='scanLoading' size='small'>
							<el-button slot="append" icon="fa fa-folder-o sevice-icon-font"
								@click='mountPoint = true' :disabled='scanLoading'></el-button>
						</el-input>
						<span>导入模式 </span>
						<div class="scan-manage-import-model">
							<el-radio v-model="importMode" label="2">复制</el-radio>
							<el-radio v-model="importMode" label="1">剪切</el-radio>
						</div><br />
					</div>
					<div class="scan-manage-select-btn">
						<el-button size="small" type="primary" @click='checkTargetFile = true'
							:disabled='scanLoading'>添加数据</el-button>
						<el-button size="small" type="primary" plain @click='clearCheckedFile'
							:disabled='scanLoading'>清空列表</el-button><br />
					</div>
					<!--弹出存放位置-->
					<el-dialog title="选择文件存放位置" :visible.sync="mountPoint" :close-on-click-modal='false'>
						<div id='filterMountTree' class="ztree"></div>
						<div>
							<el-button type="primary" size='small' @click='getMountPoint'>确定</el-button>
							<el-button size='small' @click='cancelMountPoint'>取消</el-button>
						</div>
					</el-dialog>
					<!--弹出文件服务tree-->
					<el-dialog title="选择文件" :visible.sync="checkTargetFile" :close-on-click-modal='false'>
						<div class="scan-storage-head">
							<el-breadcrumb separator-class="el-icon-arrow-right" class="scan-storage-file">
								<el-breadcrumb-item v-for='(li, index) in filePath' :key='index'>
									<span v-if='index === 0' :title='serverPath' @click='goBackItem(li.path, index)'>{{ li.viewpath.slice(1, li.viewpath.length) }}</span>
									<span v-else @click='goBackItem(li.path, index)'>{{ li.viewpath.slice(1, li.viewpath.length) }}</span>
								</el-breadcrumb-item>
							</el-breadcrumb>
							<el-input placeholder="搜索当前目录" v-model="inputValue" size='small'
								clearable @clear='inputChange'></el-input>
						</div>
						<div class="monitor-table-progress">
							<!-- <el-progress type="circle" :percentage="percentage" color="#24A5F8" v-show='progressScan'></el-progress> -->
							<el-table :data="tableData" ref='multipleTable' align='right' tooltip-effect="dark" v-loading="scanLoading" @selection-change="changeFun" @cell-click='rowDblclick'>
								<el-table-column type="selection" width="45" :selectable='selectable'></el-table-column>
								<el-table-column label="文件路径">
									<template slot-scope="scope">
										<i v-if='scope.row.state' class="fa fa-lg fa-file-o"></i>
										<i v-else class="fa fa-lg fa-folder set-color"></i>
										<span>{{ scope.row.viewpath.slice(1, scope.row.viewpath.length) }}</span>
									</template>
								</el-table-column>
								<!-- <el-table-column prop="path" label="文件路径" align='left'></el-table-column> -->
								<el-table-column prop="size" label="文件大小" width="140"></el-table-column>								
							</el-table>	
						</div>						
						<div>
							<el-button type="primary" size='small' @click='checkTargetFile = false'>确定</el-button>
							<el-button plain size='small' @click='cancelCheckFile'>取消</el-button>
							<span class="check-storage-file">已经勾选了{{ checkedTableData.length }}条数据</span>
						</div>
					</el-dialog>
					<!--将选中的条目文件进行展示-->
					<el-table :data="checkedTableData" align='right'
						tooltip-effect="dark" class="checked-table-data">
						<el-table-column align='left' label="文件路径">
							<template slot-scope="scope">
								<i class="fa fa-lg fa-file-o"></i>
								<span><span :title='serverPath'>根目录</span>{{ scope.row.fileRealPath.slice(serverPath.length, scope.row.fileRealPath.length) }}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="path" label="文件路径"></el-table-column> -->
						<el-table-column prop="size" label="文件大小" width="155"></el-table-column>
						<el-table-column prop="state" label="导入进度" align='center' width="200">
							<template slot-scope="scope">
								<span v-show='!scanLoading || scope.row.state === "成功"'>{{ scope.row.state }}</span>
								<!-- <span v-show='scope.row.state !== "成功" && scope.row.state !== "失败"'>解析中...</span> -->
								<el-progress v-show='scanLoading && scope.row.state !== "成功"' :text-inside="true"
									:stroke-width="18"	:percentage="progressArr[scope.row.path]"></el-progress>
								<p style='display: none'>{{ dataChage }}</p>
							</template>
						</el-table-column>
						<el-table-column
							label="操作"
							align='center'
							width="200">
							<template slot-scope="scope">
								<el-button type="primary" plain @click="removeCheckedItem(scope.$index, scope.row)"
									size="small" :disabled='scanLoading'>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="enter-storage-file">
						<el-button size="small" type="primary" @click='storageData'
							:disabled='scanLoading'>导入数据</el-button>
						<router-link to='/datamanager'><el-button size="small">取消</el-button></router-link>						
					</div>
				</el-main>
				<el-main v-show='showMain[1]'>
					<!-- <div class="scan-storage-base">入库监听</div> -->
					<div class="scan-storage-title">
						<ul>
							<li v-for='(li, index) in routerNav1' :key='index'>
								<router-link :to='li.route'>{{ li.name }}</router-link>
								<i v-if='index !== (routerNav1.length - 1)' class="el-icon-arrow-right"></i>
							</li>
						</ul>
					</div>
					<div class="scan-manage-select2">
						<span>时间：</span>
						<el-date-picker
							v-model="monitorTableTime"
							type="daterange"
							align="right"
							unlink-panels
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="pickerOptions">
						</el-date-picker>
						<el-button size="small" type="primary" @click='storageMonitorList'>确定</el-button>
					</div>
					<el-table :data="monitorTableData" style="width: 100%" v-loading="scanLoading" align='right'>
						<el-table-column prop="name" label="文件名称"></el-table-column>
						<el-table-column prop="path" label="文件路径"></el-table-column>
						<el-table-column prop="createTime" label="入库时间"></el-table-column>
						<el-table-column prop="size" label="文件大小" width="360"></el-table-column>
					</el-table>
					<!--分页-->
					<el-pagination
						:small="true"
						:current-page="currentPage"
						@current-change="currentChange"
						:total="monitorTotal"
						:page-sizes="[pageSize]"
						layout="total, sizes, prev, pager, next, jumper">
					</el-pagination>
				</el-main>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import $ from 'jquery';
import {
  mapGetters,
} from 'vuex';
import NavComponent from './NavComponent';
import CommonLeftNav from './CommonLeftNav';
import { scanFiles, getFoldersByParent, saveFiles, getFilePath, getRealFilePath,
 storageMonitor, getServerType, getFileProgress, getdataTypeList, getServerPath } from '../api/fileApi';

export default {
  name: 'dmhome',
  computed: { ...mapGetters([
    'userInfo',
  ])
	},
  components: {
    NavComponent,
    CommonLeftNav,
  },
  data() {
    return {
			checkTargetFile: false,
			routerNav: [{ name: 'iCenter', route: '/' }, { name: '数据管理', route: '/datamanager' }, { name: '从服务器导入', route: '/scanStorage' }],
			routerNav1: [{ name: 'iCenter', route: '/' }, { name: '数据管理', route: '/datamanager' }, { name: '入库记录', route: '/scanStorage' }],
      leftNav: [
				{ name: '扫描文件', index: '0' },
				{ name: '入库记录', index: '1' },
      ],
      showMain: [true, false],
      filtertypeTab: [{ name: '原始影像', value: '4' }, { name: '成果影像', value: '1' }, { name: '矢量', value: '2' }, { name: '地形', value: '3' }, { name: '倾斜摄影', value: '5' }],
      filesType: 'image', // 文件类型
      inputValue: '',
      tempTableData: [], // 服务目录临时文件
      filePath: [{path: '根目录', viewpath: '根目录'}], // 文件路径
      tableData: [{
        path: '',
        size: '',
      }],
      // checkedTableData: [{
      //   path: '',
      //   size: '',
      // }],
      defaultOpeneds: ['0'],
      defaultActive: '0',
      scanLoading: false, // 扫描文件的loading
      mountPoint: false, // 文件存放位置
      mountPointPId: null, // 存放位置的父id
      mountPointName: '', // 挂在点的全称
      mountPointNodeName: '', // 挂在点的name      
      mountPointId: null, // 存放位置的id
      // progressScan: false, // 进度条的显隐
      zTreeObj: {},
      setting: {
        callback: {
          onClick: this.zTreeClick,
          beforeExpand: this.zTreeExpand,
          beforeCollapse: this.zTreeExpand,
        },
        data: {
          key: {
            name: "fileName",
          }
        },
      },
      zNodes: [
        { fileName: '全部文件',
					id: -1,
					pId: -1,
					open: true,
					children: [],
        },
      ],
      tempResultArr: [], // 存储临时的解析入库的条目数据
      checkedTableData: [], // 被选中的要入库的文件数
      // percentage: 0, // 入库监听的进度条
      monitorTableTime: '', // 入库监听的时间段
      currentPage: 1, // 当前页
      pageSize: 20, // 每页条目数
      monitorTotal: 0, // 总条数
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      monitorTableData: [{
        name: '',
        path: '',
        createTime: '',
        size: '',
      }], // 入库监听的数据表
      serverType: '', // 服务器类型
      progressArr: {
				'fsdf.fdf': 10,
				'3423.yrt': 20,
      }, // 进度数组
      dataChage: true, // 用于触发数据驱动
      // resolveIng: {}, // 是否到达解析那一步
      setInterval: {}, // 扫描入库进度定时器
      loopNumTemp: 1, // 用于记录还需要进行几次循环
      importMode: '2', // 数据导入模式
      serverPath: '',
    };
  },
  async mounted() {
		this.tableData = [];
		this.tempTableData = [];
		// this.filePath = this.filePath.split('/');
		this.goBackItem('根目录'); // 默认根目录
		this.serverType = await getServerType();
		this.getMountPath(this.$route.params.id);
		this.mountPointId = this.$route.params.id;
		this.mountPointPId = this.$route.params.id;
		// const currentIdObj = await getPath(this.$route.params.id);
		// if (currentIdObj.length) {
		// 	this.mountPointPId = currentIdObj[currentIdObj.length - 1].pId;
		// } else {
		// 	this.mountPointPId = -1;
		// }
		this.filtertypeTab = await getdataTypeList(1, 1000);
		this.filtertypeTab = this.filtertypeTab.items;
		this.serverPath = await getServerPath();
  },
  watch: {
		mountPoint() {
			this.zTreeObj = $.fn.zTree.init($('#filterMountTree'), this.setting, this.zNodes);
			this.initTree();
			setTimeout(() => {
				this.zTreeObj = $.fn.zTree.init($('#filterMountTree'), this.setting, this.zNodes);
				this.initTree();
			}, 300);
		},
		filesType() {
			// let str = '';
			// this.filePath.forEach((res) => {
			// 	str += `${res}/`;
			// });
			this.filePath = [{path: '根目录', viewpath: '根目录'}];
			this.scanFilesData('null');
		},
		checkTargetFile(isTrue) {
			if (isTrue) this.inputValue = '';
		},
		inputValue() {
      this.inputChange();
    },
  },
  methods: {
    tabMain(index) {
      this.showMain = [false, false];
      this.showMain[Number(index.slice(0, 1))] = true;
      switch (index) {
				case '0-1':
					this.showMain[0] = true;
					this.showMain[1] = false;
					break;
				case '0-2':
					this.showMain[1] = true;
					this.showMain[0] = false;
					break;
			}
    },
    // 扫描
    async scanFilesData(filePath) {
			if (this.filePath.length) {
				this.scanLoading = true;
				scanFiles(filePath, this.filesType).then((res) => {
					this.scanLoading = false;
					res.forEach(val => {
						/* eslint-disable */
						// if (val.size) val.size = `${(val.size / 1024 / 1024).toFixed(2)}M`;
						if (val.size) val.size = this.getDataSize(val.size);
						/* eslint-enable */
					});
					this.tableData = res;
					this.tempTableData = res;
				}).catch(() => {
					this.scanLoading = false;
					this.$message.error({ message: '扫描失败', showClose: true });
				});
			} else {
				this.$message.warning({ message: '请输入扫描路径', showClose: true });
			}
		},
		// 计算数据的大小
    getDataSize(value) {
      const kb = parseInt(value / 1024, 10);
      const mb = (value / 1024 / 1024).toFixed(2);
      const gb = (value / 1024 / 1024 / 1024).toFixed(2);
      const tb = (value / 1024 / 1024 / 1024 / 1024).toFixed(2);
      if (tb > 1) {
        return `${tb}T`;
      } else if (gb > 1) {
        return `${gb}G`;
      } else if (mb > 1) {
        return `${mb}M`;
      }
      return `${kb}k`;
    },
		// 输入框搜索过滤
    inputChange() {
      this.tableData = this.tempTableData;
      let newArr = [];
      this.tableData.forEach(val => {
        if (val.path.slice(val.path.lastIndexOf('/') + 1, val.path.length).indexOf(this.inputValue) !== -1) {
          newArr.push(val);
        }
      });
      this.tableData = newArr;
    },
		// 过滤文件夹行的勾选框
		selectable(row) {
			if (row.fileType === 'Folder') {
				return false;
			} else {
				return true;
			}
		},
		// 某一行被单击
		rowDblclick(row) {
      if (row.fileType === 'Folder' && this.serverType.resultInfo === 'WindowsSingleVersion'){
				this.filePath.push({path: row.path, viewpath: row.viewpath});
        // this.filePath = row.path.split('\\');
				// this.filePath.unshift('根目录');
				this.scanFilesData(row.path);
				this.inputValue = '';
      } else if (row.fileType === 'Folder') {
				this.filePath.push({path: row.path, viewpath: row.viewpath});
				// this.filePath[0] = {path: '根目录', viewpath: '根目录'};
				this.scanFilesData(row.path);
				this.inputValue = '';
      }
		},
		// 点击目录返回
		goBackItem(path, index) {
			if (path === '根目录') {
				this.scanFilesData('null');
				this.filePath = [{path: '根目录', viewpath: '根目录'}];
				return;
			}
			// let str = '';
			// this.filePath.forEach((res, num) => {
			// 	if (num <= index) {
			// 		str += `${res}/`;
			// 	}
			// });
			if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        // const pathVal = str.slice(0, str.length - 1);
        // const pathValue = str.slice(str.indexOf('/'), str.length);
        this.scanFilesData(encodeURI(path));
        this.filePath = this.filePath.slice(0, index + 1);
      } else {
        // const pathVal = str.slice(0, str.length - 1);			
				// const pathValue = pathVal.slice(pathVal.indexOf('/'), pathVal.length);			
				this.scanFilesData(path);
				this.filePath = this.filePath.slice(0, index + 1);
      }			
		},
    // 获取存放位置
    getMountPoint() {
			this.mountPoint = false;
    },
    // 取消存放位置
    cancelMountPoint() {
			this.mountPointPId = null;
			this.mountPointNodeName = '';
			this.mountPoint = false;
    },
    // 清空列表
    clearCheckedFile() {
			this.checkedTableData = [];
			this.$refs.multipleTable.clearSelection();
    },
    // 删除莫一条入库的数据
    removeCheckedItem(index, row) {
			this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 取消选择
    cancelCheckFile() {
			this.checkTargetFile = false;
			this.checkedTableData = [];
			this.$refs.multipleTable.clearSelection();
    },
    // 入库
    async storageData() {
			// this.percentage = 0; // 每次将进度条清0
			this.tempResultArr = []; // 每次将临时存储的入库成功列表清0
			// 获取解析的文件类型
			// let filesType;
			// switch (this.filesType) {
			// 	case '1':
			// 		filesType = 'images';
			// 		break;
			// 	case '2':
			// 		filesType = 'vector';
			// 		break;
			// 	case '3':
			// 		filesType = 'terrain';
			// 		break;
			// 	case '4':
			// 		filesType = 'original';
			// 		break;
			// 	case '5':
			// 		filesType = 'tiltphoto';
			// 		break;
			// 	default:
			// 	this.$message.error({ message: '暂不支持此数据类型', showClose: true });
			// }
			let tempListArr = []; // 将初始化没入库和入库失败的数据再次进行入库
			this.checkedTableData.forEach(val => {
				if (val.state === '失败') {
					/* eslint-disable */
					val.state = '未入库';
					/* eslint-enable */					
				}
				// if (val.state !== '成功') {
					tempListArr.push(val);
				// }
			});
			this.checkedTableData = tempListArr;
			if (this.checkedTableData.length === 0) {
				this.$message.warning({ message: '没有可以入库的文件', showClose: true });
				this.$refs.multipleTable.clearSelection();
				this.tableData = [];
				this.filePath = [{path: '根目录', viewpath: '根目录'}];
				this.scanFilesData('null');
				return;
			}
			// 参数输入完整 开始解析入库
			if (this.filesType && this.mountPointPId) {
				this.$store.dispatch('getIsInLoaing', {state: true});
				this.scanLoading = true;
				// this.progressScan = true;
				let targetUrl = await getRealFilePath(this.mountPointId); // /home/iglobe/iCenter/datamanager/file/dir/5/测试/111
				// targetUrl = targetUrl.slice(targetUrl.indexOf(`dir/${this.userInfo.id}`) + Number(5+this.userInfo.id.length), targetUrl.length);
				let filesTypeToken = this.filesType;
				this.progressArr = {};
				// this.resolveIng = {};
				// 循环的次数
				const loopNumber = parseInt(this.checkedTableData.length/3) + 1;
				this.loopImportDm(this.checkedTableData.slice(0, 3), filesTypeToken, targetUrl, loopNumber);
			} else {
				this.$message.warning({ message: '请输入完整参数', showClose: true });
			}
    },
    // 循环导入数管
    loopImportDm(loopImportList, filesType, targetUrl, loopNumber) {
			let count = loopNumber;
			loopImportList.forEach((val, index) => {
				// 获取进度
				this.setInterval[val.path] = setInterval(() => {
					getFileProgress(val.path, targetUrl, this.importMode).then(num => {
						// this.resolveIng[val.path] = false;
						this.progressArr[val.path] = Number(Number(num.progress).toFixed(2));
						this.dataChage = !this.dataChage;
						if (this.progressArr[val.path] / 100 === 1) {
							// this.resolveIng[val.path] = true;
							clearInterval(this.setInterval[val.path]);
						}
					});
				}, 1000);
				saveFiles(val.path, this.mountPointName, filesType, this.mountPointPId, this.importMode).then((res) => {
					this.tempResultArr.push(res.resultInfo);
					/* eslint-disable */
					loopImportList[index].state = '成功';
					/* eslint-enable */	
					// this.resolveIng[val.path] = false;
					this.saveFilesRes();
					if (index === loopImportList.length - 1) {
						count-- ;
						if(count > 0){
							this.loopImportDm(this.checkedTableData.slice(3*this.loopNumTemp, 3*this.loopNumTemp+3), filesType, targetUrl, count);
							this.loopNumTemp++ ;
						}
					}
				}).catch(() => {
					this.scanLoading = false;
					/* eslint-disable */
					loopImportList[index].state = '失败';
					/* eslint-enable */	
					// this.resolveIng[val.path] = false;
					this.$store.dispatch('getIsInLoaing', {state: false});
					if (index === loopImportList.length - 1) {
						count-- ;
						if(count > 0){
							this.loopImportDm(this.checkedTableData.slice(3*this.loopNumTemp, 3*this.loopNumTemp+3), filesType, targetUrl, count);
							this.loopNumTemp++ ;
						}
					}
				});
			});
    },
    saveFilesRes() {
			if (this.tempResultArr.length === this.checkedTableData.length){
				this.scanLoading = false;
				// this.progressScan = false;
				this.$message.success({ message: '入库完成', showClose: true });
				this.$store.dispatch('getIsInLoaing', {state: false});
			}
    },
    // 初始化存放位置树
    initTree() {
      getFoldersByParent(-1).then((res) => {
        res.forEach((val) => {
          if (val.empty === false) {
            getFoldersByParent(val.id).then((result) => {              
              /* eslint-disable */
							val.children = result;
							/* eslint-enable */
              this.zNodes[0].children = res;
              this.zTreeObj = $.fn.zTree.init($('#filterMountTree'), this.setting, this.zNodes);
            });
          } else {
						this.zNodes[0].children = res;
			this.zTreeObj.addNodes(val, 0, [], true);
			this.zTreeObj = $.fn.zTree.init($('#filterMountTree'), this.setting, this.zNodes);
          }
        });
      });
    },
    async zTreeExpand(treeId, treeNode) {
			if (treeNode) {				
				this.mountPointPId = treeNode.id;
				this.mountPointId = treeNode.id;
				treeNode.children.forEach((val) => {
					if (val.empty === false) {
						getFoldersByParent(val.id).then((result) => {
							if (!val.children) {
								this.zTreeObj.addNodes(val, 0, result, true);
							}
						});
					} else {
						this.zTreeObj.addNodes(val, 0, [], true);
					}
				});
			}
    },
    async zTreeClick(event, treeId, treeNode) {
			if (treeNode) {
				this.getMountPath(treeNode.id);
				this.getMountPointNodeName(treeNode.fileName);
				if (!this.mountPointName) this.mountPointName = '全部文件';
				this.mountPointPId = treeNode.id;
				this.mountPointId = treeNode.id;
				treeNode.children.forEach((val) => {
					if (val.empty === false) {
						getFoldersByParent(val.id).then((result) => {
							if (!val.children) {
								this.zTreeObj.addNodes(val, 0, result, true);
							}
						});
					} else {
						this.zTreeObj.addNodes(val, 0, [], true);
					}
				});
				this.zTreeObj.expandNode(treeNode);
			}
		},
		// 获取挂载点的path
		async getMountPath(id) {
			const targetUrl = await getFilePath(id);
			if (this.serverType.resultInfo === 'WindowsSingleVersion') {
				this.mountPointName = targetUrl.slice(targetUrl.indexOf(`dir\\${this.userInfo.id}`) + Number(5+this.userInfo.id.length), targetUrl.length);
				this.getMountPointNodeName(targetUrl.slice(targetUrl.lastIndexOf('\\') + 1, targetUrl.length));
			} else {
				this.mountPointName = targetUrl.slice(targetUrl.indexOf(`dir/${this.userInfo.id}`) + Number(5+this.userInfo.id.length), targetUrl.length);
				this.getMountPointNodeName(targetUrl.slice(targetUrl.lastIndexOf('/') + 1, targetUrl.length));
			}
		},
		// 获取挂在点的显示name
		getMountPointNodeName(name) {
			if (name == this.userInfo.id) {
				this.mountPointNodeName = '全部文件';
			} else {
				this.mountPointNodeName = name;
			}
		},
    // 将选中的条目进行入库
    changeFun(val) {
			this.checkedTableData = val;
    },
    // 入库记录 获取指定时间段内的数据
    async storageMonitorList() {
			this.monitorTableData = [];
			if (this.monitorTableTime) {
				const monitorTable = await storageMonitor(this.dateTypeTab(this.monitorTableTime[0]), this.dateTypeTab(this.monitorTableTime[1]), this.currentPage, this.pageSize);
				this.monitorTotal = monitorTable.resultInfo.totalElements;
				const monitorTablePath = monitorTable.resultInfo.content;
				// 利用id获取文件路径
				await monitorTablePath.forEach((res, index) => {
					getFilePath(res.id).then(val => {						
						/* eslint-disable */
						res.path = val;
						/* eslint-enable */
						if (index === (monitorTablePath.length - 1) || index === 20) {
							this.monitorTableData = monitorTablePath;
						}
					});
				});
			} else {
				this.$message.warning({ message: '请输入完整参数', showClose: true });
			}
    },
    // 页码切换
    currentChange(val) {
			this.currentPage = val;
			this.storageMonitorList();
    },
    // 时间格式转换
    dateTypeTab(date) {
			const year = date.getFullYear();
			const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
			const date1 = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
			return year+"-"+month+"-"+date1;
		},
  },
};
</script>

<style lang="scss">
.scan-storage-wrap{
	.scan-storage-title{
		width: 100%;
		height: 50px;
		padding-left: 25px;
		.el-breadcrumb{
			line-height: 50px !important;
			font-size: 17px;
		}
	}
	.el-aside {
		width: 250px !important;
		height: calc(100vh - 60px);
		background-color: rgb(243, 244, 248);
		color: #5C5C5E;
		text-align: center;
		line-height: 200px;
		h3 {
			line-height: 50px;
			margin: 0;
			color: #6e7173;
			border-bottom: 1px solid #c0c4cc;
			font-size: 17px;
			position: relative;
			i {
				line-height: 41px;
				text-align: left;
				position: absolute;
				top: 6px;
				left: 43px;
			}
		}
	}
	.el-submenu__title {
		text-align: left;
	}
	.el-main {
		background-color: #FFFFFF;
		color: #5C5C5E;		
		padding: 0px;
	}
	.scan-storage-el-main {
		.el-main {
			height: calc(100vh - 60px);			
			a , .el-breadcrumb{
				display: inline-block;
				color: #606266;
				line-height: 25px;
			}
			.el-dialog__body {
				padding: 20px;
				padding-bottom: 15px;
				> div {
					text-align: center;
				}
				>div button {
					margin-top: 10px;
				}						
				.check-storage-file {
					position: absolute;
					bottom: 15px;
					right: 50px;
				}
			}
			.enter-storage-file {
				text-align: center;
			}
			.enter-storage-file button {
				margin-top:15px;
				margin-left: 10px;
			}
			#filterMountTree {
				height: calc(100vh - 397px);				
				min-height: 373px;
				overflow-y: scroll;
			}
			.scan-storage-head {
				height: 50px;
				text-align: left !important;
				.scan-storage-file {
					width: 70%;
					height: 50px;
					padding-left: 15px;
					overflow-y: auto;
					span {
						cursor: pointer;
					}
				}
				.el-input {
					width: 30%;
					float: right;
				}
			}
			th {
				padding: 7px 0px;
				.cell {
					line-height: 30px;
					font-size: 13px;
				}
			}
		}
		.scan-storage-base {
			color: #626a77;
			font-size: 17px;
			line-height: 50px;
			margin-left: 10px;
			font-weight: 550;
			text-align: left;
		}		
		.el-table__body-wrapper {
			height: calc(100vh - 327px);
			overflow-y: scroll;
		}
		.el-pagination {
			padding: 17px 0px 0px 0px;
		}
		.checked-table-data {
			th>.cell {
				padding-left: 25px;
			}
			.cell {
				padding-left: 27px;
			}
		}
	}
	.scan-manage-select {
		height: 52px;
    border-top: 1px solid rgb(235, 238, 245);
    border-bottom: 1px solid rgb(235, 238, 245);
    text-align: left;
    line-height: 48px;
    >span {
			margin-left: 25px;
			font-weight: 700;
			color: #606266;
			font-size: 16px;
    }
    .scan-manage-import-model {
			display: inline-block;
			margin-left: 30px;
    }
    .el-input {
			width: 200px;
			margin-left: 15px;
    }
    .el-input__inner {
			margin-right: 20px;
			height: 32px !important;
    }
    button {
			display: inline-block;
    }
    .sevice-icon-font {
			font-size: 14px;
    }
	}
	.scan-manage-select-btn {
		@extend .scan-manage-select;
		border-top-width: 0px;
		line-height: 50px;
		button {
			margin-left: 25px;
		}
		button:last-of-type {
			margin-left: 10px;
		}
	}
	.scan-manage-select2 {
		@extend .scan-manage-select;
		height: 60px;
	}
	.el-dialog__header {
		background: #24A5F8;
		padding: 0px;
		line-height: 50px;
		text-align: center;
	}
	.el-dialog__title {
		font-size: 16px;
		color: #ffffff;
	}
	.el-dialog__headerbtn .el-dialog__close {
		color: #ffffff;
	}
	.el-dialog__headerbtn {
		top: 16px;
		line-height: normal;
	}
	.monitor-table-progress {
		position: relative;
		margin-top: 10px;
		border-top: 1px solid #ebeef5;
		.el-progress--circle {
			position: absolute;
			z-index: 10000;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		.el-table__body-wrapper {
			height: calc(100vh - 507px);
			min-height: 267px;
		}
		.set-color {
			color: #ffd02f;
		}
		.el-table td, .el-table th.is-leaf {
			cursor: pointer;
		}
		.el-table .cell {
			i {
				font-size: 20px;
			}
		}
	}
	.el-dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0 !important;
	}
}
</style>
<style>
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
	color: #606266;
}
.fa-lg {
	margin-right: 5px;
}
</style>