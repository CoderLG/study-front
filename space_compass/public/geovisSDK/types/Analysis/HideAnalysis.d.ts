import { GeoCanvas } from "../Viewer/GeoCanvas";
import { GeoPoint } from "../Utils/GeoPoint";
/**
 * 遮蔽分析
 */
export declare class HideAnalysis {
    /**
     * 视图对象
     */
    private viewer;
    /**
     * 位置
     */
    private center;
    /**
     * 范围
     */
    private dis;
    /**
     * 最大遮蔽角
     */
    private veilAngle;
    /**
     * 遮蔽度
     */
    private ratio;
    /**
     * 切分层级
     */
    private demTileLevel;
    private dataModel;
    private entity;
    constructor(viewer: GeoCanvas);
    /**
     * 开始分析
     * @param center 中心点
     * @param dis 范围
     * @param veilAngle  最大遮蔽角
     */
    open(center: GeoPoint, dis?: number, veilAngle?: number): void;
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
     * 获取遮蔽度
     */
    getRatio(): number;
    /**
     * 删除
     */
    close(): void;
}
