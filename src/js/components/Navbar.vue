<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark shadow p-0">
    <div class="container col-xxl-6">
      <a class="navbar-brand fw-bold text-white h3 mb-0 text-uppercase text-decoration-none me-0 me-sm-2" href="/">
        Кубач
      </a>

      <status />

      <button class="navbar-toggler my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon" />
      </button>

      <nav id="navMenu" class="collapse navbar-collapse menu-links">
        <div class="navbar-nav ms-auto">

          <ul class="navbar-nav">
            <li class="nav-item py-2 px-1">
              <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://wiki.cubach.com" target="_blank">
                <i class="bi bi-info-square small me-1" />&nbsp;Кубач.Вики
              </a>
            </li>
            <li class="nav-item py-2 px-1">
              <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://map.cubach.com" target="_blank">
                <i class="bi bi-compass small me-1" />&nbsp;Карта
              </a>
            </li>

            <template v-for="item in menu" :key="item.name">
              <template v-if="!item.items">
                <router-link v-slot="{ href, isActive }" :to="item.to" custom>
                  <li class="nav-item py-2 px-1" :class="{active: isActive}">
                      <a class="nav-link text-white d-flex justify-content-center align-self-center" :href="href">
                        <i class="bi me-1" :class="item.icon" />&nbsp;{{ item.name }}
                      </a>
                  </li>
                </router-link>
              </template>

              <template v-else>
                <li class="nav-item dropdown py-2 px-1">
                  <a class="nav-link text-white d-flex justify-content-center align-self-center" role="button" data-bs-toggle="dropdown">
                    <i class="bi bi-cpu me-1" />&nbsp;{{ item.name }} <small><i class="bi bi-chevron-down small ms-1" /></small>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <template v-for="link in item.items">
                      <router-link v-slot="{ href, isActive }" :to="link.to" custom>
                        <li>
                          <a :href="href" :class="{active: isActive}" class="dropdown-item py-2">
                            <small><i class="bi me-1" :class="link.icon" /></small>&nbsp;{{ link.name }}
                          </a>
                        </li>
                      </router-link>
                    </template>
                  </ul>
                </li>
              </template>
            </template>
          </ul>

          <a class="nav-link text-white d-flex justify-content-center align-self-center" href="https://cubach.com/discord" target="_blank">
            <i class="bi bi-discord me-1" />&nbsp;Discord
          </a>
        </div>
      </nav>
    </div>
  </nav>
</template>
<script setup lang="ts">
const menu = [
  {
    icon: 'cpu',
    name: 'Сервер',
    items: [
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
    ]
  },
  {
    to: '/shop',
    icon: 'bi-bag-heart-fill',
    name: 'Кубач.Шоп'
  }
]
</script>

<style>


.menu-links {
  li.nav-item {
    &.active, &:hover {
      background-color: #333333;
    }
  }

  a {
    line-height: 1;
  }

  .nav-link {


    .bi.small {
      vertical-align: -0.2em;
    }
  }
}
</style>
