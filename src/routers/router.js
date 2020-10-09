/*
 * 路由配置
 * https://router.vuejs.org/zh/guide/#html
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: () => import('@pages/home'),
    },
    {
        path: '/init',
        component: () => import('@pages/init'),
    },
    {
        path: '/demo',
        component: () => import('@pages/demo'),
    },
];

const Routers = new Router({
    routes,
});

export default Routers;
