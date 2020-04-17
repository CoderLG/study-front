/**
 * @注意 用户不需要示例化
 * @描述 线样式基类
 */
export declare class BaseLineStyle {
    protected _material: any;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): void;
    /**
     * @注意 内部实现使用
     */
    getMaterial(): any;
}
/**
 * @注意  内部使用
 * @描述 线样式构造器
 */
export declare class LineStyle {
    static createStyle(opt: any): ColorStyle | ArrowStyle | OutlineStyle | DashStyle | GlowStyle | DynamicStyle;
}
/**
 * 颜色样式
 */
export declare class ColorStyle extends BaseLineStyle {
    private _color;
    constructor(any: any);
    /**
     * 颜色
     */
    color: any;
    /**
     * @注意
     */
    getMaterial(): any;
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
    };
}
/**
 * 箭头
 */
export declare class ArrowStyle extends BaseLineStyle {
    private _color;
    constructor(any: any);
    /**
     * 颜色
     */
    color: any;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
    };
}
/**
 * 外边框线
 */
export declare class OutlineStyle extends BaseLineStyle {
    private _color;
    private _outlineWidth;
    private _outlineColor;
    constructor(any: any);
    /**
     * 颜色
     */
    color: string;
    /**
     * 外边框宽度
     */
    outlineWidth: number;
    /**
     * 外边框颜色
     */
    outlineColor: string;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
        outlineColor: string;
        outlineWidth: number;
    };
}
/**
 * 虚线
 */
export declare class DashStyle extends BaseLineStyle {
    private _color;
    private _gapColor;
    private _dashLength;
    private _dashPattern;
    constructor(any: any);
    /**
     * 颜色
     */
    color: string;
    /**
     * 中间颜色
     */
    gapColor: string;
    /**
     * pixel中的虚线模式的长度
     */
    dashLength: number;
    /**
     * 短划线16位模式
     */
    dashPattern: number;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
        gapColor: string;
        dashPattern: number;
        dashLength: number;
    };
}
/**
 * 发光线
 */
export declare class GlowStyle extends BaseLineStyle {
    private _color;
    private _glowPower;
    private _taperPower;
    constructor(any: any);
    /**
     * 颜色值
     */
    color: string;
    /**
     * 发光强度占总线宽的百分比
     */
    glowPower: number;
    /**
     * 指定逐渐减小效果的强度，以总线长度的百分比表示。如果为1.0或更高，则不使用锥度效果。
     */
    taperPower: number;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: PolylineStyleEnum;
        color: string;
        taperPower: number;
        glowPower: number;
    };
}
/**
 * 动态线
 */
export declare class DynamicStyle extends BaseLineStyle {
    private _icon;
    private _color;
    private _duration;
    private _update;
    constructor(any: any);
    private _updateMaterial;
    /**
     *@注意 内部实现使用
     *序列化
     */
    setUpdate(value: any): void;
    /**
     * 动态线的图案
     */
    icon: DynamicIconEnum;
    /**
     * 颜色
     */
    color: string;
    /**
     * 跟新周期（渲染多少次执行一次渲染）
     */
    duration: number;
    /**
     *@注意 内部实现使用
     *序列化
     */
    toJson(): {
        type: DynamicIconEnum;
        color: string;
        duration: number;
    };
}
/**
 * 动态线图案枚举
 */
export declare enum DynamicIconEnum {
    Arrow = "arrow",
    Pulse = "pulse",
    Trail = "trail",
    Attack = "attack"
}
/**
 * 线样式枚举
 */
export declare enum PolylineStyleEnum {
    /**
     * 颜色
     */
    Color = "Color",
    /**
     * 箭头
     */
    Arrow = "PolylineArrow",
    /**
     * 虚线
     */
    Dash = "PolylineDash",
    /**
     * 发光线
     */
    Glow = "PolylineGlow",
    /**
     * 边框线
     */
    Outline = "PolylineOutline",
    /**
     * 动态线
     */
    Dynamic = "Dynamic"
}
