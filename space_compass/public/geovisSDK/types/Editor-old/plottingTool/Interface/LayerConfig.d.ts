/**
 * 图层配置参数
 */
export interface LayerConfig {
    /**
     * 图层Id
     */
    layerId: string;
    /**
     * 标绘完是否编辑
     */
    editAfterCreate: boolean;
    /**
     * 是否只读，只读不能拾取编辑
     */
    isReadOnly: boolean;
    baseJbUrl: string;
}
