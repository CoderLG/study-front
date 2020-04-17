import { GeoPoint } from "../../../Utils/GeoPoint";
/**
 * 渲染工具对象
 */
export declare class RenderUtils {
    constructor();
    static getPositions(value: Array<GeoPoint>): any[];
    static getRadii(value: any): Cesium.Cartesian3;
    static getRectangleDegress(value: any): Cesium.Rectangle;
    static getImage(value: any): Cesium.ImageMaterialProperty;
    static getClassificationType(value: any): any;
    static getShadows(value: any): any;
    static getGranularity(value: any): number;
    static getColor(value: any): Cesium.Color;
    static getDynamicColor(value: String): Cesium.CallbackProperty;
    static getDynamicValue(value: any): Cesium.CallbackProperty;
    static getPosition(value: GeoPoint): Cesium.Cartesian3;
    static getNearFarScalar(value: any): Cesium.NearFarScalar;
    static getDynamicNearFarScalar(value: any): Cesium.CallbackProperty;
    static getDistanceDisplayCondition(value: any): Cesium.DistanceDisplayCondition;
    static getDynamicDistanceDisplayCondition(value: any): Cesium.CallbackProperty;
    static getCartesian2(value: any): Cesium.Cartesian2;
    static getVerticalOrigin(str: any): any;
    /**
     * 水平对齐方式
     */
    static getHorizontalOrigin(str: any): any;
    static getHeightReference(str: any): any;
    static getStyle(value: any): number;
    static getPositionDegrees(value: any): Cesium.Cartesian3;
    static getCartesian3(value: any): Cesium.Cartesian3;
    static getOrientation(position: any, hpr: any): any;
    static getHpr(heading: any, pitch: any, roll: any): Cesium.HeadingPitchRoll;
    static getHeading(value: any): number;
}
