<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark shadow p-0 mb-5">
    <div class="container col-xxl-6">
      <a class="navbar-brand fw-bold text-white h3 mb-0 text-uppercase py-3 text-decoration-none me-0 me-sm-2" href="/">Кубач</a>

      <status />

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon" />
      </button>

      <nav id="navMenu" class="collapse navbar-collapse menu-links">
        <div class="navbar-nav ms-auto">
          <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://wiki.cubach.com" target="_blank">
            <i class="bi bi-info-square small me-1" />&nbsp;Кубач.Вики
          </a>
          <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://map.cubach.com" target="_blank">
            <i class="bi bi-globe-americas small me-1" />&nbsp;Карта
          </a>

          <router-link v-slot="{ href, isActive }" to="/game/shops" custom>
            <a :href="href" :class="{active: isActive}" class="nav-link text-white d-flex justify-content-center align-self-center">
              <i class="bi bi-shop-window small me-1" />&nbsp;Магазины
            </a>
          </router-link>
          <router-link v-slot="{ href, isActive }" to="/game/bans" custom>
            <a :href="href" :class="{active: isActive}" class="nav-link text-white d-flex justify-content-center align-self-center">
              <i class="bi bi-ban small me-1" />&nbsp;Бан-лист
            </a>
          </router-link>

          <router-link v-slot="{ href, isActive }" to="/shop" custom>
            <a :href="href" :class="{active: isActive}" class="nav-link text-white d-flex justify-content-center align-self-center">
              <i class="bi bi-bag-heart-fill small me-1" />&nbsp;Кубач.Шоп
            </a>
          </router-link>

          <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://cubach.com/discord" target="_blank">
            <i class="bi bi-discord small me-1" />&nbsp;Discord
          </a>
        </div>
      </nav>
    </div>
  </nav>
</template>
<script setup lang="ts">
</script>
