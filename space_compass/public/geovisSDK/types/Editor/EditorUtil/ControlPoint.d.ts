import { GeoPoint } from "../../Utils/GeoPoint";
import { BaseControlPoint } from "./BaseControlPoint";
import { GraphicItem } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicItem";
export declare class ControlPoint extends BaseControlPoint {
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
