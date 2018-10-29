import axios from 'axios'
import router from './../router'

const http = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log('Request error', error);
    if (error.response.status === 404) {
        return router.replace({ name: '404' });
    }
    return Promise.reject(error);
});

export default http;

const endpoint = 'https://jsonplaceholder.typicode.com/';

export function getPost(id) {
    return http.get(`${endpoint}posts/${id}`);
}

export function getPosts(params = {}) {
    return http.get(endpoint + 'posts', { params });
}

export function getTotalCount(resource) {
    return axios.get(`${endpoint}${resource}`, { params: { _page: 1, _limit: 1 } }).then((response) => {
        return parseInt(response.headers['x-total-count'], 10);
    });
}

export function getTotalCountComments(resource, id) {
    return axios.get(`${endpoint}${resource}/${id}/comments`, { params: { _page: 1, _limit: 1 } }).then((response) => {
        return parseInt(response.headers['x-total-count'], 10);
    });
}

export function getPostComments(id, params = {}) {
    return axios.get(`${endpoint}posts/${id}/comments`, { params });
}