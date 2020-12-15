import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { IAppState } from "./modules/app";

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  plugins: [
    createPersistedState({
      key: "peristed",
      paths: ["auth"]
    })
  ]
});
