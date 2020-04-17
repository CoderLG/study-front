import { GeoCanvas } from "../Viewer/GeoCanvas";
import { PlaceNameTile } from '../LayerManager/TileLayer/PlaceNameTile';
export declare class PlaceName {
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
     * icenter.placeName
     * ```
     */
    constructor(viewer: GeoCanvas, url: String, username: String, password: String);
    private _loginIcenter;
    private _altitudeMap;
    /**
     * 获取模糊匹配的地名列表
     * @param {String} placeName 地名
     * ```
     * 示例代码：
     * icenter.placeName.queryPlaceNameList('北京').then(res => {
     *        res = [{
     *            DMMC: '北京',
     *            WZ: 'POINT(116.400975 39.903325)',
     *            DMDZ: '中华人民共和国',
     *            ......
     *        }, ......]
     * });
     * ```
     */
    queryPlaceNameList(placeName: string): Promise<any>;
    /**
     * 获取单个地名的位置信息
     * @param {Object} options 地名列表返回的单个地名数据对象
     * ```
     * 示例代码：
     * icenter.placeName.getPlaceNameLocation(options);
     * 返回值
     * { lon: 119, lat: 39, height: 10 }
     * ```
     */
    getPlaceNameLocation(options: any): {
        lon: any;
        lat: any;
        height: number;
    };
    /**
     * 获取全球的国家列表
     * ```
     * 示例代码：
     * icenter.placeName.getWorldTree();
     * 返回值：
     * [{
     *      name: '中国',
     * }, ......]
     * ```
     */
    getWorldTree(): Promise<any>;
    /**
     * 获取全国的省市县列表
     * ```
     * 示例代码：
     * icenter.placeName.getProvinceCityCountyTree();
     * 返回值：
     * [{
     *      code: 2121212,
     *      name: '北京',
     *      children: [],
     * }, ......]
     * ```
     */
    getProvinceCityCountyTree(): Promise<any>;
    /**
     * 获取单个国家的范围数据
     * @param {string} name 国家名称
     * ```
     * 示例代码：
     * icenter.placeName.getCountryArea('中国');
     * 返回值：
     * MULTIPOLYGON (((110.88 19.99)))
     * ```
     */
    getCountryArea(name: string): Promise<any>;
    /**
     * 获取省市县的范围数据
     * @param {object} options 省市县列表返回值中的单个数据对象
     * ```
     * 示例代码：
     * icenter.placeName.getProvinceCityCountyArea({code: 110000, ......});
     * 返回值：
     * MULTIPOLYGON (((110.88 19.99)))
     * ```
     */
    getProvinceCityCountyArea(options: any): Promise<any>;
    /**
     * 创建地名服务
     * ```
     * 示例代码：
     * const placeNameTile = icenter.placeName.createPlaceName();
     * viewer.tileLayer.add(placeNameTile);
     * ```
     */
    createPlaceName(): PlaceNameTile;
}
