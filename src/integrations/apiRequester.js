import axios from 'axios';
export class PokeApiRequester {
  constructor() {
    this.PokeApiRequester = axios.create({
        baseURL: 'https://pokeapi.co/api/v2'
    });
  }

  async getPokemons() {
    const response = await this.PokeApiRequester.get('/pokemon');
    return response.data.results;
  }

  async getPokemonDetails(id) {
    try {
      const statsResponse = await this.PokeApiRequester.get(`/pokemon/${id}`);
      const descriptionResponse = await this.PokeApiRequester.get(`/pokemon-species/${id}`);
      const response = {
        stats: statsResponse.data,
        description: descriptionResponse.data
      }
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getPokemonPages() {
    const response = await this.PokeApiRequester.get('/pokemon');
    return response.data.pages;
  }


}