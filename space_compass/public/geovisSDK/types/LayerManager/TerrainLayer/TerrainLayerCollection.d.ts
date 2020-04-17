import { Layer } from "../../Core/Layer";
import { TerrainItem } from "./TerrainItem";
export declare class TerrainLayerCollection extends Layer {
    private earth;
    private _terrainLayers;
    private _show;
    private _baseProvider;
    constructor(viewer: Cesium.Viewer);
    _initBaseTerrain(provider: any): void;
    _getTerrainData(x: any, y: any, level: any, request: any): any;
    _reloadTerain(): void;
    /**
     * 目标图层的显隐
     * @method show
     *
     * ```
     * 示例代码
     * targetLayer.show=false;
     * ```
     */
    show: boolean;
    /**
    * 添加目标对象
    * @method add
    * @param  item 目标对象
    * @return
    *
    * ```
    * 示例代码
    * var tTarget = new GV.TargetItem("targetData.id",113.454,36.45,10000,0);
    *  targetLayer.add(tTarget);
    *
    * ```
    */
    add(item: any): TerrainItem;
    /**
    * 通过删除目标对象
    * @method remove
    * @param  itemid 目标对象的id
    * @return
    *
    * ```
    * 示例代码
    *  targetLayer.remove("targetData.id");
    *
    * ```
    */
    remove(itemid: string): any;
    /**
     * 清空目标对象
     * @method removeAll
     * @return {Boolean}
     *
     * ```
     * 示例代码
     *  targetLayer.removeAll();
     *
     * ```
     */
    removeAll(): void;
    /**
     * 销毁对象
     */
    private destroy;
}
