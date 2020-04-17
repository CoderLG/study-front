import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 文本绘制对象
 * @see <a href='../../../examples/gallery/editor.html#plottingText'>文本</a>
 */
export declare class LabelGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: LabelGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'LabelGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let labelGraphicOpt = new GV.LabelGraphicOpt();
     * labelGraphicOpt.position = [83, 33, 500000];
     * let labelGraphic = new GV.LabelGraphic(labelGraphicOpt);
     * 或者
     * let labelGraphic = new GV.LabelGraphic({...});
     * ```
     */
    constructor(option: LabelGraphicOpt);
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
     * 位置
     */
    position: any;
    /**
     * 文字
     */
    text: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 水平对齐 : 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin: any;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
    /**
    * 视角偏移
    */
    eyeOffset: any;
    /**
     * 像素偏移
     */
    pixelOffset: any;
    /**
     * 轮廓线宽度
     */
    outlineWidth: any;
    /**
     * 字体
     */
    font: any;
    /**
     * 样式
     */
    style: any;
    /**
     * 填充颜色
     */
    fillColor: any;
    /**
    * 轮廓颜色
    */
    outlineColor: any;
    /**
    * 背景颜色
    */
    backgroundColor: any;
    /**
     * 根据距离计算缩放大小
     */
    scaleByDistance: any;
    /**
     * 根据距离计算像素偏移
     */
    pixelOffsetScaleByDistance: any;
    /**
     * 是否显示背景
     */
    showBackground: any;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference: any;
    /**
     * 根据距离变更透明度
     */
    translucencyByDistance: any;
    /**
     * 是否深度检测
     */
    isDepthTest: boolean;
}
export declare class LabelGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 文字内容
     */
    text: String;
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
    * 指定轮廓线宽度
    */
    outlineWidth?: number;
    /**
     * css字体设置： 字体大小 字体名称
     */
    font?: String;
    /**
     * 指定文字样式 ：'fill' 只有填充,fill_and_outline 包含填充轮廓, outline 只有轮廓
     */
    style?: String;
    /**
     * 填充颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    fillColor?: String;
    /**
     * 轮廓颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    outlineColor?: String;
    /**
     * 背景颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    backgroundColor?: String;
    /**
     * 根据距离视点范围和放大率范围计算放大倍数
     */
    scaleByDistance?: Array<number>;
    /**
     * 根据距离视点范围和放大率范围计算像素偏移
     */
    pixelOffsetScaleByDistance?: Array<number>;
    /**
     * 是否展示背景
     */
    showBackground?: Boolean;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 根据距离变更透明度
     */
    translucencyByDistance?: number;
    /**
     * 是否深度检测
     */
    isDepthTest?: boolean;
}
