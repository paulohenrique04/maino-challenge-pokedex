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
              <option value="">{{ $t('allTypes') }}</option>
              <option value="normal">{{ $t('normal') }}</option>
              <option value="fire">{{ $t('fire') }}</option>
              <option value="water">{{ $t('water') }}</option>
              <option value="grass">{{ $t('grass') }}</option>
              <option value="electric">{{ $t('electric') }}</option>
              <option value="ice">{{ $t('ice') }}</option>
              <option value="fighting">{{ $t('fighting') }}</option>
              <option value="poison">{{ $t('poison') }}</option>
              <option value="ground">{{ $t('ground') }}</option>
              <option value="flying">{{ $t('flying') }}</option>
              <option value="psychic">{{ $t('psychic') }}</option>
              <option value="bug">{{ $t('bug') }}</option>
              <option value="rock">{{ $t('rock') }}</option>
              <option value="ghost">{{ $t('ghost') }}</option>
              <option value="dragon">{{ $t('dragon') }}</option>
              <option value="dark">{{ $t('dark') }}</option>
              <option value="steel">{{ $t('steel') }}</option>
              <option value="fairy">{{ $t('fairy') }}</option>
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
        locale
      }
    }
    
  };
</script>
  
<style src="../style.css"></style>