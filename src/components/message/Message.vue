<template>
  <div>
    <div
      class="message"
      v-for="(message, index) in messages"
      :key="index"
      :class="{ own: message.user == username }"
    >
      <div
        class="username"
        v-if="index > 0 && messages[index - 1].user != message.user"
      >
        {{ message.user }}
      </div>
      <div class="username" v-if="index == 0">{{ message.user }}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.content"></div>
        <chat-image
          v-if="message.image"
          :imgsrc="message.image"
          @imageLoad="imageLoad"
        ></chat-image>
      </div>
      <span class="timestamp">{{ message.key | datetime }}</span>
    </div>
  </div>
</template>

<script>
import Image from "@/components/common/Image.vue";
import Moment from "moment";
export default {
  data() {
    return {};
  },
  props: {
    messages: {
      type: Array,
      default: () => {
        return [];
      },
      required: false,
    },
  },
  components: {
    "chat-image": Image,
  },
  computed: {
    username() {
      return this.$store.getters["Auth/username"];
    },
  },
  methods: {
    imageLoad() {
      // this.$emit('imageLoad')
    },
  },
  filters: {
    datetime(value) {
      return Moment(value).format("hh:mm:ss");
    },
  },
};
</script>

<style>
span.emoji {
  font-size: 20px;
  vertical-align: middle;
  line-height: 2;
}
span.timestamp {
  padding-left: 0.7rem;
  font-style: italic;
  font-size: 0.7rem;
}
</style>
