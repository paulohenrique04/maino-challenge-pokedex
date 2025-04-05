import PokeApi from "../PokeApi";

export default class PokeService {
    static async fetchPokemon(nameOrId) {
        const response = await PokeApi.getPokemon(nameOrId)
        return response.data
    }

    static async fetchPokemonBySpecies(nameOrId) {
        const response = await PokeApi.getPokemonBySpecie(nameOrId)
        return response.data
    }

    static async fetchType(id) {
        const response = await PokeApi.getPokemonByType(id);
        return response.data;
    }
    
    static async fetchAllPokemon(limit = 20, offset = 0) {
        const response = await PokeApi.getAllPokemons(limit, offset);
        return response.data.results;
    }
}