export declare class SkylineAnalyze {
    private _skylinePostProcess;
    private _viewer;
    private _psLayer;
    constructor(viewer: any);
    /**
     * 开启天际线分析
     * @param opt  天际线分析设置
     */
    open(opt: SkylineOption): void;
    /**
     * 关闭淹没分析
     */
    close(): void;
}
export declare class SkylineOption {
    /**
     * 线型宽度
     */
    width: number;
    strokeType: Cesium.Cartesian3;
    bjColor: Cesium.Color;
    color: Cesium.Color;
    strokeDistance: number;
}
export declare class SkylinePostProcess extends Cesium.PostProcessStage {
    constructor(camera: Cesium.Camera, opts: SkylineOption);
}
