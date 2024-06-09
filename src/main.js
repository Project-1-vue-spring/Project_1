// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 부트스트랩 vue3 적용
import BootstrapVue3 from 'bootstrap-vue-3'
// 부트스트랩 toast 를 위한 플러그인
import { BToastPlugin } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// AG Grid Vue3 적용
// import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the grid

// import Vuex from 'vuex'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)
app.use(BToastPlugin)
// app.use(AgGridVue)
// app.use(Vuex)
app.mount('#app')
