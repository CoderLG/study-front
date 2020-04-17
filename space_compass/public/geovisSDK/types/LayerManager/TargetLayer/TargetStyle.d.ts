/**
 * 态势样式
 */
export declare class TargetStyle {
    _color: string;
    _pointSize: number;
    _pointLineWidth: number;
    _pointLineColor: string;
    _pointDisplayCondition: Cesium.DistanceDisplayCondition;
    _fontSize: number;
    _fontColor: string;
    _font: string;
    _fontbgColor: string;
    _labelDisplayCondition: Cesium.DistanceDisplayCondition;
    _labelLineColor: string;
    _iconUrl: string;
    _iconSize: number;
    _iconDisplayCondition: Cesium.DistanceDisplayCondition;
    _modelUrl: string;
    _modelDisplayCondition: Cesium.DistanceDisplayCondition;
    _modelMaximumScale: number;
    _modelMinimumPixelSize: number;
    _labeloffsetx: number;
    _labeloffsety: number;
    _trackLineWidth: number;
    _trackLineColor: string;
    _selectedColor: string;
    _showBackground: boolean;
    constructor();
    /**
       * 默认样式
       */
    static DefaultStyle(): TargetStyle;
    /**
     * 颜色
     */
    color: string;
    /**
     * 是否显示背景颜色
     */
    showBackground: boolean;
    /**
     * 高亮颜色
     */
    selectedColor: string;
    /**
     * 点大小
     */
    pointSize: number;
    /**
     * 点描边宽度
     */
    pointLineWidth: number;
    /**
     * 点描边颜色
     */
    pointLineColor: string;
    /**
     * 点可视范围
     */
    pointDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 字体大小
     */
    fontSize: number;
    /**
     * 字体颜色
     */
    fontColor: string;
    /**
     * 字体
     */
    font: string;
    /**
    * 字体背景颜色
    */
    fontbgColor: string;
    /**
     * 标牌可视范围
     */
    labelDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 标牌连线线宽
     */
    labelLineColor: string;
    /**
     * 图标路径,使用白色图片
     */
    iconUrl: string;
    /**
     * 图标大小
     */
    iconSize: number;
    iconDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 模型路径
     */
    modelUrl: string;
    /**
     * 模型可见范围
     */
    modelDisplayCondition: Cesium.DistanceDisplayCondition;
    /**
     * 模型最大缩放比例
     */
    modelMaximumScale: number;
    /**
     * 模型最小显示像素
     */
    modelMinimumPixelSize: number;
    /**
     * 轨迹线宽度
     */
    trackLineWidth: number;
    /**
     * 轨迹线颜色
     */
    trackLineColor: string;
    /**
     * 标牌x轴偏移
     */
    labeloffsetx: number;
    /**
     * 标牌y轴偏移
     */
    labeloffsety: number;
    /**
       * 将样式保存为json
       * @method toJson
       *
       */
    static toJson(style: any): Object;
    /**
      * 加载样式
      * @method fromJson
      * @param style 样式对象
      *
      */
    static fromJson(style: any): TargetStyle;
}
