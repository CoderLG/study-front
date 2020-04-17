import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class WaterEffect extends RenderObject {
    private _fragmentShader;
    private _appearance;
    private _geometry;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
         * 修改片源着色器
         * @return {string} 片源着色器
         */
    private fSWaterFace;
    /**
     * 创建材质
     * @returns  材质
     */
    private createAppearence;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    clear(): void;
    /**
     * 法向量图
     * @return {string} 图片资源
     */
    private normalMap;
}
