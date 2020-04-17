import EditorPin from './EditorPin';
/**
   maki icon: https://www.mapbox.com/maki-icons/
   /static/Cesium/Assets/Textures/maki/**.png
 */
/**
  * @private
  */
export default class EditorPinMakiIcon extends EditorPin {
    pinBuilder: Cesium.PinBuilder;
    constructor(p: any, viewer: any, layer: any);
    initProps(defs: any): void;
    initShape(): void;
}
