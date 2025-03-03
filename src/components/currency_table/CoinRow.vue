<template>
    <tr v-on:click="goToCoin()">
        <td class="rank-cell">{{ props.currency.market_cap_rank }}</td>
        <td class="coin-cell-td">
            <CoinCell
                :image="props.currency.image"
                :name="props.currency.name"
                :symbol="props.currency.symbol"
            />
        </td>
        <td>${{ formatPrice(props.currency.current_price) }}</td>
        <td>
            <PercentageChange
                :change="percentagePriceChange1Hr"
                class="percentage-change"
            ></PercentageChange>
        </td>
        <td>
            <PercentageChange
                :change="percentagePriceChange24Hr"
                class="percentage-change"
            ></PercentageChange>
        </td>
        <td>
            <PercentageChange
                :change="percentagePriceChange7D"
                class="percentage-change"
            ></PercentageChange>
        </td>
        <td>${{ formatNumber(props.currency.total_volume) }}</td>
        <td>${{ formatNumber(props.currency.market_cap) }}</td>
        <td>
            <NonInteractiveChart :data="props.currency.sparkline_in_7d.price" />
        </td>
    </tr>
</template>

<script setup lang="ts">
import { Currency } from '@/stores/currencies'
import { computed } from 'vue'
import CoinCell from './CoinCell.vue'
import NonInteractiveChart from './NonInteractiveChart.vue'
import router from '@/router'
import PercentageChange from '../PercentageChange.vue'

interface CoinRowProps {
    currency: Currency
}

const props = defineProps<CoinRowProps>()

const percentagePriceChange1Hr = computed(() => {
    const currentPrice = props.currency.current_price
    const priceOneHour =
        props.currency.sparkline_in_7d.price[props.currency.sparkline_in_7d.price.length - 1]
    return ((currentPrice - priceOneHour) / currentPrice) * 100
})

const percentagePriceChange24Hr = computed(() => props.currency.price_change_percentage_24h)

const percentagePriceChange7D = computed(() => {
    const currentPrice = props.currency.current_price
    const priceSevenDays = props.currency.sparkline_in_7d.price[0]
    return ((currentPrice - priceSevenDays) / currentPrice) * 100
})

const formatPrice = (price: number | null): string => {
    if (price === null) return '-'
    return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

const formatNumber = (num: number | null): string => {
    if (num === null) return '-'
    const floored = Math.floor(num)
    return floored.toLocaleString()
}

const goToCoin = () => {
    const coin = props.currency
    router.push(`/coin/${coin.id}`)
}
</script>

<style scoped>
tr {
    cursor: pointer;
}

td {
    display: table-cell;
    text-align: right;
    justify-items: center;
    font-size: 0.9em;
    color: azure;
    font-weight: 500;
    padding: 10px;
    vertical-align: inherit;
    unicode-bidi: isolate;
}

.coin-cell-td {
    position: sticky;
    left: 50px;
    background-color: var(--color-background);
    width: auto;
    height: inherit;
    z-index: 4;
    height: 80px;
}

.rank-cell {
    width: 15px;
    text-align: center;
    position: sticky;
    left: 0;
    background-color: var(--color-background);
    z-index: 2;
}

tbody tr:hover,
tbody tr:hover .coin-cell-td,
tbody tr:hover .rank-cell,
tbody tr:hover td[style*='position: sticky'] {
    background-color: var(--color-background-hover);
}

.percentage-change {
    font-weight: 600;
    justify-self: right;
}
</style>
