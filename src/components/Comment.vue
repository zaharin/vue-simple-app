<template>
    <b-media class="comment" tag="li">
        <h5 class="mt-0 mb-1 comment__author">{{data.name}}</h5>
        <p class="comment__body">{{data.body}}</p>
    </b-media>
</template>

<script>
    export default {
        name: "Comment",
        props: ['data']
    }
</script>

<style scoped>

</style>