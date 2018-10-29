<template>
    <div>
        <h1>Posts</h1>

        <v-wait for="loadPosts">
            <template slot="waiting">
                <div>
                    Loading the list...
                </div>
            </template>

            <b-list-group class="my-3">
                <b-list-group-item
                        v-for="post in posts"
                        active-class="is-active"
                        class="link"
                        :to="{ name: 'post', params: { id: post.id } }"
                        :key="post.id">
                    {{post.id}}. {{post.title}}
                </b-list-group-item>
            </b-list-group>

            <b-pagination
                    align="center"
                    v-if="total !== 0"
                    size="md"
                    :total-rows="total"
                    v-model="currentPage"
                    :per-page="perPage"
                    @input="changePage">
            </b-pagination>
        </v-wait>
    </div>
</template>

<script>
    import {getPosts,getTotalCount} from './../api'

    export default {
        data() {
            return {
                posts: [],
                total: 0,
                currentPage: 1,
                perPage: 10,
            };
        },
        created() {
            getTotalCount('posts').then((total) => {
                this.total = total;
                
                this.$nextTick(() => {
                    const page = this.getParamPage();
                    if (this.currentPage === page)
                        this.changePage(page);
                    else
                        this.currentPage = page;
                });
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.currentPage = this.getParamPage(to.params);
            next();
        },
        methods: {
            getParamPage(params) {
                let page = parseInt(params ? params.page : this.$route.params.page, 10);
                return isNaN(page) || page < 1 ? 1 : page;
            },
            changePage(page) {
                console.log('changePage', page);
                if (page !== this.getParamPage())
                    this.$router.push({name: 'posts', params: {page}});

                this.$wait.start('loadPosts');
                getPosts({ _page: page, _limit: this.perPage }).then((response) => {
                    this.total = parseInt(response.headers['x-total-count'], 10);
                    this.posts = response.data;
                }).catch(error => {
                    console.log('Posts getPosts', error);
                }).finally(() => {
                    this.$wait.end('loadPosts');
                });
            },
        }
    }
</script>

<style scoped>

</style>