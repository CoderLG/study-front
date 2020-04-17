export declare class HeightAnalyze {
    viewer: any;
    config: any;
    _layer: any;
    _points: any[];
    /**
     * 通视分析构造函数
     * @method constructor
     * @param viewer Cesium.Viewer 对象
     *
     */
    constructor(viewer: any);
    color: any;
    /**
    * @method height
      * 高度值
    *
    *  示例代码
    * ```
    *  var heightAnalyze = viewer.analysis.heightAnalyze;
    *  heightAnalyze.height = 400;
    *  heightAnalyze.open();
    * ```
    *
      */
    height: number;
    /**
     * 坐标点
     * @method setPolygon
     * @param points 经纬度点坐标，格式:[经度,纬度,高度]
     * 示例代码
     * ```
     *  var heightAnalyze = viewer.analysis.heightAnalyze;
     *   heightAnalyze.height = 400;
     *   heightAnalyze.setPolygon([
     *            109.0349381448271,34.31717633782572,386.9231637517154,109.03900961665003,
     *            34.321847375754345,397.67154065059685,
     *            109.03346632153671,34.326639657406226,395.4792360496345,
     *            109.03144059631933,34.32489928901451,390.96019381390937,
     *            109.0311066948082,34.323485025163286,388.67673695624234,
     *            109.03229719685534,34.31991103654269,385.82666822350035,
     *            109.03358048811168,34.31842706237503,386.4791369856086,
     *            109.03433018158603,34.31771892610954,387.5863231772101
     *        ]);
     *  heightAnalyze.open();
     * ```
     *
     */
    setPolygon(points: Array<Number>): void;
    /**
    * 开始分析
    * @method open
    * @return
    */
    open(): void;
    /**
       * 结束视域分析
       * @method close
       */
    close(): void;
    private updateLayer;
    private creategeometry;
}
