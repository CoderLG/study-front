import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class CesiumPolyline extends RenderObject {
    _positions: any[];
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    getRenderPositions(): any[];
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}
