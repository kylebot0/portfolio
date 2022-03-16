<template>
  <footer>
    <div class="footer-info">
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

    <div class="footer-cta">
        <h2>Neem contact op</h2>
         <router-link to="/contact" class="underline extra-bold hvr-overline-from-left">Contact</router-link>
    </div>
  </footer>
</template>

<script>
import * as scrollTrigger from '../assets/js/scrolltrigger.js';

export default {
    mounted(){  
        scrollTrigger.scrollTo() 
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
footer {
    padding-top: 10vh;
    padding-bottom: 10vh;
    background: rgba(255,255,255,0.02);
    display: flex;
    line-height: 1;
    .footer-cta {
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
      .footer-cta {
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
