<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.backgrounds }">
    <v-container>
      <v-row>
        <v-col md="4">
          <v-text-field
            label="Filter"
            prepend-icon="search"
            color="red"
            error
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <span class="red--text mt-9" v-html="count + ' notes'"></span>
        <v-btn text class="mt-7 ml-3" tile icon>
          <v-icon color="red">menu</v-icon>
        </v-btn>
        <v-btn text class="mt-7 ml-3" tile icon>
          <v-icon color="red">dashboard</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          md="3"
          class="mb-4"
          v-for="card in notes"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card max-width="250" max-height="250" align="center">
            <v-card-text class="red--text" v-html="card.title"></v-card-text>

            <v-img src="img/card/note.jpg" width="150" height="150"></v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    count: 30,
    notes: [
      { title: "Note 1", flex: 6 },
      { title: "Note 2", flex: 12 },
      { title: "Note 3", flex: 6 },
    ],
  }),
  components: {},
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
