<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LogIn/>
  </div>
</template>

<script>

import LogIn from '@/components/LogIn.vue';

export default {
  name: 'HomeView',
  components: {
    LogIn
  },
}
</script>
