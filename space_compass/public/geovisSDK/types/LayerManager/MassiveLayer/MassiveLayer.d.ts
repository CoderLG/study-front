import { Layer } from "../../Core/Layer";
import { Item } from "../../Core/Item";
export declare class MassiveLayer extends Layer {
    private _viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Item;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
}
