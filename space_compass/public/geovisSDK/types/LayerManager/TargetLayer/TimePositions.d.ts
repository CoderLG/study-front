export declare class TimePositions {
    _init: boolean;
    _positionList: Array<TimePosition>;
    _positionIndex: number;
    _sampleCount: number;
    _sampleIndex: number;
    _speed: number;
    _positionScratch: Cesium.Cartesian3;
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
    constructor();
    /**
    * 获取点个数
    * @method count
    *
    * ```
    * 示例代码
    *
    * ```
    */
    readonly count: number;
    /**
     * 目标颜色,css颜色值
     * @method addPosition
     * @param position 位置
     *
     * ```
     * 示例代码
     * ```
     */
    addSample(position: TimePosition): void;
    getMoveAmount(sPos: any, ePos: any): Cesium.Cartesian3;
    getNearestIndex(time: any): number;
    /**
     * 获取历史轨迹点
     * @method getHistoryPoints
     *
     * ```
     * ```
     */
    getHistoryPoints(): Array<TimePosition>;
    /**
      * 获取未飞行的点
      * @method getPreservePoints
      *
      * ```
      * ```
      */
    getPreservePoints(): Array<TimePosition>;
    /**
     * 目标颜色,css颜色值
     * @method updatePosition
     * @param lon 经度
     * @param lat 纬度
     * @param alt 高度
     * @param delay 延迟时间,单位秒
     *
     * ```
     * 示例代码
     * targetItem.updatePosition(113.254,36.254,10000);
     * targetItem.updatePosition(113.254,36.254,10000,10);
     * ```
     */
    getPosition(time: any): Cesium.Cartesian3;
    /**
     * 目标的速度
     * @method speed
     *
     * ```
     * 示例代码
     * var speed = targetItem.speed ;
     * ```
     */
    speed: number;
}
export declare class TimePosition {
    /**点位置 */
    position: Cesium.Cartesian3;
    /**时间点 */
    time: number;
    /**移动向量 */
    timeSpan: number;
    xSpan: number;
    ySpan: number;
    zSpan: number;
    /**标记点是否是历史点 */
    isHistory: boolean;
    /**点索引号 */
    index: number;
}
