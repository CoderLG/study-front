import { Item } from '../../Core/Item';
import { GeoCanvas } from '../../Viewer/GeoCanvas';
/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量线
 * @see <a href='../../../examples/gallery/editor.html#vectorDisplay'>矢量线</a>
 */
export declare class LineTile extends Item {
    protected _id: string;
    protected _name: any;
    protected _changed: any;
    protected _error: any;
    protected _isLoading: boolean;
    protected _loading: any;
    protected _entityCollection: any;
    protected _entityCluster: any;
    protected _scene: any;
    protected _provider: any;
    protected _loaded: boolean;
    protected _options: any;
    protected _tileReplacementQueue: any;
    protected _tileCacheSize: any;
    protected _minLevel: any;
    protected _renderTiles: any;
    protected _maxLevel: any;
    protected _pickEvent: any;
    protected _oldTile: any;
    protected _isBuilding: any;
    protected _pickShow: any;
    protected _pickType: any;
    protected _pickPrimitive: any;
    protected _viewer: GeoCanvas;
    private _oldInstance;
    /**
     * 初始化
     * @param options 参数类
     * @returns
     * ```
     * 示例：
     * let lineTileOpt = new GV.LineTileOpt(urlService, layer);
     * let lineTile = new GV.LineTile(lineTileOpt);
     * viewer.tileLayer.add(lineTile);
     * ```
     */
    constructor(options: LineTileOpt);
    /**
    * 获取类型
    */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    private coordinatesArrayToCartesianArray;
    private createLineString;
    private processLineString;
    private processMultiLineString;
    private createPolygon;
    private processPolygon;
    private processMultiPolygon;
    private processFeature;
    private processFeatureCollection;
    private defaultCrsFunction;
    /**
     * 初始化
     * @param {GeoCanvas} viewer 视图信息
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 删除
     */
    destroyItem(): void;
    /**
     * 添加点击回调
     * @param {Function} callback 回调
     */
    onPick: Function;
    /**
     * Gets an object that maps the name of a crs to a callback function which takes a GeoJSON coordinate
     * and transforms it into a WGS84 Earth-fixed Cartesian.  Older versions of GeoJSON which
     * supported the EPSG type can be added to this list as well, by specifying the complete EPSG name,
     * for example 'EPSG:4326'.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    private readonly crsNames;
    /**
     * Gets or sets a human-readable name for this instance.
     * @memberof VectorTileDataSource.prototype
     * @type {String}
     */
    name: any;
    private readonly clock;
    /**
     * Gets the collection of {@link Entity} instances.
     * @memberof VectorTileDataSource.prototype
     * @type {EntityCollection}
     */
    private readonly entities;
    /**
     * Gets a value indicating if the data source is currently loading data.
     * @memberof VectorTileDataSource.prototype
     * @type {Boolean}
     */
    private readonly isLoading;
    /**
     * Gets an event that will be raised when the underlying data changes.
     * @memberof GeoJsonDataSource.prototype
     * @type {Event}
     */
    private readonly changedEvent;
    /**
    * Gets an event that will be raised when pick rendered object.
    * @memberof VectorTileDataSource.prototype
    * @type {Event}
    */
    private readonly pickEvent;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof VectorTileDataSource.prototype
     * @type {Event}
     */
    private readonly errorEvent;
    /**
     * Gets an event that will be raised when the data source either starts or stops loading.
     * @memberof VectorTileDataSource.prototype
     * @type {Event}
     */
    private readonly loadingEvent;
    /**
     * Gets whether or not this data source should be displayed.
     * @memberof VectorTileDataSource.prototype
     * @type {Boolean}
     */
    private show;
    /**
     * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
     *
     * @memberof VectorTileDataSource.prototype
     * @type {EntityCluster}
     */
    private clustering;
    private pickAllTileProperty;
    private findTileFromCache;
    private findParentAndChildren;
    private handleParentAndChildren;
    private processTile;
    private getRenderTileKeys;
    private update;
    private destroy;
}
/**
 * 参数类
 */
export declare class LineTileOpt {
    /**服务地址 */
    url: string;
    /**图层信息 */
    layer: string;
    /**线颜色 */
    lineColor: string;
    /**线宽 */
    strokeWidth: Number;
    /**显示的最小层级 （范围：>=0 && <=22）*/
    minLevel: number;
    /**显示的最大层级 （范围：>=0 && <=22）*/
    maxLevel: number;
    /**是否选中 */
    isPick: boolean;
    /**选中颜色 */
    pickedColor: string;
    constructor(url: string, layer: string, lineColor?: string, strokeWidth?: number, minLevel?: number, maxLevel?: number, isPick?: boolean, pickedColor?: string);
}
