import Vue from 'vue'
import Index from './components/Index'
import Post from './components/Post'
import Posts from './components/Posts'
import NotFound from './components/NotFound'

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
    }, {
        path: '/404',
        name: '404',
        component: NotFound,
    }, {
        path: '*',
        redirect: '/404'
    }
];