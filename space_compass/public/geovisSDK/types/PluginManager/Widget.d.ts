/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
import PluginBase from './PluginBase';
/**
 * (挂件类基类)需要用户继承该类实现自己的类。
 * 由{@link PluginManager}统一管理.
 * 继承挂件的类之间是不互斥的（多了个挂件可以同时开启）
 * @augments PluginBase
 */
export declare class Widget extends PluginBase {
    /**
     * @param {PluginManager} prents
     * @param {Object} optins
     */
    constructor(prents: any, optins: any);
}
