<template>
  <shop-modal ref="modal" />

  <div class="d-flex justify-content-center" v-if="loading">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <template v-else>
    <div class="mb-4">
      <div class="btn-group" ref="dropdown">
        <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" v-html="currentCategoryName" />
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><button class="dropdown-item" @click="setCategory(0)">Все категории</button></li>
          <li><hr class="dropdown-divider"></li>
          <li v-for="category in stock" :key="category.id">
            <button class="dropdown-item" @click="setCategory(category.id, category.name)" v-html="category.name" />
          </li>
        </ul>
        <a class="btn btn-primary ms-2" href="/shop/rules">Правила покупки</a>
      </div>
    </div>

    <template v-for="category in filteredStock" :key="category.id">
      <template v-if="category.id === 1">
        <div class="card text-bg-dark bg-opacity-75 shadow-sm border-0 mb-3">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body text-center">
                <h4 class="card-title fw-light text-uppercase"><i class="bi bi-plus-square text-success"/> Кубач.Плюс</h4>
                <p class="card-text">Кубач.Плюс &mdash; это наша основная привилегия. Она даёт визуальные плюшки и некоторые незначительные улучшения геймплея. Подробнее вы можете ознакомиться с ней <a class="text-white" href="https://wiki.cubach.com/a/%D0%9A%D1%83%D0%B1%D0%B0%D1%87.%D0%9F%D0%BB%D1%8E%D1%81" target="_blank">здесь</a>.</p>
              </div>
            </div>
            <div class="col-md-4 d-none d-sm-flex">
              <img src="/img/axo.webp" class="img-fluid rounded-end" alt="...">
            </div>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-3 mb-3">
          <div class="col" v-for="item in category.items">
            <div class="card text-bg-dark text-center bg-opacity-75 shadow-sm border-0" @mouseenter="hovered = item.id" @mouseleave="hovered = 0">
              <div class="card-body p-3">
                <p class="lead mb-2">{{ item.subtitle }}</p>
                <button @click="select(item)" class="btn stretched-link text-white btn-lg p-1 w-100" :class="{'btn-outline-dark': hovered !== item.id, 'btn-outline-success': hovered === item.id}">
                  {{ item.price }} ₽
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <h3 class="h3 py-0 text-white text-center rounded-2 fw-light py-3 white-and-shadow" v-html="category.name"/>
        <div class="row row-cols-1 row-cols-md-3 g-3 mb-3">
          <div class="col" v-for="item in category.items">
            <div class="card text-bg-dark text-center bg-opacity-75 shadow-sm border-0" @mouseenter="hovered = item.id" @mouseleave="hovered = 0">
              <img :src="item.image" class="card-img-top" alt="...">
              <img :src="item.image2" class="card-img-top position-absolute" alt="..." v-if="item.image2 && hovered === item.id">
              <div class="card-body p-3">
                <h5 class="card-title fw-light">{{ item.name }}</h5>
                <p class="card-text small mb-2">{{ item.subtitle }}</p>
                <button @click="select(item)" class="btn stretched-link text-white btn-lg p-1 w-100" :class="{'btn-outline-dark': hovered !== item.id, 'btn-outline-success': hovered === item.id}">
                  {{ item.price }} ₽
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>

  </template>

</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { shop } from '@app/js/api/api'
import { Dropdown } from 'bootstrap'
import ShopModal from '@app/js/components/ShopModal.vue'

const modal = ref('modal')
const loading = ref(true)
const stock = ref([])
const dropdown = ref('dropdown')
const hovered = ref(0)
const currentCategory = ref(0)
const currentCategoryName = ref('Все категории')
const filteredStock = computed(() => {
  return stock.value.filter((category) => (currentCategory.value !== 0) !== (category.id !== currentCategory.value))
})

function setCategory(id, name) {
  currentCategory.value = id
  currentCategoryName.value = id === 0 ? 'Все категории' : name
}

function loaded() {
  loading.value = false
  nextTick(() => {
    new Dropdown(dropdown.value)
  })
}

function select(item) {
  modal.value.show(item)
}

onMounted(() => {
  shop.get().then(result => {
    stock.value = result.data
    loaded()
  })
})
</script>
