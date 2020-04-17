export declare class TargetFlame {
    _target: any;
    _init: boolean;
    particleSystem: any;
    emitterModelMatrix: Cesium.Matrix4;
    translation: Cesium.Cartesian3;
    rotation: Cesium.Quaternion;
    hpr: Cesium.HeadingPitchRoll;
    trs: Cesium.TranslationRotationScale;
    _show: boolean;
    _earth: any;
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
    constructor(target: any);
    applyGravity(p: any, dt: any): void;
    init(): void;
    /**
     *飞机尾焰是否显示
     * @method showTrack
     *
     * ```
     * 示例代码
     * var show = targetItem.flame.show;
     * targetItem.flame.show = true ;
     * ```
     */
    show: boolean;
    updateFlame(): void;
    computeEmitterModelMatrix(): Cesium.Matrix4;
    dispose(): void;
}
