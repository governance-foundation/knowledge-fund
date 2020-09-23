<template>
  <div class="emoji-picker" v-if="show">
    <v-card height="300px" v-if="show">
      <v-card-title class="blue white--text">
        <span class="headline">Emoji Picker</span>
      </v-card-title>
      <v-card-text>
        <div class="emoji-content">
          <emoji
            v-for="emoji in emojis"
            :key="emoji.key"
            :emoji="emoji"
            @click="onEmojiClick"
          ></emoji>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Emoji from "./Emoji.vue";
import EmojisJson from "../../assets/emoji.json";
export default {
  data() {
    return {
      emojis: EmojisJson.emojis,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  created() {
    //load emoji from remote
    // fetch("/assets/emoji.json"))
    //   .then((response) => response.json())
    //   .then((data) => (this.emojis = data.emojis))
    //   .catch((error) => {
    //     this.errorMessage = error;
    //     console.error("There was an error!", error);
    //   });
    // console.log(EmojisJson);
  },
  methods: {
    onEmojiClick(emoji) {
      this.$emit("click", emoji);
    },
    closePicker() {
      this.$emit("close");
    },
  },
  components: {
    emoji: Emoji,
  },
};
</script>

<style>
.emoji-picker {
  background: white;
  position: absolute;
  bottom: 5rem;
  left: 0;
  width: 200px;
  user-select: none;
}
.emoji-picker .emoji-header {
  display: flex;
  padding: 5px;
  box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.15);
}
.emoji-picker .emoji-header .emoji-close {
  margin-left: auto;
}
.emoji-picker .emoji-content {
  margin-top: 10px;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 200px;
  margin-left: -10px;
}
.emoji-content span {
  padding: 3px !important;
  margin: 3px;
  width: 25px;
  height: 25px;
  float: left;
}
.emoji-content span.m {
  width: 35px;
}
.emoji-content span.l {
  width: 45px;
}
.emoji-picker span {
  cursor: pointer;
  font-size: 25px;
}
</style>
