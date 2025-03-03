<template>
    <div class="chart-container">
        <svg :width="width" :height="height" class="chart">
            <path
                v-if="paths.areaPath"
                :d="paths.areaPath"
                :class="['area-path', positiveChange ? 'positive-change' : 'negative-change']"
            />
            <path
                v-if="paths.linePath"
                :d="paths.linePath"
                :class="['line-path', positiveChange ? 'positive-change' : 'negative-change']"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    data: number[]
    width?: number
    height?: number
}

const props = withDefaults(defineProps<Props>(), {
    width: 200,
    height: 60,
})

const positiveChange = computed(() => {
    return props.data[0] <= props.data[props.data.length - 1]
})

const paths = computed(() => {
    if (!props.data || props.data.length < 2) {
        return { linePath: '', areaPath: '' }
    }

    const minValue = Math.min(...props.data)
    const maxValue = Math.max(...props.data)
    const valueRange = maxValue - minValue || 1

    const padding = 0
    const points = props.data.map((value, index) => {
        const x = (index / (props.data.length - 1)) * props.width
        const y =
            props.height -
            padding -
            ((value - minValue) / valueRange) * (props.height - padding * 2)
        return { x, y }
    })

    if (points.length === 0) {
        return { linePath: '', areaPath: '' }
    }

    const linePath = points.reduce(
        (path, point, i) =>
            path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`),
        '',
    )

    const areaPath = linePath + ` L ${props.width},${props.height}` + ` L 0,${props.height} Z`

    return { linePath, areaPath }
})
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}

.chart {
    display: block;
}

.line-path {
    stroke-width: 2;
    fill: none;
}

.line-path.positive-change {
    stroke: var(--color-positive);
}

.line-path.negative-change {
    stroke: var(--color-negative);
}

.area-path.positive-change {
    fill: var(--color-positive-transparent);
}

.area-path.negative-change {
    fill: var(--color-negative-transparent);
}
</style>
