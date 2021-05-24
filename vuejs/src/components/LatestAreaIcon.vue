<template>
 <div v-if="tabid === 1" >
  <span class="iconify" data-inline="false" data-icon="ic:baseline-info" style="color: #ffd600; font-size: 51px;"></span>
 </div>
</template>

<script>
export default {
  name: 'LatestAreaIcon',
  props: {
    key: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  created : function () {
    this.key = this.$props.key
    this.text = this.$props.text
  }
}
</script>

<style>
i[data-tab-id] {
    font-size: 22px;
    margin: 0 5px;
    cursor: pointer;
}

i[data-tab-id].active {
    color: #efb738;
}
</style>