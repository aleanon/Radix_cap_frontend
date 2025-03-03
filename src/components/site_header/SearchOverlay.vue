<template>
    <div id="see-through" v-show="props.showSearch" @click="closeOverlay()">
        <div id="container">
            <section id="searchbar">
                <input ref="searchInput" v-model="searchQuery" placeholder="Search..." />
                <button @click="closeOverlay()">
                    <font-awesome-icon :icon="'xmark'" />
                </button>
            </section>
            <div id="list">
                <ul>
                    <SearchItem
                        v-for="(item, index) in filteredItems"
                        :currency="item"
                        :key="index"
                    >
                        {{ item }}
                    </SearchItem>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { ref, computed, nextTick, watch } from 'vue'
import SearchItem from './SearchItem.vue'
import router from '@/router'

const currencyStore = useCurrenciesStore()

interface Props {
    showSearch: boolean
}

const props = defineProps<Props>()
const searchQuery = ref<string>('')
const searchInput = ref<HTMLInputElement | null>(null)

const filteredItems = computed(() => {
    if (!searchQuery.value) return []

    return currencyStore.searchCurrencies(searchQuery.value.trim())
})

const emit = defineEmits(['closeSearch'])

function closeOverlay() {
    searchQuery.value = ''
    emit('closeSearch')
}

router.afterEach(() => closeOverlay())

watch(
    () => props.showSearch,
    (newValue) => {
        if (newValue) {
            nextTick(() => {
                searchInput.value?.focus()
            })
        }
    },
)
</script>

<style scoped>
#see-through {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
}

#container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    right: 0;
    width: 600px;
    height: 400px;
    z-index: 1000;
    background-color: var(--color-background-hover);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

#searchbar {
    display: flex;
    height: 40px;
    padding: 10px 0;
    gap: 10px;
    border-bottom: solid 1px var(--color-text);
}

button {
    border: none;
    width: 20px;
    height: 100%;
    background-color: var(--color-background-hover);
    color: var(--color-text);
    cursor: pointer;
}

#list {
    overflow-y: auto;
    flex: 1;
}

ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: var(--color-background-hover);
    color: var(--color-text);
}

input:focus {
    outline: none;
}
</style>
