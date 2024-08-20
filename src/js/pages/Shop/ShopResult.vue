<template>
  <div class="row justify-content-center">
    <div class="col">
      <div class="mb-4 p-4 text-bg-dark  bg-opacity-75 shadow-sm border-0 rounded-3 mb-3 text-center">
        <div class="white-and-shadow">
          <h3 class="mb-3">
            Покупка завершена!
          </h3>
          <p><img src="/img/money.webp" class="img-fluid" style="max-width: 380px"></p>
          <p>Благодарим вас за покупку! Купленные предметы будут добавлены в ваше хранилище в течение 10-15 минут. Для получения предметов введите команду <span class="text-info">/shop</span> на сервере.</p>
        </div>
        <a href="/shop" class="btn btn-outline-secondary">&larr; Вернуться в магазин</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!('status' in route.query && route.query.status === 'succeeded')) {
    router.push('/shop')
  }
})
</script>
