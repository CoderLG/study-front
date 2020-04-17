/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类
 * @描述 通用基础方法集
 */
export declare class Util {
    /**
     * 传入相对于GEOVIS.web.js的相对路径获得完整资源路径
     * @param url 相对与GEOVIS.web.js路径
     * @return 完整路径
     * ```
     * 示例代码：
     * let url = GV.Util.formatUrlByBaseJs('./data.png')
     * ```
     */
    static formatUrlByBaseJs(url: string): string;
    private static getBaseUrlFromGEOVISScript;
    /**
     * 生成唯一的随机id
     * @return
     */
    static createGuid(): string;
    /**
     * 返回默认参数
     * @param a
     * @param b
     */
    static defaultValue(a: any, b: any): any;
    /**
     * 路径拼接根据原始路径及原始路径的相对路径获得完整路径
     * @param originPath 原始路径
     * @param file 原始路径的相对路径
     */
    static formatURLByCustom(originPath: string, file: string): string;
    /**
     * 路径拼接获得当前html的原始路径与相对路径拼接获得完整路径
     * @param file 相对于html的相对路径
     */
    static formatURL(file: string): string;
    /**
     * 同步获取text
     * @param path
     */
    static syncGetText(path: any): string;
    /**
     * 同步获取json数据
     */
    static syncGetJson(path: any): any;
    static formatURL2(originPath: any, file: any): any;
    /**
     * 将html标签转成canvas
     * @param container html容器
     * @param option 配置
     * @param callback 反馈
     */
    static html2canvas(container: any, option: any, callback?: any): void;
    /**
    * 将EPSG：3857坐标转换为EPSG：4326坐标系下坐标
    * @param x
    * @param y
    */
    static epsg3857To4326(x: any, y: any): any;
    /**
     * 将EPSG：4326坐标转换为EPSG：3857坐标系下坐标
     * @param lon 经度（degree）
     * @param lat 维度（degree）
     */
    static epsg4326To3857(lon: any, lat: any): any;
    /**
    * 根据地理编码获取范围
    * @param {Number} x The tile X coordinate.
    * @param {Number} y The tile Y coordinate.
    * @param {Number} level The tile level.
    * @returns {Cesium.Rectangle} the area Cartographic position
    */
    static getRectangleFromcode(level: any, x: any, y: any): Cesium.Rectangle;
    /**
     * 根据地理编码获取范围
     * @param viewer
     * @param {Cartesian} mousePos The screen positon
    * @returns {object} the area Cartographic position
    * {
        "level": 5,
        "x": 2,
        "y": x,
        "resolution":"9公里"
                
       }
     */
    static getCodeFromScreenPosition(viewer: any, mousePos: any): {
        "level": number;
        "x": number;
        "y": number;
        "resolution": any;
    };
    /**
     * 前置整数
     */
    static PrefixInteger(num: any, n: any): string;
}
