<template>
    <div>
		<h1 v-if="user"> {{ user }} </h1>
		<h1 v-else> No user </h1>
    </div>
</template>
  
<script>

import { mapState } from 'vuex';
export default {
	name: 'LogIn',
	computed: {
		...mapState(['user']),
	},
}
</script>