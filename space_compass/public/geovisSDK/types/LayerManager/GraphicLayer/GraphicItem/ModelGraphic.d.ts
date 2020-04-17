import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * @类型 外部使用类
 * @描述 模型绘制对象
 * @see <a href='../../../examples/gallery/editor.html#model'>模型</a>
 */
export declare class ModelGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: ModelGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'ModelGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let modelGraphicOpt = new GV.ModelGraphicOpt();
     * modelGraphicOpt.position = [83, 33, 500000];
     * let modelGraphic = new GV.ModelGraphic(ModelGraphicOpt);
     * 或者
     * let modelGraphic = new GV.ModelGraphic({...});
     * ```
     */
    constructor(option: ModelGraphicOpt);
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
     * 模型
     */
    url: any;
    /**
    * 缩放大小
    */
    scale: any;
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
     * 像素大小
     */
    minimumPixelSize: any;
    /**
     * 缩放上界
     */
    maximumScale: any;
    /**
    * 动画
    */
    runAnimations: any;
    /**
     * 最后帧是否静止
     */
    clampAnimations: any;
    /**
     * 模型轮廓颜色
     */
    silhouetteColor: any;
    /**
     * 轮廓大小
     */
    silhouetteSize: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 高度按照相对于什么
     */
    heightReference: any;
}
/**
 * 模型标绘参数类
 */
export declare class ModelGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 模型路径
     */
    url: String;
    /**
     * 缩放大小
     */
    scale?: number;
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
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
    * 指定模型的近似最小像素大小，与缩放无关
    */
    minimumPixelSize: number;
    /**
     * 模型的最大比例尺寸。minimumPixelSize的上限
     */
    maximumScale?: number;
    /**
     * 指定是否应该启动模型中指定的glTF动画。
     */
    runAnimations?: Boolean;
    /**
     * 指定glTF动画是否应保留最后一个没有关键帧的持续时间姿势
     */
    clampAnimations?: Boolean;
    /**
     * 模型轮廓颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    silhouetteColor?: String;
    /**
     * 指定轮廓的大小（以像素为单位）。
     */
    silhouetteSize?: number;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
}
