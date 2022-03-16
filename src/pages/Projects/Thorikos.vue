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
            title: 'Thorikos',
            subTitle: 'Universiteit van Utrecht',
            description: 'Bij thorikos was het de uitdaging om in samenwerking met meerdere europese partners een kaart met een grid op te stellen, waarbij de Universiteit van Utrecht alle archeologische vondsten op kon plotten.',
            tools: [
                {name: 'D3.js'}, {name: 'Mapbox'}, {name: 'Vanilla JS'}, {name: 'SCSS'}
                ],
            development: [
                {name: 'Vanilla'}
            ],
            siteURL: 'https://kylebot0.github.io/Project_thorikos/src/index.html',
            img: './img/thorikos_beeld.png',
            imgAlt: 'Thorikos project'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
