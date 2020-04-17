import { RenderObject, RenderTypeEnum } from "./RenderObject";
/**
 * 气泡标签渲染对象
 */
export declare class CesiumPopover extends RenderObject {
    readonly renderType: RenderTypeEnum;
    private billboardCanvas;
    private flag;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    updateCanvas(): void;
    private updateCanvasCallBack;
    /**
     * 创建html标签
     * @param shapeType 形状
     * @param text 文字
     */
    private createHTMLElement;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}
