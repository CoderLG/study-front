/**
 * 空间碎片内部使用类
 */
export declare class SpaceDebrisItem {
    _currentTime: Date;
    _sampleProperty: Cesium.SampledPositionProperty;
    _currentPosition: any;
    point: Cesium.PointPrimitive;
    tle1: string;
    tle2: string;
    worker: Worker;
    id: number;
    currentTime: Date;
}
