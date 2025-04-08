import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2/'

export default class PokeApi {
    static async getPokemon(nameOrId) {
        return axios.get(`${BASE_URL}pokemon/${nameOrId}`)
    }

    static async getPokemonBySpecie(nameOrId) {
        return axios.get(`${BASE_URL}pokemon-species/${nameOrId}`)
    }

    static async getPokemonByType(idType) {
        return axios.get(`${BASE_URL}type/${idType}`)
    }

    static async getAllPokemons(limit = 20, offset = 0) {
        return axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`)
    }

    static async getEvolutionChainPokemon(id) {
        return axios.get(`${BASE_URL}evolution-chain/${id}/`)
    }
}

