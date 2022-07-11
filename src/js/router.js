import VueRouter from 'vue-router';
import Index from './pages/Index';
import Plus from './pages/Plus';

const routes = [
  {
    path: '/plus',
    name: 'plus',
    component: Plus,
  },
  {
    path: '*',
    component: Index,
  },
];

const router = new VueRouter({
  history: true,
  mode: 'history',
  routes,
});

export default router;
