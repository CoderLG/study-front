import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 墙几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>墙</a>
 */
export declare class WallGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: WallGraphicOpt;
    /**
     * 墙标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let wallGraphic = new GV.WallGraphic({...});
     * ```
     */
    constructor(option: WallGraphicOpt);
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
    positions: any;
    /**
     * 高度数组
     */
    maximumHeights: any;
    /**
     * 底部数组
     */
    minimumHeights: any;
    /**
     * 填充
     */
    fill: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 是否显示轮廓
     */
    outline: any;
    outlineColor: any;
    outlineWidth: any;
}
/**
 * 数据约束及默认值
 */
export declare class WallGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * GV.GeoPoint.unpackArray([
     *   [-115.0, 34.0],
     *   [-112.5, 34.0],
     *   [-110.0, 34.0],
     *   [-107.5, 34.0],
     *   [-105.0, 34.0],
     *   [-102.5, 34.0],
     *   [-100.0, 34.0],
     *   [-97.5, 34.0],
     *   [-95.0, 34.0],
     *   [-92.5, 34.0],
     *   [-90.0, 34.0]
     * ])
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 指定用于墙顶的高度数组，而不是每个位置的高度.[100000, 200000, 100000, 200000, 100000, 200000 ...]
     */
    maximumHeights: Array<number>;
    /**
     * 指定要用于墙的底部而不是地球表面的高度数组.[0, 100000,  0, 100000, 0, 100000, 0,...]
     */
    minimumHeights: Array<number>;
    /**
     * 指定是否进行填充 ： true or false
     */
    fill?: Boolean;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
     * 指定是否显示轮廓 ： true or false
     */
    outline?: Boolean;
    /**
     * 轮廓颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    outlineColor?: String;
    /**
     * 指定轮廓线宽度
     */
    outlineWidth?: number;
}
