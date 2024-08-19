<template>
  <div class="card text-bg-dark text-center shadow-sm border-0 h-100" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <img :src="item.image" class="card-img-top" alt="...">
    <img :src="item.image2" class="card-img-top position-absolute" alt="..." v-if="item.image2 && hovered">
    <div class="card-body p-3 d-flex align-items-start flex-column">
      <h5 class="card-title fw-light w-100">{{ item.name }}</h5>
      <p class="card-text small mb-auto w-100">{{ item.subtitle }}</p>
      <button @click="clicked" class="btn stretched-link text-white p-1 w-100 btn-outline-success mt-3">{{ item.price }} ₽</button>
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
