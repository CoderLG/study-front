
<template>
    <div id="life">
        <h2>{{mess}}</h2>
    </div>
</template>

<script>

  /**
   * 生命周期函数
   * 又叫生命周期钩子
   **/

export default {
    data(){
        return{
            mess:"mess"
        }
    },
    beforeCreate(){
        console.log("实例刚刚被创建1");
    },created(){
        console.log("实例已经创建完成2");
    }
    ,beforeMount(){
        console.log("模板编译之前3");
    }
    ,mounted(){
        //重点
        //编译完成 可以请求数据
        console.log("模板编译完成4");
    }
     ,beforeUpdate(){
        console.log("数据更新之前");
    }
    ,updated(){
        console.log("数据更新完毕");
    }
    ,beforeDestroy(){
        //重点
        //实例销毁之前保存数据
        console.log("实例销毁之前");
    }
    ,destroyed(){
        console.log("销毁完成");
    }
}
</script>

// scoped css的作用域
<style lang="scss" scoped>
    h2{
        color: red;
    }
</style>

