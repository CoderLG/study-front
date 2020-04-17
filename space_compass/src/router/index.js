import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    base:process.env.BASE_URL,
    routes:[
        {
            path: '/',
            redirect: '/earth'
        },
        {
            path:'/',
            name:'Home',
            component: r => require.ensure([], () => r(require('@/components/Home')), 'home').default,
            children:[
                {
                    path:'/earth',
                    component: r => require.ensure([], () => r(require('@/components/EarthControl.vue')), 'earth')
                }
            ],
            meta: {
                keepAlive: true
            }
        }
        // ,{
        //     path:'/login',
        //     name:'Login',
        //     component: r => require.ensure([], () => r(require('@/components/Login')), 'login')
        // },
        // {
        //     path:'/test',
        //     name:'test',
        //     component: r => require.ensure([], () => r(require('@/components/testLine')), 'test')
        // }
    ]
})