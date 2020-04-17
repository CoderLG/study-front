/**
 * @类别 需要用户创建的类
 * @描述 GeoPoint经纬度坐标对象</br>
 * 提供了经纬度坐标系和各种坐标系之间的相互转换
 */
export declare class GeoPoint {
    /**
     * 经度
     */
    lon: number;
    /**
     * 维度
     */
    lat: number;
    /**
     * 高度
     */
    alt?: number;
    constructor(lon: number, lat: number, alt?: number);
    toJson(): number[];
    private static _transformlat;
    private static _transformlng;
    /**
     * Cartesian3坐标转GeoPoint（经纬度）坐标
     * @param Cart3Point
     * @return
     * ```
     * 示例代码：
     * let geoPoint =  GV.GeoPoint.fromCartesian3(new Cesium.Cartesian3(8065, 3650, 150000))
     * ```
     */
    static fromCartesian3(Cart3Point: Cesium.Cartesian3): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转Cartesian3坐标
     * @param geoPoint
     * @return
     * ```
     * 示例代码：
     * let cart3 = GV.GeoPoint.toCartesian3({lon:80,lat:40,alt:50000})
     * ```
     */
    static toCartesian3(geoPoint: GeoPoint): Cesium.Cartesian3;
    /**
     * 墨卡托坐标转GeoPoint（经纬度）坐标
     * @param x
     * @param y
     * @return
     * ```
     * 示例代码：
     * let geoPoint = GV.GeoPoint.fromMercator(8905559.263461886, 4865942.279503175)
     * ```
     */
    static fromMercator(x: number, y: number): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转墨卡托坐标
     * @param geoPoint
     * @return
     * ```
     * 示例代码：
     * let mct = GV.GeoPoint.toMercator({lon:80,lat:40,alt:50000})
     * ```
     */
    static toMercator(geoPoint: GeoPoint): object;
    /**
     * 屏幕坐标转GeoPoint（经纬度）坐标（注：屏幕坐标范围必须在地球显示范围内）
     * @param x 屏幕x轴坐标
     * @param y 屏幕y轴坐标
     * @param viewer
     * @return
     * ```
     * 示例代码：
     * let mct = GV.GeoPoint.fromScreen(50,40,viewer)
     * ```
     */
    static fromScreen(x: number, y: number, viewer: Cesium.Viewer): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转屏幕坐标
     * @param geoPoint
     * @param viewer
     * @return
     * ```
     * 示例代码：
     * let cart2 = GV.GeoPoint.toScreen({lon:8,lat:40,alt:5000},viewer)
     * ```
     */
    static toScreen(geoPoint: GeoPoint, viewer: Cesium.Viewer): Cesium.Cartesian2;
    /**
     * 火星坐标转GeoPoint（经纬度）坐标
     * @param gcjPoint {x:y:}
     * @return
     * ```
     * 示例代码：
     * let geoPoint =  GV.GeoPoint.fromGCJ02({x:8.013949658676198, y:39.99879386130122})
     * ```
     */
    static fromGCJ02(gcjPoint: any): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转火星坐标
     * @param geoPoint
     * @return
     * ```
     * 示例代码：
     * let gcj = GV.GeoPoint.toGCJ02({lon:8,lat:40,alt:5000});
     * ```
     */
    static toGCJ02(geoPoint: GeoPoint): object;
    /**
     * geoPoint转换成数组
     * @param geoPoint 点信息
     * @return
     * ```
     * 示例代码：
     * let res = GV.GeoPoint.pack({lon:8,lat:40,alt:5000})
     * ```
     */
    static pack(geoPoint: GeoPoint): Array<number>;
    /**
     * 数组转换成geoPoint
     * @param arr 数组信息
     * @return
     * ```
     * 示例代码：
     * let res =  GV.GeoPoint.unpack([50,45,1555])
     * ```
     */
    static unpack(arr: any): GeoPoint;
    /**
     * 批量geoPoint转换成数组
     * @param geoPoints 点数组信息
     * @return
     * ```
     * 示例代码：
     * let res = GV.GeoPoint.packArray([{lon:8,lat:40,alt:5000},{lon:45,lat:30,alt:55}])
     * ```
     */
    static packArray(geoPoints: Array<GeoPoint>): Array<Array<number>>;
    /**
     * 批量数组转换成geoPoint
     * @param arr 数组信息
     * @return
     * ```
     * 示例代码：
     * let res =  GV.GeoPoint.unpackArray([[50,45,1555],[22,54,4545]])
     * ```
     */
    static unpackArray(arr: any): Array<GeoPoint>;
    /**
     * 判断经纬坐标点是否相等
     * @param point1
     * @param point2
     */
    static isEqual(point1: GeoPoint, point2: GeoPoint): boolean;
    /**
     * 判断经纬坐标数组是否相等
     * @param arr1
     * @param arr2
     */
    static isEqualArr(arr1: Array<GeoPoint>, arr2: Array<GeoPoint>): boolean;
    /**
     * 深度复制
     */
    static clone(point: GeoPoint, res?: GeoPoint): GeoPoint;
    /**
     * 度转度分秒
     * @param value
     */
    private static _formatDegree;
    /**
     * 度分秒转度数
     * @param value
     */
    private static _degreeConvertBack;
    /**
     * 度转换度分秒
     * @param point
     */
    static formatDegree(point: GeoPoint): FormatGeoPoint;
    static degreeConvertBack(value: FormatGeoPoint): GeoPoint;
}
/**
 * 度分秒形势表示坐标
 */
export declare class FormatGeoPoint {
    /**
     * 经度
     */
    lon: {
        direction: string /**方位 west 或 east*/;
        degrees: number /**度 */;
        minutes: number /**分 */;
        seconds: number; /**秒 */
    };
    /**
     * 纬度
     */
    lat: {
        direction: string /**方位 south 或 north*/;
        degrees: number /**度 */;
        minutes: number /**分 */;
        seconds: number; /**秒 */
    };
}
