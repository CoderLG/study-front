<template>
  <div id="study">

    <input type="text" v-model="inputValus" />
    <button @click="addOne">增加</button>

    <hr/>
    <h2>刚提交</h2>
    <ul>
      <li v-for="(item,index) in mess" :key="index" v-if="!item.flag">
        <input type="checkbox" v-model="item.flag" @change="saveList()" />
        {{index}}---{{ item.dd}}
        <button @click="delOne(index)">删除</button>
      </li>
    </ul>

    <hr />
    <h2>已完成</h2>
    <ul>
      <li v-for="(item,index) in mess" :key="index" v-if="item.flag">
        <input type="checkbox" v-model="item.flag" @change="saveList()" />
        {{index}}---{{item.dd}}
        <button @click="delOne(index)">删除</button>
      </li>
    </ul>
    <hr>

    <v-base></v-base>

    
  </div>

</template>

<script>
// 组件之前写的代码
import storage from "../model/storage.js";
import base from "./Base.vue";

export default {
  name: "study",
  data() {
    return {
      inputValus: "",
      mess: []
    };
  },
  methods: {
    addOne: function() {
      console.log(this.inputValus);
      this.mess.push({ dd: this.inputValus, flag: false });
      this.inputValus = "";
      storage.set("list", this.mess);
    },
    delOne(index) {
      // alert(index)
      this.mess.splice(index, 1);
      storage.set("list", this.mess);
    },
    saveList() {
      storage.set("list", this.mess);
    }
  },


  mounted() {
    // 页面刷新vue的时候运行 类似与init

    // console.log("aa");
    this.mess = storage.get("list");
    if (this.mess == null) this.mess = [];
  },
  components:{
      "v-base":base,
  }
};
</script>

<style lang="scss">
</style>
