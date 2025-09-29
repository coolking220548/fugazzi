import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Dashboard from './pages/Dashboard.vue';
import Tools from './pages/Tools.vue';
import NewsAnalyze from './pages/NewsAnalyze.vue';
import ImageAnalyze from './pages/ImageAnalyzer.vue';
import URLAnalyze from './pages/URLAnalyzer.vue';
import FBAccountAnalyzer from './pages/FBAccountAnalyzer.vue';
import NotFound from './pages/404.vue'
import About from './pages/About.vue';
import FAQ from './pages/FAQ.vue';

const routes = [
    {path: '/', component: Dashboard},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/tools', component: Tools},
    {path: '/newsanalyze', component: NewsAnalyze, meta: { requiresAuth: true }},
    {path: '/imageanalyze', component: ImageAnalyze, meta: {requiresAuth: true}},
    {path: '/urlanalyze', component: URLAnalyze, meta: {requiresAuth: true}},
    {path: '/fbanalyze', component: FBAccountAnalyzer, meta: {requiresAuth: true}},
    {path: '/about', component: About},
    {path: '/faq', component: FAQ},
    {path: '/:pathMatch(.*)*', component: NotFound},
];

const router = createRouter({
    history: createWebHistory('/fugazzi/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition ){
            return savedPosition
        }
        else {
            return { top: 0 }
        }
    },
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