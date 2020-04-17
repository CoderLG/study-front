import { ImageryItem } from "./ImageryItem";
import { ImageLayer } from "./ImageLayer";
/**
 * UrlTemplate影像
 */
export declare class BingImagery extends ImageryItem {
    private _renderObj;
    private _imageLayer;
    private _option;
    constructor(option: BingImageryOpt);
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
export declare class BingImageryOpt {
    /**
     * 影像路径
     */
    url: string;
}
