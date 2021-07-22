import Vue from 'vue';

window.Vue = Vue;

Vue.component('app', require('./Index').default);
new Vue({}).$mount('#app');