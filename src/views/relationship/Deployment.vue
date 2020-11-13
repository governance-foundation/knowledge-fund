<template>
  <v-container class="fill-main">
    <v-row class="row1" dense>
      <v-col :cols="3" class="fill-height">
        <v-sheet class="pa-4 primary">
          <v-text-field
            v-model="search"
            label="Search Source"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-sheet>
        <v-list
          dense
          class="overflow-y-auto list fill-height"
          style="height: calc(100% - 5rem)"
        >
          <v-subheader>Deployment</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col :cols="2" class="fill-height">
        <div class="row-link">
          <v-list dense class="overflow-y-auto fill-height">
            <v-subheader>Application - Interface</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <div class="row-link-middle">
          <v-col
            :cols="auto"
            class="d-flex justify-center align-self-center align-center fill-height"
            style="position: relative"
          >
            <v-btn color="primary" style="z-index: 1">Link</v-btn>
            <v-progress-linear
              value="100"
              color="green"
              style="
                position: absolute;
                top: calc(50%);
                width: calc(50%);
                z-index: 0;
                transform: rotateZ(90deg);
              "
            ></v-progress-linear>
          </v-col>
        </div>

        <v-list dense class="overflow-y-auto row-link">
          <v-subheader>Infarstructure - Interface</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col :cols="2" class="fill-height">
        <v-row class="row-link" no-gutters fill-width>
          <v-col
            :cols="auto"
            class="d-flex justify-center align-self-center"
            style="position: relative"
          >
            <v-btn color="primary" style="z-index: 1">Link</v-btn>
            <v-progress-linear
              value="100"
              color="yellow darken-2"
              style="position: absolute; top: calc(50%); z-index: 0"
            ></v-progress-linear>
          </v-col>
        </v-row>
        <v-row class="row-link-middle" no-gutters fill-width> </v-row>
        <v-row class="row-link" no-gutters fill-width>
          <v-col
            :cols="auto"
            class="d-flex justify-center align-self-center"
            style="position: relative"
          >
            <v-btn color="primary" style="z-index: 1">Link</v-btn>
            <v-progress-linear
              value="100"
              color="purple"
              style="position: absolute; top: calc(50%); z-index: 0"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="2" class="fill-height">
        <v-list dense class="overflow-y-auto" style="height: 40%">
          <v-subheader>Application - Interface</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-row class="row-link-middle" no-gutters fill-width>
          <v-col
            :cols="auto"
            class="d-flex justify-center align-self-center"
            style="position: relative; height: 20%"
          >
            <v-btn color="primary" style="z-index: 1">Link</v-btn>
            <v-progress-linear
              value="100"
              color="red lighten-2"
              style="
                position: absolute;
                top: calc(50%);
                width: calc(50%);
                z-index: 0;
                transform: rotateZ(90deg);
              "
            ></v-progress-linear>
          </v-col>
        </v-row>
        <v-list dense class="overflow-y-auto" style="height: 40%">
          <v-subheader>Infarstructure - Interface</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col :cols="3" class="fill-height">
        <v-sheet class="pa-4 primary">
          <v-text-field
            v-model="search"
            label="Search Destination"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-sheet>
        <v-list
          dense
          class="overflow-y-auto list fill-height"
          style="height: calc(100% - 5rem)"
        >
          <v-subheader>Deployment</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row class="row2" dense>
      <v-col>
        <v-virtual-scroll :items="longlist" :item-height="55" height="300">
          <template v-slot:default="{ item }">
            <v-list-item-group
              v-model="selectedFocusItem"
              color="primary"
              dense
            >
              <v-list-item :key="item.index" :value="item.index">
                <v-list-item-avatar>
                  <v-avatar :color="item.color" size="56" class="white--text">
                    {{ item.initials }}
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.appname }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.interfacename
                  }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon>arrow_right_alt</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.interfacename
                  }}</v-list-item-title>
                </v-list-item-content>
                {{ item.appname }}
              </v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
export default {
  props: {
    selectedFocusItem: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data: () => ({
    search: "",
    selectedItem: 1,
    items: [
      { text: "Application 1", icon: "mdi-clock" },
      { text: "Application 2", icon: "mdi-account" },
      { text: "Application 3", icon: "mdi-flag" },
      { text: "Application 4", icon: "mdi-clock" },
      { text: "Application 5", icon: "mdi-account" },
      { text: "Application 6", icon: "mdi-flag" },
      { text: "Application 7", icon: "mdi-clock" },
      { text: "Application 8", icon: "mdi-account" },
      { text: "Application 9", icon: "mdi-flag" },
      { text: "Application 10", icon: "mdi-clock" },
      { text: "Application 11", icon: "mdi-account" },
      { text: "Application 12", icon: "mdi-flag" },
    ],
  }),

  computed: {
    longlist() {
      return Array.from({ length: 10000 }, (k, v /*k, v*/) => {
        const appname = "Application " + v;
        const interfacename = "*";
        const index = v;

        return {
          appname: `${appname}`,
          interfacename: `${interfacename}`,
          index: `${index}`,
        };
      });
    },
  },
};
</script>
<style lang="scss">
.row1 {
  height: 60%;
  max-height: 70%;
  overflow: hidden;
  background-color: rgb(240, 240, 240);
}
.row2 {
  height: 30%;
  max-height: 30%;
  overflow: hidden;
  background-color: rgb(240, 240, 240);
}
.fill-main {
  height: calc(100%);
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  margin: 0;
}
.fill-height {
  height: 100%;
  max-height: 100%;
}
.fill-height-half {
  height: calc(50%);
}
.fill-width {
  width: 100% !important;
  margin: 0px !important;
  max-width: 100% !important;
}
.list {
  max-height: 100%;
}
.row-link {
  height: 40%;
}
.row-link-middle {
  height: cal(20%);
}
</style>
