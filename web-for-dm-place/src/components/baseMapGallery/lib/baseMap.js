/* global ol */
/* global mapv */
import Map from 'ol/map';
import View from 'ol/view';

export default class baseMap {
	constructor(wrap) {
		this.wrap = wrap;
	}
	init() {
    // const raster = new TileLayer({
    //   source: new OSM(),
    // });
    setTimeout(() => {
			// 创建地图对象
			window.map = new Map({
				// layers: [raster],
				target: this.wrap,
				view: new View({
					center: [116.397128, 39.916527],
					zoom: 1,
					projection: 'EPSG:4326',
				}),
			});
			// this.addMapv();
    }, 1000);
  }
  addMapv() {
    var map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({attributionOptions: {collapsed: false}})
            .extend([new ol.supermap.control.Logo()]),
        view: new ol.View({
            center: ol.proj.transform([105.403119, 38.028658], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4,
            projection: 'EPSG:3857'
        })
    });

    var host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
    var url = host + "/iserver/services/map-china400/rest/maps/ChinaDark";
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.TileSuperMapRest({
            url: url,
        })
    })); 
    var randomCount = 300;
    var data = [];
    var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
    // 构造数据
    while (randomCount--) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
        data.push({
            geometry: {
                type: 'Point',
                coordinates: ol.proj.transform([cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4], 'EPSG:4326', 'EPSG:3857')
            },
            count: 30 * Math.random()
        });
    }
    var dataSet = new mapv.DataSet(data);
    var mapvOptions = {
        fillStyle: 'rgba(55, 50, 250, 0.8)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        max: 100,
        size: 50,
        label: {
            show: true,
            fillStyle: 'white'
        },
        globalAlpha: 0.5,
        gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
        draw: 'honeycomb'
    };
    var options = {
        map: map, dataSet: dataSet, mapvOptions: mapvOptions
    };
    map.addLayer(new ol.layer.Image({
        source: new ol.source.Mapv(options)
    }));
  }
}
