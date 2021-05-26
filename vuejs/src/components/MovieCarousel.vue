<template>
  <div class="thumb-example">
    <!-- swiper1 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide>
        <a href="#">
          <img src="https://caching2.lottecinema.co.kr/lotte_image/2021/Spiral/0520/Spiral_1920774.jpg" data-video="https://caching2.lottecinema.co.kr/lotte_image/2021/Spiral/0511/Spiral_1280720.mp4" alt="국내 박스오피스 1위 스파이럴 절찬상영중청소년관람불가">
        </a>
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
</script>

<style lang="scss" scoped>
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
      height: 100%;
      width: 100%;
    }
    &.gallery-thumbs {
      height: 250px;
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
    height: 70%;
    object-fit: contain;
  }

  img.gallery-thumbs-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>