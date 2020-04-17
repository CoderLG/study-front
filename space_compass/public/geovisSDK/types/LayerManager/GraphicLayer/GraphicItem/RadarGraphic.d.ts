import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 雷达扫描波
 */
export declare class RadarGraphic extends GraphicItem {
    protected _opt: RadarGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 雷达扫描波
     * ```
     * 示例代码:
     * let opt = new GV.RadarGraphicOpt();
     * opt.position = new GV.GeoPoint(114, 32);
     * let obj1 = new GV.RadarGraphic(opt);
     * viewer.graphicLayer.add(obj1);
     *
     * ```
     */
    constructor(option: RadarGraphicOpt);
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
     * @param value 位置 说明：高度值无效
     */
    /**
    * 获取位置
    * @returns
    */
    position: GeoPoint;
    /**
    * 设置外部颜色
    *  @param value 外部颜色
    */
    /**
    * 获取外部颜色
    * @returns
    */
    outerColor: string;
    /**
     * 设置外部透明度
     * @param value 外部透明度
     */
    /**
    * 获取外部透明度
    * @returns
    */
    outerAlpha: number;
    /**
     * 设置内锥颜色
     * @param value 内锥颜色
     */
    /**
    * 获取内锥颜色
    * @returns
    */
    innerColor: string;
    /**
     * 设置内锥透明度
     * @param value 内锥透明度
     */
    /**
    * 获取内锥透明度
    * @returns
    */
    innerAlhpa: number;
    /**
     * 设置线条颜色
     * @param value 线条颜色
     */
    /**
    * 获取线条颜色
    * @returns
    */
    lineColor: string;
    /**
     * 设置水平起始角度
     * @param value 水平起始角度
     */
    /**
    * 获取水平起始角度
    * @returns
    */
    startAngle: number;
    /**
     * 设置水平终止角
     * @param value 水平终止角
     */
    /**
    * 获取水平终止角
    * @returns
    */
    endAngle: number;
    /**
     * 设置垂直起始角
     * @param value 垂直起始角
     */
    /**
    * 获取垂直起始角
    * @returns
    */
    vStartAngle: number;
    /**
     * 设置垂直终止角
     *  @param value 垂直终止角
     */
    /**
    * 获取垂直终止角
    * @returns
    */
    vEndAngle: number;
    /**
     * 设置扫面半径，单位米
     * @param value 扫面半径
     */
    /**
    * 获取扫面半径
    * @returns
    */
    radius: number;
    /**
     * 设置扫描角度
     * @param value 扫描角度
     */
    /**
    * 获取扫描角度
    * @returns
    */
    scanAngle: number;
    /**
     * 设置扫描颜色
     * @param value 扫描颜色
     */
    /**
    * 获取扫描颜色
    * @returns
    */
    scanColor: string;
    /**
     * 是否往复扫描
     * @param value 标志位
     */
    /**
    * 获取标志位
    * @returns
    */
    scanReserve: boolean;
    /**
     * 设置扫描速度,一秒转多少度，越大转越快
     * @param value 扫描速度
     */
    /**
    * 获取扫描速度
    * @returns
    */
    scanSpeed: number;
    /**
     * 是否显示扫描
     * @param value 是否显示
     */
    /**
    * 获取扫描显隐
    * @returns
    */
    showScan: boolean;
}
/**
 * 数据约束及默认值
 */
export declare class RadarGraphicOpt extends GraphicItemOpt {
    /**
     * 位置
     */
    position: GeoPoint;
    /**
     * 外部颜色
     */
    outerColor?: string;
    /**
     * 外部透明度
     */
    outerAlpha?: number;
    /**
     * 内锥颜色
     */
    innerColor?: string;
    /**
     * 内锥透明度
     */
    innerAlhpa?: number;
    /**
     * 水平起始角度
     */
    startAngle?: number;
    /**
     * 水平终止角
     */
    endAngle?: number;
    /**
     * 垂直起始角
     */
    vStartAngle?: number;
    /**
     * 垂直终止角
     */
    vEndAngle?: number;
    /**
     * 扫面半径，单位米
     */
    radius?: number;
    /**
     * 扫描角度
     */
    scanAngle?: number;
    /**
     * 扫描颜色
     */
    scanColor?: string;
    /**
     * 往复扫描
     */
    scanReserve?: boolean;
    /**
     * 扫描速度,一秒转多少度，越大转越快
     */
    scanSpeed?: number;
    /**
     * 是否显示扫描
     */
    showScan?: boolean;
    /**
     * 线条颜色
     */
    lineColor?: string;
}
