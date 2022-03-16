<template>
  <section class="hero">
      <article>
        <h1>Kyle Bot front-end developer</h1>
        <p>Ik ben een rustige, relaxte vent die niet lui is om te werken. Ik ben thuiswonend, heb een leuke vriendin en zoek ook
                    graag mijn vrienden op. Ik ben erg sociaal in de omgang en vind het leuk om met anderen te werken en te helpen. Thuis
                    speel ik graag een game, zit achter de computer en luister een goed stukje muziek of kijk een leuke film.</p>
      </article>
      <svg class="arrows">
        <path class="a1" d="M0 0 L30 32 L60 0"></path>
        <path class="a2" d="M0 20 L30 52 L60 20"></path>
        <path class="a3" d="M0 40 L30 72 L60 40"></path>
    </svg>
  </section>
</template>

<script>
import * as scrollTrigger from '../assets/js/scrolltrigger.js';

export default {
mounted(){  
   scrollTrigger.hero() 
}
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
h1 {
    margin: 0;
}
.hero {
    min-height: 90vh;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

}
p {
    font-size: 35px;
    line-height: 1.4;
    font-weight: 400;
    margin-bottom: 10%;
    max-width: 80%;
}

@media (max-width: 600px) {
  h1 {
    margin-top: 10vh;
  }
      p {
        font-size: 24px;
        max-width: 100%;
      }
      .arrows {
        display: none;
      }
    }

// ------------ Scroll down
.arrows {
width: 60px;
height: 72px;
position: absolute;
left: 95%;
margin-left: -30px;
bottom: 50px;
}

.arrows path {
stroke: $txt-color;
fill: transparent;
stroke-width: 1px;
animation: arrow 2s infinite;
-webkit-animation: arrow 2s infinite; 
}

@keyframes arrow
{
0% {opacity:0}
40% {opacity:1}
80% {opacity:0}
100% {opacity:0}
}

@-webkit-keyframes arrow 
{
0% {opacity:0}
40% {opacity:1}
80% {opacity:0}
100% {opacity:0}
}

.arrows path.a1 {
animation-delay:-1s;
-webkit-animation-delay:-1s; 
}

.arrows path.a2 {
animation-delay:-0.5s;
-webkit-animation-delay:-0.5s; 
}

.arrows path.a3 {
animation-delay:0s;
-webkit-animation-delay:0s; 
}

</style>
