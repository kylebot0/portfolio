<template>
    <div>
        <Background />
        <MainHeader />
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <Footer  v-if="isContact"/>
    </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import Background from './components/Background.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    Background,
    Footer
  },
  computed: {
  isContact() {
     return this.$route.path !== '/contact'
  },
  mounted() {
    // window.onbeforeunload = function () {
    //   window.scrollTo(0, 0);
    // }
  }
}
}
</script>

<style lang="scss">
@import "./assets/scss/_variables.scss";
@import "./assets/scss/main.scss";

</style>