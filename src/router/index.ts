import { createRouter, createWebHistory } from 'vue-router'
import CoinsView from '../views/CoinsView.vue'
import CoinDetailsView from '@/views/CoinDetailsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/coins/page/1',
        },
        {
            path: '/coins/page/:pageNumber',
            name: 'coinsPage',
            component: CoinsView,
        },
        {
            path: '/coin/:coinId',
            name: 'coinDetails',
            component: CoinDetailsView,
        },
    ],
})

export default router
