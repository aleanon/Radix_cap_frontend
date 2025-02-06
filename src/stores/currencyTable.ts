import { defineStore } from 'pinia'
import type { Router } from 'vue-router'

export const useCurrencyTable = defineStore('tableState', {
    state: () => ({
        activePage: 1,
        nrOfCurrenciesPerPage: 100,
    }),
    actions: {
        setPage(page: number, router: Router) {
            if (page === this.activePage || page < 1) return
            this.activePage = page
            router.push(`/coins/page/${page}`)
        },
        setNrOfCurrenciesPerPage(nrOfCurrencies: number) {
            this.nrOfCurrenciesPerPage = nrOfCurrencies
        },
    },
})
