import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
import { ColorStyle, ArrowStyle, OutlineStyle, DashStyle, GlowStyle, DynamicStyle } from "../Material/Material";
/**
 * @类型 外部使用类
 * @描述 贝塞尔曲线
 */
export declare class BezierLineGraphic extends GraphicItem {
    protected _opt: BezierLineGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * ```
     *   let bezierLine = new GV.BezierLineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000), new GV.GeoPoint(100,100,200000)], //设置坐标
     *      lineStyle: new GV.ColorStyle({color: '#ffff00'}), //设置颜色
     *      width: 3, //设置宽度
     *   });
     *   viewer.graphicLayer.add(bezierLine); //添加到场景
     * ```
     */
    constructor(option: BezierLineGraphicOpt);
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
     * 只读属性贝塞尔曲线贴地
     */
    readonly clampToGround: true;
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
    getInterpolationCallback(value: any): GeoPoint[];
}
/**
 * 数据约束及默认值
 */
export declare class BezierLineGraphicOpt extends GraphicItemOpt {
    /**
     * 点集数量
     */
    step?: number;
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
