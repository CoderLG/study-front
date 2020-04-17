import { ImageryItem } from "./ImageryItem";
import { ImageLayer, TilingSchemeE } from "./ImageLayer";
/**
 * UrlTemplate影像
 */
export declare class WMTSImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: WMTSImageryOpt);
    /**
     * 获取类型
     */
    getType(): string;
    static readonly type: string;
    initItem(imageLayer: ImageLayer): void;
    destroyItem(): void;
    getRenderObject(): Cesium.ImageryLayer;
    toJson(): {};
}
export declare class WMTSImageryOpt {
    /**
     * 影像路径
     */
    url: string;
    /**
     * 影像图层
     */
    layer: string;
    /**
     * 影像投影方式
     */
    tilingScheme: TilingSchemeE;
    /**
     * 样式
     */
    style: string;
    /**
     * 影像格式
     */
    format: string;
    /**
     * 影像变换
     */
    tileMatrixSetID: "EPSG:4326";
}
