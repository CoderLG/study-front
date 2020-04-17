import { GraphicItem } from "../GraphicItem/GraphicItem";
import { GraphicLayer } from "../GraphicLayer";
/**
 * 标绘渲染对象虚方法
 */
export declare class RenderObject {
    _renderObj: any;
    _dataItem: GraphicItem;
    _renderRoot: any;
    _viewer: Cesium.Viewer;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    readonly renderType: RenderTypeEnum;
    readonly renderObj: any;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 清理
     */
    clear(): void;
    /**
     * 整体更新
     */
    update(): void;
    /**
     * 属性更新（为提高效率）
     */
    updateAttribute(attrName: string): void;
}
export declare enum RenderTypeEnum {
    Entity = "entity",
    Primitive = "Primitive",
    PostProcess = "PostProcess",
    Lable = "Lable",
    Billboard = "Billboard",
    DrawCombination = "DrawCombination"
}
