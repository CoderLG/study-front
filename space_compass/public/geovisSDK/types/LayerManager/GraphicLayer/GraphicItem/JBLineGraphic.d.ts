import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
import { JBRenderModeEnum } from "./JBPointGraphic";
/**
 * @类型 外部使用类
 * @描述 基础线
 * @see <a href='../../../examples/gallery/editor.html#plottingPointLine'>标绘点、线</a>
 */
export declare class JBLineGraphic extends GraphicItem {
    protected _opt: JBLineGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *   let jbLine = new GV.JBLineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)], //设置坐标
     *   });
     *   viewer.graphicLayer.add(jbLine); //添加到场景
     * ```
     */
    constructor(option: JBLineGraphicOpt);
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
    positions: Array<GeoPoint>;
    /**
     * 矢量线宽
     */
    vectorWidth: number;
    /**
     * 栅格线宽
     */
    rasterWidth: number;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
    /**
     * 设置高度
     */
    /**
    * 获取高度
    */
    height: number;
    /**
     * 设置厚度
     */
    /**
    * 获取厚度
    */
    thick: number;
    /**
     * 设置线颜色
     */
    /**
    * 获取线颜色
    */
    lineColor: string;
    /**
     * 设置渲染模式
     */
    /**
    * 获取渲染模式
    */
    renderMode: JBRenderModeEnum;
    /**
     * 是否填充
     */
    /**
    * 是否填充
    */
    fillFlag: boolean;
    /**
     * 设置起点填充颜色
     */
    /**
    * 获取起点填充颜色
    */
    fillStartColor: string;
    /**
     * 设置终点填充颜色
     */
    /**
    * 获取终点填充颜色
    */
    fillEndColor: string;
    /**
     * 设置渐变偏角
     */
    /**
    * 获取渐变偏角
    */
    fillAngle: number;
    /**
    * 设置拉伸网格体颜色
    */
    /**
    * 获取拉伸网格体颜色
    */
    supplementColor: string;
}
/**
 * 折线数据约束及默认值
 */
export declare class JBLineGraphicOpt extends GraphicItemOpt {
    /**
     * 军标码
     */
    code: string;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 矢量线型宽度
     */
    vectorWidth?: number;
    /**
     * 栅格线型宽度
     */
    rasterWidth?: number;
    /**
     * 线的颜色
     */
    color?: string;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
    /**
     * 距离底面高度
     */
    height: number;
    /**
    * 厚度
    */
    thick: number;
    /**
    * 线颜色
    */
    lineColor: string;
    /**
     * 绘制形态 'raster'或 'vector'
     */
    renderMode: JBRenderModeEnum;
    /**是否填充 */
    fillFlag: boolean;
    /**起点填充颜色 */
    fillStartColor: string;
    /**终点填充颜色 */
    fillEndColor: string;
    /**渐变偏角 */
    fillAngle: number;
    /**拉伸网格体颜色 */
    supplementColor: string;
}
