<template>
    <main class="404">
        <h1>404</h1>
        <p>Page not found</p>
        <a @click="$router.go(-1)" class="underline extra-bold hvr-overline-from-left">Ga terug</a>
    </main>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
main {
    min-height: 90vh;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    h1 {
        font-size: 64px;
    }
}
</style>
