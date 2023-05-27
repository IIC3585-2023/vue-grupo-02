<template>
<div class="team-display">
	<PokemonCard v-for="(pokemon, index) in team" :key="index" :pokemon="pokemon" />
</div>
</template>

<script>

import { mapState } from 'vuex'
import PokemonCard from '@/components/PokemonCard.vue'

export default {
	name: 'TeamCard',
	components: {
			PokemonCard
	},
	computed: {
			...mapState(['team'])
	},
}
</script>

<style>

.team-display {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
}

</style>
    