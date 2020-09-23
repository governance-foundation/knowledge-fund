<template>
  <v-app>
    <Navbar :nav="nav" :settings="settings" @onSearch="onSearch" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

import { mapActions } from "vuex";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions({
      showAddNew: "AddNew/showAddNew",
      hideAddNew: "AddNew/hideAddNew",
      search: "Search/searchAction",
      searchInput: "Search/searchInputAction",
    }),
    onSearch(text: String) {
      // console.log("global search: " + text);
      if (text && this.$route.name != "search") {
        this.$router.push("search", () => {
          this.search(text);
          this.searchInput("");
        });
      } else {
        this.search(text);
        this.searchInput("");
      }
    },
    onSearchInput(text: String) {
      this.searchInput(text);
    },
    onSearchClear() {
      // console.log(
      //   "onSearchClear:> " + this.$store.getters["Search/searchText"]
      // );
    },
  },
  data: () => ({
    title: "Knowledge Fund",
    isDialogVisibleAddNew: false,
    newInfo: {},
    nav: [
      { title: "Learn", icon: "school", link: "/learn" },
      { title: "Search", icon: "question_answer", link: "/search" },
    ],
    settings: [
      { title: "Profile", icon: "mdi-account-circle", link: "/profile" },
      { title: "Setting", icon: "mdi-cog", link: "/settings" },
    ],
  }),
  watch: {
    // eslint-disable-next-line
    title: function(val, old) {
      document.title = val;
    },
  },
  created() {
    document.title = this.title;
  },
});
</script>
