<template>
  <div>
    <div>
      <p class="text-light">영화 평가 페이지</p>
      <EvalMovieList />
    </div>
  </div>
</template>

<script>
import EvalMovieList from '@/components/EvalMovieList'

export default {
  name: 'MovieEvaluation',
  components: {
    EvalMovieList,
  },
}
</script>

<style>

</style>