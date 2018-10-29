<template>
    <header>
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand :to="'/'">Simple app on Vue</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'posts', params: { page: 1 } }">Posts</b-nav-item>
                    <b-nav-item v-if="!isAuthenticated && !authLoading" :to="{ name: 'login' }">Login</b-nav-item>
                    <b-nav-item v-if="isAuthenticated" :to="{ name: 'account' }">Account</b-nav-item>
                    <b-nav-item v-if="isAuthenticated" @click="logout">Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
    import {AUTH_LOGOUT} from './../store/actions/auth'
    import {mapGetters,mapState} from 'vuex'

    export default {
        name: 'AppHeader',
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
            }
        },
        computed: {
            ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
            ...mapState({
                authLoading: state => state.auth.status === 'loading',
                name: state => `${state.user.profile.title} ${state.user.profile.name}`,
            })
        }
    }
</script>

<style scoped>

</style>