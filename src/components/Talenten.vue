<template>
  <section class="talenten">
      <article>
            <h2>Gespecialiseerd in</h2>
            <div class="talenten-container">
                <div>
                    <p>Tijdens mijn development carrière heb ik met verschillende technieken gewerkt. Hetgeen waar ik heb meest in gespecialiseerd ben is vooral custom wordpress thema's en vanilla JavaScript.
                        <br><br>
                        In mijn vrije tijd en schoolcarrière heb ik mij vooral bezig gehouden met D3.JS, Vue en React. Deze frameworks zijn natuurlijk enorm groot en valt hierin nog altijd iets te verbeteren.
                    </p>
                    <router-link to="/about" class="underline extra-bold hvr-overline-from-left">Meer over mij</router-link>
                </div>

                <div class="talenten-list">
                    <h3>Wat ik maak</h3>
                    <ul>
                        <li>Webdesign</li>
                        <li>Web development</li>
                        <li>UI / UX</li>
                        <li>Wordpress custom themes</li>
                    </ul>
                </div>

                <div class="talenten-list">
                    <h3>Technieken</h3>
                    <ul>
                        <li>HTML / CSS</li>
                        <li>SASS / SCSS</li>
                        <li>JavaScript</li>
                        <li>Vue</li>
                        <li>D3.JS</li>
                        <li>PHP</li>
                        <li>Git</li>
                    </ul>
                </div>

            </div>
      </article>
  </section>
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
section {
    margin-top: 10%;
    margin-bottom: 10%;
}

.talenten-container {
    display: grid;
    grid-template-columns: 50% 1fr 1fr;
    div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: auto;
        a {
            text-transform: uppercase;
            margin-top: 30px;
            margin-right: auto;
            padding: 7px 0;
            position: relative;
        }
    }
    .talenten-list {
        margin-top: 6%;
       h3 {
           margin-top: 0;
           margin-bottom: 10px;
       }
    }
    ul {
        list-style-type: none;
        padding:0;
        li {
            margin-bottom: 5px;
        }
    }
    @media (max-width: 600px) {
        grid-template-columns: 100%;
        grid-template-rows: 1fr 1fr 1fr;
        div {
            margin-left: 0;
        }
    }
}

</style>
