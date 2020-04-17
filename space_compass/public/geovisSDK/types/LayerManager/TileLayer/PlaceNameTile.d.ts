import { GeoCanvas } from '../../Viewer/GeoCanvas';
import { Item } from '../../Core/Item';
/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量地名类
 * @see <a href='../../../examples/gallery/editor.html#placename'>矢量地名</a>
 */
export declare class PlaceNameTile extends Item {
    protected _name: any;
    protected _changed: Cesium.Event;
    protected _error: Cesium.Event;
    protected _isLoading: boolean;
    protected _loading: Cesium.Event;
    protected _entityCluster: Cesium.EntityCluster;
    protected _entityCollection: Cesium.EntityCollection;
    protected _url: any;
    protected _scene: any;
    private _viewer;
    protected _tileReplacementQueue: any;
    protected _tileCacheSize: any;
    protected _renderTiles: Cesium.AssociativeArray;
    protected _clusterDirty: number;
    protected _table: Map<any, any>;
    protected _styleTable: any;
    protected _id: string;
    /**
     * 初始化
     * @param options 参数类
     * @returns
     * ```
     * 示例：
     *  let PlaceNameTileOpt = new GV.PlaceNameTileOpt(urlService);
     *  let placeNameTile = new GV.PlaceNameTile(PlaceNameTileOpt);
     *  viewer.tileLayer.add(placeNameTile);
     * ```
     */
    constructor(options: PlaceNameTileOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 初始化
     * @param {GeoCanvas} 视图对象
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 删除
     */
    destroyItem(): void;
    private createLevelMap;
    private createDefaultStyles;
    /**
     * Gets or sets a human-readable name for this instance.
     * @memberof PlaceTileDataSource.prototype
     * @type {String}
     */
    private readonly clock;
    /**
     * Gets the collection of {@link Entity} instances.
     * @memberof PlaceTileDataSource.prototype
     * @type {EntityCollection}
     */
    private readonly entities;
    /**
     * Gets a value indicating if the data source is currently loading data.
     * @memberof PlaceTileDataSource.prototype
     * @type {Boolean}
     */
    private readonly isLoading;
    /**
     * Gets an event that will be raised when the underlying data changes.
     * @memberof PlaceTileDataSource.prototype
     * @type {Event}
     */
    private readonly changedEvent;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof PlaceTileDataSource.prototype
     * @type {Event}
     */
    private readonly errorEvent;
    /**
     * Gets an event that will be raised when the data source either starts or stops loading.
     * @memberof PlaceTileDataSource.prototype
     * @type {Event}
     */
    private readonly loadingEvent;
    /**
     * Gets whether or not this data source should be displayed.
     * @memberof PlaceTileDataSource.prototype
     * @type {Boolean}
     */
    private show;
    /**
     * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
     *
     * @memberof PlaceTileDataSource.prototype
     * @type {EntityCluster}
     */
    private clustering;
    private createTileKey;
    private getSubTileKeys;
    private getTiles;
    private calculateTiles;
    private getGeoCode;
    private processTile;
    private update;
    private getX;
    private getY;
    private cluster;
    private destroy;
}
/**
 * 文字矢量参数类
 */
export declare class PlaceNameTileOpt {
    /**服务地址 */
    url: string;
    /**级别映射 */
    table: Map<number, Array<number>>;
    /**样式 */
    styles: Map<number, Array<PlaceFontStyle>>;
    constructor(url: string, table?: Map<number, Array<number>>, styles?: Map<number, Array<PlaceFontStyle>>);
}
/**
 * 文字样式
 */
export declare class PlaceFontStyle {
    /**字体、大小 */
    font: string;
    /**字体颜色 */
    fillColor: string;
    /**外边框颜色 */
    outlineColor: string;
    /**外边框宽度 */
    outlineWidth: number;
    constructor(font?: string, fillColor?: string, outlineColor?: string, outlineWidth?: number);
}
