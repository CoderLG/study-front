import { Item } from "../../Core/Item";
export declare class TerrainItem extends Item {
    private _show;
    private _index;
    private _terrainProvider;
    constructor(terrainProvider: any, option: any);
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
    readonly terrainProvider: any;
    /**
     * 目标图层的显隐
     * @method show
     *
     * ```
     * 示例代码
     * targetLayer.show=false;
     * ```
     */
    index: number;
    toJson(): object;
    /**
     * 解析json对象
     */
    parseJson(json: object): void;
    /**
     * 销毁对象
     */
    private destroy;
}
