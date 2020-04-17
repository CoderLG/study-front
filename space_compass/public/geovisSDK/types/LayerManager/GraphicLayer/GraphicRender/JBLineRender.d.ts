import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class JBLineRender extends RenderObject {
    /**数据源 */
    result: any[];
    /**线 */
    linePrimitive: Cesium.Primitive;
    /**填充网格体 */
    fillPrimitive: Cesium.Primitive;
    /**拉高网格体 */
    supplementPrimitive: Cesium.Primitive;
    /**栅格线的材质 */
    lineRasterAppearance: Cesium.PolylineMaterialAppearance;
    /**矢量线材质 */
    lineVectorAppearance: Cesium.MaterialAppearance;
    /**填充网格体材质 */
    fillAppearance: Cesium.Appearance;
    /**拉高网格体材质 */
    supplementAppearance: Cesium.Appearance;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 创建栅格线
     */
    createRasterLine(): void;
    /**
     * 创建矢量线
     */
    createVectorLine(): void;
    /**
     * 创建矢量填充
     */
    createFill(): void;
    /**
     * 创建栅格线填充
     */
    createGroundFillPrimitive(): void;
    /**
     * 创建拉高网格体
     */
    createSupplement(): void;
    /**
     * 创建填充纹理图
     */
    getColorRamp(colorArray: Array<string>, bvArray: Array<number>, angle: number): HTMLCanvasElement;
    /**
     * 根据关键点获取数据源
     */
    getRenderPositions(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}
