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
                        <th class="sticky-top" id="rank-th">#</th>
                        <th class="sticky-top" id="coin-th">Coin</th>
                        <th class="sticky-top">Price</th>
                        <th class="sticky-top">1H</th>
                        <th class="sticky-top">24H</th>
                        <th class="sticky-top">7D</th>
                        <th class="sticky-top">24H Volume</th>
                        <th class="sticky-top">Marketcap</th>
                        <th class="sticky-top">Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    <CoinRow
                        v-for="currency in currencies"
                        :key="currency.id"
                        :currency="currency"
                    ></CoinRow>
                </tbody>
            </table>
        </div>
        <TablePageControl></TablePageControl>
    </div>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { computed, onMounted, watch } from 'vue'
import { useCurrencyTable } from '@/stores/currencyTable'
import TablePageControl from './currency_table/TablePageControl.vue'
import CoinRow from './currency_table/CoinRow.vue'

const currenciesStore = useCurrenciesStore()
const currencies = computed(() => {
    const startRank = (tableState.activePage - 1) * tableState.rowsPrPage + 1
    const endRank = tableState.activePage * tableState.rowsPrPage
    return currenciesStore.getCurrencies(startRank, endRank)
})

const tableState = useCurrencyTable()
const active_page = computed(() => tableState.activePage)

const fetchCurrenciesForCurrentPage = async () => {
    currenciesStore.fetchCurrenciesForCurrentPage(active_page.value, tableState.rowsPrPage)
}

onMounted(() => {
    fetchCurrenciesForCurrentPage()
})

watch(active_page, () => {
    fetchCurrenciesForCurrentPage()
})
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
}

#table-wrapper {
    width: 100%;
    min-height: 60%;
    overflow-x: auto;
}

#table-wrapper::-webkit-scrollbar {
    display: none;
}

table {
    display: table;
    border-spacing: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    border-collapse: collapse;
}

.sticky-top {
    position: sticky;
    top: 0;
    background-color: var(--color-background);
    z-index: 3;
}

thead {
    position: sticky;
    top: 0;
    z-index: 3;
}

thead th {
    position: sticky;
    top: 0;
    background-color: var(--color-background);
}

tr {
    height: 80px;
    border-bottom: 1px solid white;
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

th {
    text-align: right;
    justify-items: center;
    font-size: 0.9em;
    color: azure;
    font-weight: 500;
    padding: 10px;
}

#rank-th {
    position: sticky;
    left: 0;
    background-color: var(--color-background);
    z-index: 4;
}

#coin-th {
    position: sticky;
    left: 50px;
    background-color: var(--color-background);
    z-index: 4;
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
</style>
