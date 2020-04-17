import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 球几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>球</a>
 */
export declare class SphereGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: SphereGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let sphereGraphic = new GV.SphereGraphic({...});
     * ```
     */
    constructor(option: SphereGraphicOpt);
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
    * 高度参考
    */
    heightReference: any;
    /**
     * 半径
     */
    radius: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 材质
     */
    color: any;
    /**
     * 是否填充
     */
    outline: any;
    /**
    * 颜色
    */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * 每个轮廓环的样本数，确定曲率的粒度
     */
    subdivisions: any;
    /**
    * 堆栈数
    */
    stackPartitions: any;
    /**
    * 径向切片数
    */
    slicePartitions: any;
}
/**
 * 数据约束及默认值
 */
export declare class SphereGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 半径 示例[x, y, z]
     */
    radius?: number;
    /**
     * 是否填充提供的材质
     */
    fill?: Boolean;
    /**
     * 填充材质
     */
    color?: String;
    /**
     * 是否轮廓
     */
    outline?: Boolean;
    /**
     * 轮廓颜色
     */
    outlineColor?: String;
    /**
    * 轮廓宽度
    */
    outlineWidth?: number;
    /**
     * 每个轮廓环的样本数，确定曲率的粒度
     */
    subdivisions?: number;
    /**
     * 堆栈数
     */
    stackPartitions?: number;
    /**
     * 径向切片数
     */
    slicePartitions?: number;
}
