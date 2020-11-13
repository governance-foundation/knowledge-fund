<template>
  <div class="about">
    <h1>Application Diagram</h1>
    <d3network></d3network>
  </div>
</template>

<script lang="ts">
import d3network from "@/plugins/vuex-d3-network";
export default {
  components: { d3network },
};
</script>
