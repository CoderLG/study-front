import { RenderObject, RenderTypeEnum } from "./RenderObject";
/**
 * 图标渲染对象
 */
export declare class CesiumBillboard extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}
