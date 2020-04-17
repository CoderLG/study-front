import { GeoCanvas } from "../../Viewer/GeoCanvas";
import { Item } from "../../Core/Item";
/**
 * 批量绘制线
 * @see  http://localhost:8088/examples/gallery/editor.html#efficientLines
 */
export declare class MassiveLines extends Item {
    /**视图对象 */
    private _viewer;
    /**线的Primitive对象 */
    private _linePrimitive;
    /**材质对象 */
    private _apprence;
    /**纹理图片路径 */
    private _lineTexTure;
    /**流动线颜色 */
    private _animateColor;
    /**线的主体颜色 */
    private _lineColor;
    /**线的数据 */
    private _lineData;
    /**线的Instance对象数组 */
    private _lineInstances;
    /**流动速度 */
    private _speed;
    /**线的宽度 */
    private _lineWidth;
    /**Item编号 */
    protected _id: string;
    /**
     * 初始化方法
     * @param options 参数类
     * @returns
     * ```
     * 示例代码
     *    let data = [[90, 0, 2000000, 90, 30, 2000000]];
     *    let massiveLinesOpt = new GV.MassiveLinesOpt(data);
     *    let massiveLines = new GV.MassiveLines(massiveLinesOpt);
     *
     * ```
     */
    constructor(options: MassiveLinesOpt);
    /**
    * 获取类型
    */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 获取运动点颜色
     * @return {string}
     *
     */
    readonly sportColor: string;
    /**
     * 设置运动线颜色
     * @param {string} val 运动线颜色
     * ```
     * 示例代码
     * massiveLines.sportColor='#ffffff'
     * ```
     */
    animateColor: string;
    /**
     * 获取线的颜色
     * @return {string}
     */
    /**
    * 设置线的颜色
    * @param {string} val 线颜色
    * ```
    * 示例代码
    * massiveLines.sportColor='#ffffff'
    * ```
    */
    lineColor: string;
    /**
     * 获取运动速度
     * @return {number}
     */
    /**
    * 设置运动速度
    * @param {number} val 运动速度
    * ```
    * 示例代码
    * massiveLines.speed=1.0
    * ```
    */
    speed: number;
    /**
     * 获取纹理图片
     * @return {string}
     */
    /**
    * 设置纹理图片
    * @param {string} val 图片名称
    */
    lineTexture: string;
    /**
     * 初始化
     * @param {BatchLineOptions} options 参数类
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 创建线的实例
     */
    private createLineInstance;
    /**
     * 创建材质
     */
    private createMaterial;
    /**
     * 改写片源着色器
     */
    private getFS;
    /**
     * 片源着色器方法
     */
    private getMS;
    /**
     * 画线
     */
    private drawLines;
    /**
     * 删除线
     */
    destroyItem(): void;
    /**
     * Event函数
     */
    private listenerFun;
}
/**
 * 批次划线参数类
 */
export declare class MassiveLinesOpt {
    /**已插值的线数据*/
    lineData: Array<Array<number>>;
    /**流动速度 */
    speed?: number;
    /**纹理URL*/
    lineTexTure?: string;
    /**流动线颜色*/
    animateColor?: string;
    /**线的主体颜色 */
    lineColor?: string;
    /**线的宽度 */
    lineWidth?: number;
    constructor(lineData: Array<Array<number>>, speed?: number, lineTexTure?: string, animateColor?: string, lineColor?: string, lineWidth?: number);
}
