/**
 * 天气-雨雪
 * （创建GeoCanvas时自动在SceneOptions类进行实例化，
 * 具体使用方法参见SceneOptions类说明）
 */
export declare class Weather {
    private viewer;
    constructor(viewer: Cesium.Viewer);
    /**
     * 雨雪显示高度
     */
    displayHeight: number;
    private calculateCamera;
    private _rain;
    private _snow;
    /**
     * 显示雨
     */
    showRain(): void;
    /**
     * 关闭雨
     */
    closeRain(): void;
    private getRainShader;
    /**
     * 显示雪
     */
    showSnow(): void;
    /**
     * 关闭雪
     */
    closeSnow(): void;
    private getSnowShader;
}
