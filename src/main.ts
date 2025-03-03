import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCurrenciesStore } from './stores/currencies'
import {
    faCaretUp,
    faCaretDown,
    faXmark,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCaretUp, faCaretDown, faXmark, faMagnifyingGlass)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())

const store = useCurrenciesStore()
store.fetchActiveCurrencies()

app.use(router)
app.mount('#app')
