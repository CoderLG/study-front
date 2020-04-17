import { LabelGraphicOpt } from '../LayerManager/GraphicLayer/GraphicItem/LabelGraphic';
export declare class MeasureDistance {
    private _viewer;
    private _distance;
    private _clampToGround;
    private _polyline;
    private _labelItem;
    constructor(viewer: Cesium.Viewer);
    /**
     * 开启测距
     * @param disopt 测距参数
     */
    open(disopt: MeasureDistanceOpt): void;
    private _calcDistance;
    /**
     *  关闭测距
     */
    close(): void;
}
export declare class MeasureDistanceOpt {
    /**
     * 是否计算贴地
     */
    clampToGround: boolean;
    /**
     * 线是否贴地
     */
    lineClamp: boolean;
    /**
     * 量算单位 meter kilometer
     */
    unit: string;
    /**
     * 量算线颜色
     */
    color: string;
    /**
     * 文字对象参数
     */
    labelGraphicOpt?: LabelGraphicOpt;
    /**
     * 回调函数
     */
    finshCallback?: Function;
}
