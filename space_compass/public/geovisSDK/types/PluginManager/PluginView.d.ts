/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * 插件界面工厂提供提供插件界面加载卸载功能
 */
export declare class PluginView {
    _container: any;
    _url: any;
    _viewStyle: any;
    state: string;
    _instance: HTMLIFrameElement;
    containerDiv: HTMLDivElement;
    /**
      * 创建iframe插件视图
      * @param {object} options
      * @param {Element} options.container 插件界面的父界面
      * @param {String} options.url 插件的html路径
      * @param {object}  [options.viewStyle=undefined] 插件区域配置当使用默认配置时覆盖整个父界面
      * @param {options} [options.viewStyle.width] 插件的宽度
      * @param {options} [options.viewStyle.height] 插件高度
      * @param {options} [options.viewStyle.left] 插件左边距
      * @param {options} [options.viewStyle.top] 插件上边距
      * @param {options} [options.viewStyle.right] 插件右边距
      * @param {options} [options.viewStyle.bottom] 插件下边距
      * @return {PluginView}
      */
    constructor(options: any);
    /**
     * 获取界面实例
     * @return {element}
     */
    readonly instance: HTMLIFrameElement;
    /**
     * 显示页面
     */
    show(): void;
    /**
     * 隐藏页面
     */
    hide(): void;
    /**
     * 关闭页面
     */
    close(): void;
    /**
     * 设置相机监听事件div
     * @param {viewer} viewer 三维球对象
     * @param {element} div 要替换的标签对象
     */
    setMouseBaseElement(viewer: any, div: any): void;
    /**
     * 恢复相机监听div
     * @param {Viewer} viewer
     */
    resetMouseBaseElement(viewer: any): void;
    _createIframe(url: any): HTMLIFrameElement;
    _createDiv(options: any): HTMLDivElement;
    _setStylePro(element: any, options: any): void;
}
