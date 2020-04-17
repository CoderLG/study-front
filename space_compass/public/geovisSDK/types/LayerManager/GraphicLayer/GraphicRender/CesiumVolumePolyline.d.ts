import { RenderObject, RenderTypeEnum } from "./RenderObject";
/**
 * 图标渲染对象
 */
export declare class CesiumVolumePolyline extends RenderObject {
    readonly renderType: RenderTypeEnum;
    starPositions(arms: any, rOuter: any, rInner: any): any[];
    /**
     * 初始化
     */
    init(): void;
    getShape(value: any): any[];
    private getCornerType;
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
