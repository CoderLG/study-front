import Graph from '../Graph';
/**
  * @private
  */
export default class EditorRectangle extends Graph {
    maxPointNum: number;
    minPointNum: number;
    constructor(prop: any, viewer: any, layer: any);
    private height;
    initProps(defs: any, containsBorder?: boolean): void;
    initShape(): void;
    private lastPoint;
    calcuteShape(points: Array<Cesium.Entity>, time: any): any;
    toEdit(): void;
    finish(): void;
}
