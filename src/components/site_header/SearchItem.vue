<template>
    <li v-on:click="goToCoin()">
        <CoinCell
            :image="props.currency.image"
            :name="props.currency.name"
            :symbol="props.currency.symbol"
        ></CoinCell>
        <PercentageChange :change="props.currency.price_change_percentage_24h"></PercentageChange>
    </li>
</template>

<script setup lang="ts">
import { Currency } from '@/stores/currencies'
import CoinCell from '../currency_table/CoinCell.vue'
import PercentageChange from '../PercentageChange.vue'
import router from '@/router'
interface Props {
    currency: Currency
}

const props = defineProps<Props>()

const goToCoin = () => {
    router.push(`/coin/${props.currency.id}`)
}
</script>

<style scoped>
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px 8px 10px;
    border-radius: 5px;
}

li:hover {
    background-color: var(--color-background-mute);
    cursor: pointer;
}

img {
    width: 20px;
}

:deep(.coin-cell) {
    flex: 1;
    min-width: 0;
}

:deep(.name-ticker-wrapper) {
    flex: 1;
    min-width: 0;
}

:deep(.coin-name) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
