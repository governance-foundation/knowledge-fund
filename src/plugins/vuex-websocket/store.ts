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
    socket: {
      isConnected: false,
      debug: false,
      message: null,
      reconnectError: false,
      lastMessageSentValue: null,
    },
  },
  plugins: [vuexLocal.plugin],
});

@Module({
  name: "VuexWebSocket",
  store: store,
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class VuexWebSocket extends VuexModule {
  isConnected = false;
  debug = false;
  message = null;
  lastMessageSentValue = null;

  get messageSent() {
    return this.lastMessageSentValue;
  }
  get isDebug() {
    return this.debug;
  }

  @Mutation
  SOCKET_ONOPEN(event: any) {
    if (this.isDebug) {
      console.warn(["SOCKET_ONOPEN", event]);
    }
    this.isConnected = true;
  }

  @Mutation
  SOCKET_ONCLOSE(event: any) {
    if (this.isDebug) {
      console.warn(["SOCKET_ONCLOSE", event]);
    }
    this.isConnected = false;
  }

  @Mutation
  SOCKET_ONERROR(event: any) {
    if (this.isDebug) {
      console.warn(["SOCKET_ONERROR", event]);
    }
    this.isConnected = false;
  }

  @Mutation
  // default handler called for all methods
  SOCKET_ONMESSAGE(message: any) {
    if (this.isDebug) {
      console.warn(["SOCKET_ONMESSAGE", message]);
    }
    this.message = message;
  }

  @Mutation
  SOCKET_RECONNECT(event: any) {
    if (this.isDebug) {
      console.warn(["SOCKET_RECONNECT", event]);
    }
  }

  @Mutation
  SOCKET_RECONNECT_ERROR(event: any) {
    if (this.isDebug) {
      console.warn(["SOCKET_RECONNECT_ERROR", event]);
    }
  }

  @Mutation
  setMessageSent(message: any) {
    console.log(message);
    this.lastMessageSentValue = message;
  }

  @Action({ rawError: true })
  async sendMessage(message: any, format?: string) {
    if (this.isDebug) {
      console.warn([
        "sendMessage",
        message,
        this.messageSent,
        this.messageSent === message,
        Vue.prototype.$socket,
      ]);
    }
    try {
      if (this.messageSent === message) {
        console.warn("Possible duplicate message being sent");
      }
    } catch (ex) {
      console.warn(
        "Could not detect if new essage has not been already sent. %s",
        ex
      );
    }

    Vue.prototype.$socket.send(message);
    this.context.commit("setMessageSent", message);
    return this.messageSent;
  }
}
