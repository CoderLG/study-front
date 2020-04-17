/**
 * 作者：梁帆
 * 日期：2019-04-09
 */
/**
 * 插件主题
 */
declare class PluginThemeManager {
    _themeStyle: {};
    constructor();
    /**
     * 设置所有样式
     */
    themeStyle: any;
    createStyle(styleParam: any, doc: any): void;
    createAllStyle(styleParam: any): void;
    /**
     * 插入新样式
     * @param {document} doc
     * @param {object} styleParam
     */
    generateDocStyle(doc: any): void;
    _generateDocStyle(doc: any, styleParam: any): void;
    _getThemeStyle(styleParam: any): {};
    _getStyleCss(tempStyle: any): string;
    toCssStyle(str: any): any;
    colorRgb(col: any): string;
}
declare let pluginThemeManager: PluginThemeManager;
export default pluginThemeManager;
