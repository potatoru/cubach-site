<template>
  <purchase-modal ref="modal"/>
  <rules-modal ref="rules"/>

  <div class="d-flex justify-content-center" v-if="loading">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <template v-else>
    <div class="mb-4">
      <button class="btn btn-primary" @click="openRules()">Правила покупки</button>
    </div>

    <template v-for="category in stock" :key="category.id">
      <!--Plus category view-->
      <template v-if="category.id === 1">
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
          <div class="col" v-for="item in category.items">
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
        <h3 class="h3 py-0 text-white text-center rounded-2 fw-light py-3 white-and-shadow" v-html="category.name"/>

        <!-- Promo category -->
        <shop-item-promo :item="item" @click="select" v-for="item in category.items" v-if="category.is_promo"></shop-item-promo>

        <div class="row row-cols-1 row-cols-md-3 g-3 mb-3" v-else>
          <div class="col" v-for="item in category.items">
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
import ShopItemPromo from '@app/js/components/Shop/ShopItemPromo.vue'

// Modals
const modal = ref('modal')
const rules = ref('rules')

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

onMounted(() => {
  const route = useRoute()
  if (route.path === '/shop/rules') {
    nextTick(() => {
      rules.value.show()
    })
  }

  shop.get().then(result => {
    stock.value = result.data
    loaded()
  })
})
</script>
