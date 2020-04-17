import { GeoCanvas } from "../Viewer/GeoCanvas";
import { GeoPoint } from "../Utils/GeoPoint";
/**
 * 点面通视
 */
export declare class PolygonVisiableAnalysis {
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
