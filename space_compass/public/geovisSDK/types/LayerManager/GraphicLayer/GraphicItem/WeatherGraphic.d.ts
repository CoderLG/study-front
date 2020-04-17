import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GeoPoint } from "../../../Utils/GeoPoint";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 雨、雪模拟
 */
export declare class WeatherGraphic extends GraphicItem {
    protected _opt: WeatherGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 雨、雪模拟
     * ```
     * 示例代码:
     * let weatherGraphicOpt = new GV.WeatherGraphicOpt();
     * weatherGraphicOpt.position = new GV.GeoPoint(110.20, 34.55, 3000);
     * weatherGraphicOpt.range = 20000;
     * weatherGraphicOpt.weatherType = 'rain';
     * var weatherGraphic = new GV.WeatherGraphic(weatherGraphicOpt);
     * viewer.graphicLayer.add(weatherGraphic);
     *
     * ```
     */
    constructor(option: WeatherGraphicOpt);
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
     * 获取天气类型
     * @returns
     */
    readonly weatherType: string;
    /**
     * 获取位置
     * @returns
     */
    readonly position: GeoPoint;
    /**
    * 获取范围
    * @returns
    */
    readonly range: number;
}
/**
 * 数据约束及默认值
 */
export declare class WeatherGraphicOpt extends GraphicItemOpt {
    /**天气类型 rain 或 snow*/
    weatherType: string;
    /**位置 */
    position: GeoPoint;
    /**影响范围 */
    range: number;
}
