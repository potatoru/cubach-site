<template>
  <div>
    <div class="text-center teaser mb-3">
      <h1 class="display-6 fw-bold">Кубач.<span class="text-success">Плюс</span></h1>
      <h2 class="h5">Вы можете поддержать проект и пожертвовать нам немного денежек</h2>
    </div>

    <template v-if="showPlus">
      <div class="p-4 bg-white shadow-lg rounded-4 mb-4">
        <p>Любому проекту требуются средства для существования и развития. Так же раз в месяц требуется кормить модераторов
          шоколадными батончиками и газировкой для оплаты их работы на сервере.
          <br/>В качестве благодарности за поддежку, мы дадим вам некоторые бонусы, которые особо не повлияют на игру,
          но всё равно приятные.
        </p>

        <table class="table table-borderless table-responsive mb-0">
          <tbody>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> Префикс [+] в игре и цветной ник</td>
            <td class="fst-italic">&mdash; Очень важная персона.</td>
          </tr>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> Телепорт на место смерти</td>
            <td class="fst-italic">&mdash; Для тех, кто часто умирает.</td>
          </tr>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> Несколько точек /home</td>
            <td class="fst-italic">&mdash; Лендлорды на месте?</td>
          </tr>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> RTP с большим радиусом и без задержек
            </td>
            <td class="fst-italic">&mdash; Загляните в самые глубины Кубача!</td>
          </tr>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> Повышенный дроп денег с мобов</td>
            <td class="fst-italic">&mdash; Куда ещё больше-то...</td>
          </tr>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> Доступ к уникальной гаче</td>
            <td class="fst-italic">&mdash; Для самых азартных игроков.</td>
          </tr>
          <tr>
            <td class="fw-bold"><i class="bi bi-check-circle-fill text-success"/> Роль в Discord и чат для подписчиков
            </td>
            <td class="fst-italic">&mdash; Там всё равно никто не сидит, лол.</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center teaser mb-3">
        <h4 class="h5 mb-0">Поддержите проект кликнув по любой из кнопок ниже</h4>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="card mb-2 shadow-sm border-0" @mouseenter="gif = 1" @mouseleave="gif = 0">
            <img src="/img/monke.jpg" class="card-img-top" alt="...">
            <img src="/img/monke.webp" class="card-img-top position-absolute" v-if="gif === 1" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">1 месяц</h5>
              <p class="card-text">Я новенький</p>
              <button class="btn btn-success text-dark stretched-link text-white" @click="purchase(0)">Поддержать за
                299₽
              </button>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card mb-2 shadow-sm border-0" @mouseenter="gif = 2" @mouseleave="gif = 0">
            <!--            <div class="badge bg-success position-absolute top-100 start-50 translate-middle">Скидка!</div>-->
            <img src="/img/axo.jpg" class="card-img-top" alt="...">
            <img src="/img/axo.webp" class="card-img-top position-absolute" v-if="gif === 2" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">3 месяца</h5>
              <p class="card-text">Я уже смешарик</p>
              <button class="btn btn-primary stretched-link text-white" @click="purchase(1)">Поддержать за 750₽</button>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card mb-2 shadow-sm border-0" @mouseenter="gif = 3" @mouseleave="gif = 0">
            <!--            <span class="badge bg-success position-absolute top-100 start-50 translate-middle">Здесь тоже!</span>-->
            <img src="/img/billy.jpg" class="card-img-top" alt="...">
            <img src="/img/billy.webp" class="card-img-top position-absolute" v-if="gif === 3" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">6 месяцев</h5>
              <p class="card-text">DEEP ♂ DARK ♂ FANTASIES</p>
              <button class="btn btn-info stretched-link text-white" @click="purchase(2)">Поддержать за 1500₽</button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center teaser">
        <h4 class="h6">Остались вопросы? Вы можете задать их в нашем
          <a href="/discord" class="text-white" target="_blank">Discord</a> или <a href="/" class="text-white">вернуться
          на главную</a>.</h4>
      </div>
    </template>

    <template v-else>
      <div class="p-4 bg-white shadow-lg rounded-4 mb-4">
        <h2>Подтверждение</h2>
        <hr/>

        <div class="mb-3 row">
          <label for="staticPlan" class="col-sm-3 col-form-label">Выбранный план</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" readonly id="staticPlan" :value="planText">
          </div>
        </div>

        <div class="row mb-3">
          <label for="inputNickname" class="col-sm-3 col-form-label">Ваш ник на сервере</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="inputNickname" v-model="player">
          </div>
        </div>

        <div class="row">
          <div class="col-sm-3"/>
          <div class="col-sm-5">
            <button class="btn btn-success mb-2" @click="confirm" :disabled="sending">{{
                sending
                    ? 'Делаем магию...'
                    : 'Подтвердить'
              }}
            </button>
            <div class="alert alert-danger mt-1 mb-0" role="alert" v-if="error !== ''" v-html="error"/>
          </div>
          <div class="col text-end">
            <button class="btn btn-link text-dark opacity-50" @click="cancel">Назад (я испугался)</button>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  data () {
    return {
      showPlus: true,
      plans: [
        { 'id': 1, 'name': '1 месяц', price: 300 },
        { 'id': 2, 'name': '3 месяца', price: 750 },
        { 'id': 3, 'name': '6 месяцев', price: 1500 },
      ],
      selectedPlan: 0,
      player: '',
      error: '',
      sending: false,
      gif: 0,
    }
  },

  computed: {
    planText () {
      return `${this.plans[this.selectedPlan]['name']} (${this.plans[this.selectedPlan]['price']}₽)`
    },
  },

  methods: {
    purchase (plan) {
      this.selectedPlan = plan
      this.showPlus = false
    },

    cancel () {
      this.showPlus = true
    },

    async confirm () {
      const body = { 'player': this.player, 'plan_id': this.plans[this.selectedPlan]['id'] }
      this.error = ''
      this.sending = true
      try {
        const response = await fetch('https://plus.cubach.com/bills', {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(body),
        })

        const res = await response.json()
        if (res.hasOwnProperty('error')) {
          this.error = res.error
        } else {
          window.location.href = res.link
        }
      } catch (e) {
        this.error = 'Ошибка выполнения запроса. Что-то не так?'
      }

      this.sending = false
    },
  },
}
</script>
