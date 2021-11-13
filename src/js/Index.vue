<template>
<div>
  <div class="text-center rounded rounded-3 shadow bg-light px-4 pt-4 pb-3">
    <h1 class="display-6 mb-3">Добро пожаловать на Кубач!</h1>
    <p class="lead mb-3">Сервер для любителей Minecraft без лишних плагинов и доната.</p>

    <p class="mb-4" :class="{'text-success': online && loaded, 'text-danger': !online && loaded}">
      <template v-if="loaded">
        <template v-if="online">Сейчас на сервере {{ players }} {{ playersTxt }}.</template>
        <template v-else>Сервер временно отключён на техработы.</template>
      </template>
      <template v-else>Устанавливаем связь с сервером...</template>
    </p>

    <div class="row justify-content-center">
      <div class="col-auto mb-2">
        <button class="btn btn-outline-success" @click="showStart = !showStart">Начать играть</button>
      </div>
      <div class="col-auto mb-2">
        <a class="btn btn-outline-primary" href="/discord" target="_blank">Сервер Discord</a>
      </div>
    </div>

    <div v-if="showStart" class="mt-4 text-start">
      <div class="row justify-content-center mb-4">
        <div class="col-6">
          <img class="w-100" src="/img/billy.gif" />
        </div>
      </div>

      <h5 class="text-center">Начало игры</h5>
      <p class="mb-1">Скачать игру можно с помощью <a href="https://tlaun.ch">TLauncher</a> или купить <a href="https://minecraft.net/ru-ru/store/">купить официально</a>.</p>
      <p class="mb-1">Адрес сервера для подключения: <mark>cubach.com</mark></p>
      <p v-if="version !== ''">Версия сервера: <mark>{{ version }}</mark></p>

      <h5 class="text-center">Регистрация</h5>
      <p class="mb-1">Установите клиент и подключитесь к серверу. При первом подключении необходимо зарегистрироваться, следуя инструкциям в чате. Введённый пароль в дальнейшем будет использоваться для авторизации на сервере.</p>
      <p>Регистрируясь на сервере, Вы автоматически соглашаетесь с правилами.</p>

      <h5 class="text-center">Правила</h5>
      <p>Не гриферить и не мешать играть другим игрокам. Не спамьте в чате и не материтесь. Уважайте других игроков.</p>

      <h5 class="text-center">Связь с игроками</h5>
      <p>Уважаемые игроки! Узнать последние новости, пообщаться с другими игроками и обратиться к администрации по любым вопросам вы можете через наш сервер Discord. Присоединяйтесь!</p>
    </div>

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
      fetch('https://mcapi.us/server/status?ip=play.cubach.com').then(response => response.json().then(status => {
        this.online = status.online;
        this.players = status.players.now;
        this.version = status.server.name.split(' ')[1];
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
