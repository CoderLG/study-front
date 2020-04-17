import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 动态圆柱几何体
 */
export declare class CylinderDynamicGraphic extends GraphicItem {
    protected _opt: CylinderDynamicGraphicOpt;
    protected _type: string;
    protected renderCylinder: any;
    /**
     * 初始化示例
     * @param option 动态圆柱几何体
     * ```
     * 示例代码:
     * let cylinderDynamicGraphicOpt=new GV.CylinderDynamicGraphicOpt();
     * let cylinder = new GV.CylinderDynamicGraphic(cylinderDynamicGraphicOpt);
     * viewer.graphicLayer.add(cylinder);
     * ```
     */
    constructor(option: CylinderDynamicGraphicOpt);
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
     * 圆柱顶面位置
     * @param value 顶面位置
     *
     * */
    /**
    * 获取顶面位置
    * @returns
    */
    topPosition: GeoPoint;
    /**
     * 圆柱底面位置
     * @param value 底面位置
     */
    /**
    * 获取底面位置
    * @returns
    */
    bottomPosition: GeoPoint;
    /**
     * 设置圆柱顶面半径
     * @param value 顶面半径
     */
    /**
    * 获取顶面半径
    * @returns
    */
    topRadius: number;
    /**
     * 设置圆柱底面半径
     * @param value 底面半径
     */
    /**
    * 获取底面半径
    * @returns
    */
    bottomRadius: number;
    /**
     * 设置速度
     * @param value 速度 范围 1-5
     */
    /**
    * 获取速度
    * @returns
    *
    */
    speed: number;
    /**
     * 设置条纹颜色
     * @param value 条纹颜色
     */
    /**
    * 获取条纹颜色
    * @returns
    */
    evenConeColor: string;
    /**
     * 设置条纹颜色
     * @param value 条纹颜色
     */
    /**
    * 获取条纹颜色
    * @returns
    */
    oddConeColor: string;
    /**
     * 设置切分份数
     * @param value 切分份数
     */
    /**
    * 获取切分份数
    * @returns
    */
    slice: number;
}
/**
 * 数据约束及默认值
 */
export declare class CylinderDynamicGraphicOpt extends GraphicItemOpt {
    /**圆柱顶面位置 */
    topPosition?: GeoPoint;
    /**圆柱底面位置 */
    bottomPosition?: GeoPoint;
    /**
     * 圆柱顶面半径
     */
    topRadius?: number;
    /**
     * 圆柱底面半径
     * */
    bottomRadius?: number;
    /**
     * 速度 范围1-5
     */
    speed?: number;
    /**
     * 条纹颜色
    */
    evenConeColor?: string;
    /**
     * 条纹颜色
    */
    oddConeColor?: string;
    /**
     * 切分份数
     */
    slice?: number;
}
