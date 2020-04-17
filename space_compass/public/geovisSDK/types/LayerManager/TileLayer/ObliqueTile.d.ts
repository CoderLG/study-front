import { Item } from '../../Core/Item';
import { GeoCanvas } from '../../Viewer/GeoCanvas';
/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 大规模倾斜摄影
 * @see <a href='../../../examples/gallery/editor.html#big3dTile'>大规模倾斜摄影</a>
 */
export declare class ObliqueTile extends Item {
    protected _name: any;
    protected _changed: Cesium.Event;
    protected _error: Cesium.Event;
    protected _loading: Cesium.Event;
    protected _isLoading: boolean;
    protected _entityCollection: Cesium.EntityCollection;
    protected _entityCluster: Cesium.EntityCluster;
    protected _scene: any;
    protected _loaded: boolean;
    protected _tileReplacementQueue: any;
    protected _tileCacheSize: any;
    protected _renderTiles: Cesium.AssociativeArray;
    protected _maxLevel: any;
    protected _showLevel: any;
    protected _deleteTileSetEvent: Cesium.Event;
    protected _pickEvent: Cesium.Event;
    protected _vectorLevel: any;
    protected _maximumScreenSpaceError: any;
    protected _url: any;
    protected _bArea: any;
    protected _minX: any;
    protected _minY: any;
    protected _maxX: any;
    protected _maxY: any;
    protected _viewer: GeoCanvas;
    protected _id: string;
    /**
     * 初始化
     * @param {string} url 服务地址
     * @param {number} vectorLevel 倾斜摄影根节点所在层级 （范围：>=0 && <=22）
     * @param {number} showLevel 层级显示基数 （范围：>=0 && <=22）
     * @returns
     * ```
     * 示例：
     *   let oblique = new GV.ObliqueTile(urlService, 13, 16);
     *   viewer.tileLayer.add(oblique);
     * ```
     */
    constructor(url: string, vectorLevel?: number, showLevel?: number);
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
     * @param {GeoCanvas} viewer 视图信息
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 移除
     */
    destroyItem(): void;
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
     * Gets an object that maps the href property of a crs link to a callback function
     * which takes the crs properties object and returns a Promise that resolves
     * to a function that takes a GeoJSON coordinate and transforms it into a WGS84 Earth-fixed Cartesian.
     * Items in this object take precedence over those defined in <code>crsLinkHrefs</code>, assuming
     * the link has a type specified.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    private readonly crsLinkHrefs;
    /**
     * Gets an object that maps the type property of a crs link to a callback function
     * which takes the crs properties object and returns a Promise that resolves
     * to a function that takes a GeoJSON coordinate and transforms it into a WGS84 Earth-fixed Cartesian.
     * Items in <code>crsLinkHrefs</code> take precedence over this object.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    private readonly crsLinkTypes;
    /**
     * Gets or sets a human-readable name for this instance.
     * @memberof ObliqueTileDataSource.prototype
     * @type {String}
     */
    name: any;
    private readonly clock;
    /**
     * Gets the collection of {@link Entity} instances.
     * @memberof ObliqueTileDataSource.prototype
     * @type {EntityCollection}
     */
    private readonly entities;
    /**
     * Gets a value indicating if the data source is currently loading data.
     * @memberof ObliqueTileDataSource.prototype
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
    * @memberof ObliqueTileDataSource.prototype
    * @type {Event}
    */
    private readonly pickEvent;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Event}
     */
    private readonly errorEvent;
    /**
     * Gets an event that will be raised when the data source either starts or stops loading.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Event}
     */
    private readonly loadingEvent;
    /**
     * Gets whether or not this data source should be displayed.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Boolean}
     */
    private show;
    /**
     * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
     *
     * @memberof ObliqueTileDataSource.prototype
     * @type {EntityCluster}
     */
    private clustering;
    private findTileFromCache;
    private tilesetDeletechange;
    private getParentKey;
    private processTile;
    private getRenderTileKeys;
    private update;
    private destroy;
}
