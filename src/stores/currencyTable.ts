import { defineStore } from 'pinia'
import type { Router } from 'vue-router'

export const useCurrencyTable = defineStore('tableState', {
    state: () => ({
        activePage: 1,
        rowsPrPage: 100,
    }),
    actions: {
        setPage(page: number, router: Router) {
            if (page === this.activePage || page < 1) return
            this.activePage = page
            router.push(`/coins/page/${page}`)
        },
        setRowsPerPage(nrOfCurrencies: number, router: Router) {
            this.rowsPrPage = nrOfCurrencies
            this.setPage(1, router)
        },
        getRowsPerPage(): string {
            return String(this.rowsPrPage)
        },
    },
})
