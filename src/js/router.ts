import { createRouter, createWebHistory } from 'vue-router'
import Index from '@app/js/pages/Index.vue'
import Shop from '@app/js/pages/Shop/Shop.vue'
import ShopIndex from '@app/js/pages/Shop/ShopIndex.vue'
import ShopResult from '@app/js/pages/Shop/ShopResult.vue'
import BanList from '@app/js/pages/Game/BanList/BanList.vue'
import ShopList from '@app/js/pages/Game/ShopList/ShopList.vue'
import MapIndex from '@app/js/pages/Map/MapIndex.vue'

function redirectMap() {
  window.location.href = 'https://map.cubach.com'
}

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
    path: '/map',
    component: MapIndex,
    beforeEnter: [redirectMap]
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
    path: '/game',
    children: [
      { path: 'shops', component: ShopList, meta: { title: 'Магазины' } },
      { path: 'bans', component: BanList, meta: { title: 'Бан-лист' } }
    ],
  },
  {
    path: '/',
    component: Index,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Index,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
