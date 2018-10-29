import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueWait  from 'vue-wait'

import App from './App.vue'

import router from './router'
import store from './store'

import 'babel-polyfill'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueWait);

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    store,
    wait: new VueWait({
        useVuex: true
    }),
});
