import Vue from "vue";
import Vuex from "vuex";
import AddNew from "@/store/modules/addnew";
import Search from "@/store/modules/search";
import Auth from "@/store/modules/auth";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    AddNew,
    Search,
    Auth,
  },
  plugins: [vuexLocal.plugin],
  strict: debug,
});
