import { RenderObject, RenderTypeEnum } from "./RenderObject";
import { GraphicItem } from "../GraphicItem/GraphicItem";
import { GraphicLayer } from "../GraphicLayer";
export declare class CircularRender extends RenderObject {
    private _appearance;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
     * 设置材质
     */
    private createMaterial;
    /**
     * 绘制图形
     */
    private createPrimitive;
}
