<template>
    <div id="page-wrapper" v-if="currency != null">
        <CoinHeader v-if="currency != null" :data="currency.id" :currency="currency"></CoinHeader>
        <CoinStatistics :currency="currency"></CoinStatistics>
        <HistoricalPrice :currency="currency"></HistoricalPrice>
    </div>
    <div id="not-found" v-else>Asset Not found</div>
</template>

<script setup lang="ts">
import CoinHeader from '@/components/CoinHeader.vue'
import CoinStatistics from '@/components/CoinStatistics.vue'
import HistoricalPrice from '@/components/HistoricalPrice.vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currencyId = route.params.coinId as string

const currencyStore = useCurrenciesStore()
const currency = computed(() => currencyStore.getCurrency(currencyId))
</script>

<style scoped>
#page-wrapper {
    display: flex;
    justify-self: center;
    width: 80%;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    height: 85vh;
    background-color: var(--background);
}

#not-found {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: var(--color);
}
</style>
