<template>
  <main id="app">
    <AppHeader />
    <template v-if="show">
      <AppBody />
    </template>
  </main>
</template>

<script setup>
import { useFetch } from '@/composable/useFetch'
import { ref } from 'vue'

import AppHeader from '@/components/AppHeader'
import AppBody from '@/components/AppBody'

const { fetchApplicantsList } = useFetch()
const show = ref(false)

;(async () => {
  await fetchApplicantsList()

  show.value = true

})()
</script>

<style lang="scss">
@import '@/assets/variables.scss';

#app {
  font-family: "Proxima-Nova", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
}
.container {
  padding: 0 20px;
  margin: 0 auto;
}
@media (min-width: 1920px) {
  .container {
    max-width: 1800px;
    width: 100%;
  }
}
@media (min-width: 1400px) {
  .container {
    min-width: 1320px;
    width: 94%;
  }
}
@media (min-width: 1200px) and (max-width: 1399px) {
  .container {
    min-width: 1140px;
    width: 94%;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    min-width: 960px;
    width: 94%;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .container {
    min-width: 720px;
    width: 94%;
  }
}
@media (max-width: 767px) {
  .container {
    min-width: 540px;
    width: 94%;
  }
}
@media (max-width: 569px) {
  .container {
    min-width: 300px;
    max-width: 529px;
    width: 94%;
  }
}
@media (max-width: 480px) {
  .container {
    max-width: 100%;
    padding: 0;
  }
}
</style>
