import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';

Vue.router = router;
Vue.use(VueRouter);

Vue.component('app', require('./pages/App').default);

window.Vue = new Vue({
  router
}).$mount('#app');
