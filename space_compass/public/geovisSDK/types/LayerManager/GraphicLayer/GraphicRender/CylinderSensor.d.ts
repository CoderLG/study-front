import { RenderObject, RenderTypeEnum } from "./RenderObject";
import { GraphicItem } from "../GraphicItem/GraphicItem";
import { GraphicLayer } from "../GraphicLayer";
export declare class CylinderSensor extends RenderObject {
    private _geometry;
    private _appearance;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化方法
     */
    init(): void;
    listenerFun: () => void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
     * 获得世界坐标系下位置
     */
    private createVertex;
    /**
     * 创建attribute
     * @param topPosArr 顶面顶点数据
     * @param bottomPosArr 底面顶点数据
     */
    private createGeometeryAttribute;
    /**
     * 创建网格体
     * @param postionsTemp 顶点数据
     * @param stsTemp 纹理数据
     */
    private createGrometry;
    /**
     * 创建材质
     */
    private createMaterial;
    /**
     * 创建primitive
     */
    private createPrimitive;
    /**
     * 创建变换矩阵
     */
    private createGeometryMatrix;
    clear(): void;
}
