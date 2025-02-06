import { defineStore } from 'pinia'

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
        coins: new Map<string, Currency>(),
    }),
    actions: {
        setCurrencies(currencies: Currency[]): void {
            try {
                currencies.forEach((currency) => {
                    this.coins.set(currency.id, currency)
                })
            } catch (err) {
                console.error('Error parsing JSON', err)
            }
        },
        getCurrencies(start_rank: number, end_rank: number): Currency[] {
            const currencies = []
            for (const currency of this.coins.values()) {
                if (currency.market_cap_rank < start_rank || currency.market_cap_rank > end_rank)
                    continue

                currencies.push(currency)
            }
            return currencies.sort((a, b) => (a.market_cap_rank, b.market_cap_rank))
        },
        async fetchActiveCurrencies() {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/global')
                const data = await response.json()
                this.active_cryptocurrencies = data.data.active_cryptocurrencies
            } catch (err) {
                console.error('Error fetching active cryptocurrencies', err)
            }
        },
    },
})
