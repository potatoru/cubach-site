<template>
  <h2 class="white-and-shadow">
    Бан-лист
  </h2>

  <div class="table-responsive mb-3">
    <table class="table table-dark  table-hover table-bordered">
      <thead>
        <tr>
          <th class="text-center">
            Дата
          </th>
          <th class="text-center">
            Ник
          </th>
          <th>
            Причина
          </th>
          <th class="text-center">
            Оператор
          </th>
          <th class="text-center">
            Окончание
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ban in list" :key="ban.id">
          <td class="align-middle text-center">
            {{ fmt(ban.date) }}
          </td>
          <td class="align-middle text-center">
            {{ ban.victim }}
          </td>
          <td class="align-middle">
            {{ ban.reason }}
          </td>
          <td class="align-middle text-center">
            {{ ban.operator }}
          </td>
          <td class="align-middle text-center">
            {{ fmt(ban.date_to) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="pages > 1" class="btn-group mb-4">
    <button v-if="page > 1" type="button" class="btn btn-secondary" @click="next(-1)">
      Назад
    </button>
    <button v-if="page < pages" type="button" class="btn btn-success" @click="next(1)">
      Вперёд
    </button>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { bans } from '@app/js/api/api'
import type { TBan } from '@app/js/types.ts'

const list = ref<TBan[]>([])
let page = 1
let pages = 1

function loadList (): void {
  bans.get(page).then(res => {
    list.value = res.data.bans
    pages = res.data.pages
  })
}

function fmt (time: number): string {
  if (time === 0) {
    return 'Перманентно'
  }

  const date = new Date(time * 1000)
  return date.toLocaleString('ru-RU').replace(',', '\n')
}

function next (d: number): void {
  if (d > 0 && page < pages) {
    page++
  }

  if (d < 0 && page > 1) {
    page--
  }

  loadList()
}

onMounted(() => {
  loadList()
})
</script>
