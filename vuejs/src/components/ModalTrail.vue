<template>
  <div class="container my-4">
    <div class="container">
      <h2>예고편</h2>

      <div class="d-flex justify-content-between align-items-center">
        <div class="video-container embed-responsive embed-responsive-16by9 w-100" v-if="videoList.length">
          <iframe class="embed-responsive-item" :src="videoUrl" allowfullscreen frameborder="0"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const YOUTUBE_API_KEY = 'AIzaSyBCNyVF3W6jLT2rmdc5du7hHM-dXJWAoPg'
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'ModalTrail',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      videoList: ''
    }
  },
  methods: {
    async searchVideo() {
      const keyword = '공식 예고편 ' + this.movie.title
      const config = {
        params: {
          part: 'snippet',
          type: 'video',
          q: keyword,
          key: YOUTUBE_API_KEY
        }
      }
      const response = await axios.get(YOUTUBE_API_URL, config)
      this.videoList = response.data.items
    },
  },
  created() {
    this.searchVideo()
  },
  computed: {
    videoUrl() {
      const videoId = this.videoList[0].id.videoId
      return `https://www.youtube.com/embed/${videoId}`
    },
  },
}
</script>

<style>

</style>