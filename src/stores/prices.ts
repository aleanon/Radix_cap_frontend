import { defineStore } from 'pinia'

export class PricePoint {
    timestamp: number
    value: number

    constructor(timestamp: number, value: number) {
        this.timestamp = timestamp
        this.value = value
    }
}

export const usePricesStore = defineStore('prices', {
    state: () => ({
        prices: new Map<string, PricePoint[]>(),
    }),
    actions: {
        addPrices(id: string, prices: PricePoint[]): void {
            const entry = this.prices.get(id)

            if (!entry) {
                this.prices.set(id, prices)
            } else {
                entry.push(...prices)
                entry.sort((a, b) => a.timestamp - b.timestamp)
            }
        },
        getPrices(id: string): PricePoint[] {
            return this.prices.get(id) || []
        },
    },
})
