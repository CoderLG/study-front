import { Event } from "../../Core/Event";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
import { ControlPointSet } from "../EditorUtil/ControlPointSet";
import { BaseEditor } from "./BaseEditor";
import { WholeEditor } from "./WholeEditor";
import { GraphicLayer } from "../../LayerManager/GraphicLayer/GraphicLayer";
export declare class EditorManager extends Event {
    _isCreating: boolean;
    private _viewer;
    private _editItem;
    private _controlPointSet;
    _editorMap: Map<string, BaseEditor>;
    _currentEditor: any;
    _wholeEditor: WholeEditor;
    _handler: Cesium.ScreenSpaceEventHandler;
    frameCallback: any;
    _graphicLayer: GraphicLayer;
    constructor(viewer: Cesium.Viewer, grathicLayer: GraphicLayer);
    /**
     * 是否是创建状态
     */
    isCreating: boolean;
    /**
     * 事件句柄
     */
    getHandler(): Cesium.ScreenSpaceEventHandler;
    /**
     * 编辑开启
     */
    open(): void;
    /**
     * 编辑关闭
     */
    close(): void;
    /**
     * 获取控制点集对象
     */
    readonly controlPointSet: ControlPointSet;
    private getEditorByType;
    setCursor(cursor: any): void;
    /**
     * 设置编辑对象
     */
    setEditItem(item: GraphicItem): void;
    /**
     * 获取编辑对象
     */
    getEditItem(): GraphicItem;
}
