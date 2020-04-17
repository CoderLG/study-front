import { TargetItem } from "./TargetItem";
export declare class TargetHistory {
    _historyDataSource: Cesium.CustomDataSource;
    _dsName: string;
    _viewer: Cesium.Viewer;
    _entities: any;
    _trackLineColor: Cesium.Color;
    _trackLineWidth: number;
    _trackPointColor: Cesium.Color;
    _trackPointSize: number;
    _pathList: Map<any, any>;
    /**
    * TargetItem 构造函数
    * @param id 目标对象的id
    * @param lon 目标对象的经度
    * @param lat 目标对象的纬度
    * @param alt 目标对象的高度
    * @param smoothTrack 是否需要平滑
    * ```
    * 示例代码
    *  let item = new GV.TargetItem('gb324244234sdf432',113.654,36.542.6921,true)
    * ```
    */
    constructor(viewer: any);
    _timePosition2sample(timePostion: Array<number>): (any[] | Cesium.SampledPositionProperty)[];
    /**
     * 添加目标运动轨迹
     * @method addTargetHistory
     *
     * ```
     * 示例代码
     * var itemTypecode = TargetHistory.addTargetHistory(tagert,[[113,36,500,1574906965962]]) ;
     *
     *
     * ```
     */
    addTargetHistory(tagert: TargetItem, timePostion: Array<number>): void;
    removeAll(): void;
    /**
    * 设置时间区间
    * @method setTimeSection
    *
    * ```
    * 示例代码
    * var itemTypecode = TargetHistory.setTimeSection(1574906965962,1574906969962) ;
    *
    *
    * ```
    */
    setTimeSection(start: number, end: number): void;
    /**
    * 运行速度
    * @method speed
    *
    * ```
    * 示例代码
    * var speed = TargetHistory.speed;
    * TargetHistory.speed = 1.5;
    *
    *
    * ```
    */
    speed: number;
    /**
     * 是否开启动画
     * @method animate
     *
     * ```
     * 示例代码
     * var animate = TargetHistory.animate;
     * TargetHistory.animate = true;
     *
     *
     * ```
     */
    animate: boolean;
    /**
      * 轨迹是否显示
      * @method showTrack
      *
      * ```
      * 示例代码
      * var show = targetItem.showTrack;
      * targetItem.showTrack = true ;
      * ```
      */
    show: boolean;
    /**
     * 获取设置轨迹线颜色
     * @method trackLineColor
     *
     * ```
     * 示例代码
     * var color = targetItem.trackLineColor;
     * targetItem.trackLineColor = Cesium.Color.fromRandom() ;
     * ```
     */
    lineColor: Cesium.Color;
    /**
     * 获取设置轨迹线宽度
     * @method trackLineWidth
     *
     * ```
     * 示例代码
     * var width = targetItem.trackLineWidth;
     * targetItem.trackLineWidth = 10 ;
     * ```
     */
    lineWidth: number;
    /**
     * 获取设置轨迹点颜色
     * @method trackPointColor
     *
     * ```
     * 示例代码
     * var width = targetItem.trackPointColor;
     * targetItem.trackLineWidth = 10 ;
     * ```
     */
    pointColor: Cesium.Color;
    /**
     * 获取设置轨迹点的大小
     * @method trackPointSize
     *
     * ```
     * 示例代码
     * var size = targetItem.trackPointSize;
     * targetItem.trackLineWidth = 10 ;
     * ```
     */
    pointSize: number;
}
