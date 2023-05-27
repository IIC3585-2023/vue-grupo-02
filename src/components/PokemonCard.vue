<template>
  <div v-if="pokemon" class="pokemon-card">
    <div class="card" style="width: 18rem;">
      <img :src="pokemon.imgUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <p class="card-text">{{ pokemon.description }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>
  
<script>
  
export default {
  name: 'TeamCard',
  props: {
    pokemon: {
      type: Object,
    }
  },
}
</script>
  