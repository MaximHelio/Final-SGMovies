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
    bestMovieList: [],
    bestMovieItem: [],
    comments: {},
    nowPage: 'home',
  },
  getters: {
    getPage(state) {
      return state.nowPage
    },
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
    getBestMovieList(state) {
      return state.bestMovieList
    },
    getUserCreateStatus(state) {
      return state.userCreateStatus
    },
    getSearchMovieList(state) {
      return state.searchedMovieList
    },
    getMovieComment(state) {
      return state.comments
    },
  },
  mutations: {
    HOME(state) {
      state.nowPage = 'home'
    },
    EVAL(state) {
      state.nowPage = 'eval'
    },
    PROFILE(state) {
      state.nowPage = 'profile'
    },
    CREATE_USER(state, userCreateData) {
      state.userInfo = userCreateData.userInfo
      state.userCreateStatus = userCreateData.status
    },
    AUTH_USER(state, payload) {
      state.token = payload.token
      state.username = payload.username
      state.nowPage = 'home'
      localStorage.setItem('username', state.username)
    },
    GET_MOVIE_LIST(state, movieList) {
      state.movieList.push(...movieList)
      state.page += 1
    },
    GET_LATEST_MOVIE_LIST(state, movieList) {
      state.latestMovieList = movieList
    },
    GET_BEST_MOVIE_LIST(state, movieList) {
      state.bestMovieList = movieList
    },
    LOGOUT(state) {
      state.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
    SET_LATEST_LAYER(state, movie) {
      state.latestMovieItem = movie
    },
    SET_BEST_LAYER(state, movie) {
      state.bestMovieItem = movie
    },
    SEARCH_MOVIE(state, searchedMovieList) {
      state.searchedMovieList = searchedMovieList
      console.log(state.searchedMovieList)
    },
    FILTER_MOVIE(state, filterMovieList) {
      state.movieList = filterMovieList
    },
    CREATE_COMMENT(state, comments) {
      state.comments = comments
    },
  },
  actions: {
    async CREATE_USER({ commit }, userInfo) {
      const USER_CREATE_URL = '/api/v1/accounts/signup/'
      const data = userInfo
      const response = await axios.post(USER_CREATE_URL, data)
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
      latestMovieList = latestMovieList.filter(function (a) {
        return a.release_date.replace(/-/g, '') <= 20210525
      })
      // yyyyMMdd 20210101 -> 20210201(현재) - 20210301 => 마이너스 나오니까 필터 제외
      let newlatestMovieList = []
      latestMovieList.forEach((element) => {
        if (!newlatestMovieList.includes(element)) {
          newlatestMovieList.push(element);
        }
      })
      newlatestMovieList = newlatestMovieList.sort(function (a, b) {
        return b.release_date.replace(/-/g, '') - a.release_date.replace(/-/g, '');
      }).slice(0, 15)
      console.log(newlatestMovieList)
      commit('GET_LATEST_MOVIE_LIST', newlatestMovieList)
    },
    async GET_BEST_MOVIE_LIST({ commit }) {
      const BEST_MOVIE_LIST_URL = '/api/v1/movies/best'
      const response = await axios.get(BEST_MOVIE_LIST_URL)
      let bestMovieList = response.data
      bestMovieList = bestMovieList.sort().slice(0, 5)
      console.log(bestMovieList)
      commit('GET_BEST_MOVIE_LIST', bestMovieList)
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
    async CHECK_MOVIE({commit}, movie_id) {
      const CHECK_MOVIE_URL = '/api/v1/movies/checklist/'
      console.log(movie_id)
      const data = {
        'username': localStorage.getItem('username'),
        'movie': movie_id
      }
      const response = await axios.post(CHECK_MOVIE_URL, data)
      console.log(response)
      commit('CHECK_MOVIE')
    },
    async CREATE_COMMENT({ commit }, comments){
      const COMMENT_CREATE_URL = '/api/v1/movies/createcomments/'
      const data = comments
      const response = await axios.post(COMMENT_CREATE_URL, data)
      const commentCreateData = {
        'comments': response.data,
      }
      commit('CREATE_COMMENT', commentCreateData)
    },
  },
  modules: {
  }
})
