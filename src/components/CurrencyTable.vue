<template>
    <div class="container">
        <div id="table-wrapper">
            <table>
                <colgroup>
                    <col class="rank-col" />
                    <col class="coin-col" />
                    <col />
                    <col style="width: 84px; min-width: auto; max-width: auto" />
                    <col style="width: 84px; min-width: auto; max-width: auto" />
                    <col style="width: 84px; min-width: auto; max-width: auto" />
                    <col style="width: 200px; min-width: auto; max-width: auto" />
                    <col style="width: 200px; min-width: auto; max-width: auto" />
                    <col style="width: 200px; min-width: auto; max-width: auto" />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th id="rank-th">#</th>
                        <th id="coin-th">Coin</th>
                        <th>Price</th>
                        <th>1H</th>
                        <th>24H</th>
                        <th>7D</th>
                        <th>24H Volume</th>
                        <th>Marketcap</th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="currency in currencies" :key="currency.id">
                        <td class="rank-cell">{{ currency.market_cap_rank }}</td>
                        <td class="coin-cell-td">
                            <CoinCell
                                :image="currency.image"
                                :name="currency.name"
                                :symbol="currency.symbol"
                            />
                        </td>
                        <td>${{ formatPrice(currency.current_price) }}</td>
                        <td :class="getPriceChangeColor(currency.price_change_24h)">
                            {{ formatPercentage(currency.price_change_percentage_24h) }}%
                        </td>
                        <td :class="getPriceChangeColor(currency.price_change_24h)">
                            {{ formatPercentage(currency.price_change_percentage_24h) }}%
                        </td>
                        <td :class="getPriceChangeColor(currency.price_change_24h)">
                            {{ formatPercentage(currency.price_change_percentage_24h) }}%
                        </td>
                        <td>${{ formatNumber(currency.total_volume) }}</td>
                        <td>${{ formatNumber(currency.market_cap) }}</td>
                        <td>
                            <NonInteractiveChart :data="currency.sparkline_in_7d.price" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Currency, useCurrenciesStore } from '@/stores/currencies'
import { computed, watch } from 'vue'
import CoinCell from '@/components/CoinCell.vue'
import NonInteractiveChart from './NonInteractiveChart.vue'
import { useCurrencyTable } from '@/stores/currencyTable'

const currenciesStore = useCurrenciesStore()
const currencies = computed(() => {
    const startRank = (tableState.activePage - 1) * tableState.nrOfCurrenciesPerPage + 1
    const endRank = tableState.activePage * tableState.nrOfCurrenciesPerPage
    return currenciesStore.getCurrencies(startRank, endRank)
})

const tableState = useCurrencyTable()
const active_page = computed(() => tableState.activePage)

const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

const formatNumber = (num: number): string => {
    const floored = Math.floor(num)
    return floored.toLocaleString()
}

const formatPercentage = (num: number | null): string => {
    if (num === null) return '0.00'
    return num.toFixed(2)
}

const getPriceChangeColor = (change: number | null): string => {
    if (!change) return ''
    return change > 0 ? 'positive-change' : 'negative-change'
}

const fetchCurrenciesForCurrentPage = async () => {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${active_page.value}&sparkline=true`,
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Currency[] = await response.json()

        currenciesStore.setCurrencies(data)
    } catch (error) {
        console.error(`Error fetching cryptocurrencies for page ${active_page.value}:`, error)
    }
}

watch(active_page, () => {
    fetchCurrenciesForCurrentPage()
})

fetchCurrenciesForCurrentPage()
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1400px;
    overflow: hidden;
}

#table-wrapper {
    width: 100%;
    overflow-x: auto;
    overflow-y: visible;
}

#table-wrapper::-webkit-scrollbar {
    display: none;
}

table {
    display: table;
    border-spacing: 0;
    width: 100%;
    min-width: 1200px;
    border-collapse: collapse;
    position: relative;
}

tbody tr {
    cursor: pointer;
}

.rank-col {
    width: 50px;
    min-width: auto;
    max-width: auto;
}

.coin-col {
    width: 250px;
    min-width: auto;
    max-width: auto;
    text-align: left;
}

#rank-th {
    text-align: center;
}
#coin-th {
    text-align: left;
}

th,
td {
    text-align: right;
    justify-items: center;
    font-size: 0.9em;
    color: azure;
    font-weight: 500;
    padding: 10px;
}

td {
    display: table-cell;
    vertical-align: inherit;
    unicode-bidi: isolate;
}

tr {
    height: 80px;
    border-bottom: 1px solid white;
}

tbody tr:hover,
tbody tr:hover .coin-cell-td,
tbody tr:hover .rank-cell,
tbody tr:hover td[style*='position: sticky'] {
    background-color: var(--color-background-hover);
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
    text-align: left;
}

.rank-cell {
    width: 15px;
    text-align: center;
    position: sticky;
    left: 0;
    background-color: var(--color-background);
    z-index: 2;
}

#rank-th {
    position: sticky;
    left: 0;
    background-color: var(--color-background);
    z-index: 3;
}

#coin-th {
    position: sticky;
    left: 50px;
    background-color: var(--color-background);
    z-index: 3;
}

@media (max-width: 1024px) {
    .coin-col {
        min-width: auto;
        width: 150px;
    }
}

th.rank-col,
th.coin-col {
    z-index: 2;
}

.negative-change {
    color: var(--color-negative);
}

.positive-change {
    color: var(--color-positive);
}
</style>
