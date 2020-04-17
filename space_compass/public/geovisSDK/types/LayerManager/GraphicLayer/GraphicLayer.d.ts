import { GraphicGroup } from "./GraphicItem/GraphicGroup";
import { Event } from '../../Core/Event';
import { GraphicItem } from "./GraphicItem/GraphicItem";
import { GeoPoint } from "../../Utils/GeoPoint";
/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 几何绘制对象总入口，提供了绘制添加，查询，选取等能力
 */
export declare class GraphicLayer extends Event {
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
