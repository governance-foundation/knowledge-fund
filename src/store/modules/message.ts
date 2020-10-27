import Vue, { PluginFunction, PluginObject } from "vue";
import Vuex, { MutationPayload, Plugin, Store } from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

export interface MessageFormat {
  use?: string;
  content?: string;
  date?: number;
  chatID: string;
  key?: number;
  echo?: boolean;
}

let connectionUrl = "ws://localhost:8110/";
// let connectionUrl = "ws://192.168.1.16:8085/struct/kaml";
const clientName = "client" + Date.now();

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

// Declare empty store first
const store = new Vuex.Store<any>({
  state: {
    messages: {
      connectionUrl: "",
    },
  },
  plugins: [vuexLocal.plugin],
});

// Vue.use(new VuexSocket({url: connectionUrl, store: store}));

@Module({
  name: "Message",
  store: store,
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class Message extends VuexModule {
  messageValue = {};
  connectionUrlValue = "ws://localhost:8110/";
  messageHistory = new Array();
  messageHistoryLength = 100;

  get message() {
    return this.messageValue;
  }

  get connectionUrl() {
    return this.connectionUrlValue;
  }

  get messageList() {
    return this.messageHistory;
  }

  @Mutation
  setMessage(message: object) {
    //console.log("Message/setMessage %s", JSON.stringify(message));
    //only add to history if value is not blank
    if (message) {
      if (this.messageHistory.length > this.messageHistoryLength) {
        this.messageHistory.pop();
      }

      this.messageHistory.unshift(message);
    }
    this.messageValue = message;
  }

  @Action({ rawError: true })
  async messageSend(message: object) {
    this.context.commit("setMessage", message);
    this.context.dispatch(
      "VuexWebSocket/sendMessage",
      JSON.stringify(message),
      { root: true }
    );
    return this.message;
  }

  @Action({ rawError: true })
  async messageRecieve(message: object) {
    this.context.commit("setMessage", message);
    return this.message;
  }
}
