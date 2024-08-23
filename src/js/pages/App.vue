<template>
  <navbar />

  <div :class="{'my-5': !isMap, 'container': !isMap, 'col-xxl-6': !isMap, 'vh-100': isMap}">
    <router-view />
  </div>

  <div class="mt-auto bg-dark shadow">
    <div class="container col-xxl-6 text-center">
      <div class="px-4 py-2 small" style="color: #aaaaaa">
        Кубач Minecraft 2012 &mdash; 2024
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const isMap = computed(() => route.path === '/map')
</script>
