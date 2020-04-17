import { BaseEditor } from "./BaseEditor";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
export declare class LineEditor extends BaseEditor {
    setEditItem(item: GraphicItem): void;
    private _screenPixel;
    private _getLengthByMouse;
    getPositions(): any;
}
