<template>
  <div class="modal fade" tabindex="-1" id="rules-modal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0 pb-1">
          <h1 class="modal-title fs-5 mx-auto">Правила покупки</h1>
        </div>

        <div class="modal-body">
          <div class="white-and-shadow mb-4 pt-2">
            <p>1. Для покупки предметов вы должны быть зарегистрированы на сервере.</p>
            <p>2. Для выдачи предметов и привилегий используйте команду <span class="text-info text-nowrap">/shop</span> в игре.</p>
            <p>3. Убедитесь, что в инвентаре есть свободное место для выдачи предмета!</p>
            <p>4. Администрация не несёт ответственности за потерю предметов игре по вине игрока.</p>
            <p>5. Купленные в Кубач.Шоп предметы обмену и возврату не подлежат.</p>
            <p class="mb-0">6. Преимущества подписки Кубач.Плюс действуют только на срок действия подписки.</p>
          </div>
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

<script setup>
import { Modal } from 'bootstrap'
import { nextTick, onMounted } from 'vue'
let modalBs = {}

onMounted(() => {
  nextTick(() => {
    modalBs = new Modal('#rules-modal', {
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
