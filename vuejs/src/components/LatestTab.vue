<template>
  <div class="latest-tab-area"
    :class="{ active: isActive, 
      'info': tabid == 1,
      'review' : tabid == 2,
      'trailer' : tabid == 3 }"
    :id="'latestTab' + tabid">
    <div v-if="tabid === 1">
      <div class="info-left">
        <h3 class="info-title">
          모탈 컴뱃
          <span class="info-genre">액션/스릴러</span>
        </h3>
        <div class="info-rating">
          <span class="rating-label">평점</span>
          <span class="rating-value">7/10</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur 
          Lorem ipsum dolor sit amet consectetur 
          Lorem ipsum dolor sit amet consectetur 
          Lorem ipsum dolor sit amet consectetur 
        </p>
      </div>
      <div class="info-right" style="background:url(https://t1.daumcdn.net/liveboard/holapet/a2e8408fa2fd460b95c8fded0649645f.JPG)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LatestTab',
  props: {
    tabid: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style>

.latest-tab-area {
    padding-top: 65px;
    display: none;
}

.latest-tab-area.active {
  display: block;
}

h3.info-title {
    text-align: left;
}

.info-left {padding: 30px;font-size: 16px;color: white;text-align: left;
  min-width: 800px;
  width: 80%;
  display: inline-block;
  vertical-align: top;
  height: 250px;
}

.info-right{
  width: 20%;
  min-width: 0;
  display: inline-block;
  font-size: 0;
  vertical-align: top;
  height: 250px;
  background-size: auto 100% !important;
  background-repeat: no-repeat !important;
}

h3.info-title {
    font-size: 40px;
    font-weight: 700;
    color: #6ea41b;
}

span.info-genre {
    font-size: 18px;
    color: white;
}

.info-rating {
    text-align: left;
    display: inline-block;
    border: 1px solid #DDD;
}

span.rating-label {
    border-right: 1px solid #DDD;
    padding: 0 10px;
    display: inline-block;
    background: #999;
}

span.rating-value {
    padding: 0 10px;
    display: inline-block;
}
</style>