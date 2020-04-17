import Graph from '../Graph';
/**
  * @private
  */
export default class EditorText extends Graph {
    maxPointNum: number;
    minPointNum: number;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    /**
       * 放大缩小
       * @param start
       * @param end
       */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}
