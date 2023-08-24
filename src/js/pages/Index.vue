<template>

  <div class="row min-vh-100 no-gutters align-items-center">
    <div class="col p-3">
      <div class="text-center white-and-shadow mb-4">
        <h1 class="display-6 fw-bold">Добро пожаловать на Кубач!</h1>
        <h2 class="h4">10 лет пытаемся создать уютненький сервер Minecraft</h2>
        <p class="mb-0">Пока не получилось, но вы всё равно заходите...</p>
      </div>

      <div class="row justify-content-center mb-3">
        <div class="col-auto mb-2">
          <a class="btn btn-primary" href="https://help.cubach.com"><i class="bi bi-book me-1"/>Помощь</a>
        </div>
        <div class="col-auto mb-2">
          <a class="btn btn-dark" href="https://map.cubach.com" target="_blank"><i class="bi bi-compass me-1"/>Карта
            мира</a>
        </div>
        <div class="col-auto mb-2">
          <a class="btn btn-info" href="/discord" target="_blank"><i class="bi bi-discord me-1"/>Сервер Discord</a>
        </div>
        <div class="col-auto mb-2">
          <a class="btn btn-warning" href="/shop"><i class="bi bi-currency-dollar me-1"/>Кубач.Шоп</a>
        </div>
      </div>

      <div class="row">
        <div class="small col-auto mx-auto text-center shadow-lg p-3 bg-black bg-opacity-50 rounded-4 text-white">
          <template v-if="loaded">
            <template v-if="online">
              <div class="row justify-content-between">
                <div class="col-auto"><h6><span class="badge bg-success">Online</span></h6></div>
                <div class="col-auto">{{ players }} {{ playersTxt }}</div>
              </div>
              <div class="row justify-content-between">
                <div class="col-auto">IP сервера</div>
                <div class="col-auto">cubach.com</div>
              </div>
            </template>
            <template v-else><span class="text-danger">Сервер временно отключён на техработы</span></template>
          </template>
          <template v-else>Устанавливаем связь с сервером...</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const online = ref(false)
const loaded = ref(false)
const version = ref('')
const players = ref(0)
const playersTxt = computed(() => declOfNum(players, ['игрок', 'игрока', 'игроков']))

// https://gist.github.com/realmyst/1262561
function declOfNum (number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}

function update () {
  fetch('https://api.minetools.eu/ping/mc.cubach.com/25565').then(r => r.json()).then(s => {
    online.value = true
    players.value = s.players.online
    version.value =  '1.20.1' //s.server.name.split(' - ')[1]
  }).catch(err => {
    online.value = false
    version.value = ''
  }).finally(() => {
    loaded.value = true
    setTimeout(update, 3 * 60 * 1000)
  })
}

onMounted(() => {
  update()
})
</script>
