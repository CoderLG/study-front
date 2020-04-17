import EditorRectangle from '../Polygon/EditorRectangle';
/**
 * @private
 */
export default class EditorImage extends EditorRectangle {
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    /**
      * 根据屏幕移动修改heading
      * @param start
      * @param end
      */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    initShape(): void;
}
