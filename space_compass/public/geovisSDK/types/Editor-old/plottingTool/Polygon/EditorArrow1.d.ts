import EditorPolygon from './EditorPolygon';
/**
  * @private
  */
export default class EditorArrow1 extends EditorPolygon {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): Cesium.Cartesian3[];
}
