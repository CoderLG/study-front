/**
 * @类型 需要创建的虚拟类一般由内部类继承
 * @描述 事件分发类可以实现事件的注册监、注销监听、事件激活等方法
 */
export declare class Event {
    protected _events: any;
    protected _firingCount: any;
    /**
     * 添加对象的事件监听方法(事件对象基础方法)
     * @param type 监听事件类型
     * @param fn  监听回调函数
     * @param context 上下文
     * ```
     * 示例代码:
     * const fun = function(info) {
     *  console.log('监听事件');
     *  console.log(info);
     * }
     * event.on('add', fun); //监听添加事件
     * ```
     */
    on(type: string, fn: Function, context?: any): this;
    /**
     * 监听
     * @param type
     * @param fn
     * @param context
     */
    private _on;
    /**
     * 移除对象的事件监听方法(事件对象基础方法)
     * @param type 要删除的监听事件类型
     * @param fn 要删除的监听回调函数
     * @param context 上下文
     * @return
     * ```
     * 代码示例:
     * event.off('add',fun);
     * ```
     */
    off(type: string, fn: Function, context?: any): void;
    /**
     * 事件移除
     * @param type
     * @param fn
     * @param context
     */
    private _off;
    /**
     * 激活对象的某个监听事件,可以附件数据,并可以传递给父对象(事件对象基础方法)
     * @method fire
     * @param type 事件名称
     * @param data 监听时（on）收到的数据
     * @return
     * ```
     * 示例代码:
     * const info = {} //监听时（on）收到的数据
     * event.fire('add',info);
     * ```
     */
    fire(type: string, data: any): this;
    /**
     * 查询是否有指定类型的监听器(事件对象基础方法)
     * @param type 事件类型
     * @returns
     * ```
     * 示例代码：
     * const hasListens = event.listens('add');
     * ```
     */
    listens(type: string): boolean;
}
