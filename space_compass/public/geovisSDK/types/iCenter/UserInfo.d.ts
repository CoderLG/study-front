export declare class UserInfo {
    private _url;
    private _username;
    private _password;
    private _icenterToken;
    /**
     * 初始化
     * @param {string} url 连接的icenter环境地址
     * @param {string} username 用户名
     * @param {string} password 密码
     * ```
     * 示例代码
     * const icenter = new GV.iCenter('http://icenter.geovis.online', 'admin', 'icenter');
     * icenter.userInfo
     * ```
     */
    constructor(url: String, username: String, password: String);
    private _loginIcenter;
    /**
     * 获取用户信息
     * ```
     * 示例代码：
     * icenter.userInfo.getUserInfo();
     * ```
     */
    getUserInfo(): Promise<any>;
    /**
     * 获取用户token
     * ```
     * 示例代码：
     * icenter.userInfo.getUserToken();
     * ```
     */
    getUserToken(): Promise<String>;
}
