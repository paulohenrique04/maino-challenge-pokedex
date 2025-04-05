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
                v-model="filters.id"
                min="1"
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
  export default {
    name: "Navbar",
    data() {
      return {
        filters: {
          name: '',
          id: '',
          type: '',
          species: ''
        }
      };
    },
    methods: {
      applyFilters() {
        this.$emit('filter', this.filters);
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