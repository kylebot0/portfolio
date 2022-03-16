<template>
  <section class="cv">
      <article>
            <div class="cv-container">
                <div class="cv-list">
                    <h3>Werkervaring</h3>
                    <ul>
                        <li><h4>Samsung Promotor</h4></li>
                        <li><p>Mei 2021 - Heden</p></li>

                        <li><h4>Freelancer Bot Webdevelopment</h4></li>
                        <li><p>Februari 2020 - Heden</p></li>

                        <li><h4>The Pack, Stagiaire Front-end developer </h4></li>
                        <li><p>September 2020 - Februari 2021</p></li>

                        <li><h4>Pathe Zaandam, Service employee</h4></li>
                        <li><p>November 2016 - September 2020</p></li>

                        <li><h4>Technoberg, Stagiaire Front-end developer</h4></li>
                        <li><p>Februari 2019 - Mei 2019</p></li>

                        <li><h4>Vomar, Winkelmedewerker</h4></li>
                        <li><p>Februari 2016 - November 2016</p></li>
                    </ul>
                </div>

                <div class="cv-list">
                    <h3>Diploma's</h3>
                    <ul>
                        <li><h4>Bachelor of Science, Communication & multimedia-design</h4></li>
                        <li><p>Augustus 2017 - Januari 2022</p></li>

                        <li><h4>Propedeuse, Communication & multimedia-design</h4></li>
                        <li><p>Augustus 2017 - September 2018</p></li>

                        <li><h4>Certificaat, Agressie- en overvaltraining</h4></li>
                        <li><p>Bureaucontrol 1 & 2</p></li>

                        <li><h4>Hoger Algemeen Voortgezet Onderwijs</h4></li>
                        <li><p>Augustus 2012 - Juni 2017</p></li>
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
        scrollTrigger.about() 
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/_variables.scss";

section {
    margin-top: 10%;
    margin-bottom: 10%;
}

.cv-container {
    display: grid;
    grid-template-columns: 50% 50%;
    div {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .cv-list {
        margin-top: 6%;
       h4 {
           margin: 0;
       }
       p {
           color: $txt-color-secondary;
           margin-top: 0;
           margin-bottom: 20px;
       }
    }
    ul {
        list-style-type: none;
        padding:0;
    }
}

@media (max-width: 900px) {
        .cv-container {
            grid-template-columns: 1fr;
        }
    }

</style>
