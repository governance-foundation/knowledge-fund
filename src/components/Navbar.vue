<template>
  <nav>
    <GlobalAddDialog @onSave="hideAddNew" @onClose="hideAddNew" />
    <!-- APP BAR -->
    <v-app-bar color="while" dark app class="line">
      <v-row class="d-flex justify-space-between">
        <v-col md="auto" class="align-self-center flex-grow-0 d-none d-sm-flex">
          <!-- TITLE -->
          <v-toolbar-title class="text-uppercase red--text">
            <Title />
          </v-toolbar-title>
        </v-col>
        <v-col md="auto" class="align-self-center flex-grow-1">
          <!-- TITLE SEARCH -->
          <GlobalSearch
            @onClear="onSearchClear"
            @onSearch="onSearch"
            @onSearchInput="onSearchInput"
            :search-text="searchText"
          />
        </v-col>
        <v-col md="auto" class="align-self-center flex-grow-0 ml-auto">
          <!-- TITLE ADD BUTTON -->
          <v-btn color="red" dark small right fab @click="showAddNew">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- TITLE TABS -->
      <!-- <template v-slot:extension>
        <v-tabs dark background-color="teal darken-3" show-arrows>
          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
          <v-tab :ripple="false" v-for="i in 30" :key="i" :href="'#tab-' + i">
            Item {{ i }} &nbsp;
            <v-btn text x-small color="white"><v-icon>mdi-close</v-icon></v-btn>
          </v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>
    <!-- LEFT SIDE NAV -->
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      mini-variant
      permanent
      expand-on-hover
      class="d-flex"
    >
      <v-layout fill-height column justify-space-between>
        <!-- LEFT SIDE NAV HEADER -->
        <v-list dense nav class="py-0">
          <v-list-item two-line class="drawer-header">
            <v-list-item-avatar>
              <AppIcon />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <Title />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- LEFT SIDE NAV HEADER DIVIDER -->
          <v-divider></v-divider>

          <!-- LEFT SIDE NAV MIDDLE ITEMS -->
          <v-list-item
            v-for="item in nav"
            :key="item.title"
            :to="item.link"
            router
            link
          >
            <v-list-item-icon>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- LEFT SIDE NAV BOTTOM ITEMS -->
        <v-list dense nav class="py-0" justify-end>
          <v-list-item
            v-for="item in settings"
            :key="item.title"
            :to="item.link"
            router
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <!-- <v-navigation-drawer v-model="drawer" dark app>
    </v-navigation-drawer> -->
    <!-- RIGHT SIDE NAV -->
    <!-- <v-navigation-drawer
      v-model="drawer"
      dark
      app
      mini-variant
      expand-on-hover
      right
    >
    </v-navigation-drawer> -->
  </nav>
</template>
<script>
import GlobalAddDialog from "@/components/dialogs/GlobalFullAddNew.vue";
import GlobalSearch from "@/components/search/GlobalSearch.vue";
import Title from "@/components/common/Title.vue";
import AppIcon from "@/components/common/AppIcon.vue";

import { mapActions } from "vuex";

export default {
  components: {
    GlobalAddDialog,
    GlobalSearch,
    Title,
    AppIcon,
  },
  methods: {
    ...mapActions({
      showAddNew: "AddNew/showAddNew",
      hideAddNew: "AddNew/hideAddNew",
      search: "Search/searchAction",
      searchInput: "Search/searchInputAction",
    }),
    onSearch(text) {
      // console.log("nav search: " + text);
      // this.search(text);
      // this.searchInput("");
      // if (text && this.$route.name != "search") {
      //   this.$router.push("search");
      // }
      this.$emit("onSearch", text);
    },
    onSearchInput(text) {
      this.$emit("onSearchInput", text);
      // this.searchInput(text);
    },
    onSearchClear() {
      // console.log(
      //   "onSearchClear:> " + this.$store.getters["Search/searchText"]
      // );
    },
  },
  computed: {
    shouldShow() {
      return this.$store.getters["AddNew/shouldShow"];
    },
    // searchText: {
    //   get() {
    //     console.log("searchText get: ");
    //     // console.log(
    //     //   "searchText get: " + this.$store.getters["Search/searchText"]
    //     // );
    //     return this.$store.getters["Search/searchText"];
    //   },
    //   set(text) {
    //     console.log("searchText set: " + text);
    //     // this.onSearchInput(text);
    //   },
    // },
  },
  props: {
    nav: {
      type: Array,
      default: () => {
        return [];
      },
      required: false,
    },
    settings: {
      type: Array,
      default: () => {
        return [];
      },
      required: false,
    },
  },
  data: () => ({
    dialog: false,
    drawer: true,
    isDialogVisibleAddNew: false,
    newInfo: {},
    searchText: "",
  }),
  mounted() {
    // console.log("navbar:" + this.$store.getters["Search/searchText"]);
  },
};
</script>
<style scoped>
.drawer-header {
  padding: 0px !important;
}
</style>
