export declare class ViewshedAnalyze {
    viewer: any;
    config: any;
    defaultOption: any;
    /**
     * 通视分析构造函数
     * @method constructor
     * @param viewer Cesium.Viewer 对象
     *
     */
    constructor(viewer: Cesium.Viewer);
    VisibleColor: any;
    InVisibleColor: any;
    /**
      * 是否显示视距
      *
      */
    showDistance: any;
    /**
      * 开始视域分析
      * @method start
      *
      */
    open(): void;
    /**
     * 结束视域分析
     * @method stop
     *
     */
    close(): void;
    _initialiseHandlers(): void;
    _addEntity(pos: any): void;
    _calculatePose(pickingPos: any): void;
    _createViewShad(pos: any): void;
    _getUIShader(self: any, fs: any, shadowMap: any, castShadows: any, isTerrain: any, hasTerrainNormal: any): any;
    _updateLightDirection(): void;
    _creatFrustum(): void;
    _pickPosition(winPosition: any): any;
    _getViewShadGeometry(frustumGeometry: any): any;
}
