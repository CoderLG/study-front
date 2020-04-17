
var indexCenter=[116.50,39.96] ;

var projection = ol.proj.get('EPSG:4326');
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(21);
var matrixIds = new Array(21);
var interface = new InterfaceManager();

var mapYaw = false;
var isDrag = false;
var oriSize = {
    width: 430,
    height: 280
};
var mapOverHandle = null;
var isGraphic = false;
var currentYaw = 0;

// 小地图是否显示
var isMiniMapVisible = true;

var minMap = {};
minMap.status = "float";
minMap.center = {
    pt: null,
    zoom: 16
};

minMap.spatialReference = null;

minMap.miniSource=new ol.source.Vector();

minMap.Drag = function() {  
	  
    ol.interaction.Pointer.call(this, {  
        handleDownEvent: minMap.Drag.prototype.handleDownEvent,  
        handleDragEvent: minMap.Drag.prototype.handleDragEvent,  
        handleMoveEvent: minMap.Drag.prototype.handleMoveEvent,  
        handleUpEvent: minMap.Drag.prototype.handleUpEvent  
    });  
    
    /** 
     * @type {ol.Pixel} 
     * @private 
     */  
    this.coordinate_ = null;  

    /** 
     * @type {string|undefined} 
     * @private 
     */  
    this.cursor_ = 'pointer';  

    /** 
     * @type {ol.Feature} 
     * @private 
     */  
    this.feature_ = null;  

    /** 
     * @type {string|undefined} 
     * @private 
     */  
    this.previousCursor_ = undefined;  

};  

ol.inherits(minMap.Drag, ol.interaction.Pointer);

/** 
 * @param {ol.MapBrowserEvent} evt Map browser event. 
 * @return {boolean} `true` to start the drag sequence. 
 */  
minMap.Drag.prototype.handleDownEvent = function(evt) {  
    var map = evt.map;  

    var feature = map.forEachFeatureAtPixel(evt.pixel,  
            function(feature) {  
                return feature;  
            });  

    if (feature) {  
        this.coordinate_ = evt.coordinate;  
        this.feature_ = feature;  
    }  

    return !!feature;  
};  


/** 
 * @param {ol.MapBrowserEvent} evt Map browser event. 
 */  
minMap.Drag.prototype.handleDragEvent = function(evt) {  
    var deltaX = evt.coordinate[0] - this.coordinate_[0];  
    var deltaY = evt.coordinate[1] - this.coordinate_[1];  

    var geometry = /** @type {ol.geom.SimpleGeometry} */  
            (this.feature_.getGeometry());  
    geometry.translate(deltaX, deltaY);  

    this.coordinate_[0] = evt.coordinate[0];  
    this.coordinate_[1] = evt.coordinate[1];  
};  


/** 
 * @param {ol.MapBrowserEvent} evt Event. 
 */  
minMap.Drag.prototype.handleMoveEvent = function(evt) {  
    if (this.cursor_) {  
        var map = evt.map;  
        var feature = map.forEachFeatureAtPixel(evt.pixel,  
                function(feature) {  
                    return feature;  
                });  
        var element = evt.map.getTargetElement();  
        if (feature) {  
            if (element.style.cursor != this.cursor_) {  
                this.previousCursor_ = element.style.cursor;  
                element.style.cursor = this.cursor_;  
            }  
        } else if (this.previousCursor_ !== undefined) {  
            element.style.cursor = this.previousCursor_;  
            this.previousCursor_ = undefined;  
        }  
    }  
};  


/** 
 * @return {boolean} `false` to stop the drag sequence. 
 */  
minMap.Drag.prototype.handleUpEvent = function() {  
   /* var testPolygon = new ol.geom.Polygon(this.feature_.getGeometry().getCoordinates());  
    tooltipCoord = testPolygon.getInteriorPoint().getCoordinates();//线的形成面的中间点  */
    var coord=this.coordinate_;
    interface.setPanoByBL(coord[1], coord[0]);
    minMap.map.getView().setCenter(coord);
    this.coordinate_ = null;  
    this.feature_ = null;  
    return false;  
};  
minMap.addOpenLayerMap = function () {
    
    
    {
        const projection = ol.proj.get('EPSG:4326');// 经纬度空间参考坐标系
        const projectionExtent = projection.getExtent();
        const size = ol.extent.getWidth(projectionExtent) / 256;
        let resolutions = [];
        let matrixIds = [];
        let url, index, layer, matrixSet;
        const forMax = 19;
        const forMin = 0;
       // const is3857 = data.gridset.indexOf(3857) > -1 || (data.tileType && data.tileType.indexOf('geojson') > -1);
        for (let z = forMin; z <= forMax; z += 1) {
          resolutions.push(size / Math.pow(2, (z + 1)));
          matrixIds.push(`EPSG:4326:${z}`);
        }
        
        var request ={
            QueryString : function(val){
                var uri = window.location.search;
                var re = new RegExp("" +val+ "=([^&?]*)", "ig");
                return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
            }
        };
        var mapUrl = request.QueryString("miniMap");
        
        minMap.baseLayer1 = new ol.layer.Tile({
            name:"影像",
            source: new ol.source.WMTS({
                url: mapUrl,
                layer: 'image_globle_base-PNG-4326',
                format: 'image/png',
                matrixSet: 'EPSG:4326',
                projection,
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                tileSize: [256, 256],
                extent: [-180,-90,180,90],
                resolutions,
                matrixIds,
                }),
            })
        });
    }

    {
        const projection = ol.proj.get('EPSG:4326');// 经纬度空间参考坐标系
        const projectionExtent = projection.getExtent();
        const size = ol.extent.getWidth(projectionExtent) / 256;
        let resolutions = [];
        let matrixIds = [];
        let url, index, layer, matrixSet;
        const forMax = 17;
        const forMin = 1;
       // const is3857 = data.gridset.indexOf(3857) > -1 || (data.tileType && data.tileType.indexOf('geojson') > -1);
        for (let z = forMin; z <= forMax; z += 1) {
          resolutions.push(size / Math.pow(2, (z + 1)));
          matrixIds.push(`EPSG:4326:${z}`);
        }
        
        var request ={
            QueryString : function(val){
                var uri = window.location.search;
                var re = new RegExp("" +val+ "=([^&?]*)", "ig");
                return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
            }
        };
        var mapUrl = request.QueryString("miniMap");

        minMap.baseLayer = new ol.layer.Tile({
            name:"影像",
            source: new ol.source.WMTS({
                url: mapUrl,
                layer: 'placename_roads_globle_base-PNG-4326',
                format: 'image/png',
                matrixSet: 'EPSG:4326',
                projection,
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                tileSize: [256, 256],
                extent: [-180,-90,180,90],
                resolutions,
                matrixIds,
                }),
            })
        });
    }
	
	 minMap.map = new ol.Map({
		interactions: ol.interaction.defaults().extend([new minMap.Drag()]),  
		logo:false,
		layers: [
			minMap.baseLayer1,minMap.baseLayer
			],
			target: 'arcgisMap',
			view: new ol.View({
				center:minMap.center.pt ,
				projection:ol.proj.get("EPSG:4326"),
				zoom: minMap.center.zoom,
				minZoom:3
				
				
			}),
			controls: ol.control.defaults({
				zoom:false
			}),
			loadTilesWhileAnimating: true,
			loadTilesWhileInteracting: true
	});
	
	InterfaceManager.prototype.onCameraYawChanged(minMap.graphicYaw);
	minMap.miniVectorLayer=new ol.layer.Vector({
		source:minMap.miniSource,
	
	});
	
	 minMap.map.addLayer(minMap.miniVectorLayer);
	
	 minMap.feature = new ol.Feature({ 
		geometry: minMap.center.pt,
		
		name: 'pic'
	});
	
	 minMap.feature.setStyle(new ol.style.Style({
		image:new ol.style.Icon({
			src:'./images/streetView/bg/minimap/minimap_1.png'
		})
        
    }))
	

    minMap.miniSource.addFeature(minMap.feature);
    minMap.map.on("click", minMapClick);
    $("#minimapContainerDiv").mouseover(function(){
    	overMiniMap();
    });
    //mapOverHandle = minMap.map.on("pointerover", overMiniMap);
    
}

function getUrlParams() {
    var searchArray = window.location.search.substr(1, window.location.search.length).split("&");
    var paramsArray = new Array;

    if (searchArray != null) {
        for (var i = 0; i < searchArray.length; i++) {
            var reg = /[=|^==]/;
            var tmpStr = searchArray[i].split(reg);
            var array = new Array;
            array[tmpStr[0]] = tmpStr[1];
            paramsArray.push(array);
        }
    }

    return paramsArray;
}

function getParamValue(name) {
    var paramsArray = getUrlParams();
    if (paramsArray != null) {
        for (var i = 0; i < paramsArray.length; i++) {
            for (var j in paramsArray[i]) {
                if (j == name) {
                    return paramsArray[i][j];
                }
            }
        }
    }
    return null;
}

$(function () {
    $("#streetMap").css("height", "100%");
    resizeConverIframe();

   minMap.center.zoom = getParamValue('l');

    var x = getParamValue("x");
    var y = getParamValue("y");

    if (x != null && y != null) {
    	var pnt=new ol.geom.Point([x,y]);
    	minMap.center.pt=pnt;
    }

    //浏览器窗口大小变化处理方法
    $(window).resize(function () {
        setTimeout(function () {
            if (minMap.status == "float") {
                $("#streetMap").css("height", "100%");
            } else if (minMap.status == "right") {
                var dh = $(document).height();
                var dw = $(document).width();
                var streetMapWidth = parseInt(($("#streetMap").css("width") + "").replace("px"));
                var miniMapWidth = parseInt(($("#minimapAreaDiv").css("width") + "").replace("px"));
                var preDw = streetMapWidth + miniMapWidth;

                if (isMiniMapVisible) {
                    $("#minimapContentDiv").css("height", "100%");
                    $("#minimapContainerDiv").css("height", "100%");
                    $("#minimapAreaDiv").css("height", "100%");

                    streetMapWidth = dw / preDw * streetMapWidth;
                    miniMapWidth = dw - streetMapWidth;

                } else {
                    streetMapWidth = dw;
                    miniMapWidth = 0;
                }

                $("#streetMap").css("height", "100%");

                $("#streetMap").css("width", streetMapWidth);
                $("#minimapContainerDiv").css("width", miniMapWidth);
            } else if (minMap.status == "bottom") {
                var dw = $(document).width();
                var dh = $(document).height();
                var streetMapHeight = parseInt(($("#streetMap").css("height") + "").replace("px"));
                var miniMapHeight = parseInt(($("#minimapAreaDiv").css("height") + "").replace("px"));
                var miniMapWidth = parseInt(($("#minimapAreaDiv").css("width") + "").replace("px"));
                var preDh = streetMapHeight + miniMapHeight;

                if (isMiniMapVisible) {
                    $("#minimapContentDiv").css("width", (dw - 5));
                    $("#minimapContainerDiv").css("width", (dw - 5));
                    $("#minimapAreaDiv").css("width", (dw - 5));
                } else {
                    $("#minimapContentDiv").css("width", miniMapWidth);
                    $("#minimapContainerDiv").css("width", miniMapWidth);
                    $("#minimapAreaDiv").css("width", miniMapWidth);
                }

                $("#streetMap").css("width", "100%");

                streetMapHeight = dh / preDh * streetMapHeight;
                miniMapHeight = dh - streetMapHeight;

                $("#streetMap").css("height", streetMapHeight);
                $("#minimapContainerDiv").css("height", miniMapHeight);
                $("#minimapAreaDiv").css("height", miniMapHeight);

            }

            resizeConverIframe();
            if (minMap.map) {
                minMap.map.updateSize();
            }
        }, 100);
    });

    //最右正下的显示、隐藏按钮点击事件处理方法
    $("#btnmin").click(function () {
        var ps = document.getElementById("btnmin").style.backgroundPosition + "";
        if (ps.indexOf("-60") > 0) { //最小化
            var h = $("#minimapContainerDiv").height();
            var w = $("#minimapContainerDiv").width();
            minMap.size = {
                w: w,
                h: h
            };
            $("#btnmin").css({
                "backgroundPosition": "-22px -80px"
            });
            $("#minimapContainerDiv").css({
                width: "15px",
                height: "15px"
            });
            $("#minimapAreaDiv").css({
                width: "100%",
                height: "17px"
            });
            if (minMap.status != "float") {
                minMap.streetMapHeight = $("#streetMap").css("height");
                moveMinimapOutMainContainer();

                $("#streetMap").css("height", "100%");
            }

            //关闭鹰眼图拖拽改变大小功能
            $('.dragresize-tl').css('display', 'none');

            // 隐藏缩放按钮
            $("#OMap_stdMpZoom").css("display", "none");
            isMiniMapVisible = false;
        } else { //恢复
            $("#minimapContainerDiv").css({
                width: minMap.size.w + "px",
                height: minMap.size.h + "px"
            });
            $("#btnmin").css({
                "backgroundPosition": "0px -60px"
            });
            $("#minimapContentDiv").css({
                width: "100%",
                height: "100%"
            });
            $("#minimapAreaDiv").css({
                width: "100%",
                height: "100%"
            });
            if (minMap.status != "float") {
                moveMinimapInMainContainer();
                $("#streetMap").css("height", minMap.streetMapHeight);
            }

            //打开鹰眼图拖拽改变大小功能
            $('.dragresize-tl').css('display', 'block');

            // 显示缩放按钮
            $("#OMap_stdMpZoom").css("display", "block");
            isMiniMapVisible = true;
        }
        resizeConverIframe();
        minMap.size = {
            h: h,
            w: w
        };
    })
});

$(window).load(function () {
    outMiniMap();
});

var showMap = false;

/**
 * 侦听街景站点改变事件
 */
InterfaceManager.prototype.onPanoMetaChanged = function (data) {
   
    var geom= new ol.geom.Point([data.Location.lng, data.Location.lat]);

    minMap.center.pt = geom;
    

    if (!showMap) {
        showMap = true;
        $("#minimapContainerDiv").show(2000, function () {
        	minMap.addOpenLayerMap();

            resizeConverIframe();
            $("#minimapContainerDiv").trigger("mousedown");

            minMap.map.getView().setCenter(minMap.center.pt.getCoordinates());
           

        });

        $("#converIframe").show(2000);
    } else {
        minMap.map.getView().setCenter(minMap.center.pt.getCoordinates());
         minMap.feature.setGeometry(minMap.center.pt);
      
    }

}

/**
 * 侦听获取街景失败事件
 */
InterfaceManager.prototype.onGetPanoField = function () {
   // alert("当前位置无街景");
}

/**
 * 跳转到二维地图
 */
function back2Map() {
    var blPnt = minMap.center.pt.getCoordinates();
    var level = minMap.center.zoom;
    if (minMap && minMap.map && minMap.map.getView().getZoom()) {
        level = minMap.map.getView().getZoom();
    }
    window.location = "../../index.html?x=" + blPnt[0] + "&y=" + blPnt[1] +
        "&z=" + level+"&streetViewFlag=true";
}

/**
 * 放大街景显示级别
 */
function panoZoomIn() {
    interface.zoomIn();
}

/**
 * 缩小街景显示级别
 */
function panoZoomOut() {
    interface.zoomOut();
}

/*var tmpPoint = null;*/

/**
 * 侦听街景的角度变换事件
 */
InterfaceManager.prototype.onCameraYawChanged = function (yaw) {
    minMap.graphicYaw = yaw;
    yaw %= 360;

    while (yaw < 0) {
        yaw += 360;
    }

    currentYaw = yaw;
    walk(yaw);
};

//变换标注的角度
function walk(pot) {
    var angle = 360 / 16;
    var num = Math.floor(pot / angle);
    num = (8 - num) % 16;

    if (num < 0) {
        num += 16;
    }

    if (num == 0) {
        num = 16
    }

    var imgUrl = "./images/streetView/bg/minimap/minimap_" + num + ".png";
    
    var feature =minMap.feature;
    if (feature) {
    	var src=feature.getStyle().getImage().b.l;
        if (imgUrl == src) {
            return;
        } else {
        	 feature.setGeometry(minMap.center.pt);
        	 feature.setStyle(new ol.style.Style({
        			image:new ol.style.Icon({
        				src:imgUrl
        			})
        	        
        	    }))
        	   
            
        }
    }

}

//改变小地图遮罩大小
function resizeConverIframe() {
    var minimapContainer = $("#minimapContainerDiv");
    $("#converIframe").css({
        width: minimapContainer.width() + 1,
        height: minimapContainer.height() + 1
    });
}

//将鹰眼图移动到街景容器中
function moveMinimapInMainContainer() {

    $("#minimapAreaDiv").position = "";
    var container = $("#minimapContainerDiv").css({
        position: "",
        right: "",
        bottom: ""
    });
    $("#streetMapContainer").append(container);
    $(document.body).remove(container);
}

//将鹰眼图从街景容器中移出
function moveMinimapOutMainContainer() {
    $("#minimapAreaDiv").position = "absolute";
    var container = $("#minimapContainerDiv").css({
        position: "absolute",
        right: "0px",
        bottom: "0px"
    });
    $("#streetMap").css({
        height: "100%",
        width: "100%"
    });
    $(document.body).append(container);
    $("#streetMapContainer").remove(container);
}

//平面地图的点击事件
function minMapClick(e) {
    if (isGraphic) {
        return;
    }
    
    minMap.map.getView().setCenter(e.coordinate);
    mapYaw = true;
    interface.setPanoByBL(e.coordinate[1], e.coordinate[0]);
}

//鹰眼容器拉伸后的处理方法
function resizeMap() {
    resizeConverIframe();
    var minimapContainer = $("#minimapContainerDiv");
    var doc = $(document);
    var height = minimapContainer.height();
    var containerWidth = minimapContainer.width();
    var streetMapdiv = $("#streetMap");

    $("#minimapAreaDiv").css({
        position: "relative",
        width: "100%",
        height: height - 3 + "px",
        overflow: "hidden"
    });
    $("#minimapContentDiv").css({
        position: "relative",
        width: "100%",
        height: height - 3 + "px",
        overflow: "hidden"
    });
    if (minMap.status == "bottom") {
        streetMapdiv.css({
            height: doc.height() - height + "px",
            width: "100%"
        });
    }

    if ($("#minimapContainerDiv")[0].onmouseout == null) {
        $("#minimapContainerDiv")[0].onmouseout = outMiniMap;
    }

    if (minMap.map && minMap.map.onmouseover == null) {
        minMap.map.onmouseover = overMiniMap;
        mapOverHandle = minMap.map.on("mouse-over", overMiniMap);
    }

    var diffWidth = doc.width() - minimapContainer.width();
    var diffHeight = doc.height() - height;

    if (diffWidth < 20) {
        $("#converIframe").hide();
        $("#minimapContainerDiv")[0].onmouseout = null;
        mapOverHandle.remove();
        if (minMap.status != "float") {
            return;
        }
        minMap.status = "bottom";

        streetMapdiv.css({
            height: doc.height() - height + "px",
            width: "100%"
        });

        //将小地图移到街景地图容器中
        moveMinimapInMainContainer();
        return;
    } else if (diffHeight < 6) {
        $("#converIframe").hide();

        $("#minimapContainerDiv")[0].onmouseout = null;
        mapOverHandle.remove();

        minMap.status = "right"
        streetMapdiv.css({
            width: doc.width() - containerWidth - 2 + "px",
            height: "100%"
        });

        //将小地图移到街景地图容器中
        moveMinimapInMainContainer();
        return;
    }
    if (minMap.status != "float") {
        minMap.status = "float"
        if (minimapContainer.parent().attr("id") == "streetMapContainer") {
            //将miniMap从街景地图容器移出来
            moveMinimapOutMainContainer();
        }
        $("#converIframe").show();
    }
}

/****************************鹰眼图窗口拉伸处理*********************************/
var dragresize = new DragResize('dragresize', {
    minWidth: 220,
    minHeight: 200,
    minLeft: 0,
    minTop: 0,
    maxLeft: 600,
    maxTop: 500
});

//可拉伸的元素
dragresize.isElement = function (elm) {

    if (elm.className && elm.className.indexOf && elm.className.indexOf('miniMap') > -1) {
        return true;
    }
    return false;
};

//可拖动的元素，鹰眼图不需要拖动
dragresize.isHandle = function (elm) {
    return false;
};

dragresize.ondragfocus = function () {};
dragresize.ondragstart = function (isResize) {
    dragresize.elmW = oriSize.width;
    dragresize.elmH = oriSize.height;
    isDrag = true;
};

dragresize.ondragmove = function (isResize) {
    resizeMap();
};

dragresize.ondragend = function (isResize) {
    resizeMap();
    var minimapContainer = $("#minimapContainerDiv");
    oriSize.width = minimapContainer.width();
    oriSize.height = minimapContainer.height();
    minMap.map.updateSize();
    setTimeout(function () {
        minMap.map.getView().setCenter(minMap.center.pt.getCoordinates());
        setTimeout(function () {
        	 minMap.feature.setGeometry(minMap.center.pt);
        }, 800);
    }, 500);

    isDrag = false;
};

dragresize.ondragblur = function () {}
if (document.addEventListener) { // IE8及以下不支持拖拽
    dragresize.apply(document);
}

function zoomIn() {
    minMap.map.getView().setZoom(minMap.map.getView().getZoom() + 1);
}

function zoomOut() {
    minMap.map.getView().setZoom(minMap.map.getView().getZoom() - 1);
}

//鼠标进入小地图
function overMiniMap(e) {

    if (isDrag == true) {
        return;
    }

    var ps = $("#btnmin").css("backgroundPosition");
    if (ps.indexOf("-60") < 0) {
        return;
    }

    // 当当前小地图的大小等于oriSize时，返回
    if ($("#minimapContainerDiv").css("width") == oriSize.width + "px" && $("#minimapContainerDiv").css("height") == oriSize.height + "px") {
        return;
    }
    $("#minimapContainerDiv").css("width", oriSize.width + "px");
    $("#minimapContainerDiv").css("height", oriSize.height + "px");
    resizeMap();
    minMap.map.updateSize();
    setTimeout(function () {
        if (minMap.map) {
            minMap.map.getView().setCenter(minMap.center.pt.getCoordinates());
        }
    }, 300);
    $('.anchorBL').css('display', 'block');
    $('.dragresize-tl').css('display', 'block');
    $("#OMap_stdMpZoom").css("display", "block");
}

//鼠标移出小地图
function outMiniMap(e) {

    e = e || window.event;
    var relatedTarget = e.relatedTarget || e.toElement;
    if (e != undefined && relatedTarget && relatedTarget != $("#HDView")[0] && relatedTarget != $("#minimapAreaDiv")[0]) {
        return;
    }

    if (isDrag == true) {
        return;
    }

    var ps = $("#btnmin").css("backgroundPosition");
    if (ps.indexOf("-60") < 0) {
        return;
    }

    $("#minimapContainerDiv").css("width", "200px");
    $("#minimapContainerDiv").css("height", "180px");
    resizeMap();
    if (minMap.map) {
        minMap.map.updateSize();
    }
    $('.anchorBL').css('display', 'none');
    $('.dragresize-tl').css('display', 'none');
    $("#OMap_stdMpZoom").css("display", "none");

    setTimeout(function () {
        if (minMap.map) {
            minMap.map.getView().setCenter(minMap.center.pt.getCoordinates());
        }
    }, 300);
}