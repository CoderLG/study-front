import Graph from './Graph';
export default class EditMode {
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
