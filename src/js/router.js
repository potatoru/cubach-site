import { createRouter, createWebHistory } from 'vue-router'
import Index from '@app/js/pages/Index.vue'
import Shop from '@app/js/pages/Shop/Shop.vue'
import ShopIndex from '@app/js/pages/Shop/ShopIndex.vue'
import ShopRules from '@app/js/pages/Shop/ShopRules.vue'

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
      { path: 'rules', component: ShopRules }
    ]
  },
  {
    path: '/shop/rules',
    name: 'shop_rules',
    component: ShopRules,
    meta: { title: 'Правила покупки - Кубач.Шоп' },
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
