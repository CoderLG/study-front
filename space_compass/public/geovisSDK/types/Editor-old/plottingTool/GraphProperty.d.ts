/**
 * 标绘属性列表
 */
export declare class GraphProperty {
    constructor(options: any);
    /**
     * 名称
     */
    name: string;
    /**
     * 标题用于显示
     */
    title: string;
    /**
     * 数据类型,如number:string等
     */
    type: string;
    /**
     * 是否可编辑
     */
    editable?: boolean;
    /**
     * 描述
     */
    description?: string;
    /**
     * 最小值
     */
    min?: number;
    /**
     * 最大值
     */
    max?: number;
    /**
     * 编辑器操作step
     */
    step?: number;
    /**
     * 编辑器是否可见
     */
    visible: boolean;
    /**
     * 最大长度，针对string
     */
    maxLength?: number;
    private _value?;
    /**
  * 值
  */
    value: any;
    /**
     * 值变化事件
     */
    onValueChanged: Function;
}
