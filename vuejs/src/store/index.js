import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userInfo: {},
    userCreateStatus: '',
    username: '',
    token: localStorage.getItem('token') || '',
    movieList: [],
    page: 1,
    latestMovieList: [],
    latestMovieItem: [],
    movieItem: [],
    searchedMovieList: [],
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
    getUserCreateStatus(state) {
      return state.userCreateStatus
    },
    getSearchMovieList(state) {
      return state.searchedMovieList
    },
  },
  mutations: {
    CREATE_USER(state, userCreateData) {
      state.userInfo = userCreateData.userInfo
      state.userCreateStatus = userCreateData.status
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
    },
    LOGOUT(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    SET_LATEST_LAYER(state, movie) {
      state.latestMovieItem = movie
    },
    SEARCH_MOVIE(state, searchedMovieList) {
      state.searchedMovieList = searchedMovieList
      console.log(state.searchedMovieList)
    },
    FILTER_MOVIE(state, filterMovieList) {
      state.movieList = filterMovieList
    },
  },
  actions: {
    async CREATE_USER({ commit }, userInfo) {
      const USER_CREATE_URL = '/api/v1/accounts/signup/'
      const data = userInfo
      const response = await axios.post(USER_CREATE_URL, data)
      console.log(response)
      const userCreateData = {
        'userInfo': response.data,
        'status': response.status
      }
      commit('CREATE_USER', userCreateData)
    },
    async AUTH_USER({ commit }, userInfo) {
      const AUTH_USER_URL = '/api/token/'
      const data = userInfo
      const response = await axios.post(AUTH_USER_URL, data)
      
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
      const LATEST_MOVIE_LIST_URL = '/api/v1/movies/latest'
      const response = await axios.get(LATEST_MOVIE_LIST_URL)
      let latestMovieList = response.data
      latestMovieList = latestMovieList.sort(function (a, b) {
        return b.release_date.replace(/-/g, '') - a.release_date.replace(/-/g, '');
      }).slice(0, 40)

      let result = [];
      let latestMovieData = [];
      for (let i=0; i<=latestMovieList.length; i++) {
        if (i % 4 == 0 && i != 0) {
          result.push(latestMovieData);
          latestMovieData = [];
        }
        latestMovieData.push(latestMovieList[i]);
      }
      console.log(result)
      commit('GET_LATEST_MOVIE_LIST', result)
    },
    async SEARCH_MOVIE({ commit }, keyword) {
      const SEARCH_MOVIE_URL = `/api/v1/movies/search/${keyword}`
      const response = await axios.get(SEARCH_MOVIE_URL)
      commit('SEARCH_MOVIE', response.data)
    },
    async FILTER_MOVIE({ commit }, category) {
      const FILTER_MOVIE_URL = `/api/v1/movies/${category}`
      const response = await axios.get(FILTER_MOVIE_URL)
      console.log(response.data)
      commit('FILTER_MOVIE', response.data)
    },
  },
  modules: {
  }
})
