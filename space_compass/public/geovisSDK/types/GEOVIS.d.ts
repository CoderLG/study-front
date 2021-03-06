import './Core/Register';
import './LayerManager/GraphicLayer/GraphicRender/SpecialEffect/CesiumGeometry';
import './LayerManager/ImageLayer/UrlTemplateTimeLayer';
import GraphManager from "./Editor-old/plottingTool";
import { Item } from "./Core/Item";
import { Layer } from "./Core/Layer";
import { Event } from "./Core/Event";
import { GeoCanvas } from "./Viewer/GeoCanvas";
import { Calculate } from "./Utils/Calculate";
import { Check } from "./Utils/Check";
import { GeoPoint } from "./Utils/GeoPoint";
import { ViewPoint } from "./Utils/ViewPoint";
import { Util } from "./Utils/Util";
import { LayerManager } from "./LayerManager/LayerManager";
import { SceneOptions, WeatherEnmu } from "./SceneOptions/SceneOptions";
import { GraphicLayer } from "./LayerManager/GraphicLayer/GraphicLayer";
import { SatelliteLayer } from "./LayerManager/SatelliteLayer/SatelliteLayer";
import { ImageLayer } from "./LayerManager/ImageLayer/ImageLayer";
import { TargetLayer } from "./LayerManager/TargetLayer/TargetLayer";
import { TargetItem } from "./LayerManager/TargetLayer/TargetItem";
import { TargetHistory } from "./LayerManager/TargetLayer/TargetHistory";
import { TerrainLayerCollection } from "./LayerManager/TerrainLayer/TerrainLayerCollection";
import { TerrainItem } from "./LayerManager/TerrainLayer/TerrainItem";
import { TargetState } from "./LayerManager/TargetLayer/TargetState";
import { TargetStyle } from "./LayerManager/TargetLayer/TargetStyle";
import { TileLayer } from "./LayerManager/TileLayer/TileLayer";
import { SpaceDebris, SpaceDebrisOpt } from "./LayerManager/MassiveLayer/SpaceDebris";
import { Windy } from "./LayerManager/MassiveLayer/windy/Windy";
import { Cluster, ClusterOpt } from "./LayerManager/MassiveLayer/Cluster";
import { Canvas2Image } from './Utils/Canvas2Image';
import { HeatMap, HeatMapOpt } from './LayerManager/MassiveLayer/HeatMap/HeatMap';
import { MapV, MapVOpt } from './LayerManager/MassiveLayer/MapV/MapV';
import { MassiveLines, MassiveLinesOpt } from "./LayerManager/MassiveLayer/MassiveLines";
import { MassivePoints, PointOption, PointStyle } from "./LayerManager/MassiveLayer/MassivePoints";
import { MassivePolygons, MassivePolygonOpt } from "./LayerManager/MassiveLayer/MassivePolygons";
import { PlaceNameTile, PlaceNameTileOpt, PlaceFontStyle } from "./LayerManager/TileLayer/PlaceNameTile";
import { PolygonTileOpt, PolygonTile } from "./LayerManager/TileLayer/PolygonTile";
import { ObliqueTile } from './LayerManager/TileLayer/ObliqueTile';
import { IconTile, IconTileOpt } from "./LayerManager/TileLayer/IconTile";
import { LineTile, LineTileOpt } from './LayerManager/TileLayer/LineTile';
import { Satellite, SatelliteOpt, StatelliteEnum } from './LayerManager/SatelliteLayer/Satellite';
import { SatelliteComponents } from './LayerManager/SatelliteLayer/SatelliteComponents';
import { PointGraphic } from './LayerManager/GraphicLayer/GraphicItem/PointGraphic';
import { CylinderDynamicGraphic, CylinderDynamicGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/CylinderDynamicGraphic';
import { SectorGraphic, SectorGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/SectorGraphic';
import { WeatherGraphic, WeatherGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/WeatherGraphic';
import { WaterGraphic, WaterGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/WaterGraphic';
import { PolylineGraphic, PolylineGraphicOpt, ArcTypeEnum } from './LayerManager/GraphicLayer/GraphicItem/PolylineGraphic';
import { ColorStyle, ArrowStyle, OutlineStyle, DashStyle, GlowStyle, DynamicStyle, DynamicIconEnum, PolylineStyleEnum } from './LayerManager/GraphicLayer/Material/Material';
import { ParabolaLineGraphicOpt, ParabolaLineGraphic } from './LayerManager/GraphicLayer/GraphicItem/ParabolaLineGraphic';
import { BezierLineGraphic, BezierLineGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/BezierLineGraphic';
import { BubbleGraphic, BubbleGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/BubbleGraphic';
import { LabelGraphic, LabelGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/LabelGraphic';
import { ModelGraphic, ModelGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/ModelGraphic';
import { BillboardGraphic, BillboardGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/BillboardGraphic';
import { ScanGraphic, ScanGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/ScanGraphic';
import { SensorGraphic, SensorGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/SensorGraphic';
import { SpreadGraphic, SpreadGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/SpreadGraphic';
import { EllipseGraphic, EllipseGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/EllipseGraphic';
import { RectangleGraphic, RectangleGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/RectangleGraphic';
import { EllipsoidGraphic, EllipsoidGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/EllipsoidGraphic';
import { SphereGraphic, SphereGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/SphereGraphic';
import { WallGraphic, WallGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/WallGraphic';
import { VolumePolylineGraphic, VolumePolylineGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/VolumePolylineGraphic';
import { CylinderGraphic, CylinderGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/CylinderGraphic';
import { RadarGraphic, RadarGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/RadarGraphic';
import { DynamicRippleGraphicOpt, DynamicRippleGraphic } from './LayerManager/GraphicLayer/GraphicItem/DynamicRippleGraphic';
import { GraphicGroup } from './LayerManager/GraphicLayer/GraphicItem/GraphicGroup';
import { PolygonGraphic, PolygonGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/PolygonGraphic';
import PluginManager from './PluginManager/PluginManager';
import './PluginManager/PluginsFactory';
import { PluginView } from './PluginManager/PluginView';
import { Tool } from './PluginManager/Tool';
import { Widget } from './PluginManager/Widget';
import { HeightReferenceEnum } from './LayerManager/GraphicLayer/GraphicItem/GraphicItem';
import { PopoverGraphic, PopoverGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/PopoverGraphic';
import { JBLineGraphic, JBLineGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/JBLineGraphic';
import { JBPointGraphic, JBPointGraphicOpt, JBRenderModeEnum } from './LayerManager/GraphicLayer/GraphicItem/JBPointGraphic';
import { Path } from './Utils/Path';
import { CircularGraphicOpt, CircularGraphic } from './LayerManager/GraphicLayer/GraphicItem/CircularGraphic';
import { TriangleMeshGraphicOpt, TriangleMeshGraphic } from './LayerManager/GraphicLayer/GraphicItem/TriangleMeshGraphic';
import { iCenter } from "./iCenter/iCenter";
import { Analysis } from './Analysis/Analysis';
import { Camera } from './Viewer/Camera';
import { MeasureAreaOpt } from './Analysis/MeasureArea';
import { MeasureDistanceOpt } from './Analysis/MeasureDistance';
import { FloodAnalysisOpt } from './Analysis/FloodAnalysis';
import { CustomLabelGraphic, CustomLabelGraphicOpt } from './LayerManager/GraphicLayer/GraphicItem/CustomLabelGraphic';
import { IntervisibilityAnalysis } from './Analysis/IntervisibilityAnalysis';
import { HideAnalysis } from './Analysis/HideAnalysis';
import { PathAnalysis } from './Analysis/PathAnalysis';
import { PolygonVisiableAnalysis } from './Analysis/PolygonVisiableAnalysis';
import { SlopeAnalysis } from './Analysis/SlopeAnalysis';
import { SkylineAnalyze } from './Analysis/SkylineAnalyze';
import { SkylineOption } from './Analysis/SkylineAnalyze';
declare let gv: {
    Version: string;
    Item: typeof Item;
    Layer: typeof Layer;
    Event: typeof Event;
    GeoCanvas: typeof GeoCanvas;
    Calculate: typeof Calculate;
    Check: typeof Check;
    GeoPoint: typeof GeoPoint;
    ViewPoint: typeof ViewPoint;
    Util: typeof Util;
    LayerManager: typeof LayerManager;
    SceneOptions: typeof SceneOptions;
    WeatherEnmu: typeof WeatherEnmu;
    HeightReferenceEnum: typeof HeightReferenceEnum;
    PluginManager: typeof PluginManager;
    GraphicLayer: typeof GraphicLayer;
    SatelliteLayer: typeof SatelliteLayer;
    ImageLayer: typeof ImageLayer;
    TargetLayer: typeof TargetLayer;
    TargetItem: typeof TargetItem;
    TargetState: typeof TargetState;
    TargetStyle: typeof TargetStyle;
    TargetHistory: typeof TargetHistory;
    TileLayer: typeof TileLayer;
    SpaceDebris: typeof SpaceDebris;
    SpaceDebrisOpt: typeof SpaceDebrisOpt;
    Windy: typeof Windy;
    Cluster: typeof Cluster;
    ClusterOpt: typeof ClusterOpt;
    Canvas2Image: typeof Canvas2Image;
    HeatMap: typeof HeatMap;
    HeatMapOpt: typeof HeatMapOpt;
    MapV: typeof MapV;
    MapVOpt: typeof MapVOpt;
    MassiveLines: typeof MassiveLines;
    MassiveLinesOpt: typeof MassiveLinesOpt;
    MassivePoints: typeof MassivePoints;
    PointOption: typeof PointOption;
    PointStyle: typeof PointStyle;
    MassivePolygons: typeof MassivePolygons;
    MassivePolygonOpt: typeof MassivePolygonOpt;
    PlaceNameTile: typeof PlaceNameTile;
    PlaceNameTileOpt: typeof PlaceNameTileOpt;
    PlaceFontStyle: typeof PlaceFontStyle;
    PolygonTileOpt: typeof PolygonTileOpt;
    PolygonTile: typeof PolygonTile;
    IconTile: typeof IconTile;
    IconTileOpt: typeof IconTileOpt;
    ObliqueTile: typeof ObliqueTile;
    LineTile: typeof LineTile;
    LineTileOpt: typeof LineTileOpt;
    Satellite: typeof Satellite;
    SatelliteOpt: typeof SatelliteOpt;
    StatelliteEnum: typeof StatelliteEnum;
    SatelliteComponents: typeof SatelliteComponents;
    CesiumGeometry: any;
    GraphManager: typeof GraphManager;
    PointGraphic: typeof PointGraphic;
    CylinderDynamicGraphic: typeof CylinderDynamicGraphic;
    CylinderDynamicGraphicOpt: typeof CylinderDynamicGraphicOpt;
    SectorGraphic: typeof SectorGraphic;
    SectorGraphicOpt: typeof SectorGraphicOpt;
    WeatherGraphic: typeof WeatherGraphic;
    WeatherGraphicOpt: typeof WeatherGraphicOpt;
    WaterGraphic: typeof WaterGraphic;
    WaterGraphicOpt: typeof WaterGraphicOpt;
    PolylineGraphic: typeof PolylineGraphic;
    PolylineGraphicOpt: typeof PolylineGraphicOpt;
    ColorStyle: typeof ColorStyle;
    ArrowStyle: typeof ArrowStyle;
    OutlineStyle: typeof OutlineStyle;
    DashStyle: typeof DashStyle;
    GlowStyle: typeof GlowStyle;
    DynamicStyle: typeof DynamicStyle;
    DynamicIconEnum: typeof DynamicIconEnum;
    PolylineStyleEnum: typeof PolylineStyleEnum;
    BezierLineGraphic: typeof BezierLineGraphic;
    BezierLineGraphicOpt: typeof BezierLineGraphicOpt;
    ParabolaLineGraphic: typeof ParabolaLineGraphic;
    ParabolaLineGraphicOpt: typeof ParabolaLineGraphicOpt;
    ArcTypeEnum: typeof ArcTypeEnum;
    BubbleGraphic: typeof BubbleGraphic;
    BubbleGraphicOpt: typeof BubbleGraphicOpt;
    LabelGraphic: typeof LabelGraphic;
    LabelGraphicOpt: typeof LabelGraphicOpt;
    ModelGraphic: typeof ModelGraphic;
    ModelGraphicOpt: typeof ModelGraphicOpt;
    BillboardGraphic: typeof BillboardGraphic;
    BillboardGraphicOpt: typeof BillboardGraphicOpt;
    ScanGraphic: typeof ScanGraphic;
    ScanGraphicOpt: typeof ScanGraphicOpt;
    SensorGraphic: typeof SensorGraphic;
    SensorGraphicOpt: typeof SensorGraphicOpt;
    SpreadGraphic: typeof SpreadGraphic;
    SpreadGraphicOpt: typeof SpreadGraphicOpt;
    EllipseGraphic: typeof EllipseGraphic;
    EllipseGraphicOpt: typeof EllipseGraphicOpt;
    RectangleGraphic: typeof RectangleGraphic;
    RectangleGraphicOpt: typeof RectangleGraphicOpt;
    EllipsoidGraphic: typeof EllipsoidGraphic;
    EllipsoidGraphicOpt: typeof EllipsoidGraphicOpt;
    SphereGraphic: typeof SphereGraphic;
    SphereGraphicOpt: typeof SphereGraphicOpt;
    WallGraphic: typeof WallGraphic;
    WallGraphicOpt: typeof WallGraphicOpt;
    VolumePolylineGraphic: typeof VolumePolylineGraphic;
    VolumePolylineGraphicOpt: typeof VolumePolylineGraphicOpt;
    CylinderGraphic: typeof CylinderGraphic;
    CylinderGraphicOpt: typeof CylinderGraphicOpt;
    RadarGraphic: typeof RadarGraphic;
    RadarGraphicOpt: typeof RadarGraphicOpt;
    DynamicRippleGraphicOpt: typeof DynamicRippleGraphicOpt;
    DynamicRippleGraphic: typeof DynamicRippleGraphic;
    GraphicGroup: typeof GraphicGroup;
    PolygonGraphic: typeof PolygonGraphic;
    PolygonGraphicOpt: typeof PolygonGraphicOpt;
    PluginView: typeof PluginView;
    Tool: typeof Tool;
    Widget: typeof Widget;
    PopoverGraphic: typeof PopoverGraphic;
    PopoverGraphicOpt: typeof PopoverGraphicOpt;
    JBLineGraphic: typeof JBLineGraphic;
    JBLineGraphicOpt: typeof JBLineGraphicOpt;
    JBPointGraphic: typeof JBPointGraphic;
    JBPointGraphicOpt: typeof JBPointGraphicOpt;
    JBRenderModeEnum: typeof JBRenderModeEnum;
    CircularGraphic: typeof CircularGraphic;
    CircularGraphicOpt: typeof CircularGraphicOpt;
    Path: typeof Path;
    TriangleMeshGraphicOpt: typeof TriangleMeshGraphicOpt;
    TriangleMeshGraphic: typeof TriangleMeshGraphic;
    TerrainLayerCollection: typeof TerrainLayerCollection;
    TerrainItem: typeof TerrainItem;
    iCenter: typeof iCenter;
    Analysis: typeof Analysis;
    Camera: typeof Camera;
    MeasureAreaOpt: typeof MeasureAreaOpt;
    MeasureDistanceOpt: typeof MeasureDistanceOpt;
    FloodAnalysisOpt: typeof FloodAnalysisOpt;
    CustomLabelGraphic: typeof CustomLabelGraphic;
    CustomLabelGraphicOpt: typeof CustomLabelGraphicOpt;
    IntervisibilityAnalysis: typeof IntervisibilityAnalysis;
    HideAnalysis: typeof HideAnalysis;
    PathAnalysis: typeof PathAnalysis;
    PolygonVisiableAnalysis: typeof PolygonVisiableAnalysis;
    SlopeAnalysis: typeof SlopeAnalysis;
    SkylineAnalyze: typeof SkylineAnalyze;
    SkylineOption: typeof SkylineOption;
};
export default gv;
