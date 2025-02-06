import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCurrenciesStore } from './stores/currencies'

const app = createApp(App)

app.use(createPinia())

const store = useCurrenciesStore()
store.fetchActiveCurrencies()

app.use(router)
app.mount('#app')
