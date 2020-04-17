/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
import { Event } from '../Core/Event';
/**
 * 插件管理类
 * 对继承自{@link Tool} 与 {@link Widget}的类进行管理
 */
declare class PluginManager extends Event {
    _plugins: Map<any, any>;
    _currentTool: any;
    _pluginInitOptins: any;
    constructor(pluginInitOptins: any);
    /**
     * 添加插件到插件管理对象
     * @param {string} name 要添加的插件名称
     * @return {plugin} 返回插件对象
     */
    addPlugin(name: any): any;
    /**
     * 删除插件到插件管理对象
     * @param {string | Plugin} plugin 要删除的插件的名称或对象
     */
    removePlugin(plugin: any): void;
    /**
     * 切换工具
     * @param {string | Tool} tool 要切换的插件的名称或对象
     */
    setCurrentTool(tool: any): void;
    /**
     * 彻底关闭清除工具
     */
    closeTool(tool: any): void;
    /**
     * 清空全部工具状态
     */
    closeAllTool(): void;
    /**
     * 开启插件
     * @param {widget | string} 挂件名称或挂件对象
     */
    usingWidget(widget: any): any;
    /**
     * 开启插件
     * @param {widget | string} 挂件名称或挂件对象
     */
    unusingWidget(widget: any): any;
    /**
     * 获取所有插件
     * @return {[Plugin]}
     */
    getAllPlugin(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getAllTools(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getAllWidgets(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getAllUsingWidgets(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getCurrentTool(): any;
}
export default PluginManager;
