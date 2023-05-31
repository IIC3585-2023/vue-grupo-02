<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      <PokemonCardApi v-for="pokemon in pokemons" v-bind:key="pokemon.id" :pokemon="pokemon"/>
    </div>
  </div>
</template>

<script>
import PokemonCardApi from '@/components/PokemonCardApi.vue';
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
      const pokemons = await apiRequester.getPokemons();
      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const pokemonData = await apiRequester.getPokemonDetails(pokemon.name);
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
    PokemonCardApi,
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
