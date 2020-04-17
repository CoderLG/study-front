import { GeoCanvas } from '../../../Viewer/GeoCanvas';
import { Item } from '../../../Core/Item';
/**
 * @类别 需要用户创建的类 <br>
 * @描述 风场 <br>
 * @see <a href='../../../examples/gallery/editor.html#windy'>风场</a>
 */
export declare class Windy extends Item {
    private _primitives;
    private SPEED_RATE;
    private PARTICLES_NUMBER;
    private MAX_AGE;
    private BRIGHTEN;
    private cesiumViewer;
    private windData;
    private windField;
    private particles;
    private lines;
    private windDataObj;
    /**
     * 风场构造函数
     * @param data 风场数据
     * ```
     * 示例代码
     * fetch("../data/windData.json").then(r => {
     *	 r.json().then(data => {
     *		let windy = new GV.Windy(data);
     *		viewer.layerManager.massiveLayer.add(windy);
     *		// viewer.layerManager.massiveLayer.remove(windy.id);
     *	 })
     * })
     * ```
     */
    constructor(data: Array<Object>);
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 初始化风场
     * @param viewer 地理画布
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 销毁风场
     */
    destroyItem(): void;
    private initWindyData;
    private _init;
    private createField;
    private animate;
    private _parseWindJson;
    private removeLines;
    private _map;
    private _createLineInstance;
    private _drawLines;
    private randomParticle;
}
