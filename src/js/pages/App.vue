<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark shadow p-0 mb-5">
    <div class="container col-xxl-5 justify-content-start">
      <a class="navbar-brand fw-bold text-white h3 mb-0 text-uppercase py-3 text-decoration-none me-2" href="/">Кубач</a>

      <status />

      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <nav class="collapse navbar-collapse menu-links" id="navMenu">
        <div class="navbar-nav ms-auto">
          <a class="nav-link text-white d-flex justify-content-center" href="https://wiki.cubach.com">Кубач.Вики</a>
          <a class="nav-link text-white d-flex justify-content-center" href="https://map.cubach.com">Карта</a>
          <a class="nav-link text-white d-flex justify-content-center" href="https://cubach.com/discord" target="_blank">Наш Discord</a>

          <router-link to="/banlist" tag="a" class="nav-link text-white d-flex justify-content-center" active-class="active">Бан-лист</router-link>
          <router-link to="/shop" tag="a" class="nav-link text-white d-flex justify-content-center" active-class="active">Кубач.Шоп</router-link>
        </div>
      </nav>
  </div>
</nav>

  <div class="container col-xxl-5">
    <router-view></router-view>
  </div>
</template>
