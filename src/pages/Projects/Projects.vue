<template>
  
    <main>
      <Projecten />
    </main>
</template>

<script>
import Projecten from '../../components/Projecten.vue'
import * as scrollTrigger from '../../assets/js/scrolltrigger.js';

export default {
  name: 'App',
  components: {
    Projecten,
  },
  mounted() {
    scrollTrigger.hero()
    scrollTrigger.project()
  }
}
</script>

<style lang="scss">

</style>
