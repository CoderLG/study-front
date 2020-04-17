<template>
  <div id="app">
   
    <!-- <v-study></v-study> -->


    <!-- <v-life v-if="flag"></v-life>
    <button @click="flag = !flag">销毁/挂载life</button> -->
    

    <!-- 父组件传值给子组件 组件上绑定属性，值在下方定义-->
    <v-resource :title="title" :sayHello="sayHello"  :home="this"  ref="header"></v-resource>


    <!-- 
      父组件 获取子组件信息
      1. 在组件上加 ref="header"
      2. 调用 this.$refs.header.childrenFun();
          childrenFun()为子组件方法
    -->
    <button @click="getChildMess">  getChildMess</button>

  </div>

</template>

<script>
import study from "./components/Study.vue";
import life from "./components/Life.vue";
import UseVieResource from "./components/UseVueResource.vue";

export default {
  name: "app",
  data() {
    return{
      flag: true,
      title: "什么东西都可以传",
    }
  },
  methods:{
    sayHello(){
        alert("hello")
    }, getChildMess(){
      // 父组件 获取子组件信息
      console.log("父组件 获取子组件信息");
      this.$refs.header.childrenFun();
      
    },parentFun(){
      console.log("this is parent Fun");
    }

  },
  components:{
      "v-study":study,
      "v-life":life,
      "v-resource":UseVieResource,
  }
};
</script>

<style lang="scss">
</style>
