import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 动态波纹
 */
export declare class DynamicRippleGraphic extends GraphicItem {
    protected _opt: DynamicRippleGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 动态波纹
     * ```
     * 示例代码:
     * let opt = new GV.DynamicRippleGraphicOpt();
     * opt.position = new GV.GeoPoint(80, 30, 200000);
     * let test = new GV.DynamicRippleGraphic(opt);
     * viewer.graphicLayer.add(test);
     *
     * ```
     */
    constructor(option: DynamicRippleGraphicOpt);
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
     * 设置半径
     * @param value 半径
     */
    /**
    * 获取半径
    * @returns
    */
    radius: number;
    /**
     * 设置颜色
     * @param value 颜色
     */
    /**
    * 获取颜色
    * @returns
    */
    color: string;
    /**
     * 轮廓线是否开启
     * @param value 标志位
     */
    /**
    * 获取轮廓线是否开启
    * @returns
    */
    outline: boolean;
    /**
     * 设置轮廓线颜色
     * @param value 轮廓线颜色
     */
    /**
    * 获取轮廓线颜色
    * @returns
    */
    outlineColor: string;
    /**
     * 只读属性只允许贴地
     */
    readonly clampToGround: true;
}
/**
 * 数据约束及默认值
 */
export declare class DynamicRippleGraphicOpt extends GraphicItemOpt {
    /**位置 */
    position: GeoPoint;
    /**半径 */
    radius?: number;
    /**颜色 */
    color?: string;
    /**轮廓线是否开启 */
    outline?: boolean;
    /**轮廓线颜色 */
    outlineColor?: string;
}
