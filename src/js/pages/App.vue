<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark shadow p-0 mb-5">
    <div class="container col-xxl-5">
      <a class="navbar-brand fw-bold text-white h3 mb-0 text-uppercase py-3 text-decoration-none me-0 me-sm-2" href="/">Кубач</a>

      <status />

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <nav class="collapse navbar-collapse menu-links" id="navMenu">
        <div class="navbar-nav ms-auto">
          <a class="nav-link text-white d-flex justify-content-center" href="https://wiki.cubach.com">Кубач.Вики</a>
          <a class="nav-link text-white d-flex justify-content-center" href="https://map.cubach.com">Карта</a>
          <a class="nav-link text-white d-flex justify-content-center" href="https://cubach.com/discord" target="_blank">Наш Discord</a>

          <router-link to="/banlist" custom v-slot="{ href, isActive }">
            <a :href="href" :class="{active: isActive}" class="nav-link text-white d-flex justify-content-center">Бан-лист</a>
          </router-link>
          <router-link to="/shop" custom v-slot="{ href, isActive }">
            <a :href="href" :class="{active: isActive}" class="nav-link text-white d-flex justify-content-center">Кубач.Шоп</a>
          </router-link>
        </div>
      </nav>
  </div>
</nav>

  <div class="container col-xxl-5">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
</script>