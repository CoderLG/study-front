import { GeoPoint } from "../../Utils/GeoPoint";
import { GraphicGroup } from "../../LayerManager/GraphicLayer/GraphicItem/GraphicGroup";
export declare class BaseControlPoint {
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
