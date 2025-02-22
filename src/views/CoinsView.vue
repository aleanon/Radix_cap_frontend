<template>
    <div id="currency-table">
        <CurrencyTable></CurrencyTable>
    </div>
</template>

<script setup lang="ts">
import CurrencyTable from '@/components/CurrencyTable.vue'
</script>

<style scoped>
#currency-table {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>
