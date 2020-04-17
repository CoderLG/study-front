import EditorPointLine from './EditorPointLine';
/**
  * @private
  */
export default class EditorPointSpline extends EditorPointLine {
    constructor(prop: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}
