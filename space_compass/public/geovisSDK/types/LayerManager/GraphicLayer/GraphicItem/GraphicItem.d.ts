import { Item } from "../../../Core/Item";
import { GraphicGroup } from "./GraphicGroup";
import { Event } from "../../../Core/Event";
export declare class GraphicItem extends Item {
    private _renderVisible;
    private _father;
    protected _getRenderObj: any;
    protected _type: any;
    protected _opt: any;
    protected _id: string;
    protected _event: Event;
    constructor(opt: any);
    protected update(): void;
    onUpdateAttribute(callback: any): void;
    offUpdateAttribute(callback: any): void;
    protected updateAttribute(propName: any): void;
    getRenderObject(): any;
    /**
     * @注意 内部使用无需外部调用
     * @描述 重新计算渲染显隐值
     */
    updateVisible(): void;
    /**
     * 对象名称不需要修改
     * ```
     * 示例代码
     * item.name = 'itemName'
     * ```
     */
    name: string;
    /**
     * 对象id为对象的唯一标识（每个对象的id不允许重复）;
     * 由对象初始化时自动生成，也允许对象初始化时传入 ;
     * 对象初始化完成后不允许再次对id进行修改
     * ```
     * 示例代码:
     * let id = item.id;//获取对象id
     * ```
     */
    readonly id: string;
    /**
     * 扩展信息用户可以将自己的数据储存到该参数中支持序列化反序列化
     */
    extendInfo: any;
    /**
     * 显隐控制
     */
    visible: boolean;
    /**
     * 真实显隐
     */
    readonly renderVisible: boolean;
    /**
     * 父节点
     */
    readonly father: GraphicGroup;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
    /**
     * 是否贴地
     */
    readonly clampToGround: boolean;
    /**
     * 当前对象序列化成json数据
     * ```
     * 代码示例:
     * const obj = item.toJson();
     * ```
     */
    toJson(): object;
    /**
     * 解析json对象
     */
    parseJson(option: any): void;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    init(father: GraphicGroup): any;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行remove方法添加时被调用
     */
    destroy(): void;
    /**
     * 获取中心点
     */
    getCenterPosition(): any;
    /**
     * 设置控制点
     */
    movePosition(offsetLon?: number, offsetLat?: number, offsetAlt?: number): void;
}
export declare class GraphicItemOpt {
    /**
     * 名称
     */
    name?: string;
    /**
     * 显隐控制
     */
    visible?: boolean;
    /**
     * 扩展数据信息
     */
    extendInfo?: any;
}
/**
 * 高度参照
 */
export declare enum HeightReferenceEnum {
    /**
     * 完全贴合地面
     */
    ClampToGround,
    /**
     * 高度与地形无关
     */
    None,
    /**
     * 真实高度=地形高度+高度值
     */
    RelativeToGround
}
