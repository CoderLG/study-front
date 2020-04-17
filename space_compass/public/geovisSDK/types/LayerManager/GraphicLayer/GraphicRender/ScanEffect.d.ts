import { RenderObject, RenderTypeEnum } from "./RenderObject";
import { GraphicItem } from "../GraphicItem/GraphicItem";
import { GraphicLayer } from "../GraphicLayer";
export declare class ScanEffect extends RenderObject {
    private polygonAppearance;
    private polylineAppearance;
    private polygonGeometry;
    private polylineGeometry;
    private polygonPrimitive;
    private polylinePrimitive;
    private angle;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    listenerFun: () => void;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 创建网格体
     */
    private createGeometry;
    /**
     * 创建材质
     */
    private createAppearence;
    /**
     * 创建primitive
     */
    private createPrimitive;
    /**
     * 片源着色器方法
     */
    private getMS;
    private createGeometryMatrix;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
}
