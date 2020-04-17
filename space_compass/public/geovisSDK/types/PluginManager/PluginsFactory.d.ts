/**
 * 插件工厂提供插件注册与销毁
 */
declare class PluginsFactory {
    _pluginMap: Map<any, any>;
    constructor();
    /**
     * 根据插件配置文件路径注册插件
     * @param {options|string} pluginOptions 插件配置
     * @param {string} pluginOptions.name 插件注册名
     * @param {string} pluginOptions.path 插件路径
     * @param {string} pluginOptions.js 插件类名
     */
    registerPlugin(pluginOptions: any): any;
    /**
     * 根据配置文件注册插件
     */
    _registerPlugin(options: any): any;
    /**
     * 同步动态添加script
     * @param {String} path 插件路径
     */
    _appendScript(path: any): boolean;
    /**
     * 根据配置获取插件原始路径
     * @param {string|object} pluginOptions
     */
    _getPluginPath(pluginOptions: any): any;
    /**
     * 注销插件
     * @param {String} name 主要插件名称
     */
    destroyPlugin(name: any): void;
    /**
     * 创建插件对象（插件管理对象内部使用）
     * @param {String} name 插件名称
     * @param {Object} options 插件初始化参数
     * @param {pluginManager} PluginManager 要创建的插件的插件管理对象
     * @return {PluginBase} 插件对象
     */
    createPlugin(name: any, options: any, pluginManager: any): any;
}
declare let pluginsFactory: PluginsFactory;
export { pluginsFactory };
