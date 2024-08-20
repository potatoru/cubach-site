<template>
  <div class="input-group input-group-sm ">
    <span class="input-group-text bg-dark text-white border-black">
      <i class="bi bi-search" />
    </span>
    <input v-model="model" type="text" class="form-control bg-dark border-black text-white">
    <button v-if="model !== ''" class="btn btn-dark border-black" type="button" @click="model = ''">
      <i class="bi bi-x-lg" />
    </button>
  </div>
</template>

<script setup lang="ts">
  const model = defineModel<string>()
</script>
