<template>
  <div class="btn-group btn-group-sm">
    <button type="button" class="btn btn-dark border-black" v-if="page > 1" @click="page = 1"><i class="bi bi-arrow-bar-left" /></button>
    <button type="button" class="btn btn-dark border-black" v-if="page > 1" @click="next(-1)"><i class="bi bi-arrow-left" /></button>
    <button type="button" class="btn btn-dark disabled border-black">{{ page }} / {{ pages }}</button>
    <button type="button" class="btn btn-dark border-black" v-if="page < pages" @click="next(1)"><i class="bi bi-arrow-right" /></button>
    <button type="button" class="btn btn-dark border-black" v-if="pages > 1 && page !== pages" @click="page = pages"><i class="bi bi-arrow-bar-right" /></button>
    <slot name="extra_buttons" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  pages: {
    type: Number,
  }
})
const page = ref(1)

const emit = defineEmits(['change'])

function next(dir) {
  let newPage = page.value + dir
  if (newPage < 1) {
    newPage = 1
  }
  if (newPage > props.pages) {
    newPage = props.pages
  }
  page.value = newPage
}

function reset() {
  page.value = 1
}

watch(page, () => {
  emit('change', page.value)
})

defineExpose({
  reset, page
})
</script>