import EditorRectangle from '../Polygon/EditorRectangle';
/**
 * 点军标，贴地模式
 * @private
 */
export default class EditorJBPointObject extends EditorRectangle {
    private svgStr;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    /**
       * 根据屏幕移动修改heading
       * @param start
       * @param end
       */
    rotateByHeading(start: Cesium.Cartesian2, end: Cesium.Cartesian2): void;
    modifySvg(imgUrl: any, color: any): Promise<string>;
    cesiumRgb2Hex(rgb: any): string;
    exportSVG(svg: any): string;
}
