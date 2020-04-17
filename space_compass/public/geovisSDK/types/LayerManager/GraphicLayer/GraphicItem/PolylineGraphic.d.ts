import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
import { ColorStyle, ArrowStyle, OutlineStyle, DashStyle, GlowStyle, DynamicStyle } from "../Material/Material";
/**
 * @类型 外部使用类
 * @描述 基础线
 * @see <a href='../../../examples/gallery/editor.html#plottingPointLine'>标绘点、线</a>
 */
export declare class PolylineGraphic extends GraphicItem {
    protected _opt: PolylineGraphicOpt;
    protected _type: string;
    private _interpolationCallback;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *   let polyline = new GV.PolylineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)], //设置坐标
     *      lineStyle: new GV.ColorStyle({color: '#ffff00'}), //设置颜色
     *      width: 3, //设置宽度
     *      clampToGround: true //设置贴地
     *   });
     *   viewer.graphicLayer.add(polyline); //添加到场景
     * ```
     */
    constructor(option: PolylineGraphicOpt);
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
     * polyline.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 弧线类型
     * ```
     * 示例代码
     * polyline.arcType = GV.ArcTypeEnum.Geodesic
     * ```
     */
    arcType: ArcTypeEnum;
    /**
     * 是否贴地(注意当弧线类型参数为GV.ArcTypeEnum.None时贴地无效)
     * ```
     * 示例代码
     * polyline.clampToGround = true;
     * ```
     */
    clampToGround: boolean;
    /**
     * 线宽 (单位:像素) (范围: >0 && <100)
     * ```
     * 示例代码
     * polyline.width = 10
     * ```
     */
    width: number;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
    /**
     * 线条样式
     * 线条支持测样式参考
     * @return
     * ```
     * 示例代码:
     *  polyline.lineStyle = new GV.DynamicStyle({//设置动态样式
     *      color: '#ffff00',  //颜色
     *      icon: GV.DynamicIconEnum.Attack, //样式图表
     *      duration:800 //周期
     *  })
     * ```
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 设置插值回调函数
     * @param callback
     * @return
     * ```
     * 代码示例
     * polyline.setInterpolationCallback((value)=>{
     *    return Calculate.getBezier(value) //根据当前点数据value生成贝塞尔点数据
     * })
     * ```
     */
    setInterpolationCallback(callback: any): void;
    /**
     * 获取插值回调函数(程序内部调用)
     * @param value
     */
    getInterpolationCallback(value: Array<GeoPoint>): Array<GeoPoint> | Array<Cesium.Cartesian3>;
}
/**
 * 折线数据约束及默认值
 */
export declare class PolylineGraphicOpt extends GraphicItemOpt {
    /**
     * 线条样式
     * 线条支持测样式参考
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 弧线类型
     */
    arcType?: ArcTypeEnum;
    /**
     * 是否贴地
     */
    clampToGround?: boolean;
    /**
     * 线型宽度
     */
    width: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
}
export declare enum ArcTypeEnum {
    /**
     * 测地线
     */
    Geodesic,
    /**
     * 空(该模式下的线为纯直线)
     */
    None,
    /**
     * 恒向线
     */
    Rhumb
}
