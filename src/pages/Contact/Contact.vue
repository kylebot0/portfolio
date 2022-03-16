<template>
  <main>
    <section>
      <div class="contact-info">
          <h2>Contact</h2>
          <div class="contact-naam"> 
              <p class="bold">Kyle Bot</p>
              <small><p>Front-end developer</p>
              <p>Web designer</p>
              <p>Bot webdevelopment</p></small>
          </div>
          
          <div class="contact-informatie">
              <a class="hvr-underline-from-center" href="tel:+31-6-373-412-09">+31 6 373 412 09</a>
              <a class="hvr-underline-from-center" href = "mailto: kylebot07@gmail.com">kylebot07@gmail.com</a>
              <small><p>© Kyle Bot | Front-end development | Bot webdevelopment</p></small>
          </div>
      </div>
      <div class="contact-cta">
        <h2>Neem contact op</h2>
         <a href="https://api.whatsapp.com/send?phone=+31637341209" target="_blank" class="underline extra-bold hvr-overline-from-left">Whatsapp</a>
      </div>
    </section>
  </main>
</template>

<script>
import * as scrollTrigger from '../../assets/js/scrolltrigger.js';

export default {
    mounted() {
        scrollTrigger.contact()
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
section {
    height: 70vh;
    margin-top: 20vh;
    display: flex;
    align-items: center;
    line-height: 1;
    // justify-content: center;
    .contact-info {
        min-height:70%;
    }
    .contact-cta {
        min-height:70%;
        margin-left: 15%;
        a {
            padding:8px;
            font-size: 32px;
        }
    }
    h2 {
        margin-bottom: 50px;
    }
    @media (max-width: 600px) {
      flex-direction: column;
      .contact-cta {
          margin-left: 0;
          margin-top: 15%;
          a {
              margin-bottom: 40px;
          }
      }
      .contact-informatie {
          p{
              margin-top: 20px;
          }
      }
    }
}

.contact-informatie {
    margin-top: 30px;
    display:flex;
    flex-direction: column;
    a {
        text-decoration: none;
        color: $txt-color;
        line-height: 1.5;
        margin-right: auto;
    }
    p {
        margin-top: 100px;
    }
}
</style>
