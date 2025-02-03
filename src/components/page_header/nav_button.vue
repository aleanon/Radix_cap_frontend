<template>
  <button>{{ name }}</button>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style scoped>
button {
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
