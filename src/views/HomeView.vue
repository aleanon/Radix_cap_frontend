<template>
    <div id="table-wrapper">
        <!-- <div class="free-space"></div> -->
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
                    <th class="rank-col">Rank</th>
                    <th class="coin-col">Coin</th>
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
                    <td class="coin-cell">
                        <div class="coin-icon">
                            <img :src="currency.image" :alt="currency.name" width="30" />
                        </div>
                        <div class="name-ticker-wrapper">
                            <div class="coin-name">{{ currency.name }}</div>
                            <div class="ticker">{{ currency.symbol.toUpperCase() }}</div>
                        </div>
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
                    <td>Chart placeholder</td>
                </tr>
            </tbody>
        </table>
        <!-- <div class="free-space"></div> -->
    </div>
</template>

<script setup lang="ts">
import { Currency, useCurrenciesStore } from '@/stores/currencies'
import { computed } from 'vue'

const currenciesStore = useCurrenciesStore()

const currencies = computed(() => Array.from(currenciesStore.coins.values()))

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
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currenciesStore.active_page}`,
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Currency[] = await response.json()
        console.log(data)
        currenciesStore.setCurrencies(data)
    } catch (error) {
        console.error(
            `Error fetching cryptocurrencies for page ${currenciesStore.active_page}:`,
            error,
        )
    }
}

fetchCurrenciesForCurrentPage()
</script>

<style scoped>
#table-wrapper {
    width: 100%;
    height: 100%;
    display: block;
    overflow-x: auto hidden;
    max-width: 1600px;
    min-width: 1300px;
}

table {
    display: table;
    border-spacing: 0;
    width: 100%;
    border-collapse: collapse;
}

tbody tr {
    cursor: pointer;
}

col {
    display: table-column;
    unicode-bidi: isolate;
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
}

th,
td {
    text-align: right;
    justify-items: center;
    font-size: 0.9em;
    color: azure;
    font-weight: 500;
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

tr:hover .coin-cell,
tr:hover td[style*='position: sticky'] {
    background-color: var(--color-background-hover);
}

tr:hover {
    background-color: var(--color-background-hover);
}

.rank-cell,
.coin-cell {
    text-align: left;
}

.rank-cell {
    width: 15px;
    text-align: center;
}

.coin-cell {
    display: flex;
    height: inherit;
    position: sticky;
    gap: 15px;
    align-items: center;
    text-wrap-mode: wrap;
    width: auto;
    left: 0;
    padding-left: 15px;
    background-color: var(--color-background);
    z-index: 1;
}

.coin-icon {
    display: flex;
    align-items: center;
}

.name-ticker-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
}

@media (max-width: 1024px) {
    .name-ticker-wrapper {
        flex-direction: column;
        gap: 0;
    }

    .coin-col {
        min-width: 200px;
        width: 200px;
    }
}

.coin-name {
    font-weight: 500;
}

.ticker {
    font-size: 0.9em;
    font-weight: 100;
    width: 100%;
}

th.rank-col,
th.coin-col {
    z-index: 2;
    /* background-color: var(--color-background); */
}

.negative-change {
    color: var(--color-negative);
}

.positive-change {
    color: var(--color-positive);
}

/* .free-space {
    flex-grow: 1;
} */
</style>
