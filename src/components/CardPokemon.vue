<template>
    <div class="container mt-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div v-for="pokemon in pokemons" :key="pokemon.id" class="col">
                <div class="card h-100 shadow-sm hover-shadow" data-bs-toggle="modal" data-bs-target="#pokemonModal" @click="selectPokemon(pokemon)" style="cursor: pointer;">
                    <img :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name" class="card-img-top img-fluid p-3">
                    <div class="card-body text-center">
                        <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-center h-25">
            <div class="spinner-border text-secondary" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <ModalPokemon :pokemon="selectedPokemon" />
    </div>
</template>
  
<script>
import PokeService from '../api/service/PokeService';
import ModalPokemon from './ModalPokemon.vue';

export default {
    name: 'CardPokemon',
    components: {
        ModalPokemon
    },
    data() {
        return {
            pokemons: [],
            selectedPokemon: null,
            loading: false,
            offset: 0,
            limit: 20,
            hasMore: true
        }
    },
    async created() {
        await this.loadPokemons();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        selectPokemon(pokemon) {
            this.selectedPokemon = pokemon;
        },
        async loadPokemons() {
            if (!this.hasMore || this.loading) return;
            
            this.loading = true;
            
            try {
                const allPokemons = await PokeService.fetchAllPokemon(this.limit, this.offset);
                const newPokemons = await Promise.all(allPokemons.map(p => PokeService.fetchPokemon(p.name)));
                
                this.pokemons = [...this.pokemons, ...newPokemons];
                this.offset += this.limit;
                
                // Verifica se há mais pokémons para carregar
                this.hasMore = newPokemons.length === this.limit;
            } catch (error) {
                console.error('Error loading pokemons:', error);
            } finally {
                this.loading = false;
            }
        },
        handleScroll() {
            const scrollY = window.scrollY || window.pageYOffset;
            const visibleHeight = window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOfPage = scrollY + visibleHeight >= pageHeight - 200; 
            
            if (bottomOfPage && !this.loading && this.hasMore) {
                this.loadPokemons();
            }
        }
    }
}
</script>
  