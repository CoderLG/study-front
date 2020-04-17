import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class CesiumPolygon extends RenderObject {
    _positions: any[];
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    getRenderPositions(): any[];
}
