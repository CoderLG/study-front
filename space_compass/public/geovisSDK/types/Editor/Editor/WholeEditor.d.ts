import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
export declare class WholeEditor {
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
