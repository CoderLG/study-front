import { GraphicItem, GraphicItemOpt } from "./GraphicItem";
import { GraphicGroup } from "./GraphicGroup";
/**
 * @类型 外部使用类
 * @描述 三角网
 */
export declare class TriangleMeshGraphic extends GraphicItem {
    protected _opt: TriangleMeshGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * ```
     *   let Tmesh = new GV.TriangleMeshGraphic({
     *      formData:"../../data.json" ,
     *      color:"#409eff"
     *   });
     *   viewer.graphicLayer.add(Tmesh); //添加到场景
     * ```
     */
    constructor(option: TriangleMeshGraphicOpt);
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
    * 数据源：
    * points 为[经度，纬度，高...]点集数组 或者 url
    * 例：
    * points = [102,33,5000,116,39,54411]
    */
    dataSource: any;
    /**
     * 颜色
     * 默认值：'#00CED1'
     * ```
     * 示例代码：
     * Tmesh.color = '#fff'
     * ```
     */
    color: any;
}
/**
 * 数据约束及默认值
 */
export declare class TriangleMeshGraphicOpt extends GraphicItemOpt {
    /**
     * 数据源：
     * dataSource = {
     *  points: [102,33,5000,116,39,54411...],
     *  indices:[0,2,3,5...]
     * }
     * points 为[经度，纬度，高...]点集数组
     * indices 为点的索引
     */
    dataSource: {
        points: Array<number>;
        indices: Array<number>;
    };
    /**
     * 颜色
     * 默认值：'#00CED1'
     */
    color?: string;
}
