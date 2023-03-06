<template>
  <div class="modal fade" tabindex="-1" id="modal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0 pb-1">
          <h1 class="modal-title fs-5 mx-auto">Подтверждение покупки</h1>
        </div>

        <div class="modal-body">
          <div class="text-center">
            <img :src="item.image" class="w-75 rounded-3" alt="..." @mouseenter="hovered = true"
                 :class="{'visually-hidden': hovered && item.image2}"/>
            <img :src="item.image2" class="w-75 rounded-3" alt="..." @mouseleave="hovered = false"
                 :class="{'visually-hidden': !hovered && item.image2}"/>
          </div>

          <h4 class="fw-light text-center mb-0 pt-3 pb-2" v-html="item.name"/>
          <p class="mb-3 text-center" v-html="item.subtitle"/>

          <p class="mb-0 font-monospace bg-info bg-opacity-10 p-1 text-center" v-if="item.description"
             v-html="item.description"/>

          <hr class="text-light"/>

          <div class="hstack gap-3 mb-3">
            <div class="lead">Стоимость</div>
            <div class="lead ms-auto fw-normal">{{ item.price }} ₽</div>
          </div>

          <div class="alert alert-danger p-2" v-if="error" v-html="error"/>

          <div class="form-floating mb-3">
            <input id="playerName" type="text"
                   class="form-control bg-light bg-opacity-10 text-white shadow-none border-dark"
                   placeholder="Введите ваш ник на сервере" v-model="player">
            <label for="playerName">Введите ваш ник на сервере</label>
          </div>

          <p class="mb-0 small text-center">Проверьте правильность ввода никнейма в игре и ознакомьтесь с <a href="/shop/rules" class="text-info">правилами
            покупки</a>.</p>
        </div>

        <div class="modal-footer border-0 pt-2">
          <div class="hstack gap-3 w-100">
            <button type="button" class="btn btn-dark bg-white bg-opacity-10" data-bs-dismiss="modal"><i class="bi bi-x-lg me-1 d-none d-sm-inline" />Я не хочу это
            </button>
            <button type="button" class="btn btn-success ms-auto" @click="purchase" :disabled="sending">Перейти к оплате <i class="bi bi-arrow-right ms-1 d-none d-sm-inline" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import { shop } from '../api/api'

const item = ref({})
const hovered = ref({})
const player = ref('')
const error = ref('')
const sending = ref(false)

let modalBs = {}

function show (showItem) {
  item.value = showItem
  hovered.value = false
  modalBs.show()
}

function purchase () {
  sending.value = true
  let items = {}
  items[item.value.id] = 1

  shop.order({
    player_name: player.value,
    items,
  }).then(res => {
    window.location.href = res.data.link
  }).catch(err => {
    error.value = err.response.data.error
  }).finally(() =>{
    sending.value = false
  })
}

onMounted(() => {
  nextTick(() => {
    modalBs = new Modal('#modal', {
      backdrop: 'static',
      keyboard: false,
    })
  })
})

defineExpose({
  show,
})
</script>
