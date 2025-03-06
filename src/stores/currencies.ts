import { defineStore } from 'pinia'
import { shallowRef, type ShallowRef } from 'vue'

export class Roi {
    times: number
    currency: string
    percentage: number

    constructor(times: number, currency: string, percentage: number) {
        this.times = times
        this.currency = currency
        this.percentage = percentage
    }
}

export class SparklineInSevenDays {
    price: number[]

    constructor(price: number[]) {
        this.price = price
    }
}

export class Currency {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi: Roi | null
    last_updated: string
    sparkline_in_7d: SparklineInSevenDays

    constructor(
        id: string,
        symbol: string,
        name: string,
        image: string,
        current_price: number,
        market_cap: number,
        market_cap_rank: number,
        fully_diluted_valuation: number,
        total_volume: number,
        high_24h: number,
        low_24h: number,
        price_change_24h: number,
        price_change_percentage_24h: number,
        market_cap_change_24h: number,
        market_cap_change_percentage_24h: number,
        circulating_supply: number,
        total_supply: number,
        max_supply: number,
        ath: number,
        ath_change_percentage: number,
        ath_date: string,
        atl: number,
        atl_change_percentage: number,
        atl_date: string,
        roi: Roi | null,
        last_updated: string,
        sparkline: SparklineInSevenDays = new SparklineInSevenDays([]),
    ) {
        this.id = id
        this.symbol = symbol
        this.name = name
        this.image = image
        this.current_price = current_price
        this.market_cap = market_cap
        this.market_cap_rank = market_cap_rank
        this.fully_diluted_valuation = fully_diluted_valuation
        this.total_volume = total_volume
        this.high_24h = high_24h
        this.low_24h = low_24h
        this.price_change_24h = price_change_24h
        this.price_change_percentage_24h = price_change_percentage_24h
        this.market_cap_change_24h = market_cap_change_24h
        this.market_cap_change_percentage_24h = market_cap_change_percentage_24h
        this.circulating_supply = circulating_supply
        this.total_supply = total_supply
        this.max_supply = max_supply
        this.ath = ath
        this.ath_change_percentage = ath_change_percentage
        this.ath_date = ath_date
        this.atl = atl
        this.atl_change_percentage = atl_change_percentage
        this.atl_date = atl_date
        this.roi = roi
        this.last_updated = last_updated
        this.sparkline_in_7d = sparkline
    }
}

export const useCurrenciesStore = defineStore('currencies', {
    state: () => ({
        active_cryptocurrencies: 0,
        coins: new Map<string, ShallowRef<Currency, Currency>>(),
    }),
    actions: {
        setCurrencies(currencies: Currency[]): void {
            currencies.forEach((currency) => {
                this.coins.set(currency.id, shallowRef(currency))
            })
            this.active_cryptocurrencies = this.coins.size
        },
        getCurrencies(start_rank: number, end_rank: number): Currency[] {
            const currencies = []
            for (const currency of this.coins.values()) {
                if (
                    currency.value.market_cap_rank < start_rank ||
                    currency.value.market_cap_rank > end_rank
                )
                    continue

                currencies.push(currency.value)
            }
            return currencies.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
        },
        searchCurrencies(search: string): Currency[] {
            const query = search.toLowerCase()
            const currencies = Array.from(this.coins.values()).sort(
                (a, b) => b.value.market_cap - a.value.market_cap,
            )
            let matches = 0
            const result: Currency[] = []
            for (const currency of currencies) {
                if (matches >= 30) break
                if (!isValidCurrency(currency.value)) continue
                if (
                    currency.value.name.toLowerCase().includes(query) ||
                    currency.value.symbol.toLowerCase().includes(query)
                ) {
                    result.push(currency.value)
                    matches++
                }
            }
            return result
        },
        getCurrencyIds(): string[] {
            const ids: string[] = []
            for (const id of this.coins.keys()) {
                ids.push(id)
            }
            return ids
        },
        getCurrencyById(id: string): Currency | null {
            return this.coins.get(id)?.value ?? null
        },
        // async fetchActiveCurrencies() {
        //     try {
        //         const response = await fetch('https://api.coingecko.com/api/v3/global')
        //         const data = await response.json()
        //         this.active_cryptocurrencies = data.data.active_cryptocurrencies
        //     } catch (err) {
        //         console.error('Error fetching active cryptocurrencies', err)
        //     }
        // },
        async fetchAllCurrencies() {
            try {
                const response = await fetch('http://127.0.0.1:5000/AllCoins')
                const data = await response.json()
                this.setCurrencies(data)
            } catch (err) {
                console.error('Error fetching all cryptocurrencies', err)
            }
        },
        async fetchCurrenciesForCurrentPage(activePage: number, rowsPrPage: number) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/Coins/?page=${activePage}&assetPrPage=${rowsPrPage}`,
                )
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: Currency[] = await response.json()

                this.setCurrencies(data)
            } catch (error) {
                console.error(`Error fetching cryptocurrencies for page ${activePage}:`, error)
            }
        },
        async fetchCurrency(coinId: string) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/Coin/${coinId}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: Currency = await response.json()

                return data
            } catch (error) {
                console.error(`Error fetching coin data for ${coinId}:`, error)
                return null
            }
        },
    },
})

function isValidCurrency(currency: Currency): boolean {
    return currency.id != null && currency.name != null && currency.symbol != null
}
