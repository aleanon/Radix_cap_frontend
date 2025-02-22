<template>
    <section id="statistics-wrapper">
        <h2>{{ props.currency.name }} Statistics</h2>
        <div class="row">
            <label>Market Cap</label>
            <b>${{ props.currency.market_cap.toLocaleString() }}</b>
        </div>
        <div class="row">
            <label>Fully Diluted Valuation</label>
            <b>${{ props.currency.fully_diluted_valuation.toLocaleString() }}</b>
        </div>
        <div class="row">
            <label>24-Hour Trading Volume</label>
            <b>${{ props.currency.total_volume.toLocaleString() }}</b>
        </div>
        <div class="row">
            <label>Total Value Locked</label>
            <b>Placeholder</b>
        </div>
        <div class="row">
            <label>Circulating Supply</label>
            <b>{{ props.currency.circulating_supply.toLocaleString() }}</b>
        </div>
        <div class="row">
            <label>Total Supply</label>
            <b>{{ props.currency.total_supply.toLocaleString() }}</b>
        </div>
        <div class="row">
            <label>Max Supply</label>
            <b>
                {{ props.currency.max_supply ? props.currency.max_supply.toLocaleString() : '∞' }}
            </b>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Currency } from '@/stores/currencies'

interface Props {
    currency: Currency
}

const props = defineProps<Props>()
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

b {
    color: var(--color-heading);
    font-weight: 400;
}
</style>
