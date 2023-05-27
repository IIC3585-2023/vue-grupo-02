import { createStore } from 'vuex'
import { browserLocalPersistence, setPersistence, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
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
    }

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
