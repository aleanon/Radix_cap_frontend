<template>
    <div :class="getPriceChangeColor(props.change)">
        <font-awesome-icon v-if="caret(props.change) != ''" :icon="caret(props.change)" />
        {{ formatPercentage(change) }}
    </div>
</template>

<script setup lang="ts">
interface Props {
    change: number | null
}

const props = defineProps<Props>()

const formatPercentage = (num: number | null): string => {
    if (num === null) return '0.00%'
    if (Number.isNaN(num)) return '-'
    if (num < 0) return `${(num * -1).toFixed(2)}%`
    return `${num.toFixed(2)}%`
}

const caret = (num: number | null): string => {
    if (!num || Number.isNaN(num)) return ''
    return num >= 0 ? 'caret-up' : 'caret-down'
}

const getPriceChangeColor = (change: number | null): string => {
    if (!change) return ''
    if (Number.isNaN(change)) return 'no-change'
    return change >= 0.0 ? 'positive-change' : 'negative-change'
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    gap: 5px;
}

.negative-change {
    color: var(--color-negative);
}

.positive-change {
    color: var(--color-positive);
}
</style>
