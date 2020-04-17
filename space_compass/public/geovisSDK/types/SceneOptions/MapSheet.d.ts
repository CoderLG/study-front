import { GeoPoint } from "../Utils/GeoPoint";
/**
 * 1991年制订了新的《国家基本比例尺地形图分幅和编号》（GB/T 13989-92 ）的国家标准
 */
export declare class MapSheet {
    private viewer;
    private _labels;
    private _polylines;
    _visible: boolean;
    constructor(viewer: Cesium.Viewer);
    visible: boolean;
    /**
     * 计算瓦片数据
     *
     */
    getTiles(): void;
    /**
     * 计算点在对应的编码
     * 计算1:100万图幅的行号和列号
     */
    getCodeByPoint(lon: any, lat: any): string;
    /**
     * 图幅网格数据
     */
    getData(): {
        label: any[];
        polyline: any[];
    };
    /**
     * 文字图层
     */
    /**
     * 显示
     */
    show(): void;
    /**
     * 隐藏
     */
    remove(): void;
    /**
     * 根据图幅编码获取图幅范围
     */
    getRectangleBycode(code: string): {
        minLon: number;
        minLat: number;
        maxLon: number;
        maxLat: number;
    };
    getcodeByPosition(position: GeoPoint): string;
}
