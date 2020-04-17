declare module GV  {
  class Analysis {
    private _viewer;
    private _layerSplit;
    private _viewshedAnalyze;
    private _heightAnalyze;
    private _groundClip;
    private _floodAnalysis;
    private _profileAnalysis;
    private _measureDistance;
    private _measureArea;
    private _hideAnalysis;
    private _intervisibilityAnalysis;
    private _pathAnalysis;
    private _polygonVisiableAnalysis;
    private _slopeAnalysis;
    private _skylineAnalyze;
    constructor(viewer: GeoCanvas);
    private _init;
    /**
     * 卷帘工具
     */
    readonly layerSplit: LayerSplit;
    /**
    * 通视分析工具
    */
    readonly viewshedAnalyze: ViewshedAnalyze;
    /**
    * 通视分析工具
    */
    readonly heightAnalyze: HeightAnalyze;
    readonly groundClip: GroundClipping;
    /**
    * 淹没分析
    */
    readonly floodAnalysis: FloodAnalysis;
    /**
    * 剖面分析
    */
    readonly profileAnalysis: ProfileAnalysis;
    /**
     * 测距
     */
    readonly measureDistance: MeasureDistance;
    /**
    * 测面
    */
    readonly measureArea: MeasureArea;
    /**
     * 遮蔽分析
     */
    readonly hideAnalysis: HideAnalysis;
    /**
     * 点点通视
     */
    readonly intervisibilityAnalysis: IntervisibilityAnalysis;
    /**
     * 路径分析
     */
    readonly pathAnalysis: PathAnalysis;
    /**
     * 点面通视
     */
    readonly polygonVisiableAnalysis: PolygonVisiableAnalysis;
    /**
     * 坡度坡向分析
     */
    readonly slopeAnalysis: SlopeAnalysis;
    /**
     * 天际线分析
     */
    readonly SkylineAnalyze: SkylineAnalyze;
}

  class FloodAnalysis {
    private _viewer;
    private _handler;
    private _polygon;
    private _flag;
    private _point;
    private _label;
    private _rect;
    private _clampToGround;
    private _area;
    private _labelItem;
    constructor(viewer: any);
    /**
     * 开启淹没分析
     * @param unit 量算单元
     * @param color 量算颜色
     */
    open(opt: FloodAnalysisOpt): void;
    /**
     * 淹没基准点选取
     * @param data
     * @param color
     */
    private _selectBsaePoint;
    private _calcDistance;
    /**
     * 关闭淹没分析
     */
    close(): void;
}
  class FloodAnalysisOpt {
    /**
     *  是否贴地
     */
    clampToGround: true;
    /**
     * 线型颜色
     */
    color: ColorStyle;
    /**
     * 量算单元
     */
    unit: string;
    /**
     * 线型宽度
     */
    width: number;
    /**
     * 文字对象参数
     */
    labelGraphicOpt?: LabelGraphicOpt;
    /**
     * 回调函数
     */
    finshCallback?: Function;
}

/**
 * 挖地
 */
  class GroundClipping {
    /**
     * 地理画布
     */
    viewer: GeoCanvas;
    /**
     * 挖坑对象
     */
    private terrainClipPlan;
    private _path;
    /**
     * 挖地路径（经纬高）
     */
    path: Array<GeoPoint>;
    private _height;
    /**
     * 高度
     */
    height: number;
    /**
     * 构造函数
     * @param viewer 地理画布
     */
    constructor(viewer: any);
    /**
     * 初始化挖地
     * @param path 路径数据
     * @param height 挖坑深度
     * @param wallImg 坑壁图片
     * @param bottomImg 坑底图片
     */
    add(path: Array<GeoPoint>, height?: number): void;
    /**
     * 获取挖坑路径数据
     * @param path 挖坑路径
     */
    private getPositionsData;
    /**
     * 每次设置属性之后需要刷新
     */
    private updateData;
    /**
     * 清除
     */
    clear(): void;
}

  class HeightAnalyze {
    viewer: any;
    config: any;
    _layer: any;
    _points: any[];
    /**
     * 通视分析构造函数
     * @method constructor
     * @param viewer Cesium.Viewer 对象
     *
     */
    constructor(viewer: any);
    color: any;
    /**
    * @method height
      * 高度值
    *
    *  示例代码
    * ```
    *  var heightAnalyze = viewer.analysis.heightAnalyze;
    *  heightAnalyze.height = 400;
    *  heightAnalyze.open();
    * ```
    *
      */
    height: number;
    /**
     * 坐标点
     * @method setPolygon
     * @param points 经纬度点坐标，格式:[经度,纬度,高度]
     * 示例代码
     * ```
     *  var heightAnalyze = viewer.analysis.heightAnalyze;
     *   heightAnalyze.height = 400;
     *   heightAnalyze.setPolygon([
     *            109.0349381448271,34.31717633782572,386.9231637517154,109.03900961665003,
     *            34.321847375754345,397.67154065059685,
     *            109.03346632153671,34.326639657406226,395.4792360496345,
     *            109.03144059631933,34.32489928901451,390.96019381390937,
     *            109.0311066948082,34.323485025163286,388.67673695624234,
     *            109.03229719685534,34.31991103654269,385.82666822350035,
     *            109.03358048811168,34.31842706237503,386.4791369856086,
     *            109.03433018158603,34.31771892610954,387.5863231772101
     *        ]);
     *  heightAnalyze.open();
     * ```
     *
     */
    setPolygon(points: Array<Number>): void;
    /**
    * 开始分析
    * @method open
    * @return
    */
    open(): void;
    /**
       * 结束视域分析
       * @method close
       */
    close(): void;
    private updateLayer;
    private creategeometry;
}

/**
 * 遮蔽分析
 */
  class HideAnalysis {
    /**
     * 视图对象
     */
    private viewer;
    /**
     * 位置
     */
    private center;
    /**
     * 范围
     */
    private dis;
    /**
     * 最大遮蔽角
     */
    private veilAngle;
    /**
     * 遮蔽度
     */
    private ratio;
    /**
     * 切分层级
     */
    private demTileLevel;
    private dataModel;
    private entity;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param center 中心点
     * @param dis 范围
     * @param veilAngle  最大遮蔽角
     */
    open(center: GeoPoint, dis?: number, veilAngle?: number): void;
    private init;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 拼接url 仅支持number object
     * @param data
     * @param obj
     */
    private params;
    private create;
    /**
     * 获取遮蔽度
     */
    getRatio(): number;
    /**
     * 删除
     */
    close(): void;
}

/**
 * 点点通视
 */
  class IntervisibilityAnalysis {
    /**
     * 视图对象
     */
    private viewer;
    /**
     * 起始点位置
     */
    private startPoint;
    /**
     * 终止点位置
     */
    private endPoint;
    /**
     * 切分层级
     */
    private demTileLevel;
    /**
     * 分析结果
     */
    private analysisResult;
    /**
     * 线宽
     */
    private lineWidth;
    private lineGreen;
    private lineRed;
    private dirLine;
    private dataModel;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param startPoint 起点
     * @param endPoint 终点
     * @param lineWidth 线宽
     */
    open(startPoint: GeoPoint, endPoint: GeoPoint, lineWidth?: 5): void;
    private init;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 添加上球
     * @param data
     */
    private createPrimitive;
    /**
     * 拼接url 仅支持number object
     * @param data
     * @param obj
     */
    private params;
    /**
     * 存在障碍点
     */
    private createObstructPrimitive;
    /**
     * 通视情况
     */
    private createDirPrimitive;
    /**
     * 关闭分析
     */
    close(): void;
    /**
     * 获取分析结果
     */
    getAnalysisResult(): string;
}

/**
 * 卷帘功能
 */
  class LayerSplit {
    private _layer;
    private _viewer;
    private _type;
    private _handler;
    /**
     * 构造函数
     * @param viewer 卷帘视口
     * @param layer 卷帘图层
     * @param type 卷帘方式
     * @param style 卷帘样式
     */
    constructor(viewer: GeoCanvas);
    private _getType;
    private _formatCss;
    private _main;
    /**
     *  开启卷帘
     * @param {Cesium.ImageryLayer} layer
     * @param {string} type 卷帘类型['left','right','up','bottom']
     * @param {string} barColor 卷帘条带颜色
     * @param {number} barWidth 卷帘条带宽度
     */
    open(layer: Cesium.ImageryLayer, type?: string, barColor?: string, barWidth?: number): void;
    /**
     * 关闭卷帘
     */
    close(): void;
}

  class MeasureArea {
    private _viewer;
    private _area;
    private _clampToGround;
    private _ploygon;
    private _labelItem;
    constructor(viewer: Cesium.Viewer);
    /**
     * 开启测面
     * @param clampToGround 是否计算贴地
     * @param unit 量算单位 meter kilometer
     * @param color 量算面颜色
     * @param labelGraphicOpt 文字对象参数
     * @param finshCallback 回调函数
     */
    open(areaOpt: MeasureAreaOpt): void;
    private _calcDistance;
    /**
     *  关闭测面
     */
    close(): void;
}
  class MeasureAreaOpt {
    /**
     * 是否计算贴地
     */
    clampToGround: boolean;
    /**
     * 线是否贴地
     */
    polygonClamp: boolean;
    /**
     * 量算单位 meter kilometer
     */
    unit: string;
    /**
     * 量算线颜色
     */
    color: string;
    /**
     * 文字对象参数
     */
    labelGraphicOpt?: LabelGraphicOpt;
    /**
     * 回调函数
     */
    finshCallback?: Function;
}

  class MeasureDistance {
    private _viewer;
    private _distance;
    private _clampToGround;
    private _polyline;
    private _labelItem;
    constructor(viewer: Cesium.Viewer);
    /**
     * 开启测距
     * @param disopt 测距参数
     */
    open(disopt: MeasureDistanceOpt): void;
    private _calcDistance;
    /**
     *  关闭测距
     */
    close(): void;
}
  class MeasureDistanceOpt {
    /**
     * 是否计算贴地
     */
    clampToGround: boolean;
    /**
     * 线是否贴地
     */
    lineClamp: boolean;
    /**
     * 量算单位 meter kilometer
     */
    unit: string;
    /**
     * 量算线颜色
     */
    color: string;
    /**
     * 文字对象参数
     */
    labelGraphicOpt?: LabelGraphicOpt;
    /**
     * 回调函数
     */
    finshCallback?: Function;
}

/**
 * 路径分析
 */
  class PathAnalysis {
    /**
     * 视图对象
     */
    private viewer;
    /**
     * 起点
     */
    private start;
    /**
     * 终点
     */
    private end;
    private demTileLevel;
    private pathArr;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param start 起点
     * @param end 终点
     */
    open(start: GeoPoint, end: GeoPoint): void;
    private init;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 拼接url 仅支持number object
     * @param data
     * @param obj
     */
    private params;
    /**
     * 结束分析
     */
    close(): void;
}

/**
 * 点面通视
 */
  class PolygonVisiableAnalysis {
    /**
     * 视图对象
     */
    private viewer;
    /**
     * 距离
     */
    private radius;
    /**
     * 开始角度
     */
    private startAngle;
    /**
     * 结束角度
     */
    private endAngle;
    /**
     * 层级
     */
    private demTileLevel;
    private dataModel;
    private ratio;
    /**
     * 位置
     */
    private center;
    private entity;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param center 中心点
     * @param radius 范围
     * @param startAngle 起始角 0-360
     * @param endAngle 终止角 范围 0-360
     */
    open(center: GeoPoint, radius?: number, startAngle?: number, endAngle?: number): void;
    private init;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 拼接url 仅支持number object
     * @param data
     * @param obj
     */
    private params;
    private create;
    /**
     * 删除
     */
    close(): void;
    /**
     * 获取遮蔽度
     */
    getRatio(): number;
}

  class ProfileAnalysis {
    private _viewer;
    private _measureDistance;
    constructor(viewer: any);
    /**
     * 开启剖面分析
     * @param callback 回调函数
     */
    open(callback: Function): void;
    /**
     * 关闭剖面分析
     */
    close(): void;
}

  class SkylineAnalyze {
    private _skylinePostProcess;
    private _viewer;
    private _psLayer;
    constructor(viewer: any);
    /**
     * 开启天际线分析
     * @param opt  天际线分析设置
     */
    open(opt: SkylineOption): void;
    /**
     * 关闭淹没分析
     */
    close(): void;
}
  class SkylineOption {
    /**
     * 线型宽度
     */
    width: number;
    strokeType: Cesium.Cartesian3;
    bjColor: Cesium.Color;
    color: Cesium.Color;
    strokeDistance: number;
}
  class SkylinePostProcess extends Cesium.PostProcessStage {
    constructor(camera: Cesium.Camera, opts: SkylineOption);
}

/**
 * 坡度坡向分析
 * 说明：0°到90°分为9级,颜色设置如下：
 * level_1:rgba(45,136,4,1.0),
 * level_2:rgba(75,153,4,1.0),
 * level_3:rgba(111,169,4,1.0),
 * level_4:rgba(154,188,4,1.0),
 * level_5:rgba(204,206,4,1.0),
 * level_6:rgba(204,155,4,1.0),
 * level_7:rgba(204,104,4,1.0),
 * level_8:rgba(204,53,4,1.0),
 * level_9:rgba(204,2,4,1.0)
 */
  class SlopeAnalysis {
    private viewer;
    private startPos;
    private endPos;
    private demTileLevel;
    private rectangle;
    private levelInfo;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param startPos 起点
     * @param endPos 终点
     * 说明：两点为矩形对角线上两点
     */
    open(startPos: GeoPoint, endPos: GeoPoint): void;
    private init;
    /**
     * 创建entity
     * @param dataRes
     */
    private create;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 创建UV
     * @param res
     */
    private createMap;
    /**
     * 结束分析
     */
    close(): void;
    /**
     * 获取分级信息
     */
    getLevelInfo(): String;
}

  class TerrainClipPlane {
    viewer: GeoCanvas;
    bottomSurface: any;
    wellWall: any;
    private options;
    private _positions;
    private _height;
    height: number;
    wallImg: String;
    bottomImg: String;
    private splitNum;
    private excavateMinHeight;
    private wellData;
    private _show;
    show: any;
    constructor(t: any, i: any);
    updateData(e: any): void;
    private _prepareWell;
    private _createWell;
    private _getMinHeight;
    private _ellipsoidToLonLat;
    private _createWellWall;
    private _createBottomSurface;
    private _switchExcavate;
    private _updateExcavateDepth;
    /**
     * 清除
     */
    clear(): void;
}

  class ViewshedAnalyze {
    viewer: any;
    config: any;
    defaultOption: any;
    /**
     * 通视分析构造函数
     * @method constructor
     * @param viewer Cesium.Viewer 对象
     *
     */
    constructor(viewer: Cesium.Viewer);
    VisibleColor: any;
    InVisibleColor: any;
    /**
      * 是否显示视距
      *
      */
    showDistance: any;
    /**
      * 开始视域分析
      * @method start
      *
      */
    open(): void;
    /**
     * 结束视域分析
     * @method stop
     *
     */
    close(): void;
    _initialiseHandlers(): void;
    _addEntity(pos: any): void;
    _calculatePose(pickingPos: any): void;
    _createViewShad(pos: any): void;
    _getUIShader(self: any, fs: any, shadowMap: any, castShadows: any, isTerrain: any, hasTerrainNormal: any): any;
    _updateLightDirection(): void;
    _creatFrustum(): void;
    _pickPosition(winPosition: any): any;
    _getViewShadGeometry(frustumGeometry: any): any;
}

/**
 * @类型 需要创建的虚拟类一般由内部类继承
 * @描述 事件分发类可以实现事件的注册监、注销监听、事件激活等方法
 */
  class Event {
    protected _events: any;
    protected _firingCount: any;
    /**
     * 添加对象的事件监听方法(事件对象基础方法)
     * @param type 监听事件类型
     * @param fn  监听回调函数
     * @param context 上下文
     * ```
     * 示例代码:
     * const fun = function(info) {
     *  console.log('监听事件');
     *  console.log(info);
     * }
     * event.on('add', fun); //监听添加事件
     * ```
     */
    on(type: string, fn: Function, context?: any): this;
    /**
     * 监听
     * @param type
     * @param fn
     * @param context
     */
    private _on;
    /**
     * 移除对象的事件监听方法(事件对象基础方法)
     * @param type 要删除的监听事件类型
     * @param fn 要删除的监听回调函数
     * @param context 上下文
     * @return
     * ```
     * 代码示例:
     * event.off('add',fun);
     * ```
     */
    off(type: string, fn: Function, context?: any): void;
    /**
     * 事件移除
     * @param type
     * @param fn
     * @param context
     */
    private _off;
    /**
     * 激活对象的某个监听事件,可以附件数据,并可以传递给父对象(事件对象基础方法)
     * @method fire
     * @param type 事件名称
     * @param data 监听时（on）收到的数据
     * @return
     * ```
     * 示例代码:
     * const info = {} //监听时（on）收到的数据
     * event.fire('add',info);
     * ```
     */
    fire(type: string, data: any): this;
    /**
     * 查询是否有指定类型的监听器(事件对象基础方法)
     * @param type 事件类型
     * @returns
     * ```
     * 示例代码：
     * const hasListens = event.listens('add');
     * ```
     */
    listens(type: string): boolean;
}

  class Item {
    protected _name: string;
    protected _id: any;
    /**
     * 对象名称不需要修改
     * ```
     * 示例代码
     * item.name = 'itemName'
     * ```
     */
    name: string;
    /**
     * 对象id不允许用修改全局唯一初始化传入或自动生成
     * ```
     * 示例代码:
     * let id = item.id;
     * ```
     */
    readonly id: any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 当前对象序列化成json数据
     * ```
     * 代码示例:
     * const obj = item.toJson();
     * ```
     */
    toJson(): object;
    /**
     * 解析json对象
     */
    parseJson(json: object): void;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    initItem(options: any): any;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行remove方法添加时被调用
     */
    destroyItem(): void;
}

  class Layer extends Event {
    protected _itemList: Array<Item>;
    constructor();
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Item;
    /**
     * 根据id获得对象
     * @param itemid 对象id
     */
    getItemById(itemid: string): Item;
    /**
     * 根据name获得对象
     * @param itemName 对象名称
     */
    getItemByName(itemName: string): Item;
    toJson(): any[];
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    getItemList(): Item[];
}

 class Register {
    _registerList: Map<ItemBaseTypeE, Map<string, any>>;
    constructor();
    /**
     * 注册Item
     * @param type 注册类型
     * @param itemConstructor 注册对象
     */
    REGISTER(type: ItemBaseTypeE, itemConstructor: any): void;
    /**
     * 根据类型获取构造器
     * @param type 类别
     * @param itemType item类型
     */
    GET_CONSTRUCTOR(type: ItemBaseTypeE, itemType: string): any;
    GET_REGISTER_LIST(): Map<ItemBaseTypeE, Map<string, any>>;
}
 enum ItemBaseTypeE {
    /**
     * 影像基类
     */
    ImageItem = "ImageItem",
    /**
     * 几何体基类
     */
    GraphicItem = "GraphicItem",
    /**
     * 高效绘制基类
     */
    EfficentItem = "EfficentItem",
    /**
     * 瓦片基类
     */
    TileItem = "TileItem"
}
 const gRegister: Register;

  class BaseCreator extends Event {
    protected _viewer: Cesium.Viewer;
    protected _father: CreatorManager;
    protected _createItem: GraphicItem;
    protected _editGroup: GraphicGroup;
    private _handler;
    private _controlPointSet;
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    /** handler单例 */
    protected getHandler(): Cesium.ScreenSpaceEventHandler;
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
    protected setCtrPoint(point: GeoPoint): void;
    protected addCtrPoint(point: GeoPoint): void;
    protected clearCtrPint(): void;
    protected createFinish(item: GraphicItem): void;
    protected createItem(item: GraphicItem): void;
    clear(): void;
}

  class CircularCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
}

  class CreatorManager extends Event {
    private _viewer;
    private _creatorList;
    private _currentCreator;
    private _controlPointSet;
    private _graphicLayer;
    constructor(viewer: Cesium.Viewer, graphicLayer: GraphicLayer);
    /**
     * 获取控制点集对象
     */
    readonly controlPointSet: ControlPointSet;
    /**
     * 根据类型获取创建器
     */
    private _getCreatorByType;
    setCursor(cursor: any): void;
    /**
     * 开启创建
     * @param itemOpt 对象属性
     * @param group 要添加的组
     * @param finishCallback 创建结束回调函数
     */
    create(itemOpt: any, group: GraphicGroup, finishCallback: any): GraphicItem;
    /**
     * 终止创建
     */
    stopCreate(): void;
}

  class EllipseCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
}

  class PointCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
}

  class PolylineCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
}

  class RectangleCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
}

  class RectangleLineCreator extends BaseCreator {
    constructor(viewer: Cesium.Viewer, father: CreatorManager);
    create(itemOpt: any, group: GraphicGroup, finishCallback?: any): GraphicItem;
    private getCoordinates;
}

  class BaseEditor extends Event {
    protected _viewer: Cesium.Viewer;
    protected _father: EditorManager;
    protected _editItem: GraphicItem;
    private _handler;
    private _controlPointSet;
    constructor(viewer: Cesium.Viewer, father: EditorManager);
    /** handler单例 */
    protected getHandler(): Cesium.ScreenSpaceEventHandler;
    /**
     * 设置编辑对象由子类实现
     * @param item
     */
    setEditItem(item: GraphicItem): void;
    protected clearCtrPint(): void;
    protected addCtrPoint(position: GeoPoint): void;
    protected createItem(item: GraphicItem): void;
    protected setCtrlActive(item: GraphicItem, val: boolean): void;
    clear(): void;
    getPositions(): Array<GeoPoint>;
    /**
     * 设置根据坐标获取活动id
     * @param x
     * @param y
     */
    getActiveIndex(x: any, y: any): any;
    /**
     * 取消活动控制点选择
     */
    cancelActive(index: any): void;
    frameCallback(): void;
}

  class CircularEditor extends BaseEditor {
    setEditItem(item: GraphicItem): void;
    getPositions(): any[];
}

  class EditorManager extends Event {
    _isCreating: boolean;
    private _viewer;
    private _editItem;
    private _controlPointSet;
    _editorMap: Map<string, BaseEditor>;
    _currentEditor: any;
    _wholeEditor: WholeEditor;
    _handler: Cesium.ScreenSpaceEventHandler;
    frameCallback: any;
    _graphicLayer: GraphicLayer;
    constructor(viewer: Cesium.Viewer, grathicLayer: GraphicLayer);
    /**
     * 是否是创建状态
     */
    isCreating: boolean;
    /**
     * 事件句柄
     */
    getHandler(): Cesium.ScreenSpaceEventHandler;
    /**
     * 编辑开启
     */
    open(): void;
    /**
     * 编辑关闭
     */
    close(): void;
    /**
     * 获取控制点集对象
     */
    readonly controlPointSet: ControlPointSet;
    private getEditorByType;
    setCursor(cursor: any): void;
    /**
     * 设置编辑对象
     */
    setEditItem(item: GraphicItem): void;
    /**
     * 获取编辑对象
     */
    getEditItem(): GraphicItem;
}

  class EllipseEditor extends BaseEditor {
    setEditItem(item: GraphicItem): void;
    getPositions(): any[];
}

  class LineEditor extends BaseEditor {
    setEditItem(item: GraphicItem): void;
    private _screenPixel;
    private _getLengthByMouse;
    getPositions(): any;
}

  class PointEditor extends BaseEditor {
    setEditItem(item: GraphicItem): void;
}

  class RectangleEditor extends BaseEditor {
    private _ctrlPositions;
    setEditItem(item: GraphicItem): void;
    getPositions(): any;
}

  class WholeEditor {
    private _operatorContainer;
    private _viewer;
    private _operatorButton;
    private _editItem;
    constructor(viewer: Cesium.Viewer);
    private getOwnerElement;
    /**
     * 初始换面板
     */
    private _createQuickOperator;
    private _getCenter;
    private _showOperator;
    /**
     *  开启整体控制面板
     */
    setEditItem(eidtItem: GraphicItem): void;
    /**
     * 关闭整体控制面板
     */
    close(): void;
    /**
     * 根据屏幕移动修改heading
     * @param start
     * @param end
     */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 根据屏幕移动修改Pich
     * @param start
     * @param end
     */
    rotateByPitch(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 根据屏幕移动修改Roll
     * @param start
     * @param end
     */
    rotateByRoll(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 水平移动
     * @param start
     * @param end
     */
    movePosition(start: any, end: any): void;
    private _screenPixel;
    private _getLengthByMouse;
    /**
     * 垂直移动
     * @param start
     * @param end
     */
    moveHeight(start: any, end: any): void;
    /**
     * 放大缩小
     * @param start
     * @param end
     */
    moveScale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
}

  class BaseControlPoint {
    protected _group: GraphicGroup;
    protected _index: number;
    protected _position: GeoPoint;
    protected _viewer: any;
    constructor(viewer: any, group: GraphicGroup, position: GeoPoint, index: number);
    /**
     * 初始化控制点
     */
    init(position: GeoPoint): void;
    /**
     * 设置索引
     * @param index
     */
    setIndex(index: number): void;
    /**
     * 更新位置
     * @param position
     */
    setPosition(position: GeoPoint): void;
    getPosition(): GeoPoint;
    clear(): void;
}

  class ControlPoint extends BaseControlPoint {
    _graphics: Array<GraphicItem>;
    /**
     * 初始化控制点
     */
    init(position: GeoPoint): void;
    /**
     * 设置索引
     * @param index
     */
    setIndex(index: number): void;
    /**
     * 更新位置
     * @param position
     */
    setPosition(position: GeoPoint): void;
    /**
     * 更新高度控制
     * @param position
     */
    setCtrlHeight(): void;
    /**
     * 设置控制点状态
     * @param item
     * @param val
     */
    static setCtrlActive(item: any, val: any): void;
    /**
     * 设置关键点控高billboard的显隐
     * @param bool
     */
    setVisible(bool: boolean): void;
    clear(): void;
}

  class ControlPointSet {
    private _viewer;
    private _pointConstructor;
    private _pointList;
    private _group;
    _graphicLayer: GraphicLayer;
    constructor(viewer: Cesium.Viewer, graphicLayer: GraphicLayer);
    /**
     * 设置控制点模板
     * @param value
     */
    setPointConstructor(value: BaseControlPoint): void;
    /**
     * 添加控制点
     * @param point
     */
    add(point: GeoPoint): void;
    /**
     * 设置最后一个点的位置
     */
    setPosition(point: GeoPoint): void;
    /**
     * 获取控制点列表
     */
    getList(): BaseControlPoint[];
    /**
     * 设置控制点状态
     * @param val
     */
    setCtrlActive(item: any, val: any): void;
    /**
    * 设置关键点控高billboard的显隐
    * @param bool
    */
    setVisible(bool: boolean): void;
    clear(): void;
    updateCtrPositions(positions: Array<GeoPoint>): void;
    updateCtrlHeight(): void;
}

/**
 * @private
 */
  class ArcHelper {
    static Ea: number;
    static Eb: number;
    static computeCircularFlight(lon: any, lat: any, radius: any, startAngle: any, endAngle: any, height?: any): any[];
}

/**
 * @private
 */
  class ArrayHelper {
    static Remove<T>(array: T[], t: T): void;
    static moveItem<T>(array: T[], index1: any, index2: any): T[];
}

/**
 * @private
 */
  class Guid {
    static newGuid(): string;
    static newShortGuid(): string;
}
 function defaultValue(a: any, b: any): any;
/**
 * @private
 * @param file
 */
  function formatURL(file: any): any;

/**
 * @private
 */
  class LayerCommon {
    static matrix18From0: string[];
    static matrix24From1: string[];
}

  class GxVecto3 {
    constructor(x: number, y: number, z: number, time?: Date);
    x: number;
    y: number;
    z: number;
    time?: Date;
}


class EditMode {
    private deleteAllGraph;
    private window;
    private viewer;
    private propEditor;
    private editAfterCreate;
    private handler;
    constructor(viewer: any, editAfterCreate: any, isReadOnly: any);
    /** handler单例 */
    private getHandler;
    /**
     * @private
     */
    destroyHandler(): void;
    private initKeyboard;
    private MODE_VIEW;
    private MODE_CREATE;
    private MODE_SELECT;
    private MODE_EDIT;
    private MODE_CTLEDIT;
    private ACT_START;
    private ACT_CREATE;
    private ACT_SELECT;
    private ACT_FINISH;
    private ACT_PICKUP;
    private static seq;
    /**
     * @private
     */
    start(): void;
    /**
     * @private
     * @param ent
     */
    create(ent: any): any;
    /**
     * @private
     * @param ent
     */
    draw(ent: any): any;
    private mode;
    private nextMode;
    private viewMode;
    private initKeyboardView;
    private currentCreateEnt;
    private createMode;
    /**
     * 完成当前绘图，如果图形能够绘制出来，则绘制，否则删除不成形的图形
     */
    private finishCurrentCreate;
    private initCreateCursor;
    private initKeyboardCreate;
    private selectByPosition;
    private hoveredEnt;
    private selectMode;
    private finishCurrentSelect;
    private initKeyboardSelect;
    /**
     * 编辑器改变时间，参数Graph
     */
    onEditChanged: Function;
    /**
     * 多选器改变,参数array<Graph>
     */
    onEditCollectionChanged: Function;
    /**
     * 统一唤醒事件
     */
    private callChangeEvent;
    private currentEditCollection;
    currentEditGraph: Graph;
    readonly currentEditGraphList: Array<Graph>;
    editMode(ent: any): void;
    private finishCurrentEdit;
    private initKeyboardEdit;
    /**
     * @private
     */
    deleteSelectGraph(): void;
    private pickedctl;
    private ctlEditMode;
    private finishCurrentCtledit;
    private initKeyboardCtledit;
    private CURSOR_auto;
    private CURSOR_crosshair;
    private CURSOR_pointer;
    private setCursor;
    getOwnerElement(): any;
    private operatorContainer;
    private operatorButton;
    private createQuickOperator;
    private showOperator;
    private closeOperator;
    /**
     * 根据屏幕移动修改heading
     * @param start
     * @param end
     */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
   * 根据屏幕移动修改Pich
   * @param start
   * @param end
   */
    rotateByPitch(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
   * 根据屏幕移动修改Roll
   * @param start
   * @param end
   */
    rotateByRoll(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 水平移动
     * @param start
     * @param end
     */
    movePosition(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 垂直移动
     * @param start
     * @param end
     */
    moveHeight(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 放大缩小
     * @param start
     * @param end
     */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
}

/**
 * 标绘对象基类
 */
class Graph {
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

/**
 * 标绘属性列表
 */
  class GraphProperty {
    constructor(options: any);
    /**
     * 名称
     */
    name: string;
    /**
     * 标题用于显示
     */
    title: string;
    /**
     * 数据类型,如number:string等
     */
    type: string;
    /**
     * 是否可编辑
     */
    editable?: boolean;
    /**
     * 描述
     */
    description?: string;
    /**
     * 最小值
     */
    min?: number;
    /**
     * 最大值
     */
    max?: number;
    /**
     * 编辑器操作step
     */
    step?: number;
    /**
     * 编辑器是否可见
     */
    visible: boolean;
    /**
     * 最大长度，针对string
     */
    maxLength?: number;
    private _value?;
    /**
  * 值
  */
    value: any;
    /**
     * 值变化事件
     */
    onValueChanged: Function;
}

/**
 * @private
 */
class EditorImage extends EditorRectangle {
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    /**
      * 根据屏幕移动修改heading
      * @param start
      * @param end
      */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    initShape(): void;
}

/**
 * 点军标，贴地模式
 * @private
 */
class EditorJBPointObject extends EditorRectangle {
    private svgStr;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    /**
       * 根据屏幕移动修改heading
       * @param start
       * @param end
       */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    modifySvg(imgUrl: any, color: any): Promise<string>;
    cesiumRgb2Hex(rgb: any): string;
    SVG(svg: any): string;
}

/**
  * @private
  */
class EditorRedFlag extends EditorImage {
    constructor(p: any, viewer: any, layer: any);
}

/**
 * 标绘管理
 */
class GraphManager {
    private static _svgCache;
    /**
     * @private
     */
    static readonly svgCache: Map<string, any>;
    static getPng(code: string): any;
    static getJbData(id: string): string;
    /**
     * 脏标记
     */
    private _isChanged;
    readonly isChanged: boolean;
    /**
     * 将脏标记充值为false
     */
    resetChanged(): void;
    /**
     * 对象集合
     */
    graphList: Array<Graph>;
    private layer;
    /**
     * 编辑器
     */
    editor: EditMode;
    private config;
    private viewer;
    /**
    * @private
    */
    static baseJbUrl: string;
    /**
     *
     * @param viewer a
     * @param config 1
     */
    constructor(viewer: Cesium.Viewer, config: LayerConfig);
    /**
      * @private
      */
    start(): void;
    /**
      * @private
      */
    destroyHandler(): void;
    /**
     * 开始绘制
     * @param  json  不含控制点的对象
     */
    create(json: any): any;
    /**
     * 根据控制点绘制
     *
     * @param 含控制点的对象
     */
    draw(json: any): any;
    /**
      * @private
      */
    findById(id: any): Graph;
    /**
      * @private
      */
    findByType(type: any): Graph;
    /**
     * 删除
     * @param graph
     */
    delete(graph: Graph): void;
    /**
     * 清空
     */
    clean(): void;
    /**
     * 删除所有
     */
    deleteAll(): void;
    /**
     *
     * @param jsons 加载
     */
    load(jsons: any): void;
    /**
     * 保存
     */
    save(): any[];
    createObj(json: any): any;
    private createObj0;
    private createJb;
}

/**
 * 图层配置参数
 */
 interface LayerConfig {
    /**
     * 图层Id
     */
    layerId: string;
    /**
     * 标绘完是否编辑
     */
    editAfterCreate: boolean;
    /**
     * 是否只读，只读不能拾取编辑
     */
    isReadOnly: boolean;
    baseJbUrl: string;
}


/**
 * 通用参数类
 * @private
 */
  class PlottingCommon {
    static cursorPos: any;
    static cursorScreenPos: any;
    static cursor: any;
}

/**
  * @private
  */
class EditorBoat extends EditorModel {
    constructor(p: any, viewer: any, layer: any);
}

/**
  * @private
  */
class EditorEditorJBPointScreen extends EditorPin {
    private svgStr;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    modifySvg(imgUrl: any, color: any): Promise<string>;
    SVG(svg: any): string;
}

/**
  * @private
  */
class EditorModel extends Graph {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    resetOrientation(pos?: any): void;
    private orientation;
    private headingPR;
    initShape(): void;
    /**
       * 放大缩小
       * @param start
       * @param end
       */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
    * 根据屏幕移动修改heading
    * @param start
    * @param end
    */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
   * 根据屏幕移动修改Pich
   * @param start
   * @param end
   */
    rotateByPitch(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
    * 根据屏幕移动修改Roll
    * @param start
    * @param end
    */
    rotateByRoll(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorPin extends Graph {
    maxPointNum: number;
    minPointNum: number;
    pinBuilder: Cesium.PinBuilder;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    /**
       * 放大缩小
       * @param start
       * @param end
       */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 根据屏幕移动修改heading
     * @param start
     * @param end
     */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorPinImage extends EditorPin {
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
}

/**
   maki icon: https://www.mapbox.com/maki-icons/
   /static/Cesium/Assets/Textures/maki/**.png
 */
/**
  * @private
  */
class EditorPinMakiIcon extends EditorPin {
    pinBuilder: Cesium.PinBuilder;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
}

/**
  * @private
  */
class EditorPinText extends EditorPin {
    pinBuilder: Cesium.PinBuilder;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
}

/**
  * @private
  */
class EditorPoint extends Graph {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    /**
      * 放大缩小
      * @param start
      * @param end
      */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorSatellite extends EditorModel {
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    calcuteShape(points: any, time: any): any[] | Cesium.Cartesian3;
}

/**
  * @private
  */
class EditorStation extends EditorModel {
    constructor(p: any, viewer: any, layer: any);
}

/**
  * @private
  */
class EditorText extends Graph {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    /**
       * 放大缩小
       * @param start
       * @param end
       */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorEditorVehicle extends EditorModel {
    constructor(p: any, viewer: any, layer: any);
}

/**
  * @private
  */
class EditorArrow1 extends EditorPolygon {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}

/**
  * @private
  */
class EditorCircle extends EditorPolygon {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): any;
}

/**
  * @private
  */
class EditorEllipse extends EditorPolygon {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): any;
    getDistance(p1: any, p2: any): number;
}

/**
  * @private
  */
class EditorPolygon extends Graph {
    minPointNum: number;
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorRectangle extends Graph {
    maxPointNum: number;
    minPointNum: number;
    constructor(prop: any, viewer: any, layer: any);
    private height;
    initProps(defs: any, containsBorder?: boolean): void;
    initShape(): void;
    private lastPoint;
    calcuteShape(points: Array<Cesium.Entity>, time: any): any;
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorBezier1 extends EditorBezierN {
    maxPointNum: number;
    constructor(p: any, viewer: any, layer: any);
}

/**
  * @private
  */
class EditorBezier2 extends EditorBezierN {
    maxPointNum: number;
    constructor(p: any, viewer: any, layer: any);
}

/**
 * @private
 */
class EditorBezierN extends EditorPolyline {
    constructor(prop: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): any;
}

/**
  * @private
  */
class EditorBezierSpline extends EditorPolyline {
    constructor(prop: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}

/**
  * @private
  */
class EditorCircleArc extends EditorPolyline {
    maxPointNum: number;
    minPointNum: number;
    constructor(props: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}

/**
  * @private
  */
class EditorJBLine extends Graph {
    minPointNum: number;
    private internalCode;
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    private lasPoints;
    calcuteShape(points: any, time: any): any[];
    toEdit(): void;
    finish(): void;
}

/**
  * @private
  */
class EditorPointLine extends EditorPolyline {
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    handleNewCtl(ctl: any): void;
}

/**
  * @private
  */
class EditorPointSpline extends EditorPointLine {
    constructor(prop: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}

/**
  * @private
  */
class EditorPolyline extends Graph {
    minPointNum: number;
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    /**
    * @private
    * @param ctl
    */
    handleNewCtl(ctl: any): void;
    toEdit(): void;
    private lasPoints;
    finish(): void;
}

 let gv: {
    Version: string;
    Item: typeof Item;
    Layer: typeof Layer;
    Event: typeof Event;
    GeoCanvas: typeof GeoCanvas;
    Calculate: typeof Calculate;
    Check: typeof Check;
    GeoPoint: typeof GeoPoint;
    ViewPoint: typeof ViewPoint;
    Util: typeof Util;
    LayerManager: typeof LayerManager;
    SceneOptions: typeof SceneOptions;
    WeatherEnmu: typeof WeatherEnmu;
    HeightReferenceEnum: typeof HeightReferenceEnum;
    PluginManager: typeof PluginManager;
    GraphicLayer: typeof GraphicLayer;
    SatelliteLayer: typeof SatelliteLayer;
    ImageLayer: typeof ImageLayer;
    TargetLayer: typeof TargetLayer;
    TargetItem: typeof TargetItem;
    TargetState: typeof TargetState;
    TargetStyle: typeof TargetStyle;
    TargetHistory: typeof TargetHistory;
    TileLayer: typeof TileLayer;
    SpaceDebris: typeof SpaceDebris;
    SpaceDebrisOpt: typeof SpaceDebrisOpt;
    Windy: typeof Windy;
    Cluster: typeof Cluster;
    ClusterOpt: typeof ClusterOpt;
    Canvas2Image: typeof Canvas2Image;
    HeatMap: typeof HeatMap;
    HeatMapOpt: typeof HeatMapOpt;
    MapV: typeof MapV;
    MapVOpt: typeof MapVOpt;
    MassiveLines: typeof MassiveLines;
    MassiveLinesOpt: typeof MassiveLinesOpt;
    MassivePoints: typeof MassivePoints;
    PointOption: typeof PointOption;
    PointStyle: typeof PointStyle;
    MassivePolygons: typeof MassivePolygons;
    MassivePolygonOpt: typeof MassivePolygonOpt;
    PlaceNameTile: typeof PlaceNameTile;
    PlaceNameTileOpt: typeof PlaceNameTileOpt;
    PlaceFontStyle: typeof PlaceFontStyle;
    PolygonTileOpt: typeof PolygonTileOpt;
    PolygonTile: typeof PolygonTile;
    IconTile: typeof IconTile;
    IconTileOpt: typeof IconTileOpt;
    ObliqueTile: typeof ObliqueTile;
    LineTile: typeof LineTile;
    LineTileOpt: typeof LineTileOpt;
    Satellite: typeof Satellite;
    SatelliteOpt: typeof SatelliteOpt;
    StatelliteEnum: typeof StatelliteEnum;
    SatelliteComponents: typeof SatelliteComponents;
    CesiumGeometry: any;
    GraphManager: typeof GraphManager;
    PointGraphic: typeof PointGraphic;
    CylinderDynamicGraphic: typeof CylinderDynamicGraphic;
    CylinderDynamicGraphicOpt: typeof CylinderDynamicGraphicOpt;
    SectorGraphic: typeof SectorGraphic;
    SectorGraphicOpt: typeof SectorGraphicOpt;
    WeatherGraphic: typeof WeatherGraphic;
    WeatherGraphicOpt: typeof WeatherGraphicOpt;
    WaterGraphic: typeof WaterGraphic;
    WaterGraphicOpt: typeof WaterGraphicOpt;
    PolylineGraphic: typeof PolylineGraphic;
    PolylineGraphicOpt: typeof PolylineGraphicOpt;
    ColorStyle: typeof ColorStyle;
    ArrowStyle: typeof ArrowStyle;
    OutlineStyle: typeof OutlineStyle;
    DashStyle: typeof DashStyle;
    GlowStyle: typeof GlowStyle;
    DynamicStyle: typeof DynamicStyle;
    DynamicIconEnum: typeof DynamicIconEnum;
    PolylineStyleEnum: typeof PolylineStyleEnum;
    BezierLineGraphic: typeof BezierLineGraphic;
    BezierLineGraphicOpt: typeof BezierLineGraphicOpt;
    ParabolaLineGraphic: typeof ParabolaLineGraphic;
    ParabolaLineGraphicOpt: typeof ParabolaLineGraphicOpt;
    ArcTypeEnum: typeof ArcTypeEnum;
    BubbleGraphic: typeof BubbleGraphic;
    BubbleGraphicOpt: typeof BubbleGraphicOpt;
    LabelGraphic: typeof LabelGraphic;
    LabelGraphicOpt: typeof LabelGraphicOpt;
    ModelGraphic: typeof ModelGraphic;
    ModelGraphicOpt: typeof ModelGraphicOpt;
    BillboardGraphic: typeof BillboardGraphic;
    BillboardGraphicOpt: typeof BillboardGraphicOpt;
    ScanGraphic: typeof ScanGraphic;
    ScanGraphicOpt: typeof ScanGraphicOpt;
    SensorGraphic: typeof SensorGraphic;
    SensorGraphicOpt: typeof SensorGraphicOpt;
    SpreadGraphic: typeof SpreadGraphic;
    SpreadGraphicOpt: typeof SpreadGraphicOpt;
    EllipseGraphic: typeof EllipseGraphic;
    EllipseGraphicOpt: typeof EllipseGraphicOpt;
    RectangleGraphic: typeof RectangleGraphic;
    RectangleGraphicOpt: typeof RectangleGraphicOpt;
    EllipsoidGraphic: typeof EllipsoidGraphic;
    EllipsoidGraphicOpt: typeof EllipsoidGraphicOpt;
    SphereGraphic: typeof SphereGraphic;
    SphereGraphicOpt: typeof SphereGraphicOpt;
    WallGraphic: typeof WallGraphic;
    WallGraphicOpt: typeof WallGraphicOpt;
    VolumePolylineGraphic: typeof VolumePolylineGraphic;
    VolumePolylineGraphicOpt: typeof VolumePolylineGraphicOpt;
    CylinderGraphic: typeof CylinderGraphic;
    CylinderGraphicOpt: typeof CylinderGraphicOpt;
    RadarGraphic: typeof RadarGraphic;
    RadarGraphicOpt: typeof RadarGraphicOpt;
    DynamicRippleGraphicOpt: typeof DynamicRippleGraphicOpt;
    DynamicRippleGraphic: typeof DynamicRippleGraphic;
    GraphicGroup: typeof GraphicGroup;
    PolygonGraphic: typeof PolygonGraphic;
    PolygonGraphicOpt: typeof PolygonGraphicOpt;
    PluginView: typeof PluginView;
    Tool: typeof Tool;
    Widget: typeof Widget;
    PopoverGraphic: typeof PopoverGraphic;
    PopoverGraphicOpt: typeof PopoverGraphicOpt;
    JBLineGraphic: typeof JBLineGraphic;
    JBLineGraphicOpt: typeof JBLineGraphicOpt;
    JBPointGraphic: typeof JBPointGraphic;
    JBPointGraphicOpt: typeof JBPointGraphicOpt;
    JBRenderModeEnum: typeof JBRenderModeEnum;
    CircularGraphic: typeof CircularGraphic;
    CircularGraphicOpt: typeof CircularGraphicOpt;
    Path: typeof Path;
    TriangleMeshGraphicOpt: typeof TriangleMeshGraphicOpt;
    TriangleMeshGraphic: typeof TriangleMeshGraphic;
    TerrainLayerCollection: typeof TerrainLayerCollection;
    TerrainItem: typeof TerrainItem;
    iCenter: typeof iCenter;
    Analysis: typeof Analysis;
    Camera: typeof Camera;
    MeasureAreaOpt: typeof MeasureAreaOpt;
    MeasureDistanceOpt: typeof MeasureDistanceOpt;
    FloodAnalysisOpt: typeof FloodAnalysisOpt;
    CustomLabelGraphic: typeof CustomLabelGraphic;
    CustomLabelGraphicOpt: typeof CustomLabelGraphicOpt;
    IntervisibilityAnalysis: typeof IntervisibilityAnalysis;
    HideAnalysis: typeof HideAnalysis;
    PathAnalysis: typeof PathAnalysis;
    PolygonVisiableAnalysis: typeof PolygonVisiableAnalysis;
    SlopeAnalysis: typeof SlopeAnalysis;
    SkylineAnalyze: typeof SkylineAnalyze;
    SkylineOption: typeof SkylineOption;
};


/**
 * @类别 需要创建，new iCenter()</br>
 * @描述 提供iCenter产品中图层管理相关的操作 </br>
 */
  class iCenter {
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

  class PlaceName {
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

  class UserInfo {
    private _url;
    private _username;
    private _password;
    private _icenterToken;
    /**
     * 初始化
     * @param {string} url 连接的icenter环境地址
     * @param {string} username 用户名
     * @param {string} password 密码
     * ```
     * 示例代码
     * const icenter = new GV.iCenter('http://icenter.geovis.online', 'admin', 'icenter');
     * icenter.userInfo
     * ```
     */
    constructor(url: String, username: String, password: String);
    private _loginIcenter;
    /**
     * 获取用户信息
     * ```
     * 示例代码：
     * icenter.userInfo.getUserInfo();
     * ```
     */
    getUserInfo(): Promise<any>;
    /**
     * 获取用户token
     * ```
     * 示例代码：
     * icenter.userInfo.getUserToken();
     * ```
     */
    getUserToken(): Promise<String>;
}

/**
 * @类型 外部使用类
 * @描述 贝塞尔曲线
 */
  class BezierLineGraphic extends GraphicItem {
    protected _opt: BezierLineGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * ```
     *   let bezierLine = new GV.BezierLineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000), new GV.GeoPoint(100,100,200000)], //设置坐标
     *      lineStyle: new GV.ColorStyle({color: '#ffff00'}), //设置颜色
     *      width: 3, //设置宽度
     *   });
     *   viewer.graphicLayer.add(bezierLine); //添加到场景
     * ```
     */
    constructor(option: BezierLineGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
      * 位置（只有前两个点位有效）
      * ```
      * 示例代码
      * parabolaLine.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
      * ```
      */
    positions: any;
    /**
       * 线宽 (单位:像素) (范围: >0 && <100)
       * ```
       * 示例代码
       * parabolaLine.width = 10
       * ```
       */
    width: number;
    /**
     * 只读属性贝塞尔曲线贴地
     */
    readonly clampToGround: true;
    /**
     * 点集数,抛物线细分插值数 (范围：>0 && <1000)
     * ```
     * parabolaLine.step = 50
     * ```
     */
    step: number;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
    /**
     * 线条样式
     * 线条支持测样式参考
     * @return
     * ```
     * 示例代码:
     *  parabolaLine.lineStyle = new GV.DynamicStyle({//设置动态样式
     *      color: '#ffff00',  //颜色
     *      icon: GV.DynamicIconEnum.Attack, //样式图表
     *      duration:800 //周期
     *  })
     * ```
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    getInterpolationCallback(value: any): GeoPoint[];
}
/**
 * 数据约束及默认值
 */
  class BezierLineGraphicOpt extends GraphicItemOpt {
    /**
     * 点集数量
     */
    step?: number;
    /**
       * 线条样式
       * 线条支持测样式参考
       */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 是否贴地
     */
    clampToGround?: boolean;
    /**
     * 线型宽度
     */
    width: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
}

/**
 * @类型 外部使用类
 * @描述 图标绘制对象
 * @see  <a href='../../../examples/gallery/editor.html#plottingBillboard'>图标</a>
 */
  class BillboardGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: BillboardGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'BillboardGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let billboardGraphicOpt = new GV.BillboardGraphicOpt();
     * billboardGraphicOpt.position = [83, 33, 500000];
     * let billboardGraphic = new GV.BillboardGraphic(billboardGraphicOpt);
     * 或者
     * let billboardGraphic = new GV.BillboardGraphic({...});
     * ```
     */
    constructor(option: BillboardGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 位置
     */
    position: any;
    /**
     * 图片
     */
    image: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 水平对齐方式: 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin: any;
    /**
     * 垂直对齐方式 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
    /**
    * 视角偏移[x,y,z] 空间坐标值 单位为米
    */
    eyeOffset: any;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset: any;
    /**
     *沿视角方向旋转角度，单位弧度值
     */
    rotation: any;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: any;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: any;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color: any;
    /**
     * 大小是否以米为单位
     */
    sizeInMeters: any;
    /**
     *  高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference: any;
}
  class BillboardGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 图片路径
     */
    image: String;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 水平对齐 : 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin?: String;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin?: String;
    /**
     * 视角偏移[x,y,z] 空间坐标值 单位为米
     */
    eyeOffset?: Array<number>;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset?: Array<number>;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation?: number;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: number;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: number;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
     * 大小是否以米为单位
     */
    sizeInMeters?: Boolean;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
}

/**
 * @类型 外部使用类
 * @描述 标牌绘制对象
 * @see  <a href='../../../examples/gallery/editor.html#bubble'>标牌</a>
 */
  class BubbleGraphic extends GraphicItem {
    protected _opt: BubbleGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 标牌构造方法
     */
    constructor(option: BubbleGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 获取标牌类型
     */
    readonly bubbleType: BubbleTypeEnum;
    /**
     * 获取标牌面板初始时位置偏移像素
     */
    readonly panelOffset: object;
    /**
     * 获取或设置绑定对象（目前支持GeoPoint对象）
     */
    bindObject: any;
    /**
     * 获取标牌面板DOM
     */
    readonly panelDom: any;
    /**
     * 获取标牌线DOM
     */
    readonly lineDom: any;
    /**
     * 获取或设置锚点颜色
     */
    pointColor: string;
    /**
     * 获取或设置锚点大小
     */
    pointSize: number;
    /**
     * 获取或设置是否开启标牌拖拽
     */
    panelDrag: boolean;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
}
/**
 * 标牌数据约束及默认值
 */
  class BubbleGraphicOpt extends GraphicItemOpt {
    /**
     * 标牌面板初始时位置偏移像素
     * 如果bubbleType为BubbleTypeEnum.FollowBubble则此参数为标牌面板相对于幕布位置
     * 如果bubbleType为BubbleTypeEnum.FixedBubble则此参数为标牌面板相对于锚点位置
     */
    panelOffset: object;
    /**
     * 是否开启面板拖拽
     */
    panelDrag: boolean;
    /**
     * 锚定点的颜色
     */
    pointColor: string;
    /**
     * 锚定点的像素大小
     */
    pointSize: number;
    /**
     * 绑定对象
     */
    bindObject: any;
    /**
     * Bubble类型
     */
    bubbleType: BubbleTypeEnum;
    visible: boolean;
}
/**
 * 标牌类型枚举
 */
  enum BubbleTypeEnum {
    FixedBubble = "fixedBubble",
    FollowBubble = "followBubble"
}

/**
 * @类型 外部使用类
 * @描述 贴地圆、贴地扇形几何体
 * @see <a href='http://localhost:8088/examples/gallery/editor.html#geometry'>圆柱</a>
 */
  class CircularGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: CircularGraphicOpt;
    /**
     * 圆柱标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let CircularGraphic = new GV.CircularGraphic({...});
     * ```
     */
    constructor(option: CircularGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    position: any;
    /**
     * 半径
     */
    radius: any;
    /**
    *起始角(单位:角度)
    */
    startAngle: any;
    /**
     * 终止角（单位:角度）
     */
    endAngle: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 是否贴合地形
     */
    clampToGround: any;
}
/**
 * 数据约束及默认值
 */
  class CircularGraphicOpt extends GraphicItemOpt {
    /**
     * 位置  lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 是否贴地
     */
    clampToGround: boolean;
    /**
     * 半径（单位m）
     */
    radius?: number;
    /**
     *起始角(单位:角度)
     */
    startAngle?: number;
    /**
     * 终止角（单位:角度）
     */
    endAngle?: number;
    /**
     * 颜色
     */
    color?: string;
}

/**
 * @类型 外部使用类
 * @描述 文本POI绘制对象
 * @see <a href='../../../examples/gallery/editor.html#textPOI'>文本</a>
 */
  class CustomLabelGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: CustomLabelGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'CustomLabelGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     *  var customLabelGraphicOpt = new GV.CustomLabelGraphicOpt();
     *  customLabelGraphicOpt.position = new GV.GeoPoint(0, 0);
     *  customLabelGraphicOpt.width = 100;
     *  customLabelGraphicOpt.height = 100;
     *  customLabelGraphicOpt.text = '星图';
     *  customLabelGraphicOpt.backgroundColor = 'rgba(0,0,255,1.0)';
     *  var customLabelGraphic = new GV.CustomLabelGraphic(customLabelGraphicOpt);
     *  viewer.graphicLayer.add(customLabelGraphic);
     * ```
     */
    constructor(option: CustomLabelGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 位置
     */
    position: any;
    /**
     * 文字
     */
    text: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: any;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: any;
    /**
     * 背景颜色
     */
    backgroundColor: any;
    /**
     * 垂直对齐方式 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
}
  class CustomLabelGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position?: GeoPoint;
    /**
     * 文字内容
     */
    text?: string;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width?: number;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height?: number;
    /**
     * 背景颜色
     */
    backgroundColor?: string;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin?: String;
}

/**
 * @类型 外部使用类
 * @描述 动态圆柱几何体
 */
  class CylinderDynamicGraphic extends GraphicItem {
    protected _opt: CylinderDynamicGraphicOpt;
    protected _type: string;
    protected renderCylinder: any;
    /**
     * 初始化示例
     * @param option 动态圆柱几何体
     * ```
     * 示例代码:
     * let cylinderDynamicGraphicOpt=new GV.CylinderDynamicGraphicOpt();
     * let cylinder = new GV.CylinderDynamicGraphic(cylinderDynamicGraphicOpt);
     * viewer.graphicLayer.add(cylinder);
     * ```
     */
    constructor(option: CylinderDynamicGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 圆柱顶面位置
     * @param value 顶面位置
     *
     * */
    /**
    * 获取顶面位置
    * @returns
    */
    topPosition: GeoPoint;
    /**
     * 圆柱底面位置
     * @param value 底面位置
     */
    /**
    * 获取底面位置
    * @returns
    */
    bottomPosition: GeoPoint;
    /**
     * 设置圆柱顶面半径
     * @param value 顶面半径
     */
    /**
    * 获取顶面半径
    * @returns
    */
    topRadius: number;
    /**
     * 设置圆柱底面半径
     * @param value 底面半径
     */
    /**
    * 获取底面半径
    * @returns
    */
    bottomRadius: number;
    /**
     * 设置速度
     * @param value 速度 范围 1-5
     */
    /**
    * 获取速度
    * @returns
    *
    */
    speed: number;
    /**
     * 设置条纹颜色
     * @param value 条纹颜色
     */
    /**
    * 获取条纹颜色
    * @returns
    */
    evenConeColor: string;
    /**
     * 设置条纹颜色
     * @param value 条纹颜色
     */
    /**
    * 获取条纹颜色
    * @returns
    */
    oddConeColor: string;
    /**
     * 设置切分份数
     * @param value 切分份数
     */
    /**
    * 获取切分份数
    * @returns
    */
    slice: number;
}
/**
 * 数据约束及默认值
 */
  class CylinderDynamicGraphicOpt extends GraphicItemOpt {
    /**圆柱顶面位置 */
    topPosition?: GeoPoint;
    /**圆柱底面位置 */
    bottomPosition?: GeoPoint;
    /**
     * 圆柱顶面半径
     */
    topRadius?: number;
    /**
     * 圆柱底面半径
     * */
    bottomRadius?: number;
    /**
     * 速度 范围1-5
     */
    speed?: number;
    /**
     * 条纹颜色
    */
    evenConeColor?: string;
    /**
     * 条纹颜色
    */
    oddConeColor?: string;
    /**
     * 切分份数
     */
    slice?: number;
}

/**
 * @类型 外部使用类
 * @描述 圆柱几何体
 * @see <a href='http://localhost:8088/examples/gallery/editor.html#geometry'>圆柱</a>
 */
  class CylinderGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: CylinderGraphicOpt;
    /**
     * 圆柱标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let CylinderGraphic = new GV.CylinderGraphic({...});
     * ```
     */
    constructor(option: CylinderGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    position: any;
    /**
    * 高度参考
    */
    heightReference: any;
    /**
     * 长度
     */
    length: any;
    /**
     * 顶部半径
     */
    topRadius: any;
    /**
     * 底部半径
     */
    bottomRadius: any;
    /**
 * 偏航
 */
    heading: any;
    /**
     * 俯仰
     */
    pitch: any;
    /**
     * 翻转
     */
    roll: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 填充颜色
     */
    color: any;
    /**
     * 是否填充
     */
    outline: any;
    /**
    * 颜色
    */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * 沿轮廓周边绘制的垂直线数
     */
    numberOfVerticalLines: any;
    /**
     * 周长的边数
     */
    slices: any;
    /**
     * 是否投射或接收来自每个光源的阴影
     */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
  class CylinderGraphicOpt extends GraphicItemOpt {
    /**
     * 位置  lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 圆柱长度
     */
    length: number;
    /**
     * 圆柱顶部的半径
     */
    topRadius: number;
    /**
     * 圆柱体底部的半径
     */
    bottomRadius: number;
    /**
    * 偏航角围绕负z轴旋转
    */
    heading?: number;
    /**
     * 俯仰角绕负y轴旋转
     */
    pitch?: number;
    /**
     * 翻转角绕正x轴旋转
     */
    roll?: number;
    /**
     * 是否填充提供的材质
     */
    fill?: Boolean;
    /**
     * 填充材质
     */
    color?: String;
    /**
     * 是否轮廓
     */
    outline?: Boolean;
    /**
     * 轮廓颜色
     */
    outlineColor?: String;
    /**
     * 轮廓宽度
     */
    outlineWidth?: number;
    /**
     * 沿轮廓周边绘制的垂直线数
     */
    numberOfVerticalLines?: number;
    /**
     * 圆柱周长的边数
     */
    slices?: number;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: Boolean;
}

/**
 * @类型 外部使用类
 * @描述 动态波纹
 */
  class DynamicRippleGraphic extends GraphicItem {
    protected _opt: DynamicRippleGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 动态波纹
     * ```
     * 示例代码:
     * let opt = new GV.DynamicRippleGraphicOpt();
     * opt.position = new GV.GeoPoint(80, 30, 200000);
     * let test = new GV.DynamicRippleGraphic(opt);
     * viewer.graphicLayer.add(test);
     *
     * ```
     */
    constructor(option: DynamicRippleGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 设置位置
     * @param value 位置
     */
    /**
    * 获取位置
    * @returns
    */
    position: GeoPoint;
    /**
     * 设置半径
     * @param value 半径
     */
    /**
    * 获取半径
    * @returns
    */
    radius: number;
    /**
     * 设置颜色
     * @param value 颜色
     */
    /**
    * 获取颜色
    * @returns
    */
    color: string;
    /**
     * 轮廓线是否开启
     * @param value 标志位
     */
    /**
    * 获取轮廓线是否开启
    * @returns
    */
    outline: boolean;
    /**
     * 设置轮廓线颜色
     * @param value 轮廓线颜色
     */
    /**
    * 获取轮廓线颜色
    * @returns
    */
    outlineColor: string;
    /**
     * 只读属性只允许贴地
     */
    readonly clampToGround: true;
}
/**
 * 数据约束及默认值
 */
  class DynamicRippleGraphicOpt extends GraphicItemOpt {
    /**位置 */
    position: GeoPoint;
    /**半径 */
    radius?: number;
    /**颜色 */
    color?: string;
    /**轮廓线是否开启 */
    outline?: boolean;
    /**轮廓线颜色 */
    outlineColor?: string;
}

/**
 * @类型 外部使用类
 * @描述 椭圆几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>椭圆</a>
 */
  class EllipseGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: EllipseGraphicOpt;
    /**
     * 椭圆标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let ellipseGraphic = new GV.EllipseGraphic({...});
     * ```
     */
    constructor(option: EllipseGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    position: any;
    /**
     * 短半轴
     */
    semiMinorAxis: any;
    /**
     * 长半轴
     */
    semiMajorAxis: any;
    /**
    * 高度参考
    */
    heightReference: any;
    /**
     * 挤压面相对于椭球面的高度
     */
    extrudedHeight: any;
    /**
    * extrudedHeight相对于什么
    */
    extrudedHeightReference: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 材质
     */
    color: any;
    /**
     * 是否填充
     */
    outline: any;
    /**
     * 颜色
     */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * 沿轮廓周边绘制的垂直线数
     */
    numberOfVerticalLines: any;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation: any;
    /**
     * 从北向逆时针旋转椭圆纹理
     */
    stRotation: any;
    /**
     * 椭圆上点之间的角距离：'radians_per_degree' 弧度数
     */
    granularity: any;
    /**
    * 是否投射或接收来自每个光源的阴影
    */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
  class EllipseGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 长半轴
     */
    semiMajorAxis: number;
    /**
     * 短半轴
     */
    semiMinorAxis: number;
    /**
     * 椭圆相对于椭球面的高度
     */
    height?: number;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 椭圆的挤压面相对于椭球面的高度
     */
    extrudedHeight?: number;
    /**
     * extrudedHeight的相对参考：'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    extrudedHeightReference?: String;
    /**
     * 是否填充提供的材质
     */
    fill?: Boolean;
    /**
     * 填充材质
     */
    color?: String;
    /**
     * 是否轮廓
     */
    outline?: Boolean;
    /**
     * 轮廓颜色
     */
    outlineColor?: String;
    /**
    * 轮廓宽度
    */
    outlineWidth?: number;
    /**
     * 沿轮廓周边绘制的垂直线数
     */
    numberOfVerticalLines?: number;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation?: number;
    /**
     * 从北向逆时针旋转椭圆纹理
     */
    stRotation?: number;
    /**
     * 椭圆上点之间的角距离：弧度数 degrees_per_radian:   180.0 / Math.PI; epsilon1: 0.1; epsilon2: 0.01; epsilon3: 0.001
     */
    granularity?: string;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: String;
}

/**
 * @类型 外部使用类
 * @描述 椭球体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>椭球体</a>
 */
  class EllipsoidGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: EllipsoidGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let ellipsoidGraphic = new GV.EllipsoidGraphic({...});
     * ```
     */
    constructor(option: EllipsoidGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    position: any;
    /**
    * 高度参考
    */
    heightReference: any;
    /**
     * 半径
     */
    radii: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 材质
     */
    color: any;
    /**
     * 是否填充
     */
    outline: any;
    /**
    * 颜色
    */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * 每个轮廓环的样本数，确定曲率的粒度
     */
    subdivisions: any;
    /**
    * 堆栈数
    */
    stackPartitions: any;
    /**
    * 径向切片数
    */
    slicePartitions: any;
    /**
     * 是否投射或接收来自每个光源的阴影
     */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
  class EllipsoidGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 半径 示例[x, y, z]
     */
    radii?: Array<number>;
    /**
     * 是否填充提供的材质
     */
    fill?: Boolean;
    /**
     * 填充材质
     */
    color?: String;
    /**
     * 是否轮廓
     */
    outline?: Boolean;
    /**
     * 轮廓颜色
     */
    outlineColor?: String;
    /**
    * 轮廓宽度
    */
    outlineWidth?: number;
    /**
     * 每个轮廓环的样本数，确定曲率的粒度
     */
    subdivisions?: number;
    /**
     * 堆栈数
     */
    stackPartitions?: number;
    /**
     * 径向切片数
     */
    slicePartitions?: number;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: String;
}

/**
 * @类型 外部使用类
 * @描述 绘制数据对象组对象提供了绘制数据对象的组管理
 */
  class GraphicGroup extends Event {
    protected _type: string;
    private _name;
    private _id;
    private _itemList;
    protected _father: GraphicGroup;
    private _visible;
    private _extendInfo;
    private _renderVisible;
    private _root;
    constructor(jsonObj?: any);
    /**
     * 类型
     */
    static readonly type: string;
    /**
     * 对象名称不需要修改
     * ```
     * 示例代码
     * item.name = 'itemName'
     * ```
     */
    name: string;
    readonly id: any;
    /**
     * 获取父节点
     */
    readonly father: GraphicGroup;
    /**
     * @注意 内部使用无需外部调用
     * @描述 重新计算渲染显隐值
     */
    updateVisible(): void;
    /**
     * 设置整组显隐
     */
    visible: boolean;
    /**
     * 获取整组真实显隐
     */
    readonly renderVisible: any;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: any): void;
    /**
     * @注意 外部无需调用
     * @描述 在父类执行remove方法添加时被调用
     */
    destroy(): void;
    /**
     * 清除所有子节点
     */
    clear(): void;
    readonly children: (GraphicItem | GraphicGroup)[];
    extendInfo: any;
    /**
     * 添加对象
     * @param item
     */
    add(item: GraphicItem | GraphicGroup): GraphicItem | GraphicGroup;
    /**
     * 根据配置添加图形绘制对象
     * @param jsonObj
     */
    addByJson(jsonObj: any): any;
    removeById(itemId: string): GraphicItem | GraphicGroup;
    /**
     * 删除元素
     * @param
     */
    remove(removeItem: GraphicItem | GraphicGroup): GraphicItem | GraphicGroup;
    /**
     * 根据id获得对象
     * @param itemid 对象id
     */
    getById(itemid: string): any;
    /**
     * 根据name获得对象
     * @param itemName 对象名称
     */
    getByName(itemName: string): Array<GraphicGroup | GraphicItem>;
    /**
     * 导出json数据
     */
    toJson(): {
        type: string;
        id: any;
        name: string;
        extendInfo: any;
        children: any[];
    };
    /**
     * @注意 外部无需调用
     * @描述 解析json方法，在父类根据json对象创建节点时调用
     */
    parseJson(json: any): void;
    /**
     *通过json添加子数据(V1.1.2暂时不对外暴露此接口)
     */
    /**
     * 获取graphicLayer
     */
    getRoot(): any;
}

  class GraphicItem extends Item {
    private _renderVisible;
    private _father;
    protected _getRenderObj: any;
    protected _type: any;
    protected _opt: any;
    protected _id: string;
    protected _event: Event;
    constructor(opt: any);
    protected update(): void;
    onUpdateAttribute(callback: any): void;
    offUpdateAttribute(callback: any): void;
    protected updateAttribute(propName: any): void;
    getRenderObject(): any;
    /**
     * @注意 内部使用无需外部调用
     * @描述 重新计算渲染显隐值
     */
    updateVisible(): void;
    /**
     * 对象名称不需要修改
     * ```
     * 示例代码
     * item.name = 'itemName'
     * ```
     */
    name: string;
    /**
     * 对象id为对象的唯一标识（每个对象的id不允许重复）;
     * 由对象初始化时自动生成，也允许对象初始化时传入 ;
     * 对象初始化完成后不允许再次对id进行修改
     * ```
     * 示例代码:
     * let id = item.id;//获取对象id
     * ```
     */
    readonly id: string;
    /**
     * 扩展信息用户可以将自己的数据储存到该参数中支持序列化反序列化
     */
    extendInfo: any;
    /**
     * 显隐控制
     */
    visible: boolean;
    /**
     * 真实显隐
     */
    readonly renderVisible: boolean;
    /**
     * 父节点
     */
    readonly father: GraphicGroup;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 是否贴地
     */
    readonly clampToGround: boolean;
    /**
     * 当前对象序列化成json数据
     * ```
     * 代码示例:
     * const obj = item.toJson();
     * ```
     */
    toJson(): object;
    /**
     * 解析json对象
     */
    parseJson(option: any): void;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): any;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行remove方法添加时被调用
     */
    destroy(): void;
    /**
     * 获取中心点
     */
    getCenterPosition(): any;
    /**
     * 设置控制点
     */
    movePosition(offsetLon?: number, offsetLat?: number, offsetAlt?: number): void;
}
  class GraphicItemOpt {
    /**
     * 名称
     */
    name?: string;
    /**
     * 显隐控制
     */
    visible?: boolean;
    /**
     * 扩展数据信息
     */
    extendInfo?: any;
}
/**
 * 高度参照
 */
  enum HeightReferenceEnum {
    /**
     * 完全贴合地面
     */
    ClampToGround,
    /**
     * 高度与地形无关
     */
    None,
    /**
     * 真实高度=地形高度+高度值
     */
    RelativeToGround
}

/**
 * @类型 外部使用类
 * @描述 基础线
 * @see <a href='../../../examples/gallery/editor.html#plottingPointLine'>标绘点、线</a>
 */
  class JBLineGraphic extends GraphicItem {
    protected _opt: JBLineGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *   let jbLine = new GV.JBLineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)], //设置坐标
     *   });
     *   viewer.graphicLayer.add(jbLine); //添加到场景
     * ```
     */
    constructor(option: JBLineGraphicOpt);
    /**
     * 军标码
     */
    code: string;
    /**
     * 军标线颜色
     */
    color: string;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     * ```
     * 示例代码
     * jbLine.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 矢量线宽
     */
    vectorWidth: number;
    /**
     * 栅格线宽
     */
    rasterWidth: number;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
    /**
     * 设置高度
     */
    /**
    * 获取高度
    */
    height: number;
    /**
     * 设置厚度
     */
    /**
    * 获取厚度
    */
    thick: number;
    /**
     * 设置线颜色
     */
    /**
    * 获取线颜色
    */
    lineColor: string;
    /**
     * 设置渲染模式
     */
    /**
    * 获取渲染模式
    */
    renderMode: JBRenderModeEnum;
    /**
     * 是否填充
     */
    /**
    * 是否填充
    */
    fillFlag: boolean;
    /**
     * 设置起点填充颜色
     */
    /**
    * 获取起点填充颜色
    */
    fillStartColor: string;
    /**
     * 设置终点填充颜色
     */
    /**
    * 获取终点填充颜色
    */
    fillEndColor: string;
    /**
     * 设置渐变偏角
     */
    /**
    * 获取渐变偏角
    */
    fillAngle: number;
    /**
    * 设置拉伸网格体颜色
    */
    /**
    * 获取拉伸网格体颜色
    */
    supplementColor: string;
}
/**
 * 折线数据约束及默认值
 */
  class JBLineGraphicOpt extends GraphicItemOpt {
    /**
     * 军标码
     */
    code: string;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 矢量线型宽度
     */
    vectorWidth?: number;
    /**
     * 栅格线型宽度
     */
    rasterWidth?: number;
    /**
     * 线的颜色
     */
    color?: string;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
    /**
     * 距离底面高度
     */
    height: number;
    /**
    * 厚度
    */
    thick: number;
    /**
    * 线颜色
    */
    lineColor: string;
    /**
     * 绘制形态 'raster'或 'vector'
     */
    renderMode: JBRenderModeEnum;
    /**是否填充 */
    fillFlag: boolean;
    /**起点填充颜色 */
    fillStartColor: string;
    /**终点填充颜色 */
    fillEndColor: string;
    /**渐变偏角 */
    fillAngle: number;
    /**拉伸网格体颜色 */
    supplementColor: string;
}

/**
 * @类型 外部使用类
 * @描述 军标点
 */
  class JBPointGraphic extends GraphicItem {
    protected _opt: JBPointGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *  let group = new GV.GraphicGroup();
     *  viewer.graphicLayer.add(group);
     *  let point  = new GV.JBPointGraphic({
     *     code: '10-200-0',//军标码
     *     position:new GV.GeoPoint(i,j,0),//位置点
     *     size:0.5,//大小,
     *     color: '#ffff00'
     *  });
     *  group.add(point);
     * ```
     */
    constructor(option: JBPointGraphicOpt);
    /**
 * @注意 所有item的基类方法,外部无需调用
 * @描述 初始化方法，在父类执行add方法添加时被调用
 */
    init(father: GraphicGroup): void;
    /**
     * 位置
     * ```
     * 示例代码
     * jbLine.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
     * ```
     */
    position: GeoPoint;
    /**
     * 军标码
     */
    code: string;
    /**
     * 军标线颜色
     */
    color: string;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
      * 旋转
      */
    rotation: number;
    /**
     * 尺寸
     */
    size: number;
    /**
     * 衬线颜色
     */
    strokeColor: string;
    /**
     * 衬线宽度
     */
    strokeWidth: number;
    /**
     * 注记位置信息
     */
    renderMode: JBRenderModeEnum;
    /**
     * 注记位置信息
     */
    textOffset: {
        x: number;
        y: number;
    };
    /**
     * 注记内容
     */
    text: string;
    /**
    * 注记字体
    */
    textFont: string;
    /**
    * 注记颜色
    */
    textColor: string;
    /**
     * 注记字体大小
     */
    textSize: number;
    /**
    * 注记背景色
    */
    textBackgroundColor: string;
    /**
     * 注记缩放
     */
    textScale: number;
    /**
    * 高度
    */
    height: number;
    /**
    * 挤压高度
    */
    vectorExtrudedHeight: number;
    /**
     * 填充
     */
    fillColor: string;
}
/**
 * 折线数据约束及默认值
 */
  class JBPointGraphicOpt extends GraphicItemOpt {
    /**
     * 军标码
     */
    code: string;
    /**
     * 关键点信息
     */
    position: GeoPoint;
    /**
     * 线的颜色
     */
    color?: string;
    /**
     * 大小
     */
    size?: number;
    /**
     * 旋转
     */
    rotation?: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
    /**
     * 衬线颜色
     */
    strokeColor?: string;
    /**
     * 衬线宽度
     */
    strokeWidth?: number;
    /**
     * 绘制形式
     */
    renderMode?: JBRenderModeEnum;
    /**
     * 注记位置点
     */
    textOffset?: {
        x: number;
        y: number;
    };
    /**
     * 注记内容
     */
    text?: string;
    /**
     * 注记字体
     */
    textFont?: string;
    /**
     * 注记字体大小
     */
    textSize?: number;
    /**
     * 注记颜色
     */
    textColor?: string;
    /**
     * 注记背景颜色
     */
    textBackgroundColor?: string;
    /**
     * 文字缩放
     */
    textScale?: number;
    /**
     * 高度
     */
    height?: number;
    /**
     * 挤压高度
     */
    vectorExtrudedHeight?: number;
    /**
     * 填充色
     */
    fillColor?: string;
}
  enum JBRenderModeEnum {
    /**
     * 矢量
     */
    VECTOR = "VECTOR",
    /**
     * 栅格
     */
    RASTER = "RASTER",
    /**
     * billboard
     */
    BILLBOARD = "BILLBOARD"
}

/**
 * @类型 外部使用类
 * @描述 文本绘制对象
 * @see <a href='../../../examples/gallery/editor.html#plottingText'>文本</a>
 */
  class LabelGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: LabelGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'LabelGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let labelGraphicOpt = new GV.LabelGraphicOpt();
     * labelGraphicOpt.position = [83, 33, 500000];
     * let labelGraphic = new GV.LabelGraphic(labelGraphicOpt);
     * 或者
     * let labelGraphic = new GV.LabelGraphic({...});
     * ```
     */
    constructor(option: LabelGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 位置
     */
    position: any;
    /**
     * 文字
     */
    text: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 水平对齐 : 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin: any;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
    /**
    * 视角偏移
    */
    eyeOffset: any;
    /**
     * 像素偏移
     */
    pixelOffset: any;
    /**
     * 轮廓线宽度
     */
    outlineWidth: any;
    /**
     * 字体
     */
    font: any;
    /**
     * 样式
     */
    style: any;
    /**
     * 填充颜色
     */
    fillColor: any;
    /**
    * 轮廓颜色
    */
    outlineColor: any;
    /**
    * 背景颜色
    */
    backgroundColor: any;
    /**
     * 根据距离计算缩放大小
     */
    scaleByDistance: any;
    /**
     * 根据距离计算像素偏移
     */
    pixelOffsetScaleByDistance: any;
    /**
     * 是否显示背景
     */
    showBackground: any;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference: any;
    /**
     * 根据距离变更透明度
     */
    translucencyByDistance: any;
    /**
     * 是否深度检测
     */
    isDepthTest: boolean;
}
  class LabelGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 文字内容
     */
    text: String;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 水平对齐 : 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin?: String;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin?: String;
    /**
     * 视角偏移[x,y,z] 空间坐标值 单位为米
     */
    eyeOffset?: Array<number>;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset?: Array<number>;
    /**
    * 指定轮廓线宽度
    */
    outlineWidth?: number;
    /**
     * css字体设置： 字体大小 字体名称
     */
    font?: String;
    /**
     * 指定文字样式 ：'fill' 只有填充,fill_and_outline 包含填充轮廓, outline 只有轮廓
     */
    style?: String;
    /**
     * 填充颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    fillColor?: String;
    /**
     * 轮廓颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    outlineColor?: String;
    /**
     * 背景颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    backgroundColor?: String;
    /**
     * 根据距离视点范围和放大率范围计算放大倍数
     */
    scaleByDistance?: Array<number>;
    /**
     * 根据距离视点范围和放大率范围计算像素偏移
     */
    pixelOffsetScaleByDistance?: Array<number>;
    /**
     * 是否展示背景
     */
    showBackground?: Boolean;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 根据距离变更透明度
     */
    translucencyByDistance?: number;
    /**
     * 是否深度检测
     */
    isDepthTest?: boolean;
}

/**
 * @类型 外部使用类
 * @描述 模型绘制对象
 * @see <a href='../../../examples/gallery/editor.html#model'>模型</a>
 */
  class ModelGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: ModelGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'ModelGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let modelGraphicOpt = new GV.ModelGraphicOpt();
     * modelGraphicOpt.position = [83, 33, 500000];
     * let modelGraphic = new GV.ModelGraphic(ModelGraphicOpt);
     * 或者
     * let modelGraphic = new GV.ModelGraphic({...});
     * ```
     */
    constructor(option: ModelGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 位置
     */
    position: any;
    /**
     * 模型
     */
    url: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 偏航
     */
    heading: any;
    /**
     * 俯仰
     */
    pitch: any;
    /**
     * 翻转
     */
    roll: any;
    /**
     * 像素大小
     */
    minimumPixelSize: any;
    /**
     * 缩放上界
     */
    maximumScale: any;
    /**
    * 动画
    */
    runAnimations: any;
    /**
     * 最后帧是否静止
     */
    clampAnimations: any;
    /**
     * 模型轮廓颜色
     */
    silhouetteColor: any;
    /**
     * 轮廓大小
     */
    silhouetteSize: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 高度按照相对于什么
     */
    heightReference: any;
}
/**
 * 模型标绘参数类
 */
  class ModelGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 模型路径
     */
    url: String;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 偏航角围绕负z轴旋转
     */
    heading?: number;
    /**
     * 俯仰角绕负y轴旋转
     */
    pitch?: number;
    /**
     * 翻转角绕正x轴旋转
     */
    roll?: number;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
    * 指定模型的近似最小像素大小，与缩放无关
    */
    minimumPixelSize: number;
    /**
     * 模型的最大比例尺寸。minimumPixelSize的上限
     */
    maximumScale?: number;
    /**
     * 指定是否应该启动模型中指定的glTF动画。
     */
    runAnimations?: Boolean;
    /**
     * 指定glTF动画是否应保留最后一个没有关键帧的持续时间姿势
     */
    clampAnimations?: Boolean;
    /**
     * 模型轮廓颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    silhouetteColor?: String;
    /**
     * 指定轮廓的大小（以像素为单位）。
     */
    silhouetteSize?: number;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
}

/**
 * @类型 外部使用类
 * @描述 抛物线
 * @see <a href='../../../examples/gallery/editor.html#polylineArrow'>动态线</a>
 */
  class ParabolaLineGraphic extends GraphicItem {
    protected _opt: ParabolaLineGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * ```
     * 示例代码:
     *   let parabolaLine = new GV.ParabolaLineGraphic({
     *       positions:[new GV.GeoPoint(80,10,20000), new GV.GeoPoint(110,0,200000)],
     *       lineStyle: new GV.DynamicStyle({
     *            color: '#00FF99',
     *            icon: GV.DynamicIconEnum.Arrow,
     *            duration:1000
     *       }),
     *       width:5, //线宽
     *       factor: 50000,
     *       step: 50
     *   });
     *   graphicLayer.add(parabolaLine)
     * ```
     */
    constructor(option: ParabolaLineGraphic);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
      * 位置（只有前两个点位有效）
      * ```
      * 示例代码
      * parabolaLine.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
      * ```
      */
    positions: any;
    /**
       * 线宽 (单位:像素) (范围: >0 && <100)
       * ```
       * 示例代码
       * parabolaLine.width = 10
       * ```
       */
    width: number;
    /**
     * 曲率（曲线的高度）（单位：米）（范围： >0 && <10000000）
     * ```
     * 示例代码
     * parabolaLine.factor = 50000
     * ```
     */
    factor: number;
    /**
     * 点集数,抛物线细分插值数 (范围：>0 && <1000)
     * ```
     * parabolaLine.step = 50
     * ```
     */
    step: number;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
    /**
     * 线条样式
     * 线条支持测样式参考
     * @return
     * ```
     * 示例代码:
     *  parabolaLine.lineStyle = new GV.DynamicStyle({//设置动态样式
     *      color: '#ffff00',  //颜色
     *      icon: GV.DynamicIconEnum.Attack, //样式图表
     *      duration:800 //周期
     *  })
     * ```
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * @注意 程序内部调用
     *
     * 获取插值回调函数
     * @param value
     */
    getInterpolationCallback(value: any): any[];
}
/**
 * 抛物线数据约束及默认值
 */
  class ParabolaLineGraphicOpt extends GraphicItemOpt {
    /**
     * 线条样式
     * 线条支持测样式参考
     */
    lineStyle?: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 曲率
     */
    factor?: number;
    /**
     * 点集数量
     */
    step?: number;
    /**
     * 抛物线坐标前两位有效
     */
    positions?: Array<GeoPoint>;
    /**
     * 线宽
     */
    width?: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
}

/**
 * @类型 外部使用类
 * @描述 点几何体绘制对象
 */
  class PointGraphic extends GraphicItem {
    protected _opt: PointGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 点几何体构造方法
     * ```
     * 示例代码
     *   let point = new GV.PointGraphic({position:new GV.GeoPoint(10,10)});
     *   viewer.graphicLayer.add(point);
     * ```
     */
    constructor(option: PointGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 设置位置
     * @return
     * ```
     * 示例代码
     *  let point.position = new GV.GeoPoint(10,10)
     * ```
     */
    position: GeoPoint;
    /**
     * 大小(单位：像素) （范围： >0 && <100）
     */
    pixelSize: number;
    /**
     * 颜色
     */
    color: any;
    /**
     * 外边框颜色
     */
    outlineColor: any;
    /**
     * 外边框宽度
     */
    outlineWidth: any;
    /**
     * 高度按照相对于什么
     */
    heightReference: any;
    /**
     * 根据距离计算缩放大小
     */
    scaleByDistance: any;
    /**
     * 是否深度检测
     */
    isDepthTest: boolean;
    /**
     * 当前对象序列化成json数据
     * ```
     * 代码示例:
     * const obj = item.toJson();
     * ```
     */
    toJson(): object;
}
/**
 * 数据约束及默认值
 */
  class PointGraphicOpt extends GraphicItemOpt {
    /**
     * 位置
     */
    position: GeoPoint;
    /**
     * 点的大小， (单位:像素) (范围: >0 && <500)
     */
    pixelSize?: number;
    /**
     * 颜色 CssColor
     */
    color?: string;
    /**
     * 外边框颜色宽度，(单位:像素) (范围: >0 && <500)
     */
    outlineWidth?: number;
    /**
     * 外边框颜色 CssColor
     */
    outlineColor?: string;
    /**
     * 根据距离视点范围和放大率范围计算放大倍数
     */
    scaleByDistance?: Array<Number>;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: string;
    /**
     * 是否深度检测
     */
    isDepthTest?: boolean;
}

/**
 * @类型 外部使用类
 * @描述 基础面
 * @see
 */
  class PolygonGraphic extends GraphicItem {
    protected _opt: PolygonGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *     let polygon = new GV.PolygonGraphic({
     *         positions:[new GV.GeoPoint(0,10), new GV.GeoPoint(0,20),new GV.GeoPoint(10,20),new GV.GeoPoint(10,0)] //设置坐标
     *     });
     *     viewer.graphicLayer.add(polygon); //添加到场景
     * ```
     */
    constructor(option: PolygonGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    positions: any;
    /**
     * 相对于椭球面的高度（clampToGround为true时无效）
     */
    height: any;
    /**
     * 挤压面相对于椭球面的高度（clampToGround为true时无效）
     */
    extrudedHeight: any;
    /**
     * 是否使用提供的材质填充多边形
     */
    fill: any;
    /**
     * 填充色
     */
    color: any;
    /**
     * 多边形是否有边框
     */
    outline: any;
    /**
     * 边框色
     */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * @只读 只有初始化是可以设置该属性（clampToGround为true时无效）
     * @描述 指定是否使用每个点的高度，一般需要把 extrudedHeight 参数设置为0
     * ```
     * 参考示例
     *  let polygon = new GV.PolygonGraphic({
     *     positions:[new GV.GeoPoint(0,10,5000), new GV.GeoPoint(0,20,200000),new GV.GeoPoint(10,20,300000),new GV.GeoPoint(10,0,200000)], //设置坐标
     *     extrudedHeight : 0,
     *     perPositionHeight : true
     *  });
     *  viewer.graphicLayer.add(polygon); //添加到场景
     * ```
     */
    readonly perPositionHeight: boolean;
    /**
     * 挤压时打开顶部（clampToGround为true时无效）
     * ```
     * 示例代码
     *     let polygon = new GV.PolygonGraphic({
     *        positions:[new GV.GeoPoint(0,10, 100000), new GV.GeoPoint(0,20, 100000),new GV.GeoPoint(10,20, 100000),new GV.GeoPoint(10,0, 100000)], //设置坐标
     *        clampToGround : false,
     *        extrudedHeight : 500000.0,
     *        closeTop : false,
     *        closeBottom : false
     *     });
     *     viewer.graphicLayer.add(polygon); //添加到场景
     * ```
     */
    closeTop: any;
    /**
     * 挤压时打开底部（clampToGround为true时无效）
     */
    closeBottom: any;
    /**
     * 是否贴地注意在贴地模式下
     * height、extrudedHeight、perPositionHeight、closeTop、closeBottom参数无效
     */
    clampToGround: boolean;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
}
/**
 * 多边形面数据约束及默认值
 */
  class PolygonGraphicOpt extends GraphicItemOpt {
    clampToGround?: boolean;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 高度
     */
    height?: number;
    /**
     * 多边形的凸出面相对于椭球面的高度
     */
    extrudedHeight?: number;
    /**
     * 是否填充
     */
    fill?: boolean;
    /**
     * 填充色
     */
    color?: string;
    /**
     * 是否有外边框
     */
    outline?: boolean;
    /**
     * 外边框颜色
     */
    outlineColor?: string;
    /**
     * 外边框线宽度
     */
    outlineWidth?: number;
    /**
     * 是否使用每个位置的高度
     */
    perPositionHeight?: boolean;
    /**
     * 是否关闭多边形顶部
     */
    closeTop?: boolean;
    /**
     * 是否关闭多边形底部
     */
    closeBottom?: boolean;
    /**
     * 是否动态更新（脏检查）
     */
    dirty?: boolean;
}

/**
 * @类型 外部使用类
 * @描述 基础线
 * @see <a href='../../../examples/gallery/editor.html#plottingPointLine'>标绘点、线</a>
 */
  class PolylineGraphic extends GraphicItem {
    protected _opt: PolylineGraphicOpt;
    protected _type: string;
    private _interpolationCallback;
    /**
     * 初始化示例
     * @param option
     * @return
     * ```
     * 示例代码:
     *   let polyline = new GV.PolylineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)], //设置坐标
     *      lineStyle: new GV.ColorStyle({color: '#ffff00'}), //设置颜色
     *      width: 3, //设置宽度
     *      clampToGround: true //设置贴地
     *   });
     *   viewer.graphicLayer.add(polyline); //添加到场景
     * ```
     */
    constructor(option: PolylineGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     * ```
     * 示例代码
     * polyline.positions = [new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)]
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 弧线类型
     * ```
     * 示例代码
     * polyline.arcType = GV.ArcTypeEnum.Geodesic
     * ```
     */
    arcType: ArcTypeEnum;
    /**
     * 是否贴地(注意当弧线类型参数为GV.ArcTypeEnum.None时贴地无效)
     * ```
     * 示例代码
     * polyline.clampToGround = true;
     * ```
     */
    clampToGround: boolean;
    /**
     * 线宽 (单位:像素) (范围: >0 && <100)
     * ```
     * 示例代码
     * polyline.width = 10
     * ```
     */
    width: number;
    /**
     * 是否支持动态点修改（支持模式可能会对效率有点影响与当前加载数据量有关）
     */
    dirty: boolean;
    /**
     * 线条样式
     * 线条支持测样式参考
     * @return
     * ```
     * 示例代码:
     *  polyline.lineStyle = new GV.DynamicStyle({//设置动态样式
     *      color: '#ffff00',  //颜色
     *      icon: GV.DynamicIconEnum.Attack, //样式图表
     *      duration:800 //周期
     *  })
     * ```
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 设置插值回调函数
     * @param callback
     * @return
     * ```
     * 代码示例
     * polyline.setInterpolationCallback((value)=>{
     *    return Calculate.getBezier(value) //根据当前点数据value生成贝塞尔点数据
     * })
     * ```
     */
    setInterpolationCallback(callback: any): void;
    /**
     * 获取插值回调函数(程序内部调用)
     * @param value
     */
    getInterpolationCallback(value: Array<GeoPoint>): Array<GeoPoint> | Array<Cesium.Cartesian3>;
}
/**
 * 折线数据约束及默认值
 */
  class PolylineGraphicOpt extends GraphicItemOpt {
    /**
     * 线条样式
     * 线条支持测样式参考
     */
    lineStyle: ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
    /**
     * 关键点信息
     */
    positions: Array<GeoPoint>;
    /**
     * 弧线类型
     */
    arcType?: ArcTypeEnum;
    /**
     * 是否贴地
     */
    clampToGround?: boolean;
    /**
     * 线型宽度
     */
    width: number;
    /**
     * 是否动态更新（脏检查）
     */
    dirty: boolean;
}
  enum ArcTypeEnum {
    /**
     * 测地线
     */
    Geodesic,
    /**
     * 空(该模式下的线为纯直线)
     */
    None,
    /**
     * 恒向线
     */
    Rhumb
}

/**
 * @类型 外部使用类
 * @描述 气泡标签绘制对象
 * @see  <a href='../../../examples/gallery/editor.html#popover'>气泡标签</a>
 */
  class PopoverGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: PopoverGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: 'PopoverGraphic';
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let popoverGraphic = new GV.PopoverGraphic({
     *   position: new GV.GeoPoint(-75.59777, 40.03883, 100),
     *   text: "中科星图中科星图中科星图中科星图中科星图中科星图中科星图中科星图",
     *   shapeType: "pebbles",
     *   scale: 1.0,// 0.5
     *   horizontalOrigin: 'left',
     *   verticalOrigin: 'bottom',
     *   textTopMargin:'20px',
     *   textRightMargin:'31px',
     *   textleftMargin:'31px'
     * });
     * ```
     */
    constructor(option: PopoverGraphicOpt);
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取渲染对象
     */
    getRenderObject(): any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 更新标签 注：在创建完成标签后，如果需要更改属性需要手动调用该方法
     */
    updatePopoverCanvas(): void;
    /**
     * 位置
     */
    position: any;
    /**
     * 底图形状
     */
    shapeType: any;
    /**
     * 线颜色
     */
    lineColor: any;
    /**
     * 线宽
     */
    lineWidth: any;
    /**
     * 线型
     */
    lineType: any;
    /**
     * 文本
     */
    text: any;
    /**
     * 是否填充
     */
    enableFill: any;
    /**
     * 填充色
     */
    fillColor: any;
    /**
     * 标签字体
     */
    labelFont: any;
    /**
     * 左部留空
     */
    textleftMargin: any;
    /**
     * 右部留空
     */
    textRightMargin: any;
    /**
     * 顶部留空
     */
    textTopMargin: any;
    /**
     * 底部留空
     */
    textBottomMargin: any;
    /**
     * 文本对齐方式
     */
    textAlign: any;
    /**
     * 标签字体颜色 red 红色 black 黑色 注：HTML style 颜色属性
     */
    labelFontColor: any;
    /**
     * 标签字体大小
     */
    labelFontSize: any;
    /**
    * 缩放大小
    */
    scale: any;
    /**
     * 水平对齐方式: 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin: any;
    /**
     * 垂直对齐方式 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin: any;
    /**
    * 视角偏移[x,y,z] 空间坐标值 单位为米
    */
    eyeOffset: any;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset: any;
    /**
     *沿视角方向旋转角度，单位弧度值
     */
    rotation: any;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: any;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: any;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color: any;
    /**
     * 大小是否以米为单位
     */
    sizeInMeters: any;
    /**
     *  高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference: any;
}
  class PopoverGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 缩放大小
     */
    scale?: number;
    /**
     * 水平对齐 : 'left' 左对齐; 'center' 居中; 'right' 右对齐;
     */
    horizontalOrigin?: String;
    /**
     * 垂直对齐 : 'baseline'基线对齐; 'bottom' 底部对齐; 'center' 中间对齐; 'top' 顶部对齐
     */
    verticalOrigin?: String;
    /**
     * 视角偏移[x,y,z] 空间坐标值 单位为米
     */
    eyeOffset?: Array<number>;
    /**
     * 像素偏移 [x,y] x:相对中心点屏幕横向偏移； y:相对中心点屏幕纵向偏移； 单位像素值
     */
    pixelOffset?: Array<number>;
    /**
     * 沿视角方向旋转角度，单位弧度值
     */
    rotation?: number;
    /**
     * 宽度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    width: number;
    /**
     * 高度: 默认以像素为单位，当sizeInMeters参数为true是单位为米; 最小值大于0
     */
    height: number;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
     * 大小是否以米为单位
     */
    sizeInMeters?: Boolean;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 底图类型 pebbles 鹅卵石风格 pebblesrect 鹅卵石方形风格 roundedrectangle 圆角矩形风格 ellipse 椭圆风格
     */
    shapeType?: String;
    /**
     * 线颜色
     */
    lineColor?: String;
    /**
     * 线宽
     */
    lineWidth?: String;
    /**
     * 线型 line 直线 point 点 dottedLine 虚线 dottedAndPointLine 虚线加点
     */
    lineType?: String;
    /**
     * 是否填充
     */
    enableFill?: boolean;
    /**
     * 填充色
     */
    fillColor?: String;
    /**
     * 标签内容
     */
    text?: String;
    /**
     * 标签字体 Microsoft YaHei 微软雅黑 NSimSun 新宋体 KaiTi 楷体 等
     */
    labelFont?: String;
    /**
     * 标签字体颜色 red 红色 black 黑色 注：HTML style 颜色属性
     */
    labelFontColor?: String;
    /**
     * 标签字体大小
     */
    labelFontSize?: String;
    /**
     * 左部留空
     */
    textleftMargin?: String;
    /**
     * 右部留空
     */
    textRightMargin?: String;
    /**
     * 顶部留空
     */
    textTopMargin?: String;
    /**
     * 底部留空
     */
    textBottomMargin?: String;
    /**
     * 文本对齐方式 center left right
     */
    textAlign?: String;
}

/**
 * @类型 外部使用类
 * @描述 雷达扫描波
 */
  class RadarGraphic extends GraphicItem {
    protected _opt: RadarGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 雷达扫描波
     * ```
     * 示例代码:
     * let opt = new GV.RadarGraphicOpt();
     * opt.position = new GV.GeoPoint(114, 32);
     * let obj1 = new GV.RadarGraphic(opt);
     * viewer.graphicLayer.add(obj1);
     *
     * ```
     */
    constructor(option: RadarGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 设置位置
     * @param value 位置 说明：高度值无效
     */
    /**
    * 获取位置
    * @returns
    */
    position: GeoPoint;
    /**
    * 设置外部颜色
    *  @param value 外部颜色
    */
    /**
    * 获取外部颜色
    * @returns
    */
    outerColor: string;
    /**
     * 设置外部透明度
     * @param value 外部透明度
     */
    /**
    * 获取外部透明度
    * @returns
    */
    outerAlpha: number;
    /**
     * 设置内锥颜色
     * @param value 内锥颜色
     */
    /**
    * 获取内锥颜色
    * @returns
    */
    innerColor: string;
    /**
     * 设置内锥透明度
     * @param value 内锥透明度
     */
    /**
    * 获取内锥透明度
    * @returns
    */
    innerAlhpa: number;
    /**
     * 设置线条颜色
     * @param value 线条颜色
     */
    /**
    * 获取线条颜色
    * @returns
    */
    lineColor: string;
    /**
     * 设置水平起始角度
     * @param value 水平起始角度
     */
    /**
    * 获取水平起始角度
    * @returns
    */
    startAngle: number;
    /**
     * 设置水平终止角
     * @param value 水平终止角
     */
    /**
    * 获取水平终止角
    * @returns
    */
    endAngle: number;
    /**
     * 设置垂直起始角
     * @param value 垂直起始角
     */
    /**
    * 获取垂直起始角
    * @returns
    */
    vStartAngle: number;
    /**
     * 设置垂直终止角
     *  @param value 垂直终止角
     */
    /**
    * 获取垂直终止角
    * @returns
    */
    vEndAngle: number;
    /**
     * 设置扫面半径，单位米
     * @param value 扫面半径
     */
    /**
    * 获取扫面半径
    * @returns
    */
    radius: number;
    /**
     * 设置扫描角度
     * @param value 扫描角度
     */
    /**
    * 获取扫描角度
    * @returns
    */
    scanAngle: number;
    /**
     * 设置扫描颜色
     * @param value 扫描颜色
     */
    /**
    * 获取扫描颜色
    * @returns
    */
    scanColor: string;
    /**
     * 是否往复扫描
     * @param value 标志位
     */
    /**
    * 获取标志位
    * @returns
    */
    scanReserve: boolean;
    /**
     * 设置扫描速度,一秒转多少度，越大转越快
     * @param value 扫描速度
     */
    /**
    * 获取扫描速度
    * @returns
    */
    scanSpeed: number;
    /**
     * 是否显示扫描
     * @param value 是否显示
     */
    /**
    * 获取扫描显隐
    * @returns
    */
    showScan: boolean;
}
/**
 * 数据约束及默认值
 */
  class RadarGraphicOpt extends GraphicItemOpt {
    /**
     * 位置
     */
    position: GeoPoint;
    /**
     * 外部颜色
     */
    outerColor?: string;
    /**
     * 外部透明度
     */
    outerAlpha?: number;
    /**
     * 内锥颜色
     */
    innerColor?: string;
    /**
     * 内锥透明度
     */
    innerAlhpa?: number;
    /**
     * 水平起始角度
     */
    startAngle?: number;
    /**
     * 水平终止角
     */
    endAngle?: number;
    /**
     * 垂直起始角
     */
    vStartAngle?: number;
    /**
     * 垂直终止角
     */
    vEndAngle?: number;
    /**
     * 扫面半径，单位米
     */
    radius?: number;
    /**
     * 扫描角度
     */
    scanAngle?: number;
    /**
     * 扫描颜色
     */
    scanColor?: string;
    /**
     * 往复扫描
     */
    scanReserve?: boolean;
    /**
     * 扫描速度,一秒转多少度，越大转越快
     */
    scanSpeed?: number;
    /**
     * 是否显示扫描
     */
    showScan?: boolean;
    /**
     * 线条颜色
     */
    lineColor?: string;
}

/**
 * @类型 外部使用类
 * @描述 矩形几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>矩形</a>
 */
  class RectangleGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: RectangleGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let rectangleGraphic = new GV.RectangleGraphic({...});
     * ```
     */
    constructor(option: RectangleGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 区域坐标
     */
    coordinates: any;
    /**
     * 区域坐标
     */
    positions: any;
    /**
     * 高度
     */
    height: any;
    /**
    * 矩形相对于椭球面的高度
    */
    heightReference: any;
    /**
    * 挤压面相对于椭球面的高度
    */
    extrudedHeight: any;
    /**
    * 挤压面的相对参考：'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
    */
    extrudedHeightReference: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 颜色
     */
    color: any;
    image: any;
    /**
     * 是否显示轮廓
     */
    outline: any;
    /**
    * 颜色
    */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows: any;
}
/**
 * 数据约束及默认值
 */
  class RectangleGraphicOpt extends GraphicItemOpt {
    /**
     * 二维区域坐标 示例[west, south, east, north]  west为最西经度， south 为最南纬度， east为最东经度， north为最北纬度;(即将废弃此接口)
     */
    coordinates: Array<number>;
    /**
     * 二维区域对角坐标点
     */
    positions: Array<GeoPoint>;
    /**
     * 高度: 默认以像素为单位
     */
    height?: number;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 矩形的挤压面相对于椭球面的高度
     */
    extrudedHeight?: number;
    /**
     * extrudedHeight的相对参考：'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    extrudedHeightReference?: String;
    /**
     * 是否填充提供的材质
     */
    fill?: Boolean;
    /**
     * 填充颜色
     */
    color?: String;
    /**
     * 填充图片
     */
    image?: String;
    /**
     * 是否轮廓
     */
    outline?: Boolean;
    /**
     * 轮廓颜色
     */
    outlineColor?: String;
    /**
     * 轮廓宽度
     */
    outlineWidth?: number;
    /**
     * 是否投射或接收来自每个光源的阴影: 'cast_only' 仅投射阴影; 'disabled' 不会投射或接收阴影; 'enabled' 投射和接收阴影; 'receive_only' 仅接收阴影;
     */
    shadows?: String;
}

/**
 * @类型 外部使用类
 * @描述 扫描波
 */
  class ScanGraphic extends GraphicItem {
    protected _opt: ScanGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 扫描波
     * ```
     * 示例代码:
     * let opt = new GV.ScanGraphicOpt();
     * opt.scanColor = 'rgba(255.0, 0.0, 0.0, 1)';
     * opt.position = new GV.GeoPoint(80, 31.85, 0);
     * opt.radius = 1500;
     * radarScan = new GV.ScanGraphic(opt);
     * viewer.graphicLayer.add(radarScan);
     *
     * ```
     */
    constructor(option: ScanGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取扫描板颜色
     * @returns
     */
    /**
    * 设置扫描板颜色
    * @param  value 颜色
    */
    scanColor: string;
    /**
     * 获取扫描波边框线颜色
     * @returns
     */
    /**
    * 设置扫描波边框线颜色
    * @param  value 颜色
    */
    scanLineColor: string;
    /**
     * 获取扫描半径
     * @returns
     */
    /**
    * 设置扫描半径
    * @param  value 扫描半径
    */
    radius: number;
    /**
     *  获取中心点位置
     * @returns
     */
    /**
    * 设置中心点位置
    * @param  val 中心点位置
    */
    position: GeoPoint;
    /**
     *  获取速度
     * @returns
     */
    /**
    * 设置速度
    * @param  val
    */
    speed: number;
    /**
     *  获取速度
     * @returns
     */
    /**
    * 设置速度
    * @param  val 中心点位置
    */
    lineWidth: number;
    readonly clampToGround: true;
}
/**
 * 数据约束及默认值
 */
  class ScanGraphicOpt extends GraphicItemOpt {
    /**扫描板颜色 */
    scanColor?: string;
    /**扫描波边框线颜色 */
    scanLineColor?: string;
    /**扫描半径 */
    radius?: number;
    /**扫描速度 范围 >0&&<=5 */
    speed?: number;
    /**中心点位置 */
    position: GeoPoint;
    /**扫描波边框线宽度 */
    lineWidth?: number;
}

/**
 * @类型 外部使用类
 * @描述 动态扇形几何体
 */
  class SectorGraphic extends GraphicItem {
    protected _opt: SectorGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 动态扇形几何体
     * ```
     * 示例代码:
     * let sectorGraphicOpt=new GV.SectorGraphicOpt();
     * let sector = new GV.SectorGraphic(sectorGraphicOpt);
     * viewer.graphicLayer.add(sector);
     * ```
     */
    constructor(option: SectorGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 设置扇形顶点位置
     * @param value 扇形顶点位置
     */
    /**
    * 获取扇形顶点位置
    * @returns
    */
    topPosition: GeoPoint;
    /**
     * 设置扇形底点位置
     * @param value 扇形底点位置
     */
    /**
    * 获取扇形底点位置
    * @returns
    */
    bottomPosition: GeoPoint;
    /**
     * 设置扇形开合角度
     * @param value 扇形开合角度
     */
    /**
    * 获取扇形开合角度
    * @returns
    */
    fov: number;
    /**
     * 设置速度
     * @param value 速度 范围1-5
     */
    /**
    * 获取速度
    * @returns
    */
    speed: number;
    /**
     * 设置条纹颜色
     * @param value 条纹颜色
     */
    /**
    * 获取条纹颜色
    * @returns
    */
    evenConeColor: string;
    /**
     * 设置条纹颜色
     * @param value 条纹颜色
     */
    /**
    * 获取条纹颜色
    * @returns
    */
    oddConeColor: string;
    /**
     * 获取旋转角度
     * @returns
     */
    /**
    * 设置旋转角度
    * @param value 旋转角度
    */
    rotation: number;
}
/**
 * 数据约束及默认值
 */
  class SectorGraphicOpt extends GraphicItemOpt {
    /**顶点位置 */
    topPosition?: GeoPoint;
    /**底点位置 */
    bottomPosition?: GeoPoint;
    /**
     * 开合角度
     */
    fov?: number;
    /**
     * 速度 范围1-5
     */
    speed?: number;
    /**
     * 条纹颜色
    */
    evenConeColor?: string;
    /**
     * 条纹颜色
    */
    oddConeColor?: string;
    rotation?: number;
}

/**
 * @类型 外部使用类
 * @描述 传感器
 */
  class SensorGraphic extends GraphicItem {
    protected _opt: SensorGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 传感器
     * ```
     * 示例代码:
     * let opt = new GV.SensorGraphicOpt();
     * opt.color = 'rgba(255,255,255,0.1)';
     * opt.position = new GV.GeoPoint(0, 0, 0);
     * let sensor = new GV.SensorGraphic(opt);
     * viewer.graphicLayer.add(sensor);
     *
     * ```
     */
    constructor(option: SensorGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 设置位置
     * @param value 位置
     */
    /**
    * 获取位置
    * @returns
    */
    position: GeoPoint;
    /**
     * 设置传感器的半径
     * @param 传感器半径
     */
    /**
    * 获取传感器的半径
    * @returns
    */
    radius: number;
    /**
     * 设置传感器颜色
     * @param value 传感器颜色
     */
    /**
    * 获取传感器颜色
    * @returns
    */
    color: string;
    /**
     * 设置线的颜色
     */
    /**
    * 获取线的颜色
    * @returns
    */
    lineColor: string;
    /**
     * 获取水平半角
     * @returns
     */
    readonly xHalfAngle: number;
    /**
     * 获取垂直半角
     * @returns
     */
    readonly yHalfAngle: number;
    /**
     * 设置扫描面颜色
     * @param value 扫描面颜色
     */
    /**
    * 获取扫描面颜色
    * @returns
    */
    scanPlaneColor: any;
    /**
     * 获取扫描面显隐
     * @returns
     */
    readonly showScanPlane: boolean;
    /**
     * 设置扫描面速率
     * @param value 扫描面速率
     */
    /**
    * 获取扫描面速率
    * @returns
    */
    scanPlaneRate: any;
    readonly clampToGround: true;
}
/**
 * 数据约束及默认值
 */
  class SensorGraphicOpt extends GraphicItemOpt {
    /**位置 */
    position: GeoPoint;
    /**半径 */
    radius?: number;
    /**扫描速率 */
    scanPlaneRate?: number;
    /**是否显示扫描面 */
    showScanPlane?: boolean;
    /**水平半角 */
    xHalfAngle?: number;
    /**垂直半角 */
    yHalfAngle?: number;
    /**扫描面颜色 */
    scanPlaneColor?: string;
    /**颜色 */
    color?: string;
    /**线颜色 */
    lineColor?: string;
}

/**
 * @类型 外部使用类
 * @描述 球几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>球</a>
 */
  class SphereGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: SphereGraphicOpt;
    /**
     * 图标标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let sphereGraphic = new GV.SphereGraphic({...});
     * ```
     */
    constructor(option: SphereGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    position: any;
    /**
    * 高度参考
    */
    heightReference: any;
    /**
     * 半径
     */
    radius: any;
    /**
     * 是否填充
     */
    fill: any;
    /**
     * 材质
     */
    color: any;
    /**
     * 是否填充
     */
    outline: any;
    /**
    * 颜色
    */
    outlineColor: any;
    /**
     * 轮廓宽度
     */
    outlineWidth: any;
    /**
     * 每个轮廓环的样本数，确定曲率的粒度
     */
    subdivisions: any;
    /**
    * 堆栈数
    */
    stackPartitions: any;
    /**
    * 径向切片数
    */
    slicePartitions: any;
}
/**
 * 数据约束及默认值
 */
  class SphereGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * let position = new GV.GeoPoint(-80.0, 34.0, 0.0)
     * ```
     */
    position: GeoPoint;
    /**
     * 高度参照: 'clamp_to_ground' 完全贴合地面; 'none' 高度与地形无关; 'relative_to_ground' 真实高度=地形高度+高度值
     */
    heightReference?: String;
    /**
     * 半径 示例[x, y, z]
     */
    radius?: number;
    /**
     * 是否填充提供的材质
     */
    fill?: Boolean;
    /**
     * 填充材质
     */
    color?: String;
    /**
     * 是否轮廓
     */
    outline?: Boolean;
    /**
     * 轮廓颜色
     */
    outlineColor?: String;
    /**
    * 轮廓宽度
    */
    outlineWidth?: number;
    /**
     * 每个轮廓环的样本数，确定曲率的粒度
     */
    subdivisions?: number;
    /**
     * 堆栈数
     */
    stackPartitions?: number;
    /**
     * 径向切片数
     */
    slicePartitions?: number;
}

/**
 * @类型 外部使用类
 * @描述 扩散波
 */
  class SpreadGraphic extends GraphicItem {
    protected _opt: SpreadGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 扩散波
     * ```
     * 示例代码:
     * let opt = new GV.SpreadGraphicOpt();
     * opt.scanColor = 'rgba(255.0, 0.0, 0.0, 1)';
     * opt.position = new GV.GeoPoint(80, 31.85, 0);
     * opt.radius = 1500;
     * opt.duration = 4000;
     * circleScan = new GV.SpreadGraphic(opt);
     * viewer.graphicLayer.add(circleScan);
     *
     * ```
     */
    constructor(option: SpreadGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取扩散颜色
     * @returns
     */
    /**
    * 设置扩散颜色
    * @param  value 颜色
    */
    scanColor: string;
    /**
     * 获取扩散半径
     * @returns
     */
    /**
    * 设置扩散半径
    * @param  value 扫描半径
    */
    radius: number;
    /**
     * 获取扩散一周的时间 单位：毫秒
     * @returns
     */
    /**
    * 设置扩散一周的时间 单位：毫秒
    * @param  value 扩散一周的时间
    */
    duration: number;
    /**
     *  获取中心点位置
     * @returns
     */
    /**
    * 设置中心点位置
    * @param  val 中心点位置
    */
    position: GeoPoint;
}
/**
 * 数据约束及默认值
 */
  class SpreadGraphicOpt extends GraphicItemOpt {
    /**扫描颜色 */
    scanColor?: string;
    /**扩散半径 */
    radius?: number;
    /**扩散一周的时间 单位：毫秒 */
    duration?: number;
    /**中心点位置 */
    position: GeoPoint;
}

/**
 * @类型 外部使用类
 * @描述 三角网
 */
  class TriangleMeshGraphic extends GraphicItem {
    protected _opt: TriangleMeshGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option
     * ```
     *   let Tmesh = new GV.TriangleMeshGraphic({
     *      formData:"../../data.json" ,
     *      color:"#409eff"
     *   });
     *   viewer.graphicLayer.add(Tmesh); //添加到场景
     * ```
     */
    constructor(option: TriangleMeshGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
    * 数据源：
    * points 为[经度，纬度，高...]点集数组 或者 url
    * 例：
    * points = [102,33,5000,116,39,54411]
    */
    dataSource: any;
    /**
     * 颜色
     * 默认值：'#00CED1'
     * ```
     * 示例代码：
     * Tmesh.color = '#fff'
     * ```
     */
    color: any;
}
/**
 * 数据约束及默认值
 */
  class TriangleMeshGraphicOpt extends GraphicItemOpt {
    /**
     * 数据源：
     * dataSource = {
     *  points: [102,33,5000,116,39,54411...],
     *  indices:[0,2,3,5...]
     * }
     * points 为[经度，纬度，高...]点集数组
     * indices 为点的索引
     */
    dataSource: {
        points: Array<number>;
        indices: Array<number>;
    };
    /**
     * 颜色
     * 默认值：'#00CED1'
     */
    color?: string;
}

/**
 * @类型 外部使用类
 * @描述 管道线几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>管道</a>
 */
  class VolumePolylineGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: VolumePolylineGraphicOpt;
    /**
     * 管道标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let volumePolylineGraphic = new GV.VolumePolylineGraphic({...});
     * ```
     */
    constructor(option: VolumePolylineGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
         * 位置
         */
    positions: any;
    /**
     * 形状
     */
    shape: any;
    /**
     * 拐角类型
     */
    cornerType: any;
    /**
     * 填充
     */
    fill: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 轮廓
     */
    outline: any;
    outlineColor: any;
    outlineWidth: any;
}
/**
 * 数据约束及默认值
 */
  class VolumePolylineGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * GV.GeoPoint.unpackArray([
     *    [-80.0, 34.0, 0.0],
     *    [-80.0, 40.0, 100000.0],
     *    [-84.0, 40.0, 0.0]
     * ])
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 定义要挤出的形状的位置数组
     * ```
     * 示例代码
     * GV.GeoPoint.unpackArray([
     *   [-50000, -50000],
     *   [50000, -50000],
     *   [50000, 50000],
     *   [-50000, 50000]
     * ])
     * ```
     */
    shape: Array<GeoPoint>;
    /**
     * 指定角落样式 : 'beveled'  拐角被修剪； 'mitered' 拐角点是相邻边的交点； 'rounded' 角落边缘光滑
     */
    cornerType?: String;
    /**
     * 指定是否进行填充 ： true or false
     */
    fill?: Boolean;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
     * 指定是否显示轮廓 ： true or false
     */
    outline?: Boolean;
    /**
     * 轮廓颜色: 参考颜色示例'#ff0000'或'rgba(255,0,0,1)'
     */
    outlineColor?: String;
    /**
     * 指定轮廓线宽度
     */
    outlineWidth?: number;
}

/**
 * @类型 外部使用类
 * @描述 墙几何体
 * @see <a href='../../../examples/gallery/editor.html#geometry'>墙</a>
 */
  class WallGraphic extends GraphicItem {
    /**
     * 标绘参数
     */
    protected _opt: WallGraphicOpt;
    /**
     * 墙标绘类型
     */
    protected _type: string;
    /**
     * 构造函数
     * @param option 参数对象
     * ```
     * 示例代码
     * let wallGraphic = new GV.WallGraphic({...});
     * ```
     */
    constructor(option: WallGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 位置
     */
    positions: any;
    /**
     * 高度数组
     */
    maximumHeights: any;
    /**
     * 底部数组
     */
    minimumHeights: any;
    /**
     * 填充
     */
    fill: any;
    /**
     * 颜色
     */
    color: any;
    /**
     * 是否显示轮廓
     */
    outline: any;
    outlineColor: any;
    outlineWidth: any;
}
/**
 * 数据约束及默认值
 */
  class WallGraphicOpt extends GraphicItemOpt {
    /**
     * 位置 lon为经度， lat 为纬度， alt为高度
     * ```
     * 示例代码
     * GV.GeoPoint.unpackArray([
     *   [-115.0, 34.0],
     *   [-112.5, 34.0],
     *   [-110.0, 34.0],
     *   [-107.5, 34.0],
     *   [-105.0, 34.0],
     *   [-102.5, 34.0],
     *   [-100.0, 34.0],
     *   [-97.5, 34.0],
     *   [-95.0, 34.0],
     *   [-92.5, 34.0],
     *   [-90.0, 34.0]
     * ])
     * ```
     */
    positions: Array<GeoPoint>;
    /**
     * 指定用于墙顶的高度数组，而不是每个位置的高度.[100000, 200000, 100000, 200000, 100000, 200000 ...]
     */
    maximumHeights: Array<number>;
    /**
     * 指定要用于墙的底部而不是地球表面的高度数组.[0, 100000,  0, 100000, 0, 100000, 0,...]
     */
    minimumHeights: Array<number>;
    /**
     * 指定是否进行填充 ： true or false
     */
    fill?: Boolean;
    /**
     * 颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    color?: String;
    /**
     * 指定是否显示轮廓 ： true or false
     */
    outline?: Boolean;
    /**
     * 轮廓颜色: 参考颜色示例'#ff0000'或'rgba(1,0,0,1)'
     */
    outlineColor?: String;
    /**
     * 指定轮廓线宽度
     */
    outlineWidth?: number;
}

/**
 * @类型 外部使用类
 * @描述 水面效果
 */
  class WaterGraphic extends GraphicItem {
    protected _opt: WaterGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 水面效果
     * ```
     * 示例代码:
     * var position = [0, 0,0, 40.0,40, 40.0,40, 0];
     * var holes = [[5, 5, 6, 5, 6, 6, 5, 6],[15, 15, 15, 25, 25, 25, 25, 15]];
     * let waterOpt = new GV.WaterGraphicOpt();
     * waterOpt.pointsList = position;
     * waterOpt.holes = holes;
     * let water = new GV.WaterGraphic(waterOpt);
     * viewer.graphicLayer.add(water);
     * ```
     */
    constructor(option: WaterGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取流动频率
     * @returns
     */
    /**
    * 设置流动频率
    * @param  value 流动频率
    */
    frequency: number;
    /**
     * 获取水面底色
     * @returns
     */
    /**
    * 设置水面底色
    * @param  val 水面底色 示例：'#177BD9'或'rgba(100, 0.3, 0.6,1)'
    */
    baseWaterColor: string;
    /**
     * 获取流动速度
     * @returns
     */
    /**
    * 设置流动速度
    * @param  val 流动速度
    */
    animationSpeed: number;
    /**
     *  获取振幅
     * @returns
     */
    /**
    * 设置振幅
    * @param  val 振幅
    */
    amplitude: number;
    /**
     * 获取高光强度
     * @returns
     */
    /**
    * 设置高光强度
    * @param  val 高光强度
    */
    specularIntensity: number;
    /**
     * 获取挖洞数据
     * @returns
     */
    readonly holes: number[][];
    /**
     * 获取顶点数据
     * @returns
     */
    readonly pointsList: number[];
}
/**
 * 数据约束及默认值
 */
  class WaterGraphicOpt extends GraphicItemOpt {
    /**
     * 水面顶点数据
     */
    pointsList: Array<number>;
    /**
     * 挖洞数据
     */
    holes?: Array<Array<number>>;
    /**
     * 流动频率
     */
    frequency?: number;
    /**
     * 流动速度
     */
    animationSpeed?: number;
    /**
     * 流动振幅
     */
    amplitude?: number;
    /**
     * 高光强度
     */
    specularIntensity?: number;
    /**
     * 水面底色
     */
    baseWaterColor?: string;
}

/**
 * @类型 外部使用类
 * @描述 雨、雪模拟
 */
  class WeatherGraphic extends GraphicItem {
    protected _opt: WeatherGraphicOpt;
    protected _type: string;
    /**
     * 初始化示例
     * @param option 雨、雪模拟
     * ```
     * 示例代码:
     * let weatherGraphicOpt = new GV.WeatherGraphicOpt();
     * weatherGraphicOpt.position = new GV.GeoPoint(110.20, 34.55, 3000);
     * weatherGraphicOpt.range = 20000;
     * weatherGraphicOpt.weatherType = 'rain';
     * var weatherGraphic = new GV.WeatherGraphic(weatherGraphicOpt);
     * viewer.graphicLayer.add(weatherGraphic);
     *
     * ```
     */
    constructor(option: WeatherGraphicOpt);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): void;
    /**
     * 获取天气类型
     * @returns
     */
    readonly weatherType: string;
    /**
     * 获取位置
     * @returns
     */
    readonly position: GeoPoint;
    /**
    * 获取范围
    * @returns
    */
    readonly range: number;
}
/**
 * 数据约束及默认值
 */
  class WeatherGraphicOpt extends GraphicItemOpt {
    /**天气类型 rain 或 snow*/
    weatherType: string;
    /**位置 */
    position: GeoPoint;
    /**影响范围 */
    range: number;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 几何绘制对象总入口，提供了绘制添加，查询，选取等能力
 */
  class GraphicLayer extends Event {
    _viewer: Cesium.Viewer;
    private _dataRoot;
    private _ignoreRoot;
    private _renderRoot;
    private _creatorManager;
    private _editorManager;
    constructor(viewer: Cesium.Viewer);
    private _initCreatorManager;
    /**
     * 内部渲染对象使用
     */
    getRenderRoot(): {
        entityRoot: Cesium.EntityCollection;
        primitiveRoot: Cesium.PrimitiveCollection;
        postProcessStages: any;
        billboardCollection: Cesium.BillboardCollection;
        labelCollection: Cesium.LabelCollection;
    };
    editOpen(): void;
    editClose(): void;
    /**
     * 开启创建
     * @param itemOpt 创建对象参数
     * @param group 要加入的组节点
     */
    create(itemOpt: any, group?: GraphicGroup, finishCallback?: any): GraphicItem;
    /**
     * 设置编辑对象
     */
    setEditItem(item: GraphicItem): void;
    /**
     * 获取编辑对象
     */
    getEditItem(): GraphicItem;
    /**
     * 监听编辑对象变化
     */
    onEditItemChange(fun: any): void;
    /**
     * 取消监听编辑对象变化
     */
    offEditItemChange(fun: any): void;
    /**
     * 获取数据根节点
     */
    getRoot(): GraphicGroup;
    /**
     * 获取忽略根节点（该节点不会随整个场景反序列化）
     */
    getIgnoreRoot(): GraphicGroup;
    /**
     * 添加一个新节点
     * @param node 绘制数据对象或组对象
     * @returns
     * ```
     * 示例代码
     * //添加绘制数据对象
     *  let obj = new GV.CylinderDynamicGraphic({
     *      topPosition: new GV.GeoPoint(0,0,200000),
     *      bottomPosition: new GV.GeoPoint(0,0,0)
     *  })
     *  viewer.graphicLayer.add(obj);
     *
     * //添加组对象并在组对象中添加标绘
     *   let group = new GV.GraphicGroup();
     *   viewer.graphicLayer.add(group);
     *
     *   let polyline = new GV.PolylineGraphic({
     *      positions:[new GV.GeoPoint(0,0,200000), new GV.GeoPoint(100,0,200000)],
     *      lineStyle: new GV.ColorStyle({color: '#ffff00'}),
     *      width: 3,
     *   });
     *   group.add(polyline);
     * ```
     */
    add(node: GraphicGroup | GraphicItem): GraphicGroup | GraphicItem;
    addByJson(json: any): any;
    /**
     * 移除一个节点
     * @param node 绘制数据对象或组对象
     * @return
     * ```
     * 示例代码
     * viewer.graphicLayer.remove(node)
     * ```
     */
    remove(node: GraphicGroup | GraphicItem): GraphicGroup | GraphicItem;
    /**
     * 清除所对象
     */
    clear(): void;
    /**
     * 根据ID获取对象
     * @param id
     * @return
     */
    getById(id: string): any;
    /**
     * 根据ID获取对象
     * @param id
     * @return
     */
    getIgnoreById(id: string): any;
    /**
     * 根据名称获取对象
     *
     * @param name
     * @return
     */
    getNodeByName(name: string): (GraphicItem | GraphicGroup)[];
    /**
     * 导出json数据
     */
    toJson(): object;
    private _pickObjGetId;
    /**
   * 拾取对象 返回plot对象
   * @param {Function} callback 回调函数
   */
    pickRect(x: number, y: number, width: number, height: number): Array<GraphicItem>;
    /**
     * 根据屏幕坐标获取绘制对象
     * @param x 屏幕坐标x
     * @param y 屏幕坐标y
     * @return
     */
    pickByCoordinate(x: number, y: number): GraphicItem;
    /**
   * 根据屏幕坐标获取绘制对象
   * @param x 屏幕坐标x
   * @param y 屏幕坐标y
   * @return
   */
    pickIgnoreByCoordinate(x: number, y: number): GraphicItem;
    private _pickByCoordinate;
    /**
     * 获取多边形内的标绘对象(目前仅支持单一坐标标绘)
     * @param positions 多边形位置点
     * @return 标会对象数组
     * @see  <a href='../../../examples/gallery/editor.html#getItemsInPolygon'>获取区域内标绘对象</a>
     */
    getItemsInPolygon(positions: Array<GeoPoint>): Array<GraphicItem>;
}

/**
 * 标牌
 * ```
 * 示例代码：
 * let geoBubble = new GV.Bubble()
 *
 * ```
 */
  class Bubble extends RenderObject {
    _rootNode: HTMLDivElement;
    _parentNode: HTMLDivElement;
    _panelNode: HTMLDivElement;
    _lineNode: HTMLDivElement;
    _rootClass: string;
    _parentClass: string;
    _lineClass: string;
    _panelClass: string;
    _show: boolean;
    _bindObject: any;
    _container: any;
    _isMouseDown: boolean;
    _downX: number;
    _downY: number;
    _bottomX: number;
    _bottomY: number;
    _offset: any;
    _position: any;
    _panelStyle: string;
    _lineStyle: string;
    _lineStart: any;
    _offsetX: number;
    _offsetY: number;
    _type: any;
    _renderVisible: boolean;
    _bubbleEvent: () => void;
    _entity: any;
    _convertData: BubbleGraphic;
    _fnDown: any;
    _fnUp: (e: any) => void;
    _fnMove: (e: any) => void;
    _fnStart: (e: any) => void;
    _fnTMove: (e: any) => void;
    _fnEnd: (e: any) => void;
    init(): void;
    /**
     * 创建DOM方法
     */
    private _createDom;
    /**
     * 获取DOM
     */
    private _getDom;
    private _checkItem;
    private _render;
    private _renderShow;
    /**
     * 渲染前回调函数
     */
    private _preRender;
    _updateVisible(): void;
    _getBounds(): {
        minlon: number;
        minlat: number;
        maxlon: number;
        maxlat: number;
    };
    _mouseDown(e: any): void;
    _mouseMove(e: any): void;
    _mouseUp(e: any): void;
    _touchStart(e: any): void;
    _touchMove(e: any): void;
    _touchEnd(e: any): void;
    /**
     * 计算锚点
     */
    _calcluteBindPoint(): Cesium.Cartesian2;
    /**
     * 设置moveDiv的位置 防止位置超出范围
    */
    _setMoveDivPosition(x: any, y: any): void;
    _display(val: any): void;
    /**
     * 移除DOM元素
     * @param _element
     */
    _removeElement(_element: any): void;
    /**
     * 事件绑定
     */
    private _bindEvent;
    /**
     * 事件移除
     */
    _removeEvent(): void;
    clear(): void;
    /**
     * 计算线的旋转位置
     * @param object
     * @param bindNode
     */
    private _rotateLine;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 图标渲染对象
 */
  class CesiumBillboard extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 圆柱圆锥渲染对象
 */
  class CesiumCylinder extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 渲染对象
 */
  class CesiumEllipse extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 椭球体渲染对象
 */
  class CesiumEllipsoid extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 标签渲染对象
 */
  class CesiumLabel extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 标签渲染对象
 */
  class CesiumModel extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

  class CesiumPoint extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}

  class CesiumPolygon extends RenderObject {
    _positions: any[];
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    getRenderPositions(): any[];
}

  class CesiumPolyline extends RenderObject {
    _positions: any[];
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    getRenderPositions(): any[];
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}

/**
 * 气泡标签渲染对象
 */
  class CesiumPopover extends RenderObject {
    readonly renderType: RenderTypeEnum;
    private billboardCanvas;
    private flag;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    updateCanvas(): void;
    private updateCanvasCallBack;
    /**
     * 创建html标签
     * @param shapeType 形状
     * @param text 文字
     */
    private createHTMLElement;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 图标渲染对象
 */
  class CesiumRectangle extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     *
     */
    private getCoordinates;
    /**
     * 更新全部属性
     */
    update(): void;
    calcCoordinates(data: any): Cesium.Rectangle;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 图标渲染对象
 */
  class CesiumSphere extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 图标渲染对象
 */
  class CesiumVolumePolyline extends RenderObject {
    readonly renderType: RenderTypeEnum;
    starPositions(arms: any, rOuter: any, rInner: any): any[];
    /**
     * 初始化
     */
    init(): void;
    getShape(value: any): any[];
    private getCornerType;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

/**
 * 图标渲染对象
 */
  class CesiumWall extends RenderObject {
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}

  class CircularRender extends RenderObject {
    private _appearance;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化方法
     */
    init(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
     * 设置材质
     */
    private createMaterial;
    /**
     * 绘制图形
     */
    private createPrimitive;
}

/**
 * 文字标签渲染对象
 */
  class CustomLabelRender extends RenderObject {
    private pinBuilder;
    private image;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
    clear(): void;
}

  class CylinderSensor extends RenderObject {
    private _geometry;
    private _appearance;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化方法
     */
    init(): void;
    listenerFun: () => void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
     * 获得世界坐标系下位置
     */
    private createVertex;
    /**
     * 创建attribute
     * @param topPosArr 顶面顶点数据
     * @param bottomPosArr 底面顶点数据
     */
    private createGeometeryAttribute;
    /**
     * 创建网格体
     * @param postionsTemp 顶点数据
     * @param stsTemp 纹理数据
     */
    private createGrometry;
    /**
     * 创建材质
     */
    private createMaterial;
    /**
     * 创建primitive
     */
    private createPrimitive;
    /**
     * 创建变换矩阵
     */
    private createGeometryMatrix;
    clear(): void;
}

  class DynamicRippleEffect extends RenderObject {
    dataOptions: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
}

  class JBLineRender extends RenderObject {
    /**数据源 */
    result: any[];
    /**线 */
    linePrimitive: Cesium.Primitive;
    /**填充网格体 */
    fillPrimitive: Cesium.Primitive;
    /**拉高网格体 */
    supplementPrimitive: Cesium.Primitive;
    /**栅格线的材质 */
    lineRasterAppearance: Cesium.PolylineMaterialAppearance;
    /**矢量线材质 */
    lineVectorAppearance: Cesium.MaterialAppearance;
    /**填充网格体材质 */
    fillAppearance: Cesium.Appearance;
    /**拉高网格体材质 */
    supplementAppearance: Cesium.Appearance;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 创建栅格线
     */
    createRasterLine(): void;
    /**
     * 创建矢量线
     */
    createVectorLine(): void;
    /**
     * 创建矢量填充
     */
    createFill(): void;
    /**
     * 创建栅格线填充
     */
    createGroundFillPrimitive(): void;
    /**
     * 创建拉高网格体
     */
    createSupplement(): void;
    /**
     * 创建填充纹理图
     */
    getColorRamp(colorArray: Array<string>, bvArray: Array<number>, angle: number): HTMLCanvasElement;
    /**
     * 根据关键点获取数据源
     */
    getRenderPositions(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}

  class JBPointRender extends RenderObject {
    _positions: any[];
    _svgStr: any;
    ent: any;
    _image: string;
    _appearance: Cesium.MaterialAppearance;
    _label: any;
    _rectangleInstance: any;
    _labelCollect: any;
    _objE: HTMLDivElement;
    svgCode: string;
    billboard: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 绘制billboard
     * @param data
     */
    renderByBillboard(data: any): void;
    /**
     * 栅格方式渲染
     * @param data
     */
    renderByGrid(data: any): void;
    /**
     * 创建Appearence
     */
    createAppearence(): Cesium.PerInstanceColorAppearance;
    /**
     * 矢量形式渲染
     * @param data
     */
    renderByVector(data: any): void;
    /**
     * 通过军标码加载
     * @param data
     */
    JBLoad(data: any): void;
    /**
     * 分析threejs svgLoader解析后的svg数据
     * @param shape
     * @param data
     */
    analysis(shape: any, data: any): void;
    /**
     *
     * @param holesRes 多边形边框
     * @param height 整体高度
     * @param extrudedHeight 挤压高度
     * @param color 边框色
     * @param holes 洞
     * @param holesColor 洞的颜色
     */
    createVector(holesRes: any, height: any, extrudedHeight: any, color: any, holes?: any, holesColor?: any): void;
    /**
     * 计算点标洞口位置信息
     * @param holes
     * @param position
     */
    calcholes(holes: any, position: any): any;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    updateHole(holes: any, color: any): any;
    modifySvg(code: any, color: any, strokeWidth: any, strokeColor: any, callback: any): void;
    parseDom(arg: any): NodeListOf<Element>;
    getSVG(): string;
    SVG(svg: any): string;
    clear(): void;
}

  class GxPrimitivePolyline {
    private vertexShader;
    private fragmentShader;
    private viewer;
    private positionArr;
    private colorArr;
    private indiceArr;
    /**
     * 通过参数组成的Geomerty
     */
    geometry: Cesium.Geometry;
    /**
     * 三角网Appearance
     */
    appearance: Cesium.Appearance;
    /**
    * 构造函数
    * @param viewer  球
    * @param Cartesians 位置数组,三个点构成一个面
    * @param Colors  颜色数组,长度必须为Cartesians的4倍[1][1][1][0],4位为一个顶点的颜色
    */
    constructor(viewer: Cesium.Viewer, Cartesians: Array<Cesium.Cartesian3>, Colors: Array<number>);
    private CreateGeometry;
    private CreateAppearence;
    private getVS;
    private getFS;
}

/**
 * 三角网绘制
 */
  class GxPrimitiveTriangles {
    private vertexShader;
    private fragmentShader;
    private viewer;
    private positionArr;
    private colorArr;
    private indiceArr;
    /**
     * 通过参数组成的Geomerty
     */
    geometry: Cesium.Geometry;
    /**
     * 三角网Appearance
     */
    appearance: Cesium.Appearance;
    /**
     * 构造函数
     * @param viewer  球
     * @param Cartesians 位置数组,三个点构成一个面
     * @param Colors  颜色数组,长度必须为Cartesians的4倍[1][1][1][0],4位为一个顶点的颜色
     */
    constructor(viewer: Cesium.Viewer, Cartesians: Array<Cesium.Cartesian3>, Colors: Array<number>);
    private CreateGeometry;
    private CreateAppearence;
    private getVS;
    private getFS;
}

  class RadarRender extends RenderObject {
    private primitivePolyline;
    private primitiveTriangles;
    private scanPrimitivePolyline;
    private scanPrimitiveTriangles;
    isPrimitive: boolean;
    private radarOption;
    private _position;
    private angle;
    private isReserve;
    private lastTime;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化
     */
    init(): void;
    listenerFun: () => void;
    position: GeoPoint;
    private create;
    private createScan;
    private originalMatrix;
    private updateModelMatrix;
    private createPrimitive;
    /**
     * 更新外观,在修改属性之后
     */
    update(): void;
    /**
     * 属性更新
     * @param attrName
     */
    updateAttribute(attrName: any): void;
    /**
     * 清除
     */
    clear(): void;
}

/**
 * 标绘渲染对象虚方法
 */
  class RenderObject {
    _renderObj: any;
    _dataItem: GraphicItem;
    _renderRoot: any;
    _viewer: Cesium.Viewer;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    readonly renderType: RenderTypeEnum;
    readonly renderObj: any;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 清理
     */
    clear(): void;
    /**
     * 整体更新
     */
    update(): void;
    /**
     * 属性更新（为提高效率）
     */
    updateAttribute(attrName: string): void;
}
  enum RenderTypeEnum {
    Entity = "entity",
    Primitive = "Primitive",
    PostProcess = "PostProcess",
    Lable = "Lable",
    Billboard = "Billboard",
    DrawCombination = "DrawCombination"
}

/**
 * 渲染工具对象
 */
  class RenderUtils {
    constructor();
    static getPositions(value: Array<GeoPoint>): any[];
    static getRadii(value: any): Cesium.Cartesian3;
    static getRectangleDegress(value: any): Cesium.Rectangle;
    static getImage(value: any): Cesium.ImageMaterialProperty;
    static getClassificationType(value: any): any;
    static getShadows(value: any): any;
    static getGranularity(value: any): number;
    static getColor(value: any): Cesium.Color;
    static getDynamicColor(value: String): Cesium.CallbackProperty;
    static getDynamicValue(value: any): Cesium.CallbackProperty;
    static getPosition(value: GeoPoint): Cesium.Cartesian3;
    static getNearFarScalar(value: any): Cesium.NearFarScalar;
    static getDynamicNearFarScalar(value: any): Cesium.CallbackProperty;
    static getDistanceDisplayCondition(value: any): Cesium.DistanceDisplayCondition;
    static getDynamicDistanceDisplayCondition(value: any): Cesium.CallbackProperty;
    static getCartesian2(value: any): Cesium.Cartesian2;
    static getVerticalOrigin(str: any): any;
    /**
     * 水平对齐方式
     */
    static getHorizontalOrigin(str: any): any;
    static getHeightReference(str: any): any;
    static getStyle(value: any): number;
    static getPositionDegrees(value: any): Cesium.Cartesian3;
    static getCartesian3(value: any): Cesium.Cartesian3;
    static getOrientation(position: any, hpr: any): any;
    static getHpr(heading: any, pitch: any, roll: any): Cesium.HeadingPitchRoll;
    static getHeading(value: any): number;
}

  class ScanEffect extends RenderObject {
    private polygonAppearance;
    private polylineAppearance;
    private polygonGeometry;
    private polylineGeometry;
    private polygonPrimitive;
    private polylinePrimitive;
    private angle;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    listenerFun: () => void;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 创建网格体
     */
    private createGeometry;
    /**
     * 创建材质
     */
    private createAppearence;
    /**
     * 创建primitive
     */
    private createPrimitive;
    /**
     * 片源着色器方法
     */
    private getMS;
    private createGeometryMatrix;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
}

  class SectorSensor extends RenderObject {
    private _geometry;
    private _appearance;
    private _radius;
    private _sliceUnit;
    readonly renderType: RenderTypeEnum;
    constructor(item: GraphicItem, renderRoot: GraphicLayer);
    /**
     * 初始化方法
     */
    init(): void;
    listenerFun: () => void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
       * 创建attribute
       */
    private createGeometeryAttribute;
    /**
     * 创建网格体
     * @param postionsTemp 顶点数据
     * @param stsTemp 纹理数据
     */
    private createGrometry;
    /**
     * 创建材质
     */
    private createMaterial;
    /**
     * 创建primitive
     */
    private createPrimitive;
    /**
     * 创建变换矩阵
     */
    private createGeometryMatrix;
    clear(): void;
}

  class SensorRender extends RenderObject {
    dataOptions: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
    update(): void;
}

  class SpreadEffect extends RenderObject {
    protected _Cartesian3Center: any;
    protected _Cartesian4Center: Cesium.Cartesian4;
    protected _CartographicCenter1: any;
    protected _Cartesian3Center1: any;
    protected _Cartesian4Center1: Cesium.Cartesian4;
    protected _time: number;
    protected _scratchCartesian4Center1: Cesium.Cartesian4;
    protected _scratchCartesian4Center: Cesium.Cartesian4;
    protected _scratchCartesian3Normal: Cesium.Cartesian3;
    protected _ScanPostStage: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    create(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
    update(): void;
}

 class TriangleMesh extends RenderObject {
    _indices: number[];
    readonly renderType: RenderTypeEnum;
    _triPrimitive: any;
    _viewer: any;
    _points: Array<number>;
    _color: string;
    init(): void;
    create(): void;
    formatData(): {
        points: number[];
        indices: number[];
        colors: Float32Array;
    };
    /**
     *
     * @param {*} inputs      // minX,minY,maxX,maxY,png[string/url]
     * @param {*} callback  // instance obj
     */
    draw_triangles(inputs: any, callback: any): void;
    getVS(): string;
    getFS(): string;
    createAppearance(): Cesium.Appearance;
    clear(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}

  class WaterEffect extends RenderObject {
    private _fragmentShader;
    private _appearance;
    private _geometry;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
         * 修改片源着色器
         * @return {string} 片源着色器
         */
    private fSWaterFace;
    /**
     * 创建材质
     * @returns  材质
     */
    private createAppearence;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
    /**
     * 法向量图
     * @return {string} 图片资源
     */
    private normalMap;
}

  class WeatherParticle extends RenderObject {
    private _rainVelocity;
    private _snowVelocity;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
     * 创建粒子系统
     * @returns
     */
    private createParticle;
    /**
     * 创建雪的发生器矩阵
     */
    private computeEmitterMatrix;
    /**
     * 更新函数
     * @param {any} 粒子对象
     */
    private updateParticle;
    clear(): void;
}

/**
 * @注意 用户不需要示例化
 * @描述 线样式基类
 */
  class BaseLineStyle {
    protected _material: any;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): void;
    /**
     * @注意 内部实现使用
     */
    getMaterial(): any;
}
/**
 * @注意  内部使用
 * @描述 线样式构造器
 */
  class LineStyle {
    static createStyle(opt: any): ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
}
/**
 * 颜色样式
 */
  class ColorStyle extends BaseLineStyle {
    private _color;
    constructor(any: any);
    /**
     * 颜色
     */
    color: any;
    /**
     * @注意
     */
    getMaterial(): any;
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
    };
}
/**
 * 箭头
 */
  class ArrowStyle extends BaseLineStyle {
    private _color;
    constructor(any: any);
    /**
     * 颜色
     */
    color: any;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
    };
}
/**
 * 外边框线
 */
  class OutlineStyle extends BaseLineStyle {
    private _color;
    private _outlineWidth;
    private _outlineColor;
    constructor(any: any);
    /**
     * 颜色
     */
    color: string;
    /**
     * 外边框宽度
     */
    outlineWidth: number;
    /**
     * 外边框颜色
     */
    outlineColor: string;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
        outlineColor: string;
        outlineWidth: number;
    };
}
/**
 * 虚线
 */
  class DashStyle extends BaseLineStyle {
    private _color;
    private _gapColor;
    private _dashLength;
    private _dashPattern;
    constructor(any: any);
    /**
     * 颜色
     */
    color: string;
    /**
     * 中间颜色
     */
    gapColor: string;
    /**
     * pixel中的虚线模式的长度
     */
    dashLength: number;
    /**
     * 短划线16位模式
     */
    dashPattern: number;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
        gapColor: string;
        dashPattern: number;
        dashLength: number;
    };
}
/**
 * 发光线
 */
  class GlowStyle extends BaseLineStyle {
    private _color;
    private _glowPower;
    private _taperPower;
    constructor(any: any);
    /**
     * 颜色值
     */
    color: string;
    /**
     * 发光强度占总线宽的百分比
     */
    glowPower: number;
    /**
     * 指定逐渐减小效果的强度，以总线长度的百分比表示。如果为1.0或更高，则不使用锥度效果。
     */
    taperPower: number;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
        taperPower: number;
        glowPower: number;
    };
}
/**
 * 动态线
 */
  class DynamicStyle extends BaseLineStyle {
    private _icon;
    private _color;
    private _duration;
    private _update;
    constructor(any: any);
    private _updateMaterial;
    /**
     *@注意 内部实现使用
     *序列化
     */
    setUpdate(value: any): void;
    /**
     * 动态线的图案
     */
    icon: DynamicIconEnum;
    /**
     * 颜色
     */
    color: string;
    /**
     * 跟新周期（渲染多少次执行一次渲染）
     */
    duration: number;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: DynamicIconEnum;
        color: string;
        duration: number;
    };
}
/**
 * 动态线图案枚举
 */
  enum DynamicIconEnum {
    Arrow = "arrow",
    Pulse = "pulse",
    Trail = "trail",
    Attack = "attack"
}
/**
 * 线样式枚举
 */
  enum PolylineStyleEnum {
    /**
     * 颜色
     */
    Color = "Color",
    /**
     * 箭头
     */
    Arrow = "PolylineArrow",
    /**
     * 虚线
     */
    Dash = "PolylineDash",
    /**
     * 发光线
     */
    Glow = "PolylineGlow",
    /**
     * 边框线
     */
    Outline = "PolylineOutline",
    /**
     * 动态线
     */
    Dynamic = "Dynamic"
}

/**
 * UrlTemplate影像
 */
  class ArcGisImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: ArcGisImageryOpt);
    /**
     * 获取类型
     */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
  class ArcGisImageryOpt {
    /**
     * 影像路径
     */
    url: string;
}

/**
 * UrlTemplate影像
 */
  class BingImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: BingImageryOpt);
    /**
     * 获取类型
     */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
  class BingImageryOpt {
    /**
     * 影像路径
     */
    url: string;
}

  class ImageLayer extends Layer {
    _viewer: Cesium.Viewer;
    _renderItemList: any[];
    constructor(viewer: Cesium.Viewer);
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Item;
    /**
     * 下降一层如果当前是最底层将不再下降
     * @param image 需要操作的影像对象
     */
    lower(image: ImageryItem): void;
    /**
     * 降至最底层
     * @param image 需要操作的影像对象
     */
    lowerToBottom(image: ImageryItem): void;
    /**
     * 上升一层
     * @param image 需要操作的影像对象
     */
    raise(image: ImageryItem): void;
    /**
     * 上升到最顶层
     * @param image 需要操作的影像对象
     */
    raiseToTop(image: ImageryItem): void;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    getItemList(): Item[];
    /**
     * 获取渲染对象
     */
    getRenderObject(): Cesium.ImageryLayerCollection;
    getRenderItemById(id: string): any;
}
/**
 * 投影方式
 */
  enum TilingSchemeE {
    /**
     * web墨卡托投影
     */
    WebMercator = 1,
    /**
     * Wgs84投影
     */
    Geographic = 2
}

  class ImageryItem extends Item {
    getRenderObject(): Cesium.ImageryLayer;
}

/**
 * UrlTemplate影像
 */
  class OSMImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: OSMImageryOpt);
    /**
     * 获取类型
     */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
  class OSMImageryOpt {
    /**
     * 影像路径
     */
    url: string;
    /**
     * 影像投影方式
     */
    tilingScheme: TilingSchemeE;
    /**
     * 最大层级
     */
    maximumLevel: number;
}

/**
 * UrlTemplate影像
 */
  class UrlTemplateImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: UrlTemplateImageryOpt);
    /**
     * 获取类型
     */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
  class UrlTemplateImageryOpt {
    /**
     * 影像路径
     */
    url: string;
    /**
     * 影像投影方式
     */
    tilingScheme: TilingSchemeE;
    /**
     * 最大层级
     */
    maximumLevel: number;
}

/**
 * UrlTemplate影像
 */
  class WMSImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: WMSImageryOpt);
    /**
    * 获取类型
    */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
  class WMSImageryOpt {
    /**
     * 影像路径
     */
    url: string;
    /**
     * 影像图层
     */
    layer: string;
    /**
     * 影像投影方式
     */
    tilingScheme: TilingSchemeE;
    /**
     * 样式
     */
    style: string;
    /**
     * 影像格式
     */
    format: string;
    /**
     * 影像变换
     */
    tileMatrixSetID: "EPSG:4326";
}

/**
 * UrlTemplate影像
 */
  class WMTSImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: WMTSImageryOpt);
    /**
     * 获取类型
     */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
  class WMTSImageryOpt {
    /**
     * 影像路径
     */
    url: string;
    /**
     * 影像图层
     */
    layer: string;
    /**
     * 影像投影方式
     */
    tilingScheme: TilingSchemeE;
    /**
     * 样式
     */
    style: string;
    /**
     * 影像格式
     */
    format: string;
    /**
     * 影像变换
     */
    tileMatrixSetID: "EPSG:4326";
}

/**
 * 图层管理
 */
  class LayerManager {
    private _graphicLayer;
    private _ImageLayer;
    private _massiveLayer;
    private _targetLayer;
    private _terrainLayers;
    private _satelliteLayer;
    private _tileLayer;
    private _viewer;
    constructor(viewer: Cesium.Viewer);
    init(): void;
    toJson(): any[];
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    /**
     * 标绘图层
     */
    readonly graphicLayer: GraphicLayer;
    /**
     * 影像图层
     */
    readonly imageLayer: ImageLayer;
    /**
     * 高效绘制图层
     */
    readonly massiveLayer: MassiveLayer;
    /**
     * 目标图层
     */
    readonly targetLayer: TargetLayer;
    /**
     * 地形图层
     */
    readonly terrainLayers: TerrainLayerCollection;
    /**
     * 卫星图层
     */
    readonly satelliteLayer: SatelliteLayer;
    /**
     * 瓦片图层
     */
    readonly tileLayer: TileLayer;
}

/**
 * @类别 需要用户创建的类 <br>
 * @描述 聚合点 <br>
 * @see <a href='../../../examples/gallery/editor.html#cluster'>聚合点</a>
 */
  class Cluster extends Item {
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
  class ClusterOpt {
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

/**
 * @类别 需要用户创建的类</br>
 * @描述 热力图</br>
 * @see <a href='../../../examples/gallery/editor.html#heatMap'>热力图</a>
 */
  class HeatMap {
    private _viewer;
    private _heatMapOption;
    private _heatMapLayer;
    private _zoomLevel;
    private _zoomRadius;
    private _zAxisHeight;
    private _heatMapParams;
    private _moveEnd;
    constructor(heatOpt: HeatMapOpt);
    private _calcBound;
    private _formatPoints;
    private _updateFllowCamera;
    /**
     * 初始化
     * @param viewer
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 获取热力图参数信息
     */
    getHeatMapOpt(): any;
    /**
     * 热力图更新
     * @param opt
     */
    update(opt: HeatMapOpt): void;
    /**
     * 创建热力图
     * @param opt
     */
    private _create;
    /**
     * 销毁热力图
     */
    destroyItem(): void;
}
/**
 * @类别 需要用户创建的类 </br>
 * @描述 热力图参数类 </br>
 * @see <a href='../../../examples/gallery/editor.html#heatMap'>热力图</a>
 */
  class HeatMapOpt {
    /**
     * 热力点数据集 </br>
     * 参数格式：[{经度：数字，纬度：数字，此位置上的数据值：数字}...] </br>
     * 如：{lon:80,lat:40,value:90}
     */
    points: any;
    /**
     * 每个数据点将具有的半径 </br>
     * 默认值：10 </br>
     * 范围：>0 && <=100
     */
    radius: number;
    /**
     * 数据集下限
     */
    limitMin: number;
    /**
     * 数据集上限
     */
    limitMax: number;
    /**
     * 表示渐变的对象（语法：数字字符串[0,1]：颜色字符串） </br>
     * 如：{ 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" }
     */
    gradient: object;
    /**
     * 热图中最高值的最大不透明度。（如果设置了不透明度，将被覆盖） </br>
     * 范围：>=0 && <=1
     */
    opacity: number;
    /**
     * 将应用于所有数据点的模糊因子。模糊因子越高，渐变越平滑 </br>
     * 范围：>=0 && <= 1
     */
    blur: number;
    constructor(points: any, radius: number, limitMin: number, limitMax: number, gradient?: object, opacity?: number, blur?: number);
}

/**
 * @类别 需要用户创建的类</br>
 * @描述 MapV复合可视化，搭建了球和MapV之间的桥梁，具体MapV应用请参见MapV官网（https://mapv.baidu.com/）</br>
 * @see <a href='../../../examples/gallery/editor.html#honeyComb'>蜂巢网格</a>
 * @see <a href='../../../examples/gallery/editor.html#migrate'>迁徙图</a>
 * @see <a href='../../../examples/gallery/editor.html#weiboPoint'>微博点</a>
 * @see <a href='../../../examples/gallery/editor.html#migrateAll'>数据链路</a>
 * @see <a href='../../../examples/gallery/editor.html#square'>方形网格</a>
 */
  class MapV {
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
  class MapVOpt {
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

  class MassiveLayer extends Layer {
    private _viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Item;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
}

/**
 * 批量绘制线
 * @see  http://localhost:8088/examples/gallery/editor.html#efficientLines
 */
  class MassiveLines extends Item {
    /**视图对象 */
    private _viewer;
    /**线的Primitive对象 */
    private _linePrimitive;
    /**材质对象 */
    private _apprence;
    /**纹理图片路径 */
    private _lineTexTure;
    /**流动线颜色 */
    private _animateColor;
    /**线的主体颜色 */
    private _lineColor;
    /**线的数据 */
    private _lineData;
    /**线的Instance对象数组 */
    private _lineInstances;
    /**流动速度 */
    private _speed;
    /**线的宽度 */
    private _lineWidth;
    /**Item编号 */
    protected _id: string;
    /**
     * 初始化方法
     * @param options 参数类
     * @returns
     * ```
     * 示例代码
     *    let data = [[90, 0, 2000000, 90, 30, 2000000]];
     *    let massiveLinesOpt = new GV.MassiveLinesOpt(data);
     *    let massiveLines = new GV.MassiveLines(massiveLinesOpt);
     *
     * ```
     */
    constructor(options: MassiveLinesOpt);
    /**
    * 获取类型
    */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 获取运动点颜色
     * @return {string}
     *
     */
    readonly sportColor: string;
    /**
     * 设置运动线颜色
     * @param {string} val 运动线颜色
     * ```
     * 示例代码
     * massiveLines.sportColor='#ffffff'
     * ```
     */
    animateColor: string;
    /**
     * 获取线的颜色
     * @return {string}
     */
    /**
    * 设置线的颜色
    * @param {string} val 线颜色
    * ```
    * 示例代码
    * massiveLines.sportColor='#ffffff'
    * ```
    */
    lineColor: string;
    /**
     * 获取运动速度
     * @return {number}
     */
    /**
    * 设置运动速度
    * @param {number} val 运动速度
    * ```
    * 示例代码
    * massiveLines.speed=1.0
    * ```
    */
    speed: number;
    /**
     * 获取纹理图片
     * @return {string}
     */
    /**
    * 设置纹理图片
    * @param {string} val 图片名称
    */
    lineTexture: string;
    /**
     * 初始化
     * @param {BatchLineOptions} options 参数类
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 创建线的实例
     */
    private createLineInstance;
    /**
     * 创建材质
     */
    private createMaterial;
    /**
     * 改写片源着色器
     */
    private getFS;
    /**
     * 片源着色器方法
     */
    private getMS;
    /**
     * 画线
     */
    private drawLines;
    /**
     * 删除线
     */
    destroyItem(): void;
    /**
     * Event函数
     */
    private listenerFun;
}
/**
 * 批次划线参数类
 */
  class MassiveLinesOpt {
    /**已插值的线数据*/
    lineData: Array<Array<number>>;
    /**流动速度 */
    speed?: number;
    /**纹理URL*/
    lineTexTure?: string;
    /**流动线颜色*/
    animateColor?: string;
    /**线的主体颜色 */
    lineColor?: string;
    /**线的宽度 */
    lineWidth?: number;
    constructor(lineData: Array<Array<number>>, speed?: number, lineTexTure?: string, animateColor?: string, lineColor?: string, lineWidth?: number);
}

/**
 * 批次绘制点
 * @see <a href='../../../examples/gallery/editor.html#efficientPoints'>批次绘制点</a>
 */
  class MassivePoints extends Item {
    /**视图对象*/
    private _viewer;
    /**点样式划分 */
    private _colors;
    /**点大小 */
    private _pointSizes;
    /**Primitive对象 */
    private _primitive;
    /**材质对象 */
    private _appearance;
    /**点数据 */
    private _data;
    /**点颜色数组 */
    private _pointColors;
    /**点位置数组 */
    private _pointPositions;
    /**Item Id */
    protected _id: string;
    /**
     * 初始化方法
     * @param data 点数据
     * @param colors 颜色数据
     * @returns
     * ```
     * 示例代码
     *    let colors=[];
     *    colors.push(new GV.PointStyle(1000, 0.4, 0.9, 0.2, 0.4));
     *    let pointData=[];
     *    pointData.push(new GV.PointOption(90, 0, 1000))
     *    let massivePoints  = new GV.MassivePoints(pointData,colors);
     *
     * ```
     */
    constructor(data: Array<PointOption>, colors: Array<PointStyle>);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 初始化实体
     * @param {GeoCanvas} 视图对象
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 删除实体
     */
    destroyItem(): void;
    /**
     * 初始化数据
     */
    private resolveData;
    /**
     * 创建网格体
     * @return {Cesium.Geometry} 网格体
     */
    private createGeometry;
    /**
     * 创建材质信息
     * @param {string} fs 片源着色器
     * @param {string} vs 顶点着色器
     * @return {Cesium.Appearance} 材质信息
     */
    private createAppearence;
    /**
     * 顶点着色器
     * @return {string} 顶点着色器
     */
    private getVS;
    /**
     * 片源着色器
     * @return {string} 片源着色器
     */
    private getFS;
    /**
     * 获取某一级别下点的颜色
     * @param {number} 级别
     * @return {Array} 颜色数组
     */
    private getColor;
    /**
     * 获取某一级别下点的大小
     * @param {number} 级别
     * @return {number} 大小
     */
    private getPointSize;
    /**
     * 更新数据源
     * @param {Array} data 数据源
     *
     * ```
     * 示例代码
     *   let pointData=[];
     *   pointData.push(new GV.PointOption(10, 0, 1000));
     *   massivePoints.data=pointData;
     *
     * ```
     */
    data: Array<PointOption>;
}
/**点参数 */
  class PointOption {
    /**点经度 */
    lon: number;
    /**点纬度 */
    lat: number;
    /**代表当前点个数 */
    count: number;
    constructor(lon: number, lat: number, count: number);
}
/**点样式设定 */
  class PointStyle {
    /**点个数级别 */
    level: number;
    /**点颜色r通道 */
    r: number;
    /**点颜色g通道*/
    g: number;
    /**点颜色b通道 */
    b: number;
    /**点颜色a通道 */
    a: number;
    constructor(level: number, r: number, g: number, b: number, a: number);
}

/**
 * 批次绘制面
 * @see <a href='../../../examples/gallery/editor.html#efficientPolygons'>批次绘制面</a>
 */
  class MassivePolygons {
    private _viewer;
    private _dataSource;
    private _instances;
    private _heightFlag;
    private _primitive;
    protected _id: string;
    /**
     * 初始化
     * @param {Array<PolygonOptions>} dataSource 顶点数据
     * @param {boolean} heightFlag 顶点数据中是否有高度信息
     * ```
     * 示例代码
     * let dataSource=[];
     * dataSource.push(new GV.MassivePolygonOpt([0, 0, 10, 0, 10, 10, 0, 10]));
     * let massivePolygons=new GV.MassivePolygons(dataSource);
     * ```
     */
    constructor(dataSource: Array<MassivePolygonOpt>, heightFlag?: boolean);
    /**
     * 创建实例对象
     */
    private createInstances;
    /**
     * 创建材质信息
     * @return {Cesium.PerInstanceColorAppearance} 材质信息
     */
    private createAppearence;
    /**
     * 创建Primitive
     */
    private createPrimitive;
    /**
     * 创建实体
     * @param {GeoCanvas} viewer 视图对象
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 移除操作
     */
    destroyItem(): void;
    /**
     * 修改被选中物体颜色
     * @param id 面的id值
     * @param color 修改的颜色
     */
    changePickedColor(id: string, color?: string): void;
}
/**
 * 参数类
 * @param {Array} positions 面数据
 * @param {string} color 颜色
 */
  class MassivePolygonOpt {
    /**面的顶点数据 */
    positions: Array<number>;
    /**面的颜色 */
    color: string;
    /**面的ID值 */
    id: string;
    constructor(positions: Array<number>, id?: string, color?: string);
}

/**
 * @类别 需要用户创建的类 <br>
 * @描述 空间碎片 <br>
 * @see <a href='../../../examples/gallery/editor.html#debris'>空间碎片</a>
 */
  class SpaceDebris extends Item {
    private root;
    private workerArray;
    private derbrisList;
    private debrisMap;
    private viewer;
    private spaceDebrisOpts;
    /**
     * 空间碎片构造函数
     * @param spaceDebrisOpts 空间碎片数组对象
     * ```
     * 示例代码
     *   fetch("../data/satellite.json").then(r => {
     *          r.json().then(data => {
     *               var spaceDebrisData = [];
     *               var length = data.length;
     *               for (var i = 0; i < length; i++) {
     *                   var item = data[i];
     *                   var opt = new GV.SpaceDebrisOpt();
     *                   opt.name = item.name;
     *                   opt.tle1 = item.tle1;
     *                   opt.tle2 = item.tle2
     *                   spaceDebrisData.push(opt);
     *               }
     *               var spaceDebris = new GV.SpaceDebris(spaceDebrisData);
     *               viewer.layerManager.massiveLayer.add(spaceDebris);
     *               spaceDebris.show();
     *           })
     *   })
     * ```
     */
    constructor(spaceDebrisOpts: Array<SpaceDebrisOpt>);
    /**
     * 初始化空间碎片
     * @param viewer 地理画布
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 销毁空间碎片
     */
    destroyItem(): void;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 序列化
     */
    toJson(): object;
    /**
     * 反序列化
     */
    parseJson(): void;
    /**
     * 多线程work脚本URL
     */
    private workerUrl;
    /**
     * 显示空间碎片
     */
    show(): void;
    private addDebrisItem;
}
/**
 * 空间碎片构造参数类，卫星数据json格式需要正确
 */
  class SpaceDebrisOpt {
    /**
     * 名称
     */
    name: string;
    /**
     * 卫星数据数组1
     */
    tle1: string;
    /**
     * 卫星数据数组2
     */
    tle2: string;
}

/**
 * 空间碎片内部使用类
 */
  class SpaceDebrisItem {
    _currentTime: Date;
    _sampleProperty: Cesium.SampledPositionProperty;
    _currentPosition: any;
    point: Cesium.PointPrimitive;
    tle1: string;
    tle2: string;
    worker: Worker;
    id: number;
    currentTime: Date;
}

/**
 * @类别 需要用户创建的类 <br>
 * @描述 风场 <br>
 * @see <a href='../../../examples/gallery/editor.html#windy'>风场</a>
 */
  class Windy extends Item {
    private _primitives;
    private SPEED_RATE;
    private PARTICLES_NUMBER;
    private MAX_AGE;
    private BRIGHTEN;
    private cesiumViewer;
    private windData;
    private windField;
    private particles;
    private lines;
    private windDataObj;
    /**
     * 风场构造函数
     * @param data 风场数据
     * ```
     * 示例代码
     * fetch("../data/windData.json").then(r => {
     *	 r.json().then(data => {
     *		let windy = new GV.Windy(data);
     *		viewer.layerManager.massiveLayer.add(windy);
     *		// viewer.layerManager.massiveLayer.remove(windy.id);
     *	 })
     * })
     * ```
     */
    constructor(data: Array<Object>);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 初始化风场
     * @param viewer 地理画布
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 销毁风场
     */
    destroyItem(): void;
    private initWindyData;
    private _init;
    private createField;
    private animate;
    private _parseWindJson;
    private removeLines;
    private _map;
    private _createLineInstance;
    private _drawLines;
    private randomParticle;
}

  class GeoVector3 {
    constructor(x: number, y: number, z: number, time?: Date);
    x: number;
    y: number;
    z: number;
    time?: Date;
}

/**
 * @类别 需手动创建，然后添加到卫星图层类中<br>
 * @描述 卫星类，提供了更改卫星的属性接口<br>
 * @see  http://localhost:8088/examples/gallery/editor.html#satelliteShow
 */
  class Satellite extends Item {
    private _sampleProperty;
    protected _name: string;
    protected _id: any;
    private _image;
    /**扫描带颜色 */
    private _groundTrackColor;
    /**轨道颜色 */
    private _orbitColor;
    /**卫星罩颜色 */
    private _coverColor;
    /**棱锥开合角 */
    private _halfAngle;
    /**卫星罩类型 */
    private _type;
    private _viewer;
    /**卫星entity的Map */
    private _entitiesMap;
    /**轨道数据 */
    private _orbitPositions;
    /**当前时间 */
    private _currentTime;
    /**当前位置 地球坐标系*/
    private _currentPosition;
    /**卫星两根数 */
    private _tle;
    private _priod;
    private _endTime;
    private rectangularSensorGraphics;
    /**
     * 初始化
     * @param options 卫星属性类
     * @returns
     * ```
     * 示例代码：
     *  let sateOpt = new GV.SatelliteOpt(
     * `GF-1
     * 1 39766U 14029A   19051.88312325 -.00000394  00000-0 -45830-4 0  9997
     * 2 39766  97.9206 150.4086 0001551  85.1013 275.0382 14.79467694256344`);
     * let satellite = new GV.Satellite(sateOpt);
     * viewer.satelliteLayer.add(satellite);
     *
     * ```
     */
    constructor(options: SatelliteOpt);
    /**
    * 获取类型
    */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 启用卫星属性
     * @param {string} componentName 属性名称
     * ```
     * 示例代码：
     * satellite.enableComponent(SatelliteComponents.Orbit);
     *
     * ```
     */
    enableComponent(componentName: string): void;
    /**
     * 禁用卫星属性
     * @param {string} componentName 属性名称
     * ```
     * 示例代码：
     * satellite.disableComponent(SatelliteComponents.Orbit);
     *
     * ```
     */
    disableComponent(componentName: string): void;
    /**
     * 创建卫星图标
     */
    private createSatImage;
    /**
     * 创建Label
     */
    private createLabel;
    /**
     * 创建轨道
     */
    private createOrbit;
    /**
     * 创建圆锥波
     */
    private createCone;
    /**
     * 创建棱锥波
     */
    private createSquareCone;
    /**
     * 创建地面扫描
     */
    private createGroundTrack;
    private calculatePosition;
    /**
     * 一个轨道周期的坐标，影响轨道线条,卫星位置
     */
    private positions;
    /**更新位置、姿态 */
    private currentTime;
    /**
     * 获取id
     * @readonly
     * @memberof Satellite
     *
     */
    readonly id: string;
    /**
     * 初始化
     * @param viewer 视图对象
     */
    initItem(viewer: Cesium.Viewer): any;
    /**
     * 监听更新函数
     * @param event
     * @param tle1
     * @param tle2
     * @param priod
     */
    private listenerFun;
    /**
     * 移除卫星
     */
    destroyItem(): void;
    /**
    * 设置卫星轨道颜色
    * @param   val 卫星轨道颜色
    * ```
    * 示例代码：
    * satellite.orbitColor='#ffffff';
    * ```
    *
    */
    orbitColor: string;
    /**
     * 设置卫星地面覆盖颜色
     * @param   val 卫星地面覆盖颜色
     * ```
     * 示例代码：
     * satellite.groundTrackColor='#ffffff'；
     * ```
     *
     */
    groundTrackColor: string;
    /**
     * 设置卫星罩颜色
     * @param   val 波束颜色
     * ```
     * 示例代码：
     * satellite.coverColor='#ffffff';
     * ```
     *
     */
    coverColor: string;
    /**
     * 获取卫星名称
     * @return {String}  卫星名称
     * ```
     * 示例代码：
     * let name=satellite.name;
     * ```
     *
     */
    readonly name: string;
    readonly position: GeoPoint;
}
  class SatelliteOpt {
    /**卫星两根数 */
    tle: string;
    /**轨道颜色 */
    orbitColor?: string;
    /**轨道追踪颜色 */
    orbitTrackColor?: string;
    /**扫描带颜色 */
    groundTrackColor?: string;
    /**卫星罩颜色 */
    coverColor?: string;
    type?: StatelliteEnum;
    constructor(tle: string, orbitColor?: string, orbitTrackColor?: string, groundTrackColor?: string, coverColor?: string, type?: StatelliteEnum);
}
/**
 * 卫星罩类型枚举
 */
  enum StatelliteEnum {
    /**圆锥罩 */
    'conic' = 1,
    /**棱锥罩 */
    'square' = 2
}

  class SatelliteComponents {
    /**
     * 卫星图标
     *
     */
    static readonly SatImage: string;
    /**
     * 卫星名称标注
     *
     */
    static readonly Label: string;
    /**
     * 卫星轨道
     *
     */
    static readonly Orbit: string;
    /**
     * 地面扫面线
     *
     */
    static readonly GroundTrack: string;
    /**
     * 卫星波束
     *
     */
    static readonly Sensor: string;
}

/**
 * @类别 需手动创建<br>
 * @描述 提供卫星管理相关功能<br>
 * @see  http://localhost:8088/examples/gallery/editor.html#satalliteVis
 */
  class SatelliteLayer extends Layer {
    viewer: Cesium.Viewer;
    private satelliteDataSource;
    private scanStripDataSource;
    private entities;
    private scanStrips;
    constructor(viewer: Cesium.Viewer);
    /**
     * 获取所有卫星名称
     * @return {Array}  卫星名称
     *
     */
    readonly satelliteNames: Array<any>;
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 根据卫星名称获取卫星
     * @param {string} 卫星名称
     */
    getSatellite(name: string): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Satellite;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    /**
     * 清除所有卫星
     */
    clear(): void;
}

  class TargetFlame {
    _target: any;
    _init: boolean;
    particleSystem: any;
    emitterModelMatrix: Cesium.Matrix4;
    translation: Cesium.Cartesian3;
    rotation: Cesium.Quaternion;
    hpr: Cesium.HeadingPitchRoll;
    trs: Cesium.TranslationRotationScale;
    _show: boolean;
    _earth: any;
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
    constructor(target: any);
    applyGravity(p: any, dt: any): void;
    init(): void;
    /**
     *飞机尾焰是否显示
     * @method showTrack
     *
     * ```
     * 示例代码
     * var show = targetItem.flame.show;
     * targetItem.flame.show = true ;
     * ```
     */
    show: boolean;
    updateFlame(): void;
    computeEmitterModelMatrix(): Cesium.Matrix4;
    dispose(): void;
}

  class TargetHistory {
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

  class TargetItem extends Item {
    _model: any;
    _label: any;
    _point: any;
    _line: any;
    _billbord: any;
    _canvasLine: any;
    _lineBillboard: any;
    _data: any;
    _position: Cesium.Cartesian3;
    _geoPoint: GeoPoint;
    _flag: TargetState;
    _pedding: boolean;
    _style: TargetStyle;
    _timePosition: TimePositions;
    _angle: number;
    _parentLayer: any;
    _init: boolean;
    _type: string;
    _smoothTrack: boolean;
    _inview: boolean;
    _timeArray: any[];
    _time: string;
    _speed: number;
    _show: boolean;
    _isSelected: boolean;
    _showLabel: boolean;
    _labelInit: boolean;
    _showModel: boolean;
    _modelInit: boolean;
    _backwardPath: any;
    _forewardPath: any;
    _flame: any;
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
    constructor(id: string, lon: number, lat: number, alt: number, smoothTrack?: boolean, showTrackLine?: boolean);
    readonly forewardPath: TargetPath;
    readonly backwardPath: TargetPath;
    readonly flame: TargetFlame;
    showLabel: boolean;
    showModel: boolean;
    /**
    * 目标的类型编码
    * @method styleCode
    *
    * ```
    * 示例代码
    * var itemTypecode = targetItem.styleCode ;
    * ```
    */
    styleCode: string;
    /**
    * 目标的类型编码
    * @method flag
    *
    * ```
    * 示例代码
    * var flag = targetItem.flag;
    * ```
    */
    flag: TargetState;
    /**
     * 目标是否显示
     * @method flag
     *
     * ```
     * 示例代码
     * var show = targetItem.show;
     * ```
     */
    show: boolean;
    /**
     * 是否需要平滑目标
     * @method smoothTrack
     *
     * ```
     * 示例代码
     * var flag = targetItem.smoothTrack = true;
     * ```
     */
    smoothTrack: boolean;
    /**
    * 目标的样式
    * @method style
    *
    * ```
    * 示例代码
    * var style = targetItem.style;
    * ```
    */
    style: TargetStyle;
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
    updatePosition(lon: number, lat: number, alt: number, delay?: number): void;
    setColor(pcolor: any): void;
    /**
     * 目标的名称
     * @method name
     *
     * ```
     * 示例代码
     * targetItem.name="RED";
     * ```
     */
    name: string;
    /**
    * 目标颜色,css颜色值
    * @method color
    *
    * ```
    * 示例代码
    * targetItem.color="RED";
    * targetItem.color="#FF0000";
    * ```
    */
    color: string;
    /**
     * 目标大小
     * @method iconSize
     *
     * ```
     * 示例代码
     * targetItem.iconSize=24;
     * ```
     */
    iconSize: number;
    /**
    * 目标大小
    * @method iconSize
    *
    * ```
    * 示例代码
    * targetItem.iconSize=24;
    * ```
    */
    fontbgColor: string;
    /**
     * 目标是否选中
     * @method isSelected
     *
     * ```
     * 示例代码
     * targetItem.isSelected = true;
     * ```
     */
    isSelected: boolean;
    /**
     * 目标角度
     * @method angle
     *
     * ```
     * 示例代码
     * targetItem.angle=105;
     * ```
     */
    angle: number;
    /**
     * 目标的时间
     * @method time
     *
     * ```
     * 示例代码
     * var time = targetItem.time ;
     * ```
     */
    time: string;
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
  class TrackLineOption {
    /**轨迹点个数 */
    points: Array<Cesium.Cartesian3>;
    /**轨迹线颜色 */
    color: Cesium.Color;
    /**轨迹线宽度 */
    width: number;
    /**轨迹点个数 */
    count: number;
    /**轨迹线是否可见 */
    show: boolean;
}

  class TargetLayer extends Layer {
    private earth;
    private renderOption;
    private rootcollection;
    private pointcollection;
    private labelcollection;
    private billbordcollection;
    private modelcollection;
    private trackLinecollection;
    private trackPointcollection;
    private targetCollection;
    private defaultStyle;
    private _show;
    private targetdataSource;
    private _gid;
    private interplatePosition;
    private showModel;
    private displayCondition;
    layerConfig: Map<any, any>;
    moveAmount: Cesium.Cartesian3;
    positionScratch: Cesium.Cartesian3;
    warningTargets: WarningTargets;
    private _showLabel;
    private _labelInit;
    constructor(viewer: Cesium.Viewer);
    private _getCurrentExtent;
    private _pointInView;
    private _initTarget;
    private _initialModelAndLabel;
    private _renderTarget1;
    private _testRender;
    private _renderTarget2;
    private _renderTarget;
    private _getPoint;
    private _getLable;
    private _getBillboard;
    private _getModel;
    private _addTarget;
    private addTrack;
    private _addORUpdateTarget;
    private getStyleByCode;
    private setTargetStyle;
    /**
     * 根据屏幕坐标，点选态势元素
     * @method pick
     * @param x 坐标x
     * @param y 坐标y
     */
    private pick;
    /**
     * 根据屏幕区域选择
     * @param x 坐标x
     * @param y 坐标y
     * @param width 宽度
     * @param height 高度
     */
    private selectByRectangel;
    /**
    * 保存图层样式配置信息
    * @method saveStyleConfig
    * @return {Object} 图层样式配置信息
    */
    saveStyleConfig(): Object;
    /**
    * 加载图层样式配置信息
    * @method loadStyleConfig
    * @param config 图层样式配置信息
    */
    loadStyleConfig(config: any): void;
    /**
     * 获取图层的id
     * @method id
     * @readonly
     * @return
     */
    readonly id: string;
    /**
     * 获取图层的名称
     * @method name
     * @readonly
     * @return
     */
    readonly name: string;
    /**
     * 判断目标是否存在
     * @method isExist
     * @param itemid 目标对象的ID
     * @return
     */
    isExist(itemid: string): boolean;
    /**
     * 目标图层的显隐
     * @method show
     *
     * ```
     * 示例代码
     * targetLayer.show=false;
     * ```
     */
    show: boolean;
    /**
    * 添加目标对象
    * @method add
    * @param  item 目标对象
    * @return
    *
    * ```
    * 示例代码
    * var tTarget = new GV.TargetItem("targetData.id",113.454,36.45,10000,0);
    *  targetLayer.add(tTarget);
    *
    * ```
    */
    add(item: TargetItem): TargetItem;
    /**
     * 通过id获取目标对象
     * @method getItemById
     * @param itemid 目标对象的id
     * @return
     *
     * ```
     * 示例代码
     *  targetLayer.getItemById("targetData.id");
     *
     * ```
     */
    getItemById(itemid: string): any;
    /**
    * 通过删除目标对象
    * @method remove
    * @param  itemid 目标对象的id
    * @return
    *
    * ```
    * 示例代码
    *  targetLayer.remove("targetData.id");
    *
    * ```
    */
    remove(itemid: string): TargetItem;
    /**
     * 清空目标对象
     * @method removeAll
     * @return {Boolean}
     *
     * ```
     * 示例代码
     *  targetLayer.removeAll();
     *
     * ```
     */
    removeAll(): boolean;
    /**
     * 销毁对象
     */
    private destroy;
}

  class TargetPath {
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
  class PathType {
    /**未飞行轨迹 */
    static backward: string;
    /**历史轨迹 */
    static foreward: string;
}

  enum TargetState {
    Retain = 0,
    Add = 1,
    Update = 2,
    Remove = 3,
    None = 4
}

/**
 * 态势样式
 */
  class TargetStyle {
    _color: string;
    _pointSize: number;
    _pointLineWidth: number;
    _pointLineColor: string;
    _pointDisplayCondition: Cesium.DistanceDisplayCondition;
    _fontSize: number;
    _fontColor: string;
    _font: string;
    _fontbgColor: string;
    _labelDisplayCondition: Cesium.DistanceDisplayCondition;
    _labelLineColor: string;
    _iconUrl: string;
    _iconSize: number;
    _iconDisplayCondition: Cesium.DistanceDisplayCondition;
    _modelUrl: string;
    _modelDisplayCondition: Cesium.DistanceDisplayCondition;
    _modelMaximumScale: number;
    _modelMinimumPixelSize: number;
    _labeloffsetx: number;
    _labeloffsety: number;
    _trackLineWidth: number;
    _trackLineColor: string;
    _selectedColor: string;
    _showBackground: boolean;
    constructor();
    /**
       * 默认样式
       */
    static DefaultStyle(): TargetStyle;
    /**
     * 颜色
     */
    color: string;
    /**
     * 是否显示背景颜色
     */
    showBackground: boolean;
    /**
     * 高亮颜色
     */
    selectedColor: string;
    /**
     * 点大小
     */
    pointSize: number;
    /**
     * 点描边宽度
     */
    pointLineWidth: number;
    /**
     * 点描边颜色
     */
    pointLineColor: string;
    /**
     * 点可视范围
     */
    pointDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 字体大小
     */
    fontSize: number;
    /**
     * 字体颜色
     */
    fontColor: string;
    /**
     * 字体
     */
    font: string;
    /**
    * 字体背景颜色
    */
    fontbgColor: string;
    /**
     * 标牌可视范围
     */
    labelDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 标牌连线线宽
     */
    labelLineColor: string;
    /**
     * 图标路径,使用白色图片
     */
    iconUrl: string;
    /**
     * 图标大小
     */
    iconSize: number;
    iconDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 模型路径
     */
    modelUrl: string;
    /**
     * 模型可见范围
     */
    modelDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 模型最大缩放比例
     */
    modelMaximumScale: number;
    /**
     * 模型最小显示像素
     */
    modelMinimumPixelSize: number;
    /**
     * 轨迹线宽度
     */
    trackLineWidth: number;
    /**
     * 轨迹线颜色
     */
    trackLineColor: string;
    /**
     * 标牌x轴偏移
     */
    labeloffsetx: number;
    /**
     * 标牌y轴偏移
     */
    labeloffsety: number;
    /**
       * 将样式保存为json
       * @method toJson
       *
       */
    static toJson(style: any): Object;
    /**
      * 加载样式
      * @method fromJson
      * @param style 样式对象
      *
      */
    static fromJson(style: any): TargetStyle;
}

  class TimePositions {
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
  class TimePosition {
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


  class WarningTargets {
    private earth;
    itemList: Map<any, any>;
    graphicLayer: any;
    constructor(viewer: GeoCanvas);
    /**
     * 目标告警个数
     * @method count
     */
    readonly count: number;
    /**
     * 添加目标告警
     * @method addItem
     * @param item 目标对象
     */
    addItem(item: TargetItem): void;
    /**
     * 移除目标告警
     * @method removeItem
     * @param item 目标对象
     */
    removeItem(item: TargetItem): void;
    /**
     * 更新目标告警
     * @method updatePosition
     * @param item 目标对象
     */
    updatePosition(item: TargetItem): void;
    /**
    * 清空目标告警
    * @method removeAll
    *
    */
    removeAll(): void;
}

  class TerrainItem extends Item {
    private _show;
    private _index;
    private _terrainProvider;
    constructor(terrainProvider: any, option: any);
    /**
     * 目标图层的显隐
     * @method show
     *
     * ```
     * 示例代码
     * targetLayer.show=false;
     * ```
     */
    show: boolean;
    readonly terrainProvider: any;
    /**
     * 目标图层的显隐
     * @method show
     *
     * ```
     * 示例代码
     * targetLayer.show=false;
     * ```
     */
    index: number;
    toJson(): object;
    /**
     * 解析json对象
     */
    parseJson(json: object): void;
    /**
     * 销毁对象
     */
    private destroy;
}

  class TerrainLayerCollection extends Layer {
    private earth;
    private _terrainLayers;
    private _show;
    private _baseProvider;
    constructor(viewer: Cesium.Viewer);
    _initBaseTerrain(provider: any): void;
    _getTerrainData(x: any, y: any, level: any, request: any): any;
    _reloadTerain(): void;
    /**
     * 目标图层的显隐
     * @method show
     *
     * ```
     * 示例代码
     * targetLayer.show=false;
     * ```
     */
    show: boolean;
    /**
    * 添加目标对象
    * @method add
    * @param  item 目标对象
    * @return
    *
    * ```
    * 示例代码
    * var tTarget = new GV.TargetItem("targetData.id",113.454,36.45,10000,0);
    *  targetLayer.add(tTarget);
    *
    * ```
    */
    add(item: any): TerrainItem;
    /**
    * 通过删除目标对象
    * @method remove
    * @param  itemid 目标对象的id
    * @return
    *
    * ```
    * 示例代码
    *  targetLayer.remove("targetData.id");
    *
    * ```
    */
    remove(itemid: string): any;
    /**
     * 清空目标对象
     * @method removeAll
     * @return {Boolean}
     *
     * ```
     * 示例代码
     *  targetLayer.removeAll();
     *
     * ```
     */
    removeAll(): void;
    /**
     * 销毁对象
     */
    private destroy;
}

/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量图标类
 * @see <a href='../../../examples/gallery/editor.html#iconTile'>矢量图标</a>
 */
  class IconTile extends Item {
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
  class IconTileOpt {
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

/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量线
 * @see <a href='../../../examples/gallery/editor.html#vectorDisplay'>矢量线</a>
 */
  class LineTile extends Item {
    protected _id: string;
    protected _name: any;
    protected _changed: any;
    protected _error: any;
    protected _isLoading: boolean;
    protected _loading: any;
    protected _entityCollection: any;
    protected _entityCluster: any;
    protected _scene: any;
    protected _provider: any;
    protected _loaded: boolean;
    protected _options: any;
    protected _tileReplacementQueue: any;
    protected _tileCacheSize: any;
    protected _minLevel: any;
    protected _renderTiles: any;
    protected _maxLevel: any;
    protected _pickEvent: any;
    protected _oldTile: any;
    protected _isBuilding: any;
    protected _pickShow: any;
    protected _pickType: any;
    protected _pickPrimitive: any;
    protected _viewer: GeoCanvas;
    private _oldInstance;
    /**
     * 初始化
     * @param options 参数类
     * @returns
     * ```
     * 示例：
     * let lineTileOpt = new GV.LineTileOpt(urlService, layer);
     * let lineTile = new GV.LineTile(lineTileOpt);
     * viewer.tileLayer.add(lineTile);
     * ```
     */
    constructor(options: LineTileOpt);
    /**
    * 获取类型
    */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    private coordinatesArrayToCartesianArray;
    private createLineString;
    private processLineString;
    private processMultiLineString;
    private createPolygon;
    private processPolygon;
    private processMultiPolygon;
    private processFeature;
    private processFeatureCollection;
    private defaultCrsFunction;
    /**
     * 初始化
     * @param {GeoCanvas} viewer 视图信息
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 删除
     */
    destroyItem(): void;
    /**
     * 添加点击回调
     * @param {Function} callback 回调
     */
    onPick: Function;
    /**
     * Gets an object that maps the name of a crs to a callback function which takes a GeoJSON coordinate
     * and transforms it into a WGS84 Earth-fixed Cartesian.  Older versions of GeoJSON which
     * supported the EPSG type can be added to this list as well, by specifying the complete EPSG name,
     * for example 'EPSG:4326'.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    private readonly crsNames;
    /**
     * Gets or sets a human-readable name for this instance.
     * @memberof VectorTileDataSource.prototype
     * @type {String}
     */
    name: any;
    private readonly clock;
    /**
     * Gets the collection of {@link Entity} instances.
     * @memberof VectorTileDataSource.prototype
     * @type {EntityCollection}
     */
    private readonly entities;
    /**
     * Gets a value indicating if the data source is currently loading data.
     * @memberof VectorTileDataSource.prototype
     * @type {Boolean}
     */
    private readonly isLoading;
    /**
     * Gets an event that will be raised when the underlying data changes.
     * @memberof GeoJsonDataSource.prototype
     * @type {Event}
     */
    private readonly changedEvent;
    /**
    * Gets an event that will be raised when pick rendered object.
    * @memberof VectorTileDataSource.prototype
    * @type {Event}
    */
    private readonly pickEvent;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof VectorTileDataSource.prototype
     * @type {Event}
     */
    private readonly errorEvent;
    /**
     * Gets an event that will be raised when the data source either starts or stops loading.
     * @memberof VectorTileDataSource.prototype
     * @type {Event}
     */
    private readonly loadingEvent;
    /**
     * Gets whether or not this data source should be displayed.
     * @memberof VectorTileDataSource.prototype
     * @type {Boolean}
     */
    private show;
    /**
     * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
     *
     * @memberof VectorTileDataSource.prototype
     * @type {EntityCluster}
     */
    private clustering;
    private pickAllTileProperty;
    private findTileFromCache;
    private findParentAndChildren;
    private handleParentAndChildren;
    private processTile;
    private getRenderTileKeys;
    private update;
    private destroy;
}
/**
 * 参数类
 */
  class LineTileOpt {
    /**服务地址 */
    url: string;
    /**图层信息 */
    layer: string;
    /**线颜色 */
    lineColor: string;
    /**线宽 */
    strokeWidth: Number;
    /**显示的最小层级 （范围：>=0 && <=22）*/
    minLevel: number;
    /**显示的最大层级 （范围：>=0 && <=22）*/
    maxLevel: number;
    /**是否选中 */
    isPick: boolean;
    /**选中颜色 */
    pickedColor: string;
    constructor(url: string, layer: string, lineColor?: string, strokeWidth?: number, minLevel?: number, maxLevel?: number, isPick?: boolean, pickedColor?: string);
}

/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 大规模倾斜摄影
 * @see <a href='../../../examples/gallery/editor.html#big3dTile'>大规模倾斜摄影</a>
 */
  class ObliqueTile extends Item {
    protected _name: any;
    protected _changed: Cesium.Event;
    protected _error: Cesium.Event;
    protected _loading: Cesium.Event;
    protected _isLoading: boolean;
    protected _entityCollection: Cesium.EntityCollection;
    protected _entityCluster: Cesium.EntityCluster;
    protected _scene: any;
    protected _loaded: boolean;
    protected _tileReplacementQueue: any;
    protected _tileCacheSize: any;
    protected _renderTiles: Cesium.AssociativeArray;
    protected _maxLevel: any;
    protected _showLevel: any;
    protected _deleteTileSetEvent: Cesium.Event;
    protected _pickEvent: Cesium.Event;
    protected _vectorLevel: any;
    protected _maximumScreenSpaceError: any;
    protected _url: any;
    protected _bArea: any;
    protected _minX: any;
    protected _minY: any;
    protected _maxX: any;
    protected _maxY: any;
    protected _viewer: GeoCanvas;
    protected _id: string;
    /**
     * 初始化
     * @param {string} url 服务地址
     * @param {number} vectorLevel 倾斜摄影根节点所在层级 （范围：>=0 && <=22）
     * @param {number} showLevel 层级显示基数 （范围：>=0 && <=22）
     * @returns
     * ```
     * 示例：
     *   let oblique = new GV.ObliqueTile(urlService, 13, 16);
     *   viewer.tileLayer.add(oblique);
     * ```
     */
    constructor(url: string, vectorLevel?: number, showLevel?: number);
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
     * @param {GeoCanvas} viewer 视图信息
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 移除
     */
    destroyItem(): void;
    /**
        * Gets an object that maps the name of a crs to a callback function which takes a GeoJSON coordinate
        * and transforms it into a WGS84 Earth-fixed Cartesian.  Older versions of GeoJSON which
        * supported the EPSG type can be added to this list as well, by specifying the complete EPSG name,
        * for example 'EPSG:4326'.
        * @memberof GeoJsonDataSource
        * @type {Object}
        */
    private readonly crsNames;
    /**
     * Gets an object that maps the href property of a crs link to a callback function
     * which takes the crs properties object and returns a Promise that resolves
     * to a function that takes a GeoJSON coordinate and transforms it into a WGS84 Earth-fixed Cartesian.
     * Items in this object take precedence over those defined in <code>crsLinkHrefs</code>, assuming
     * the link has a type specified.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    private readonly crsLinkHrefs;
    /**
     * Gets an object that maps the type property of a crs link to a callback function
     * which takes the crs properties object and returns a Promise that resolves
     * to a function that takes a GeoJSON coordinate and transforms it into a WGS84 Earth-fixed Cartesian.
     * Items in <code>crsLinkHrefs</code> take precedence over this object.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    private readonly crsLinkTypes;
    /**
     * Gets or sets a human-readable name for this instance.
     * @memberof ObliqueTileDataSource.prototype
     * @type {String}
     */
    name: any;
    private readonly clock;
    /**
     * Gets the collection of {@link Entity} instances.
     * @memberof ObliqueTileDataSource.prototype
     * @type {EntityCollection}
     */
    private readonly entities;
    /**
     * Gets a value indicating if the data source is currently loading data.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Boolean}
     */
    private readonly isLoading;
    /**
     * Gets an event that will be raised when the underlying data changes.
     * @memberof GeoJsonDataSource.prototype
     * @type {Event}
     */
    private readonly changedEvent;
    /**
    * Gets an event that will be raised when pick rendered object.
    * @memberof ObliqueTileDataSource.prototype
    * @type {Event}
    */
    private readonly pickEvent;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Event}
     */
    private readonly errorEvent;
    /**
     * Gets an event that will be raised when the data source either starts or stops loading.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Event}
     */
    private readonly loadingEvent;
    /**
     * Gets whether or not this data source should be displayed.
     * @memberof ObliqueTileDataSource.prototype
     * @type {Boolean}
     */
    private show;
    /**
     * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
     *
     * @memberof ObliqueTileDataSource.prototype
     * @type {EntityCluster}
     */
    private clustering;
    private findTileFromCache;
    private tilesetDeletechange;
    private getParentKey;
    private processTile;
    private getRenderTileKeys;
    private update;
    private destroy;
}

/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量地名类
 * @see <a href='../../../examples/gallery/editor.html#placename'>矢量地名</a>
 */
  class PlaceNameTile extends Item {
    protected _name: any;
    protected _changed: Cesium.Event;
    protected _error: Cesium.Event;
    protected _isLoading: boolean;
    protected _loading: Cesium.Event;
    protected _entityCluster: Cesium.EntityCluster;
    protected _entityCollection: Cesium.EntityCollection;
    protected _url: any;
    protected _scene: any;
    private _viewer;
    protected _tileReplacementQueue: any;
    protected _tileCacheSize: any;
    protected _renderTiles: Cesium.AssociativeArray;
    protected _clusterDirty: number;
    protected _table: Map<any, any>;
    protected _styleTable: any;
    protected _id: string;
    /**
     * 初始化
     * @param options 参数类
     * @returns
     * ```
     * 示例：
     *  let PlaceNameTileOpt = new GV.PlaceNameTileOpt(urlService);
     *  let placeNameTile = new GV.PlaceNameTile(PlaceNameTileOpt);
     *  viewer.tileLayer.add(placeNameTile);
     * ```
     */
    constructor(options: PlaceNameTileOpt);
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
     * 删除
     */
    destroyItem(): void;
    private createLevelMap;
    private createDefaultStyles;
    /**
     * Gets or sets a human-readable name for this instance.
     * @memberof PlaceTileDataSource.prototype
     * @type {String}
     */
    private readonly clock;
    /**
     * Gets the collection of {@link Entity} instances.
     * @memberof PlaceTileDataSource.prototype
     * @type {EntityCollection}
     */
    private readonly entities;
    /**
     * Gets a value indicating if the data source is currently loading data.
     * @memberof PlaceTileDataSource.prototype
     * @type {Boolean}
     */
    private readonly isLoading;
    /**
     * Gets an event that will be raised when the underlying data changes.
     * @memberof PlaceTileDataSource.prototype
     * @type {Event}
     */
    private readonly changedEvent;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof PlaceTileDataSource.prototype
     * @type {Event}
     */
    private readonly errorEvent;
    /**
     * Gets an event that will be raised when the data source either starts or stops loading.
     * @memberof PlaceTileDataSource.prototype
     * @type {Event}
     */
    private readonly loadingEvent;
    /**
     * Gets whether or not this data source should be displayed.
     * @memberof PlaceTileDataSource.prototype
     * @type {Boolean}
     */
    private show;
    /**
     * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
     *
     * @memberof PlaceTileDataSource.prototype
     * @type {EntityCluster}
     */
    private clustering;
    private createTileKey;
    private getSubTileKeys;
    private getTiles;
    private calculateTiles;
    private getGeoCode;
    private processTile;
    private update;
    private getX;
    private getY;
    private cluster;
    private destroy;
}
/**
 * 文字矢量参数类
 */
  class PlaceNameTileOpt {
    /**服务地址 */
    url: string;
    /**级别映射 */
    table: Map<number, Array<number>>;
    /**样式 */
    styles: Map<number, Array<PlaceFontStyle>>;
    constructor(url: string, table?: Map<number, Array<number>>, styles?: Map<number, Array<PlaceFontStyle>>);
}
/**
 * 文字样式
 */
  class PlaceFontStyle {
    /**字体、大小 */
    font: string;
    /**字体颜色 */
    fillColor: string;
    /**外边框颜色 */
    outlineColor: string;
    /**外边框宽度 */
    outlineWidth: number;
    constructor(font?: string, fillColor?: string, outlineColor?: string, outlineWidth?: number);
}

/**
 * @类别 需手动创建，然后添加到矢量图层类中<br>
 * @描述 矢量面类
 * @see <a href='../../../examples/gallery/editor.html#modelTile'>矢量白模</a>
 */
  class PolygonTile extends Item {
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
  class PolygonTileOpt {
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

  class TileLayer extends Layer {
    _viewer: Cesium.Viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Item;
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
}

  class WMTSVectorProvider {
    protected _url: any;
    protected _layer: any;
    protected _format: any;
    protected _tilematrixset: any;
    protected _style: any;
    protected _version: any;
    protected _minLevel: any;
    protected _maxLevel: any;
    constructor(options: any);
    readonly minLevel: any;
    readonly maxLevel: any;
    requestVectorTile(level: any, x: any, y: any, success: any, failure: any): any;
}

/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * （抽象类）插件基类 {@link Tool} 与 {@link Widget} 继承自该类
 */
 class PluginBase {
    _active: boolean;
    _type: any;
    _name: any;
    _path: any;
    /**
     * @param {Object} optins 插件初始配置对象
     * @param {PluginManager} pluginManager 插件对应的插件管理对象
     */
    constructor(optins: any, pluginManager: any);
    /**
     * 获取状态
     * @type {boolean}
     * @readonly
     */
    readonly active: boolean;
    /**
     * 工具还是挂件
     * @type {stirng}
     * @readonly
     */
    readonly type: any;
    /**
     * 获得插件名(注册时的名字)
     * @type {string}
     * @readonly
     */
    readonly name: any;
    /**
     * 获取插件包的原始路径
     */
    readonly path: any;
    /**
     * 开启插件时调用
     */
    init(): void;
    /**
     * 关闭插件时调用
     */
    close(): void;
    /**
     * 获取数据
     */
    getPluginData(): void;
    /**
     * 设置数据
     */
    setPluginData(data: any): void;
    /**
     * 获取相对路径
     * @param {string} file
     */
    formatURL(file: any): any;
    _init(): void;
    _close(): void;
}

/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * 插件管理类
 * 对继承自{@link Tool} 与 {@link Widget}的类进行管理
 */
 class PluginManager extends Event {
    _plugins: Map<any, any>;
    _currentTool: any;
    _pluginInitOptins: any;
    constructor(pluginInitOptins: any);
    /**
     * 添加插件到插件管理对象
     * @param {string} name 要添加的插件名称
     * @return {plugin} 返回插件对象
     */
    addPlugin(name: any): any;
    /**
     * 删除插件到插件管理对象
     * @param {string | Plugin} plugin 要删除的插件的名称或对象
     */
    removePlugin(plugin: any): void;
    /**
     * 切换工具
     * @param {string | Tool} tool 要切换的插件的名称或对象
     */
    setCurrentTool(tool: any): void;
    /**
     * 彻底关闭清除工具
     */
    closeTool(tool: any): void;
    /**
     * 清空全部工具状态
     */
    closeAllTool(): void;
    /**
     * 开启插件
     * @param {widget | string} 挂件名称或挂件对象
     */
    usingWidget(widget: any): any;
    /**
     * 开启插件
     * @param {widget | string} 挂件名称或挂件对象
     */
    unusingWidget(widget: any): any;
    /**
     * 获取所有插件
     * @return {[Plugin]}
     */
    getAllPlugin(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getAllTools(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getAllWidgets(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getAllUsingWidgets(): any[];
    /**
     * 获取所有工具
     * @return {[Tool]}
     */
    getCurrentTool(): any;
}

/**
 * 插件工厂提供插件注册与销毁
 */
 class PluginsFactory {
    _pluginMap: Map<any, any>;
    constructor();
    /**
     * 根据插件配置文件路径注册插件
     * @param {options|string} pluginOptions 插件配置
     * @param {string} pluginOptions.name 插件注册名
     * @param {string} pluginOptions.path 插件路径
     * @param {string} pluginOptions.js 插件类名
     */
    registerPlugin(pluginOptions: any): any;
    /**
     * 根据配置文件注册插件
     */
    _registerPlugin(options: any): any;
    /**
     * 同步动态添加script
     * @param {String} path 插件路径
     */
    _appendScript(path: any): boolean;
    /**
     * 根据配置获取插件原始路径
     * @param {string|object} pluginOptions
     */
    _getPluginPath(pluginOptions: any): any;
    /**
     * 注销插件
     * @param {String} name 主要插件名称
     */
    destroyPlugin(name: any): void;
    /**
     * 创建插件对象（插件管理对象内部使用）
     * @param {String} name 插件名称
     * @param {Object} options 插件初始化参数
     * @param {pluginManager} PluginManager 要创建的插件的插件管理对象
     * @return {PluginBase} 插件对象
     */
    createPlugin(name: any, options: any, pluginManager: any): any;
}
 let pluginsFactory: PluginsFactory;

/**
 * 作者：梁帆
 * 日期：2019-04-09
 */
/**
 * 插件主题
 */
 class PluginThemeManager {
    _themeStyle: {};
    constructor();
    /**
     * 设置所有样式
     */
    themeStyle: any;
    createStyle(styleParam: any, doc: any): void;
    createAllStyle(styleParam: any): void;
    /**
     * 插入新样式
     * @param {document} doc
     * @param {object} styleParam
     */
    generateDocStyle(doc: any): void;
    _generateDocStyle(doc: any, styleParam: any): void;
    _getThemeStyle(styleParam: any): {};
    _getStyleCss(tempStyle: any): string;
    toCssStyle(str: any): any;
    colorRgb(col: any): string;
}
 let pluginThemeManager: PluginThemeManager;

/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * 插件界面工厂提供提供插件界面加载卸载功能
 */
  class PluginView {
    _container: any;
    _url: any;
    _viewStyle: any;
    state: string;
    _instance: HTMLIFrameElement;
    containerDiv: HTMLDivElement;
    /**
      * 创建iframe插件视图
      * @param {object} options
      * @param {Element} options.container 插件界面的父界面
      * @param {String} options.url 插件的html路径
      * @param {object}  [options.viewStyle=undefined] 插件区域配置当使用默认配置时覆盖整个父界面
      * @param {options} [options.viewStyle.width] 插件的宽度
      * @param {options} [options.viewStyle.height] 插件高度
      * @param {options} [options.viewStyle.left] 插件左边距
      * @param {options} [options.viewStyle.top] 插件上边距
      * @param {options} [options.viewStyle.right] 插件右边距
      * @param {options} [options.viewStyle.bottom] 插件下边距
      * @return {PluginView}
      */
    constructor(options: any);
    /**
     * 获取界面实例
     * @return {element}
     */
    readonly instance: HTMLIFrameElement;
    /**
     * 显示页面
     */
    show(): void;
    /**
     * 隐藏页面
     */
    hide(): void;
    /**
     * 关闭页面
     */
    close(): void;
    /**
     * 设置相机监听事件div
     * @param {viewer} viewer 三维球对象
     * @param {element} div 要替换的标签对象
     */
    setMouseBaseElement(viewer: any, div: any): void;
    /**
     * 恢复相机监听div
     * @param {Viewer} viewer
     */
    resetMouseBaseElement(viewer: any): void;
    _createIframe(url: any): HTMLIFrameElement;
    _createDiv(options: any): HTMLDivElement;
    _setStylePro(element: any, options: any): void;
}

/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * (工具类基类)需要用户继承该类实现自己的类。
 * 由{@link PluginManager}统一管理.
 * 继承工具的类之间是相互互斥的（一次只能开启一个工具）
 * @augments PluginBase
 */
  class Tool extends PluginBase {
    _isHide: boolean;
    /**
     * @param {PluginManager} prents
     * @param {Object} optins
     */
    constructor(prents: any, optins: any);
    /**
     * 界面关闭且数据可用时为true
     * @type {boolean}
     * @readonly
     */
    readonly isHide: boolean;
    /**
     * 工具开启时为非隐藏状态
     */
    _init(): void;
    /**
     * 隐藏界面和清除交互逻辑
     */
    _hide(): void;
    hide(): any;
    /**
     * 完全关闭工具
     */
    _close(): void;
}

/**
 * 作者：董波
 * 部门：数字地球研究院
 * 邮箱：dongb@geovis.com
 * 日期：2019-3-18
 */
/**
 * (挂件类基类)需要用户继承该类实现自己的类。
 * 由{@link PluginManager}统一管理.
 * 继承挂件的类之间是不互斥的（多了个挂件可以同时开启）
 * @augments PluginBase
 */
  class Widget extends PluginBase {
    /**
     * @param {PluginManager} prents
     * @param {Object} optins
     */
    constructor(prents: any, optins: any);
}

/**
 * 经纬网
 */
  class Graticule {
    private layer;
    private viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 显示
     */
    show(): void;
    /**
     * 隐藏
     */
    remove(): void;
}

/**
 * 1991年制订了新的《国家基本比例尺地形图分幅和编号》（GB/T 13989-92 ）的国家标准
 */
  class MapSheet {
    private viewer;
    private _labels;
    private _polylines;
    _visible: boolean;
    constructor(viewer: Cesium.Viewer);
    visible: boolean;
    /**
     * 计算瓦片数据
     *
     */
    getTiles(): void;
    /**
     * 计算点在对应的编码
     * 计算1:100万图幅的行号和列号
     */
    getCodeByPoint(lon: any, lat: any): string;
    /**
     * 图幅网格数据
     */
    getData(): {
        label: any[];
        polyline: any[];
    };
    /**
     * 文字图层
     */
    /**
     * 显示
     */
    show(): void;
    /**
     * 隐藏
     */
    remove(): void;
    /**
     * 根据图幅编码获取图幅范围
     */
    getRectangleBycode(code: string): {
        minLon: number;
        minLat: number;
        maxLon: number;
        maxLat: number;
    };
    getcodeByPosition(position: GeoPoint): string;
}

/**
 * 场景配置类枚举
 */
  enum WeatherEnmu {
    /**
     * 关闭天气
     */
    None = 0,
    /**
     * 开启雨
     */
    Rain = 1,
    /**
     * 开启雪
     */
    Snow = 2
}
/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类 <br>
 * @描述 场景配置类：管理 雨，雪，经纬网 <br>
 * @see <a href='../../../examples/gallery/editor.html#jingWeiWang'>经纬网</a>
 * @see <a href='../../../examples/gallery/editor.html#weather_snow_rain'>雨雪</a>
 *  ```
 *  示例代码：
 *  var viewer = new GV.GeoCanvas('GEOVISContainer', {
 *       sceneOptions:{
 *           graticule:true,
 *           weather:GV.WeatherEnmu.Rain
 *       }
 *   });
 * ```
 */
  class SceneOptions {
    /**
     * 地理画布
     */
    private viewer;
    /**
     * 天气
     */
    private sky;
    /**
     * 经纬网
     */
    private jingwei;
    private _graticule;
    /**
     * 太阳产生阴影
     */
    private _shadowFlag;
    /**
     * 图幅编码
     */
    private _mapSheet;
    private _tufu;
    /**
    * 设置或获取控制经纬网字段
    * ```
    * 示例代码：
    * viewer.sceneOptions.graticule = true
    * ```
    */
    graticule: Boolean;
    private _weather;
    shadowFlag: boolean;
    /**
     * 设置或获取控制天气字段
     * ```
     * 示例代码：
     * viewer.sceneOptions.weather = WeatherEnmu.Rain
     * ```
     */
    weather: WeatherEnmu;
    /**
     * 国际图幅编码
     */
    readonly mapSheet: MapSheet;
    /**
    * 获取地图投影
    * ```
    * 示例代码：
    * let projection = viewer.sceneOptions.mapProjection;
    * ```
    */
    readonly mapProjection: string;
    /**
     * 创建场景配置类
     * @param viewer 地理画布
     * @param options 场景配置对象
     */
    constructor(viewer: GeoCanvas, options: Object);
}

/**
 * 天气-雨雪
 * （创建GeoCanvas时自动在SceneOptions类进行实例化，
 * 具体使用方法参见SceneOptions类说明）
 */
  class Weather {
    private viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 雨雪显示高度
     */
    displayHeight: number;
    private calculateCamera;
    private _rain;
    private _snow;
    /**
     * 显示雨
     */
    showRain(): void;
    /**
     * 关闭雨
     */
    closeRain(): void;
    private getRainShader;
    /**
     * 显示雪
     */
    showSnow(): void;
    /**
     * 关闭雪
     */
    closeSnow(): void;
    private getSnowShader;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 通用计算类</br>
 * @see <a href='../../../examples/gallery/editor.html#spaceDis'>距离面积计算</a>
 * @see <a href='../../../examples/gallery/editor.html#paowu'>曲线点集计算</a>
 *
 */
  class Calculate {
    static calculateMatrix(parentGesture: any, childGesture: any): {
        position: GeoPoint;
        heading: number;
        pitch: number;
        roll: number;
    };
    static matrixToHdr(uMMatrix: Cesium.Matrix4): {
        position: GeoPoint;
        heading: number;
        pitch: number;
        roll: number;
    };
    private static _surfaceDistance;
    private static _getAngle;
    private static _getBearing;
    /**
     * 获取点集的空间面积
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.spaceArea(geoPoints);
     * ```
     */
    static spaceArea(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取点集的贴地面积
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.groundArea(geoPoints);
     * ```
     */
    static groundArea(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取点集的贴地距离
     * @param geoPoints 点集信息
     * @param viewer
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.groundDistance(geoPoints);
     * ```
     */
    static groundDistance(geoPoints: Array<GeoPoint>, viewer: Cesium.Viewer): number;
    /**
     * 获取点集的空间距离
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.spaceDistance(geoPoints);
     * ```
     */
    static spaceDistance(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取二次贝塞尔曲线点集坐标
     * @param geoPoints 控制点集信息
     * @param step  点集数量 默认值：100 范围：>=2 && <= 100
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.getBezier(geoPoints);
     * ```
     */
    static getBezier(geoPoints: Array<GeoPoint>, step?: number): Array<GeoPoint>;
    /**
     * 获取抛物线点集坐标
     * @param fromPoint 起始点
     * @param toPoint   终止点
     * @param factor    曲率（抛物线高度）范围：>=1000 && <= 10000000
     * @param step      点集数量 默认值：100 范围：>=2 && <= 100
     * ```
     *  示例代码：
     *  let result = GV.Calculate.getParabola({lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},50000);
     * ```
     */
    static getParabola(fromPoint: GeoPoint, toPoint: GeoPoint, factor: number, step?: number): any[];
    /**
    * 判断经纬度点是否在多边形区域内
    * @param point 被判断点
    * @param polygon 多边形区域位置数组
    * @returns
    * @see  <a href='../../../examples/gallery/editor.html#simlarScene'>模拟场景</a>
    */
    static pointInPolygon(point: GeoPoint, polygon: Array<GeoPoint>): boolean;
    /**
     * 判断经纬度点是否在圆形区域内
     * @param point 被判断点
     * @param centerPoint 圆心位置点
     * @param radius 圆半径，单位：米
     * @returns
     * @see  <a href='../../../examples/gallery/editor.html#simlarScene'>模拟场景</a>
     */
    static pointInCircle(point: GeoPoint, centerPoint: GeoPoint, radius: number): boolean;
    /**
     * 获取椭圆点集
     * @param center 中心坐标
     * @param xSemiAxis 长轴 单位：米
     * @param ySemiAxis 短轴 单位：米
     * @param steps 点集数量
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getEllipsePositions(center: GeoPoint, xSemiAxis: number, ySemiAxis: number, steps?: number): GeoPoint[];
    /**
     * 获取圆形点集
     * @param center 圆心坐标
     * @param radius 圆半径 单位：米
     * @param steps 点集数量
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getCirclePositions(center: GeoPoint, radius: number, steps?: number): GeoPoint[];
    /**
     * 获取扇形点集
     * @param center 圆心坐标
     * @param radius 圆半径 单位：米
     * @param startAngle 起始角度
     * @param endAngle 终止角度
     * @param steps 点集数量
     * @returns
     */
    static getSectorPositions(center: GeoPoint, radius: number, startAngle?: number, endAngle?: number): GeoPoint[];
    /**
     * 获取两个多边形相交区域
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getIntersect(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
     * 获取两个多边形相并区域
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getUnion(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
     * 获取第一个多边形和第二个多边形作差的点集
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getDiffer(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
   * 计算两个点的方位角
   * @param point1 位置点
   * @param point2 位置点
   * @return 返回方位角
   */
    static getAngle(point1: GeoPoint, point2: GeoPoint): number;
    /**
     * 水平面剔除判断
     * @param point 位置点
     * @param viewer
     */
    static pointInEarthSide(point: GeoPoint, viewer: GeoCanvas): boolean;
    /**
* 计算面积
*/
    static test(pos: any): any[];
    static rotateAngle(vf: any, vt: any): number;
    static getRes(pos: any): void;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 通用计算类</br>
 * @see <a href='../../../examples/gallery/editor.html#spaceDis'>距离面积计算</a>
 * @see <a href='../../../examples/gallery/editor.html#paowu'>曲线点集计算</a>
 *
 */
  class Calculate {
    static calculateMatrix(parentGesture: any, childGesture: any): {
        position: GeoPoint;
        heading: number;
        pitch: number;
        roll: number;
    };
    static matrixToHdr(uMMatrix: Cesium.Matrix4): {
        position: GeoPoint;
        heading: number;
        pitch: number;
        roll: number;
    };
    private static _surfaceDistance;
    private static _getAngle;
    private static _getBearing;
    /**
     * 获取点集的空间面积
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.spaceArea(geoPoints);
     * ```
     */
    static spaceArea(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取点集的贴地面积
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.groundArea(geoPoints);
     * ```
     */
    static groundArea(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取点集的贴地距离
     * @param geoPoints 点集信息
     * @param viewer
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.groundDistance(geoPoints);
     * ```
     */
    static groundDistance(geoPoints: Array<GeoPoint>, viewer: Cesium.Viewer): number;
    /**
     * 获取点集的空间距离
     * @param geoPoints 点集信息
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.spaceDistance(geoPoints);
     * ```
     */
    static spaceDistance(geoPoints: Array<GeoPoint>): number;
    /**
     * 获取二次贝塞尔曲线点集坐标
     * @param geoPoints 控制点集信息
     * @param step  点集数量 默认值：100 范围：>=2 && <= 100
     * @return
     * ```
     *  示例代码：
     *  let geoPoints = [{lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},{lon:85,lat:30,alt:50000}]
     *  let result = GV.Calculate.getBezier(geoPoints);
     * ```
     */
    static getBezier(geoPoints: Array<GeoPoint>, step?: number): Array<GeoPoint>;
    /**
     * 获取抛物线点集坐标
     * @param fromPoint 起始点
     * @param toPoint   终止点
     * @param factor    曲率（抛物线高度）范围：>=1000 && <= 10000000
     * @param step      点集数量 默认值：100 范围：>=2 && <= 100
     * ```
     *  示例代码：
     *  let result = GV.Calculate.getParabola({lon:80,lat:50,alt:50000},{lon:90,lat:45,alt:50000},50000);
     * ```
     */
    static getParabola(fromPoint: GeoPoint, toPoint: GeoPoint, factor: number, step?: number): any[];
    /**
    * 判断经纬度点是否在多边形区域内
    * @param point 被判断点
    * @param polygon 多边形区域位置数组
    * @returns
    * @see  <a href='../../../examples/gallery/editor.html#simlarScene'>模拟场景</a>
    */
    static pointInPolygon(point: GeoPoint, polygon: Array<GeoPoint>): boolean;
    /**
     * 判断经纬度点是否在圆形区域内
     * @param point 被判断点
     * @param centerPoint 圆心位置点
     * @param radius 圆半径，单位：米
     * @returns
     * @see  <a href='../../../examples/gallery/editor.html#simlarScene'>模拟场景</a>
     */
    static pointInCircle(point: GeoPoint, centerPoint: GeoPoint, radius: number): boolean;
    /**
     * 获取椭圆点集
     * @param center 中心坐标
     * @param xSemiAxis 长轴 单位：米
     * @param ySemiAxis 短轴 单位：米
     * @param steps 点集数量
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getEllipsePositions(center: GeoPoint, xSemiAxis: number, ySemiAxis: number, steps?: number): GeoPoint[];
    /**
     * 获取圆形点集
     * @param center 圆心坐标
     * @param radius 圆半径 单位：米
     * @param steps 点集数量
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getCirclePositions(center: GeoPoint, radius: number, steps?: number): GeoPoint[];
    /**
     * 获取扇形点集
     * @param center 圆心坐标
     * @param radius 圆半径 单位：米
     * @param startAngle 起始角度
     * @param endAngle 终止角度
     * @param steps 点集数量
     * @returns
     */
    static getSectorPositions(center: GeoPoint, radius: number, startAngle?: number, endAngle?: number): GeoPoint[];
    /**
     * 获取两个多边形相交区域
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getIntersect(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
     * 获取两个多边形相并区域
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getUnion(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
     * 获取第一个多边形和第二个多边形作差的点集
     * @param polygon1 多边形点集
     * @param polygon2 多边形点集
     * @returns
     * @see <a href='../../../examples/gallery/editor.html#polygonDiff'>多边形交并差</a>
     */
    static getDiffer(polygon1: Array<GeoPoint>, polygon2: Array<GeoPoint>): Array<GeoPoint>;
    /**
   * 计算两个点的方位角
   * @param point1 位置点
   * @param point2 位置点
   * @return 返回方位角
   */
    static getAngle(point1: GeoPoint, point2: GeoPoint): number;
    /**
     * 水平面剔除判断
     * @param point 位置点
     * @param viewer
     */
    static pointInEarthSide(point: GeoPoint, viewer: GeoCanvas): boolean;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 Canvas转换成各种图片工具库</br>
 * @see <a href='../../../examples/gallery/editor.html#screenShot'>场景转换图片</a>
 */
  class Canvas2Image {
    private static support;
    private static downloadMime;
    private static scaleCanvas;
    private static getDataURL;
    private static saveFile;
    private static genImage;
    private static fixType;
    private static encodeData;
    private static getImageData;
    private static makeURI;
    /**
     * create bitmap image
     * 按照规则生成图片响应头和响应体
     */
    private static genBitmapImage;
    /**
     * saveAsImage
     * @param canvasElement
     * @param {String} image type
     * @param {Number} [optional] png width
     * @param {Number} [optional] png height
     */
    private static saveAsImage;
    private static convertToImage;
    /**
     * 保存为png格式
     * @param canvas dom元素
     * @param {number} width 保存的宽度
     * @param {number} height 保存的高度
     * ```
     * 示例代码：
     *  const ratio = viewer.canvas.width / viewer.canvas.height;
     *  const img = GV.Canvas2Image.saveAsPNG(viewer.canvas, 400, 400 / ratio)
     * ```
     */
    static saveAsPNG(canvas: Element, width: number, height: number): void;
    /**
     * 保存为jpeg格式
     * @param canvas dom元素
     * @param {number} width 保存的宽度
     * @param {number} height 保存的高度
     * ```
     * 示例代码：
     *  const ratio = viewer.canvas.width / viewer.canvas.height;
     *  const img = GV.Canvas2Image.saveAsJPEG(viewer.canvas, 400, 400 / ratio)
     * ```
     */
    static saveAsJPEG(canvas: Element, width: number, height: number): void;
    /**
    * 保存为gif格式
    * @param canvas dom元素
    * @param {number} width 保存的宽度
    * @param {number} height 保存的高度
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.saveAsGIF(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static saveAsGIF(canvas: Element, width: number, height: number): void;
    /**
    * 保存为bmp格式
    * @param canvas dom元素
    * @param {number} width 保存的宽度
    * @param {number} height 保存的高度
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.saveAsBMP(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static saveAsBMP(canvas: Element, width: number, height: number): void;
    /**
    * 转换成png格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToPNG(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToPNG(canvas: Element, width: number, height: number): string;
    /**
    * 转换成jpeg格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToJPEG(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToJPEG(canvas: Element, width: number, height: number): string;
    /**
    * 转换成gif格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToGIF(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToGIF(canvas: Element, width: number, height: number): string;
    /**
    * 转换成bmp格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToBMP(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToBMP(canvas: Element, width: number, height: number): string;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 通用检测类</br>
 */
  class Check {
    /**
     * 检查参数是否为布尔值
     * @param value 被检测对象
     * @return 返回值true or false
     * ```
     * 示例代码：
     * let res = GV.Check.isBoolean(false);
     * ```
     */
    static isBoolean(value: any): boolean;
    /**
     * 检查参数是否为json对象
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isJson(value: any): boolean;
    /**
     * 判定是否为字符串
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isString(value: any): boolean;
    /**
     * 判定是否为数值
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isNumber(value: any): boolean;
    /**
     * 判定参数是否为数组
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isArray(value: any): boolean;
    /**
     * 判断字符串是否为十六进制颜色。
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isCssColor(value: any): boolean;
}

/**
 * @类别 需要用户创建的类
 * @描述 GeoPoint经纬度坐标对象</br>
 * 提供了经纬度坐标系和各种坐标系之间的相互转换
 */
  class GeoPoint {
    /**
     * 经度
     */
    lon: number;
    /**
     * 维度
     */
    lat: number;
    /**
     * 高度
     */
    alt?: number;
    constructor(lon: number, lat: number, alt?: number);
    toJson(): number[];
    private static _transformlat;
    private static _transformlng;
    /**
     * Cartesian3坐标转GeoPoint（经纬度）坐标
     * @param Cart3Point
     * @return
     * ```
     * 示例代码：
     * let geoPoint =  GV.GeoPoint.fromCartesian3(new Cesium.Cartesian3(8065, 3650, 150000))
     * ```
     */
    static fromCartesian3(Cart3Point: Cesium.Cartesian3): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转Cartesian3坐标
     * @param geoPoint
     * @return
     * ```
     * 示例代码：
     * let cart3 = GV.GeoPoint.toCartesian3({lon:80,lat:40,alt:50000})
     * ```
     */
    static toCartesian3(geoPoint: GeoPoint): Cesium.Cartesian3;
    /**
     * 墨卡托坐标转GeoPoint（经纬度）坐标
     * @param x
     * @param y
     * @return
     * ```
     * 示例代码：
     * let geoPoint = GV.GeoPoint.fromMercator(8905559.263461886, 4865942.279503175)
     * ```
     */
    static fromMercator(x: number, y: number): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转墨卡托坐标
     * @param geoPoint
     * @return
     * ```
     * 示例代码：
     * let mct = GV.GeoPoint.toMercator({lon:80,lat:40,alt:50000})
     * ```
     */
    static toMercator(geoPoint: GeoPoint): object;
    /**
     * 屏幕坐标转GeoPoint（经纬度）坐标（注：屏幕坐标范围必须在地球显示范围内）
     * @param x 屏幕x轴坐标
     * @param y 屏幕y轴坐标
     * @param viewer
     * @return
     * ```
     * 示例代码：
     * let mct = GV.GeoPoint.fromScreen(50,40,viewer)
     * ```
     */
    static fromScreen(x: number, y: number, viewer: Cesium.Viewer): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转屏幕坐标
     * @param geoPoint
     * @param viewer
     * @return
     * ```
     * 示例代码：
     * let cart2 = GV.GeoPoint.toScreen({lon:8,lat:40,alt:5000},viewer)
     * ```
     */
    static toScreen(geoPoint: GeoPoint, viewer: Cesium.Viewer): Cesium.Cartesian2;
    /**
     * 火星坐标转GeoPoint（经纬度）坐标
     * @param gcjPoint {x:y:}
     * @return
     * ```
     * 示例代码：
     * let geoPoint =  GV.GeoPoint.fromGCJ02({x:8.013949658676198, y:39.99879386130122})
     * ```
     */
    static fromGCJ02(gcjPoint: any): GeoPoint;
    /**
     * GeoPoint（经纬度）坐标转火星坐标
     * @param geoPoint
     * @return
     * ```
     * 示例代码：
     * let gcj = GV.GeoPoint.toGCJ02({lon:8,lat:40,alt:5000});
     * ```
     */
    static toGCJ02(geoPoint: GeoPoint): object;
    /**
     * geoPoint转换成数组
     * @param geoPoint 点信息
     * @return
     * ```
     * 示例代码：
     * let res = GV.GeoPoint.pack({lon:8,lat:40,alt:5000})
     * ```
     */
    static pack(geoPoint: GeoPoint): Array<number>;
    /**
     * 数组转换成geoPoint
     * @param arr 数组信息
     * @return
     * ```
     * 示例代码：
     * let res =  GV.GeoPoint.unpack([50,45,1555])
     * ```
     */
    static unpack(arr: any): GeoPoint;
    /**
     * 批量geoPoint转换成数组
     * @param geoPoints 点数组信息
     * @return
     * ```
     * 示例代码：
     * let res = GV.GeoPoint.packArray([{lon:8,lat:40,alt:5000},{lon:45,lat:30,alt:55}])
     * ```
     */
    static packArray(geoPoints: Array<GeoPoint>): Array<Array<number>>;
    /**
     * 批量数组转换成geoPoint
     * @param arr 数组信息
     * @return
     * ```
     * 示例代码：
     * let res =  GV.GeoPoint.unpackArray([[50,45,1555],[22,54,4545]])
     * ```
     */
    static unpackArray(arr: any): Array<GeoPoint>;
    /**
     * 判断经纬坐标点是否相等
     * @param point1
     * @param point2
     */
    static isEqual(point1: GeoPoint, point2: GeoPoint): boolean;
    /**
     * 判断经纬坐标数组是否相等
     * @param arr1
     * @param arr2
     */
    static isEqualArr(arr1: Array<GeoPoint>, arr2: Array<GeoPoint>): boolean;
    /**
     * 深度复制
     */
    static clone(point: GeoPoint, res?: GeoPoint): GeoPoint;
    /**
     * 度转度分秒
     * @param value
     */
    private static _formatDegree;
    /**
     * 度分秒转度数
     * @param value
     */
    private static _degreeConvertBack;
    /**
     * 度转换度分秒
     * @param point
     */
    static formatDegree(point: GeoPoint): FormatGeoPoint;
    static degreeConvertBack(value: FormatGeoPoint): GeoPoint;
}
/**
 * 度分秒形势表示坐标
 */
  class FormatGeoPoint {
    /**
     * 经度
     */
    lon: {
        direction: string /**方位 west 或 east*/;
        degrees: number /**度 */;
        minutes: number /**分 */;
        seconds: number; /**秒 */
    };
    /**
     * 纬度
     */
    lat: {
        direction: string /**方位 south 或 north*/;
        degrees: number /**度 */;
        minutes: number /**分 */;
        seconds: number; /**秒 */
    };
}

/**
 * @类别 需要用户创建的类
 * @描述 提供路径回调函数
 */
  class Path extends Event {
    _callback: any;
    private _state;
    private _mode;
    private _pathPositions;
    private _startTime;
    private pathData;
    private _viewer;
    private _sampleProperty;
    private pointsData;
    private index;
    private posProperty;
    private _endTime;
    constructor(viewer: GeoCanvas);
    private _start;
    /**
     * 回调函数
     */
    callback: any;
    /**
     * 设置路径
     */
    pathPositions: Array<{
        point: GeoPoint;
        time: number;
    }>;
    /**
     * 开始
     */
    start(): void;
    /**
     * 暂停
     */
    suspend(): void;
    /**
     * 关闭
     */
    stop(): void;
}
  enum PathStateEnum {
    /**
     * 正在运行
     */
    Run = "run",
    /**
     * 停止
     */
    Stop = "stop",
    /**
     * 暂停
     */
    Suspend = "suspend"
}
  enum PathModeEnum {
    /**
     * 重复
     */
    Loop = "loop",
    /**
     * 一次
     */
    Single = "single"
}

/**
 * @private
 */
  class DateHelper {
    static toggleTime(date: Date): string;
    static toggleTimeIso(date: Date): string;
    static addDate(date: Date, days: any): string;
    static getFormatDate(arg: any): string;
    static getStrNow(): string;
    static getStr(date: Date): string;
    private static getTodayZeroDate;
    private static getTodayMaxDate;
    static getTodayStartStr(): string;
    static getTodayEndStr(): string;
    static getTomorrowStartStr(): string;
    static getTomorrowEndStr(): string;
    static getWeekStartStr(): string;
    static getWeekEndStr(): string;
    static getMonthStartStr(): string;
    static getMonthEndStr(): string;
    static getYearStartStr(): string;
    static getYearEndStr(): string;
    static getDate15(): Date;
    static getDate60(): Date;
    static getDate120(): Date;
    static addSecond(data: Date, ss: number): Date;
    static addMinutes(data: Date, MM: number): Date;
}

/**
 * 算法类
 */
class GxMath {
    /**
     * 计算两个点的方位角
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return 返回方位角
     */
    static calculateAngle(x1: any, y1: any, x2: any, y2: any): number;
    static calculateOrbitLocalc(currentTime: Date, tle1: string, tle2: string, period: number, pointcount?: number): Array<GeoVector3>;
    static calculatePeriod(tle1: string, tle2: string): number;
    /**
     * 根据笛卡尔坐标换算经度
     * @param cartesian3
     * @param viewer
     */
    static getLongitudeByCartesian3(cartesian3: Cesium.Cartesian3, viewer: Cesium.Viewer): number;
    /**
     * 根据笛卡尔坐标换算维度
     */
    static getLatitudeByCartesian3(cartesian3: Cesium.Cartesian3, viewer: Cesium.Viewer): number;
    /**
     * 根据笛卡儿直角坐标算高度
     */
    static getHeightByCartesian3(cartesian3: Cesium.Cartesian3, viewer: Cesium.Viewer): number;
    /**
     * 根据设置高度返回笛卡尔坐标
     * @param cartesian3
     * @param height
     */
    static getHeightdefineByXYZ(cartesian3: Cesium.Cartesian3, height: number, viewer: Cesium.Viewer): Cesium.Cartesian3;
    /**
   * 转换屏幕坐标（来自于鼠标的各种event）为地理坐标
   * @param {screen position from mouse} screenPos
   * @private
   */
    static screen2lonlat(screenPos: any, viewer: any): number[];
    /**
     * 转换地理坐标到cesium cartesian
     * @param {地理坐标} lonlat
     * @param {高度值} height
     * @private
     */
    static lonlat2Cartesian(lonlat: any, height?: number): Cesium.Cartesian3;
    /**
     *
     * @private
     */
    static lonlathei2Cartesian(lonlathei: any): Cesium.Cartesian3;
    /**
     *
     * @private
     */
    static cartesian2lonlat(cartesian: any): number[];
    /**
     *
     * @private
     */
    static screen2Cartesian(screenPos: any, height: number, viewer: any): Cesium.Cartesian3;
    /**
     * @param {* java script date} date
     * @Return iso8601 date string like 2012-04-30T12:00:00Z
     * @private
     */
    static dateToString(date: any): string;
    /**
     * 将date日期转换为Julian日期对象，如果date为空，则获取当前时间
     * @param {JulianDate} date
     * @private
     */
    static julianDate(date?: any): Cesium.JulianDate;
    /**
     * @private
     * @param cart1
     * @param cart2
     */
    static distance(cart1: any, cart2: any): number;
    /**
     *
     * @private
     */
    static cartesian2turfPoint(cartesian: any): any;
    /**
     *
     * @private
     */
    static turfGeometry2Cartesians(g: any, height?: number): any;
    /**
     *
     * @private
     */
    static deleteEnts(ents: any, viewer: any): void;
}

  class StatusCheck {
    private static getData;
    static start(): Promise<boolean>;
    private static iekey;
    static checkFalse(): void;
    private static createDom;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类
 * @描述 通用基础方法集
 */
  class Util {
    /**
     * 传入相对于GEOVIS.web.js的相对路径获得完整资源路径
     * @param url 相对与GEOVIS.web.js路径
     * @return 完整路径
     * ```
     * 示例代码：
     * let url = GV.Util.formatUrlByBaseJs('./data.png')
     * ```
     */
    static formatUrlByBaseJs(url: string): string;
    private static getBaseUrlFromGEOVISScript;
    /**
     * 生成唯一的随机id
     * @return
     */
    static createGuid(): string;
    /**
     * 返回默认参数
     * @param a
     * @param b
     */
    static defaultValue(a: any, b: any): any;
    /**
     * 路径拼接根据原始路径及原始路径的相对路径获得完整路径
     * @param originPath 原始路径
     * @param file 原始路径的相对路径
     */
    static formatURLByCustom(originPath: string, file: string): string;
    /**
     * 路径拼接获得当前html的原始路径与相对路径拼接获得完整路径
     * @param file 相对于html的相对路径
     */
    static formatURL(file: string): string;
    /**
     * 同步获取text
     * @param path
     */
    static syncGetText(path: any): string;
    /**
     * 同步获取json数据
     */
    static syncGetJson(path: any): any;
    static formatURL2(originPath: any, file: any): any;
    /**
     * 将html标签转成canvas
     * @param container html容器
     * @param option 配置
     * @param callback 反馈
     */
    static html2canvas(container: any, option: any, callback?: any): void;
    /**
    * 将EPSG：3857坐标转换为EPSG：4326坐标系下坐标
    * @param x
    * @param y
    */
    static epsg3857To4326(x: any, y: any): any;
    /**
     * 将EPSG：4326坐标转换为EPSG：3857坐标系下坐标
     * @param lon 经度（degree）
     * @param lat 维度（degree）
     */
    static epsg4326To3857(lon: any, lat: any): any;
    /**
    * 根据地理编码获取范围
    * @param {Number} x The tile X coordinate.
    * @param {Number} y The tile Y coordinate.
    * @param {Number} level The tile level.
    * @returns {Cesium.Rectangle} the area Cartographic position
    */
    static getRectangleFromcode(level: any, x: any, y: any): Cesium.Rectangle;
    /**
     * 根据地理编码获取范围
     * @param viewer
     * @param {Cartesian} mousePos The screen positon
    * @returns {object} the area Cartographic position
    * {
        "level": 5,
        "x": 2,
        "y": x,
        "resolution":"9公里"
                
       }
     */
    static getCodeFromScreenPosition(viewer: any, mousePos: any): {
        "level": number;
        "x": number;
        "y": number;
        "resolution": any;
    };
    /**
     * 前置整数
     */
    static PrefixInteger(num: any, n: any): string;
}

/**
 * @类别 需要用户创建的类
 * @描述 视角点
 */
  class ViewPoint {
    /**
     * 经度
     */
    lon: number;
    /**
     * 纬度
     */
    lat: number;
    /**
     * 高度
     */
    alt: number;
    /**
     * 顺/逆时针旋转角度   范围: >=0 && <=360 (如果为负值会转换成相对应的正向角度数，如：-30 =》 330)
     */
    heading: number;
    /**
     * 俯仰   范围：>=-90 && <=90
     */
    pitch: number;
    /**
     * 旋转   范围：>=0 && <=360
     */
    roll: number;
    constructor(lon: number, lat: number, alt?: number, heading?: number, pitch?: number, roll?: number);
    /**
     * viewPoint转换成数组
     * @param viewPoint 视角点
     * @return
     * ```
     * 示例代码:
     * let viewPoint = new GV.ViewPoint(100,20,500000)
     * let pack = GV.ViewPoint.pack(viewPoint)
     * ```
     */
    static pack(viewPoint: any): Array<number>;
    /**
     * 数组转换成viewPoint
     * @param arr 数组
     * @return
     *  ```
     * 示例代码:
     * let arr = [100,20,500000,-90,0,0]
     * let pack = GV.ViewPoint.unpack(arr)
     * ```
     */
    static unpack(arr: any): ViewPoint;
}

/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 GEOVIS Camera 视口操作器 </br>
 *  提供了视口操作的通用接口，支持绕点旋转定位飞行等功能</br>
 * @see <a href='../../../examples/gallery/editor.html#rotate'>旋转</a>
 * @see <a href='../../../examples/gallery/editor.html#zoom'>缩放</a>
 * @see <a href='../../../examples/gallery/editor.html#rotateByCurrent'>原地观测</a>
 * @see <a href='../../../examples/gallery/editor.html#pitch'>俯仰</a>
 * @see <a href='../../../examples/gallery/editor.html#fly'>视角飞行</a>
 * @see <a href='../../../examples/gallery/editor.html#rotateByPoint'>绕点观测</a>
 * @see <a href='../../../examples/gallery/editor.html#flyHome'>视角飞回</a>
 */
  class Camera {
    private _viewer;
    private _viewPoint;
    private _home;
    private _moveEnd;
    private _moveStart;
    private _changed;
    private _timeExection;
    /**
     * 在创建GeoCanvas后通过viewer.iCamera调用
     * ```
     * 示例代码
     *  let viewer = new GV.GeoCanvas('geoCanvas')
     *  viewer.iCamera
     * ```
     */
    constructor(viewer: GeoCanvas);
    /**
     * 相机移动过程结束时所执行操作
     * @return
     *  ```
     * 示例代码：
     *viewer.iCamera.moveEnd.addEventListener(function(){
     *      console.log("moveEnd")
     * })
     * ```
     */
    readonly moveEnd: Cesium.Event;
    /**
     * 相机移动过程开始时所执行操作
     * @return
     *  ```
     * 示例代码：
     * viewer.iCamera.moveStart.addEventListener(function(){
     *      console.log("moveStart")
     * })
     * ```
     */
    readonly moveStart: Cesium.Event;
    /**
     * 相机变动时所执行操作
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.changed.addEventListener(function(){
     *      console.log("changed")
     * })
     * ```
     */
    readonly changed: Cesium.Event;
    /**
     * 获取视角点信息
     * @return
     * ```
     * 示例代码：
     * let viewPoint = viewer.iCamera.viewPoint;//获取当前相机视角信息
     * ```
     */
    readonly viewPoint: ViewPoint;
    /**
     * 设置或获取home视角
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.home = new GV.ViewPoint(104,33,15139621,360,-89,0)//设置home视角信息
     * let home = viewer.iCamera.home;//获取home视角信息
     * ```
     */
    home: ViewPoint;
    private _getCameraCenter;
    private _getCameraTransform;
    /**
     * 飞行到某一视角点
     * @param viewPoint 视角点信息
     * @param duration 飞行周期（单位：秒）（范围：>0 && <=10）
     * @param completeCallbak 飞行完成时回调函数
     * @param cancelCallback 飞行取消时回调函数
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.flyTo(new GV.ViewPoint(80,33,5000,360,-89,0),2,function(){
     *      console.log('complete')
     * })
     * ```
     */
    flyTo(viewPoint: ViewPoint, duration?: number, completeCallbak?: any, cancelCallback?: any): void;
    /**
     * 飞行到某一矩形区域
     * @param minlon 矩形区域最小经度
     * @param maxlon 矩形区域最大经度
     * @param minlat 矩形区域最小纬度
     * @param maxlat 矩形区域最大纬度
     * @param duration 飞行周期（单位：秒）（范围：>0 && <=10）
     * @param completeCallbak 飞行完成时回调函数
     * @param cancelCallback 飞行取消时回调函数
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.flyToRect(110,118,30,40,2,function(){
     *      console.log('complete')
     * })
     * ```
     */
    flyToRect(minlon: number, maxlon: number, minlat: number, maxlat: number, duration?: number, completeCallbak?: any, cancelCallback?: any): void;
    /**
     * 获取当前地图层级(二维时为有效瓦片层级，三维时为请求的第一个瓦片的层级)
     */
    readonly currentLevel: Number;
    /**
     * 飞回主视角
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.flyToHome()
     * ```
     */
    flyToHome(): void;
    /**
     * 俯仰
     * @param degree 度数 范围： >=-90 && <=90
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.pitch(-30)
     * ```
     */
    pitch(degree: number): void;
    /**
     * 旋转
     * @param degree 度数  范围：>=-360 && <=360
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.rotate(-30)
     * ```
     */
    rotate(degree: number): void;
    /**
     * 原地观测
     * @param duration 观测一周所用时间（单位：s）（范围：>0 && <= 360）
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.lookCenter(20)
     * ```
     */
    lookCenter(duration?: number): void;
    /**
     * 绕点观测
     * @param geoPoint
     * @param duration 观测一周所用时间（单位：s） （范围：>=0 && <=360）
     * @param distance 观测点和相机间的距离
     * @param pitch 俯仰度数
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.lookAround({lon:112,lat:40,alt:50000})
     * ```
     */
    lookAround(geoPoint: GeoPoint, duration?: number, distance?: number, pitch?: number): void;
    /**
     * 停止观测
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.lookStop()
     * ```
     */
    lookStop(): void;
    /**
     * 放大
     * @param rate 速率 范围：>=-360 && <=360
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.zoom(10)
     * ```
     */
    zoom(rate?: number): void;
}

/**
 * 地理画布入口
 */
  class GeoCanvas extends Cesium.Viewer {
    private _sceneOptions;
    private _layerManager;
    private _camera;
    private _analysis;
    private _pluginManager;
    private _JBConfig;
    /**
     * @param {Element} container 地理画布父div元素
     * @param {Object} [options] 地图配置属性
     * @param {String} [options.baseJbUrl] 军标服务路径
     * @param {String} [options.baseLayerPicker=false] 基础影像
     */
    constructor(container: any, options: any);
    private init;
    readonly JBConfig: any;
    readonly pluginManager: PluginManager;
    /**
     * 场景参数
     */
    readonly sceneOptions: SceneOptions;
    /**
     * 图层管理
     */
    readonly layerManager: LayerManager;
    /**
     * 相机参数
     */
    readonly iCamera: Camera;
    /**
     * 高效绘制图层
     */
    /**
     * 卫星图层
     */
    readonly satelliteLayer: SatelliteLayer;
    /**
     * 标绘图层
     */
    readonly graphicLayer: GraphicLayer;
    /**
     * 影像图层
     */
    readonly imageLayer: ImageLayer;
    /**
     * 目标图层
     */
    readonly targetLayer: TargetLayer;
    /**
     * 瓦片图层
     */
    readonly tileLayer: TileLayer;
    /**
     * 分析工具
     */
    readonly analysis: Analysis;
}

}