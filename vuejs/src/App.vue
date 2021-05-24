<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <div>
            <img src="./assets/logo.png" alt="" class="logo">
            <a class="ms-5" href="">영화 평가하기</a>
          </div>
          <div class="user-info">
            <div class="navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-lg-0">
                <li class="nav-item dropdown">
                  <img class="nav-link dropdown-toggle" src="./assets/man.jpg"
                    id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="position: absolute; left: -140px;">
                    <li><a class="dropdown-item" href="#" @click='logout'>Logout</a></li>
                    <li><a class="dropdown-item" href="#" @click='profile'>Profile</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <MovieView />
    </div>
    <div v-else>
     <LoginSignupView />
    </div>
  </div>
</template>
<script>
import LoginSignupView from '@/views/LoginSignupView'
import MovieView from '@/views/MovieView'

export default {
  name: 'App',
  components: {
    LoginSignupView,
    MovieView
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
