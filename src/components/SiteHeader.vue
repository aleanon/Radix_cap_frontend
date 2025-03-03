<template>
    <header id="header">
        <img
            alt="radix cap logo"
            class="logo"
            src="@/assets/radix-cap-icon.svg"
            width="80"
            height="80"
        />
        <h1>RadixCap</h1>
        <nav>
            <NavButton :name="'Currencies'"></NavButton>
        </nav>
        <SearchOverlay @closeSearch="searchOverlay = false" :showSearch="searchOverlay">
        </SearchOverlay>
        <SearchField @openSearch="searchOverlay = true" id="search"> </SearchField>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavButton from './site_header/NavButton.vue'
import SearchField from './site_header/SearchField.vue'
import SearchOverlay from './site_header/SearchOverlay.vue'

const searchOverlay = ref<boolean>(false)
</script>

<style scoped>
header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    line-height: 1.5;
}

h1 {
    font-weight: 500;
    font-size: 2em;
    margin-left: 10px;
}

nav {
    margin-left: 30px;
}

#search {
    margin-left: auto;
    height: 30px;
    width: 150px;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
