import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieEvaluation from '@/views/MovieEvaluation'
import Profile from '@/views/Profile'


Vue.use(VueRouter)

const routes = [
  {
    path: '/movie-evaluation',
    name: 'MovieEvaluation',
    component: MovieEvaluation,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
