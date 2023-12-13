import { createApp, h } from 'vue'
import { router } from '@app/js/router'

import App from '@app/js/pages/App.vue'
import PurchaseModal from '@app/js/components/Shop/PurchaseModal.vue'
import RulesModal from '@app/js/components/Shop/RulesModal.vue'
import ShopItem from '@app/js/components/Shop/ShopItem.vue'
import ShopItemPromo from '@app/js/components/Shop/ShopItemPromo.vue'

const app = createApp({
  render: () => h(App),
})

const DEFAULT_TITLE = "Кубач Minecraft";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});

app.use(router)

app.component('app', App)
app.component('purchase-modal', PurchaseModal)
app.component('rules-modal', RulesModal)
app.component('shop-item', ShopItem)
app.component('shop-item-promo', ShopItemPromo)
app.mount('#app')
