import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

// Declare empty store first
const store = new Vuex.Store({});
// import store from '@/store';

// @Module({ dynamic: true, store, name: "addnew", stateFactory: true, namespaced: true }) //, preserveState: true
@Module({ name: "AddNew", store: store, namespaced: true })
export default class AddNew extends VuexModule {
  showing = false;

  get shouldShow() {
    return this.showing;
  }

  @Mutation
  setShowState(show: boolean) {
    this.showing = show;
  }

  @Action({ rawError: true })
  async showAddNew() {
    this.context.commit("setShowState", true);
    return this.shouldShow;
  }

  @Action({ rawError: true })
  async hideAddNew() {
    this.context.commit("setShowState", false);
    return this.shouldShow;
  }

  @Action({ rawError: true })
  async setAddNew(show: boolean) {
    this.context.commit("setShowState", show);
    return this.shouldShow;
  }
}
