/* eslint-disable */
const service = axios.create();
service.defaults.withCredentials = false;
// 添加相应拦截器
service.interceptors.response.use((response) => {
  // 当返回中自定义的代码有权限问题时, 进行相应的控制
  const res = response.data;
  if (response.status !== 200 && res.status !== 200) {
    this.$message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000,
    });
  } else {
    return res;
  }
  return res;
}, (error) => {
  let message = '操作异常';
  switch (error.response.data.status) {
    case 404:
      message = '访问资源未发现';
      break;
    case 400:
      message = '错误的请求';
      break;
    default:
      message = error.response.data.message || message;
      break;
  }
  this.$message({
    message,
    type: 'error',
    duration: 5 * 1000,
  });
  return Promise.reject(error);
});
Vue.component('resource-select', {
  props: {
    url: {
      type: String,
      default: 'http://192.168.31.23:8110',
    },
    token: {
      type: String,
    },
    checkbox: {
      type: Boolean,
      default: true,
    }
  },
  created() {
    // 使每个请求都携带token
    if (this.token) {
      service.defaults.headers.common['Authorization'] = this.token;
    } else {
      this.$message.error('未设置token');
    }
  },
  data() {
    return {
      visible: false,
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
      },
      radio: false,
      radioData: null,
      separator: '/',
      name:'',
      data:[],
    };
  },
  computed:{
    tree(){
      return this.$refs.resourceTree;
    }
  },
  methods: {
    ok() {
      this.hidden();
      this.$emit('ok', this.getCheckedPaths());
    },
    async show() {
      this.visible = true;
      const saveRootPath = await service.get(`${this.url}/api/v1/files/saveRootPath`);
      this.separator = saveRootPath.indexOf('\\')>-1?'\\':'/';
      this.data = [{ name: '全部文件', dir: true, leaf: false, path: saveRootPath, disabled: true }];
    },
    hidden() {
      this.visible = false;
    },
    radioChange(value, item){
      this.radioData = item;
    },
    getCheckedPaths() {
      return this.checkbox ? (this.tree ? this.tree.getCheckedNodes(true) : []) : this.radioData;
    },
    nodeCollapse(data, node){
      node.loaded = false;
    },
    async loadNode(node, resolve) {
      try {
        if (node.level > 0) {
          const list = await service.get(`${this.url}/api/v1/files/children/${node.data.id || -1}`);
          return resolve(list.map((item) => {
            item.leaf = !item.dir;
            if (item.dir) {
              item.disabled = true;
            }
            item.path = node.data.path + this.separator + item.name;
            return item;
          }));
          return resolve([]);
        }
        return resolve([]);
      } catch (e) {
        return resolve([]);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name === '全部文件' || data.name.indexOf(value) !== -1;
    },
    filterText() {
      this.tree.filter(this.name);
    },
  },
  template: '<el-dialog  :visible.sync="visible" title="文件选择" class="resource-select-root">' +
  ' <el-input style="width: 240px" size="mini" v-model="name" placeholder="名称" @keyup.enter.native="filterText">' +
  '   <el-button slot="append" icon="el-icon-search" @click="filterText"></el-button>' +
  ' </el-input>'+
  '<el-tree ref="resourceTree" :data="data" :load="loadNode" lazy :show-checkbox="checkbox" @node-collapse="nodeCollapse" :filter-node-method="filterNode" :props="props1" highlight-current>' +
  '<span slot-scope="{ node, data }">' +
  '<el-radio class="resource-tree-radio" v-model="radio" :label="node.id" v-if="!checkbox" :disabled="data.dir" @change="radioChange($event, data)"></el-radio>' +
  '<el-icon :class="data.dir?\'el-icon-goods\':\'el-icon-document\'"></el-icon>' +
  '<span>{{ node.label }}</span>' +
  '</span>' +
  '</el-tree>' +
  '<span slot="footer">' +
  '<el-button type="primary" @click="ok">确 定</el-button>' +
  '<el-button @click="hidden">取 消</el-button>' +
  '</span>' +
  '</el-dialog>',
});
