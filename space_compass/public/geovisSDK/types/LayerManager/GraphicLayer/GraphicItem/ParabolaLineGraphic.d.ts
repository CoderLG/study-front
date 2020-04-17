import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
import { ColorStyle, ArrowStyle, OutlineStyle, DashStyle, GlowStyle, DynamicStyle } from "../Material/Material";
/**
 * @类型 外部使用类
 * @描述 抛物线
 * @see <a href='../../../examples/gallery/editor.html#polylineArrow'>动态线</a>
 */
export declare class ParabolaLineGraphic extends GraphicItem {
    protected _opt: ParabolaLineGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * ```
     * 示例代码:
     *   let parabolaLine = new GV.ParabolaLineGraphic({
     *       positions:[new GV.GeoPoint(80,10,20000), new GV.GeoPoint(110,0,200000)],
     *       lineStyle: new GV.DynamicStyle({
     *            color: '#00FF99',
     *            icon: GV.DynamicIconEnum.Arrow,
     *            duration:1000
     *       }),
     *       width:5, //线宽
     *       factor: 50000,
     *       step: 50
     *   });
     *   graphicLayer.add(parabolaLine)
     * ```
     */
    constructor(option: ParabolaLineGraphic);
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
      * 位置（只有前两个点位有效）
      * ```
      * 示例代码
      * parabolaLine.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
      * ```
      */
    positions: any;
    /**
       * 线宽 (单位:像素) (范围: >0 && <100)
       * ```
       * 示例代码
       * parabolaLine.width = 10
       * ```
       */
    width: number;
    /**
     * 曲率（曲线的高度）（单位：米）（范围： >0 && <10000000）
     * ```
     * 示例代码
     * parabolaLine.factor = 50000
     * ```
     */
    factor: number;
    /**
     * 点集数,抛物线细分插值数 (范围：>0 && <1000)
     * ```
     * parabolaLine.step = 50
     * ```
     */
    step: number;
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
     *  parabolaLine.lineStyle = new GV.DynamicStyle({//设置动态样式
     *      color: '#ffff00',  //颜色
     *      icon: GV.DynamicIconEnum.Attack, //样式图表
     *      duration:800 //周期
     *  })
     * ```
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * @注意 程序内部调用
     *
     * 获取插值回调函数
     * @param value
     */
    getInterpolationCallback(value: any): any[];
}
/**
 * 抛物线数据约束及默认值
 */
export declare class ParabolaLineGraphicOpt extends GraphicItemOpt {
    /**
     * 线条样式
     * 线条支持测样式参考
     */
    lineStyle?: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 曲率
     */
    factor?: number;
    /**
     * 点集数量
     */
    step?: number;
    /**
     * 抛物线坐标前两位有效
     */
    positions?: Array<GeoPoint>;
    /**
     * 线宽
     */
    width?: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
}
