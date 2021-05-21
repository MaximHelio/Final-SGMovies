import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    CREATE_USER(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async CREATE_USER({ commit }, userInfo) {
      const USER_CREATE_URL = '/api/v1/accounts/signup/'
      const data = userInfo
      const response = await axios.post(USER_CREATE_URL, data)
      console.log(response)
      commit('CREATE_USER', response.data)
    }
  },
  modules: {
  }
})
