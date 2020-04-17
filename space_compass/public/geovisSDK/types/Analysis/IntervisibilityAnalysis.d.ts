import { GeoPoint } from "../Utils/GeoPoint";
import { GeoCanvas } from "../Viewer/GeoCanvas";
/**
 * 点点通视
 */
export declare class IntervisibilityAnalysis {
    /**
     * 视图对象
     */
    private viewer;
    /**
     * 起始点位置
     */
    private startPoint;
    /**
     * 终止点位置
     */
    private endPoint;
    /**
     * 切分层级
     */
    private demTileLevel;
    /**
     * 分析结果
     */
    private analysisResult;
    /**
     * 线宽
     */
    private lineWidth;
    private lineGreen;
    private lineRed;
    private dirLine;
    private dataModel;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param startPoint 起点
     * @param endPoint 终点
     * @param lineWidth 线宽
     */
    open(startPoint: GeoPoint, endPoint: GeoPoint, lineWidth?: 5): void;
    private init;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 添加上球
     * @param data
     */
    private createPrimitive;
    /**
     * 拼接url 仅支持number object
     * @param data
     * @param obj
     */
    private params;
    /**
     * 存在障碍点
     */
    private createObstructPrimitive;
    /**
     * 通视情况
     */
    private createDirPrimitive;
    /**
     * 关闭分析
     */
    close(): void;
    /**
     * 获取分析结果
     */
    getAnalysisResult(): string;
}
