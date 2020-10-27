import Vue, { PluginFunction, PluginObject } from "vue";
import Vuex, { MutationPayload, Plugin, Store } from "vuex";
import Observer from "./observer";
import Emitter from "./emitter";

export interface EventMapping {
  method?: string;
  target?: string;
  msg?: "test";
  format?: string;
}

export interface WebSocketOptions {
  url?: string;
  format?: string;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  store?: any;
  protocol?: string;
  WebSocket?: WebSocket;
  namespace_prefix?: any;
  store_actions?: any;
}

export default {
  install(Vue: any, connection: any, opts = {}) {
    if (!connection) {
      throw new Error("[vuex-websocket] cannot locate connection");
    }

    let observer = new Observer(connection, opts);

    Vue.prototype.$socket = observer.WebSocket;

    Vue.mixin({
      created() {
        let vm = this;
        let sockets = this.$options["sockets"];

        this.$options.sockets = new Proxy(
          {},
          {
            set(target: any, key: any, value: any) {
              Emitter.addListener(key, value, vm);
              target[key] = value;
              return true;
            },
            deleteProperty(target, key) {
              Emitter.removeListener(key, vm.$options.sockets[key], vm);
              delete target.key;
              return true;
            },
          }
        );

        if (sockets) {
          Object.keys(sockets).forEach((key) => {
            this.$options.sockets[key] = sockets[key];
          });
        }
      },
      beforeDestroy() {
        let sockets = this.$options["sockets"];
        clearTimeout(observer.reconnectTimeoutId);

        if (sockets) {
          Object.keys(sockets).forEach((key) => {
            delete this.$options.sockets[key];
          });
        }
      },
    });
  },
};
