<template>
  <section class="projecten">
    <h2>Projecten</h2>
    <article>
        <div class="slider">
            <div class="inner-container">
                <div class="slider__wrraper flex-column">
                <div class="flex-column slider__content">
                <img class="slider__img" src="" alt="" />
                <div class="slider__context flex-column">
                    <h3 class="slider__opdrachtgever"></h3>
                    <p class="slider__description"></p>
                    <p class="slider__techniek"></p>
                </div>
                </div>
                <div class="slider__footer">
                    <div class="slider__btns justify-between">
                    <a href="" class="underline extra-bold hvr-overline-from-left">Meer informatie</a>
                    <div class="flex-center">
                        <button
                        data-type="prev"
                        class="slider__btn-switch slider__btn-switch--dark flex-center"
                        ></button>
                        <button
                        data-type="next"
                        class="slider__btn-switch slider__btn-switch--light flex-center"
                        ></button>
                    </div>
                    </div>
                    <div class="slider__index"></div>
                </div>
                </div>
            </div>
        </div>
    </article>
  </section>
</template>

<script>
import * as scrollTrigger from '../assets/js/scrolltrigger.js';

export default {
    mounted() {
        scrollTrigger.slider()
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
section {
    margin-top: 20%;
    margin-bottom: 20%;
}

.projecten {
    h2 {
        margin-bottom: 150px;
    }
    article {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        color: $slider-primary;
    }
   
}


</style>
