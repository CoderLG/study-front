export declare class Item {
    protected _name: string;
    protected _id: any;
    /**
     * 对象名称不需要修改
     * ```
     * 示例代码
     * item.name = 'itemName'
     * ```
     */
    name: string;
    /**
     * 对象id不允许用修改全局唯一初始化传入或自动生成
     * ```
     * 示例代码:
     * let id = item.id;
     * ```
     */
    readonly id: any;
    /**
     * 获取类型
     */
    getType(): string;
    /**
     * 获取当前对象类型(给类型为只读属性)
     */
    static readonly type: string;
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
    parseJson(json: object): void;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行add方法添加时被调用
     */
    initItem(options: any): any;
    /**
     * @注意 所有item的基类方法,外部无需调用
     * @描述 初始化方法，在父类执行remove方法添加时被调用
     */
    destroyItem(): void;
}
