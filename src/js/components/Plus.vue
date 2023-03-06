<template>
  <div class="row justify-content-center mb-5">
    <div class="col-11">
      <template v-if="showPlus">
        <div class="rounded-2 p-3 bg-dark bg-opacity-75 mb-3">
          <table class="table table-responsive table-borderless text-white mb-0 table-sm">
            <tbody>
            <tr>
              <td><i class="bi bi-check-circle-fill mr text-success"/> Префикс [+] в игре и цветной ник</td>
              <td><i class="bi bi-check-circle-fill mr text-success"/> Телепорт на место смерти /dback</td>
            </tr>
            <tr>
              <td><i class="bi bi-check-circle-fill mr text-success"/> Несколько точек /home</td>
              <td><i class="bi bi-check-circle-fill mr text-success"/> /rtp без задержек</td>
            </tr>
            <tr>
              <td><i class="bi bi-check-circle-fill mr text-success"/> Доступ к уникальной гаче</td>
              <td><i class="bi bi-check-circle-fill mr text-success"/> Роль в Discord и чат для подписчиков</td>
            </tr>
            <tr>
              <td colspan="2" class="text-end">
                <a target="_blank" href="https://help.cubach.com/books/kubacplyus/page/o-podpiske"
                   class="text-white fst-italic">И другие плюшки...</a></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="card-group shadow shadow-lg mb-2">
          <div class="card bg-dark text-white border-0" @mouseenter="gif = 1" @mouseleave="gif = 0">
            <img src="/img/monke.jpg" class="card-img-top" alt="...">
            <img src="/img/monke.webp" class="card-img-top position-absolute" v-if="gif === 1" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">КУБАЧ <i class="bi bi-plus-square text-success"></i></h5>
              <p class="card-text">1 месяц</p>
              <button class="btn btn-success stretched-link " @click="purchase(0)">Подписаться за 299₽</button>
            </div>
          </div>

          <div class="card bg-dark text-white border-0" @mouseenter="gif = 2" @mouseleave="gif = 0">
            <img src="/img/axo.jpg" class="card-img-top" alt="...">
            <img src="/img/axo.webp" class="card-img-top position-absolute" v-if="gif === 2" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">КУБАЧ <i class="bi bi-plus-square text-success"></i></h5>
              <p class="card-text">3 месяца</p>
              <button class="btn btn-primary stretched-link text-white" @click="purchase(1)">Подписаться за 750₽
              </button>
            </div>
          </div>

          <div class="card bg-dark text-white border-0" @mouseenter="gif = 3" @mouseleave="gif = 0">
            <img src="/img/billy.jpg" class="card-img-top" alt="...">
            <img src="/img/billy.webp" class="card-img-top position-absolute" v-if="gif === 3" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title">КУБАЧ <i class="bi bi-plus-square text-success"></i></h5>
              <p class="card-text">6 месяцев</p>
              <button class="btn btn-info stretched-link text-white" @click="purchase(2)">Подписаться за 1500₽</button>
            </div>
          </div>
        </div>
      </template>

      <div class="rounded-2 p-3 bg-dark bg-opacity-75 mb-3 text-white" v-else>
        <h2>Подтверждение</h2>
        <hr/>

        <div class="alert alert-danger" v-html="error" v-if="error" />

        <div class="mb-3 row">
          <label for="staticPlan" class="col-sm-3 col-form-label">Выбранный план</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" readonly id="staticPlan" :value="planText">
          </div>
        </div>

        <div class="row mb-3">
          <label for="inputNickname" class="col-sm-3 col-form-label">Ваш ник на сервере</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="inputNickname" v-model="plus.player">
          </div>
        </div>

        <div class="row">
          <div class="col-sm-3"/>
          <div class="col-sm-5">
            <button class="btn btn-success mb-2" @click="confirmPlus" :disabled="sending" v-html="buttonText"/>
          </div>
          <div class="col text-end">
            <button class="btn btn-link text-white opacity-50" @click="cancel">Назад (я испугался)</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      showPlus: true,
      gif: 0,
      sending: false,
      plus: {
        selectedPlan: 0,
        player: '',
      },
      error: '',
      plans: [
        { 'id': 1, 'name': '1 месяц', price: 300 },
        { 'id': 2, 'name': '3 месяца', price: 750 },
        { 'id': 3, 'name': '6 месяцев', price: 1500 },
      ],
    }
  },

  computed: {
    planText () {
      return `${this.plans[this.plus.selectedPlan]['name']} (${this.plans[this.plus.selectedPlan]['price']}₽)`
    },
    buttonText () {
      return this.sending ? 'Делаем магию...' : 'Перейти к оплате'

    },
  },

  methods: {
    purchase (plan) {
      this.plus.selectedPlan = plan
      this.showPlus = false
    },

    async confirmPlus () {
      const body = { 'player': this.plus.player, 'plan_id': this.plans[this.plus.selectedPlan]['id'] }
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

    cancel () {
      this.showPlus = true
    },
  },
}
</script>
