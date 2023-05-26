import { createStore } from 'vuex'
import { browserLocalPersistence, setPersistence, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
export default createStore({
  state: {
    loading: false,
    user: null
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
  },
  actions: {
    async signIn(context) {
      context.commit('setLoading', true);
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      try {
        const res = await signInWithPopup(auth, provider);
        context.commit('setUser', res.user);
        context.commit('setLoading', false);
      } catch (error) {
        console.log(error);
        context.commit('setLoading', false);
      }
    },
    async signOut(context) {
      context.commit('setLoading', true);
      const auth = getAuth();
      try {
        await signOut(auth);
        context.commit('setUser', null);
        context.commit('setLoading', false);
      } catch (error) {
        console.log(error);
        context.commit('setLoading', false);
      }
    }
  },
  modules: {
  }
})
