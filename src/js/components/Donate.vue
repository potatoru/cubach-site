<template>
  <div class="card mb-5 bg-dark bg-opacity-75">

    <div class="alert alert-danger text-center" v-if="error">
      {{ error }}
    </div>

    <div class="row gx-0">
      <div class="col-6">
        <img src="/img/money.webp" class="card-img" alt="...">
      </div>
      <div class="col-6">
        <div class="card-body text-white">
          <p class="card-text text-center">Вы можете пожертвовать нам любую сумму. Просто так. Без всяких плюшек. <span
              class="fst-italic">Ну мало ли</span>.</p>
          <textarea class="mb-3 form-control bg-dark text-white border-1 border-secondary shadow-none" rows="2"
                    v-model="donate.comment" placeholder="Ваш комментарий (очень крутой серв)"></textarea>
          <div class="input-group">
            <span class="input-group-text bg-dark text-white border-secondary border-end-0 pe-0">₽</span>
            <input type="text" class="form-control bg-dark text-white border-secondary border-start-0 shadow-none"
                   placeholder="Сумма" v-model="donate.amount">

            <button class="btn btn-success" @click="sendDonate" :disabled="sending">
              {{ sending
                    ? 'Делаем магию...'
                    : 'Отправить'
              }}
            </button>
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
      sending: false,
      donate: {
        amount: null,
        comment: '',
      },
      error: '',
    }
  },

  methods: {
    sendDonate () {

    },
  },
}
</script>
