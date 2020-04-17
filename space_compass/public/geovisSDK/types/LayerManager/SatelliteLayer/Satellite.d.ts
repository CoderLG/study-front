import { Item } from "../../Core/Item";
import { GeoPoint } from "../../Utils/GeoPoint";
/**
 * @类别 需手动创建，然后添加到卫星图层类中<br>
 * @描述 卫星类，提供了更改卫星的属性接口<br>
 * @see  http://localhost:8088/examples/gallery/editor.html#satelliteShow
 */
export declare class Satellite extends Item {
    private _sampleProperty;
    protected _name: string;
    protected _id: any;
    private _image;
    /**扫描带颜色 */
    private _groundTrackColor;
    /**轨道颜色 */
    private _orbitColor;
    /**卫星罩颜色 */
    private _coverColor;
    /**棱锥开合角 */
    private _halfAngle;
    /**卫星罩类型 */
    private _type;
    private _viewer;
    /**卫星entity的Map */
    private _entitiesMap;
    /**轨道数据 */
    private _orbitPositions;
    /**当前时间 */
    private _currentTime;
    /**当前位置 地球坐标系*/
    private _currentPosition;
    /**卫星两根数 */
    private _tle;
    private _priod;
    private _endTime;
    private rectangularSensorGraphics;
    /**
     * 初始化
     * @param options 卫星属性类
     * @returns
     * ```
     * 示例代码：
     *  let sateOpt = new GV.SatelliteOpt(
     * `GF-1
     * 1 39766U 14029A   19051.88312325 -.00000394  00000-0 -45830-4 0  9997
     * 2 39766  97.9206 150.4086 0001551  85.1013 275.0382 14.79467694256344`);
     * let satellite = new GV.Satellite(sateOpt);
     * viewer.satelliteLayer.add(satellite);
     *
     * ```
     */
    constructor(options: SatelliteOpt);
    /**
    * 获取类型
    */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 启用卫星属性
     * @param {string} componentName 属性名称
     * ```
     * 示例代码：
     * satellite.enableComponent(SatelliteComponents.Orbit);
     *
     * ```
     */
    enableComponent(componentName: string): void;
    /**
     * 禁用卫星属性
     * @param {string} componentName 属性名称
     * ```
     * 示例代码：
     * satellite.disableComponent(SatelliteComponents.Orbit);
     *
     * ```
     */
    disableComponent(componentName: string): void;
    /**
     * 创建卫星图标
     */
    private createSatImage;
    /**
     * 创建Label
     */
    private createLabel;
    /**
     * 创建轨道
     */
    private createOrbit;
    /**
     * 创建圆锥波
     */
    private createCone;
    /**
     * 创建棱锥波
     */
    private createSquareCone;
    /**
     * 创建地面扫描
     */
    private createGroundTrack;
    private calculatePosition;
    /**
     * 一个轨道周期的坐标，影响轨道线条,卫星位置
     */
    private positions;
    /**更新位置、姿态 */
    private currentTime;
    /**
     * 获取id
     * @readonly
     * @memberof Satellite
     *
     */
    readonly id: string;
    /**
     * 初始化
     * @param viewer 视图对象
     */
    initItem(viewer: Cesium.Viewer): any;
    /**
     * 监听更新函数
     * @param event
     * @param tle1
     * @param tle2
     * @param priod
     */
    private listenerFun;
    /**
     * 移除卫星
     */
    destroyItem(): void;
    /**
    * 设置卫星轨道颜色
    * @param   val 卫星轨道颜色
    * ```
    * 示例代码：
    * satellite.orbitColor='#ffffff';
    * ```
    *
    */
    orbitColor: string;
    /**
     * 设置卫星地面覆盖颜色
     * @param   val 卫星地面覆盖颜色
     * ```
     * 示例代码：
     * satellite.groundTrackColor='#ffffff'；
     * ```
     *
     */
    groundTrackColor: string;
    /**
     * 设置卫星罩颜色
     * @param   val 波束颜色
     * ```
     * 示例代码：
     * satellite.coverColor='#ffffff';
     * ```
     *
     */
    coverColor: string;
    /**
     * 获取卫星名称
     * @return {String}  卫星名称
     * ```
     * 示例代码：
     * let name=satellite.name;
     * ```
     *
     */
    readonly name: string;
    readonly position: GeoPoint;
}
export declare class SatelliteOpt {
    /**卫星两根数 */
    tle: string;
    /**轨道颜色 */
    orbitColor?: string;
    /**轨道追踪颜色 */
    orbitTrackColor?: string;
    /**扫描带颜色 */
    groundTrackColor?: string;
    /**卫星罩颜色 */
    coverColor?: string;
    type?: StatelliteEnum;
    constructor(tle: string, orbitColor?: string, orbitTrackColor?: string, groundTrackColor?: string, coverColor?: string, type?: StatelliteEnum);
}
/**
 * 卫星罩类型枚举
 */
export declare enum StatelliteEnum {
    /**圆锥罩 */
    'conic' = 1,
    /**棱锥罩 */
    'square' = 2
}
