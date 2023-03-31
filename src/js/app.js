import { createApp, h } from 'vue'
import { router } from '@app/js/router'

import App from '@app/js/pages/App.vue'
import ShopModal from '@app/js/components/ShopModal.vue'

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
app.component('shop-modal', ShopModal)
app.mount('#app')
