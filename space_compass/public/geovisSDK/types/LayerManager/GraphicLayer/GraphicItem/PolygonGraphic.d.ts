import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 基础面
 * @see
 */
export declare class PolygonGraphic extends GraphicItem {
    protected _opt: PolygonGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *     let polygon = new GV.PolygonGraphic({
     *         positions:[new GV.GeoPoint(0,10), new GV.GeoPoint(0,20),new GV.GeoPoint(10,20),new GV.GeoPoint(10,0)] //设置坐标
     *     });
     *     viewer.graphicLayer.add(polygon); //添加到场景
     * ```
     */
    constructor(option: PolygonGraphicOpt);
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
     */
    positions: any;
    /**
     * 相对于椭球面的高度（clampToGround为true时无效）
     */
    height: any;
    /**
     * 挤压面相对于椭球面的高度（clampToGround为true时无效）
     */
    extrudedHeight: any;
    /**
     * 是否使用提供的材质填充多边形
     */
    fill: any;
    /**
     * 填充色
     */
    color: any;
    /**
     * 多边形是否有边框
     */
    outline: any;
    /**
     * 边框色
     */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * @只读 只有初始化是可以设置该属性（clampToGround为true时无效）
     * @描述 指定是否使用每个点的高度，一般需要把 extrudedHeight 参数设置为0
     * ```
     * 参考示例
     *  let polygon = new GV.PolygonGraphic({
     *     positions:[new GV.GeoPoint(0,10,5000), new GV.GeoPoint(0,20,200000),new GV.GeoPoint(10,20,300000),new GV.GeoPoint(10,0,200000)], //设置坐标
     *     extrudedHeight : 0,
     *     perPositionHeight : true
     *  });
     *  viewer.graphicLayer.add(polygon); //添加到场景
     * ```
     */
    readonly perPositionHeight: boolean;
    /**
     * 挤压时打开顶部（clampToGround为true时无效）
     * ```
     * 示例代码
     *     let polygon = new GV.PolygonGraphic({
     *        positions:[new GV.GeoPoint(0,10, 100000), new GV.GeoPoint(0,20, 100000),new GV.GeoPoint(10,20, 100000),new GV.GeoPoint(10,0, 100000)], //设置坐标
     *        clampToGround : false,
     *        extrudedHeight : 500000.0,
     *        closeTop : false,
     *        closeBottom : false
     *     });
     *     viewer.graphicLayer.add(polygon); //添加到场景
     * ```
     */
    closeTop: any;
    /**
     * 挤压时打开底部（clampToGround为true时无效）
     */
    closeBottom: any;
    /**
     * 是否贴地注意在贴地模式下
     * height、extrudedHeight、perPositionHeight、closeTop、closeBottom参数无效
     */
    clampToGround: boolean;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
}
/**
 * 多边形面数据约束及默认值
 */
export declare class PolygonGraphicOpt extends GraphicItemOpt {
    clampToGround?: boolean;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 高度
     */
    height?: number;
    /**
     * 多边形的凸出面相对于椭球面的高度
     */
    extrudedHeight?: number;
    /**
     * 是否填充
     */
    fill?: boolean;
    /**
     * 填充色
     */
    color?: string;
    /**
     * 是否有外边框
     */
    outline?: boolean;
    /**
     * 外边框颜色
     */
    outlineColor?: string;
    /**
     * 外边框线宽度
     */
    outlineWidth?: number;
    /**
     * 是否使用每个位置的高度
     */
    perPositionHeight?: boolean;
    /**
     * 是否关闭多边形顶部
     */
    closeTop?: boolean;
    /**
     * 是否关闭多边形底部
     */
    closeBottom?: boolean;
    /**
     * 是否动态更新（脏检查）
     */
    dirty?: boolean;
}
