<template>
    <div>
        <div class="header-anim">
            <div class="content"><canvas></canvas></div>
        </div>
        <div class="noise"></div>
    </div>
</template>

<script>
import noise from '../assets/js/noise.js';
export default {
mounted(){  //or other hook function
   noise() //call your function
}
}
</script>

<style scoped>

.header-anim {
    z-index: 0
}

.header-anim canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -2;
}

@media (max-width: 1023.98px) {
    .header-anim canvas {
        height: 100% !important
    }
}

.header-anim .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #232428;
    pointer-events: none
}

.noise {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: url(../assets/static.gif);
    background-repeat: repeat;
    opacity: .02;
    display: block !important;
}
</style>
