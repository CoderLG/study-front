import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 椭圆几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>椭圆</a>
 */
export declare class EllipseGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: EllipseGraphicOpt;
    /**
     * 椭圆标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let ellipseGraphic = new GV.EllipseGraphic({...});
     * ```
     */
    constructor(option: EllipseGraphicOpt);
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
     * 短半轴
     */
    semiMinorAxis: any;
    /**
     * 长半轴
     */
    semiMajorAxis: any;
    /**
    * 高度参考
    */
    heightReference: any;
    /**
     * 挤压面相对于椭球面的高度
     */
    extrudedHeight: any;
    /**
    * extrudedHeight相对于什么
    */
    extrudedHeightReference: any;
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
     * 沿轮廓周边绘制的垂直线数
     */
    numberOfVerticalLines: any;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation: any;
    /**
     * 从北向逆时针旋转椭圆纹理
     */
    stRotation: any;
    /**
     * 椭圆上点之间的角距离：'radians_per_degree' 弧度数
     */
    granularity: any;
    /**
    * 是否投射或接收来自每个光源的阴影
    */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
export declare class EllipseGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 长半轴
     */
    semiMajorAxis: number;
    /**
     * 短半轴
     */
    semiMinorAxis: number;
    /**
     * 椭圆相对于椭球面的高度
     */
    height?: number;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 椭圆的挤压面相对于椭球面的高度
     */
    extrudedHeight?: number;
    /**
     * extrudedHeight的相对参考：'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    extrudedHeightReference?: String;
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
     * 沿轮廓周边绘制的垂直线数
     */
    numberOfVerticalLines?: number;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation?: number;
    /**
     * 从北向逆时针旋转椭圆纹理
     */
    stRotation?: number;
    /**
     * 椭圆上点之间的角距离：弧度数 degrees_per_radian:   180.0 / Math.PI; epsilon1: 0.1; epsilon2: 0.01; epsilon3: 0.001
     */
    granularity?: string;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: String;
}
