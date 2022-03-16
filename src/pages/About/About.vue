<template>
  
    <main>
      <HeroAbout />
      <Cv />
    </main>
</template>

<script>
import HeroAbout from '../../components/HeroAbout.vue'
import Cv from '../../components/Cv.vue'

export default {
  name: 'About',
  components: {
    HeroAbout,
    Cv
  }
}
</script>

<style lang="scss">



</style>
