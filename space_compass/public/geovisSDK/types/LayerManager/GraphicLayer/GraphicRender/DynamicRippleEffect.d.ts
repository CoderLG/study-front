import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class DynamicRippleEffect extends RenderObject {
    dataOptions: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
}
