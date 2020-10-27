import Vue from "vue";
import Vuex from "vuex";
import AddNew from "@/store/modules/addnew";
import Search from "@/store/modules/search";
import Message from "@/store/modules/message";
import Auth from "@/store/modules/auth";
import VuexWebSocket from "@/plugins/vuex-websocket/store";
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
    Message,
    VuexWebSocket,
  },
  plugins: [vuexLocal.plugin],
  strict: debug,
});
