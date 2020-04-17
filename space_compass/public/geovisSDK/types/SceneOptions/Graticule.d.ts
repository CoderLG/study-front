/**
 * 经纬网
 */
export declare class Graticule {
    private layer;
    private viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 显示
     */
    show(): void;
    /**
     * 隐藏
     */
    remove(): void;
}
