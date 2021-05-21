<template>
  <div class="signup-form">
    <div class="area">
      <input type="text" name="id" id="id" autocomplete="off" required autofocus>
      <label for="id" id="id-lb">USERNAME</label>
    </div>
    <div class="area mt-3">
      <input type="email" name="eamil" id="eamil" autocomplete="off" required>
      <label for="email" id="email-lb">EMAIL</label>
    </div>
    <div class="area mt-3">
      <input type="password" name="pw" id="pw" autocomplete="off" required>
      <label for="pw" id="pw-lb">PASSWORD</label>
    </div>
    <div class="area mt-3">
      <input type="password" name="pw-confirm" id="pw-confirm" autocomplete="off" required>
      <label for="pw-confirm" id="pw-lb">PASSWORD CONFIRM</label>
    </div>
    <button class="btn btn-dark mt-4">SignUp</button>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
}
</script>

<style>
  .signup-form {
     padding: 20px;
     transition: all 0.5s;
   }

  .area > input {
    width: 100%;
    padding: 20px 10px 0px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #999;
    font-size: 18px;
    color: white;
  }

  .area label {
    position: absolute;
    left: 30px;
    transition: all .5s ease;
  }

  .area input:focus + label,
  .area input:valid + label {
    font-size: 13px;
    color: #166cea;
  }
</style>