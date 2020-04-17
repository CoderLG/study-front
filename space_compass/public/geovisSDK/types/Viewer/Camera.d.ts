import { GeoCanvas } from "./GeoCanvas";
import { GeoPoint } from "../Utils/GeoPoint";
import { ViewPoint } from "../Utils/ViewPoint";
/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 GEOVIS Camera 视口操作器 </br>
 *  提供了视口操作的通用接口，支持绕点旋转定位飞行等功能</br>
 * @see <a href='../../../examples/gallery/editor.html#rotate'>旋转</a>
 * @see <a href='../../../examples/gallery/editor.html#zoom'>缩放</a>
 * @see <a href='../../../examples/gallery/editor.html#rotateByCurrent'>原地观测</a>
 * @see <a href='../../../examples/gallery/editor.html#pitch'>俯仰</a>
 * @see <a href='../../../examples/gallery/editor.html#fly'>视角飞行</a>
 * @see <a href='../../../examples/gallery/editor.html#rotateByPoint'>绕点观测</a>
 * @see <a href='../../../examples/gallery/editor.html#flyHome'>视角飞回</a>
 */
export declare class Camera {
    private _viewer;
    private _viewPoint;
    private _home;
    private _moveEnd;
    private _moveStart;
    private _changed;
    private _timeExection;
    /**
     * 在创建GeoCanvas后通过viewer.iCamera调用
     * ```
     * 示例代码
     *  let viewer = new GV.GeoCanvas('geoCanvas')
     *  viewer.iCamera
     * ```
     */
    constructor(viewer: GeoCanvas);
    /**
     * 相机移动过程结束时所执行操作
     * @return
     *  ```
     * 示例代码：
     *viewer.iCamera.moveEnd.addEventListener(function(){
     *      console.log("moveEnd")
     * })
     * ```
     */
    readonly moveEnd: Cesium.Event;
    /**
     * 相机移动过程开始时所执行操作
     * @return
     *  ```
     * 示例代码：
     * viewer.iCamera.moveStart.addEventListener(function(){
     *      console.log("moveStart")
     * })
     * ```
     */
    readonly moveStart: Cesium.Event;
    /**
     * 相机变动时所执行操作
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.changed.addEventListener(function(){
     *      console.log("changed")
     * })
     * ```
     */
    readonly changed: Cesium.Event;
    /**
     * 获取视角点信息
     * @return
     * ```
     * 示例代码：
     * let viewPoint = viewer.iCamera.viewPoint;//获取当前相机视角信息
     * ```
     */
    readonly viewPoint: ViewPoint;
    /**
     * 设置或获取home视角
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.home = new GV.ViewPoint(104,33,15139621,360,-89,0)//设置home视角信息
     * let home = viewer.iCamera.home;//获取home视角信息
     * ```
     */
    home: ViewPoint;
    private _getCameraCenter;
    private _getCameraTransform;
    /**
     * 飞行到某一视角点
     * @param viewPoint 视角点信息
     * @param duration 飞行周期（单位：秒）（范围：>0 && <=10）
     * @param completeCallbak 飞行完成时回调函数
     * @param cancelCallback 飞行取消时回调函数
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.flyTo(new GV.ViewPoint(80,33,5000,360,-89,0),2,function(){
     *      console.log('complete')
     * })
     * ```
     */
    flyTo(viewPoint: ViewPoint, duration?: number, completeCallbak?: any, cancelCallback?: any): void;
    /**
     * 飞行到某一矩形区域
     * @param minlon 矩形区域最小经度
     * @param maxlon 矩形区域最大经度
     * @param minlat 矩形区域最小纬度
     * @param maxlat 矩形区域最大纬度
     * @param duration 飞行周期（单位：秒）（范围：>0 && <=10）
     * @param completeCallbak 飞行完成时回调函数
     * @param cancelCallback 飞行取消时回调函数
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.flyToRect(110,118,30,40,2,function(){
     *      console.log('complete')
     * })
     * ```
     */
    flyToRect(minlon: number, maxlon: number, minlat: number, maxlat: number, duration?: number, completeCallbak?: any, cancelCallback?: any): void;
    /**
     * 获取当前地图层级(二维时为有效瓦片层级，三维时为请求的第一个瓦片的层级)
     */
    readonly currentLevel: Number;
    /**
     * 飞回主视角
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.flyToHome()
     * ```
     */
    flyToHome(): void;
    /**
     * 俯仰
     * @param degree 度数 范围： >=-90 && <=90
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.pitch(-30)
     * ```
     */
    pitch(degree: number): void;
    /**
     * 旋转
     * @param degree 度数  范围：>=-360 && <=360
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.rotate(-30)
     * ```
     */
    rotate(degree: number): void;
    /**
     * 原地观测
     * @param duration 观测一周所用时间（单位：s）（范围：>0 && <= 360）
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.lookCenter(20)
     * ```
     */
    lookCenter(duration?: number): void;
    /**
     * 绕点观测
     * @param geoPoint
     * @param duration 观测一周所用时间（单位：s） （范围：>=0 && <=360）
     * @param distance 观测点和相机间的距离
     * @param pitch 俯仰度数
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.lookAround({lon:112,lat:40,alt:50000})
     * ```
     */
    lookAround(geoPoint: GeoPoint, duration?: number, distance?: number, pitch?: number): void;
    /**
     * 停止观测
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.lookStop()
     * ```
     */
    lookStop(): void;
    /**
     * 放大
     * @param rate 速率 范围：>=-360 && <=360
     * @return
     * ```
     * 示例代码：
     * viewer.iCamera.zoom(10)
     * ```
     */
    zoom(rate?: number): void;
}
