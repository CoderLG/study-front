import { GeoCanvas } from "../Viewer/GeoCanvas";
import { GeoPoint } from "../Utils/GeoPoint";
/**
 * 坡度坡向分析
 * 说明：0°到90°分为9级,颜色设置如下：
 * level_1:rgba(45,136,4,1.0),
 * level_2:rgba(75,153,4,1.0),
 * level_3:rgba(111,169,4,1.0),
 * level_4:rgba(154,188,4,1.0),
 * level_5:rgba(204,206,4,1.0),
 * level_6:rgba(204,155,4,1.0),
 * level_7:rgba(204,104,4,1.0),
 * level_8:rgba(204,53,4,1.0),
 * level_9:rgba(204,2,4,1.0)
 */
export declare class SlopeAnalysis {
    private viewer;
    private startPos;
    private endPos;
    private demTileLevel;
    private rectangle;
    private levelInfo;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param startPos 起点
     * @param endPos 终点
     * 说明：两点为矩形对角线上两点
     */
    open(startPos: GeoPoint, endPos: GeoPoint): void;
    private init;
    /**
     * 创建entity
     * @param dataRes
     */
    private create;
    /**
     * 获取数据
     * @param url
     */
    private getJSON;
    /**
     * 创建UV
     * @param res
     */
    private createMap;
    /**
     * 结束分析
     */
    close(): void;
    /**
     * 获取分级信息
     */
    getLevelInfo(): String;
}
