import EditorPolyline from './EditorPolyline';
/**
  * @private
  */
export default class EditorCircleArc extends EditorPolyline {
    maxPointNum: number;
    minPointNum: number;
    constructor(props: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}
