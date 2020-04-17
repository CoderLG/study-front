import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 文本POI绘制对象
 * @see <a href='../../../examples/gallery/editor.html#textPOI'>文本</a>
 */
export declare class CustomLabelGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: CustomLabelGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'CustomLabelGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     *  var customLabelGraphicOpt = new GV.CustomLabelGraphicOpt();
     *  customLabelGraphicOpt.position = new GV.GeoPoint(0, 0);
     *  customLabelGraphicOpt.width = 100;
     *  customLabelGraphicOpt.height = 100;
     *  customLabelGraphicOpt.text = '星图';
     *  customLabelGraphicOpt.backgroundColor = 'rgba(0,0,255,1.0)';
     *  var customLabelGraphic = new GV.CustomLabelGraphic(customLabelGraphicOpt);
     *  viewer.graphicLayer.add(customLabelGraphic);
     * ```
     */
    constructor(option: CustomLabelGraphicOpt);
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
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: any;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: any;
    /**
     * 背景颜色
     */
    backgroundColor: any;
    /**
     * 垂直对齐方式 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
}
export declare class CustomLabelGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position?: GeoPoint;
    /**
     * 文字内容
     */
    text?: string;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width?: number;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height?: number;
    /**
     * 背景颜色
     */
    backgroundColor?: string;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin?: String;
}
