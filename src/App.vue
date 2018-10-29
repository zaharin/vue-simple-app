<template>
    <div id="app">
        <div class="wrap">
            <app-header></app-header>

            <main class="container mt-5 mb-3">
                <div class="content">
                    <router-view></router-view>
                </div>
            </main>
        </div>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader'
    import AppFooter from './components/AppFooter'
    import axios from 'axios'
    import {AUTH_LOGOUT} from './store/actions/auth'

    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter
        },
        created: function () {
            axios.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized, logout the user
                        this.$store.dispatch(AUTH_LOGOUT);
                        // you can also redirect to /login if needed !
                    }
                    throw err;
                });
            });
        }
    }
</script>

<style>
    html, body {
        height: 100%;
    }

    #app {
        position: relative;
        min-height: 100%;
        height: auto;
    }

    .wrap {
        position: relative;
        min-height: 100%;
        height: auto;
        padding-bottom: 60px;
    }
</style>
