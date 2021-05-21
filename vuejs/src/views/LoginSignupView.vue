<template>
  <div class="background">
    <div class="form">
      <div class="choice">
        <span @click="loginClick">Login</span> / 
        <span @click="signUpClick">Signup</span>
      </div>
      <div v-if="state === 'login'">
        <LoginForm />
      </div>
      <div v-else>
        <SignupForm />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'

export default {
  name: 'LoginSignupView',
  data() {
    return{
      state: 'login',
    }
  },
  components: {
    LoginForm,
    SignupForm,
  },
  methods: {
    loginClick() {
      this.state = 'login'
    },
    signUpClick() {
      this.state = 'signup'
    }
  }
}
</script>

<style>
  .background {
    background: url(../assets/man.jpg);
    background-size: cover;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }

  .background::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,0.2);
  }

  .form {
    background-color: black;
    position: relative;
    box-shadow: -5px 5px 10px rgb(12, 12, 12);
    width: 30%;
    height: 100vh;
    text-align: right;
  }

  .form > div {
    margin-right: 15px;
    top: 20px;
  }

  .choice {
    color: white;
  }

  .choice > span {
    cursor: pointer;
  }
</style>