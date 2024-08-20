<template>
  <div id="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0 pb-1">
          <h1 class="modal-title fs-4 mx-auto">
            {{ item!.name }}
          </h1>
        </div>

        <div class="modal-body">
          <div class="text-center mb-3">
            <img :src="item!.image" class="w-75 rounded-3" alt="..."
                 :class="{'visually-hidden': hovered && item!.image2}"
                 @mouseenter="hovered = true"
            >
            <img v-if="item!.image2" :src="item!.image2" class="w-75 rounded-3" alt="..."
                 :class="{'visually-hidden': !hovered && item!.image2}" @mouseleave="hovered = false"
            >
          </div>

          <p v-if="item!.description" class="mb-0 font-monospace text-center" v-html="item!.description" />
        </div>

        <div class="modal-footer border-0 pt-2">
          <div class="hstack gap-3 w-100">
            <button type="button" class="btn btn-dark bg-white bg-opacity-10" data-bs-dismiss="modal">
              <i class="bi bi-x-lg me-1 d-none d-sm-inline" />Закрыть
            </button>

            <button type="button" class="btn btn-success ms-auto" @click="addToCart">
              <i class="bi bi-plus-square me-1 d-none d-sm-inline" /> Купить за {{ item!.price }}₽
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import { useCartStore } from '@app/js/stores/cart.js'
import type { TItem } from '@app/js/types.ts'

const emit = defineEmits(['added'])
const cart = useCartStore()
const item = ref<TItem>()
const hovered = ref({})

let modalBs = <Modal>{}

function show (showItem: TItem): void {
  item.value = showItem
  hovered.value = false
  modalBs.show()
}

function addToCart(): void {
  cart.append(item.value!, 1)
  emit('added')
  modalBs.hide()
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
