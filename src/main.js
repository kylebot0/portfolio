import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import Foxfit from './pages/Projects/Foxfit'
import Thorikos from './pages/Projects/Thorikos'
import Jmango from './pages/Projects/Jmango'
import Nobillon from './pages/Projects/Nobillon'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import PageNotFound from './pages/404'

const routes = [
    { path: '/index', component: Home, meta: { transition: 'fade' }, },
    { path: '/about', component: About, meta: { transition: 'fade' }, },
    {
        path: '/projects',
        component: Projects,
        meta: { transition: 'fade' },
    },
    {
        path: "/projects/foxfit",
        component: Foxfit,
        meta: { transition: 'fade' },
    },
    {
        path: "/projects/thorikos",
        component: Thorikos,
        meta: { transition: 'fade' },
    },
    {
        path: "/projects/nobillon",
        component: Nobillon,
        meta: { transition: 'fade' },
    },
    {
        path: "/projects/jmango360",
        component: Jmango,
        meta: { transition: 'fade' },
    },
    { path: '/contact', component: Contact, meta: { transition: 'fade' }, },
    {
        path: '/:catchAll(.*)*',
        name: "PageNotFound",
        component: PageNotFound,
    },
    { path: '/', redirect: '/index', meta: { transition: 'fade' }, }
]



const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

Vue.createApp(App).use(router).mount('#app');