import { GeoPoint } from "../../Utils/GeoPoint";
import { BaseControlPoint } from "./BaseControlPoint";
import { GraphicLayer } from "../../LayerManager/GraphicLayer/GraphicLayer";
export declare class ControlPointSet {
    private _viewer;
    private _pointConstructor;
    private _pointList;
    private _group;
    _graphicLayer: GraphicLayer;
    constructor(viewer: Cesium.Viewer, graphicLayer: GraphicLayer);
    /**
     * 设置控制点模板
     * @param value
     */
    setPointConstructor(value: BaseControlPoint): void;
    /**
     * 添加控制点
     * @param point
     */
    add(point: GeoPoint): void;
    /**
     * 设置最后一个点的位置
     */
    setPosition(point: GeoPoint): void;
    /**
     * 获取控制点列表
     */
    getList(): BaseControlPoint[];
    /**
     * 设置控制点状态
     * @param val
     */
    setCtrlActive(item: any, val: any): void;
    /**
    * 设置关键点控高billboard的显隐
    * @param bool
    */
    setVisible(bool: boolean): void;
    clear(): void;
    updateCtrPositions(positions: Array<GeoPoint>): void;
    updateCtrlHeight(): void;
}
