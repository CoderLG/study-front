import { BaseEditor } from "./BaseEditor";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
export declare class RectangleEditor extends BaseEditor {
    private _ctrlPositions;
    setEditItem(item: GraphicItem): void;
    getPositions(): any;
}
