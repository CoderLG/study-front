/**
 * @类别 需要用户创建的类
 * @描述 视角点
 */
export declare class ViewPoint {
    /**
     * 经度
     */
    lon: number;
    /**
     * 纬度
     */
    lat: number;
    /**
     * 高度
     */
    alt: number;
    /**
     * 顺/逆时针旋转角度   范围: >=0 && <=360 (如果为负值会转换成相对应的正向角度数，如：-30 =》 330)
     */
    heading: number;
    /**
     * 俯仰   范围：>=-90 && <=90
     */
    pitch: number;
    /**
     * 旋转   范围：>=0 && <=360
     */
    roll: number;
    constructor(lon: number, lat: number, alt?: number, heading?: number, pitch?: number, roll?: number);
    /**
     * viewPoint转换成数组
     * @param viewPoint 视角点
     * @return
     * ```
     * 示例代码:
     * let viewPoint = new GV.ViewPoint(100,20,500000)
     * let pack = GV.ViewPoint.pack(viewPoint)
     * ```
     */
    static pack(viewPoint: any): Array<number>;
    /**
     * 数组转换成viewPoint
     * @param arr 数组
     * @return
     *  ```
     * 示例代码:
     * let arr = [100,20,500000,-90,0,0]
     * let pack = GV.ViewPoint.unpack(arr)
     * ```
     */
    static unpack(arr: any): ViewPoint;
}
