import d3network from "./index.vue";

export default d3network;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component("d3network", d3network);
}
