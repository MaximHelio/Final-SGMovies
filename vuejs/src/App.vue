<template>
  <div id="app">
    <LoginSignupView />
  </div>
</template>
<script>
import LoginSignupView from '@/views/LoginSignupView'

export default {
  name: 'App',
  components: {
    LoginSignupView
  },
}
</script>

<style>
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
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
</style>
