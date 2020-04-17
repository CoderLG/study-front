import { Event } from "../../Core/Event";
import { CreatorManager } from "./CreatorManager";
import { GeoPoint } from "../../Utils/GeoPoint";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
import { GraphicGroup } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicGroup";
export declare class BaseCreator extends Event {
    protected _viewer: Cesium.Viewer;
    protected _father: CreatorManager;
    protected _createItem: GraphicItem;
    protected _editGroup: GraphicGroup;
    private _handler;
    private _controlPointSet;
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    /** handler单例 */
    protected getHandler(): Cesium.ScreenSpaceEventHandler;
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
    protected setCtrPoint(point: GeoPoint): void;
    protected addCtrPoint(point: GeoPoint): void;
    protected clearCtrPint(): void;
    protected createFinish(item: GraphicItem): void;
    protected createItem(item: GraphicItem): void;
    clear(): void;
}
