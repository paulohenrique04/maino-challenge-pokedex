<template>
    <div v-if="pokemon">
        <img :src="pokemon.sprites.back_default" alt="Pokemon">
    </div>
</template>

<script>
    import PokeService from '../api/service/PokeService';

    export default {
        data() {
            return {
                pokemon: null,
                type: null
            }
        },
        async mounted() {
            this.pokemon = await PokeService.fetchPokemon('pikachu')
            this.type = await PokeService.fetchType(3)
            console.log(this.pokemon)
        }
    }
</script>