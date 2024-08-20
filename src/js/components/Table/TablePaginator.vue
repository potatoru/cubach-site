<template>
  <div class="btn-group btn-group-sm">
    <button v-if="page > 1" type="button" class="btn btn-dark border-black" @click="page = 1">
      <i class="bi bi-arrow-bar-left" />
    </button>
    <button v-if="page > 1" type="button" class="btn btn-dark border-black" @click="next(-1)">
      <i class="bi bi-arrow-left" />
    </button>
    <button type="button" class="btn btn-dark disabled border-black">
      {{ page }} / {{ pages }}
    </button>
    <button v-if="page < pages" type="button" class="btn btn-dark border-black" @click="next(1)">
      <i class="bi bi-arrow-right" />
    </button>
    <button v-if="pages > 1 && page !== pages" type="button" class="btn btn-dark border-black" @click="page = pages">
      <i class="bi bi-arrow-bar-right" />
    </button>
    <slot name="extra_buttons" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  pages: number
}>()

const page = ref<number>(1)

const emit = defineEmits(['change'])

function next(dir: number): void {
  let newPage: number = page.value + dir
  if (newPage < 1) {
    newPage = 1
  }
  if (newPage > props.pages) {
    newPage = props.pages
  }
  page.value = newPage
}

function reset(): void {
  page.value = 1
}

watch(page, () => {
  emit('change', page.value)
})

defineExpose({
  reset, page
})
</script>
