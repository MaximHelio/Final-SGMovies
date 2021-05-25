<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <Nav
        @change-page="evalPage"
        @home-page='homePage'
      />
      <router-view/>
      <div v-if="page === 'home'">
        <MovieView />
      </div>
    </div>
    <div v-else>
     <LoginSignupView />
    </div>
  </div>
</template>
<script>
import LoginSignupView from '@/views/LoginSignupView'
import MovieView from '@/views/MovieView'
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    LoginSignupView,
    MovieView,
    Nav,
  },
  data() {
    return {
      page: '',
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    getUsername() {
      return this.$store.getters.getUserInfo
    }
  },
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
    },
    profile () {
      this.$store.commit('PROFILE')
    },
    evalPage() {
      this.page = 'eval'
    },
    homePage() {
      this.page = 'home'
    }
  },
}
</script>

<style>
body {
  height: 100%;
  background-color: black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

p {
  margin: 0;
}

.navbar {
  background-color: black !important;
}

.logo {
  width: 100px;
  height: 30px;
}

.user-info {
  margin-right: 40px;
  cursor: pointer;
}

.user-info img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid orange;
  background: url(/img/man.2669f94e.jpg);
  object-fit: cover;
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.user-info > p{
  display: inline;
  color: white;
  margin-right: 20px;
}

a{
  text-decoration: none;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

nav.navbar {
  list-style: none;
}
</style>
