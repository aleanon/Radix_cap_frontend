<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <nav>
                <RouterLink :to="`/coins/page/1`">Cryptocurrencies</RouterLink>
            </nav>
        </div>
    </header>

    <main>
        <RouterView />
    </main>

    <footer>
        <p>�� 2023 My Cryptocurrency App</p>
    </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useCurrenciesStore } from './stores/currencies'

const currencies = useCurrenciesStore()

onMounted(async () => {
    currencies.fetchAllCurrencies()
})
</script>
<style scoped>
header {
    display: flex;
    align-items: center;
    line-height: 1.5;
    height: 15vh;
}

main {
    width: 100%;
    min-height: 85vh;
    overflow-y: auto;
}

footer {
    width: 100%;
    height: 250px;
    background-color: var(--color-background-soft);
}
</style>
