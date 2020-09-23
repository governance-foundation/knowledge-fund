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
    search: {
      value: "",
      history: {},
    },
  },
  plugins: [vuexLocal.plugin],
});
// import store from '@/store';

// @Module({ dynamic: true, store, name: "addnew", stateFactory: true, namespaced: true }) //, preserveState: true
@Module({
  name: "Search",
  store: store,
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class AddNew extends VuexModule {
  searchTextInput = "";
  searchTextValue = "";
  searchHistory = new Array();
  searchHistoryLength = 100;

  get searchText() {
    return this.searchTextValue;
  }

  get searchInput() {
    return this.searchTextInput;
  }

  @Mutation
  setSearchtext(text: string) {
    //only add to history if value is not blank
    if (text) {
      if (this.searchHistory.length > this.searchHistoryLength) {
        this.searchHistory.pop();
      }

      this.searchHistory.unshift(text);
    }
    this.searchTextValue = text;
  }

  @Mutation
  setSearchInput(text: string) {
    this.searchTextInput = text;
  }

  @Action({ rawError: true })
  async searchAction(text: string) {
    this.context.commit("setSearchtext", text);
    return this.searchText;
  }

  @Action({ rawError: true })
  async searchInputAction(text: string) {
    this.context.commit("setSearchInput", text);
    return this.searchInput;
  }
}
