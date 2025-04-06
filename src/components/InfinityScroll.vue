<template>
  <div class="main">
    <CardPokemon />
  </div>
</template>
  
<script>
  import CardPokemon from './CardPokemon.vue';

  export default {
    name: 'InfinityScroll',
    components: { 
      CardPokemon
    }
  };
</script>
  