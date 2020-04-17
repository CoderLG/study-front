import { GeoCanvas } from "../../Viewer/GeoCanvas";
import { Item } from "../../Core/Item";
/**
 * 批次绘制点
 * @see <a href='../../../examples/gallery/editor.html#efficientPoints'>批次绘制点</a>
 */
export declare class MassivePoints extends Item {
    /**视图对象*/
    private _viewer;
    /**点样式划分 */
    private _colors;
    /**点大小 */
    private _pointSizes;
    /**Primitive对象 */
    private _primitive;
    /**材质对象 */
    private _appearance;
    /**点数据 */
    private _data;
    /**点颜色数组 */
    private _pointColors;
    /**点位置数组 */
    private _pointPositions;
    /**Item Id */
    protected _id: string;
    /**
     * 初始化方法
     * @param data 点数据
     * @param colors 颜色数据
     * @returns
     * ```
     * 示例代码
     *    let colors=[];
     *    colors.push(new GV.PointStyle(1000, 0.4, 0.9, 0.2, 0.4));
     *    let pointData=[];
     *    pointData.push(new GV.PointOption(90, 0, 1000))
     *    let massivePoints  = new GV.MassivePoints(pointData,colors);
     *
     * ```
     */
    constructor(data: Array<PointOption>, colors: Array<PointStyle>);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 初始化实体
     * @param {GeoCanvas} 视图对象
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 删除实体
     */
    destroyItem(): void;
    /**
     * 初始化数据
     */
    private resolveData;
    /**
     * 创建网格体
     * @return {Cesium.Geometry} 网格体
     */
    private createGeometry;
    /**
     * 创建材质信息
     * @param {string} fs 片源着色器
     * @param {string} vs 顶点着色器
     * @return {Cesium.Appearance} 材质信息
     */
    private createAppearence;
    /**
     * 顶点着色器
     * @return {string} 顶点着色器
     */
    private getVS;
    /**
     * 片源着色器
     * @return {string} 片源着色器
     */
    private getFS;
    /**
     * 获取某一级别下点的颜色
     * @param {number} 级别
     * @return {Array} 颜色数组
     */
    private getColor;
    /**
     * 获取某一级别下点的大小
     * @param {number} 级别
     * @return {number} 大小
     */
    private getPointSize;
    /**
     * 更新数据源
     * @param {Array} data 数据源
     *
     * ```
     * 示例代码
     *   let pointData=[];
     *   pointData.push(new GV.PointOption(10, 0, 1000));
     *   massivePoints.data=pointData;
     *
     * ```
     */
    data: Array<PointOption>;
}
/**点参数 */
export declare class PointOption {
    /**点经度 */
    lon: number;
    /**点纬度 */
    lat: number;
    /**代表当前点个数 */
    count: number;
    constructor(lon: number, lat: number, count: number);
}
/**点样式设定 */
export declare class PointStyle {
    /**点个数级别 */
    level: number;
    /**点颜色r通道 */
    r: number;
    /**点颜色g通道*/
    g: number;
    /**点颜色b通道 */
    b: number;
    /**点颜色a通道 */
    a: number;
    constructor(level: number, r: number, g: number, b: number, a: number);
}
