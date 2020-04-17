import { ImageryItem } from "./ImageryItem";
import { ImageLayer, TilingSchemeE } from "./ImageLayer";
/**
 * UrlTemplate影像
 */
export declare class OSMImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: OSMImageryOpt);
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
export declare class OSMImageryOpt {
    /**
     * 影像路径
     */
    url: string;
    /**
     * 影像投影方式
     */
    tilingScheme: TilingSchemeE;
    /**
     * 最大层级
     */
    maximumLevel: number;
}
