import { BaseCreator } from "./BaseCreator";
import { GraphicGroup } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicGroup";
import { CreatorManager } from "./CreatorManager";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
export declare class CircularCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
}
