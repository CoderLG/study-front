import { GeoPoint } from './GeoPoint';
import { GeoCanvas } from '../Viewer/GeoCanvas';
/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 通用计算类</br>
 * @see <a href='../../../examples/gallery/editor.html#spaceDis'>距离面积计算</a>
 * @see <a href='../../../examples/gallery/editor.html#paowu'>曲线点集计算</a>
 *
 */
export declare class Calculate {
    static calculateMatrix(parentGesture: any, childGesture: any): {
        position: GeoPoint;
        heading: number;
        pitch: number;
        roll: number;
    };
    static matrixToHdr(uMMatrix: Cesium.Matrix4): {
        position: GeoPoint;
        heading: number;
        pitch: number;
        roll: number;
    };
    private static _surfaceDistance;
    private static _getAngle;
    private static _getBearing;
    /**
     * 获取点集的空间面积
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.spaceArea(geoPoints);
     * ```
     */
    static spaceArea(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取点集的贴地面积
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.groundArea(geoPoints);
     * ```
     */
    static groundArea(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取点集的贴地距离
     * @param geoPoints 点集信息
     * @param viewer
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.groundDistance(geoPoints);
     * ```
     */
    static groundDistance(geoPoints: Array<GeoPoint>, viewer: Cesium.Viewer): number;
    /**
     * 获取点集的空间距离
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.spaceDistance(geoPoints);
     * ```
     */
    static spaceDistance(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取二次贝塞尔曲线点集坐标
     * @param geoPoints 控制点集信息
     * @param step  点集数量 默认值：100 范围：>=2 && <= 100
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.getBezier(geoPoints);
     * ```
     */
    static getBezier(geoPoints: Array<GeoPoint>, step?: number): Array<GeoPoint>;
    /**
     * 获取抛物线点集坐标
     * @param fromPoint 起始点
     * @param toPoint   终止点
     * @param factor    曲率（抛物线高度）范围：>=1000 && <= 10000000
     * @param step      点集数量 默认值：100 范围：>=2 && <= 100
     * ```
     *  示例代码：
     *  let result = GV.Calculate.getParabola({lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},50000);
     * ```
     */
    static getParabola(fromPoint: GeoPoint, toPoint: GeoPoint, factor: number, step?: number): any[];
    /**
    * 判断经纬度点是否在多边形区域内
    * @param point 被判断点
    * @param polygon 多边形区域位置数组
    * @returns
    * @see  <a href='../../../examples/gallery/editor.html#simlarScene'>模拟场景</a>
    */
    static pointInPolygon(point: GeoPoint, polygon: Array<GeoPoint>): boolean;
    /**
     * 判断经纬度点是否在圆形区域内
     * @param point 被判断点
     * @param centerPoint 圆心位置点
     * @param radius 圆半径，单位：米
     * @returns
     * @see  <a href='../../../examples/gallery/editor.html#simlarScene'>模拟场景</a>
     */
    static pointInCircle(point: GeoPoint, centerPoint: GeoPoint, radius: number): boolean;
    /**
     * 获取椭圆点集
     * @param center 中心坐标
     * @param xSemiAxis 长轴 单位：米
     * @param ySemiAxis 短轴 单位：米
     * @param steps 点集数量
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getEllipsePositions(center: GeoPoint, xSemiAxis: number, ySemiAxis: number, steps?: number): GeoPoint[];
    /**
     * 获取圆形点集
     * @param center 圆心坐标
     * @param radius 圆半径 单位：米
     * @param steps 点集数量
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getCirclePositions(center: GeoPoint, radius: number, steps?: number): GeoPoint[];
    /**
     * 获取扇形点集
     * @param center 圆心坐标
     * @param radius 圆半径 单位：米
     * @param startAngle 起始角度
     * @param endAngle 终止角度
     * @param steps 点集数量
     * @returns
     */
    static getSectorPositions(center: GeoPoint, radius: number, startAngle?: number, endAngle?: number): GeoPoint[];
    /**
     * 获取两个多边形相交区域
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getIntersect(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
     * 获取两个多边形相并区域
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getUnion(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
     * 获取第一个多边形和第二个多边形作差的点集
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getDiffer(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
   * 计算两个点的方位角
   * @param point1 位置点
   * @param point2 位置点
   * @return 返回方位角
   */
    static getAngle(point1: GeoPoint, point2: GeoPoint): number;
    /**
     * 水平面剔除判断
     * @param point 位置点
     * @param viewer
     */
    static pointInEarthSide(point: GeoPoint, viewer: GeoCanvas): boolean;
    /**
* 计算面积
*/
    static test(pos: any): any[];
    static rotateAngle(vf: any, vt: any): number;
    static getRes(pos: any): void;
}
