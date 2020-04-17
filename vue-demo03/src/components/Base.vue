

<template>
    <div id="base">
        <h2>{{mess}}</h2>
    </div>
</template>

<script>
// 组件入门
// 写一个组件
// 引入 别名
// 引用

export default {
    data(){
        return{
            mess:"bash"
        }
    }
}
</script>

// scoped css的作用域
<style lang="scss" scoped>
    h2{
        color: red;
    }
</style>

