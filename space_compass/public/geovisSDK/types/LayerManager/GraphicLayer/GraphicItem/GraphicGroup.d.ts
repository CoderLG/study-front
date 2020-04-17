import { Event } from '../../../Core/Event';
import { GraphicItem } from './GraphicItem';
/**
 * @类型 外部使用类
 * @描述 绘制数据对象组对象提供了绘制数据对象的组管理
 */
export declare class GraphicGroup extends Event {
    protected _type: string;
    private _name;
    private _id;
    private _itemList;
    protected _father: GraphicGroup;
    private _visible;
    private _extendInfo;
    private _renderVisible;
    private _root;
    constructor(jsonObj?: any);
    /**
     * 类型
     */
    static readonly type: string;
    /**
     * 对象名称不需要修改
     * ```
     * 示例代码
     * item.name = 'itemName'
     * ```
     */
    name: string;
    readonly id: any;
    /**
     * 获取父节点
     */
    readonly father: GraphicGroup;
    /**
     * @注意 内部使用无需外部调用
     * @描述 重新计算渲染显隐值
     */
    updateVisible(): void;
    /**
     * 设置整组显隐
     */
    visible: boolean;
    /**
     * 获取整组真实显隐
     */
    readonly renderVisible: any;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: any): void;
    /**
     * @注意 外部无需调用
     * @描述 在父类执行remove方法添加时被调用
     */
    destroy(): void;
    /**
     * 清除所有子节点
     */
    clear(): void;
    readonly children: (GraphicItem | GraphicGroup)[];
    extendInfo: any;
    /**
     * 添加对象
     * @param item
     */
    add(item: GraphicItem | GraphicGroup): GraphicItem | GraphicGroup;
    /**
     * 根据配置添加图形绘制对象
     * @param jsonObj
     */
    addByJson(jsonObj: any): any;
    removeById(itemId: string): GraphicItem | GraphicGroup;
    /**
     * 删除元素
     * @param
     */
    remove(removeItem: GraphicItem | GraphicGroup): GraphicItem | GraphicGroup;
    /**
     * 根据id获得对象
     * @param itemid 对象id
     */
    getById(itemid: string): any;
    /**
     * 根据name获得对象
     * @param itemName 对象名称
     */
    getByName(itemName: string): Array<GraphicGroup | GraphicItem>;
    /**
     * 导出json数据
     */
    toJson(): {
        type: string;
        id: any;
        name: string;
        extendInfo: any;
        children: any[];
    };
    /**
     * @注意 外部无需调用
     * @描述 解析json方法，在父类根据json对象创建节点时调用
     */
    parseJson(json: any): void;
    /**
     *通过json添加子数据(V1.1.2暂时不对外暴露此接口)
     */
    /**
     * 获取graphicLayer
     */
    getRoot(): any;
}
