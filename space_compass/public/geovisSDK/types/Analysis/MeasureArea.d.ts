import { LabelGraphicOpt } from '../LayerManager/GraphicLayer/GraphicItem/LabelGraphic';
export declare class MeasureArea {
    private _viewer;
    private _area;
    private _clampToGround;
    private _ploygon;
    private _labelItem;
    constructor(viewer: Cesium.Viewer);
    /**
     * 开启测面
     * @param clampToGround 是否计算贴地
     * @param unit 量算单位 meter kilometer
     * @param color 量算面颜色
     * @param labelGraphicOpt 文字对象参数
     * @param finshCallback 回调函数
     */
    open(areaOpt: MeasureAreaOpt): void;
    private _calcDistance;
    /**
     *  关闭测面
     */
    close(): void;
}
export declare class MeasureAreaOpt {
    /**
     * 是否计算贴地
     */
    clampToGround: boolean;
    /**
     * 线是否贴地
     */
    polygonClamp: boolean;
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
