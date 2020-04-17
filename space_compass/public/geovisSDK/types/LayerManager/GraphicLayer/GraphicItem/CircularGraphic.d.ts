import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 贴地圆、贴地扇形几何体
 * @see <a href='http://localhost:8088/examples/gallery/editor.html#geometry'>圆柱</a>
 */
export declare class CircularGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: CircularGraphicOpt;
    /**
     * 圆柱标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let CircularGraphic = new GV.CircularGraphic({...});
     * ```
     */
    constructor(option: CircularGraphicOpt);
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
     * 位置
     */
    position: any;
    /**
     * 半径
     */
    radius: any;
    /**
    *起始角(单位:角度)
    */
    startAngle: any;
    /**
     * 终止角（单位:角度）
     */
    endAngle: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 是否贴合地形
     */
    clampToGround: any;
}
/**
 * 数据约束及默认值
 */
export declare class CircularGraphicOpt extends GraphicItemOpt {
    /**
     * 位置  lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 是否贴地
     */
    clampToGround: boolean;
    /**
     * 半径（单位m）
     */
    radius?: number;
    /**
     *起始角(单位:角度)
     */
    startAngle?: number;
    /**
     * 终止角（单位:角度）
     */
    endAngle?: number;
    /**
     * 颜色
     */
    color?: string;
}
