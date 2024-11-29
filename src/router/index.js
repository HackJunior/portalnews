import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import AdminPanel from '@/views/AdminPanel.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import NewsDetailPage from '@/views/NewsDetailPage.vue';
import LoginView from '@/views/Login.vue';

const routes = [
  {
    path: '/:categoria', 
    name: 'categoria',
    component: CategoryPage,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/account/AdminPanel',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetailPage,
  },
  {
    path: '/account/login',
    name: 'Login',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  
  // Verificar si la ruta requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ path: '/account/login' }); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
