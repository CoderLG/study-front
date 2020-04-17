1. config.xml内配置了街景服务的根地址
2. js/config目录下配置了鹰眼小地图内影像服务的地址、初始化街景site的经度和纬度
3. 可以在根目录streetview这一级用node.js或者http-server启动服务
  访问方式为：
    3.1 访问config.xml文件内配置的默认起始site街景
    http://localhost:8080/StreetView.html
    3.2 访问指定的经纬度site街景
    http://localhost:8080/streetview/StreetView.html?x=120.5883156775841&y=15.158763681009848&l=18
4. 从地图进入到街景模式的代码没有提供，只需要拾取一点的经纬度，通过上面自定义的那种访问
  方式，定向至街景的页面即可
5.StreetView.html内引入了各种js,css,image依赖，如果要更改目录结构，需要重新引入正确的位置
  地图引用的是openlayers框架
