import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/taskOne.vue')
        },
        {
            path: '/chartjs',
            name: 'chartjs',
            component: () => import('./views/taskTwo.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/home'
        }
    ]
})