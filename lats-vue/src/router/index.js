import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import CurrentGame from '../components/CurrentGame.vue'

const routes = [
    { path: '/', name: 'main', component: MainPage },
    { path: '/game', name: 'game', component: CurrentGame }
]

export default createRouter({
    history: createWebHistory(),
    routes
})