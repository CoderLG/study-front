import { GeoCanvas } from "../Viewer/GeoCanvas";
import { MapSheet } from "./MapSheet";
/**
 * 场景配置类枚举
 */
export declare enum WeatherEnmu {
    /**
     * 关闭天气
     */
    None = 0,
    /**
     * 开启雨
     */
    Rain = 1,
    /**
     * 开启雪
     */
    Snow = 2
}
/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类 <br>
 * @描述 场景配置类：管理 雨，雪，经纬网 <br>
 * @see <a href='../../../examples/gallery/editor.html#jingWeiWang'>经纬网</a>
 * @see <a href='../../../examples/gallery/editor.html#weather_snow_rain'>雨雪</a>
 *  ```
 *  示例代码：
 *  var viewer = new GV.GeoCanvas('GEOVISContainer', {
 *       sceneOptions:{
 *           graticule:true,
 *           weather:GV.WeatherEnmu.Rain
 *       }
 *   });
 * ```
 */
export declare class SceneOptions {
    /**
     * 地理画布
     */
    private viewer;
    /**
     * 天气
     */
    private sky;
    /**
     * 经纬网
     */
    private jingwei;
    private _graticule;
    /**
     * 太阳产生阴影
     */
    private _shadowFlag;
    /**
     * 图幅编码
     */
    private _mapSheet;
    private _tufu;
    /**
    * 设置或获取控制经纬网字段
    * ```
    * 示例代码：
    * viewer.sceneOptions.graticule = true
    * ```
    */
    graticule: Boolean;
    private _weather;
    shadowFlag: boolean;
    /**
     * 设置或获取控制天气字段
     * ```
     * 示例代码：
     * viewer.sceneOptions.weather = WeatherEnmu.Rain
     * ```
     */
    weather: WeatherEnmu;
    /**
     * 国际图幅编码
     */
    readonly mapSheet: MapSheet;
    /**
    * 获取地图投影
    * ```
    * 示例代码：
    * let projection = viewer.sceneOptions.mapProjection;
    * ```
    */
    readonly mapProjection: string;
    /**
     * 创建场景配置类
     * @param viewer 地理画布
     * @param options 场景配置对象
     */
    constructor(viewer: GeoCanvas, options: Object);
}
