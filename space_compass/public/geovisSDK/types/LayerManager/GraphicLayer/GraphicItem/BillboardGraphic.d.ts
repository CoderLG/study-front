import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 图标绘制对象
 * @see  <a href='../../../examples/gallery/editor.html#plottingBillboard'>图标</a>
 */
export declare class BillboardGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: BillboardGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'BillboardGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let billboardGraphicOpt = new GV.BillboardGraphicOpt();
     * billboardGraphicOpt.position = [83, 33, 500000];
     * let billboardGraphic = new GV.BillboardGraphic(billboardGraphicOpt);
     * 或者
     * let billboardGraphic = new GV.BillboardGraphic({...});
     * ```
     */
    constructor(option: BillboardGraphicOpt);
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
     * 图片
     */
    image: any;
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
export declare class BillboardGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 图片路径
     */
    image: String;
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
}
