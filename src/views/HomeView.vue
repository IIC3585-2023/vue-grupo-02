<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Home</h1>
    <div>
      <PokemonCard v-for="pokemon in pokemons" v-bind:key="pokemon.id" :pokemon="pokemon"/>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCardApi.vue';
import {PokeApiRequester} from '@/integrations/apiRequester.js';


export default {
  data() {
    return {
      pokemons: [],
    }
  },
  methods: {
    async getPokemons() {
      const apiRequester = new PokeApiRequester();
      var pokemons = await apiRequester.getPokemons();
      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const pokemonData = await apiRequester.getPokemonDetailByName(pokemon.name);
        pokemons[i] = pokemonData;
      }
      this.pokemons = pokemons;
    }
  },
  mounted() {
    this.getPokemons();
  },
  name: 'HomeView',
  components: {
    PokemonCard,
  }
}
</script>

<style scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
