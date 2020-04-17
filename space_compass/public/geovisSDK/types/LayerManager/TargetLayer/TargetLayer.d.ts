import { Layer } from "../../Core/Layer";
import { TargetItem } from "./TargetItem";
import { WarningTargets } from "./WarningTargets";
export declare class TargetLayer extends Layer {
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
