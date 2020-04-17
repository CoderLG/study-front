import { GeoCanvas } from '../../Viewer/GeoCanvas';
import { Item } from '../../Core/Item';
/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量面类
 * @see <a href='../../../examples/gallery/editor.html#modelTile'>矢量白模</a>
 */
export declare class PolygonTile extends Item {
    protected _scene: any;
    private _viewer;
    protected _provider: any;
    protected _name: any;
    protected _tileCacheSize: any;
    protected _color: any;
    protected _isPick: any;
    protected _pickedColor: any;
    protected _minLevel: any;
    protected _maxLevel: any;
    protected _pickInstance: any;
    protected _pickTile: any;
    protected _pickPrimitive: any;
    protected _changed: Cesium.Event;
    protected _error: Cesium.Event;
    protected _loading: Cesium.Event;
    protected _isLoading: boolean;
    protected _entityCluster: Cesium.EntityCluster;
    protected _entityCollection: Cesium.EntityCollection;
    protected _loaded: boolean;
    protected _tileReplacementQueue: any;
    protected _renderTiles: Cesium.AssociativeArray;
    protected _pickEvent: Cesium.Event;
    protected _outColor: any;
    protected _oldInstance: any;
    protected _id: string;
    private _isExtruded;
    private _extrudedHeight;
    /**
     * 初始化
     * @param options 参数类
     * @returns
     * ```
     * 示例：
     *  let polygonTileTileOpt = new GV.PolygonTileTileOpt(urlService, layer);
     *  polygonTileTileOpt.color = '#ffffff';
     *  let polygonTile = new GV.PolygonTile(polygonTileTileOpt);
     *  viewer.tileLayer.add(polygonTile);
     * ```
     */
    constructor(options: PolygonTileOpt, name?: string);
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
     * 移除
     */
    destroyItem(): void;
    /**
     *添加回掉监听
     * @param {Function} callback 回调
     */
    onPick: Function;
    /**
     * 获取名称
     * @memberof ModelTileDataSource
     */
    /**
    * 更改名称
    * @memberof ModelTileDataSource
    */
    name: any;
    /**
     * 获取计时器
     * @memberof ModelTileDataSource
     */
    private readonly clock;
    /**
     * 获取集合器
     * @memberof ModelTileDataSource
     */
    private readonly entities;
    /**
     * 获取加载状态
     * @memberof ModelTileDataSource
     */
    private readonly isLoading;
    /**
     * 获取更改事件
     * @memberof ModelTileDataSource
     */
    private readonly changedEvent;
    /**
     * 获取点击事件
     * @memberof ModelTileDataSource
     */
    private readonly pickEvent;
    /**
     * 获取错误事件
     * @memberof ModelTileDataSource
     */
    private readonly errorEvent;
    /**
     * 获取加载事件
     * @memberof ModelTileDataSource
     */
    private readonly loadingEvent;
    /**
     * 获取是否显示
     * @memberof ModelTileDataSource
     */
    /**
    * 更改显示
    * @memberof ModelTileDataSource
    */
    private show;
    /**
     * 获取群集
     * @memberof ModelTileDataSource
     */
    /**
    * 设置群集
    * @memberof ModelTileDataSource
    */
    private clustering;
    /**
     * @private 查找当前渲染队列是否有当前瓦片
     * @memberof ModelTileDataSource
     */
    private findTileFromCache;
    /**
     * @private 查找父节点与子节点
     * @memberof ModelTileDataSource
     */
    private handleParentAndChildren;
    /**
     * @private 创建白模实体
     * @memberof ModelTileDataSource
     */
    private createModel;
    /**
     * @private 加载数据
     * @memberof ModelTileDataSource
     */
    private processModel;
    /**
     * @private 加载数据
     * @memberof ModelTileDataSource
     */
    private processFeature;
    /**
     * @private 加载数据
     * @memberof ModelTileDataSource
     */
    private loadModelData;
    /**
     * @private 为瓦片添加数据
     * @memberof ModelTileDataSource
     */
    private processTile;
    /**
     * @private 生成瓦片唯一Key值
     * @memberof ModelTileDataSource
     */
    private getRenderTileKeys;
    /**
     * @private 更新函数
     * @memberof ModelTileDataSource
     */
    private update;
    /**
     * @private 销毁
     * @memberof ModelTileDataSource
     */
    private destroy;
}
/**
 * 面矢量参数类
 */
export declare class PolygonTileOpt {
    /**服务地址 */
    url: string;
    /**图层信息 */
    layer: string;
    /**面颜色 */
    color: string;
    /**显示最小层级 （范围：>=0 && <=22）*/
    minLevel: number;
    /**显示最大层级 （范围：>=0 && <=22）*/
    maxLevel: number;
    /**是否选中 */
    isPick: boolean;
    /**是否拉伸 */
    isExtruded: boolean;
    /**选中后颜色 */
    pickedColor: string;
    /**拉伸高度 */
    extrudedHeight: number;
    constructor(url: string, layer: string, color?: string, minLevel?: number, maxLevel?: number, isPick?: boolean, isExtruded?: boolean, pickedColor?: string, extrudedHeight?: number);
}
