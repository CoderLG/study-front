import EditorPolyline from './EditorPolyline';
/**
  * @private
  */
export default class EditorBezierSpline extends EditorPolyline {
    constructor(prop: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}
