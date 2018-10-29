<template>
    <div>
        <loading v-if="userLoading"></loading>
        <div v-else>
            Account <span v-if="isProfileLoaded">{{name}}</span>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapState} from 'vuex'
    import {USER_REQUEST} from './../store/actions/user'
    import Loading from './lib/Loading'

    export default {
        name: "Account",
        components: {Loading},
        computed: {
            ...mapGetters(['isProfileLoaded']),
            ...mapState({
                userLoading: state => state.user.status === 'loading',
                name: state => `${state.user.profile.title} ${state.user.profile.name}`,
            })
        },
        created() {
            if (!this.isProfileLoaded) {
                this.$store.dispatch(USER_REQUEST);
            }
        }
    }
</script>

<style scoped>

</style>