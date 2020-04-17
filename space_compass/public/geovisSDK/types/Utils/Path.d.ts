import { Event } from '../Core/Event';
import { GeoPoint } from './GeoPoint';
import { GeoCanvas } from '../Viewer/GeoCanvas';
/**
 * @类别 需要用户创建的类
 * @描述 提供路径回调函数
 */
export declare class Path extends Event {
    _callback: any;
    private _state;
    private _mode;
    private _pathPositions;
    private _startTime;
    private pathData;
    private _viewer;
    private _sampleProperty;
    private pointsData;
    private index;
    private posProperty;
    private _endTime;
    constructor(viewer: GeoCanvas);
    private _start;
    /**
     * 回调函数
     */
    callback: any;
    /**
     * 设置路径
     */
    pathPositions: Array<{
        point: GeoPoint;
        time: number;
    }>;
    /**
     * 开始
     */
    start(): void;
    /**
     * 暂停
     */
    suspend(): void;
    /**
     * 关闭
     */
    stop(): void;
}
export declare enum PathStateEnum {
    /**
     * 正在运行
     */
    Run = "run",
    /**
     * 停止
     */
    Stop = "stop",
    /**
     * 暂停
     */
    Suspend = "suspend"
}
export declare enum PathModeEnum {
    /**
     * 重复
     */
    Loop = "loop",
    /**
     * 一次
     */
    Single = "single"
}
