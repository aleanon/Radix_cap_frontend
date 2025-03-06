<template>
    <div id="site">
        <SiteHeader id="header"></SiteHeader>

        <main>
            <RouterView :key="$route.fullPath" />
        </main>
    </div>
    <footer>
        <p>�� 2023 My Cryptocurrency App</p>
    </footer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useCurrenciesStore } from './stores/currencies'
import SiteHeader from './components/SiteHeader.vue'

const currenciesStore = useCurrenciesStore()

onMounted(async () => {
    currenciesStore.fetchAllCurrencies()
})
</script>
<style scoped>
#site {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
#header {
    height: 15vh;
    margin-bottom: 100px;
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
