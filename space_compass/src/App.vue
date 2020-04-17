<template>
  <div id="app">
    <keep-alive>
            <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
}
</style>
