<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pokédex</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="handleNavBarOpen"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav" :class="{ show: isNavBarOpen }">
        <form class="d-flex flex-column flex-lg-row gap-2 w-100">
          <div class="form-group">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Nome" 
              v-model="filters.name"
            >
          </div>
          <div class="form-group">
            <input 
              type="number" 
              class="form-control" 
              placeholder="ID" 
              min="1"
              v-model="filters.id"
            >
          </div>
          <div class="form-group">
            <select class="form-control" v-model="filters.type">
              <option value="">Todos os Tipos</option>
                <option value="normal">Normal</option>
                <option value="fire">Fogo</option>
                <option value="water">Água</option>
                <option value="grass">Grama</option>
                <option value="electric">Elétrico</option>
                <option value="ice">Gelo</option>
                <option value="fighting">Lutador</option>
                <option value="poison">Venenoso</option>
                <option value="ground">Terrestre</option>
                <option value="flying">Voador</option>
                <option value="psychic">Psíquico</option>
                <option value="bug">Inseto</option>
                <option value="rock">Pedra</option>
                <option value="ghost">Fantasma</option>
                <option value="dragon">Dragão</option>
                <option value="dark">Noturno</option>
                <option value="steel">Metálico</option>
                <option value="fairy">Fada</option>
            </select>
          </div>
          <div class="form-group">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Espécie" 
              v-model="filters.species"
            >
          </div>
          <button class="btn btn-light" type="button" @click="applyFilters">
            Filtrar
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

  
<script>
  import { useStore } from 'vuex';
  import { ref } from 'vue';

  export default {
    name: "Navbar",
    setup() {
      const store = useStore()
      const isNavBarOpen = ref(false)
      const filters = {
        name: '',
        id: '',
        type: '',
        species: ''
      }

      const applyFilters = () => {
        store.commit('setNamePokemonFilter', filters.name)
        store.commit('setTypePokemonFilter', filters.type)
        store.commit('setIdPokemonFilter', filters.id.toString())
        store.commit('setSpeciePokemonFilter', filters.species)
      }

      const handleNavBarOpen = () => {
        isNavBarOpen.value = !isNavBarOpen.value
      }

      return {
        isNavBarOpen,
        handleNavBarOpen,
        filters,
        applyFilters
      }
    }
    
  };
</script>
  
<style src="../style.css"></style>