import { ImageLayer } from "./ImageLayer/ImageLayer";
import { GraphicLayer } from "./GraphicLayer/GraphicLayer";
import { MassiveLayer } from "./MassiveLayer/MassiveLayer";
import { TargetLayer } from "./TargetLayer/TargetLayer";
import { TerrainLayerCollection } from "./TerrainLayer/TerrainLayerCollection";
import { SatelliteLayer } from "./SatelliteLayer/SatelliteLayer";
import { TileLayer } from "./TileLayer/TileLayer";
/**
 * 图层管理
 */
export declare class LayerManager {
    private _graphicLayer;
    private _ImageLayer;
    private _massiveLayer;
    private _targetLayer;
    private _terrainLayers;
    private _satelliteLayer;
    private _tileLayer;
    private _viewer;
    constructor(viewer: Cesium.Viewer);
    init(): void;
    toJson(): any[];
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    /**
     * 标绘图层
     */
    readonly graphicLayer: GraphicLayer;
    /**
     * 影像图层
     */
    readonly imageLayer: ImageLayer;
    /**
     * 高效绘制图层
     */
    readonly massiveLayer: MassiveLayer;
    /**
     * 目标图层
     */
    readonly targetLayer: TargetLayer;
    /**
     * 地形图层
     */
    readonly terrainLayers: TerrainLayerCollection;
    /**
     * 卫星图层
     */
    readonly satelliteLayer: SatelliteLayer;
    /**
     * 瓦片图层
     */
    readonly tileLayer: TileLayer;
}
