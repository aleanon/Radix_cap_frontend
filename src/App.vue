<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <HelloWorld msg="You did it!" />

            <nav>
                <RouterLink to="/">Cryptocurrencies</RouterLink>
            </nav>
        </div>
    </header>

    <main>
        <RouterView />
    </main>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    line-height: 1.5;
    max-height: 100vh;
}

main {
    width: 100%;
    overflow: auto;
    height: 100%;
}
</style>
