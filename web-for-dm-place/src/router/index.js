import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const importMy = file => () => import(`../components/${file}.vue`);

export default new Router({
  routes: [
    {
      path: '/',
      component: importMy('DMHome'),
    },
    {
      path: '/cloud',
      component: importMy('CloudHomeComponent'),
      hidden: true,
      redirect: '/datamanager',
      children: [{
        path: '/datamanager/:parentId',
        component: importMy('PanComponent'),
      }, {
        path: '/myShare',
        component: importMy('MyShareComponment'),
      }, {
        path: '/shareMe',
        component: importMy('ShareMeComponment'),
      }],
    },
    {
      path: '/datasearch',
      component: importMy('ImageSearchComponment'),
    },
    {
      path: '/datamanager',
      redirect: '/datamanager/-1',
      component: importMy('PanComponent'),
    },
    {
      path: '/servicemanager',
      component: importMy('DMDataServer'),
    },
    {
      path: '/ommanager',
      component: importMy('DMYunWei'),
    },
    {
      path: '/wmtsPreview/:dataFlag',
      component: importMy('portal/WMTSLayerPreview'),
      hidden: true,
    },
    {
      path: '/portal',
      component: importMy('PortalHomeComponent'),
      hidden: true,
    },
    {
      path: '/login',
      component: importMy('LoginComponent'),
      hidden: true,
    },
    {
      path: '/service',
      component: importMy('ServiceManagement'),
      hidden: true,
    },
    {
      path: '/target',
      component: importMy('TargetControl'),
      hidden: true,
    },
    {
      path: '/Open/:id',
      component: importMy('OpenLayer'),
      hidden: true,
    },
    {
      path: '/Cesium/:id',
      component: importMy('Cesium'),
      hidden: true,
    },
    {
      path: '/publishService',
      component: importMy('PublishService'),
      hidden: true,
    },
    {
      path: '/scanStorage/:id',
      component: importMy('ScanStorage'),
      hidden: true,
    },
    {
      path: '/help',
      component: importMy('HelpMenu'),
      hidden: true,
    },
    {
      path: '/searchService',
      component: importMy('SearchServiceComponment'),
    },
    {
      path: '/dataStreamExport',
      component: importMy('DataStreamExport'),
    },
    {
      path: '/baseMapGallery',
      component: importMy('baseMapGallery/Int'),
    },
    {
      path: '/lab',
      component: importMy('Lab'),
    },
    {
      path: '/demo/:id',
      component: importMy('OpenlayersDemo'),
    },
    {
      path: '/ol1',
      component: importMy('OpenLayers1'),
    },
    {
      path: '/ol2',
      component: importMy('OpenLayers2'),
    },
    {
      path: '/ol3',
      component: importMy('OpenLayers3'),
    },
    {
      path: '/ol4',
      component: importMy('OpenLayers4'),
    },
    {
      path: '/openRealTime/:id',
      component: importMy('OpenLayerRealTime'),
      hidden: true,
    },
    {
      path: '/openTarget',
      name:'OpenLayerTarget',
      component: importMy('OpenLayerTarget'),
      hidden: true,
    },
    {
      path: '/PreviewPlaceName',
      name:'PreviewPlaceName',
      component: importMy('PreviewPlaceName'),
      hidden: true,
    }
  ],
});
