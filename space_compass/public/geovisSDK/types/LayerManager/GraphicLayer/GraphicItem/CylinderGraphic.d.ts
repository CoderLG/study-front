import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 圆柱几何体
 * @see <a href='http://localhost:8088/examples/gallery/editor.html#geometry'>圆柱</a>
 */
export declare class CylinderGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: CylinderGraphicOpt;
    /**
     * 圆柱标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let CylinderGraphic = new GV.CylinderGraphic({...});
     * ```
     */
    constructor(option: CylinderGraphicOpt);
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
     * 长度
     */
    length: any;
    /**
     * 顶部半径
     */
    topRadius: any;
    /**
     * 底部半径
     */
    bottomRadius: any;
    /**
 * 偏航
 */
    heading: any;
    /**
     * 俯仰
     */
    pitch: any;
    /**
     * 翻转
     */
    roll: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 填充颜色
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
     * 周长的边数
     */
    slices: any;
    /**
     * 是否投射或接收来自每个光源的阴影
     */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
export declare class CylinderGraphicOpt extends GraphicItemOpt {
    /**
     * 位置  lon为经度， lat 为纬度， alt为高度
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
     * 圆柱长度
     */
    length: number;
    /**
     * 圆柱顶部的半径
     */
    topRadius: number;
    /**
     * 圆柱体底部的半径
     */
    bottomRadius: number;
    /**
    * 偏航角围绕负z轴旋转
    */
    heading?: number;
    /**
     * 俯仰角绕负y轴旋转
     */
    pitch?: number;
    /**
     * 翻转角绕正x轴旋转
     */
    roll?: number;
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
     * 圆柱周长的边数
     */
    slices?: number;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: Boolean;
}
