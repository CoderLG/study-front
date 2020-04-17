import { GeoPoint } from "../Utils/GeoPoint";
import { GeoCanvas } from "../Viewer/GeoCanvas";
/**
 * 路径分析
 */
export declare class PathAnalysis {
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
