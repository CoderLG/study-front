<template>
  <div class="upload"></div>
</template>

<script>
import 'jquery';
import WebUploader from 'webuploader';
import { checkSameName, checkFileMd5, checkChunk, mergeChunks } from '../api/fileApi';
// import config from '../config';
import { getToken } from '../utils/auth';
import store from '../store';


/* eslint-disable */
WebUploader.Runtime.Html5.Dnd.prototype._traverseDirectoryTree = function( entry, results ) {
  var Base = WebUploader.Base;
  var deferred = Base.Deferred(),
    me = this;
  if ( entry.isFile ) {
    entry.file(function( file ) {
      file.fullPath = entry.fullPath;
      results.push( file );
      deferred.resolve();
    });
  } else if ( entry.isDirectory ) {
    entry.createReader().readEntries(function( entries ) {
      var len = entries.length,
        promises = [],
        arr = [],    // 为了保证顺序。
        i;

      for ( i = 0; i < len; i++ ) {
        promises.push( me._traverseDirectoryTree(
          entries[ i ], arr ) );
      }

      Base.when.apply( Base, promises ).then(function() {
        results.push.apply( results, arr );
        deferred.resolve();
      }, deferred.reject );
    });
  }

  return deferred.promise();
},
WebUploader.Uploader.register({
  'before-send-file': 'beforeSendFile', // 整个文件上传前
  'before-send': 'preSend', // 每个文件上传前
  'after-send-file': 'afterSendFile', // 分片上传完毕
}, {async beforeSendFile(file) {
    const deferred = WebUploader.Deferred();
    try {
      const owner = this.owner;
      //判断当前目录是否已经存在该文件
      const isInFolder = await checkSameName(file.name, file.parentId);
      if(isInFolder.code === 0) {
        owner.skipFile(file);
        owner.cancelFile(file);
        file.setStatus('error', '上传数据名称在该目录下重复');
        deferred.reject();
        return;
      }
      //获取md5码
      const md5Length = 10 * 1024 * 1024;
      const val = await owner.md5File(file.source, 0, md5Length);
      file.wholeMd5 = val;
      const isExist = await checkFileMd5(val, file.size, md5Length);
      if (isExist.code === 1) {
        owner.skipFile(file);
      }
      deferred.resolve();
    } catch (e) {
      console.log(e);
      file.setStatus('error', e);
      deferred.reject(e);
    }
    return deferred.promise();
  },
  async preSend(block) {
    const deferred = WebUploader.Deferred();
    try {
      if (block.md5Ok) {
        // 分块存在，跳过
        deferred.reject();
      } else {
        const owner = this.owner;
        const md5CheckLength = 1 * 1024 * 1024;
        if (!block.md5) {
          const blockMd5 = await owner.md5File(block.blob, 0, md5CheckLength);
          block.md5 = blockMd5;
        }
        const isExist = await checkChunk(block.file.wholeMd5, block.md5, md5CheckLength,
          block.chunk, block.chunks, block.start, block.end);
        if (isExist.code === 1) {
          block.md5Ok = true;
          // 分块存在，跳过
          deferred.reject();
        } else {
          // 分块不存在或不完整，重新发送该分块内容
          deferred.resolve();
        }
      }
    } catch (e) {
      block.file.setStatus('error', '分块上传时,服务器出错');
      this.owner.cancelFile(block.file);
      deferred.reject('分块上传失败');
      throw e;
    }
    return deferred.promise();
  },
  async afterSendFile(file) {
    const deferred = WebUploader.Deferred();
    try {
      if (file.getStatus() !== 'error') {
        file.statusText = '文件合并中';
        const relativePath = file.source.source.webkitRelativePath || file.source.source.fullPath;
        // 原始影像单独解析 根据上传时用户选择的类型定义filesType 不再根据后缀判断
        let filesType = store.getters.fileType;
        const lastModifiedDateDefined = new Date();
        const isMergeOk = await mergeChunks(file.wholeMd5, file.name,
          file.ext, lastModifiedDateDefined, file.size, file.type, file.parentId, relativePath, file.filesType);
        if (!isMergeOk) {
          this.owner.cancelFile(file);
          file.setStatus('error', '文件在目前目录已存在,无需重复传输');
          deferred.reject();
        } else {
          file.statusText = null;
          deferred.resolve();
        }
      } else {
        deferred.reject();
      }
    } catch (e) {
      file.setStatus('error', e);
      deferred.reject();
      throw e;
    }
    return deferred.promise();
  },
});

export default {
  name: 'vue-upload',
  props: {
    uploadMethod: {
      type: String,
      default: 'POST',
    },
    // 上传地址
    url: {
      type: String,
      default: '',
    },
    // 上传最大数量 默认为100
    fileNumLimit: {
      type: Number,
      default: undefined,
    },
    // 大小限制 默认2M
    fileSingleSizeLimit: {
      type: Number,
      default: 50 * 1024 * 1024,
    },
    // 上传时传给后端的参数，一般为token，key等
    formData: {
      type: Object,
      default: null,
    },
    // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
    keyGenerator: {
      type: Function,
      default(file) {
        const currentTime = new Date().getTime();
        const key = `${currentTime}.${file.name}`;
        return key;
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    // 上传按钮ID
    uploadButton: {
      type: String,
      default: '',
    },
    uploadType: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      uploader: null,
    };
  },
  mounted() {
    const $uploadButton = WebUploader.$(this.uploadButton);
    if ($uploadButton.length < 0 || $uploadButton.hasClass('webuploader-container')) {
      return;
    }
    this.initWebUpload();
  },
  methods: {
    formatSize(value) {
      return WebUploader.Base.formatSize(value);
    },
    getNotDelFiles() {
      return this.uploader.getFiles(
        'inited',
        'queued',
        'progress',
        'complete',
        'error',
        'interrupt',
        'invalid');
    },
    getCompleteFiles() {
      return this.uploader.getFiles('complete');
    },
    initWebUpload() {
      this.uploader = WebUploader.create({
        auto: true, // 选完文件后，是否自动上传
        swf: '/static/webuploader-0.1.5/Uploader.swf', // swf文件路径
        server: this.url, // 文件接收服务端
        pick: {
          id: this.uploadButton, // 选择文件的按钮
          multiple: this.multiple, // 是否多文件上传 默认false
          label: '',
        },
        dnd: document.body,
        disableGlobalDnd: true,
        paste: document.body,
        fileNumLimit: this.fileNumLimit, // 限制上传个数
        formData: this.formData, // 上传所需参数
        chunked: true, // 分片上传
        // chunkSize: this.fileSingleSizeLimit, // 如果允许分片 分多大一片 默认是5M
        duplicate: true, // 重复上传
        prepareNextFile: true,
        method: this.uploadMethod,
        thumb: {
          width: 70,
          height: 70,
          // 图片质量，只有type为`image/jpeg`的时候才有效。
          quality: 70,
          // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
          allowMagnify: false,
          // 是否允许裁剪。
          crop: true,
          // 为空的话则保留原有图片格式。
          // 否则强制转换成指定的类型。
        },
      });
      // 当有文件被添加进队列的时候，添加到页面预览
      this.uploader.on('fileQueued', (file) => {
        this.$emit('fileChange', file);
      });
      this.uploader.on('filesQueued', (files) => {
        this.$emit('filesChange', files);
      });
      this.uploader.on('uploadStart', (file) => {
        this.$emit('uploadStart', file);
      });
      // 文件上传过程中创建进度条实时显示。
      this.uploader.on('uploadProgress', (file, percentage) => {
        file.statusText = '';
        this.$emit('progress', file, percentage);
      });

      this.uploader.on('uploadSuccess', (file, response) => {
        this.$emit('success', file, response);
      });
      this.uploader.on('uploadAccept', (file, response) => {
        this.$emit('uploadAccept', file, response);
      });
      this.uploader.on('uploadFinished', () => {
        this.$emit('uploadFinished');
      });
      this.uploader.on('uploadError', (file, reason) => {
        this.$emit('uploadError', file, reason === 'server' ? '服务异常' : reason);
      });

      this.uploader.on('error', (type) => {
        let errorMessage = '';
        if (type === 'F_EXCEED_SIZE') {
          errorMessage = `文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1024)}M`;
        } else if (type === 'Q_EXCEED_NUM_LIMIT') {
          errorMessage = '文件上传已达到最大上限数';
        } else if (type === 'Q_TYPE_DENIED') {
          errorMessage = '上传文件为空';
        } else {
          errorMessage = `上传出错！请检查后重新上传！错误代码${type}`;
        }
        this.$emit('error', errorMessage);
      });

      this.uploader.on('uploadComplete', (file, response) => {
        this.$emit('complete', file, response);
      });

      this.uploader.on('uploadBeforeSend', (object, data, headers) => {
        headers.Authorization = getToken();
        data.wholeMd5 = object.file.wholeMd5;
        data.start = object.start;
        data.end = object.end;
        this.$emit('uploadBeforeSend', object, data, headers);
      });
    },

    upload(file) {
      this.uploader.upload(file);
    },
    stop(file) {
      this.uploader.stop(file);
    },
    // 取消并中断文件上传
    cancelFile(file) {
      this.uploader.cancelFile(file);
    },
    // 在队列中移除文件
    removeFile(file, bool) {
      this.uploader.removeFile(file, bool);
    },
    getAccept(accept) {
      switch (accept) {
        case 'images':
          return {
            title: 'Images',
            extensions: 'tif,tiff,img',
            mimeTypes: '.tif,.tiff,.img',
          };
        case 'original':
          return {
            title: 'Original',
            extensions: 'gz,rar,zip',
            mimeTypes: '.gz,.rar,.zip',
          };
        case 'vector':
          return {
            title: 'Zip',
            extensions: 'zip',
            mimeTypes: '.zip',
          };
        case 'terrain':
          return {
            title: 'Terrain',
            extensions: 'tif,tiff',
            mimeTypes: '.tif,.tiff',
          };
        case 'tiltphoto':
          return {
            title: 'Tiltphoto',
            extensions: 'zip',
            mimeTypes: '.zip',
          };
        case 'text':
          return {
            title: 'Text',
            extensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt,json',
            mimeTypes: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.json',
          };
        case 'picture':
          return {
            title: 'Picture',
            extensions: 'jpg,jpeg,png',
            mimeTypes: '.jpg,.jpeg,.png',
          };
        case 'video':
          return {
            title: 'Video',
            extensions: 'mp4',
            mimeTypes: '.mp4',
          };
        default:
          return accept;
      }
    },
  },
};
</script>

<style lang="scss">
  .webuploader-container {
    position: relative;
  }

  .webuploader-element-invisible {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }

  .webuploader-pick {
    position: relative;
    display: inline-block;
    cursor: pointer;
    background: none;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }

  .webuploader-pick-hover {
    background: none;
  }

  .webuploader-pick-disable {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
