import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 传感器
 */
export declare class SensorGraphic extends GraphicItem {
    protected _opt: SensorGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 传感器
     * ```
     * 示例代码:
     * let opt = new GV.SensorGraphicOpt();
     * opt.color = 'rgba(255,255,255,0.1)';
     * opt.position = new GV.GeoPoint(0, 0, 0);
     * let sensor = new GV.SensorGraphic(opt);
     * viewer.graphicLayer.add(sensor);
     *
     * ```
     */
    constructor(option: SensorGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 设置位置
     * @param value 位置
     */
    /**
    * 获取位置
    * @returns
    */
    position: GeoPoint;
    /**
     * 设置传感器的半径
     * @param 传感器半径
     */
    /**
    * 获取传感器的半径
    * @returns
    */
    radius: number;
    /**
     * 设置传感器颜色
     * @param value 传感器颜色
     */
    /**
    * 获取传感器颜色
    * @returns
    */
    color: string;
    /**
     * 设置线的颜色
     */
    /**
    * 获取线的颜色
    * @returns
    */
    lineColor: string;
    /**
     * 获取水平半角
     * @returns
     */
    readonly xHalfAngle: number;
    /**
     * 获取垂直半角
     * @returns
     */
    readonly yHalfAngle: number;
    /**
     * 设置扫描面颜色
     * @param value 扫描面颜色
     */
    /**
    * 获取扫描面颜色
    * @returns
    */
    scanPlaneColor: any;
    /**
     * 获取扫描面显隐
     * @returns
     */
    readonly showScanPlane: boolean;
    /**
     * 设置扫描面速率
     * @param value 扫描面速率
     */
    /**
    * 获取扫描面速率
    * @returns
    */
    scanPlaneRate: any;
    readonly clampToGround: true;
}
/**
 * 数据约束及默认值
 */
export declare class SensorGraphicOpt extends GraphicItemOpt {
    /**位置 */
    position: GeoPoint;
    /**半径 */
    radius?: number;
    /**扫描速率 */
    scanPlaneRate?: number;
    /**是否显示扫描面 */
    showScanPlane?: boolean;
    /**水平半角 */
    xHalfAngle?: number;
    /**垂直半角 */
    yHalfAngle?: number;
    /**扫描面颜色 */
    scanPlaneColor?: string;
    /**颜色 */
    color?: string;
    /**线颜色 */
    lineColor?: string;
}
