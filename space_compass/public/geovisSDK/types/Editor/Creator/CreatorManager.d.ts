import { Event } from "../../Core/Event";
import { GraphicGroup } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicGroup";
import { ControlPointSet } from "../EditorUtil/ControlPointSet";
import { GraphicLayer } from "../../LayerManager/GraphicLayer/GraphicLayer";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
export declare class CreatorManager extends Event {
    private _viewer;
    private _creatorList;
    private _currentCreator;
    private _controlPointSet;
    private _graphicLayer;
    constructor(viewer: Cesium.Viewer, graphicLayer: GraphicLayer);
    /**
     * 获取控制点集对象
     */
    readonly controlPointSet: ControlPointSet;
    /**
     * 根据类型获取创建器
     */
    private _getCreatorByType;
    setCursor(cursor: any): void;
    /**
     * 开启创建
     * @param itemOpt 对象属性
     * @param group 要添加的组
     * @param finishCallback 创建结束回调函数
     */
    create(itemOpt: any, group: GraphicGroup, finishCallback: any): GraphicItem;
    /**
     * 终止创建
     */
    stopCreate(): void;
}
