import { TargetItem } from "./TargetItem";
export declare class TargetPath {
    _target: TargetItem;
    _init: boolean;
    _trackLine: any;
    _trackPoints: any;
    _showTrack: boolean;
    _trackLineColor: Cesium.Color;
    _trackLineWidth: number;
    _trackPointColor: Cesium.Color;
    _trackPointSize: number;
    _trackPositionCount: number;
    _trackPositions: any[];
    _trackInit: boolean;
    _trackLineType: string;
    _mtype: PathType;
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
    constructor(target: any, pType: any);
    /**
     * 目标的轨迹点
     * @method trackPositions
     *
     * ```
     * 示例代码
     * var itemTypecode = targetItem.trackPositions ;
     * ```
     */
    readonly trackPositions: any[];
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
    trackLineColor: Cesium.Color;
    /**
    * 获取设置轨迹线保留点个数
    * @method trackLineCount
    *
    * ```
    * 示例代码
    * var count = targetItem.trackLineCount;
    * targetItem.trackLineCount = 10 ;
    * ```
    */
    trackPositionCount: number;
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
    trackLineWidth: number;
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
    trackPointColor: Cesium.Color;
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
    trackPointSize: number;
    updateTrackPoint(): void;
    /**
    * 获取目标轨迹点
    * @method getTrackPoint
    *
    * ```
    * 示例代码
    * var point = targetItem.getTrackPoint(1) ;
    * ```
    */
    getTrackPoint(index: any): any;
    /**
    * 获取目标轨迹点
    * @method trackLineType
    *
    * ```
    * 示例代码
    * var trackLineType = targetItem.trackLineType ;
    * ```
    */
    trackLineType: string;
    updatePosition(position: Cesium.Cartesian3): void;
    getTagPositions(): any[];
    render(curentPosition: any): void;
}
export declare class PathType {
    /**未飞行轨迹 */
    static backward: string;
    /**历史轨迹 */
    static foreward: string;
}
