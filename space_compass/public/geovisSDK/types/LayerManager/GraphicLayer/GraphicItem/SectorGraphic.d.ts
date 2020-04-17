import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 动态扇形几何体
 */
export declare class SectorGraphic extends GraphicItem {
    protected _opt: SectorGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 动态扇形几何体
     * ```
     * 示例代码:
     * let sectorGraphicOpt=new GV.SectorGraphicOpt();
     * let sector = new GV.SectorGraphic(sectorGraphicOpt);
     * viewer.graphicLayer.add(sector);
     * ```
     */
    constructor(option: SectorGraphicOpt);
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
     * 设置扇形顶点位置
     * @param value 扇形顶点位置
     */
    /**
    * 获取扇形顶点位置
    * @returns
    */
    topPosition: GeoPoint;
    /**
     * 设置扇形底点位置
     * @param value 扇形底点位置
     */
    /**
    * 获取扇形底点位置
    * @returns
    */
    bottomPosition: GeoPoint;
    /**
     * 设置扇形开合角度
     * @param value 扇形开合角度
     */
    /**
    * 获取扇形开合角度
    * @returns
    */
    fov: number;
    /**
     * 设置速度
     * @param value 速度 范围1-5
     */
    /**
    * 获取速度
    * @returns
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
     * 获取旋转角度
     * @returns
     */
    /**
    * 设置旋转角度
    * @param value 旋转角度
    */
    rotation: number;
}
/**
 * 数据约束及默认值
 */
export declare class SectorGraphicOpt extends GraphicItemOpt {
    /**顶点位置 */
    topPosition?: GeoPoint;
    /**底点位置 */
    bottomPosition?: GeoPoint;
    /**
     * 开合角度
     */
    fov?: number;
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
    rotation?: number;
}
