<template>
    <div class="coin-cell">
        <div class="coin-icon">
            <img :src="props.image" :alt="props.name" width="30" />
        </div>
        <div class="name-ticker-wrapper">
            <div class="coin-name">{{ props.name }}</div>
            <div class="ticker">{{ props.symbol.toUpperCase() }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface CoinCellProps {
    image: string
    name: string
    symbol: string
}

const props = defineProps<CoinCellProps>()
</script>

<style scoped>
.coin-cell {
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
    height: 100%;
}

.coin-icon {
    display: flex;
    align-items: center;
}

.name-ticker-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    text-align: left;
}

.coin-name {
    font-weight: 500;
}

.ticker {
    font-size: 14px;
    font-weight: 100;
    width: 100%;
}

@media (max-width: 1024px) {
    .name-ticker-wrapper {
        flex-direction: column;
        gap: 0;
    }
}
</style>
