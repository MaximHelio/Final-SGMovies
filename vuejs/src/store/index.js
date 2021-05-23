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
    page: 1,
    latestMovieList: [],
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
    getLatestMovieList(state) {
      return state.latestMovieList
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
      state.movieList.push(...movieList)
      state.page += 1
    },
    GET_LATEST_MOVIE_LIST(state, movieList) {
      state.latestMovieList = movieList
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
    async GET_MOVIE_LIST({ state, commit }) {
      const MOVIE_LIST_URL = '/api/v1/movies/'
      const response = await axios.get(`${MOVIE_LIST_URL}?page=${state.page}`)
      commit('GET_MOVIE_LIST', response.data)
    },
    async GET_LATEST_MOVIE_LIST({ commit }) {
      const LATEST_MOVIE_LIST_URL = '/api/v1/movies/'
      const response = await axios.get(LATEST_MOVIE_LIST_URL)
      let latestMovieList = response.data
      latestMovieList = latestMovieList.sort(function (a, b) {
        return b.release_date.replace(/-/g, '') - a.release_date.replace(/-/g, '');
      }).slice(0, 41)

      let result = [];
      let latestMovieData = [];
      for (let i=0; i<latestMovieList.length; i++) {
        if (i % 4 == 0 && i != 0) {
          result.push(latestMovieData);
          latestMovieData = [];
        }
        latestMovieData.push(latestMovieList[i]);
      }
      console.log(result)
      commit('GET_LATEST_MOVIE_LIST', result)
    }
  },
  modules: {
  }
})
