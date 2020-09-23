import Vuex from "vuex";
import Vue from "vue";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

// Declare empty store first
const store = new Vuex.Store<any>({
  state: {
    user: "",
  },
  plugins: [vuexLocal.plugin],
});
@Module({ name: "Auth", store: store, namespaced: true })
export default class AddNew extends VuexModule {
  user = "";

  get username() {
    return this.user;
  }
}
