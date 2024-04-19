<template>
  <span id="status"
        v-if="loaded"
        class="status-dot d-flex"
        :class="{online: online, offline: !online}"
        data-bs-toggle="tooltip"
        :data-bs-title="statusTxt"
        data-bs-placement="bottom"
        data-bs-html="true"
  />
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { Tooltip } from 'bootstrap'

const online = ref(false)
const loaded = ref(false)
const players = ref(0)
const statusTxt = computed(() => {
  if (online.value) {
    return `Сервер онлайн!<br>На сервере ${players.value} ${declOfNum(players.value, ['игрок', 'игрока', 'игроков'])}.<br><br>IP сервера: cubach.com`
  } else {
    return `Нет связи с сервером. Возможно, он временно отключён на техработы. =(`
  }
})

// https://gist.github.com/realmyst/1262561
function declOfNum (number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}

function update () {
  fetch('https://api.minetools.eu/ping/play.cubach.com/25565').then(r => r.json()).then(s => {
    online.value = true
    players.value = s.players.online
  }).catch(err => {
    online.value = false
  }).finally(() => {
    loaded.value = true
    setTimeout(update, 3 * 60 * 1000)
  })
}

onMounted(() => {
  update()

  nextTick(() => {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  })
})
</script>
