<template>
  <head>
    <title>Pokedex</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

export default {
  name: 'App',
  components: {
    NavBar,
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit('setUser', user);
      } else {
        this.$store.commit('setUser', null);
      }
    });
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
