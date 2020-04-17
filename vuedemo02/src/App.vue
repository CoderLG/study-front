<template>
  <div id="app">
   hello world
   <h3>{{school.name}}</h3>
   <hr>
   <ul>
     <li v-for="item in school.class" :key="item">{{item}}</li>
   </ul>

   <input type="text" v-model="msg">
   <h2>{{msg}}</h2>

  <!-- <button @click="getMess"></button> -->

   
  </div>
</template>

<script>
import func from '../vue-temp/vue-editor-bridge'

// mvvm
// 数据双向绑定
// 数据改变影响视图
// 视图改变影响数据



// 把这个组件暴露出去
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      school: {
        name: "金沙江",
        class: ["class1","class2","class3"],
      }
    }
  },
  // methods:{
  //   getMess:function(){
  //     alert(this.msg)
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
