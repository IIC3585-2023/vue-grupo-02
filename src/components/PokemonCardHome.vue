<template>
  <div v-if="pokemon" class="pokemon-card">
    <div class="card" style="width: 18rem;">
      <img :src="pokemon.stats.sprites.other['official-artwork'].front_default" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.stats.name }}</h5>
        <p class="card-text">{{ pokemon.stats.id }}</p>
        <p v-for="type in pokemon.stats.types" v-bind:key="type" class="card-text"> {{ type.type.name }}</p>
        <a class="btn btn-primary" @click="goToDetails">See details</a>
      </div>
    </div>
  </div>
</template>
  
<script>
  
export default {
  name: 'PokemonCardHome',
  props: {
    pokemon: {
      type: Object,
    }
  },
  methods: {
    goToDetails() {
      this.$router.push({ name: 'pokemon', params: { id: this.pokemon.stats.id }})
    }
  }
}
</script>
<style scoped>

.card {
  min-height: 32rem;
}
.card-text {
  text-transform: capitalize;
}
.card-title {
  text-transform: capitalize;
}
</style>
  