<template>
    <RouterLink :to="`/coins/page/1`" class="nav-button">{{ name }}</RouterLink>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style scoped>
.nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    height: 40px;
    padding: 5px 15px;
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1.1em;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-button:hover {
    color: var(--color-positive);
}

/* .nav-button:active {
    background-color: var(--color-background-selected);
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
} */
</style>
