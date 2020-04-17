/**
 * @类别 无需创建，初始化球时自动创建并且与球对应的类</br>
 * @描述 通用检测类</br>
 */
export declare class Check {
    /**
     * 检查参数是否为布尔值
     * @param value 被检测对象
     * @return 返回值true or false
     * ```
     * 示例代码：
     * let res = GV.Check.isBoolean(false);
     * ```
     */
    static isBoolean(value: any): boolean;
    /**
     * 检查参数是否为json对象
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isJson(value: any): boolean;
    /**
     * 判定是否为字符串
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isString(value: any): boolean;
    /**
     * 判定是否为数值
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isNumber(value: any): boolean;
    /**
     * 判定参数是否为数组
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isArray(value: any): boolean;
    /**
     * 判断字符串是否为十六进制颜色。
     * @param value 被检测对象
     * @return 返回值true or false
     */
    static isCssColor(value: any): boolean;
}
