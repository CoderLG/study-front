import EditorPin from './EditorPin';
/**
  * @private
  */
export default class EditorEditorJBPointScreen extends EditorPin {
    private svgStr;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
    modifySvg(imgUrl: any, color: any): Promise<string>;
    exportSVG(svg: any): string;
}
