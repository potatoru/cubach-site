<template>
  <nav class="navbar bg-dark shadow p-0 mb-3">
    <div class="container col-xxl-5">
      <a class="fw-bold text-white h3 mb-0 text-uppercase py-3 text-decoration-none" href="/">Кубач</a>
      <div class="text-white small d-lg-block d-none">
        Поддержите сервер, купив подписку Кубач.Плюс или какой-нибудь прикольный предмет!
      </div>
    </div>
  </nav>

  <div class="container col-xxl-5">

    <router-view />

    <div class="mt-4 text-center white-and-shadow pb-4">
      <h4 class="h6">Возникли вопросы по работе магазина? Вы можете задать их в <a href="/discord" class="text-white" target="_blank">нашем Discord</a>.</h4>
    </div>
  </div>
</template>
<script setup>
</script>
