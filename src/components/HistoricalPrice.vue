<template>
    <section id="statistics-wrapper">
        <h2>{{ props.currency.symbol.toUpperCase() }} Historical Price</h2>
        <div class="row">
            <label>24h Range</label>
            <b>
                {{ formatPrice(props.currency.low_24h) }} -
                {{ formatPrice(props.currency.high_24h) }}
            </b>
        </div>
        <div class="row">
            <label>7d Range</label>
            <b>{{ formatPrice(sevenDayLow) }} - {{ formatPrice(sevenDayHigh) }}</b>
        </div>
        <div class="row">
            <label>All-Time High</label>
            <div>
                <div class="historic-price-percentage">
                    <b>{{ formatPrice(props.currency.ath) }}</b>
                    <PercentageChange
                        :change="props.currency.ath_change_percentage"
                        class="percentage"
                    ></PercentageChange>
                </div>
                <p>{{ props.currency.ath_date }}</p>
            </div>
        </div>
        <div class="row">
            <label>All-Time Low</label>
            <div>
                <div class="historic-price-percentage">
                    <b>{{ formatPrice(props.currency.atl) }}</b>
                    <PercentageChange
                        :change="props.currency.atl_change_percentage"
                        class="percentage"
                    ></PercentageChange>
                </div>
                <p>{{ props.currency.atl_date }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Currency } from '@/stores/currencies'
import { computed } from 'vue'
import PercentageChange from './PercentageChange.vue'

interface Props {
    currency: Currency
}

const props = defineProps<Props>()

const sevenDayLow = computed(() => {
    return props.currency.sparkline_in_7d.price.reduce((lowest, price) => {
        if (price < lowest) lowest = price
        return lowest
    }, props.currency.current_price)
})

const sevenDayHigh = computed(() => {
    return props.currency.sparkline_in_7d.price.reduce((highest, price) => {
        if (price > highest) highest = price
        return highest
    }, props.currency.current_price)
})

const formatPrice = (price: number | null): string => {
    if (price === null) return '-'
    return `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}
</script>

<style scoped>
section {
    width: 100%;
}

h2 {
    font-size: 1.3em;
    color: var(--color-heading);
}
h2,
.row {
    border-bottom: 1px solid var(--color-border);
    padding: 10px 0;
}

.row {
    width: 100%;
    display: flex;
    font-size: 1.1em;
    justify-content: space-between;
}

label {
    align-content: center;
}

.historic-price-percentage {
    display: flex;
    align-items: space-between;
    justify-self: right;
    gap: 10px;
}

b {
    color: var(--color-heading);
    font-weight: 400;
}
</style>
