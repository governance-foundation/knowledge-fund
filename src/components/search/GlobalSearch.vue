<template>
  <v-text-field
    v-model="searchTextValue"
    class="mx-4 shrink"
    id="navbarsearch"
    flat
    hide-details
    label="Search"
    prepend-inner-icon="search"
    solo-inverted
    clearable
    full-width
    @click:clear="onClear()"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    searchText: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    searchTextValue: {
      get() {
        return this.searchText;
      },
      set(text) {
        // console.log("onSearch:", text);
        this.$emit("onSearch", text);
        return text;
      },
    },
  },
  // data: () => ({
  //   searchTextValue: ""
  // }),
  methods: {
    onSearch() {
      // console.log("onSearch:", this.searchTextValue);
      this.$emit("onSearch", this.searchTextValue);
    },
    onClear() {
      // console.log("onClear:", this.searchTextValue);
      this.$emit("onClear", this.searchTextValue);
    },
  },
  mounted() {
    // console.log("globasearch:" + this.searchTextValue)
  },
};
</script>
