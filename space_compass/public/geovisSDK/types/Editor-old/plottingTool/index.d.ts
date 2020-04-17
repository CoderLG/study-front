import EditMode from './EditMode';
import { LayerConfig } from './Interface/LayerConfig';
import Graph from './Graph';
/**
 * 标绘管理
 */
export default class GraphManager {
    private static _svgCache;
    /**
     * @private
     */
    static readonly svgCache: Map<string, any>;
    static getPng(code: string): any;
    static getJbData(id: string): string;
    /**
     * 脏标记
     */
    private _isChanged;
    readonly isChanged: boolean;
    /**
     * 将脏标记充值为false
     */
    resetChanged(): void;
    /**
     * 对象集合
     */
    graphList: Array<Graph>;
    private layer;
    /**
     * 编辑器
     */
    editor: EditMode;
    private config;
    private viewer;
    /**
    * @private
    */
    static baseJbUrl: string;
    /**
     *
     * @param viewer a
     * @param config 1
     */
    constructor(viewer: Cesium.Viewer, config: LayerConfig);
    /**
      * @private
      */
    start(): void;
    /**
      * @private
      */
    destroyHandler(): void;
    /**
     * 开始绘制
     * @param  json  不含控制点的对象
     */
    create(json: any): any;
    /**
     * 根据控制点绘制
     *
     * @param 含控制点的对象
     */
    draw(json: any): any;
    /**
      * @private
      */
    findById(id: any): Graph;
    /**
      * @private
      */
    findByType(type: any): Graph;
    /**
     * 删除
     * @param graph
     */
    delete(graph: Graph): void;
    /**
     * 清空
     */
    clean(): void;
    /**
     * 删除所有
     */
    deleteAll(): void;
    /**
     *
     * @param jsons 加载
     */
    load(jsons: any): void;
    /**
     * 保存
     */
    save(): any[];
    createObj(json: any): any;
    private createObj0;
    private createJb;
}
