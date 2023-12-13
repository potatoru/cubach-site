<template>
  <div class="card mb-3 text-bg-dark shadow-sm border-1 border-dark" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div class="position-absolute top-0 end-0">
      <img src="/img/pushka.png" style="width:100px; position:absolute; left: -91px; top: -9px;" />
    </div>
    <div class="row g-0">
      <div class="col-md-5">
        <img :src="item.image" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-7">
        <div class="card-body text-center h-100">
          <div class="d-flex align-items-start flex-column h-100">
            <div class="mb-auto w-100 pb-2">
              <h3 class="card-title fw-light text-uppercase">{{ item.name }}</h3>
              <p class="card-text">{{ item.subtitle }}</p>
            </div>
            <button @click="clicked" class="btn stretched-link text-white btn-lg p-1 col-6 mx-auto btn-outline-success">
              {{ item.price }} ₽
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['click'])
const hovered = ref(false)
const props = defineProps({
  item: {
    type: Object,
  },
})

function clicked () {
  emit('click', props.item)
}
</script>
