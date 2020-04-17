import { GeoVector3 } from '../../LayerManager/SatelliteLayer/GeoVector3';
/**
 * 算法类
 */
export default class GxMath {
    /**
     * 计算两个点的方位角
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return 返回方位角
     */
    static calculateAngle(x1: any, y1: any, x2: any, y2: any): number;
    static calculateOrbitLocalc(currentTime: Date, tle1: string, tle2: string, period: number, pointcount?: number): Array<GeoVector3>;
    static calculatePeriod(tle1: string, tle2: string): number;
    /**
     * 根据笛卡尔坐标换算经度
     * @param cartesian3
     * @param viewer
     */
    static getLongitudeByCartesian3(cartesian3: Cesium.Cartesian3, viewer: Cesium.Viewer): number;
    /**
     * 根据笛卡尔坐标换算维度
     */
    static getLatitudeByCartesian3(cartesian3: Cesium.Cartesian3, viewer: Cesium.Viewer): number;
    /**
     * 根据笛卡儿直角坐标算高度
     */
    static getHeightByCartesian3(cartesian3: Cesium.Cartesian3, viewer: Cesium.Viewer): number;
    /**
     * 根据设置高度返回笛卡尔坐标
     * @param cartesian3
     * @param height
     */
    static getHeightdefineByXYZ(cartesian3: Cesium.Cartesian3, height: number, viewer: Cesium.Viewer): Cesium.Cartesian3;
    /**
   * 转换屏幕坐标（来自于鼠标的各种event）为地理坐标
   * @param {screen position from mouse} screenPos
   * @private
   */
    static screen2lonlat(screenPos: any, viewer: any): number[];
    /**
     * 转换地理坐标到cesium cartesian
     * @param {地理坐标} lonlat
     * @param {高度值} height
     * @private
     */
    static lonlat2Cartesian(lonlat: any, height?: number): Cesium.Cartesian3;
    /**
     *
     * @private
     */
    static lonlathei2Cartesian(lonlathei: any): Cesium.Cartesian3;
    /**
     *
     * @private
     */
    static cartesian2lonlat(cartesian: any): number[];
    /**
     *
     * @private
     */
    static screen2Cartesian(screenPos: any, height: number, viewer: any): Cesium.Cartesian3;
    /**
     * @param {* java script date} date
     * @Return iso8601 date string like 2012-04-30T12:00:00Z
     * @private
     */
    static dateToString(date: any): string;
    /**
     * 将date日期转换为Julian日期对象，如果date为空，则获取当前时间
     * @param {JulianDate} date
     * @private
     */
    static julianDate(date?: any): Cesium.JulianDate;
    /**
     * @private
     * @param cart1
     * @param cart2
     */
    static distance(cart1: any, cart2: any): number;
    /**
     *
     * @private
     */
    static cartesian2turfPoint(cartesian: any): any;
    /**
     *
     * @private
     */
    static turfGeometry2Cartesians(g: any, height?: number): any;
    /**
     *
     * @private
     */
    static deleteEnts(ents: any, viewer: any): void;
}
