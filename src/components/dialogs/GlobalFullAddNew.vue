<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="onCancel(this)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add New</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="onSave()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    notifications: false,
    sound: false,
    widgets: false,
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters["AddNew/shouldShow"];
      },
      set() {
        // this.$store.dispatch("setValue", value);
      },
    },
  },

  mounted() {
    // bind to esc key
    const escapeHandler = (e) => {
      // console.log("KEY:" + e.key);
      if (e.keyCode == 27) {
        // console.log("EXIT:" + e.key);
        this.onCancel();
        document.removeEventListener("keyup", escapeHandler);
      }
    };
    document.addEventListener("keyup", escapeHandler);
    this.$once("hook:destroyed", () => {
      document.removeEventListener("keyup", escapeHandler);
    });
  },
  methods: {
    onSave() {
      this.$emit("onSave", this.data);
    },
    onCancel() {
      this.$emit("onClose", this.data);
    },
  },
  actions: {
    show() {
      console.log("show");
      this.visible = true;
    },
  },
};
</script>
