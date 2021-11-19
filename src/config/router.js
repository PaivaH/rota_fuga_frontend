import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import Auth from '../components/auth/Auth'
import ReportForm from '../components/report/ReportForm'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }

}, {
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'report',
    path: '/report',
    component: ReportForm
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/'})
    } else {
        next()
    }
})

export default router
