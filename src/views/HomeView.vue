<template>
    <div id="table-wrapper">
        <div class="free-space"></div>
        <table>
            <thead>
                <tr>
                    <th class="rank-col">Rank</th>
                    <th class="coin-col">Coin</th>
                    <th>Ticker</th>
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
                    <td class="rank-col">{{ currency.market_cap_rank }}</td>
                    <td class="coin-col">
                        <div class="coin-icon">
                            <img :src="currency.image" :alt="currency.name" width="20" />
                        </div>
                        <div class="coin-name">{{ currency.name }}</div>
                    </td>
                    <td>{{ currency.symbol.toUpperCase() }}</td>
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
        <div class="free-space"></div>
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
    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B'
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M'
    }
    return num.toLocaleString('en-US')
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
    display: flex;
}

table {
    border-spacing: 0;
    width: 80%;
}

th,
td {
    text-align: right;
    justify-items: center;
    width: auto;
}

tr {
    height: 80px;
}

tr:hover {
    background-color: var(--vt-c-divider-dark-1);
}

.rank-col,
.coin-col {
    text-align: left;
}

.rank-col {
    width: 15px;
}

.coin-col {
    display: flex;
    height: inherit;
    gap: 10px;
    align-items: center;
    text-wrap-mode: wrap;
    width: 150px;
}

.coin-icon {
    display: flex;
    align-items: center;
}

.coin-col {
}

.free-space {
    flex-grow: 1;
}
</style>
