<template>
    <div class="modal fade" id="pokemonModal" tabindex="-1" aria-labelledby="pokemonModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="pokemonModalLabel">{{ pokemon?.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body text-center">
            <img v-if="pokemon" :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name" class="img-fluid mb-3" style="max-height: 200px;">
            <p v-if="pokemon">ID: {{ pokemon.id }}</p>
            <!-- Adicione mais dados -->
            </div>
        </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: 'ModalPokemon',
        props: {
            pokemon: {
                type: Object,
                required: false
            }
        }
    }
</script>
  