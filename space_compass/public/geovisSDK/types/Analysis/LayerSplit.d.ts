import { GeoCanvas } from "../Viewer/GeoCanvas";
/**
 * 卷帘功能
 */
export declare class LayerSplit {
    private _layer;
    private _viewer;
    private _type;
    private _handler;
    /**
     * 构造函数
     * @param viewer 卷帘视口
     * @param layer 卷帘图层
     * @param type 卷帘方式
     * @param style 卷帘样式
     */
    constructor(viewer: GeoCanvas);
    private _getType;
    private _formatCss;
    private _main;
    /**
     *  开启卷帘
     * @param {Cesium.ImageryLayer} layer
     * @param {string} type 卷帘类型['left','right','up','bottom']
     * @param {string} barColor 卷帘条带颜色
     * @param {number} barWidth 卷帘条带宽度
     */
    open(layer: Cesium.ImageryLayer, type?: string, barColor?: string, barWidth?: number): void;
    /**
     * 关闭卷帘
     */
    close(): void;
}
