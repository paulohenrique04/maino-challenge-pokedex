<template>
    <div class="container-fluid mt-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="col">
                <div class="card h-100 shadow-sm hover-shadow" data-bs-toggle="modal" @click="selectPokemon(pokemon)" style="cursor: pointer;">
                    <img :src="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default" :alt="pokemon.name" class="card-img-top img-fluid p-3" style="height: 150px; object-fit: contain;">
                    <div class="card-body text-center">
                        <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
                        <p class="text-muted">#{{ String(pokemon.id).padStart(3, '0') }}</p>
                        <div>
                            <span v-for="type in pokemon.types" :key="type.slot" class="badge me-1" :class="`bg-${type.type.name}`">
                                {{ type.type.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div ref="sentinela" class="d-flex justify-content-center my-4">
                <div v-if="loading && !allPokemonsLoaded" class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <ModalPokemon/>
    </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PokeService from '../api/service/PokeService';
import { useStore } from 'vuex';
import ModalPokemon from './ModalPokemon.vue';

export default {
    components: {
        ModalPokemon
    },
    setup() {
        const store = useStore();
        const allPokemonsLoaded = ref(false);
        const isLoadingMore = ref(false);
        const sentinela = ref(null);

        const loadPokemons = async (limit, offset = 0) => {
            try {
                store.commit('setLoading', true);
                const allPokemons = await PokeService.fetchAllPokemon(limit, offset);
                
                if (allPokemons.length < limit) {
                    allPokemonsLoaded.value = true;
                }

                const allPokemonsInfo = await Promise.all(allPokemons.map(p => PokeService.fetchPokemon(p.name)));
                store.commit('addPokemons', allPokemonsInfo);
            } catch(error) {
                console.error("Erro ao carregar pokémons da API", error);
            } finally {
                store.commit('setLoading', false);
                isLoadingMore.value = false;
            }
        };

        const loadMorePokemons = async () => {
            if (isLoadingMore.value || allPokemonsLoaded.value) return;
            
            isLoadingMore.value = true;
            const currentCount = store.getters.pokemons.length;
            await loadPokemons(store.getters.limit, currentCount);
        };

        onMounted(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !isLoadingMore.value && !allPokemonsLoaded.value) {
                        loadMorePokemons();
                    }
                },
                { threshold: 0.1 }
            );

            if (sentinela.value) {
                observer.observe(sentinela.value);
            }

            onUnmounted(() => {
                if (sentinela.value) {
                    observer.unobserve(sentinela.value);
                }
            });
        });

        const filteredPokemons = computed(() => {
            const allPokemons = store.getters.pokemons;

            return allPokemons.filter(p => {
                const nameFilter = !store.state.namePokemonFilter || new RegExp(store.state.namePokemonFilter, 'i').test(p.name);
                const idFilter = !store.state.idPokemonFilter || store.state.idPokemonFilter === p.id.toString();
                const typeFilter = !store.state.typePokemonFilter || p.types.some(type => type.type.name === store.state.typePokemonFilter);
                const speciesFilter = !store.state.speciePokemonFilter || p.species.name === store.state.speciePokemonFilter;

                return nameFilter && idFilter && typeFilter && speciesFilter;
            });
        });

        const selectPokemon = (pok) => {
            store.commit('setSelectedPokemon', pok);
        };

        return {
            filteredPokemons,
            selectedPokemon: computed(() => store.getters.selectedPokemon),
            loading: computed(() => store.getters.isLoading),
            allPokemonsLoaded,
            sentinela,
            selectPokemon
        };
    }
};
</script>

<style src="../style.css"></style>