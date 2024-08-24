<template>
  <div id="shop-list-logs" class="modal modal-lg fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0 pb-1">
          <h1 class="modal-title fs-4 mx-auto">
            История продаж
          </h1>
        </div>

        <div class="modal-body">
          <div v-if="loading" class="d-flex justify-content-center my-5">
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <template v-else>
            <template v-if="data.logs.length > 0">
              <p class="text-white mb-2">
                Последние 25 продаж
              </p>
              <table class="table table-dark table-sm table-bordered border-black mb-0 small">
                <thead>
                <tr>
                  <th></th>
                  <th>Дата</th>
                  <th>Игрок</th>
                  <th class="text-end">Кол-во</th>
                  <th class="text-end">Сумма ₵</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="log in data.logs" :key="log.id">
                  <td v-if="log.type === 1" class="bg-primary text-center align-middle">
                    <i class="bi bi-arrow-right-square" />
                  </td>
                  <td v-else class="bg-success text-center align-middle">
                    <i class="bi bi-arrow-left-square" />
                  </td>
                  <td class="align-middle">{{ fmt(log.created_at) }}</td>
                  <td class="align-middle">{{ log.buyer }}</td>
                  <td class="align-middle text-end">{{ log.amount }}</td>
                  <td class="align-middle text-end">{{ log.money }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="align-middle text-end">Итого</td>
                  <td class="align-middle text-end">{{ count }} ₵</td>
                  <td class="align-middle text-end">{{ sum }} ₵</td>
                </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <p class="text-center">Пока никто ничего не покупал...</p>
            </template>
          </template>

        </div>

        <div class="modal-footer border-0 pt-2">
          <button type="button" class="btn btn-dark bg-white bg-opacity-10" data-bs-dismiss="modal">
            <i class="bi bi-x-lg me-1 d-none d-sm-inline" />Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { shops } from '@app/js/api/api.ts'
import type { TShopLogsResponse } from '@app/js/types.ts'
let modalBs: Modal

let loading = ref(false)
let data: TShopLogsResponse = reactive({
  logs: []
})

const sum = computed(() => {
  if (data.logs.length === 0) {
    return
  }

  return data.logs.reduce((total, l) => l.money + total,0)
})

const count = computed(() => {
  if (data.logs.length === 0) {
    return
  }

  return data.logs.reduce((total, l) => l.amount + total,0)
})

onMounted(() => {
  nextTick(() => {
    modalBs = new Modal('#shop-list-logs', {
      keyboard: false,
    })
  })
})

function show (shopId: number): void {
  modalBs!.show()
  loading.value = true
  shops.logs(shopId).then(res => {
    Object.assign(data, res.data)
  }).finally(() => {
    loading.value = false
  })
}

function fmt (time: number): string {
  const date = new Date(time * 1000)
  return (date.toLocaleString('ru-RU').replace(',', ' '))!
}

defineExpose({
  show,
})
</script>
