<template>
  <div id="timeLineWrap" class="timeline-component">    
    <div class="timeline-wrap"></div>
    <div class="timeline-wrap-wrap"></div>
    <div class="timeline-btn">
      <button @click='action'>
        <i v-show='isPlay' class="fa fa-2x fa-pause-circle-o" aria-hidden="true" title='暂停'></i>
        <i v-show='!isPlay' class="fa fa-2x fa-play-circle-o" aria-hidden="true" title='播放'></i>      
      </button>
      <button @click='refresh'>
        <i class="fa fa-2x fa-retweet" aria-hidden="true" title='重来'></i>
      </button>
      <p>{{ currentDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  data() {
    return {
      isPlay: true,
    }
  },
  props: {
    currentDate: {
      type: String,
    }
  },
  methods: {
    action() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$emit('startPlay');
      } else {
        this.$emit('stopPlay');
      }
    },
    refresh() {
      this.isPlay = true;
      this.$emit('refreshPlay');
    },
  },
};
</script>

<style lang="scss" scoped>
.timeline-component {
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 20px;
  width: calc(100vw - 500px);
  height: 70px;
  background: black;
  border-bottom: 1px solid #888888;
}
.timeline-btn {
  position: absolute;
  bottom: 3px;
  left: 50%;
  button {
    i {
      color: white;
      letter-spacing: 5px;
    }
  }
  > p {
    float: right;
    line-height: 25px;
    color: white;
    font-size: 16px;
  }
}
.timeline-wrap-wrap {
  width: 100%;
  height: 37px;
  position: absolute;
  top: 0;
}
</style>
