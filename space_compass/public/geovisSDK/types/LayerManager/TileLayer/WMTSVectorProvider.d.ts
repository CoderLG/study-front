export declare class WMTSVectorProvider {
    protected _url: any;
    protected _layer: any;
    protected _format: any;
    protected _tilematrixset: any;
    protected _style: any;
    protected _version: any;
    protected _minLevel: any;
    protected _maxLevel: any;
    constructor(options: any);
    readonly minLevel: any;
    readonly maxLevel: any;
    requestVectorTile(level: any, x: any, y: any, success: any, failure: any): any;
}
