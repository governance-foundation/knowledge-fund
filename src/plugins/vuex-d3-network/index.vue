<template>
  <div>
    <div class="header row">
      <h1 class="col-4" v-text="title"></h1>
      <div class="col-8 config-box">
        <label :class="showOnlyHighlightedClass">Search</label>
        <input
          name="inputSearch"
          type="text"
          :onChange="handleInputHighlightText"
          :value="inputHighlightText"
          :disabled="showOnlyHighlighted"
        />
        <button
          id="btnHighlight"
          :onClick="handleSearchForNodesClick"
          :disabled="showOnlyHighlighted"
        >
          Highlight
        </button>
        <input
          id="chkboxShowAllLabels"
          type="checkbox"
          :checked="showAllLabels"
          :onChange="handleShowAllLabels"
          :disabled="showOnlyHighlighted"
        />
        <label htmlFor="chkboxShowAllLabels" v-html="showLabels"></label>
        <input
          id="chkboxShowOnlyHighlighted"
          type="checkbox"
          :checked="showOnlyHighlighted"
          :onChange="handleShowOnlyHighlighted"
          :disabled="highlightedNodeNamesDisabled"
        />
        <label htmlFor="chkboxShowOnlyHighlighted">Show only highlighted</label>
        <input
          id="chkboxInvertBackground"
          type="checkbox"
          :checked="invertBackground"
          :onChange="handleInvertBackground"
        />
        <label htmlFor="chkboxInvertBackground">Invert Background</label>
        <input
          id="chkboxHasForceSimulation"
          type="checkbox"
          :checked="hasForceSimulation"
          :onChange="handleHasForceSimulation"
        />
        <label htmlFor="chkboxHasForceSimulation">Force</label>
      </div>
    </div>

    <div class="content">
      <div id="diagram" :class="invertBackground" />
      <div id="info-box">
        <h2 class="title" />
        <div class="notes" />
        <table class="table" />
        <div class="timestamp" />
      </div>
    </div>
  </div>
</template>

<script>
import "./index.css";
import "./forms.css";
import * as diagram from "./diagram";
import {
  getUrlParameterAsArray,
  setUrlParameterAsArray,
  getUrlParameter,
  setUrlParameter,
} from "./utils/url-query-param-utils";

export default {
  name: "D3network",
  components: {},
  props: {
    title: {
      type: String,
      default: "D3 Network",
    },
    showLabels: {
      type: String,
      default: "Show all labels",
    },
    urlParamLabelHighlightedNodes: {
      type: String,
      default: "hlNodes",
    },
    urlParamLabelShowOnlyHighlighted: {
      type: String,
      default: "showHlOnly",
    },
    // diagram: {
    //   type: Object,
    //   default: null,
    // },
    inputHighlightText: {
      type: String,
      default: "",
    },
    showAllLabels: {
      type: Boolean,
      default: false,
    },

    highlightedNodeNames: {
      type: Array,
      default: () => {
        return [];
      },
    },
    invertBackground: {
      type: Boolean,
      default: false,
    },
    hasForceSimulation: {
      type: Boolean,
      default: true,
    },
    showOnlyHighlighted: {
      type: Boolean,
      default: false,
    },
  },
  maxSize: {},
  computed: {
    showOnlyHighlightedClass() {
      return this.showOnlyHighlighted ? "disabled" : "";
    },
    highlightedNodeNamesDisabled() {
      return this.highlightedNodeNames.length === 0;
    },
  },
  watch: {},
  data: () => ({}),
  mounted() {
    console.log("d3network loading");
    console.log(process.env.APP_DATA_SERVICES_URL);

    const showOnlyHighlighted =
      getUrlParameter(this.urlParamLabelShowOnlyHighlighted) === "y";

    const highlightedNodeNames = getUrlParameterAsArray(
      this.urlParamLabelHighlightedNodes
    );

    if (showOnlyHighlighted && highlightedNodeNames.length === 0) {
      this.showOnlyHighlighted = false;
      this.urlParamLabelShowOnlyHighlighted = "";
    }

    diagram.load(
      this.handleHighlightedNodesChanged,
      this.highlightedNodeNames,
      this.showOnlyHighlighted
    );
  },
  methods: {
    updateShowAllLabels(showAllLabels) {
      this.showAllLabels = showAllLabels;
      diagram.showAllLabels(showAllLabels);
    },

    updateInputHighlightText(txt) {
      this.updateInputHighlightText = txt;
      diagram.searchForNodes(txt);
    },

    handleHighlightedNodesChanged(highlightedNodeNames) {
      this.highlightedNodeNames = highlightedNodeNames;
      setUrlParameterAsArray(
        this.urlParamLabelHighlightedNodes,
        highlightedNodeNames
      );
      if (highlightedNodeNames.length === 0 && this.showOnlyHighlighted) {
        this.showOnlyHighlighted = false;
        setUrlParameter(this.urlParamLabelShowOnlyHighlighted, "");
      }
    },

    handleSearchForNodesClick() {
      diagram.searchForNodes(this.state.inputHighlightText);
    },

    handleInputHighlightText(event) {
      const newVal = event.currentTarget.value;
      this.updateInputHighlightText(newVal);
      event.preventDefault();
    },

    handleShowAllLabels(event) {
      const newVal = event.currentTarget.checked;
      this.updateShowAllLabels(newVal);
    },

    handleShowOnlyHighlighted(event) {
      const newVal = event.currentTarget.checked;
      this.showOnlyHighlighted = newVal;

      setUrlParameter(this.urlParamLabelShowOnlyHighlighted, newVal ? "y" : "");
      diagram.showOnlyHighlighted(newVal);
      if (newVal === true && this.state.showAllLabels === true) {
        this.updateShowAllLabels(false);
      }
    },

    handleInvertBackground(event) {
      const newVal = event.currentTarget.checked;
      this.invertBackground = newVal;
      diagram.invertBackground(newVal);
    },

    handleHasForceSimulation(event) {
      const newVal = event.currentTarget.checked;
      this.hasForceSimulation = newVal;
      diagram.setHasForceSimulation(newVal);
    },
  },
};
</script>

<style scoped></style>
