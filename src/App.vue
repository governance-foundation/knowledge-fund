<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  name: "App",

  components: {
    Navbar
  },

  data: () => ({
    title: "Knowledge Fund"
  }),
  watch: {
    // eslint-disable-next-line
    title: function(val, old) {
      document.title = val;
    }
  },
  created() {
    document.title = this.title;
  }
});
</script>
