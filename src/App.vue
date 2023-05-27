<template>
  <head>
    <title>Pokedex</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <div id="app">
    <NavBar/>
    <router-view v-if="!loading"/>
    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <FooterComponent/>
  </div>
</template>

<script>

import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { onSnapshot, setDoc, doc } from 'firebase/firestore'
import { mapMutations, mapState } from 'vuex';
import db from '@/integrations/firebase';
import NavBar from '@/components/NavBar.vue';
import FooterComponent from "./components/FooterComponent.vue";


export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent
  },
  methods: {
    ...mapMutations(['setUser', 'setTeam', 'setLoading']),
  },
  computed: {
    ...mapState(['user', 'team', 'loading'])
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.setLoading(true);
      if (user) {
        this.setUser(user);
        const userRef = doc(db, 'users', user.uid);
        onSnapshot(userRef, async (docSnapshot) => {
          let docsData = docSnapshot.data();
          if (!docsData) {
            docsData = {team: new Array(6).fill().map(() => ({}))}
            await setDoc(userRef, docsData)
          }
          this.setTeam(docsData.team)
      })
      } else {
        this.setUser(null);
        this.setTeam(null);
      }
      this.setLoading(false);
    });
  },
};

</script>

<style>
#app {
  font-family: 'Poppins';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
