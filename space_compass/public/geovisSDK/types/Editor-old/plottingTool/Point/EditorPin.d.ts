import Graph from '../Graph';
/**
  * @private
  */
export default class EditorPin extends Graph {
    maxPointNum: number;
    minPointNum: number;
    pinBuilder: Cesium.PinBuilder;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    /**
       * 放大缩小
       * @param start
       * @param end
       */
    scale(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    /**
     * 根据屏幕移动修改heading
     * @param start
     * @param end
     */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    calcuteShape(points: any, time: any): any;
    toEdit(): void;
    finish(): void;
}
