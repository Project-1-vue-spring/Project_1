// =============================================================
//  vuex 관련해서도 공부가 필요해보임...
//  추후, 공부 후에 삭제 예정.
// =============================================================

// import Vue from 'vue'
import Vuex from 'vuex'

// Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  }
})

export default store
