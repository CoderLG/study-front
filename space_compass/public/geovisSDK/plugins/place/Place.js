class Place extends GV.Tool {
    constructor(viewer, pluginManager) {
        super();
        this.earth = viewer;
    }

    init() {
        if(this.view) {
            this.view.show();
        } else {
            this.view = new GV.PluginView({
                container: this.earth.container,
                url: this.formatURL("./place/index.html"),
                viewStyle: {
                    width:'400px',
                    height:'600px',
                    left: '30px',
                    top: '30px',
                    position: 'absolute'
                },
                gvStyle:true
            });

            (this.view.instance).addEventListener("load", () => {
                let contentWindow = this.view.instance.contentWindow;
                contentWindow.GV = GV;
                contentWindow.Cesium = Cesium;
                contentWindow.earth = this.earth;
                this.pluginWindow = contentWindow;
                this.pluginWindow.initViewer(this.earth);
            });
            this.view.show();
        }
    } 

    hide() {
        //this.pluginWindow.remove();
        this.view.close();
    }

    close() {
  
    }
}
