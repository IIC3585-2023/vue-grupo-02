import { createStore } from 'vuex'
import { browserLocalPersistence, setPersistence, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore'
import db from '@/integrations/firebase';

export default createStore({
  state: {
    loading: false,
    user: null,
    team: null
  },
  getters: {
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setTeam(state, payload) {
      state.team = payload;
    },
    addToTeam(state, payload) {
      const pokemon = {
        id: payload.pokemon.stats.id,
        name: payload.pokemon.stats.name,
        imgURL: payload.pokemon.stats.sprites.other['official-artwork'].front_default,
        description: payload.pokemon.description.flavor_text_entries.find((entry) => entry.language.name === 'en').flavor_text,
      }
      console.log(pokemon);
      state.team[payload.index] = pokemon;
      const ref = doc(db, 'users', state.user.uid);
      setDoc(ref, { team: state.team }, { merge: true });
    },
  },
  actions: {
    async signIn(context) {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      try {
        const res = await signInWithPopup(auth, provider);
        context.commit('setUser', res.user);
      } catch (error) {
        console.log(error);
      }
    },
    async signOut(context) {
      const auth = getAuth();
      try {
        await signOut(auth);
        context.commit('setUser', null);
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
