<template>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2>예고편</h2>

      <div class="video container embed-responsive embed-responsive-16by9" v-if="video">
        <iframe :src="videoUrl" frameborder="0"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
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
  computed: {
    async searchVideo() {
      const keyword = '공식 예고편' + this.movie.title
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

    thumbUrl() {
      return this.videoList[0].snippet.thumbnails.medium.url
    },
    videoUrl() {
      const videoId = this.videoList[0].id.videoId
      return `https://www.youtube.com/embed/${videoId}`
    },
  },
}
</script>

<style>

</style>