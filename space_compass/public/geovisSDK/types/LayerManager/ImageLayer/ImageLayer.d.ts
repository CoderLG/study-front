import { Layer } from "../../Core/Layer";
import { Item } from "../../Core/Item";
import { ImageryItem } from "./ImageryItem";
export declare class ImageLayer extends Layer {
    _viewer: Cesium.Viewer;
    _renderItemList: any[];
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
     * 下降一层如果当前是最底层将不再下降
     * @param image 需要操作的影像对象
     */
    lower(image: ImageryItem): void;
    /**
     * 降至最底层
     * @param image 需要操作的影像对象
     */
    lowerToBottom(image: ImageryItem): void;
    /**
     * 上升一层
     * @param image 需要操作的影像对象
     */
    raise(image: ImageryItem): void;
    /**
     * 上升到最顶层
     * @param image 需要操作的影像对象
     */
    raiseToTop(image: ImageryItem): void;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    getItemList(): Item[];
    /**
     * 获取渲染对象
     */
    getRenderObject(): Cesium.ImageryLayerCollection;
    getRenderItemById(id: string): any;
}
/**
 * 投影方式
 */
export declare enum TilingSchemeE {
    /**
     * web墨卡托投影
     */
    WebMercator = 1,
    /**
     * Wgs84投影
     */
    Geographic = 2
}
