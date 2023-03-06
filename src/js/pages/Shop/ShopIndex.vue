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
      <h3 class="h3 py-0 text-white text-center rounded-2 fw-light py-3 white-and-shadow" v-html="category.name"/>

      <div class="row row-cols-1 row-cols-md-3 g-3 mb-3">
        <div class="col" v-for="item in category.items">
          <div class="card text-bg-dark text-center shadow-sm bg-opacity-75 shadow-sm border-0" @mouseenter="hovered = item.id" @mouseleave="hovered = 0">
            <img :src="item.image" class="card-img-top" alt="...">
            <img :src="item.image2" class="card-img-top position-absolute" alt="..." v-if="item.image2 && hovered === item.id">
            <div class="card-body p-3">
              <h5 class="card-title fw-light">{{ item.name }}</h5>
              <p class="card-text small mb-2">{{ item.subtitle }}</p>
              <button @click="select(item)" class="btn btn-outline-success stretched-link text-white btn-lg p-1 border-0 w-100">
                {{ item.price }} ₽
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

  </template>

</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { shop } from '../../api/api'
import { Dropdown } from 'bootstrap'
import ShopModal from '../../components/ShopModal.vue'

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
