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
            title: 'Nobillon',
            subTitle: 'The Pack',
            description: 'Nobillon is gemaakt van scratch met een leeg Wordpress thema. Hierbij werden de componenten zo ingedeeld dat de klant zelf kon invullen wat hij wilde, en ook alles zelf kon plaatsen waar hij het wilde.',
            tools: [
                {name: 'PHP'}, {name: 'Wordpress'}, {name: 'JavaScript'}, {name: 'SCSS'}, {name: 'Webpack'}
                ],
            development: [
                {name: 'Wordpress custom theme'}
            ],
            siteURL: 'https://www.nobillon.nl/',
            img: './img/nobillon.png',
            imgAlt: 'Nobillon project'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
