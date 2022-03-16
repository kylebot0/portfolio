<template>
    <div>
        <section>
            <h1 >{{title}}</h1>
            <p>{{subTitle}}</p>
            <p>{{description}}</p>
            <a :href="siteURL" target="_blank" class="underline extra-bold hvr-overline-from-left">Link</a>
            
            <ul class="project-development">
                <h3>Development</h3>
                <li v-for="li in development" :key="li.name">
                    {{li.name}}
                </li>
            </ul>

            <ul class="project-tools">
                <h3>Tools</h3>
                <li v-for="tool in tools" :key="tool.name">
                    {{tool.name}}
                </li>
            </ul>
        </section>

        <section>
            <img :src="img" :alt="imgAlt" class="project-img">
        </section>
    </div>
</template>

<script>
import * as scrollTrigger from '../assets/js/scrolltrigger.js';

export default {
    props: ['title', 'subTitle', 'description', 'tools', 'siteURL', 'img','imgAlt', 'development'],
    
    mounted() {
        scrollTrigger.hero()
        scrollTrigger.project()
    }
}
</script>

<style lang="scss" scoped>
div {
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr;


    section{
        display: flex;
        justify-content:center;
        // align-items:center;
        flex-direction: column;
        a {
            margin-right: auto;
            margin-top: 30px;
            text-transform: uppercase;
        }
        p{
            font-size: 20px;
            &:first-of-type {
                font-weight: 400;
                margin-top: 0;
            }
        }
    }
    ul {
        padding: 0;
        list-style: none;
        &:first-of-type{
            margin-top: 200px;
        }
        h3 {
            font-size: 16px;
            margin:10px 0;
        }
    }
    img {
        max-width: 90%;
        margin-left: auto;
    }
    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
        img {
            max-width: 100%;
            margin-bottom: 15%;
        }
        ul{
            &:first-of-type {
                margin-top: 30px;
            }
        }
    }
    @media (max-width: 1100px) {
        height: 100%;
        
    }
}
</style>
