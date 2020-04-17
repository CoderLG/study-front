import { LabelGraphicOpt } from "../LayerManager/GraphicLayer/GraphicItem/LabelGraphic";
import { ColorStyle } from "../LayerManager/GraphicLayer/Material/Material";
export declare class FloodAnalysis {
    private _viewer;
    private _handler;
    private _polygon;
    private _flag;
    private _point;
    private _label;
    private _rect;
    private _clampToGround;
    private _area;
    private _labelItem;
    constructor(viewer: any);
    /**
     * 开启淹没分析
     * @param unit 量算单元
     * @param color 量算颜色
     */
    open(opt: FloodAnalysisOpt): void;
    /**
     * 淹没基准点选取
     * @param data
     * @param color
     */
    private _selectBsaePoint;
    private _calcDistance;
    /**
     * 关闭淹没分析
     */
    close(): void;
}
export declare class FloodAnalysisOpt {
    /**
     *  是否贴地
     */
    clampToGround: true;
    /**
     * 线型颜色
     */
    color: ColorStyle;
    /**
     * 量算单元
     */
    unit: string;
    /**
     * 线型宽度
     */
    width: number;
    /**
     * 文字对象参数
     */
    labelGraphicOpt?: LabelGraphicOpt;
    /**
     * 回调函数
     */
    finshCallback?: Function;
}
