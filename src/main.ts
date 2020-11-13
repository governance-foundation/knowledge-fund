import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuexWebSocket from "@/plugins/vuex-websocket";

Vue.config.productionTip = false;
Vue.config.devtools = true;

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VuexWebSocket, "ws://localhost:8110/", {
  store: store,
  format: "json",
  reconnection: true,
  namespace_prefix: "VuexWebSocket/", //will not be used on events that have store_actions mapping specified
  store_actions: {
    SOCKET_ONOPEN: [
      {
        method: "commit",
        target: "VuexWebSocket/SOCKET_ONOPEN",
      },
    ],
    SOCKET_ONCLOSE: {
      method: "commit",
      target: "VuexWebSocket/SOCKET_ONCLOSE",
      msg: "test",
    },
    SOCKET_ONERROR: { target: "VuexWebSocket/SOCKET_ONERROR" },
    SOCKET_ONMESSAGE: [
      { target: "VuexWebSocket/SOCKET_ONMESSAGE" },
      { method: "dispatch", target: "Message/messageRecieve" },
    ],
    SOCKET_RECONNECT: "VuexWebSocket/SOCKET_RECONNECT",
    SOCKET_RECONNECT_ERROR: "VuexWebSocket/SOCKET_RECONNECT_ERROR",
  },
});
