import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import AdminPanel from '@/views/AdminPanel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AdminPanel',
    name: 'AdminPanel',
    component: AdminPanel
  },
  // Agrega más rutas si tienes otras vistas o secciones específicas
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
