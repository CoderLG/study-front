import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class SpreadEffect extends RenderObject {
    protected _Cartesian3Center: any;
    protected _Cartesian4Center: Cesium.Cartesian4;
    protected _CartographicCenter1: any;
    protected _Cartesian3Center1: any;
    protected _Cartesian4Center1: Cesium.Cartesian4;
    protected _time: number;
    protected _scratchCartesian4Center1: Cesium.Cartesian4;
    protected _scratchCartesian4Center: Cesium.Cartesian4;
    protected _scratchCartesian3Normal: Cesium.Cartesian3;
    protected _ScanPostStage: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    create(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
    update(): void;
}
