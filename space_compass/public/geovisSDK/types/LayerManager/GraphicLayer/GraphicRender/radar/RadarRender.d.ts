import { RenderObject, RenderTypeEnum } from '../RenderObject';
import { GeoPoint } from '../../../../Utils/GeoPoint';
import { GraphicItem } from '../../GraphicItem/GraphicItem';
import { GraphicLayer } from '../../GraphicLayer';
export declare class RadarRender extends RenderObject {
    private primitivePolyline;
    private primitiveTriangles;
    private scanPrimitivePolyline;
    private scanPrimitiveTriangles;
    isPrimitive: boolean;
    private radarOption;
    private _position;
    private angle;
    private isReserve;
    private lastTime;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化
     */
    init(): void;
    listenerFun: () => void;
    position: GeoPoint;
    private create;
    private createScan;
    private originalMatrix;
    private updateModelMatrix;
    private createPrimitive;
    /**
     * 更新外观,在修改属性之后
     */
    update(): void;
    /**
     * 属性更新
     * @param attrName
     */
    updateAttribute(attrName: any): void;
    /**
     * 清除
     */
    clear(): void;
}
