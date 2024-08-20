<template>
  <h2 class="white-and-shadow">
    Магазины сервера
  </h2>

  <shop-list-modal ref="helpModal" />

  <div class="row gx-2">
    <div class="col-6 col-md-4 mb-2">
      <table-search v-model="params.q" />
    </div>

    <div class="col-auto">
      <button class="btn btn-dark btn-sm border-black" @click="helpModal!!.show()">
        Помощь
      </button>
    </div>

    <div class="col-auto ms-0 ms-md-auto mb-2">
      <table-paginator ref="paginator" :pages="data.last_page" @change="loadList()">
        <template #extra_buttons>
          <button class="btn btn-dark border-black" type="button" @click="loadList()">
            <i class="bi bi-arrow-clockwise" />
          </button>
          <button class="btn btn-dark border-black" type="button" @click="resetAll()">
            <i class="bi bi-x-lg" />
          </button>
        </template>
      </table-paginator>
    </div>
  </div>

  <div v-if="loading" class="d-flex justify-content-center my-5">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-if="!loading" class="table-responsive shop-list">
    <table class="table table-dark table-sm table-hover table-bordered border-black mb-0">
      <thead>
        <tr>
          <th @click="sortBy('type')" />
          <th @click="sortBy('name')">
            Предмет
            <template v-if="params.s === 'name'">
              <i v-if="params.d === 'asc'" class="bi bi-arrow-up-short" />
              <i v-else class="bi bi-arrow-down-short" />
            </template>
          </th>
          <th class="text-end" @click="sortBy('price')">
            Цена ₵
            <template v-if="params.s === 'price'">
              <i v-if="params.d === 'asc'" class="bi bi-arrow-up-short" />
              <i v-else class="bi bi-arrow-down-short" />
            </template>
          </th>
          <th class="text-center" @click="sortBy('owner')">
            Владелец
            <template v-if="params.s === 'owner'">
              <i v-if="params.d === 'asc'" class="bi bi-arrow-up-short" />
              <i v-else class="bi bi-arrow-down-short" />
            </template>
          </th>
          <th class="text-center">
            Координаты
          </th>
          <th class="text-center" @click="sortBy('created_at')">
            Дата
            <template v-if="params.s === 'created_at'">
              <i v-if="params.d === 'asc'" class="bi bi-arrow-up-short " />
              <i v-else class="bi bi-arrow-down-short" />
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="shop in data.shops" :key="shop.id">
          <tr>
            <td v-if="shop.type === 1" class="bg-primary text-center align-middle">
              <i class="bi bi-arrow-right-square" />
            </td>
            <td v-else class="bg-success text-center align-middle">
              <i class="bi bi-arrow-left-square" />
            </td>
            <td class="align-middle" :class="{'show-more': shop.lore.length > 0 || shop.enchantments.length > 0}" @click="openRow(shop)">
              <div class="hstack gap-3 w-100">
                <div>
                  <span v-html="shop.display_name" />
                  <i v-if="shop.lore.length > 0 || shop.enchantments.length > 0" class="bi bi-plus" />
                </div>
                <div v-if="shop.type === 0" class="ms-auto">
                  <span class="badge text-bg-secondary">
                    {{ shop.stock }}
                  </span>
                </div>
              </div>
            </td>

            <td class="align-middle text-end">
              {{ fmtMoney(shop.price) }}
            </td>
            <td class="align-middle text-center">
              <a role="button" class="btn-link text-white text-decoration-none" @click="params.q = shop.owner">
                {{ shop.owner }}
              </a>
            </td>
            <td class="align-middle text-center">
              <span class="small text-nowrap">
                <a :href="`https://map.cubach.com/#world;flat;${shop.x},${shop.y},${shop.z};5`" target="_blank"
                   class="text-white text-decoration-none"
                >
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
                <div v-if="shop.lore.length > 0" class="col">
                  <p class="mb-1">
                    Описание
                  </p>
                  <p v-for="(l, i) in shop.lore" :key="i" class="mb-0 font-monospace small" v-html="l" />
                </div>
                <div v-if="shop.enchantments.length > 0" class="col">
                  <p class="mb-1">
                    Зачарования
                  </p>
                  <p v-for="(e, i) in shop.enchantments" :key="i" class="mb-0 font-monospace small" v-html="e" />
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { shops } from '@app/js/api/api'
import debounce from 'debounce'
import ShopListModal from '@app/js/components/ShopList/ShopListModal.vue'
import type { TShop, TShopResponse, TTableQuery } from '@app/js/types.js'
import TablePaginator from '@app/js/components/Table/TablePaginator.vue'

const helpModal = ref<InstanceType<typeof ShopListModal>>()
const paginator = ref<InstanceType<typeof TablePaginator>>()

const openedRows = ref<number[]>([])
const loading = ref(true)

const data: TShopResponse = reactive({
  last_page: 1,
  shops: []
})

const params: TTableQuery = reactive({
  q: '',
  s: 'created_at',
  d: 'desc',
  page: 1
})

const loadList = debounce(() => {
  params.page = paginator.value!.page

  shops.get(params).then(res => {
    Object.assign(data, res.data)
    openedRows.value = []
  }).finally(() => {
    loading.value = false
  })
}, 300)

function fmt (time: number): string {
  const date = new Date(time * 1000)
  return (date.toLocaleString('ru-RU').split(',')[0])!
}

function fmtMoney(money: number): string {
  return (new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'GHS',
  })).format(money).replace('GHS', '');
}

function sortBy(field: string): void {
  params.s = field
  if (params.d === 'asc') {
    params.d = 'desc'
  } else {
    params.d = 'asc'
  }
  paginator.value!.reset()
  loadList()
}

function openRow(shop: TShop): void {
  if (openedRows.value.includes(shop.id)) {
    openedRows.value = openedRows.value.filter(r => r !== shop.id);
  } else {
    if (shop.lore.length > 0 || shop.enchantments.length > 0) {
      openedRows.value.push(shop.id)
    }
  }
}

function resetAll(): void {
  params.s = 'created_at'
  params.d = 'desc'
  params.q = ''
  paginator.value!.reset()
  loadList()
}

watch(() => params.q, () => {
  paginator.value!.reset()
  loadList()
})

onMounted(() => {
  loadList()
})
</script>
