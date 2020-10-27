<template>
  <split-pane :min-percent="20" :default-percent="50" split="horizontal">
    <template slot="paneL">
      <v-container fluid fill-height>
        <v-row no-gutters fill-height>
          <v-col :cols="11" fill-height>
            <v-textarea
              fill-height
              counter
              outlined
              clearable
              prepend-icon="mdi-comment"
              class="sourceKaml"
              :class="`fill-height`"
              label="Text"
              style="height: calc(100%): background-color: red"
            ></v-textarea>
          </v-col>
          <v-col :cols="1" class="d-flex justify-center align-self-center">
            <v-btn color="primary">Send</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template slot="paneR">
      <v-container fluid fill-height>
        <v-row no-gutters fill-height>
          <v-col :cols="11" fill-height>
            <v-textarea
              counter
              clearable
              outlined
              prepend-icon="mdi-comment"
              class="returnJson"
              :class="`fill-height`"
              label="Text"
              ref="returnJson"
              style="height: calc(100%): background-color: red"
            ></v-textarea>
          </v-col>
          <v-col :cols="1"> </v-col>
        </v-row>
      </v-container>
    </template>
  </split-pane>
</template>

<script lang="ts">
import SplitPane from "@/plugins/vuex-split-pane";

export default {
  components: { SplitPane },
};
</script>

<style scoped lang="scss">
.returnJson,
.sourceKaml {
  ::v-deep .v-input__control {
    height: calc(100%);
  }
  ::v-deep .v-input__slot {
    height: calc(100% - 2rem);
  }
  ::v-deep .v-text-field__slot {
    height: calc(100% - 2rem);
  }
  ::v-deep .v-text-field__details {
  }
}
[fill-height] {
  height: calc(100%);
}
</style>
