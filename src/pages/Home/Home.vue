<template>
   <main>
      <Hero />
      <Talenten />
      <Projecten />
    </main>
</template>

<script>
import Hero from '../../components/Hero.vue'
import Talenten from '../../components/Talenten.vue'
import Projecten from '../../components/Projecten.vue'

export default {
  name: 'App',
  components: {
    Hero,
    Talenten,
    Projecten
  }
}
</script>

<style lang="scss">



</style>
