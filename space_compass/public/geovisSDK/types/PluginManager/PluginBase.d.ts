/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * （抽象类）插件基类 {@link Tool} 与 {@link Widget} 继承自该类
 */
declare class PluginBase {
    _active: boolean;
    _type: any;
    _name: any;
    _path: any;
    /**
     * @param {Object} optins 插件初始配置对象
     * @param {PluginManager} pluginManager 插件对应的插件管理对象
     */
    constructor(optins: any, pluginManager: any);
    /**
     * 获取状态
     * @type {boolean}
     * @readonly
     */
    readonly active: boolean;
    /**
     * 工具还是挂件
     * @type {stirng}
     * @readonly
     */
    readonly type: any;
    /**
     * 获得插件名(注册时的名字)
     * @type {string}
     * @readonly
     */
    readonly name: any;
    /**
     * 获取插件包的原始路径
     */
    readonly path: any;
    /**
     * 开启插件时调用
     */
    init(): void;
    /**
     * 关闭插件时调用
     */
    close(): void;
    /**
     * 获取数据
     */
    getPluginData(): void;
    /**
     * 设置数据
     */
    setPluginData(data: any): void;
    /**
     * 获取相对路径
     * @param {string} file
     */
    formatURL(file: any): any;
    _init(): void;
    _close(): void;
}
export default PluginBase;
