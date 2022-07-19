<template>
<div>

  <div class="text-center teaser mb-4">
    <h1 class="display-6 fw-bold">Добро пожаловать на Кубач!</h1>
    <h2 class="h4">10 лет пытаемся создать уютненький сервер Minecraft</h2>
    <p class="mb-0">Пока не получилось, но вы всё равно заходите...</p>
  </div>

  <div class="row justify-content-center mb-5">
    <div class="col-auto mb-2">
      <a class="btn btn-primary" href="https://help.cubach.com"><i class="bi bi-book"/>О сервере</a>
    </div>
    <div class="col-auto mb-2">
      <a class="btn btn-dark" href="https://map.cubach.com" target="_blank"><i class="bi bi-compass"/>Карта мира</a>
    </div>
    <div class="col-auto mb-2">
      <a class="btn btn-info" href="/discord" target="_blank"><i class="bi bi-discord"/>Сервер Discord</a>
    </div>
    <div class="col-auto mb-2">
      <a class="btn btn-warning" href="/plus"><i class="bi bi-currency-dollar"/>Поддержать проект</a>
    </div>
  </div>


  <div class="small col-4 mx-auto text-center shadow-lg p-3 bg-black bg-opacity-50 rounded-4 text-white" >
    <template v-if="loaded">
      <template v-if="online">
        <div class="row justify-content-between">
          <div class="col-auto"><h6> <span class="badge bg-success">Online</span></h6></div>
          <div class="col-auto">{{ players }} {{ playersTxt }}</div>
        </div>
        <div class="row justify-content-between">
          <div class="col-auto">Сервер v. {{ version }}</div>
          <div class="col-auto">play.cubach.com</div>
        </div>
      </template>
      <template v-else><span class="text-danger">Сервер временно отключён на техработы</span></template>
    </template>
    <template v-else>Устанавливаем связь с сервером...</template>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      online: false,
      loaded: false,
      version: '',
      players: 0,
      showStart: false
    }
  },

  computed: {
    playersTxt() {
      return this.declOfNum(this.players, ['игрок', 'игрока', 'игроков']);
    }
  },

  mounted() {
    this.update();
  },

  methods: {
    // https://gist.github.com/realmyst/1262561
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },

    update() {
      fetch('https://api.mcsrvstat.us/2/play.cubach.com').then(response => response.json().then(status => {
        this.online = status.online;
        this.players = status.players.online;
        this.version = status.version.split(' ')[1];
      })).catch(err => {
        this.online = false;
        this.version = '';
      }).finally(() => {
        this.loaded = true;
        setTimeout(this.update, 3 * 60 * 1000);
      })
    }
  }
}
</script>
