<template>
  <div class="modal fade" tabindex="-1" id="cart-modal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0 pb-1">
          <h1 class="modal-title fs-4 mx-auto">Ваша корзина</h1>
        </div>

        <div class="modal-body">
          <div class="pt-2">
            <div class="text-center lead" v-if="cart.count === 0">
              Ваша корзина пуста! =(
            </div>
            <template v-else>
              <table class="table table-dark table-sm">
                <tbody>
                  <tr v-for="item in cart.items">
                    <td class="small align-middle border-0" v-html="item.name" />
                    <td class="small text-end align-middle border-0" style="width: 125px">
                      <div class="d-inline-block me-2">x{{ item.amount }}</div>
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-sm btn-dark" @click="cart.append(item, 1)"><i class="bi bi-plus"/></button>
                        <button type="button" class="btn btn-sm btn-dark" @click="cart.append(item, -1)"><i class="bi bi-dash"/></button>
                      </div>
                    </td>
                    <td class="small text-end align-middle border-0" style="width: 85px" v-html="(item.amount * item.price) + '₽'" />
                  </tr>
                </tbody>

              </table>

              <hr class="text-secondary" />

              <div class="hstack gap-3 w-100 mb-4">
                <div class="lead">Итого</div>
                <div class="ms-auto">{{cart.total}}₽</div>
              </div>

              <div class="form-floating mb-3">
                <input id="playerName" type="text"
                       class="form-control bg-light bg-opacity-10 text-white shadow-none border-dark"
                       placeholder="Введите ваш ник на сервере" v-model="player">
                <label for="playerName">Введите ваш ник на сервере</label>
              </div>

              <p class="mb-0 small text-center">Проверьте правильность ввода никнейма в игре и ознакомьтесь с <a href="/shop/rules" class="text-info">правилами
                покупки</a>.</p>

              <div class="alert alert-danger p-2 mt-3 mb-0" v-if="error" v-html="error"/>

            </template>
          </div>
        </div>

        <div class="modal-footer border-0 pt-0">
          <div class="hstack gap-3 w-100">
            <button type="button" class="btn btn-dark bg-white bg-opacity-10" data-bs-dismiss="modal"><i class="bi bi-x-lg me-1 d-none d-sm-inline" />Закрыть
            </button>
            <button v-if="cart.count > 0" type="button" class="btn btn-success ms-auto" @click="purchase" :disabled="sending">Перейти к оплате <i class="bi bi-arrow-right ms-1 d-none d-sm-inline" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { Modal } from 'bootstrap'
import { nextTick, onMounted, ref } from 'vue'
import { useCartStore } from '@app/js/stores/cart.js'
import { shop } from '@app/js/api/api.js'

let modalBs = {}
const cart = useCartStore()
const player = ref('')
const sending = ref(false)
const error = ref('')

function purchase () {
  if (player.value === '') {
    error.value = 'Введите имя игрока.'
    return
  }

  error.value = ''
  sending.value = true
  let items = []

  for (let [k, v] of Object.entries(cart.items)) {
    items.push({id: v.id, a: v.amount})
  }

  shop.order({
    player: player.value,
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
    modalBs = new Modal('#cart-modal', {
      backdrop: 'static',
      keyboard: false,
    })
  })
})

function show (showItem) {
  modalBs.show()
}

defineExpose({
  show,
})
</script>
