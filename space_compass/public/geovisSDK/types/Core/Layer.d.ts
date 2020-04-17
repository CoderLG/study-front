import { Event } from './Event';
import { Item } from './Item';
export declare class Layer extends Event {
    protected _itemList: Array<Item>;
    constructor();
    /**
     * 添加对象
     * @param item
     */
    add(item: Item): Item;
    /**
     * 删除对象
     * @param
     */
    remove(itemid: string): Item;
    /**
     * 根据id获得对象
     * @param itemid 对象id
     */
    getItemById(itemid: string): Item;
    /**
     * 根据name获得对象
     * @param itemName 对象名称
     */
    getItemByName(itemName: string): Item;
    toJson(): any[];
    /**
     * 解析json
     * @param json 解析
     */
    parseJson(json: any): void;
    getItemList(): Item[];
}
