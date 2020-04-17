import { TargetStyle } from "./TargetStyle";
import { TargetState } from "./TargetState";
import { Item } from "../../Core/Item";
import { GeoPoint } from "../../Utils/GeoPoint";
import { TargetPath } from './TargetPath';
import { TargetFlame } from "./TargetFlame";
import { TimePositions } from "./TimePositions";
export declare class TargetItem extends Item {
    _model: any;
    _label: any;
    _point: any;
    _line: any;
    _billbord: any;
    _canvasLine: any;
    _lineBillboard: any;
    _data: any;
    _position: Cesium.Cartesian3;
    _geoPoint: GeoPoint;
    _flag: TargetState;
    _pedding: boolean;
    _style: TargetStyle;
    _timePosition: TimePositions;
    _angle: number;
    _parentLayer: any;
    _init: boolean;
    _type: string;
    _smoothTrack: boolean;
    _inview: boolean;
    _timeArray: any[];
    _time: string;
    _speed: number;
    _show: boolean;
    _isSelected: boolean;
    _showLabel: boolean;
    _labelInit: boolean;
    _showModel: boolean;
    _modelInit: boolean;
    _backwardPath: any;
    _forewardPath: any;
    _flame: any;
    /**
    * TargetItem 构造函数
    * @param id 目标对象的id
    * @param lon 目标对象的经度
    * @param lat 目标对象的纬度
    * @param alt 目标对象的高度
    * @param smoothTrack 是否需要平滑
    * ```
    * 示例代码
    *  let item = new GV.TargetItem('gb324244234sdf432',113.654,36.542.6921,true)
    * ```
    */
    constructor(id: string, lon: number, lat: number, alt: number, smoothTrack?: boolean, showTrackLine?: boolean);
    readonly forewardPath: TargetPath;
    readonly backwardPath: TargetPath;
    readonly flame: TargetFlame;
    showLabel: boolean;
    showModel: boolean;
    /**
    * 目标的类型编码
    * @method styleCode
    *
    * ```
    * 示例代码
    * var itemTypecode = targetItem.styleCode ;
    * ```
    */
    styleCode: string;
    /**
    * 目标的类型编码
    * @method flag
    *
    * ```
    * 示例代码
    * var flag = targetItem.flag;
    * ```
    */
    flag: TargetState;
    /**
     * 目标是否显示
     * @method flag
     *
     * ```
     * 示例代码
     * var show = targetItem.show;
     * ```
     */
    show: boolean;
    /**
     * 是否需要平滑目标
     * @method smoothTrack
     *
     * ```
     * 示例代码
     * var flag = targetItem.smoothTrack = true;
     * ```
     */
    smoothTrack: boolean;
    /**
    * 目标的样式
    * @method style
    *
    * ```
    * 示例代码
    * var style = targetItem.style;
    * ```
    */
    style: TargetStyle;
    /**
     * 目标颜色,css颜色值
     * @method updatePosition
     * @param lon 经度
     * @param lat 纬度
     * @param alt 高度
     * @param delay 延迟时间,单位秒
     *
     * ```
     * 示例代码
     * targetItem.updatePosition(113.254,36.254,10000);
     * targetItem.updatePosition(113.254,36.254,10000,10);
     * ```
     */
    updatePosition(lon: number, lat: number, alt: number, delay?: number): void;
    setColor(pcolor: any): void;
    /**
     * 目标的名称
     * @method name
     *
     * ```
     * 示例代码
     * targetItem.name="RED";
     * ```
     */
    name: string;
    /**
    * 目标颜色,css颜色值
    * @method color
    *
    * ```
    * 示例代码
    * targetItem.color="RED";
    * targetItem.color="#FF0000";
    * ```
    */
    color: string;
    /**
     * 目标大小
     * @method iconSize
     *
     * ```
     * 示例代码
     * targetItem.iconSize=24;
     * ```
     */
    iconSize: number;
    /**
    * 目标大小
    * @method iconSize
    *
    * ```
    * 示例代码
    * targetItem.iconSize=24;
    * ```
    */
    fontbgColor: string;
    /**
     * 目标是否选中
     * @method isSelected
     *
     * ```
     * 示例代码
     * targetItem.isSelected = true;
     * ```
     */
    isSelected: boolean;
    /**
     * 目标角度
     * @method angle
     *
     * ```
     * 示例代码
     * targetItem.angle=105;
     * ```
     */
    angle: number;
    /**
     * 目标的时间
     * @method time
     *
     * ```
     * 示例代码
     * var time = targetItem.time ;
     * ```
     */
    time: string;
    /**
     * 目标的速度
     * @method speed
     *
     * ```
     * 示例代码
     * var speed = targetItem.speed ;
     * ```
     */
    speed: number;
}
export declare class TrackLineOption {
    /**轨迹点个数 */
    points: Array<Cesium.Cartesian3>;
    /**轨迹线颜色 */
    color: Cesium.Color;
    /**轨迹线宽度 */
    width: number;
    /**轨迹点个数 */
    count: number;
    /**轨迹线是否可见 */
    show: boolean;
}
