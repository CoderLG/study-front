import { GeoCanvas } from "../../Viewer/GeoCanvas";
import { TargetItem } from "./TargetItem";
export declare class WarningTargets {
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
