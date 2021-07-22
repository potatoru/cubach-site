<template>
  <div>
    <div class="container-fluid p-0 mb-2">
      <div class="shadow head text-white">
        <div class="py-4 px-2 text-center">
          <h1 class="mb-0 w-100 pb-2 display-6">Добро пожаловать на Кубач!</h1>
          <p class="lead mb-0">Сервер для любителей ванильного Minecraft без лишних плагинов и доната</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="mt-4 mb-3 lead text-center p-3 bg-white border-top border-start border-end border-bottom border-1" :class="{'border-success': loaded && online, 'border-danger': !online && loaded}">
        <template v-if="loaded">
          <template v-if="online">В данный момент наш сервер работает и на нём играет {{ playersTxt }}.</template>
          <template v-else>В данный момент наш сервер выключен на техработы. =(</template>
        </template>
        <div v-else class="spinner-border text-secondary" role="status"></div>
      </div>

      <div class="row">
        <div class="col">
          <div class="card w-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Начало игры</h5>
              <p class="card-text">
                Скачать игру можно с помощью <a href="https://tlaun.ch">TLauncher</a> или купить <a href="https://minecraft.net/ru-ru/store/">купить официально</a>.<br />
                Адрес сервера для подключения: <mark>cubach.com</mark><br />
                <template v-if="version !== ''">Версия сервера: <mark>{{ version }}</mark></template>
              </p>
            </div>
          </div>

          <div class="card mt-3 w-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Регистрация</h5>
              Установите клиент и подключитесь к серверу. При первом подключении необходимо зарегистрироваться, следуя инструкциям в чате. Введённый пароль в дальнейшем будет использоваться для авторизации на сервере.<br />
              Регистрируясь на сервере, Вы автоматически соглашаетесь с правилами.
            </div>
          </div>

          <div class="card mt-3 w-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Правила</h5>
              <p class="card-text">Не гриферить и не мешать играть другим игрокам. Не спамьте в чате и не материтесь. Уважайте других игроков.</p>
            </div>
          </div>

          <div class="card mt-3 w-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Связь с игроками</h5>
              <p class="card-text">
                Уважаемые игроки! Узнать последние новости, пообщаться с другими игроками и обратиться к администрации по любым вопросам вы можете через наш сервер Discord. Присоединяйтесь!
              </p>
              <div class="text-center">
                <a class="btn btn-light btn-discord" href="/discord" target="_blank">Присоединиться к Discord</a>
              </div>
            </div>
          </div>
        </div>
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
      players: 0
    }
  },

  computed: {
    playersTxt() {
      return this.players + ' ' + this.declOfNum(this.players, ['игрок', 'игрока', 'игроков'])
    }
  },

  mounted() {
    this.getStatus().then(status => {
      this.online = status.online;
      this.players = status.players.now;
      this.version = status.server.name.split(' ')[1];
    }).catch(err => {
      this.online = false;
      this.version = '';
    }).finally(() => {
      this.loaded = true;
    })
  },

  methods: {
    getStatus() {
      return new Promise((res, rej) => {
        MinecraftAPI.getServerStatus('cubach.com', function (err, status) {
          if (err) rej(err); else res(status);
        });
      })
    },

    // https://gist.github.com/realmyst/1262561
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
  }
}
</script>