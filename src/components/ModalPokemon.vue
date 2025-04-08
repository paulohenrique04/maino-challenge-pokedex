<template>
    <div class="modal fade" id="pokemonModal" tabindex="-1" aria-labelledby="pokemonModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="pokemonModalLabel">{{ selectedPokemon?.name || 'Pokémon' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedPokemon" class="row">
              <div class="col-md-6 text-center">
                <img :src="selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default" :alt="selectedPokemon.name" class="img-fluid" style="max-height: 300px;">
                <div class="mt-3">
                  <span v-for="type in selectedPokemon.types" :key="type.slot" class="badge me-2 fs-6" :class="`bg-${type.type.name}`">
                    {{ type.type.name }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <h6>Details</h6>
                  <p><strong>ID:</strong> #{{ String(selectedPokemon.id).padStart(3, '0') }}</p>
                  <p><strong>Height:</strong> {{ selectedPokemon.height / 10 }} m</p>
                  <p><strong>Weight:</strong> {{ selectedPokemon.weight / 10 }} kg</p>
                </div>
                
                <div class="mb-3">
                  <h6>Abilities</h6>
                  <ul class="list-unstyled">
                    <li v-for="ability in selectedPokemon.abilities" :key="ability.ability.name" class="text-capitalize">
                      {{ ability.ability.name }}
                    </li>
                  </ul>
                </div>
                
                <div class="mb-3">
                  <h6>Stats</h6>
                  <div v-for="stat in selectedPokemon.stats" :key="stat.stat.name" class="mb-2">
                    <div class="d-flex justify-content-between">
                      <span class="text-capitalize">{{ stat.stat.name }}:</span>
                      <span>{{ stat.base_stat }}</span>
                    </div>
                    <div class="progress" style="height: 5px;">
                      <div class="progress-bar" 
                           :class="`bg-${selectedPokemon.types[0].type.name}`"
                           role="progressbar" 
                           :style="`width: ${(stat.base_stat / 255) * 100}%`"
                           :aria-valuenow="stat.base_stat" 
                           aria-valuemin="0" 
                           aria-valuemax="255">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Seção de Sprites -->
              <div class="col-12 mt-4">
                <h6>Sprites</h6>
                <div class="row text-center">
                  <div class="col-6 col-md-3 mb-3" v-if="selectedPokemon.sprites.front_default">
                    <p>Front Default</p>
                    <img :src="selectedPokemon.sprites.front_default" class="img-fluid sprite-img">
                  </div>
                  <div class="col-6 col-md-3 mb-3" v-if="selectedPokemon.sprites.back_default">
                    <p>Back Default</p>
                    <img :src="selectedPokemon.sprites.back_default" class="img-fluid sprite-img">
                  </div>
                  <div class="col-6 col-md-3 mb-3" v-if="selectedPokemon.sprites.front_shiny">
                    <p>Front Shiny</p>
                    <img :src="selectedPokemon.sprites.front_shiny" class="img-fluid sprite-img">
                  </div>
                  <div class="col-6 col-md-3 mb-3" v-if="selectedPokemon.sprites.back_shiny">
                    <p>Back Shiny</p>
                    <img :src="selectedPokemon.sprites.back_shiny" class="img-fluid sprite-img">
                  </div>
                </div>
              </div>

              <!-- Seção de Movimentos -->
              <div class="col-12 mt-4" v-if="selectedPokemon.moves && selectedPokemon.moves.length > 0">
                <h6>Moves</h6>
                <div class="moves-container">
                  <span v-for="(move, index) in selectedPokemon.moves" :key="index" class="badge bg-secondary me-2 mb-2 text-capitalize">
                    {{ move.move.name.replace('-', ' ') }}
                  </span>
                </div>
              </div>

              <!-- Seção de Jogos -->
              <div class="col-12 mt-4" v-if="selectedPokemon.game_indices && selectedPokemon.game_indices.length > 0">
                <h6>Games Appearance</h6>
                <div class="games-container">
                  <span v-for="(game, index) in selectedPokemon.game_indices" :key="index" class="badge bg-primary me-2 mb-2 text-capitalize">
                    {{ game.version.name.replace('-', ' ') }}
                  </span>
                </div>
              </div>

              <!-- Seção de Evolução -->
              <div class="col-12 mt-4" v-if="evolutions && evolutions.length > 0"> 
                <h6>Evolution Chain</h6>
                <div class="evolution-chain">
                    <div v-for="(evolution, index) in evolutions" :key="index" class="evolution-stage">
                        <div class="evolution-pokemon">
                            <img :src="evolution.sprite" :alt="evolution.name" class="evolution-sprite">
                            <p class="text-capitalize">{{ evolution.name }}</p>
                        </div>
                        <div v-if="index < evolutions.length - 1" class="evolution-arrow">
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
    import { Modal } from 'bootstrap';
    import { mapState } from 'vuex';
    import PokeService from '../api/service/PokeService';

    export default {
        name: 'ModalPokemon',
        data() {
            return {
                evolutions: []
            }
        },
        computed: {
            ...mapState(['selectedPokemon'])
        },
        watch: {
            async selectedPokemon(pok) {
                if (pok) {
                    const modal = new Modal(document.getElementById('pokemonModal'));
                    modal.show();

                    this.fetchEvolutionChain(pok)
                }
            }
        },
        methods: {
            async fetchEvolutionChain(pok) {
                try {
                    const speciesData = await PokeService.fetchPokemonBySpecies(pok.id);
                    const evolutionChainId = speciesData.evolution_chain.url.split('/').slice(-2, -1)[0];
                    
                    const evolutionChain = await PokeService.fetchEvolutionChainPokemon(evolutionChainId);
                    this.evolutions = this.processEvolutionChain(evolutionChain.chain);
                } catch(error) {
                    console.log("Não foi possível recuperar a cadeia evolutiva", error);
                    this.evolutions = [];
                }
            },
            processEvolutionChain(chain) {
                const data = [];
                data.push({
                    name: chain.species.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/').slice(-2, -1)[0]}.png`
                });

                let currentEvolutions = chain.evolves_to; 
                while (currentEvolutions.length > 0) {
                    const evolution = currentEvolutions[0];
                    data.push({
                        name: evolution.species.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.species.url.split('/').slice(-2, -1)[0]}.png`
                    });
                    currentEvolutions = evolution.evolves_to;
                }
                return data;
            }
        }
    }
</script>
  
  <style scoped>
  .bg-grass { background-color: #78c850; }
  .bg-poison { background-color: #a040a0; }
  .bg-fire { background-color: #f08030; }
  .bg-flying { background-color: #a890f0; }
  .bg-water { background-color: #6890f0; }
  .bg-bug { background-color: #a8b820; }
  .bg-normal { background-color: #a8a878; }
  .bg-electric { background-color: #f8d030; }
  .bg-ground { background-color: #e0c068; }
  .bg-fairy { background-color: #ee99ac; }
  .bg-fighting { background-color: #c03028; }
  .bg-psychic { background-color: #f85888; }
  .bg-rock { background-color: #b8a038; }
  .bg-ghost { background-color: #705898; }
  .bg-ice { background-color: #98d8d8; }
  .bg-dragon { background-color: #7038f8; }
  .bg-dark { background-color: #705848; }
  .bg-steel { background-color: #b8b8d0; }

  .evolution-chain {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .evolution-stage {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .evolution-pokemon {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .evolution-sprite {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .evolution-name {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-align: center;
  }

  .evolution-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .evolution-condition {
    font-size: 0.7rem;
    text-align: center;
    max-width: 100px;
  }
  </style>