<template>
    <button id="wrapper" @click="showSearch">
        <font-awesome-icon :icon="'magnifying-glass'" />
        <p>Search...</p>
    </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['openSearch'])

function showSearch() {
    emit('openSearch')
}
</script>

<style scoped>
button {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    width: 150px;
    background-color: var(--color-background-hover);
    color: var(--color-text);
    border: none;
    border-radius: 10px;
    cursor: text;
}
</style>
