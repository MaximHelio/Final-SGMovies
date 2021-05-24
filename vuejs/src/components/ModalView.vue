<template>
  <div class="">
    <transition name="modal">
        <div class="modal-mask" @click="$emit('close')">
          <div class="modal-wrapper">
            <div class="modal-container">
              <!-- header -->
              <div class="d-flex justify-content-between">
                <div class="icons">
                  <i class="fas fa-info-circle fa-2x me-4"></i>
                  <i class="fas fa-comment-dots fa-2x me-4"></i>
                  <i class="fas fa-video fa-2x"></i>
                </div>
                <div>
                  <i class="fas fa-times fa-2x cancel-button" @click="$emit('close')" style="color:white;"></i>
                </div>
              </div>
              <!-- body -->
              <div class="modal-body d-flex justify-content-between">
                <div>
                  <h1>{{ movie.title }}</h1>
                  <p>{{ movie.vote_average }}/10</p>
                  <p>{{ movie.overview }}</p>
                </div>
                <div>
                  <img :src="movie.poster" alt="" class="poster">
                </div>
              </div>

              <div class="">
                <slot name="footer">
                  default footer
                </slot>
              </div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ModalView',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.modal-container {
  width: 100%;
  height: 81%;
  
  margin: 0px auto;
  padding: 20px 30px;
  background-color: black;
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(255, 254, 254);
  transition: all .3s ease;
  position: relative;
}

.modal-body {
  padding: 0;
  text-align: left;
  color: white;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.icons > i {
  color: grey;
}

.poster {
  float: right;
  top: 0;
  width: 450px;
  height: 100%;
}

.cancel-button {
  cursor: pointer;
}

.cancel-button:hover {
  color: red;
}

</style>