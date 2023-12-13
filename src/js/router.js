import { createRouter, createWebHistory } from 'vue-router'
import Index from '@app/js/pages/Index.vue'
import Shop from '@app/js/pages/Shop/Shop.vue'
import ShopIndex from '@app/js/pages/Shop/ShopIndex.vue'
import ShopResult from '@app/js/pages/Shop/ShopResult.vue'

const routes = [
  {
    path: '/plus',
    redirect: '/shop',
  },
  {
    path: '/donate',
    redirect: '/shop',
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      { path: '', component: ShopIndex, meta: { title: 'Кубач.Шоп' } },
      { path: 'rules', component: ShopIndex },
      { path: 'back', component: ShopResult },
    ],
  },
  {
    path: '',
    component: Index,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes,
})
