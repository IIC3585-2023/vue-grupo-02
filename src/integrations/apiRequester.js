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

  async getPokemonDetail(id) {
    const response = await this.PokeApiRequester.get(`/pokemon/${id}`);
    return response.data;
  }

  async getPokemonDetailByName(name) {
    const response = await this.PokeApiRequester.get(`/pokemon/${name}`);
    return response.data;
  }

  async getPokemonPages() {
    const response = await this.PokeApiRequester.get('/pokemon');
    return response.data.pages;
  }


}