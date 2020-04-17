import { GeoCanvas } from '../Viewer/GeoCanvas';
import { PlaceName } from './PlaceName';
import { UserInfo } from './UserInfo';
import { LineTile } from '../LayerManager/TileLayer/LineTile';
/**
 * @类别 需要创建，new iCenter()</br>
 * @描述 提供iCenter产品中图层管理相关的操作 </br>
 */
export declare class iCenter {
    private _placeName;
    private _userInfo;
    private _viewer;
    private _url;
    private _username;
    private _password;
    private _icenterToken;
    /**
     * 初始化
     * @param {GeoCanvas} viewer
     * @param {string} url 连接的icenter环境地址
     * @param {string} username 用户名
     * @param {string} password 密码
     * ```
     * 示例代码
     * const icenter = new GV.iCenter(viewer, 'http://icenter.geovis.online', 'admin', 'icenter');
     * ```
     */
    constructor(viewer: GeoCanvas, url: String, username: String, password: String);
    /**
     * 用户类
     */
    readonly userInfo: UserInfo;
    /**
     * 地名类
     */
    readonly placeName: PlaceName;
    private _loginIcenter;
    /**
     * 获取基础影像图层
     * @param {number} page 当前页数
     * @param {number} pageSize 每页的条目数
     * @return
     * ```
     * 示例代码：
     * icenter.getBaseImageLayers(1, 10).then(res => {
     *      res = {
     *          data: [{
     *              layerName: '中国',
     *              gridSet: 'EPSG:4326',
     *              mimeType: 'PNG',
     *              ......
     *          }, ......],
     *          total: 100,
     *      }
     * }).catch(e => {
     *      console.log(e)
     * });
     * ```
     */
    getBaseImageLayers(page: number, pageSize: number): Promise<any>;
    /**
     * 获取影像图层
     * @param {number} page 当前页数
     * @param {number} pageSize 每页的条目数
     * ```
     * 示例代码：
     * icenter.getImageLayers(1, 10).then(res => {
     *      console.log(res)
     * }).catch(e => {
     *      console.log(e)
     * });
     * 返回值：
     * 与基础影像返回值类似
     * ```
     */
    getImageLayers(page: number, pageSize: number): Promise<any>;
    /**
     * 获取矢量图层
     * @param {number} page 当前页数
     * @param {number} pageSize 每页的条目数
     * ```
     * 示例代码：
     * icenter.getVectorLayers(1, 10).then(res => {
     *      console.log(res)
     * }).catch(e => {
     *      console.log(e)
     * });
     * 返回值：
     * 与基础影像返回值类似
     * ```
     */
    getVectorLayers(page: number, pageSize: number): Promise<any>;
    /**
     * 获取地形图层
     * @param {number} page 当前页数
     * @param {number} pageSize 每页的条目数
     * ```
     * 示例代码：
     * icenter.getTerrainLayers(1, 10).then(res => {
     *      console.log(res)
     * }).catch(e => {
     *      console.log(e)
     * });
     * 返回值：
     * 与基础影像返回值类似
     * ```
     */
    getTerrainLayers(page: number, pageSize: number): Promise<any>;
    /**
     * 获取时序影像图层
     * @param {number} page 当前页数
     * @param {number} pageSize 每页的条目数
     * ```
     * 示例代码：
     * icenter.getTimeImageLayers(1, 10).then(res => {
     *      console.log(res)
     * }).catch(e => {
     *      console.log(e)
     * });
     * 返回值：
     * 与基础影像返回值类似
     * ```
     */
    getTimeImageLayers(page: number, pageSize: number): Promise<any>;
    /**
     * 获取倾斜摄影图层
     * @param {number} page 当前页数
     * @param {number} pageSize 每页的条目数
     * ```
     * 示例代码：
     * icenter.getTiltPhotoLayers(1, 10).then(res => {
     *      console.log(res)
     * }).catch(e => {
     *      console.log(e)
     * });
     * 返回值：
     * 与基础影像返回值类似
     * ```
     */
    getTiltPhotoLayers(page: number, pageSize: number): Promise<any>;
    /**
     * 创建基础影像图层
     * @param {object} options 图层列表返回值中的单个图层对象
     * ```
     * 示例代码：
     * const provider = icenter.createBaseImageLayer({layerName: 'google-PNG-4326', gridSet: 'EPSG:4326', mimeType: 'image/png', ......});
     * 加载返回值的方法如下：
     * const layer = viewer.imageryLayers.addImageryProvider(provider);
     * viewer.zoomTo(layer)
     * ```
     */
    createBaseImageLayer(options: {
        layerName: string;
        mimeType: string;
        gridSet: string;
        workspace: string;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    }): Cesium.WebMapTileServiceImageryProvider;
    /**
     * 创建影像图层
     * @param {object} options 图层列表返回值中的单个图层对象
     * ```
     * 示例代码：
     * const provider = icenter.createImageLayer({layerName: 'pick-PNG-4326', gridSet: 'EPSG:4326', mimeType: 'image/png', ......});
     * 加载返回值的方法如下：
     * const layer = viewer.imageryLayers.addImageryProvider(provider);
     * viewer.zoomTo(layer)
     * ```
     */
    createImageLayer(options: {
        layerName: string;
        mimeType: string;
        gridSet: string;
        workspace: string;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    }): Cesium.WebMapTileServiceImageryProvider;
    /**
     * 创建矢量图层
     * @param {object} options 图层列表返回值中的单个图层对象
     * ```
     * 示例代码：
     * const vector = icenter.createVectorLayer({layerName: 'icenter:国界线-PNG-4326', ......});
     * 加载返回值的方法如下：
     * viewer.tileLayer.add(vector);
     * ```
     */
    createVectorLayer(options: {
        layerName: string;
        workspace: string;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    }): LineTile;
    /**
     * 创建地形图层
     * @param {object} options 图层列表返回值中的单个图层对象
     * ```
     * 示例代码：
     * const provider = icenter.createTerrainLayer({layerName: 'taiwanDEM-TERRAIN-4326', minX: 119.9995833, minY: 19.9995838, maxX: 125.0004167, maxY: 25.0004171, ......});
     * 加载返回值的方法如下：
     * viewer.terrainProvider = provider;
     * ```
     */
    createTerrainLayer(options: {
        layerName: string;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    }): Cesium.CesiumTerrainProvider;
    /**
     * 创建倾斜摄影图层
     * @param {object} options 图层列表返回值中的单个图层对象
     * ```
     * 示例代码：
     * const tiltPhoto = icenter.createTiltPhotoLayer({layerName: 100, ......});
     * 加载返回值的方法如下：
     * tiltPhoto.readyPromise.then((tileset) => {
     *     viewer.scene.primitives.add(tileset);
     *     viewer.flyTo(tileset);
     * });
     * ```
     */
    createTiltPhotoLayer(options: {
        layerName: string;
    }): Cesium.Cesium3DTileset;
}
