<template>
    <section>
        <header>
            <img :src="props.currency.image" :alt="props.currency.name" />
            <h2>{{ props.currency.name }}</h2>
            <p id="symbol">{{ props.currency.symbol.toUpperCase() }} Price</p>
            <p id="rank">#{{ props.currency.market_cap_rank }}</p>
        </header>
        <div id="price-container">
            <p id="price">${{ formatPrice(props.currency.current_price) }}</p>
            <PercentageChange
                id="change"
                :change="props.currency.price_change_percentage_24h"
            ></PercentageChange>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Currency } from '@/stores/currencies'
import PercentageChange from './PercentageChange.vue'

interface Props {
    currency: Currency
}

const props = defineProps<Props>()

const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
}

header {
    display: flex;
    align-items: center;
    background-color: var(--color-background);
}

img {
    width: 30px;
    height: 30px;
    padding-right: 5px;
}

h2 {
    font-size: 1.2em;
    padding-right: 5px;
    color: var(--color-heading);
}

#symbol {
    padding-right: 5px;
}

#rank {
    background-color: var(--color-background-hover);
    border-radius: 5px;
    padding: 1px 4px;
}

#price-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

#price {
    font-size: 2.5em;
    color: var(--color-heading);
}

#change {
    font-size: 1.5em;
}
</style>
