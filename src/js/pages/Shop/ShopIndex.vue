<template>
  <item-modal ref="modal" @added="t.show()"/>
  <rules-modal ref="rules"/>
  <cart-modal ref="cart"/>

  <div class="toast-container top-0 start-50 translate-middle-x">
    <div class="toast text-bg-success mt-5" role="alert" ref="toast">
      <div class="toast-body">
        Товар добавлен в корзину!
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-center" v-if="loading">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <template v-else>
    <h2 class="white-and-shadow mb-0 d-sm-none d-block text-center mb-4">Кубач.Шоп</h2>
    <div class="d-flex mb-3 align-items-center justify-content-center">
      <h2 class="white-and-shadow mb-0 d-none d-sm-block">Кубач.Шоп</h2>
      <button class="ms-sm-auto ms-0 btn btn-dark" @click="openRules()">Правила покупки</button>
      <button class="ms-3 btn" @click="openCart()" :class="{'btn-primary': cartStore.count > 0, 'btn-dark': cartStore.count <= 0}">
        <i class="bi bi-cart4 me-1" /> Корзина<span class="badge text-bg-light ms-2" v-if="cartStore.count > 0">{{ cartStore.count }}</span>
      </button>
    </div>

    <template v-for="category in stock" :key="category.id">
      <!--Plus category view-->
      <template v-if="category.id === 72960">
        <div class="card text-bg-dark shadow-sm border-0 mb-3">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body text-center">
                <h4 class="card-title fw-light text-uppercase">
                  <i class="bi bi-plus-square text-success"/> Кубач.Плюс</h4>
                <p class="card-text">Кубач.Плюс &mdash; это наша основная привилегия. Она даёт визуальные плюшки и некоторые незначительные улучшения геймплея. Подробнее вы можете ознакомиться с ней
                  <a class="text-white" href="https://wiki.cubach.com/server/cubach.plus" target="_blank">здесь</a>.
                </p>
              </div>
            </div>
            <div class="col-md-4 d-none d-sm-flex">
              <img src="/img/axo.webp" class="img-fluid rounded-end" alt="...">
            </div>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-3 mb-3">
          <div class="col" v-for="item in category.items" :key="item.id">
            <div class="card text-bg-dark text-center shadow-sm border-0" @mouseenter="hovered = item.id" @mouseleave="hovered = 0">
              <div class="card-body p-3">
                <p class="mb-3">{{ item.subtitle }}</p>
                <button @click="select(item)" class="btn stretched-link text-white btn-lg p-1 w-100 btn-outline-success">
                  {{ item.price }} ₽
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <h3 class="h3 py-0 text-white text-center rounded-2 fw-light py-3 white-and-shadow">{{ category.name }}</h3>

        <!-- Promo category -->
<!--        <shop-item-promo :item="item" @click="select" v-for="item in category.items" v-if="category.is_promo"></shop-item-promo>-->

        <div class="row row-cols-1 row-cols-md-3 g-3 mb-3">
          <div class="col" v-for="item in category.items" :key="item.id">
            <shop-item :item="item" @click="select" />
          </div>
        </div>
      </template>
    </template>

  </template>

</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { shop } from '@app/js/api/api'
import { useRoute } from 'vue-router'
import { useCartStore } from '@app/js/stores/cart.js'
import { Toast } from 'bootstrap'

const cartStore = useCartStore()

// Modals
const modal = ref()
const rules = ref()
const cart = ref(null)
const toast = ref()

let t = {}

// Vars
const loading = ref(true)
const stock = ref([])
const hovered = ref(0)

function loaded () {
  loading.value = false
}

function select (item) {
  modal.value.show(item)
}

function openRules () {
  rules.value.show()
}

function openCart () {
  cart.value.show()
}

onMounted(() => {
  const route = useRoute()
  if (route.path === '/shop/rules') {
    nextTick(() => {
      rules.value.show()
    })
  }

  t = new Toast(toast.value, {
    autohide: true,
    animation: true,
    delay: 3000
  })

  shop.get().then(result => {
    stock.value = result.data
    loaded()
  })
})
</script>
