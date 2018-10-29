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

    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter
        },
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
