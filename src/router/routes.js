import Vue from 'vue'
import store from './../store'

import Index from './../components/Index'
import Post from './../components/Post'
import Posts from './../components/Posts'
import NotFound from './../components/NotFound'
import Account from './../components/Account'
import Login from './../components/Login'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/login');
};

export default [
    {
        path: '/',
        name: 'index',
        component: Index,
    }, {
        path: '/posts/:page?',
        name: 'posts',
        component: Posts,
    }, {
        path: '/post/:id',
        name: 'post',
        component: Post,
        props: true,
    },  {
        path: '/account',
        name: 'account',
        component: Account,
        beforeEnter: ifAuthenticated,
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    }, {
        path: '/404',
        name: '404',
        component: NotFound,
    }, {
        path: '*',
        redirect: '/404'
    }
];