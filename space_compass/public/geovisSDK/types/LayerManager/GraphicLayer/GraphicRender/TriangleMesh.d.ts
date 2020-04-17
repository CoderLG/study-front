import { RenderObject, RenderTypeEnum } from "./RenderObject";
declare class TriangleMesh extends RenderObject {
    _indices: number[];
    readonly renderType: RenderTypeEnum;
    _triPrimitive: any;
    _viewer: any;
    _points: Array<number>;
    _color: string;
    init(): void;
    create(): void;
    formatData(): {
        points: number[];
        indices: number[];
        colors: Float32Array;
    };
    /**
     *
     * @param {*} inputs      // minX,minY,maxX,maxY,png[string/url]
     * @param {*} callback  // instance obj
     */
    draw_triangles(inputs: any, callback: any): void;
    getVS(): string;
    getFS(): string;
    createAppearance(): Cesium.Appearance;
    clear(): void;
    update(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
}
export { TriangleMesh };
