import { GeoCanvas } from '../../../Viewer/GeoCanvas';
/**
 * @类别 需要用户创建的类</br>
 * @描述 MapV复合可视化，搭建了球和MapV之间的桥梁，具体MapV应用请参见MapV官网（https://mapv.baidu.com/）</br>
 * @see <a href='../../../examples/gallery/editor.html#honeyComb'>蜂巢网格</a>
 * @see <a href='../../../examples/gallery/editor.html#migrate'>迁徙图</a>
 * @see <a href='../../../examples/gallery/editor.html#weiboPoint'>微博点</a>
 * @see <a href='../../../examples/gallery/editor.html#migrateAll'>数据链路</a>
 * @see <a href='../../../examples/gallery/editor.html#square'>方形网格</a>
 */
export declare class MapV {
    protected _MapV: any;
    protected _viewer: any;
    private _show;
    private _MapVOptions;
    constructor(mapvOpt: MapVOpt);
    show: boolean;
    /**
     * 初始化mapv
     * @param viewer
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 销毁mapv
     */
    destroyItem(): void;
    /**
     * 获取mapv参数
     */
    getMapVOpt(): MapVOpt;
    /**
     * mpv更新
     * @param mapvOpt
     */
    update(mapvOpt: MapVOpt): void;
    /**
     * 通过数据创建Mapv
     * @param options
     */
    create(options: MapVOpt): any;
    /**
     * 创建数据集
     * @public
     * @param [data] 包含初始数据的可选数组
     */
    createDataSet(data: any): any;
    private _initMapv;
    private _DataSetAdd;
    private _DataSetReset;
    private _DataSetGet;
    private _DataSetSet;
    private _DataSetClear;
    private _DataSetRemove;
    private _DataSetUpdate;
    private _DataSetTransferCoordinate;
    private _DataSetinitGeometry;
    private _DataSetGetMax;
    private _DataSetGetSum;
    private _DataSetGetMin;
    private _DataSetUnique;
    /**
     * 获取
     * @param data
     */
    private _getDataSet;
    /**
     * 根据弧线的坐标节点数组
     * @param data
     */
    private _getCurvePoints;
    /**
     * 获取城市中心坐标点
     * @param name
     */
    private _getCenterByCityName;
    /**
     * 根据城市名获取省份
     * @param name
     */
    private _getProvinceNameByCityName;
    utilCurve: {
        getPoints: (data: any) => any;
    };
    utilCityCenter: {
        getCenterByCityName: (name: any) => any;
        getProvinceNameByCityName: (name: any) => any;
    };
    geojson: {
        getDataSet: (data: any) => any;
    };
    /**
     * 数据集操作方法
     */
    DataSet: {
        add: (data: any, senderId: any) => any;
        Reset: () => any;
        get: (args: any) => any;
        set: (args: any) => any;
        clear: (args: any) => any;
        remove: (args: any) => any;
        update: (args: any, condition: any) => any;
        transferCoordinate: (data: any, transferFn: any, fromColumn: any, toColumnName: any) => any;
        initGeometry: (transferFn: any) => any;
        getMax: (columnName: any) => any;
        getSum: (columnName: any) => any;
        getMin: (columnName: any) => any;
        getUnique: (columnName: any) => any;
    };
}
/**
  * @类别 需要用户创建的类</br>
  * @描述 MapV参数类</br>
  * @see <a href='../../../examples/gallery/editor.html#honeyComb'>蜂巢网格</a>
  * @see <a href='../../../examples/gallery/editor.html#migrate'>迁徙图</a>
  * @see <a href='../../../examples/gallery/editor.html#weiboPoint'>微博点</a>
  * @see <a href='../../../examples/gallery/editor.html#migrateAll'>数据链路</a>
  * @see <a href='../../../examples/gallery/editor.html#square'>方形网格</a>
  */
export declare class MapVOpt {
    /**
     * mapv 数据
     */
    data: number[];
    /**
     * mapv参数
     */
    options: any;
    constructor(data?: Array<number>, options?: any);
}
