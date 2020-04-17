/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
import PluginBase from './PluginBase';
/**
 * (工具类基类)需要用户继承该类实现自己的类。
 * 由{@link PluginManager}统一管理.
 * 继承工具的类之间是相互互斥的（一次只能开启一个工具）
 * @augments PluginBase
 */
export declare class Tool extends PluginBase {
    _isHide: boolean;
    /**
     * @param {PluginManager} prents
     * @param {Object} optins
     */
    constructor(prents: any, optins: any);
    /**
     * 界面关闭且数据可用时为true
     * @type {boolean}
     * @readonly
     */
    readonly isHide: boolean;
    /**
     * 工具开启时为非隐藏状态
     */
    _init(): void;
    /**
     * 隐藏界面和清除交互逻辑
     */
    _hide(): void;
    hide(): any;
    /**
     * 完全关闭工具
     */
    _close(): void;
}
