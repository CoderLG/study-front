import { Event } from "../../Core/Event";
import { EditorManager } from "./EditorManager";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
import { GeoPoint } from "../../Utils/GeoPoint";
export declare class BaseEditor extends Event {
    protected _viewer: Cesium.Viewer;
    protected _father: EditorManager;
    protected _editItem: GraphicItem;
    private _handler;
    private _controlPointSet;
    constructor(viewer: Cesium.Viewer, father: EditorManager);
    /** handler单例 */
    protected getHandler(): Cesium.ScreenSpaceEventHandler;
    /**
     * 设置编辑对象由子类实现
     * @param item
     */
    setEditItem(item: GraphicItem): void;
    protected clearCtrPint(): void;
    protected addCtrPoint(position: GeoPoint): void;
    protected createItem(item: GraphicItem): void;
    protected controlPointList(): import("../EditorUtil/BaseControlPoint").BaseControlPoint[];
    protected setCtrlActive(item: GraphicItem, val: boolean): void;
    clear(): void;
    getPositions(): Array<GeoPoint>;
    /**
     * 设置根据坐标获取活动id
     * @param x
     * @param y
     */
    getActiveIndex(x: any, y: any): any;
    /**
     * 取消活动控制点选择
     */
    cancelActive(index: any): void;
    frameCallback(): void;
}
