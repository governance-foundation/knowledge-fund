<template>
  <span @click="onEmojiClick" :class="emoji.type">{{ emoji.value }}</span>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    emoji: {
      type: Object,
      default: () => {
        return {};
      },
      required: false,
    },
  },
  methods: {
    onEmojiClick() {
      this.$emit("click", this.emoji);
    },
  },
};
</script>
