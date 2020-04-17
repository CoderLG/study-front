import Graph from '../Graph';
/**
  * @private
  */
export default class EditorJBLine extends Graph {
    minPointNum: number;
    private internalCode;
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    private lasPoints;
    calcuteShape(points: any, time: any): any[];
    toEdit(): void;
    finish(): void;
}
