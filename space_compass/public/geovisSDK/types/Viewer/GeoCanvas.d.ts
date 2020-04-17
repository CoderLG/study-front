import { LayerManager } from "../LayerManager/LayerManager";
import { SceneOptions } from "../SceneOptions/SceneOptions";
import { Camera } from "./Camera";
import { Analysis } from "../Analysis/Analysis";
import { GraphicLayer } from "../LayerManager/GraphicLayer/GraphicLayer";
import { SatelliteLayer } from "../LayerManager/SatelliteLayer/SatelliteLayer";
import { ImageLayer } from "../LayerManager/ImageLayer/ImageLayer";
import { TargetLayer } from "../LayerManager/TargetLayer/TargetLayer";
import { TileLayer } from "../LayerManager/TileLayer/TileLayer";
import PluginManager from "../PluginManager/PluginManager";
/**
 * 地理画布入口
 */
export declare class GeoCanvas extends Cesium.Viewer {
    private _sceneOptions;
    private _layerManager;
    private _camera;
    private _analysis;
    private _pluginManager;
    private _JBConfig;
    /**
     * @param {Element} container 地理画布父div元素
     * @param {Object} [options] 地图配置属性
     * @param {String} [options.baseJbUrl] 军标服务路径
     * @param {String} [options.baseLayerPicker=false] 基础影像
     */
    constructor(container: any, options: any);
    private init;
    readonly JBConfig: any;
    readonly pluginManager: PluginManager;
    /**
     * 场景参数
     */
    readonly sceneOptions: SceneOptions;
    /**
     * 图层管理
     */
    readonly layerManager: LayerManager;
    /**
     * 相机参数
     */
    readonly iCamera: Camera;
    /**
     * 高效绘制图层
     */
    readonly massiveLayer: import("../LayerManager/MassiveLayer/MassiveLayer").MassiveLayer;
    /**
     * 卫星图层
     */
    readonly satelliteLayer: SatelliteLayer;
    /**
     * 标绘图层
     */
    readonly graphicLayer: GraphicLayer;
    /**
     * 影像图层
     */
    readonly imageLayer: ImageLayer;
    /**
     * 目标图层
     */
    readonly targetLayer: TargetLayer;
    /**
     * 瓦片图层
     */
    readonly tileLayer: TileLayer;
    /**
     * 分析工具
     */
    readonly analysis: Analysis;
}
