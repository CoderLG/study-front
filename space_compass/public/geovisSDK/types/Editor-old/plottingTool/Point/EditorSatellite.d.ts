import EditorModel from './EditorModel';
/**
  * @private
  */
export default class EditorSatellite extends EditorModel {
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    calcuteShape(points: any, time: any): any[] | Cesium.Cartesian3;
}
