<template>
	<div v-if="pokemon" class="pokemon-view">
		<div class="container-header">
			<h1>{{ pokemon.stats.name }}</h1>
			<h1>N°{{ pokemon.stats.id }}</h1>
		</div>
		<div class="container-body">
				<div class="card img-card">
						<img :src="getImgUrl()" :alt="identifier">
				</div>
				<div class="details-container">
					<div class="description-container">
						{{ getDescription() }}
					</div>
					<div class="card physical-details-container">
						<div class="col">
							<div class="attribute-title">
								Height
							</div>
							<div class="attribute-value">
								{{ getHeight() }} M
							</div>
							<div class="attribute-title">
								Weight
							</div>
							<div class="attribute-value">
								{{ getWeight() }} Kg
							</div>
						</div>
						<div class="col">
							<div class="attribute-title">
								Category
							</div>
							<div class="attribute-value">
								{{ getCategory() }}
							</div>
							<div class="attribute-title">
								Ability
							</div>
							<div class="attribute-value">
								{{ getAbility() }}
							</div>
						</div>
					</div>
				</div>
		</div>
		<div class="container-body">
			<div class="btn btn-primary" @click="showTeamModal"> Add to team</div>
		</div>
		<TeamModal :show="showModal" @close="closeTeamModal" @select="addPokemon"/>
	</div>
	<div v-else class="pokemon-view">
		<div class="container-header">
			<h1>Pokemon not Found</h1>
		</div>
		<img src="https://img.pokemondb.net/artwork/large/psyduck.jpg" alt="404" class="img-404">

	</div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import { PokeApiRequester } from '@/integrations/apiRequester';
import TeamModal from '@/components/TeamModal.vue';

export default {
	name: 'PokemonView',
		components: {
			TeamModal
		},
		props: {
			identifier: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				pokemon: null,
				showModal: false
			}
		},
		methods: {
			...mapMutations(['setLoading', 'addToTeam']),
			getImgUrl() {
					return this.pokemon.stats.sprites.other['official-artwork'].front_default;
			},
			getDescription() {
					return this.pokemon.description.flavor_text_entries.find((entry) => entry.language.name === 'en').flavor_text;
			},
			getAbility() {
					return this.pokemon.stats.abilities.find((ability) => ability.is_hidden === false).ability.name;
			},
			getCategory() {
					return this.pokemon.description.genera.find((genus) => genus.language.name === 'en').genus;
			},
			getHeight() {
					return this.pokemon.stats.height / 10;
			},
			getWeight() {
					return this.pokemon.stats.weight / 10;
			},
			showTeamModal() {
					this.showModal = true;
			},
			closeTeamModal() {
					this.showModal = false;
			},
			addPokemon(index) {
					this.addToTeam({ index, pokemon: this.pokemon });
			}
		},
		computed: {
		...mapState(['user', 'team'])
		},
		async mounted() {
			this.setLoading(true);
			const requester = new PokeApiRequester();
			const pokemon = await requester.getPokemonDetails(this.identifier);
			this.pokemon = pokemon;
			this.setLoading(false);
		},
}
</script>

<style>

.pokemon-view {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	width: 100%;
}

.container-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	width: 100%;
	text-transform: capitalize;
}

.container-body {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 50%;
}

.img-card {
		width: 44%;
}

.details-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 50%;
}

.description-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 100%;
	font-size: 1.2rem;
	text-align: justify;
}

.physical-details-container {
	padding: 1rem;
	border-radius: 20px !important;
	background-color: rgba(33,37,41,1) !important;
	color: white !important;
	display: flex !important;
	flex-direction: row !important;
	align-items: top !important;
	width: 100%;
}

.col {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.attribute-title {
	font-weight: bold;
	font-size: 1.1rem;
}

.attribute-value {
	height: 2.5rem;
}

.img-404 {
	width: 20%;	
}

@media screen and (max-width: 991px) {
	.container-body {
		flex-direction: column;
		width: 100%;
	}

	.img-card {
		width: 90%;
	}

	.details-container {
		width: 90%;
	}


}

</style>
  