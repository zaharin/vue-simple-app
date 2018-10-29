import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'
import auth from './modules/auth'
import user from './modules/user'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        user,
        auth,
    },
    strict: debug,
});