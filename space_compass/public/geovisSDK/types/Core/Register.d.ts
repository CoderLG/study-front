declare class Register {
    _registerList: Map<ItemBaseTypeE, Map<string, any>>;
    constructor();
    /**
     * 注册Item
     * @param type 注册类型
     * @param itemConstructor 注册对象
     */
    REGISTER(type: ItemBaseTypeE, itemConstructor: any): void;
    /**
     * 根据类型获取构造器
     * @param type 类别
     * @param itemType item类型
     */
    GET_CONSTRUCTOR(type: ItemBaseTypeE, itemType: string): any;
    GET_REGISTER_LIST(): Map<ItemBaseTypeE, Map<string, any>>;
}
declare enum ItemBaseTypeE {
    /**
     * 影像基类
     */
    ImageItem = "ImageItem",
    /**
     * 几何体基类
     */
    GraphicItem = "GraphicItem",
    /**
     * 高效绘制基类
     */
    EfficentItem = "EfficentItem",
    /**
     * 瓦片基类
     */
    TileItem = "TileItem"
}
declare const gRegister: Register;
