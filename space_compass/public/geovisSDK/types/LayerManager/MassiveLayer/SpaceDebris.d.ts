import { Item } from "../../Core/Item";
import { GeoCanvas } from "../../Viewer/GeoCanvas";
/**
 * @类别 需要用户创建的类 <br>
 * @描述 空间碎片 <br>
 * @see <a href='../../../examples/gallery/editor.html#debris'>空间碎片</a>
 */
export declare class SpaceDebris extends Item {
    private root;
    private workerArray;
    private derbrisList;
    private debrisMap;
    private viewer;
    private spaceDebrisOpts;
    /**
     * 空间碎片构造函数
     * @param spaceDebrisOpts 空间碎片数组对象
     * ```
     * 示例代码
     *   fetch("../data/satellite.json").then(r => {
     *          r.json().then(data => {
     *               var spaceDebrisData = [];
     *               var length = data.length;
     *               for (var i = 0; i < length; i++) {
     *                   var item = data[i];
     *                   var opt = new GV.SpaceDebrisOpt();
     *                   opt.name = item.name;
     *                   opt.tle1 = item.tle1;
     *                   opt.tle2 = item.tle2
     *                   spaceDebrisData.push(opt);
     *               }
     *               var spaceDebris = new GV.SpaceDebris(spaceDebrisData);
     *               viewer.layerManager.massiveLayer.add(spaceDebris);
     *               spaceDebris.show();
     *           })
     *   })
     * ```
     */
    constructor(spaceDebrisOpts: Array<SpaceDebrisOpt>);
    /**
     * 初始化空间碎片
     * @param viewer 地理画布
     */
    initItem(viewer: GeoCanvas): void;
    /**
     * 销毁空间碎片
     */
    destroyItem(): void;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 序列化
     */
    toJson(): object;
    /**
     * 反序列化
     */
    parseJson(): void;
    /**
     * 多线程work脚本URL
     */
    private workerUrl;
    /**
     * 显示空间碎片
     */
    show(): void;
    private addDebrisItem;
}
/**
 * 空间碎片构造参数类，卫星数据json格式需要正确
 */
export declare class SpaceDebrisOpt {
    /**
     * 名称
     */
    name: string;
    /**
     * 卫星数据数组1
     */
    tle1: string;
    /**
     * 卫星数据数组2
     */
    tle2: string;
}
