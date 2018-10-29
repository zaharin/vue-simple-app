<template>
    <div>
        <div class="mb-4">
            <b-button @click.pevent="goBack">back</b-button>
        </div>

        <v-wait for="loadPost">
            <template slot="waiting">
                <div>
                    Loading the post...
                </div>
            </template>

            <div class="post mt-4" v-if="post">
                <h1 class="post__title">{{ post.title }}</h1>
                <p class="post__body">{{ post.body }}</p>
            </div>

            <comments :post-id="id"></comments>
        </v-wait>
    </div>
</template>

<script>
    import mixins from './../mixins'
    import {getPost} from './../api'
    import Comments from "./Comments";

    export default {
        components: {Comments},
        props: ['id'],
        mixins: [mixins],
        data() {
            return {
                post: null,
            }
        },
        methods: {
            getPost(id) {
                this.$wait.start('loadPost');
                getPost(id).then((response) => {
                    this.post = response.data;
                }).catch((error) => {
                    console.log('Post getPost', error);
                }).finally(() => {
                    this.$wait.end('loadPost');
                });
            },
        },
        created() {
            this.getPost(this.id);
        },
        beforeRouteUpdate(to, from, next) {
            this.getPost(to.params.id);
            next();
        }
    }
</script>

<style scoped>

</style>