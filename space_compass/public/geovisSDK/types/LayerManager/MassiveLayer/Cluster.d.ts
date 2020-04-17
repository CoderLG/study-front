import { Item } from "../../Core/Item";
import { GeoCanvas } from "../../Viewer/GeoCanvas";
/**
 * @类别 需要用户创建的类 <br>
 * @描述 聚合点 <br>
 * @see <a href='../../../examples/gallery/editor.html#cluster'>聚合点</a>
 */
export declare class Cluster extends Item {
    private _customDataSource;
    private _viewer;
    private _options;
    private _dataSource;
    private _customStyleListener;
    private _customStyleEnable;
    /**
     * 是否开启自定义样式
     * ```
     * 示例代码：
     * cluster.addToEarth().then(()=>{
     *    // 设置参数
     *    cluster.customStyleEnable = true;
     * })
     * ```
     */
    customStyleEnable: boolean;
    private _pixelRange;
    /**
     * 设置像素范围
     * ```
     * 示例代码：
     * cluster.addToEarth().then(()=>{
     *    // 设置参数
     *    cluster.pixelRange = 20;
     * })
     * ```
     */
    pixelRange: number;
    private _minimumClusterSize;
    /**
     * 最小聚合数量
     * ```
     * 示例代码：
     * cluster.addToEarth().then(()=>{
     *    // 设置参数
     *    cluster.minimumClusterSize = 30;
     * })
     * ```
     */
    minimumClusterSize: number;
    private _enable;
    /**
     * 是否开启聚合
     * ```
     * 示例代码：
     * cluster.addToEarth().then(()=>{
     *    // 设置参数
     *    cluster.enable = true;
     * })
     * ```
     */
    enable: boolean;
    /**
     * 聚合点构造函数
     * @param options 聚合点参数对象
     * ```
     * 示例代码
     *  var clusterOpt = new GV.ClusterOpt();
     *  clusterOpt.name = "cluster";
     *  clusterOpt.pixelRange = 10;
     *  clusterOpt.minimumClusterSize = 5;
     *  clusterOpt.enable = true;
     *  clusterOpt.customStyleEnable = true;
     *  clusterOpt.setImage = setImage;
     *  var cluster = new GV.Cluster(clusterOpt);
     * ```
     */
    constructor(options: ClusterOpt);
    /**
     * 初始化聚合点
     * @param viewer 地理画布
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 销毁聚合点
     */
    destroyItem(): void;
    /**
     * 序列化
     */
    toJson(): object;
    /**
     * 反序列化
     */
    parseJson(): void;
    /**
     * 添加实体
     * @param  {Cesium.Entity} entity
     */
    addPoint(entity: any): void;
    /**
     * 将点集合添加到球上,异步方法
     */
    addToEarth(): Promise<void>;
    private _customStyleOpen;
    private _resetStyle;
    private _cluster;
    /**
      * 获取类型
      */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
}
/**
 * 聚合类参数
 */
export declare class ClusterOpt {
    /**
     * 名称
     */
    name: string;
    /**
     * id
     */
    id: string;
    /**
     * 像素范围，点之间的距离到达此像素大小时 进行聚合
     */
    pixelRange: number;
    /**
     * 最小聚合数量
     */
    minimumClusterSize: number;
    /**
     * 开启聚合
     */
    enable: boolean;
    /**
     * 开启自定义 样式
     */
    customStyleEnable: boolean;
    /**
     * 设置聚合图标（该方法有两个参数：size 聚合点数量，billboard 聚合标牌）
     */
    setImage: Function;
}
