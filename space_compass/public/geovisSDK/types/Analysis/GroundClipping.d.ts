import { GeoCanvas } from "../Viewer/GeoCanvas";
import { GeoPoint } from "../Utils/GeoPoint";
/**
 * 挖地
 */
export declare class GroundClipping {
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
