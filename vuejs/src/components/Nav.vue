<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div>
          <router-link to="/">
            <img src="../assets/logo.png" alt="" class="logo">
          </router-link>
          <router-link class="ms-5" to="/movie-evaluation">영화 평가하기</router-link>
        </div>
        <div class="user-info dropdown">
          <div class="" id="drop" data-bs-toggle="dropdown">
            <img src="../assets/man.jpg" alt="">
            <p class="text-light">{{ getUserInfo }}</p>
          </div>
          <ul class="dropdown-menu" aria-labelledby="drop">
            <li><a href="" class="dropdown-item" @click.prevent="logout">Logout</a></li>
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
    }
  }
}
</script>

<style>
.user-info {
  margin-right: 200px;
  cursor: pointer;
}

.user-info img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid orange;
}

.user-info p{
  display: inline;
  color: white;
  margin-right: 20px;
}
</style>