<template>
    <div class=" my-4">
        <h3>Comments</h3>

        <v-wait for="loadPostComments">
            <template slot="waiting">
                <div>
                    Loading the comments...
                </div>
            </template>

            <ul class="list-unstyled">
                <comment v-for="comment in comments" :data="comment" :key="comment.id"></comment>
            </ul>
        </v-wait>

        <b-pagination
                v-if="total !== 0"
                align="center"
                size="md"
                :total-rows="total"
                v-model="currentPage"
                :per-page="perPage"
                @input="changePage">
        </b-pagination>
    </div>
</template>

<script>
    import Comment from './Comment'
    import {getTotalCountComments, getPostComments} from './../api'

    export default {
        name: "Comments",
        components: {Comment},
        props: ['postId'],
        data() {
            return {
                comments: [],
                total: 0,
                currentPage: 1,
                perPage: 2
            }
        },
        methods: {
            changePage(page) {
                this.$wait.start('loadPostComments');
                getPostComments(this.postId, { _page: page, _limit: this.perPage}).then((response) => {
                    this.total = parseInt(response.headers['x-total-count'], 10);
                    this.comments = response.data;
                }).finally(() => {
                    this.$wait.end('loadPostComments');
                });
            }
        },
        created() {
            getTotalCountComments('posts', this.postId).then((total) => {
                this.total = total;
                this.changePage(this.currentPage);
            });
        }
    }
</script>

<style scoped>

</style>