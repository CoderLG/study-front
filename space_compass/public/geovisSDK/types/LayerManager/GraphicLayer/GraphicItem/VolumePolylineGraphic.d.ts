import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 管道线几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>管道</a>
 */
export declare class VolumePolylineGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: VolumePolylineGraphicOpt;
    /**
     * 管道标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let volumePolylineGraphic = new GV.VolumePolylineGraphic({...});
     * ```
     */
    constructor(option: VolumePolylineGraphicOpt);
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
     * 形状
     */
    shape: any;
    /**
     * 拐角类型
     */
    cornerType: any;
    /**
     * 填充
     */
    fill: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 轮廓
     */
    outline: any;
    outlineColor: any;
    outlineWidth: any;
}
/**
 * 数据约束及默认值
 */
export declare class VolumePolylineGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * GV.GeoPoint.unpackArray([
     *    [-80.0, 34.0, 0.0],
     *    [-80.0, 40.0, 100000.0],
     *    [-84.0, 40.0, 0.0]
     * ])
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 定义要挤出的形状的位置数组
     * ```
     * 示例代码
     * GV.GeoPoint.unpackArray([
     *   [-50000, -50000],
     *   [50000, -50000],
     *   [50000, 50000],
     *   [-50000, 50000]
     * ])
     * ```
     */
    shape: Array<GeoPoint>;
    /**
     * 指定角落样式 : 'beveled'  拐角被修剪； 'mitered' 拐角点是相邻边的交点； 'rounded' 角落边缘光滑
     */
    cornerType?: String;
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
     * 轮廓颜色: 参考颜色示例'#ff0000'或'rgba(255,0,0,1)'
     */
    outlineColor?: String;
    /**
     * 指定轮廓线宽度
     */
    outlineWidth?: number;
}
