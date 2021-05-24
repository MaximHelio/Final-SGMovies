<template>
  <div class="latest-area">
    <div class="latest-icon-area">
      <LatestAreaIcon class="active" :key="1" :text="Info" />
      <LatestAreaIcon :key="2" :text="Review" />
      <LatestAreaIcon :key="3" :text="Trailer" />
    </div>
    <LatestTab class="active" :tabid="1"/>
    <LatestTab :tabid="2"/>
    <LatestTab :tabid="3"/>
  </div>
</template>

<script>
import LatestAreaIcon from '@/components/LatestAreaIcon'
import LatestTab from '@/components/LatestTab'

export default {
  name: 'LatestArea',
  components: {
    LatestAreaIcon,
    LatestTab,
  },
}
</script>

<style scoped>
.latest-icon-area {
    text-align: left;
    padding: 20px 30px;
    position: absolute;
}

.latest-area {
    border-bottom: 1px solid #333;
    padding-bottom: 30px;
    display: none;
}

.latest-area.active {
  display: block;
}
</style>