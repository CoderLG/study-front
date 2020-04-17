/**
 * 三角网绘制
 */
export declare class GxPrimitiveTriangles {
    private vertexShader;
    private fragmentShader;
    private viewer;
    private positionArr;
    private colorArr;
    private indiceArr;
    /**
     * 通过参数组成的Geomerty
     */
    geometry: Cesium.Geometry;
    /**
     * 三角网Appearance
     */
    appearance: Cesium.Appearance;
    /**
     * 构造函数
     * @param viewer  球
     * @param Cartesians 位置数组,三个点构成一个面
     * @param Colors  颜色数组,长度必须为Cartesians的4倍[1][1][1][0],4位为一个顶点的颜色
     */
    constructor(viewer: Cesium.Viewer, Cartesians: Array<Cesium.Cartesian3>, Colors: Array<number>);
    private CreateGeometry;
    private CreateAppearence;
    private getVS;
    private getFS;
}
