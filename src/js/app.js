import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './plugins/router';
import {store} from './plugins/store';

window.Vue = Vue;
Vue.router = router;
Vue.use(VueRouter);