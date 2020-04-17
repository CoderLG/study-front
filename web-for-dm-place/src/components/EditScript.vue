<template>
  <div class="edit-script-wrap">
    <div class="edit-script-title">
      <ul>
        <li @click='goBack'>返回</li>
      </ul>
    </div>
    <div class="edit-script-main" ref='editScriptMain'>
      <pre class="edit-script-content" v-loading='loading'>
        <code contenteditable="true" class="XML" ref='textarea'>
          <!-- {{ styleCon }} -->
        </code>
      </pre><br />
      <div class="edit-style-btn">
        <el-button size='small' type="primary" plain @click='verifyScript'>校验</el-button>
        <div>
          <el-button size='small' type="primary" @click='isHeatUpdate'>保存</el-button>
          <el-button size='small' plain @click='goBack'>取消</el-button>
        </div>
      </div>
      <div v-show='errorInfo' :class="{'edit-style-success-info': errorInfo === 'SUCCESS',
       'edit-style-error-info': errorInfo !== 'SUCCESS'}">{{ errorInfo }}</div>
    </div>    
  </div>
</template>

<script>
import $ from 'jquery';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { getScriptContent, verifyScriptContent, editScriptContent, getScriptTaskInfo, siddhiHeatUpdate } from '../api/scriptApi';

export default {
  data() {
    return {
      loading: false,
      errorInfo: null, // 错误内容
    };
  },
  props: ['scriptId', 'refresh'],
  watch: {
    refresh() {
      // 获取对应的内容
      this.loading = true;
      getScriptContent(this.scriptId).then((res) => {
        this.$refs.textarea.innerText = res.data;
        $('pre code').each((i, block) => {
          hljs.highlightBlock(block);
        });
        this.loading = false;
      })
    },
  },
  methods: {
    // 返回
    goBack() {
      this.$emit('goBack');
      this.errorInfo = null;
    },
    // 校验
    verifyScript() {
      verifyScriptContent(this.$refs.textarea.innerText).then(() => {
        this.$message.success('脚本校验成功');
        this.errorInfo = 'SUCCESS';
        setTimeout(() => {
          this.$refs.editScriptMain.scrollTop = this.$refs.editScriptMain.scrollHeight;
        }, 500);
      }).catch(res => {
        this.errorInfo = res;
        setTimeout(() => {
          this.$refs.editScriptMain.scrollTop = this.$refs.editScriptMain.scrollHeight;
        }, 500);
      });
    },
    // 保存 更新样式
    saveScript(isTrue) {
      editScriptContent({
        'id': this.scriptId,
        'fileContent': this.$refs.textarea.innerText
      }).then(() => {
        this.$message.success('脚本编辑成功');
        this.errorInfo = 'SUCCESS';
        setTimeout(() => {
          this.$refs.editScriptMain.scrollTop = this.$refs.editScriptMain.scrollHeight;
        }, 500);
        // 正在运行的脚本 编辑成功之后 需要热更新
        if (isTrue) {
          siddhiHeatUpdate(this.scriptId);
        }
      }).catch(res => {
        this.errorInfo = res;
        setTimeout(() => {
          this.$refs.editScriptMain.scrollTop = this.$refs.editScriptMain.scrollHeight;
        }, 500);
      });
    },
    // 是否需要热更新脚本
    isHeatUpdate() {
      getScriptTaskInfo(this.scriptId).then((res) => {
        if (res.data && res.data[0].isRunning === 1) {
          this.$confirm('由该脚本发布的任务正在运行中，请确认是否要更新脚本?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.saveScript(true);            
          });
        } else {
          this.saveScript(false);
        }
      })
    },
  },
};
</script>

<style lang="scss">
.edit-script-wrap {
  overflow: hidden;
  .edit-script-title {
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
  .edit-script-main {
    height: calc(100vh - 132px);
    margin-top: 22px;
    overflow: auto;
    .edit-script-content {
      width: calc(100vw - 300px);
      height: calc(100vh - 215px);
      line-height: 22px;
      color: wheat;
      display: inline-block;
      vertical-align: text-top;
      background: #282c34;
      margin: 0px;
      border-radius: 5px;
      font-size: 15px;
      margin: 0 auto;
      display: block;
      > code {
        height: calc(100vh - 236px);
        border-radius: 5px;
      }
    }
    .edit-style-error-info {
      width: calc(100vw - 300px);
      margin: 25px auto;
      border: 1px solid #FBC4C4;
      background: #FEF0F0;
      color: #F66C6C;
      border-radius: 5px;
      line-height: 35px;
      padding: 10px;
    }
    .edit-style-success-info {
      @extend .edit-style-error-info;
      border: 1px solid #91C76D;
      background: #F2F9EC;
      color: #91C76D;
    }
    .edit-style-btn {
      position: relative;
      > button {
        margin-left: 25px;
        position: absolute;
      }
      > div {
        text-align: center;
      }
    }
  }
}
</style>