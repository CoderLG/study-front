import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 扫描波
 */
export declare class ScanGraphic extends GraphicItem {
    protected _opt: ScanGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 扫描波
     * ```
     * 示例代码:
     * let opt = new GV.ScanGraphicOpt();
     * opt.scanColor = 'rgba(255.0, 0.0, 0.0, 1)';
     * opt.position = new GV.GeoPoint(80, 31.85, 0);
     * opt.radius = 1500;
     * radarScan = new GV.ScanGraphic(opt);
     * viewer.graphicLayer.add(radarScan);
     *
     * ```
     */
    constructor(option: ScanGraphicOpt);
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
     * 获取扫描板颜色
     * @returns
     */
    /**
    * 设置扫描板颜色
    * @param  value 颜色
    */
    scanColor: string;
    /**
     * 获取扫描波边框线颜色
     * @returns
     */
    /**
    * 设置扫描波边框线颜色
    * @param  value 颜色
    */
    scanLineColor: string;
    /**
     * 获取扫描半径
     * @returns
     */
    /**
    * 设置扫描半径
    * @param  value 扫描半径
    */
    radius: number;
    /**
     *  获取中心点位置
     * @returns
     */
    /**
    * 设置中心点位置
    * @param  val 中心点位置
    */
    position: GeoPoint;
    /**
     *  获取速度
     * @returns
     */
    /**
    * 设置速度
    * @param  val
    */
    speed: number;
    /**
     *  获取速度
     * @returns
     */
    /**
    * 设置速度
    * @param  val 中心点位置
    */
    lineWidth: number;
    readonly clampToGround: true;
}
/**
 * 数据约束及默认值
 */
export declare class ScanGraphicOpt extends GraphicItemOpt {
    /**扫描板颜色 */
    scanColor?: string;
    /**扫描波边框线颜色 */
    scanLineColor?: string;
    /**扫描半径 */
    radius?: number;
    /**扫描速度 范围 >0&&<=5 */
    speed?: number;
    /**中心点位置 */
    position: GeoPoint;
    /**扫描波边框线宽度 */
    lineWidth?: number;
}
