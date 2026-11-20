import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import CurrentGame from '../components/CurrentGame.vue'
import Guide from '../components/Guide.vue'

const routes = [
    { path: '/', name: 'main', component: MainPage },
    { path: '/game', name: 'game', component: CurrentGame },
    { path: '/guide', name: 'guide', component: Guide },
]

export default createRouter({
    history: createWebHistory(),
    routes
})