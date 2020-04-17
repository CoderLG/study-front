import { RenderObject, RenderTypeEnum } from "./RenderObject";
export declare class WeatherParticle extends RenderObject {
    private _rainVelocity;
    private _snowVelocity;
    readonly renderType: RenderTypeEnum;
    /**
     * 初始化方法
     */
    init(): void;
    /**
     * 属性更新
     */
    updateAttribute(attrName: any): void;
    /**
     * 创建粒子系统
     * @returns
     */
    private createParticle;
    /**
     * 创建雪的发生器矩阵
     */
    private computeEmitterMatrix;
    /**
     * 更新函数
     * @param {any} 粒子对象
     */
    private updateParticle;
    clear(): void;
}
