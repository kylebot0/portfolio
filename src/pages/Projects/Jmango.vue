<template>
    <main class="projecten-container">
        <Project 
        :title="title" 
        :subTitle="subTitle" 
        :description="description" 
        :tools="tools" 
        :siteURL="siteURL"  
        :img="img"
        :imgAlt="imgAlt"   
        :development="development"   
        />
    </main>
</template>

<script>
import Project from '../../components/Project'

export default {
    components:{
        Project
    },
    data() {
        return {
            title: 'Jmango360',
            subTitle: 'The Pack',
            description: `JMango360 is gemaakt van scratch met een leeg Wordpress thema. Hierbij werden de componenten zo ingedeeld dat de klant zelf kon invullen wat hij wilde, en ook alles zelf kon plaatsen waar hij het wilde.`,
            tools: [
                {name: 'PHP'}, {name: 'Wordpress'}, {name: 'JavaScript'}, {name: 'SCSS'}, {name: 'Webpack'}
                ],
            development: [
                {name: 'Wordpress custom theme'}
            ],
            siteURL: 'https://jmango360.com/',
            img: './img/jmango360.jpg',
            imgAlt: 'Jmango360 project'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
