import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 军标点
 */
export declare class JBPointGraphic extends GraphicItem {
    protected _opt: JBPointGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *  let group = new GV.GraphicGroup();
     *  viewer.graphicLayer.add(group);
     *  let point  = new GV.JBPointGraphic({
     *     code: '10-200-0',//军标码
     *     position:new GV.GeoPoint(i,j,0),//位置点
     *     size:0.5,//大小,
     *     color: '#ffff00'
     *  });
     *  group.add(point);
     * ```
     */
    constructor(option: JBPointGraphicOpt);
    /**
 * @注意 所有item的基类方法,外部无需调用
 * @描述 初始化方法，在父类执行add方法添加时被调用
 */
    init(father: GraphicGroup): void;
    /**
     * 位置
     * ```
     * 示例代码
     * jbLine.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
     * ```
     */
    position: GeoPoint;
    /**
     * 军标码
     */
    code: string;
    /**
     * 军标线颜色
     */
    color: string;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
      * 旋转
      */
    rotation: number;
    /**
     * 尺寸
     */
    size: number;
    /**
     * 衬线颜色
     */
    strokeColor: string;
    /**
     * 衬线宽度
     */
    strokeWidth: number;
    /**
     * 注记位置信息
     */
    renderMode: JBRenderModeEnum;
    /**
     * 注记位置信息
     */
    textOffset: {
        x: number;
        y: number;
    };
    /**
     * 注记内容
     */
    text: string;
    /**
    * 注记字体
    */
    textFont: string;
    /**
    * 注记颜色
    */
    textColor: string;
    /**
     * 注记字体大小
     */
    textSize: number;
    /**
    * 注记背景色
    */
    textBackgroundColor: string;
    /**
     * 注记缩放
     */
    textScale: number;
    /**
    * 高度
    */
    height: number;
    /**
    * 挤压高度
    */
    vectorExtrudedHeight: number;
    /**
     * 填充
     */
    fillColor: string;
}
/**
 * 折线数据约束及默认值
 */
export declare class JBPointGraphicOpt extends GraphicItemOpt {
    /**
     * 军标码
     */
    code: string;
    /**
     * 关键点信息
     */
    position: GeoPoint;
    /**
     * 线的颜色
     */
    color?: string;
    /**
     * 大小
     */
    size?: number;
    /**
     * 旋转
     */
    rotation?: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
    /**
     * 衬线颜色
     */
    strokeColor?: string;
    /**
     * 衬线宽度
     */
    strokeWidth?: number;
    /**
     * 绘制形式
     */
    renderMode?: JBRenderModeEnum;
    /**
     * 注记位置点
     */
    textOffset?: {
        x: number;
        y: number;
    };
    /**
     * 注记内容
     */
    text?: string;
    /**
     * 注记字体
     */
    textFont?: string;
    /**
     * 注记字体大小
     */
    textSize?: number;
    /**
     * 注记颜色
     */
    textColor?: string;
    /**
     * 注记背景颜色
     */
    textBackgroundColor?: string;
    /**
     * 文字缩放
     */
    textScale?: number;
    /**
     * 高度
     */
    height?: number;
    /**
     * 挤压高度
     */
    vectorExtrudedHeight?: number;
    /**
     * 填充色
     */
    fillColor?: string;
}
export declare enum JBRenderModeEnum {
    /**
     * 矢量
     */
    VECTOR = "VECTOR",
    /**
     * 栅格
     */
    RASTER = "RASTER",
    /**
     * billboard
     */
    BILLBOARD = "BILLBOARD"
}
