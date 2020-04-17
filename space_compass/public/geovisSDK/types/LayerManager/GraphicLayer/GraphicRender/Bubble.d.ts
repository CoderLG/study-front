import { RenderObject } from "./RenderObject";
import { BubbleGraphic } from "../GraphicItem/BubbleGraphic";
/**
 * 标牌
 * ```
 * 示例代码：
 * let geoBubble = new GV.Bubble()
 *
 * ```
 */
export declare class Bubble extends RenderObject {
    _rootNode: HTMLDivElement;
    _parentNode: HTMLDivElement;
    _panelNode: HTMLDivElement;
    _lineNode: HTMLDivElement;
    _rootClass: string;
    _parentClass: string;
    _lineClass: string;
    _panelClass: string;
    _show: boolean;
    _bindObject: any;
    _container: any;
    _isMouseDown: boolean;
    _downX: number;
    _downY: number;
    _bottomX: number;
    _bottomY: number;
    _offset: any;
    _position: any;
    _panelStyle: string;
    _lineStyle: string;
    _lineStart: any;
    _offsetX: number;
    _offsetY: number;
    _type: any;
    _renderVisible: boolean;
    _bubbleEvent: () => void;
    _entity: any;
    _convertData: BubbleGraphic;
    _fnDown: any;
    _fnUp: (e: any) => void;
    _fnMove: (e: any) => void;
    _fnStart: (e: any) => void;
    _fnTMove: (e: any) => void;
    _fnEnd: (e: any) => void;
    init(): void;
    /**
     * 创建DOM方法
     */
    private _createDom;
    /**
     * 获取DOM
     */
    private _getDom;
    private _checkItem;
    private _render;
    private _renderShow;
    /**
     * 渲染前回调函数
     */
    private _preRender;
    _updateVisible(): void;
    _getBounds(): {
        minlon: number;
        minlat: number;
        maxlon: number;
        maxlat: number;
    };
    _mouseDown(e: any): void;
    _mouseMove(e: any): void;
    _mouseUp(e: any): void;
    _touchStart(e: any): void;
    _touchMove(e: any): void;
    _touchEnd(e: any): void;
    /**
     * 计算锚点
     */
    _calcluteBindPoint(): Cesium.Cartesian2;
    /**
     * 设置moveDiv的位置 防止位置超出范围
    */
    _setMoveDivPosition(x: any, y: any): void;
    _display(val: any): void;
    /**
     * 移除DOM元素
     * @param _element
     */
    _removeElement(_element: any): void;
    /**
     * 事件绑定
     */
    private _bindEvent;
    /**
     * 事件移除
     */
    _removeEvent(): void;
    clear(): void;
    /**
     * 计算线的旋转位置
     * @param object
     * @param bindNode
     */
    private _rotateLine;
    /**
     * 更新全部属性
     */
    update(): void;
    /**
     * 更新属性
     * @param attrName 属性名
     */
    updateAttribute(attrName: any): void;
}
