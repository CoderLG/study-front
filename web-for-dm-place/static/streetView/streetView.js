export default class StreetView {
    constructor(viewer, options) {
        this._miniMapUrl = options.miniMapUrl
        this._scapeUrl = options.scapeUrl
        this._isFly = options.isFly
        this._flyOptions = options.flyOptions
        this._viewer = viewer
        this._scene = viewer.scene
        this._parentDom = options.parentDom
        this._close = null
        this._frameHtmlUrl = options.frameHtmlUrl
        this._init()
    }
    _init() {
        if (this._isFly) {
            setTimeout(() => {
                this._viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(this._flyOptions.point.lng, this._flyOptions.point.lat, this._flyOptions.point.height || 1000),
                    duration: this._flyOptions.duration
                });
              }, 1000);
        }

        this.eventHandler = new Cesium.ScreenSpaceEventHandler(this._scene.canvas);
        this.eventHandler.setInputAction((movement) => {
            var cartesian = this._scene.pickPosition(movement.position)
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lon = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            console.log(`lon:${lon},lat:${lat}`)
            setTimeout(() => {
                this._appendPanorama({ x: lon, y: lat, l: 18 });
            }, 10)

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        this._timeOutEvent = 0;

    }
    _removePanorama() {
        this._parentDom.removeAttribute('class');
        this._parentDom.removeChild(this._close);
        console.log(this._parentDom.parentNode)
        this._parentDom.style.height = "0";

    };

    // DOM操作： 添加
    _appendPanorama(options) {
        this._parentDom.style.height = "100%";
        this._parentDom.className = 'streetscape';
        const url = `http://${window.location.host}/static/streetView/streetview/streetView.html?x=${options.x}&y=${options.y}&l=${options.l}&serverUrl=${this._scapeUrl}&miniMap=${this._miniMapUrl}`
        this._parentDom.innerHTML = `
            <iframe
                width="100%"
                height="100%"
                allowfullscreen
                style="border-style:none;"
                src=${url}>
            </iframe>`;
        this._close = document.createElement('div');
        this._close.id = 'streetClose';
        this._close.className = 'streetClose';
        this._parentDom.appendChild(this._close)
        this._close.onclick = () => {
            this._removePanorama();
        }

    };
   
    remove() {
        if (this.eventHandler) this.eventHandler.destroy();
        this._touchstart = undefined;
        this._touchend = undefined;
        this._timeOutEvent = 0;
        this._parentDom.style.height = "0px";
    }
}