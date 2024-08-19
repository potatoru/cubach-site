<template>
  <h2 class="white-and-shadow">Магазины сервера</h2>

  <shop-list-modal ref="helpModal" />

  <div class="row gx-2">
    <div class="col-6 col-md-4 mb-2">
      <div class="input-group input-group-sm ">
        <span class="input-group-text bg-dark text-white border-black">
          <i class="bi bi-search" />
        </span>
        <input type="text" class="form-control bg-dark border-black text-white" v-model="query">
        <button class="btn btn-dark border-black" type="button" @click="query = ''" v-if="query !== ''">
          <i class="bi bi-x-lg" />
        </button>
      </div>
    </div>

    <div class="col-auto">
      <button class="btn btn-dark btn-sm border-black" @click="helpModal.show()">Помощь</button>
    </div>

    <div class="col-auto ms-0 ms-md-auto mb-2">
      <pagination ref="pagination" :pages="pages" @change="loadList()">
        <template #extra_buttons>
          <button class="btn btn-dark border-black" type="button" @click="loadList()"><i class="bi bi-arrow-clockwise" /></button>
          <button class="btn btn-dark border-black" type="button" @click="resetAll()"><i class="bi bi-x-lg" /></button>
        </template>
      </pagination>
    </div>
  </div>

  <div class="d-flex justify-content-center my-5" v-if="loading">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="table-responsive shop-list" v-if="!loading">
    <table class="table table-dark table-sm table-hover table-bordered border-black mb-0">
      <thead>
      <tr>
        <th @click="sortBy('type')"></th>
        <th @click="sortBy('name')">Предмет
          <template v-if="sort === 'name'"><span v-if="direction === 'asc'">
            <i class="bi bi-arrow-up-short"/></span><span v-else><i class="bi bi-arrow-down-short"/></span>
          </template>
        </th>
        <th @click="sortBy('price')" class="text-end">Цена ₵
          <template v-if="sort === 'price'"><span v-if="direction === 'asc'">
            <i class="bi bi-arrow-up-short"/></span><span v-else><i class="bi bi-arrow-down-short"/></span>
          </template>
        </th>
        <th @click="sortBy('owner')" class="text-center">Владелец
          <template v-if="sort === 'owner'"><span v-if="direction === 'asc'">
            <i class="bi bi-arrow-up-short"/></span><span v-else><i class="bi bi-arrow-down-short"/></span>
          </template>
        </th>
        <th class="text-center">Координаты</th>
        <th @click="sortBy('created_at')" class="text-center">Дата
          <template v-if="sort === 'created_at'"><span v-if="direction === 'asc'">
            <i class="bi bi-arrow-up-short"/></span><span v-else><i class="bi bi-arrow-down-short"/></span>
          </template>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="shop in list" :key="shop.id">
        <tr>
          <td class="bg-primary text-center align-middle" v-if="shop.type === 1">
            <i class="bi bi-arrow-right-square"/>
          </td>
          <td class="bg-success text-center align-middle" v-else>
            <i class="bi bi-arrow-left-square"/>
          </td>
          <td class="align-middle" @click="openRow(shop)" :class="{'show-more': shop.lore.length > 0 || shop.enchantments.length > 0}">
            <div class="hstack gap-3 w-100">
              <div>
                <span v-html="shop.display_name" />
                <i class="bi bi-plus" v-if="shop.lore.length > 0 || shop.enchantments.length > 0"></i>
              </div>
              <div v-if="shop.type === 0" class="ms-auto">
                <span class="badge text-bg-secondary">{{ shop.stock }}</span>
              </div>
            </div>
          </td>

          <td class="align-middle text-end">{{ fmtMoney(shop.price) }}</td>
          <td class="align-middle text-center">
            <a role="button" class="btn-link text-white text-decoration-none" @click="query = shop.owner">
              {{ shop.owner }}
            </a>
          </td>
          <td class="align-middle text-center">
            <span class="small text-nowrap">
            <a :href="`https://map.cubach.com/#world;flat;${shop.x},${shop.y},${shop.z};5`" target="_blank" class="text-white text-decoration-none">
              X: {{ shop.x }} Y: {{ shop.y }} Z: {{ shop.z }}
            </a>
            </span>
          </td>
          <td class="align-middle text-center">
            <small class="text-nowrap">{{ fmt(shop.created_at) }}</small>
          </td>
        </tr>
        <tr v-if="openedRows.includes(shop.id)">
          <td colspan="6">
            <div class="row m-0">
              <div class="col" v-if="shop.lore.length > 0">
                <p class="mb-1">Описание</p>
                <p class="mb-0 font-monospace small" v-for="lore in shop.lore" v-html="lore" />
              </div>
              <div class="col" v-if="shop.enchantments.length > 0">
                <p class="mb-1">Зачарования</p>
                <p class="mb-0 font-monospace small" v-for="enchantment in shop.enchantments" v-html="enchantment" />
              </div>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>

</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
import { shops } from '@app/js/api/api'
import debounce from 'debounce'
import Pagination from '../../../components/Table/Pagination.vue'
import ShopListModal from './ShopListModal.vue'

const helpModal = ref(null)
const pagination = ref(null)

const list = ref([])
const pages = ref(1)
const query = ref('')
const sort = ref('created_at')
const direction = ref('desc')
const openedRows = ref([])
const loading = ref(true)

const loadList = debounce(() => {
  let params = { page: pagination.value.page }
  if (query.value !== '') {
    params.q = query.value
  }
  if (sort.value !== '') {
    params.s = sort.value
  }
  if (direction.value !== '') {
    params.d = direction.value
  }

  shops.get(params).then(res => {
    list.value = res.data.shops
    pages.value = res.data.last_page
    openedRows.value = []
  }).finally(() => {
    loading.value = false
  })
}, 300)

function fmt (time) {
  const date = new Date(time * 1000)
  return date.toLocaleString('ru-RU').split(',')[0]
}

function fmtMoney(money) {
  return (new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'GHS',
  })).format(money).replace('GHS', '');
}

function sortBy(field) {
  sort.value = field
  if (direction.value === 'asc') {
    direction.value = 'desc'
  } else {
    direction.value = 'asc'
  }
  pagination.value.reset()
  loadList()
}

function openRow(shop) {
  if (openedRows.value.includes(shop.id)) {
    openedRows.value = openedRows.value.filter(r => r !== shop.id);
  } else {
    if (shop.lore.length > 0 || shop.enchantments.length > 0) {
      openedRows.value.push(shop.id)
    }
  }
}

function resetAll() {
  sort.value = 'created_at'
  direction.value = 'desc'
  query.value = ''
  pagination.value.reset()
  loadList()
}

watch(query, () => {
  pagination.value.reset()
  loadList()
})

onMounted(() => {
  loadList()
})
</script>
