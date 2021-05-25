<template>
  <div class="">
    <transition name="modal">
        <div class="modal-mask"> <!-- @click="$emit('close')" -->
          <div class="modal-wrapper">
            <div class="modal-container">
              <!-- header -->
              <div class="d-flex justify-content-between">
                <div class="icons ms-5">
                  <i class="fas fa-info-circle fa-2x me-4" @click="movieInfo" :class="{ picked: category === 'info' }"></i>
                  <i class="fas fa-comment-dots fa-2x me-4" @click="movieComment" :class="{ picked: category === 'comment' }"></i>
                  <i class="fas fa-video fa-2x" @click="movieTrail" :class="{ picked: category === 'trail' }"></i>
                </div>
                <div class="me-5">
                  <i v-if="category === 'comment'" class="fas fa-edit fa-2x write-button" @click="showModal = true"></i>
                  <CommentModal v-if="showModal" @close="showModal = false" :movie="movie"/>
                  <i class="fas fa-times fa-2x cancel-button" @click="$emit('close')" style="color:white;"></i>
                </div>
              </div>
              <!-- body -->
              <div v-if="category === 'info' " class="modal-body d-flex justify-content-between">
                <div class="mt-5">
                  <h1>{{ movie.title }}</h1>
                  <p>{{ movie.vote_average }}/10</p>
                  <p>{{ movie.overview }}</p>
                </div>
                <div>
                  <img :src="movie.poster" alt="" class="poster">
                </div>
              </div>
              <div v-if="category === 'comment' " class="modal-body comment-page d-flex justify-content-between align-items-center">
                <div class="w-75 text-center">
                  <p>평점: {{ movie.vote_average }}</p>
                  <p>개봉일: {{ movie.release_date }}</p>
                  <p>런타임: {{ movie.runtime }}</p>
                  <p>댓글 수: ???</p>
                </div>
                <div class="row row-cols-2">
                  <div
                    class="col" 
                    v-for="comment in getCommentList"
                    :key="comment.id"
                  >
                    <h1>{{ comment.username }}</h1>
                    <p>{{ comment.content }}</p>
                  </div>
                </div>
              </div>

              <div v-if="category === 'trail' " class="modal-body d-flex justify-content-between h-100">
                <ModalTrail :movie="movie"/>
              </div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
import CommentModal from '@/components/CommentModal'
import ModalTrail from '@/components/ModalTrail'

export default {
  name: 'ModalView',
  components: {
    CommentModal,
    ModalTrail,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      category: 'info',
      showModal: false,
      
      videoList: [],
      video: null,
    }
  },
  computed: {
    getCommentList() {
      return this.$store.getters.getMovieCommentList
    }
  },
  methods: {
    movieInfo() {
      this.category = 'info'
    },
    movieComment() {
      this.category = 'comment'
      this.$store.dispatch('GET_MOVIE_COMMENT', this.movie.id)
    },
    movieTrail() {
      this.category = 'trail'
      // this.video = video
    },
  },
  created() {
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
  padding: 20px 0 0 0;
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
  cursor: pointer;
}

.icons .picked {
  color: yellow;
}

.poster {
  float: right;
  top: 0;
  width: 450px;
  height: 70vh;
}

.cancel-button {
  cursor: pointer;
}

.write-button {
  color: white;
  margin-right: 20px;
  cursor: pointer;
}

.write-button:hover {
  color: yellow;
}

.comment-page {
  top: 18%;
}


</style>