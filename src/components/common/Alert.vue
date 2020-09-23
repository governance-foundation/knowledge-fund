<template>
  <v-alert error dismissible @input="onClose" :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
      required: false,
    },
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
