import Emitter from "./emitter";
import { WebSocketOptions, EventMapping } from ".";

export default class {
  format: any;
  connectionUrl: any;
  opts: WebSocketOptions;
  reconnection: any;
  reconnectionAttempts: any;
  reconnectionDelay: any;
  reconnectTimeoutId: any;
  reconnectionCount: number;
  store: any;
  WebSocket: any;
  namespace_prefix: any; //will not be used on events that have store_actions mapping specified
  store_actions: any;

  constructor(connectionUrl: any, opts = {}) {
    this.opts = opts;
    this.format = this.opts.format && this.opts.format.toLowerCase();
    this.connectionUrl = connectionUrl;
    this.reconnection = this.opts.reconnection || false;
    this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity;
    this.reconnectionDelay = this.opts.reconnectionDelay || 1000;
    this.reconnectTimeoutId = 0;
    this.reconnectionCount = 0;
    this.namespace_prefix = this.opts.namespace_prefix;
    this.store_actions = this.opts.store_actions;

    this.connect(connectionUrl, opts);

    if (this.opts.store) {
      this.store = this.opts.store;
    }

    this.onEvent();
  }

  connect(connectionUrl: string, opts = {}) {
    let protocol = this.opts.protocol || "";
    this.WebSocket =
      this.opts.WebSocket ||
      (protocol === ""
        ? new WebSocket(connectionUrl)
        : new WebSocket(connectionUrl, protocol));
    if (this.format === "json") {
      if (!("sendObj" in this.WebSocket)) {
        this.WebSocket.sendObj = (obj: any) =>
          this.WebSocket.send(JSON.stringify(obj));
      }
    }

    return this.WebSocket;
  }

  reconnect(event?: any) {
    if (this.reconnectionCount <= this.reconnectionAttempts) {
      this.reconnectionCount++;
      clearTimeout(this.reconnectTimeoutId);

      this.reconnectTimeoutId = setTimeout(() => {
        if (this.store) {
          this.passToStore("SOCKET_RECONNECT", this.reconnectionCount);
        }

        this.connect(this.connectionUrl, this.opts);
        this.onEvent();
      }, this.reconnectionDelay);
    } else {
      if (this.store) {
        this.passToStore("SOCKET_RECONNECT_ERROR", true);
      }
    }
  }

  onEvent() {
    ["onmessage", "onclose", "onerror", "onopen"].forEach((eventType) => {
      this.WebSocket[eventType] = (event: any) => {
        Emitter.emit(eventType, event);

        if (this.store) {
          this.passToStore("SOCKET_" + eventType, event);
        }

        if (this.reconnection && eventType === "onopen") {
          this.reconnectionCount = 0;
        }

        if (this.reconnection && eventType === "onclose") {
          this.reconnect(event);
        }
      };
    });
  }

  passToStore(eventName: any, event: any) {
    if (!eventName.startsWith("SOCKET_")) {
      return;
    }
    let method = "commit";
    let target = eventName.toUpperCase();
    let msg = event;
    let format = this.format;
    if (this.format === "json" && event.data) {
      msg = JSON.parse(event.data);
      if (msg.mutation) {
        target = [msg.namespace || "", msg.mutation]
          .filter((e) => !!e)
          .join("/");
      } else if (msg.action) {
        method = "dispatch";
        target = [msg.namespace || "", msg.action].filter((e) => !!e).join("/");
      }
    }

    let targets: any[] = [];

    //if mapping exist
    if (this.store_actions) {
      targets = [];

      //get the mapping entry
      let targetMap = this.store_actions[eventName.toUpperCase()];

      if (targetMap) {
        //is being mapped
        if (typeof targetMap === "string") {
          targets = [
            {
              method: method,
              target: targetMap || target,
              msg: msg,
            },
          ];
        } else if (
          !Array.isArray(targetMap) &&
          typeof targetMap === "object" &&
          targetMap !== null
        ) {
          const tagetValue = <EventMapping>targetMap;

          targets = [
            {
              method: tagetValue.method || method,
              target: tagetValue.target || target,
              msg: tagetValue.msg || msg,
              format: tagetValue.format || format,
            },
          ];
        } else if (Array.isArray(targetMap)) {
          targetMap.forEach(function (target) {
            const tagetValue = <EventMapping>target;

            if (tagetValue.target) {
              targets.push({
                method: tagetValue.method || method,
                target: tagetValue.target || target,
                msg: tagetValue.msg || msg,
                format: tagetValue.format || format,
              });
            }
          });
        } else {
          console.warn(
            "Unknown mapping type provided, event will not be processes."
          );
        }
      }
    } else {
      targets = [
        {
          method: method,
          target: this.namespace_prefix + target,
          msg: msg,
          format: format,
        },
      ];
    }
    var thatStore = this.store;

    targets.forEach(function (target: EventMapping) {
      var method = target.method;
      if (method) {
        try {
          thatStore[method](
            target.target,
            format == "json" ? target.msg : event,
            { root: target.target?.indexOf("/") ? true : false }
          );
        } catch (ex) {
          console.error(
            "Could not execute command with store. %s. error: %s",
            target,
            ex
          );
        }
      } else {
        console.warn(
          "Unknown mapping method provided, event will not be processes. %s",
          target
        );
      }
    });
  }
}
