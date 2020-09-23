<template>
  <v-text-field
    v-model="searchTextValue"
    class="mx-4 shrink"
    ref="search"
    flat
    hide-details
    label="Search"
    prepend-inner-icon="search"
    solo-inverted
    clearable
    full-width
    @keypress.enter="onSearch"
    @click:clear="onClear"
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
  data: () => ({
    searchTextInput: "",
  }),
  computed: {
    searchTextValue: {
      get() {
        return this.searchText;
      },
      set(text) {
        if (text != "") {
          this.searchTextInput = text;
          this.$emit("onSearchInput", text);
        }
        return text;
      },
    },
  },
  // data: () => ({
  //   searchTextValue: ""
  // }),
  methods: {
    onSearch() {
      // console.log("onSearch:", this.searchTextInput);
      this.$emit("onSearch", this.searchTextInput);
      this.searchTextValue = "";
      this.searchTextInput = "";
      this.$refs.search.clearableCallback();
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
