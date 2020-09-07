<template>
  <nav>
    <!-- APP BAR -->
    <v-app-bar color="while" dark app class="line">
      <v-row>
        <v-col md="auto">
          <!-- TITLE -->
          <v-toolbar-title class="text-uppercase red--text">
            <span class="font-weight-light">Knowledge</span>
            <span>&nbsp;Fund</span>
          </v-toolbar-title>

        </v-col>
        <v-col md="auto">
          <!-- TITLE SEARCH -->
          <v-text-field
            class="mx-4 shrink"
            id="navbarsearch"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            solo-inverted
            clearable
            full-width
          ></v-text-field>
        </v-col>
        <v-col md="auto">
          <!-- TITLE ADD BUTTON -->
          <v-btn color="red" dark small absolute right fab>
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
    <v-navigation-drawer v-model="drawer" dark app mini-variant expand-on-hover>
      <v-layout fill-height column justify-space-between>
        <!-- LEFT SIDE NAV HEADER -->
        <v-list dense nav class="py-0">
          <v-list-item two-line class="drawer-header">
            <v-list-item-avatar>
              <v-icon color="red">fa-brain</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                ><span class="font-weight-light">Knowlegde</span>
                <span>&nbsp;Fund</span>
              </v-list-item-title>
              <v-list-item-subtitle>Actions</v-list-item-subtitle>
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
export default {
  data: () => ({
    drawer: true,
    nav: [
      { title: "Files", icon: "mdi-file-multiple", link: "/" },
      { title: "Search", icon: "mdi-file-search", link: "/search" },
      { title: "Table of Contents", icon: "mdi-notebook", link: "/toc" },
      { title: "Nav History", icon: "mdi-history", link: "/history" },
      { title: "Text Forage", icon: "mdi-carabiner", link: "/forage" },
      { title: "Bookmarks", icon: "mdi-bookmark-multiple", link: "/bookmarks" },
      { title: "Text Hightlight", icon: "mdi-marker", link: "/highlight" }
    ],
    settings: [
      { title: "Profile", icon: "mdi-account-circle", link: "/profile" },
      { title: "Setting", icon: "mdi-cog", link: "/settings" }
    ]
  })
};
</script>
<style scoped>
/* /deep/ #navbarsearch{
    width: 400px;
} */
.drawer-header {
  padding: 0px !important;
}
</style>
