import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 标牌绘制对象
 * @see  <a href='../../../examples/gallery/editor.html#bubble'>标牌</a>
 */
export declare class BubbleGraphic extends GraphicItem {
    protected _opt: BubbleGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 标牌构造方法
     */
    constructor(option: BubbleGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 获取标牌类型
     */
    readonly bubbleType: BubbleTypeEnum;
    /**
     * 获取标牌面板初始时位置偏移像素
     */
    readonly panelOffset: object;
    /**
     * 获取或设置绑定对象（目前支持GeoPoint对象）
     */
    bindObject: any;
    /**
     * 获取标牌面板DOM
     */
    readonly panelDom: any;
    /**
     * 获取标牌线DOM
     */
    readonly lineDom: any;
    /**
     * 获取或设置锚点颜色
     */
    pointColor: string;
    /**
     * 获取或设置锚点大小
     */
    pointSize: number;
    /**
     * 获取或设置是否开启标牌拖拽
     */
    panelDrag: boolean;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
}
/**
 * 标牌数据约束及默认值
 */
export declare class BubbleGraphicOpt extends GraphicItemOpt {
    /**
     * 标牌面板初始时位置偏移像素
     * 如果bubbleType为BubbleTypeEnum.FollowBubble则此参数为标牌面板相对于幕布位置
     * 如果bubbleType为BubbleTypeEnum.FixedBubble则此参数为标牌面板相对于锚点位置
     */
    panelOffset: object;
    /**
     * 是否开启面板拖拽
     */
    panelDrag: boolean;
    /**
     * 锚定点的颜色
     */
    pointColor: string;
    /**
     * 锚定点的像素大小
     */
    pointSize: number;
    /**
     * 绑定对象
     */
    bindObject: any;
    /**
     * Bubble类型
     */
    bubbleType: BubbleTypeEnum;
    visible: boolean;
}
/**
 * 标牌类型枚举
 */
export declare enum BubbleTypeEnum {
    FixedBubble = "fixedBubble",
    FollowBubble = "followBubble"
}
