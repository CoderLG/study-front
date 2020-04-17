import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 气泡标签绘制对象
 * @see  <a href='../../../examples/gallery/editor.html#popover'>气泡标签</a>
 */
export declare class PopoverGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: PopoverGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'PopoverGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let popoverGraphic = new GV.PopoverGraphic({
     *   position: new GV.GeoPoint(-75.59777, 40.03883, 100),
     *   text: "中科星图中科星图中科星图中科星图中科星图中科星图中科星图中科星图",
     *   shapeType: "pebbles",
     *   scale: 1.0,// 0.5
     *   horizontalOrigin: 'left',
     *   verticalOrigin: 'bottom',
     *   textTopMargin:'20px',
     *   textRightMargin:'31px',
     *   textleftMargin:'31px'
     * });
     * ```
     */
    constructor(option: PopoverGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 更新标签 注：在创建完成标签后，如果需要更改属性需要手动调用该方法
     */
    updatePopoverCanvas(): void;
    /**
     * 位置
     */
    position: any;
    /**
     * 底图形状
     */
    shapeType: any;
    /**
     * 线颜色
     */
    lineColor: any;
    /**
     * 线宽
     */
    lineWidth: any;
    /**
     * 线型
     */
    lineType: any;
    /**
     * 文本
     */
    text: any;
    /**
     * 是否填充
     */
    enableFill: any;
    /**
     * 填充色
     */
    fillColor: any;
    /**
     * 标签字体
     */
    labelFont: any;
    /**
     * 左部留空
     */
    textleftMargin: any;
    /**
     * 右部留空
     */
    textRightMargin: any;
    /**
     * 顶部留空
     */
    textTopMargin: any;
    /**
     * 底部留空
     */
    textBottomMargin: any;
    /**
     * 文本对齐方式
     */
    textAlign: any;
    /**
     * 标签字体颜色 red 红色 black 黑色 注：HTML style 颜色属性
     */
    labelFontColor: any;
    /**
     * 标签字体大小
     */
    labelFontSize: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 水平对齐方式: 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin: any;
    /**
     * 垂直对齐方式 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
    /**
    * 视角偏移[x,y,z] 空间坐标值 单位为米
    */
    eyeOffset: any;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset: any;
    /**
     *沿视角方向旋转角度，单位弧度值
     */
    rotation: any;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: any;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: any;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color: any;
    /**
     * 大小是否以米为单位
     */
    sizeInMeters: any;
    /**
     *  高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference: any;
}
export declare class PopoverGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 水平对齐 : 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin?: String;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin?: String;
    /**
     * 视角偏移[x,y,z] 空间坐标值 单位为米
     */
    eyeOffset?: Array<number>;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset?: Array<number>;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation?: number;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: number;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: number;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
     * 大小是否以米为单位
     */
    sizeInMeters?: Boolean;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 底图类型 pebbles 鹅卵石风格 pebblesrect 鹅卵石方形风格 roundedrectangle 圆角矩形风格 ellipse 椭圆风格
     */
    shapeType?: String;
    /**
     * 线颜色
     */
    lineColor?: String;
    /**
     * 线宽
     */
    lineWidth?: String;
    /**
     * 线型 line 直线 point 点 dottedLine 虚线 dottedAndPointLine 虚线加点
     */
    lineType?: String;
    /**
     * 是否填充
     */
    enableFill?: boolean;
    /**
     * 填充色
     */
    fillColor?: String;
    /**
     * 标签内容
     */
    text?: String;
    /**
     * 标签字体 Microsoft YaHei 微软雅黑 NSimSun 新宋体 KaiTi 楷体 等
     */
    labelFont?: String;
    /**
     * 标签字体颜色 red 红色 black 黑色 注：HTML style 颜色属性
     */
    labelFontColor?: String;
    /**
     * 标签字体大小
     */
    labelFontSize?: String;
    /**
     * 左部留空
     */
    textleftMargin?: String;
    /**
     * 右部留空
     */
    textRightMargin?: String;
    /**
     * 顶部留空
     */
    textTopMargin?: String;
    /**
     * 底部留空
     */
    textBottomMargin?: String;
    /**
     * 文本对齐方式 center left right
     */
    textAlign?: String;
}
