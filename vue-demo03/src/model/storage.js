// 封装local storage 本地存储方法

// 模块化

//本地缓存
var storage ={
    set(key,value){
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key){
        return JSON.parse(localStorage.getItem(key));
    },remove(key){
        localStorage.removeItem(key)
        




    }
}

export default storage;