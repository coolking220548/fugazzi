import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Dashboard from './pages/Dashboard.vue';
import Analyze from './pages/Analyze.vue';

const routes = [
    {path: '/', component: Dashboard},
    {path: '/login', component: Login},
    {path: '/analyze', component: Analyze, meta: { requiresAuth: true }},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Add navigation guard for protected routes
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;