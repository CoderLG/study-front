import { LayerSplit } from './LayerSplit';
import { ViewshedAnalyze } from "./ViewshedAnalyze";
import { HeightAnalyze } from "./HeightAnalyze";
import { GroundClipping } from "./GroundClipping";
import { GeoCanvas } from '../Viewer/GeoCanvas';
import { FloodAnalysis } from './FloodAnalysis';
import { ProfileAnalysis } from './ProfileAnalysis';
import { MeasureDistance } from './MeasureDistance';
import { MeasureArea } from './MeasureArea';
import { HideAnalysis } from './HideAnalysis';
import { IntervisibilityAnalysis } from './IntervisibilityAnalysis';
import { PathAnalysis } from './PathAnalysis';
import { PolygonVisiableAnalysis } from './PolygonVisiableAnalysis';
import { SlopeAnalysis } from './SlopeAnalysis';
import { SkylineAnalyze } from './SkylineAnalyze';
export declare class Analysis {
    private _viewer;
    private _layerSplit;
    private _viewshedAnalyze;
    private _heightAnalyze;
    private _groundClip;
    private _floodAnalysis;
    private _profileAnalysis;
    private _measureDistance;
    private _measureArea;
    private _hideAnalysis;
    private _intervisibilityAnalysis;
    private _pathAnalysis;
    private _polygonVisiableAnalysis;
    private _slopeAnalysis;
    private _skylineAnalyze;
    constructor(viewer: GeoCanvas);
    private _init;
    /**
     * 卷帘工具
     */
    readonly layerSplit: LayerSplit;
    /**
    * 通视分析工具
    */
    readonly viewshedAnalyze: ViewshedAnalyze;
    /**
    * 通视分析工具
    */
    readonly heightAnalyze: HeightAnalyze;
    readonly groundClip: GroundClipping;
    /**
    * 淹没分析
    */
    readonly floodAnalysis: FloodAnalysis;
    /**
    * 剖面分析
    */
    readonly profileAnalysis: ProfileAnalysis;
    /**
     * 测距
     */
    readonly measureDistance: MeasureDistance;
    /**
    * 测面
    */
    readonly measureArea: MeasureArea;
    /**
     * 遮蔽分析
     */
    readonly hideAnalysis: HideAnalysis;
    /**
     * 点点通视
     */
    readonly intervisibilityAnalysis: IntervisibilityAnalysis;
    /**
     * 路径分析
     */
    readonly pathAnalysis: PathAnalysis;
    /**
     * 点面通视
     */
    readonly polygonVisiableAnalysis: PolygonVisiableAnalysis;
    /**
     * 坡度坡向分析
     */
    readonly slopeAnalysis: SlopeAnalysis;
    /**
     * 天际线分析
     */
    readonly SkylineAnalyze: SkylineAnalyze;
}
