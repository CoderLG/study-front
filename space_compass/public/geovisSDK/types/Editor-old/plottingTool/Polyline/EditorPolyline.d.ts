import Graph from '../Graph';
/**
  * @private
  */
export default class EditorPolyline extends Graph {
    minPointNum: number;
    constructor(prop: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    calcuteShape(points: any, time: any): any;
    /**
    * @private
    * @param ctl
    */
    handleNewCtl(ctl: any): void;
    toEdit(): void;
    private lasPoints;
    finish(): void;
}
