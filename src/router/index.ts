import { createRouter, createWebHistory } from 'vue-router'
import CoinsView from '../views/CoinsView.vue'

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
    ],
})

export default router
