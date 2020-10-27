<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Pane",
  props: {
    className: {
      type: String,
      default: "",
      required: false,
    },
  },
  data() {
    const classes = [this.$parent.split, this.className];
    return {
      classes: "split-pane-container" + classes.join(" "),
      size: 50,
    };
  },
};
</script>

<style scoped>
div.split-pane-container {
  width: 100%;
  height: 100%;
}
.splitter-pane.vertical.splitter-paneL {
  position: absolute;
  left: 0px;
  height: 100%;
  padding-right: 3px;
}
.splitter-pane.vertical.splitter-paneR {
  position: absolute;
  right: 0px;
  height: 100%;
  padding-left: 3px;
}
.splitter-pane.horizontal.splitter-paneL {
  position: absolute;
  top: 0px;
  width: 100%;
}
.splitter-pane.horizontal.splitter-paneR {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-top: 3px;
}
</style>
