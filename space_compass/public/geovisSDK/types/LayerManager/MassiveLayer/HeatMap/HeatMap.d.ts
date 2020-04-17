import { GeoCanvas } from '../../../Viewer/GeoCanvas';
/**
 * @类别 需要用户创建的类</br>
 * @描述 热力图</br>
 * @see <a href='../../../examples/gallery/editor.html#heatMap'>热力图</a>
 */
export declare class HeatMap {
    private _viewer;
    private _heatMapOption;
    private _heatMapLayer;
    private _zoomLevel;
    private _zoomRadius;
    private _zAxisHeight;
    private _heatMapParams;
    private _moveEnd;
    constructor(heatOpt: HeatMapOpt);
    private _calcBound;
    private _formatPoints;
    private _updateFllowCamera;
    /**
     * 初始化
     * @param viewer
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 获取热力图参数信息
     */
    getHeatMapOpt(): any;
    /**
     * 热力图更新
     * @param opt
     */
    update(opt: HeatMapOpt): void;
    /**
     * 创建热力图
     * @param opt
     */
    private _create;
    /**
     * 销毁热力图
     */
    destroyItem(): void;
}
/**
 * @类别 需要用户创建的类 </br>
 * @描述 热力图参数类 </br>
 * @see <a href='../../../examples/gallery/editor.html#heatMap'>热力图</a>
 */
export declare class HeatMapOpt {
    /**
     * 热力点数据集 </br>
     * 参数格式：[{经度：数字，纬度：数字，此位置上的数据值：数字}...] </br>
     * 如：{lon:80,lat:40,value:90}
     */
    points: any;
    /**
     * 每个数据点将具有的半径 </br>
     * 默认值：10 </br>
     * 范围：>0 && <=100
     */
    radius: number;
    /**
     * 数据集下限
     */
    limitMin: number;
    /**
     * 数据集上限
     */
    limitMax: number;
    /**
     * 表示渐变的对象（语法：数字字符串[0,1]：颜色字符串） </br>
     * 如：{ 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" }
     */
    gradient: object;
    /**
     * 热图中最高值的最大不透明度。（如果设置了不透明度，将被覆盖） </br>
     * 范围：>=0 && <=1
     */
    opacity: number;
    /**
     * 将应用于所有数据点的模糊因子。模糊因子越高，渐变越平滑 </br>
     * 范围：>=0 && <= 1
     */
    blur: number;
    constructor(points: any, radius: number, limitMin: number, limitMax: number, gradient?: object, opacity?: number, blur?: number);
}
