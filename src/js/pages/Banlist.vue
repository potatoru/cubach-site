<template>
  <h2 class="white-and-shadow">Бан-лист</h2>

  <div class="table-responsive mb-3">
    <table class="table table-dark  table-hover table-bordered">
      <thead>
      <tr>
        <th class="text-center">Дата</th>
        <th class="text-center">Ник</th>
        <th>Причина</th>
        <th class="text-center">Оператор</th>
        <th class="text-center">Окончание</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ban in list">
        <td class="align-middle text-center" v-html="fmt(ban.date)"/>
        <td class="align-middle text-center" v-html="ban.victim"/>
        <td class="align-middle" v-html="ban.reason"/>
        <td class="align-middle text-center" v-html="ban.operator"/>
        <td class="align-middle text-center" v-html="fmt(ban.date_to)"/>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="btn-group mb-4" v-if="pages > 1">
    <button type="button" class="btn btn-secondary" v-if="page > 1" @click="next(-1)">Назад</button>
    <button type="button" class="btn btn-success" v-if="page < pages" @click="next(1)">Вперёд</button>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { banlist } from '@app/js/api/api'

const list = ref([])
let page = 1
let pages = 1

function loadList () {
  banlist.get(page).then(res => {
    list.value = res.data.bans
    pages = res.data.pages
  })
}

function fmt (time) {
  if (time === 0) {
    return 'Перманентно'
  }

  const date = new Date(time * 1000)
  return date.toLocaleString('ru-RU').replace(',', '<br>')
}

function next (d) {
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
