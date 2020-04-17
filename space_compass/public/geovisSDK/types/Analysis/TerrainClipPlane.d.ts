import { GeoCanvas } from "../Viewer/GeoCanvas";
export declare class TerrainClipPlane {
    viewer: GeoCanvas;
    bottomSurface: any;
    wellWall: any;
    private options;
    private _positions;
    private _height;
    height: number;
    wallImg: String;
    bottomImg: String;
    private splitNum;
    private excavateMinHeight;
    private wellData;
    private _show;
    show: any;
    constructor(t: any, i: any);
    updateData(e: any): void;
    private _prepareWell;
    private _createWell;
    private _getMinHeight;
    private _ellipsoidToLonLat;
    private _createWellWall;
    private _createBottomSurface;
    private _switchExcavate;
    private _updateExcavateDepth;
    /**
     * 清除
     */
    clear(): void;
}
