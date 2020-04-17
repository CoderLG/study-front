import { WMTSVectorProvider } from './WMTSVectorProvider';
import { GeoCanvas } from '../../Viewer/GeoCanvas';
import { Item } from '../../Core/Item';
/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量图标类
 * @see <a href='../../../examples/gallery/editor.html#iconTile'>矢量图标</a>
 */
export declare class IconTile extends Item {
    protected _imageUrl: string;
    protected _scale: number;
    protected _provider: WMTSVectorProvider;
    protected _name: any;
    protected _tileCacheSize: any;
    protected _renderTiles: any;
    protected _pickInstance: any;
    protected _pickTile: any;
    protected _tileReplacementQueue: any;
    protected _entityCluster: Cesium.EntityCluster;
    protected _entityCollection: Cesium.EntityCollection;
    protected _pickEvent: Cesium.Event;
    protected _loading: Cesium.Event;
    protected _error: Cesium.Event;
    protected _changed: Cesium.Event;
    protected _isLoading: boolean;
    protected _isPick: any;
    protected _maxLevel: any;
    protected _minLevel: any;
    protected _loaded: boolean;
    protected _pickPrimitive: Cesium.ScreenSpaceEventHandler;
    protected _oldInstance: any;
    protected _scene: any;
    private _viewer;
    protected _pickedColor: string;
    protected _id: string;
    /**
     * 初始化
     * @param options 参数类
     * @returns
     * ```
     * 示例：
     *  let iconTileOpt = new GV.IconTileOpt(urlService, layer);
     *  let iconTile = new GV.IconTile(iconTileOpt);
     *  viewer.tileLayer.add(iconTile);
     * ```
     */
    constructor(options: IconTileOpt);
    /**
     * 初始化
     * @param {GeoCanvas} 视图对象
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 添加点击回调
     * @param {Function} callback 回调方法
     * ```
     * 示例：
     *  iconTile.onPick = onPickChanged;
     *  function onPickChanged(instance) {
     *      console.log(instance);
     * }
     * ```
     */
    onPick: Function;
    /**
     * 移除
     */
    destroyItem(): void;
    /**
     * 获取名称
     * @memberof IconTileDataSource
     */
    /**
    * 设置名称
    * @memberof IconTileDataSource
    */
    name: any;
    /**
     * 获取计时器
     * @memberof IconTileDataSource
     */
    private readonly clock;
    /**
     * 获取集合器
     * @memberof IconTileDataSource
     */
    private readonly entities;
    /**
     * 获取加载状态
     * @memberof IconTileDataSource
     */
    private readonly isLoading;
    /**
     * 获取改变事件
     * @memberof IconTileDataSource
     */
    private readonly changedEvent;
    /**
     * 获取点击事件
     * @memberof IconTileDataSource
     */
    private readonly pickEvent;
    /**
     * 获取错误事件
     * @memberof IconTileDataSource
     */
    private readonly errorEvent;
    /**
     * 获取加载事件
     * @memberof IconTileDataSource
     */
    private readonly loadingEvent;
    /**
    * 获取显示状态
    * @memberof IconTileDataSource
    */
    /**
    * 设置显示状态
    * @memberof IconTileDataSource
    */
    private show;
    /**
     * 获取群集
     * @memberof IconTileDataSource
     */
    /**
    * 设置群集
    * @memberof IconTileDataSource
    */
    private clustering;
    /**
     * @private 查找当前渲染队列是否有当前瓦片
     * @memberof IconTileDataSource
     */
    private findTileFromCache;
    /**
     * @private 查找当前渲染队列是否有当前瓦片
     * @memberof IconTileDataSource
     */
    private handleParentAndChildren;
    /**
     * @private 创建广告牌
     * @memberof IconTileDataSource
     */
    private createBill;
    /**
     * @private 加载数据
     * @memberof IconTileDataSource
     */
    private processBill;
    /**
     * @private 加载数据
     * @memberof IconTileDataSource
     */
    private processFeature;
    /**
     * @private 加载数据
     * @memberof IconTileDataSource
     */
    private loadBillData;
    /**
     * @private 为瓦片添加数据
     * @memberof IconTileDataSource
     */
    private processTile;
    /**
     * @private 生成瓦片唯一Key值
     * @memberof IconTileDataSource
     */
    private getRenderTileKeys;
    /**
     * @private 更新函数
     * @memberof IconTileDataSource
     */
    private update;
    /**
     * @private 销毁
     * @memberof IconTileDataSource
     */
    private destroy;
}
/**
 * 图标矢量参数
 */
export declare class IconTileOpt {
    /**服务地址 */
    url: string;
    /**图层信息 */
    layer: string;
    /**图标路径 */
    imageUrl: string;
    /**数据显示最小层级 （范围：>=0 && <=22）*/
    minLevel: number;
    /**数据显示最大层级 （范围：>=0 && <=22）*/
    maxLevel: number;
    /**是否开启选中功能 */
    isPick: boolean;
    /**被选中颜色 */
    pickedColor: string;
    /**图标缩放系数 （范围：>=0 && <=10）*/
    scale: number;
    constructor(url: string, layer: string, imageUrl?: string, minLevel?: number, maxLevel?: number, isPick?: boolean, pickedColor?: string, scale?: number);
}
