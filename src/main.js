import App from './App.vue'
import store from './store'

import './definitions'
import '@/assets/global.scss'

import Vue from 'vue'

Vue.config.ignoredElements = [/-\w*/]
Vue.config.productionTip = false

/**
* Application scope
*/
;(async function() {
  const app = new Vue({ store, render: h => h(App) })

  await Promise.all([
    customElements.whenDefined('applicants-search'),
    customElements.whenDefined('applicants-list'),
    customElements.whenDefined('list-item'),
    customElements.whenDefined('item-cell')
  ])

  app.$mount('#app')
})()
