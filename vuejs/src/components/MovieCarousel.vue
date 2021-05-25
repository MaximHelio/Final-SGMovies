<template>
  <div class="thumb-example">
    <!-- swiper1 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide v-for="movie in GetBestMovieList" :key="movie.pk">
        <img class="w-100 gallery-top-image" :src="movie.poster">
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs 밑에 있는  -->
    <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
      <swiper-slide v-for="movie in GetBestMovieList" :key="movie.pk">
        <img class="gallery-thumbs-image" :src="movie.poster">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-thumbs-gallery',
    title: 'Thumbs gallery with Two-way control',
    components: {
      Swiper,
      SwiperSlide
    },
    computed: {
      GetBestMovieList(){
        return this.$store.getters.getBestMovieList
      }
    },
    data() {
      return {
        swiperOptionTop: {
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          loop: true,
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$swiper
        const swiperThumbs = this.$refs.swiperThumbs.$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
  }
  console.log("ZZZ")
  console.log(this)
</script>

<style lang="scss" scoped>
  .thumb-example {
    height: 480px;
  }

  .swiper {
    .swiper-slide {
      background-size: cover;
      background-position: center;

      &.slide-1 {
        background-image:url('/images/example/1.jpg');
      }
      &.slide-2 {
        background-image:url('/images/example/2.jpg');
      }
      &.slide-3 {
        background-image:url('/images/example/4.jpg');
      }
      &.slide-4 {
        background-image:url('/images/example/5.jpg');
      }
      &.slide-5 {
        background-image:url('/images/example/6.jpg');
      }
    }

    &.gallery-top {
      height: 70%;
      width: 100%;
    }
    &.gallery-thumbs {
      height: 30%;
      box-sizing: border-box;
    }
    &.gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    &.gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
  }

  img.gallery-top-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img.gallery-thumbs-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>