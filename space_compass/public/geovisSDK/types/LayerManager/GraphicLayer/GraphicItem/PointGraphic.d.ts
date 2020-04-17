import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 点几何体绘制对象
 */
export declare class PointGraphic extends GraphicItem {
    protected _opt: PointGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 点几何体构造方法
     * ```
     * 示例代码
     *   let point = new GV.PointGraphic({position:new GV.GeoPoint(10,10)});
     *   viewer.graphicLayer.add(point);
     * ```
     */
    constructor(option: PointGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 设置位置
     * @return
     * ```
     * 示例代码
     *  let point.position = new GV.GeoPoint(10,10)
     * ```
     */
    position: GeoPoint;
    /**
     * 大小(单位：像素) （范围： >0 && <100）
     */
    pixelSize: number;
    /**
     * 颜色
     */
    color: any;
    /**
     * 外边框颜色
     */
    outlineColor: any;
    /**
     * 外边框宽度
     */
    outlineWidth: any;
    /**
     * 高度按照相对于什么
     */
    heightReference: any;
    /**
     * 根据距离计算缩放大小
     */
    scaleByDistance: any;
    /**
     * 是否深度检测
     */
    isDepthTest: boolean;
    /**
     * 当前对象序列化成json数据
     * ```
     * 代码示例:
     * const obj = item.toJson();
     * ```
     */
    toJson(): object;
}
/**
 * 数据约束及默认值
 */
export declare class PointGraphicOpt extends GraphicItemOpt {
    /**
     * 位置
     */
    position: GeoPoint;
    /**
     * 点的大小， (单位:像素) (范围: >0 && <500)
     */
    pixelSize?: number;
    /**
     * 颜色 CssColor
     */
    color?: string;
    /**
     * 外边框颜色宽度，(单位:像素) (范围: >0 && <500)
     */
    outlineWidth?: number;
    /**
     * 外边框颜色 CssColor
     */
    outlineColor?: string;
    /**
     * 根据距离视点范围和放大率范围计算放大倍数
     */
    scaleByDistance?: Array<Number>;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: string;
    /**
     * 是否深度检测
     */
    isDepthTest?: boolean;
}
