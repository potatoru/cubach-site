import { createApp, h } from 'vue'
import { router } from '@app/js/router.ts'
import { createPinia } from 'pinia'

import App from '@app/js/pages/App.vue'
import RulesModal from '@app/js/components/Shop/RulesModal.vue'
import ShopItem from '@app/js/components/Shop/ShopItem.vue'
import ShopItemPromo from '@app/js/components/Shop/ShopItemPromo.vue'
import Status from '@app/js/components/Status.vue'
import CartModal from '@app/js/components/Shop/CartModal.vue'
import ShopItemModal from '@app/js/components/Shop/ShopItemModal.vue'
import Navbar from '@app/js/components/Navbar.vue'
import ShopListModal from '@app/js/components/ShopList/ShopListModal.vue'
import TablePaginator from '@app/js/components/Table/TablePaginator.vue'
import TableSearch from '@app/js/components/Table/TableSearch.vue'

const app = createApp({
  render: () => h(App),
})

const DEFAULT_TITLE = "Кубач Minecraft";
router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | ${DEFAULT_TITLE} ` : DEFAULT_TITLE;
  next();
});

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('app', App)
app.component('status', Status)
app.component('navbar', Navbar)
app.component('table-paginator', TablePaginator)
app.component('table-search', TableSearch)
app.component('item-modal', ShopItemModal)
app.component('rules-modal', RulesModal)
app.component('cart-modal', CartModal)
app.component('shop-item', ShopItem)
app.component('shop-list-modal', ShopListModal)
app.component('shop-item-promo', ShopItemPromo)
app.mount('body')
