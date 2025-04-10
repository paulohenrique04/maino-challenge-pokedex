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
              :placeholder="$t('name')" 
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
              <option value="">{{ $t('types.allTypes') }}</option>
              <option v-for="type in pokemonTypes" :key="type.value" :value="type.value">
                {{ $t(`types.${type.value}`) }}
              </option>
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
            {{ $t('filter') }}
          </button>
        </form>

        <div class="ms-lg-3 mt-2 mt-lg-0">
          <select class="form-select" v-model="$i18n.locale">
            <option value="pt-BR">Português (BR)</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

  
<script>
  import { useStore } from 'vuex';
  import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

  export default {
    name: "Navbar",
    setup() {
      const { t, locale } = useI18n
      const pokemonTypes = [
        { value: "normal"},
        { value:"fire" },
        { value:"water" },
        { value:"grass" },
        { value:"electric" },
        { value:"ice" },
        { value:"fighting" },
        { value:"poison" },
        { value:"ground" },
        { value:"flying" },
        { value:"psychic" },
        { value:"bug" },
        { value:"rock" },
        { value:"ghost" },
        { value:"dragon" },
        { value:"dark" },
        { value:"steel" },
        { value:"fairy" },
      ]
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
        applyFilters,
        t,
        locale,
        pokemonTypes
      }
    }
    
  };
</script>
  
<style src="../style.css"></style>