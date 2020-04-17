import { GeoCanvas } from "../../Viewer/GeoCanvas";
/**
 * 批次绘制面
 * @see <a href='../../../examples/gallery/editor.html#efficientPolygons'>批次绘制面</a>
 */
export declare class MassivePolygons {
    private _viewer;
    private _dataSource;
    private _instances;
    private _heightFlag;
    private _primitive;
    protected _id: string;
    /**
     * 初始化
     * @param {Array<PolygonOptions>} dataSource 顶点数据
     * @param {boolean} heightFlag 顶点数据中是否有高度信息
     * ```
     * 示例代码
     * let dataSource=[];
     * dataSource.push(new GV.MassivePolygonOpt([0, 0, 10, 0, 10, 10, 0, 10]));
     * let massivePolygons=new GV.MassivePolygons(dataSource);
     * ```
     */
    constructor(dataSource: Array<MassivePolygonOpt>, heightFlag?: boolean);
    /**
     * 创建实例对象
     */
    private createInstances;
    /**
     * 创建材质信息
     * @return {Cesium.PerInstanceColorAppearance} 材质信息
     */
    private createAppearence;
    /**
     * 创建Primitive
     */
    private createPrimitive;
    /**
     * 创建实体
     * @param {GeoCanvas} viewer 视图对象
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 移除操作
     */
    destroyItem(): void;
    /**
     * 修改被选中物体颜色
     * @param id 面的id值
     * @param color 修改的颜色
     */
    changePickedColor(id: string, color?: string): void;
}
/**
 * 参数类
 * @param {Array} positions 面数据
 * @param {string} color 颜色
 */
export declare class MassivePolygonOpt {
    /**面的顶点数据 */
    positions: Array<number>;
    /**面的颜色 */
    color: string;
    /**面的ID值 */
    id: string;
    constructor(positions: Array<number>, id?: string, color?: string);
}
