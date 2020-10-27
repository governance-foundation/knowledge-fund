class Emitter {
  listeners: Map<any, any>;
  constructor() {
    this.listeners = new Map();
  }

  addListener(label: any, callback: any, vm: any) {
    if (typeof callback === "function") {
      this.listeners.has(label) || this.listeners.set(label, []);
      this.listeners.get(label).push({ callback: callback, vm: vm });
      return true;
    }
    return false;
  }

  removeListener(label: any, callback: any, vm: any) {
    let listeners = this.listeners.get(label);
    let index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i: any, listener: any, index: any) => {
        if (
          typeof listener.callback === "function" &&
          listener.callback === callback &&
          listener.vm === vm
        ) {
          i = index;
        }
        return i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(label, listeners);
        return true;
      }
    }
    return false;
  }

  emit(label: any, ...args: any) {
    let listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
      listeners.forEach((listener: any) => {
        listener.callback.call(listener.vm, ...args);
      });
      return true;
    }
    return false;
  }
}

export default new Emitter();
