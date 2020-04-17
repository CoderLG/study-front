import { Layer } from "../../Core/Layer";
import { Satellite } from "./Satellite";
import { Item } from "../../Core/Item";
/**
 * @类别 需手动创建<br>
 * @描述 提供卫星管理相关功能<br>
 * @see  http://localhost:8088/examples/gallery/editor.html#satalliteVis
 */
export declare class SatelliteLayer extends Layer {
    viewer: Cesium.Viewer;
    private satelliteDataSource;
    private scanStripDataSource;
    private entities;
    private scanStrips;
    constructor(viewer: Cesium.Viewer);
    /**
     * 获取所有卫星名称
     * @return {Array}  卫星名称
     *
     */
    readonly satelliteNames: Array<any>;
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 根据卫星名称获取卫星
     * @param {string} 卫星名称
     */
    getSatellite(name: string): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Satellite;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    /**
     * 清除所有卫星
     */
    clear(): void;
}
