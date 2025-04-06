import { createStore } from "vuex";

export default createStore({
    state: {
        pokemons: [],
        filteredPokemons: [],
        selectedPokemon: null,
        namePokemonFilter: null,
        typePokemonFilter: null,
        idPokemonFilter: null,
        speciePokemonFilter: null,
        loading: true,
        limit: 15,
        offset: 0
    },
    mutations: {
        setPokemons(state, poks) {
            state.pokemons = poks
        },
        setFilteredPokemons(state, pokemons) {
            state.filteredPokemons = pokemons
        },
        setLoading(state, isloading) {
            state.loading = isloading
        },
        setSelectedPokemon(state, currentPokemon) {
            state.selectedPokemon = currentPokemon
        },
        setLimit(state, limit) {
            state.limit += limit
        },
        addPokemons(state, newPokemons) {
            state.pokemons = [...state.pokemons, ...newPokemons]
        },
        setNamePokemonFilter(state, filter) {
            state.namePokemonFilter = filter
        },
        setTypePokemonFilter(state, filter) {
            state.typePokemonFilter = filter
        },
        setIdPokemonFilter(state, filter) {
            state.idPokemonFilter = filter
        },
        setSpeciePokemonFilter(state, filter) {
            state.speciePokemonFilter = filter
        }
    },
    getters: {
        pokemons: (state) => state.pokemons,
        isLoading: (state) => state.loading,
        currentPokemon: (state) => state.selectedPokemon,
        nameFilter: (state) => state.namePokemonFilter,
        typeFilter: (state) => state.typePokemonFilter,
        idFilter: (state) => state.idPokemonFilter,
        specieFilter: (state) => state.speciePokemonFilter,
        limit: (state) => state.limit,
        filteredPokemons: (state) => state.filteredPokemons
    },
    actions: {

    },
    modules: {

    }
})