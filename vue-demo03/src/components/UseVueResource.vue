

<template>
  <div id="base">
    <h2>{{mess}}</h2>
    <button @click="resourceFun">resource</button>
    <button @click="axiosFun">axios</button>

    <!-- 子组件 获取父组件信息 1-->
    <button @click="getParenetMess">getParenetMess1</button>

    <!-- 
        子组件 获取父组件信息 2
         调用 this.$parent.parentFun();
            parentFun()为父组件方法
    -->
    <button @click="getParentMess2">getParentMess2</button>


        <!-- 可以通过广播数据的方式，实心非父子组件的传值-->
  </div>
</template>

<script>
/**
 * 后台请求工具
 * vue-resource 是vue官方提供的
 * axios
 *
 * vue-resource使用
 * 1.cnpm install vue-resource --save
 * 2.在main.js 中引入 VueResource
 *     import VueResource  from "vue-resource"
 *      Vue.use(VueResource);
 * 3.直接在方法中使用 this.$http.get
 *
 *
 * axios使用
 * 1.引入
 * import Axios from "axios";
 * 2.调用
 *  Axios.get()
 *
 *
 *
 */
import Axios from "axios";

export default {
  data() {
    return {
      mess: "bash"
    };
  },
  methods: {
    resourceFun() {
      // GET /someUrl
      this.$http
        .get(
          "http://192.168.4.38:8310/placeservice/api/v1/query/dlbm=0300000050000014"
        )
        .then(
          response => {
            // get body data
            console.log(response);
          },
          response => {
            // error callback
          }
        );
    },
    axiosFun() {
      Axios.get(
        "http://192.168.4.38:8310/placeservice/api/v1/query/dlbm=0300000050000014"
      )
        .then(function(response) {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
          console.log("always executed");
        });
    },
    getParenetMess() {
      // 子组件获取父子组件信息 1
      console.log(this.title);
      this.sayHello();
      console.log(this.home.flag);
    },
    childrenFun() {
      //
      console.log("this is children Fun");
    },
    getParentMess2() {
      this.$parent.parentFun();
    }
  },
  props: ["title", "sayHello", "home"]
};
</script>

// scoped css的作用域
<style lang="scss" scoped>
h2 {
  color: red;
}
</style>

