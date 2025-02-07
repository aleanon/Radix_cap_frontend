<template>
    <div id="table-page-controls">
        <div id="rank-info">
            <p>
                <span class="hide">Showing </span>
                <span class="hide-last">
                    {{ computedValues.startRank }} to {{ computedValues.endRank }}
                </span>
                <span class="hide"> of {{ currencyStore.active_cryptocurrencies }}</span>
            </p>
        </div>
        <div class="space"></div>
        <div id="table-page-nav">
            <button @click="previousPage()">˂</button>
            <div id="number-buttons">
                <button
                    v-for="number in computedValues.pageNumbers"
                    :key="number"
                    :class="
                        Number(number) === computedValues.currentPage
                            ? 'selected'
                            : isNaN(Number(number))
                              ? 'elipse'
                              : 'not-selected'
                    "
                    @click="goToPage(number)"
                >
                    {{ number }}
                </button>
            </div>
            <button @click="nextPage()">˃</button>
        </div>
        <div class="space"></div>
        <div id="selector-wrapper">
            <label id="selector-label" for="row-selector">Rows</label>
            <select id="row-selector" v-model="selectedOption">
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
                <option :value="200">200</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { useCurrencyTable } from '@/stores/currencyTable'
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const tableState = useCurrencyTable()
const currencyStore = useCurrenciesStore()

const previousPage = () => {
    tableState.setPage(tableState.activePage - 1, router)
}
const nextPage = () => {
    tableState.setPage(tableState.activePage + 1, router)
}
const goToPage = (page: string) => {
    const num = Number(page)
    if (isNaN(num)) return
    tableState.setPage(num, router)
}

const selectedOption = computed({
    get: () => tableState.rowsPrPage,
    set: (value) => tableState.setRowsPerPage(value, router),
})

const computedValues = computed(() => {
    const currentPage = Number(router.currentRoute.value.params.pageNumber)
    const nrOfPages = Math.floor(currencyStore.active_cryptocurrencies / 100)
    const startRank = (currentPage - 1) * tableState.rowsPrPage + 1
    const endRank = startRank + tableState.rowsPrPage - 1

    if (nrOfPages <= 9) {
        return {
            currentPage: currentPage,
            nrOfPages: nrOfPages,
            pageNumbers: Array.from({ length: nrOfPages }, (_, i) => (i + 1).toString()),
        }
    }

    const pages: string[] = []
    const addEllipsis = () => pages.push('...')
    const addPage = (pageNum: number) => pages.push(pageNum.toString())

    addPage(1)

    if (currentPage <= 4) {
        for (let i = 2; i <= 7; i++) {
            addPage(i)
        }
        addEllipsis()
    } else if (currentPage >= nrOfPages - 3) {
        addEllipsis()
        for (let i = nrOfPages - 6; i < nrOfPages; i++) {
            addPage(i)
        }
    } else {
        addEllipsis()
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            addPage(i)
        }
        addEllipsis()
    }

    addPage(nrOfPages)

    return {
        nrOfPages: nrOfPages,
        currentPage: currentPage,
        pageNumbers: pages,
        startRank: startRank,
        endRank: endRank,
    }
})

watch(
    () => route.params.pageNumber,
    (newPage) => {
        const pageNum = Number(newPage)
        if (!isNaN(pageNum) && pageNum !== tableState.activePage) {
            tableState.activePage = pageNum
        }
    },
    { immediate: true },
)
</script>

<style scoped>
#table-page-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    overflow-x: auto;
}

#table-page-controls::-webkit-scrollbar {
    display: none;
}

#rank-info {
    width: auto;
}

.space {
    width: auto;
}

#table-page-nav {
    width: auto;
    display: flex;
    justify-content: space-between;
}

#number-buttons {
    display: flex;
    gap: 5px;
}

button {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1.1em;
    font-weight: 600;
}

.elipse {
    cursor: text;
}

.not-selected:hover {
    background-color: var(--color-background-hover);
}

.selected {
    background-color: var(--color-background-selected);
    cursor: default;
}

#selector-wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
}

#row-selector {
    width: 80px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1em;
}

@media (max-width: 1024px) {
    .not-selected:first-child {
        display: none;
    }

    .not-selected:last-child {
        display: None;
    }

    .elipse {
        display: none;
    }

    .hide {
        display: none;
    }
}

@media (max-width: 800px) {
    .hide-last {
        display: none;
    }

    .space {
        display: none;
    }

    .not-selected:nth-child(2) {
        display: none;
    }
    .not-selected:nth-last-child(3) {
        display: none;
    }
    #selector-label {
        display: none;
    }
}
</style>
