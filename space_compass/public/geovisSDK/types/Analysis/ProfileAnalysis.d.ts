export declare class ProfileAnalysis {
    private _viewer;
    private _measureDistance;
    constructor(viewer: any);
    /**
     * 开启剖面分析
     * @param callback 回调函数
     */
    open(callback: Function): void;
    /**
     * 关闭剖面分析
     */
    close(): void;
}
