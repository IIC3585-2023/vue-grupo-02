<template>
  <div v-if="pokemon.name" class="pokemon-card">
    <div class="card" style="width: 10rem;">
      <img :src="pokemon.imgURL" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <a class="btn btn-danger" @click="select">Replace</a>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card" style="width: 10rem;">
      <div class="card-body">
        <a class="btn btn-success" @click="select">+</a>
      </div>
    </div>
  </div>
</template>
  
<script>
  
export default {
  name: 'TeamCard',
  props: {
    index: {
      type: Number,
    },
    pokemon: {
      type: Object,
    }
  },
  methods: {
    select() {
      this.$emit('select', this.index)
    }
  }
}
</script>
 
<style scoped>

.card-title {
  text-transform: capitalize;
}
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

</style>
