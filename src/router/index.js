import Vue from 'vue'
import VueRouter from 'vue-router'

import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: {name: 'Blogs'}
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs
    },
    {
        path: '/blog/add',
        name: 'BlogAdd',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/blog/:blogid',
        name: 'BlogDetail',
        component: BlogDetail
    },
    {
        path: '/blog/:blogid/edit',
        name: 'BlogEdit',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
