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
            title: 'FoxFit',
            subTitle: 'GainPlay Studios',
            description: `Het Foxfit-platform is een mobiele applicatie voor kinderen en een website voor zorgbegeleiders die als doel heeft kinderen met astma te behandelen door ze te motiveren en te ondersteunen om meer te bewegen. Foxfit is onderdeel van het SIMBA-onderzoek en voert momenteel een pilot uit.
Astma behandelen met Foxfit werkt met een inspanningsmonitor om kinderen met astma te helpen bij het plannen en daadwerkelijk uitvoeren van hun bewegingsactiviteiten. Ontwikkeld door GainPlay Studio in nauwe samenwerking met de Hogeschool van Amsterdam.`,
            tools: [
                {name: 'D3.js'}, {name: 'Node.js'}, {name: 'SCSS'}
                ],
            development: [
                {name: 'Node.js'}
            ],
            siteURL: 'https://github.com/kylebot0/foxfit',
            img: './img/foxfit.png',
            imgAlt: 'Foxfit project'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
