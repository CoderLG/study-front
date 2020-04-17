/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 Canvas转换成各种图片工具库</br>
 * @see <a href='../../../examples/gallery/editor.html#screenShot'>场景转换图片</a>
 */
export declare class Canvas2Image {
    private static support;
    private static downloadMime;
    private static scaleCanvas;
    private static getDataURL;
    private static saveFile;
    private static genImage;
    private static fixType;
    private static encodeData;
    private static getImageData;
    private static makeURI;
    /**
     * create bitmap image
     * 按照规则生成图片响应头和响应体
     */
    private static genBitmapImage;
    /**
     * saveAsImage
     * @param canvasElement
     * @param {String} image type
     * @param {Number} [optional] png width
     * @param {Number} [optional] png height
     */
    private static saveAsImage;
    private static convertToImage;
    /**
     * 保存为png格式
     * @param canvas dom元素
     * @param {number} width 保存的宽度
     * @param {number} height 保存的高度
     * ```
     * 示例代码：
     *  const ratio = viewer.canvas.width / viewer.canvas.height;
     *  const img = GV.Canvas2Image.saveAsPNG(viewer.canvas, 400, 400 / ratio)
     * ```
     */
    static saveAsPNG(canvas: Element, width: number, height: number): void;
    /**
     * 保存为jpeg格式
     * @param canvas dom元素
     * @param {number} width 保存的宽度
     * @param {number} height 保存的高度
     * ```
     * 示例代码：
     *  const ratio = viewer.canvas.width / viewer.canvas.height;
     *  const img = GV.Canvas2Image.saveAsJPEG(viewer.canvas, 400, 400 / ratio)
     * ```
     */
    static saveAsJPEG(canvas: Element, width: number, height: number): void;
    /**
    * 保存为gif格式
    * @param canvas dom元素
    * @param {number} width 保存的宽度
    * @param {number} height 保存的高度
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.saveAsGIF(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static saveAsGIF(canvas: Element, width: number, height: number): void;
    /**
    * 保存为bmp格式
    * @param canvas dom元素
    * @param {number} width 保存的宽度
    * @param {number} height 保存的高度
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.saveAsBMP(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static saveAsBMP(canvas: Element, width: number, height: number): void;
    /**
    * 转换成png格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToPNG(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToPNG(canvas: Element, width: number, height: number): string;
    /**
    * 转换成jpeg格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToJPEG(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToJPEG(canvas: Element, width: number, height: number): string;
    /**
    * 转换成gif格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToGIF(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToGIF(canvas: Element, width: number, height: number): string;
    /**
    * 转换成bmp格式
    * @param canvas dom元素
    * @param {number} width 转换后的宽度
    * @param {number} height 转换后的高度
    * @return base64数据
    * ```
    * 示例代码：
    *  const ratio = viewer.canvas.width / viewer.canvas.height;
    *  const img = GV.Canvas2Image.convertToBMP(viewer.canvas, 400, 400 / ratio)
    * ```
    */
    static convertToBMP(canvas: Element, width: number, height: number): string;
}
