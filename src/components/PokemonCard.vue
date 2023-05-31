<template>
  <div v-if="pokemon.name" class="pokemon-card">
    <div class="card" style="width: 18rem;">
      <img :src="pokemon.imgURL" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <p class="card-text">{{ pokemon.description }}</p>
        <a class="btn btn-primary" @click="goToDetails">See details</a>
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
  methods: {
    goToDetails() {
      this.$router.push({ name: 'pokemon', params: { id: this.pokemon.id }})
    }
  }
}
</script>

<style scoped>

.card-title {
  text-transform: capitalize;
}

.card-text {
  height: 7rem;
}

</style>
  