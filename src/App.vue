<script setup>
  import NavBar from './components/NavBar.vue';
  import CardPokemon from './components/CardPokemon.vue';
</script>

<template>
  <div id="app-container" class="d-flex flex-column" style="height: 100vh; overflow-y: auto;">
    <NavBar/>
    <CardPokemon />
  </div>
</template>