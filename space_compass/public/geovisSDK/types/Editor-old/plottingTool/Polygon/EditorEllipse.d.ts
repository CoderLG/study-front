import EditorPolygon from './EditorPolygon';
/**
  * @private
  */
export default class EditorEllipse extends EditorPolygon {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    calcuteShape(points: any, time: any): any;
    getDistance(p1: any, p2: any): number;
}
