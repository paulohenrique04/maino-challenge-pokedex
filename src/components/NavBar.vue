<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pokédex</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
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
              <input 
                type="text" 
                class="form-control" 
                placeholder="Tipo" 
                v-model="filters.type"
              >
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

  export default {
    name: "Navbar",
    setup() {
      const store = useStore()
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

      return {
        filters,
        applyFilters
      }
    }
    
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .form-group {
    min-width: 120px;
  }
  
  .btn {
    white-space: nowrap;
  }
  
  @media (max-width: 991.98px) {
    .form-group {
      width: 100%;
    }
  }
  </style>