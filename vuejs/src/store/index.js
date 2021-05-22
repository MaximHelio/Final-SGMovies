import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    username: '',
    token: localStorage.getItem('token') || '',
    movieList: [],
  },
  getters: {
    isAuthenticated(state) {
      return state.token ? true : false
    },
    getUserInfo(state) {
      return state.username
    },
    getMovieList(state) {
      return state.movieList
    },
  },
  mutations: {
    CREATE_USER(state, userInfo) {
      state.userInfo = userInfo
    },
    AUTH_USER(state, payload) {
      state.token = payload.token
      state.username = payload.username
    },
    GET_MOVIE_LIST(state, movieList) {
      state.movieList = movieList
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
      const response = await axios.post(AUTH_USER_URL, data)
      console.log(response)
      const token = response.data.access
      const payload = {'username': userInfo.username, 'token': token}
      localStorage.setItem('token', token)
      commit('AUTH_USER', payload)
    },
    async GET_MOVIE_LIST({ commit }) {
      const MOVIE_LIST_URL = '/api/v1/movies/'
      const response = await axios.get(MOVIE_LIST_URL)
      commit('GET_MOVIE_LIST', response.data)
    }
  },
  modules: {
  }
})
