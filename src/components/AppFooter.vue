<template>
    <footer class="footer">
        <div class="container">
            <span class="text-muted">Place sticky footer content here.</span>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style scoped>
    .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 60px;
        line-height: 60px;
        background-color: #f5f5f5;
    }
</style>