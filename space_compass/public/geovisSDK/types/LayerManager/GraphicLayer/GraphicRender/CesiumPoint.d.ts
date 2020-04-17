import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class CesiumPoint extends RenderObject {
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
}
