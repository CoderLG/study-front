import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class JBPointRender extends RenderObject {
    _positions: any[];
    _svgStr: any;
    ent: any;
    _image: string;
    _appearance: Cesium.MaterialAppearance;
    _label: any;
    _rectangleInstance: any;
    _labelCollect: any;
    _objE: HTMLDivElement;
    svgCode: string;
    billboard: any;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 绘制billboard
     * @param data
     */
    renderByBillboard(data: any): void;
    /**
     * 栅格方式渲染
     * @param data
     */
    renderByGrid(data: any): void;
    /**
     * 创建Appearence
     */
    createAppearence(): Cesium.PerInstanceColorAppearance;
    /**
     * 矢量形式渲染
     * @param data
     */
    renderByVector(data: any): void;
    /**
     * 通过军标码加载
     * @param data
     */
    JBLoad(data: any): void;
    /**
     * 分析threejs svgLoader解析后的svg数据
     * @param shape
     * @param data
     */
    analysis(shape: any, data: any): void;
    /**
     *
     * @param holesRes 多边形边框
     * @param height 整体高度
     * @param extrudedHeight 挤压高度
     * @param color 边框色
     * @param holes 洞
     * @param holesColor 洞的颜色
     */
    createVector(holesRes: any, height: any, extrudedHeight: any, color: any, holes?: any, holesColor?: any): void;
    /**
     * 计算点标洞口位置信息
     * @param holes
     * @param position
     */
    calcholes(holes: any, position: any): any;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    updateHole(holes: any, color: any): any;
    modifySvg(code: any, color: any, strokeWidth: any, strokeColor: any, callback: any): void;
    parseDom(arg: any): NodeListOf<Element>;
    getSVG(): string;
    exportSVG(svg: any): string;
    clear(): void;
}
