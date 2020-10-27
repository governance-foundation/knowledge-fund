<template>
  <div :class="classes"></div>
</template>

<script>
export default {
  props: {
    split: {
      validator(value) {
        return ["vertical", "horizontal"].indexOf(value) >= 0;
      },
      required: true,
    },
    className: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    classes() {
      const classes = ["splitter-pane-resizer", this.split, this.className];
      return classes.join(" ");
    },
  },
};
</script>

<style scoped lang="scss">
.splitter-pane-resizer {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: black;
  position: absolute;
  opacity: 0.2;
  z-index: 1;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
  flex-shrink: 0;
  //use image as indicator for resizer
  background-repeat: no-repeat;
  background-position: 50%;
  //use content as indicator for resizer
  // &:before,
  // &:after {
  //   content: "";
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  // }
  // &:hover:before,
  // &:hover:after {
  //   background-color: rgba(0, 0, 0, 0.25);
  // }
  // &:first-child {
  //   cursor: auto;
  // }
}
.splitter-pane-resizer.horizontal {
  height: 1rem;
  margin: -1rem 0;
  border-top: 5px solid black;
  border-bottom: 5px solid black;
  cursor: row-resize;
  //use image as indicator for resizer
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
  width: 100%;
  //use content as indicator for resizer
  // &:before,
  // &:after {
  //   transform: translateX(-50%);
  //   width: 3rem;
  //   height: 1px;
  //   background-color: red;
  // }
  // &:before {
  //   margin-top: -2px;
  // }
  // &:after {
  //   margin-top: 1px;
  // }
}
.splitter-pane-resizer.vertical {
  width: 1rem;
  height: 100%;
  margin-left: -5px;
  border-left: 5px solid black;
  border-right: 5px solid black;
  cursor: col-resize;
  //use image as indicator for resizer
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
  // &:before,
  // &:after {
  //   transform: translateY(-50%);
  //   width: 1px;
  //   height: 3rem;
  // }
  // &:before {
  //   margin-left: -2px;
  // }
  // &:after {
  //   margin-left: 1px;
  // }
}

.gutter {
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: 50%;
}
.gutter.gutter-horizontal {
  cursor: col-resize;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
}
.gutter.gutter-vertical {
  cursor: row-resize;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
}
</style>
