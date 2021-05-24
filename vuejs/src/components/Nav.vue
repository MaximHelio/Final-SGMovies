<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div>
          <img src="../assets/logo.png" alt="" class="logo">
          <a class="ms-5" href="">영화 평가하기</a>
        </div>
        <div class="user-info dropdown">
          <div class="" id="drop" data-bs-toggle="dropdown">
            <img src="../assets/man.jpg" alt="">
            <!-- <p>{{ getUserInfo}}</p> -->
          </div>
          <ul class="dropdown-menu" aria-labelledby="drop">
            <li><a href="" class="dropdown-item" @click.prevent="logout">Logout</a></li>
            <li>
              <a href="" class="dropdown-item">Profile</a>
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