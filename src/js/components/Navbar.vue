<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark shadow p-0">
    <div class="container col-xxl-6">
      <a class="navbar-brand fw-bold text-white h3 mb-0 text-uppercase py-3 text-decoration-none me-0 me-sm-2" href="/">
        Кубач
      </a>

      <status />

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon" />
      </button>

      <nav id="navMenu" class="collapse navbar-collapse menu-links">
        <div class="navbar-nav ms-auto">
          <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://wiki.cubach.com" target="_blank">
            <i class="bi bi-info-square small me-1" />&nbsp;Кубач.Вики
          </a>

          <template v-for="link in menuLinks">
            <router-link v-slot="{ href, isActive }" :to="link.to" custom>
              <a :href="href" :class="{active: isActive}" class="nav-link text-white d-flex justify-content-center align-self-center">
                <i class="bi small me-1" :class="link.icon" />&nbsp;{{ link.name }}
              </a>
            </router-link>
          </template>

          <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://cubach.com/discord" target="_blank">
            <i class="bi bi-discord small me-1" />&nbsp;Discord
          </a>
        </div>
      </nav>
    </div>
  </nav>
</template>
<script setup lang="ts">
const menuLinks = [
  {
    to: '/map',
    icon: 'bi-globe-americas',
    name: 'Карта'
  },
  {
    to: '/game/shops',
    icon: 'bi-shop-window',
    name: 'Магазины'
  },
  {
    to: '/game/bans',
    icon: 'bi-ban',
    name: 'Бан-лист'
  },
  {
    to: '/shop',
    icon: 'bi-bag-heart-fill',
    name: 'Кубач.Шоп'
  }
]
</script>
