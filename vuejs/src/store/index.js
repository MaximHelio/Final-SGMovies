import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isAuthenticated(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    CREATE_USER(state, userInfo) {
      state.userInfo = userInfo
    },
    AUTH_USER(state, token) {
      state.token = token
    }
  },
  actions: {
    async CREATE_USER({ commit }, userInfo) {
      const USER_CREATE_URL = '/api/v1/accounts/signup/'
      const data = userInfo
      const response = await axios.post(USER_CREATE_URL, data)
      console.log(response)
      commit('CREATE_USER', response.data)
    },
    async AUTH_USER({ commit }, userInfo) {
      const AUTH_USER_URL = '/api/token/'
      const data = userInfo
      console.log('hi')
      const response = await axios.post(AUTH_USER_URL, data)
      console.log(response)
      const token = response.data.access
      localStorage.setItem('token', token)
      commit('AUTH_USER', token)
    }
  },
  modules: {
  }
})
