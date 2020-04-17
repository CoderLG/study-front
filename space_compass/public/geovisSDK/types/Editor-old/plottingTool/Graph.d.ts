/**
 * 标绘对象基类
 */
export default class Graph {
    viewer: Cesium.Viewer;
    /**
     * 脏标记
     */
    isChanged: boolean;
    static seq: number;
    /**
     * @private
     */
    entities: any;
    /**
     * @private Cesium.Entity标绘对象
     */
    ent: any;
    /**
     * set max ctl point number
     * when ctlPoints.length >= maxPointNum call this.finish()
     */
    /**
     * @private 控制点最大个数
     */
    maxPointNum: number;
    /**
     * 控制点最小个数
     */
    minPointNum: number;
    /**
     * @private
     */
    graph: any;
    /**
     * graph
     *  L ctl (graphType='ctlRoot')
     *      L children (graphType='ctl')
     *  L shape (graphType='shapeRoot')
     *      L children (graphType='shp')
     */
    /**
     * @private是否高亮
     */
    highLighted: any;
    /**
     * 属性
     */
    properties: any[];
    /**
     * 属性对象，let k in props
     */
    props: any;
    private _isReadOnly;
    constructor(properties: any, viewer: any, layer: any);
    protected initProps(defs: any): void;
    protected initCtls(properties: any): void;
    protected initRootEntity(layer: any): void;
    protected initShape(): void;
    /**
     * 返回当前Graph的属性，以及控制点数据
     */
    getProperties(): any;
    /**
     * 返回当前graph的所有控制点坐标（cartesian3）
     */
    getCtlPositions(): any;
    /**
     * 设置控制点
     * @param index 序号
     * @param ctrls 控制点
     */
    setCtrlPosition(index: number, ctrls: any): void;
    protected _ctrlPosition: Array<Array<number>>;
    /**
     * 控制点
     */
    readonly ctrlPosition: number[][];
    /**
     * 增加控制点
     * @private
     * @param cartesian3
     */
    addCtl(cartesian3: any, index?: any): any;
    /**
     * @private
     * @param ctl
     */
    handleNewCtl(ctl: any): void;
    /**
     * 增加控制点
     * @param pos  经纬度位置点
     * @param index 插入位置
     */
    addCtlPoint(pos: any, index?: any): void;
    protected fillShape(ent: any): any;
    /**
     * 对于maxPointNum为指定值的图形，返回是否已达到最大ctl数量
     * 比如rectange只需要2个点即可结束绘制
     */
    ishaveMaxCtls(): boolean;
    /**
     * 返回当前ctl数量是否可以绘制图形
     * 无限max点的图形比较min值，比如，polygon至少需要3个点，polyline至少需要2个点...
     * 对于限定ctl数量的图形，ctlnum >= max 返回true
     */
    isCtlNumValid(): boolean;
    /**
     * 进入编辑模式
     */
    toEdit(): void;
    /**
     * 图形绘制结束后调用
     */
    finish(): void;
    /**
     * @private
     */
    delete(): void;
    /**
     * @private
     * @param ents
     */
    deleteEnts(ents: any): void;
    /**
     * 删除最后一个控制点
     */
    deleteLastPoint(): void;
    /**
     * 删除控制点
     * @param {ctlPoint} ctlPoint
     */
    deleteCtlPoint(ctlPoint: any): void;
    /**
     * 根据屏幕移动修改heading
     * @param start
     * @param end
     */
    rotateByHeading?(start: Cesium.Cartesian2, end: Cesium.Cartesian2): any;
    /**
   * 根据屏幕移动修改Pich
   * @param start
   * @param end
   */
    rotateByPitch?(start: Cesium.Cartesian2, end: Cesium.Cartesian2): any;
    /**
   * 根据屏幕移动修改Roll
   * @param start
   * @param end
   */
    rotateByRoll?(start: Cesium.Cartesian2, end: Cesium.Cartesian2): any;
    /**
     * 水平移动
     * @param start
     * @param end
     */
    movePosition(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    ChangeMoveByMouse(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 垂直移动
     * @param start
     * @param end
     */
    moveHeight(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    ScreenPixel(): number;
    ChangeLengthByMouse(height: any, diff: any, heightCoeficient?: number): any;
    changeScaleByMouse(scale: number, start: Cesium.Cartesian2, end: Cesium.Cartesian2): number;
    /**
     * 放大缩小
     * @param start
     * @param end
     */
    scale?(start: Cesium.Cartesian2, end: Cesium.Cartesian2): any;
    /**
     * 获取中心点
     */
    getCenter(): Cesium.Cartesian3;
}
