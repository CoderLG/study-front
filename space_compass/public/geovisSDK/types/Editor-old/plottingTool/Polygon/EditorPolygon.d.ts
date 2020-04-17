import Graph from '../Graph';
/**
  * @private
  */
export default class EditorPolygon extends Graph {
    minPointNum: number;
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}
