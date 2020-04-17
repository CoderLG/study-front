import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 矩形几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>矩形</a>
 */
export declare class RectangleGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: RectangleGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let rectangleGraphic = new GV.RectangleGraphic({...});
     * ```
     */
    constructor(option: RectangleGraphicOpt);
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
     * 区域坐标
     */
    coordinates: any;
    /**
     * 区域坐标
     */
    positions: any;
    /**
     * 高度
     */
    height: any;
    /**
    * 矩形相对于椭球面的高度
    */
    heightReference: any;
    /**
    * 挤压面相对于椭球面的高度
    */
    extrudedHeight: any;
    /**
    * 挤压面的相对参考：'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
    */
    extrudedHeightReference: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 颜色
     */
    color: any;
    image: any;
    /**
     * 是否显示轮廓
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
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
export declare class RectangleGraphicOpt extends GraphicItemOpt {
    /**
     * 二维区域坐标 示例[west, south, east, north]  west为最西经度， south 为最南纬度， east为最东经度， north为最北纬度;(即将废弃此接口)
     */
    coordinates: Array<number>;
    /**
     * 二维区域对角坐标点
     */
    positions: Array<GeoPoint>;
    /**
     * 高度: 默认以像素为单位
     */
    height?: number;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 矩形的挤压面相对于椭球面的高度
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
     * 填充颜色
     */
    color?: String;
    /**
     * 填充图片
     */
    image?: String;
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
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: String;
}
