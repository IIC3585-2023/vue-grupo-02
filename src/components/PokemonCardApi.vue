<template>
  <div v-if="pokemon" class="pokemon-card">
    <div class="card" style="width: 18rem;">
      <img :src="pokemon.sprites.front_default" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <p class="card-text">{{ pokemon.id }}</p>
        <p class="card-text">{{ pokemon.height }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>
  
<script>
  
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
    }
  },
}
</script>
  