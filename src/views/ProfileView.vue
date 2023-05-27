<template>
	<div class="profile">
		<h1>Profile</h1>
		<div>
			<TeamDisplay/>
		</div>
	</div>
</template>

<script>

import TeamDisplay from '@/components/TeamDisplay.vue';
import { mapState } from 'vuex'

export default {
	name: 'ProfileView',
	components: {
		TeamDisplay
	},
	computed: {
		...mapState(['user'])
	},
}
</script>
  