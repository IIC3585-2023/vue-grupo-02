<template>
  <div class="home">
    <h1>Pokemons</h1>
    <div id="Cards">
      <PokemonCardHome v-for="pokemon in pokemons" v-bind:key="pokemon.id" :pokemon="pokemon"/>
    </div>
    <footer>
    <PagingDisplay :page="this.page" :maxPages="this.maxPages" @next-page="nextPage" @previous-page="previousPage"/>
  </footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import PokemonCardHome from '@/components/PokemonCardHome.vue';
import {PokeApiRequester} from '@/integrations/apiRequester.js';
import PagingDisplay from '@/components/PagingDisplay.vue';


export default {
  data() {
    return {
      pokemons: [],
      page: 1,
      maxPages: 51,
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    async getPokemonPages() {
      this.setLoading(true);
      const apiRequester = new PokeApiRequester();
      const actualPage = this.page;
      const pokemons = await apiRequester.getPokemonPages(actualPage);
      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const pokemonData = await apiRequester.getPokemonDetails(pokemon.name);
        pokemons[i] = pokemonData;
      }
      this.pokemons = pokemons;
      this.setLoading(false);
    },
    nextPage() {
        this.page++;
      },
    previousPage() {
        this.page--;
      }
  },
  mounted() {
    this.getPokemonPages();
  },
  name: 'HomeView',
  components: {
    PokemonCardHome,
    PagingDisplay,
  },
  watch: {
    async page() {
      this.getPokemonPages();
    }
  }

}
</script>

<style scoped>

.h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#Cards {
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
  justify-content: center;
}

</style>
