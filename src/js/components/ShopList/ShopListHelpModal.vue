<template>
  <div id="shop-list-modal" class="modal modal-lg fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0 pb-1">
          <h1 class="modal-title fs-4 mx-auto">
            Список магазинов
          </h1>
        </div>

        <div class="modal-body">
          <div class="text-white mb-4 pt-2">
            <p>
              В данной таблице собрана информация по всем магазинам на сервере. Список обновляется раз в 5 минут.
            </p>
            <p class="lead">
              Название предмета
            </p>
            <p>
              Если рядом с названием предмета стоит символ <i class="bi bi-plus" />, то предмет содержит описание или список зачарований.
              Кликните по имени предмета, чтобы раскрыть строку.
            </p>
            <p>
              Иконка слева от названия предмета показывает, в каком режиме работает магазин:
              <i class="bi bi-arrow-left-square text-success" /> &mdash; продаёт или
              <i class="bi bi-arrow-right-square text-primary" /> &mdash; покупает.
            </p>
            <p>
              Справа вы можете увидеть количество товара в магазине
              (<span class="badge bg-secondary bg-opacity-25 text-white">14</span>), а кликнув по кнопке
              <span class="badge text-bg-primary bg-opacity-25">
                  <small><i class="bi bi-bar-chart-fill" /></small>
              </span> посмотреть последние продажи.
            </p>
            <p class="lead">
              Владелец
            </p>
            <p>
              Если кликнуть по нику игрока, отобразятся все его магазины.
            </p>
            <p class="lead">
              Координаты
            </p>
            <p>
              Координаты указывают местополжение магазина. Если на них кликнуть, в отдельном окне откроется карта.
            </p>
            <p class="lead">
              Поиск и сортировка
            </p>
            <p>
              Воспользуйтесь поиском, чтобы найти нужный предмет по имени продавца, по названию товара, его описанию или зачарованиям.
              Некоторые столбцы сортируются, если кликнуть по заголовку столбца.
            </p>
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

<script setup lang="ts">
import { Modal } from 'bootstrap'
import { nextTick, onMounted } from 'vue'
let modalBs: Modal

onMounted(() => {
  nextTick(() => {
    modalBs = new Modal('#shop-list-modal', {
      backdrop: 'static',
      keyboard: false,
    })
  })
})

function show (): void {
  modalBs!.show()
}

defineExpose({
  show,
})
</script>
