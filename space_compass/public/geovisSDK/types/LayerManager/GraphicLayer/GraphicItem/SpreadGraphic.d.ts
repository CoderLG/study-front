import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 扩散波
 */
export declare class SpreadGraphic extends GraphicItem {
    protected _opt: SpreadGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 扩散波
     * ```
     * 示例代码:
     * let opt = new GV.SpreadGraphicOpt();
     * opt.scanColor = 'rgba(255.0, 0.0, 0.0, 1)';
     * opt.position = new GV.GeoPoint(80, 31.85, 0);
     * opt.radius = 1500;
     * opt.duration = 4000;
     * circleScan = new GV.SpreadGraphic(opt);
     * viewer.graphicLayer.add(circleScan);
     *
     * ```
     */
    constructor(option: SpreadGraphicOpt);
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
     * 获取扩散颜色
     * @returns
     */
    /**
    * 设置扩散颜色
    * @param  value 颜色
    */
    scanColor: string;
    /**
     * 获取扩散半径
     * @returns
     */
    /**
    * 设置扩散半径
    * @param  value 扫描半径
    */
    radius: number;
    /**
     * 获取扩散一周的时间 单位：毫秒
     * @returns
     */
    /**
    * 设置扩散一周的时间 单位：毫秒
    * @param  value 扩散一周的时间
    */
    duration: number;
    /**
     *  获取中心点位置
     * @returns
     */
    /**
    * 设置中心点位置
    * @param  val 中心点位置
    */
    position: GeoPoint;
}
/**
 * 数据约束及默认值
 */
export declare class SpreadGraphicOpt extends GraphicItemOpt {
    /**扫描颜色 */
    scanColor?: string;
    /**扩散半径 */
    radius?: number;
    /**扩散一周的时间 单位：毫秒 */
    duration?: number;
    /**中心点位置 */
    position: GeoPoint;
}
