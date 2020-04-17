import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 水面效果
 */
export declare class WaterGraphic extends GraphicItem {
    protected _opt: WaterGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 水面效果
     * ```
     * 示例代码:
     * var position = [0, 0,0, 40.0,40, 40.0,40, 0];
     * var holes = [[5, 5, 6, 5, 6, 6, 5, 6],[15, 15, 15, 25, 25, 25, 25, 15]];
     * let waterOpt = new GV.WaterGraphicOpt();
     * waterOpt.pointsList = position;
     * waterOpt.holes = holes;
     * let water = new GV.WaterGraphic(waterOpt);
     * viewer.graphicLayer.add(water);
     * ```
     */
    constructor(option: WaterGraphicOpt);
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
     * 获取流动频率
     * @returns
     */
    /**
    * 设置流动频率
    * @param  value 流动频率
    */
    frequency: number;
    /**
     * 获取水面底色
     * @returns
     */
    /**
    * 设置水面底色
    * @param  val 水面底色 示例：'#177BD9'或'rgba(100, 0.3, 0.6,1)'
    */
    baseWaterColor: string;
    /**
     * 获取流动速度
     * @returns
     */
    /**
    * 设置流动速度
    * @param  val 流动速度
    */
    animationSpeed: number;
    /**
     *  获取振幅
     * @returns
     */
    /**
    * 设置振幅
    * @param  val 振幅
    */
    amplitude: number;
    /**
     * 获取高光强度
     * @returns
     */
    /**
    * 设置高光强度
    * @param  val 高光强度
    */
    specularIntensity: number;
    /**
     * 获取挖洞数据
     * @returns
     */
    readonly holes: number[][];
    /**
     * 获取顶点数据
     * @returns
     */
    readonly pointsList: number[];
}
/**
 * 数据约束及默认值
 */
export declare class WaterGraphicOpt extends GraphicItemOpt {
    /**
     * 水面顶点数据
     */
    pointsList: Array<number>;
    /**
     * 挖洞数据
     */
    holes?: Array<Array<number>>;
    /**
     * 流动频率
     */
    frequency?: number;
    /**
     * 流动速度
     */
    animationSpeed?: number;
    /**
     * 流动振幅
     */
    amplitude?: number;
    /**
     * 高光强度
     */
    specularIntensity?: number;
    /**
     * 水面底色
     */
    baseWaterColor?: string;
}
