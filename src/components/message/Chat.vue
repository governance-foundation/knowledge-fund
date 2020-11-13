<template>
  <v-container fluid style="padding: 0">
    <v-row no-gutters>
      <v-col style="position: relative">
        <div class="chat-container" @scroll="onScroll" ref="chatContainer">
          <message :messages="messages" @imageLoad="scrollToEnd"></message>
        </div>
        <emoji-picker
          :show="emojiPanel"
          @close="toggleEmojiPanel"
          @click="addEmojiToMessage"
        ></emoji-picker>
        <div class="typer">
          <v-text-field
            class="mx-4"
            ref="message"
            flat
            hide-details
            label="Type here..."
            prepend-inner-icon="mdi-emoticon-outline"
            solo-inverted
            clearable
            full-width
            v-model="content"
            @click:prepend-inner="toggleEmojiPanel()"
            @keyup.enter="sendMessage"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmojiPicker from "@/components/common/EmojiPicker.vue";
import Message from "@/components/message/Message.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      content: "",
      chatMessages: [],
      emojiPanel: false,
      currentRef: {},
      loading: false,
      totalChatHeight: 0,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
      required: false,
    },
  },
  mounted() {
    console.log("chat loading");
    this.loadChat();
    //listen for search commands
    this.$store.subscribeAction((action) => {
      if (action.type == "Search/searchAction") {
        console.log("subscribeAction: Search/searchAction");
        console.log(action.payload);
        this.setAndSendMessage(action.payload);
      }
    });
    //listen for incoming messages
    this.$store.subscribeAction((action) => {
      if (action.type == "Message/messageRecieve") {
        console.log("subscribeAction: Message/messageRecieve");
        console.log(action.payload);
        this.onNewMessageAdded(action.payload, true);
      }
    });
  },
  components: {
    message: Message,
    "emoji-picker": EmojiPicker,
  },
  computed: {
    messages() {
      return this.chatMessages;
    },
    user() {
      return this.$store.getters["Auth/username"];
    },
    onNewMessageAdded() {
      const that = this;
      let onNewMessageAdded = function (message, newMessage = true) {
        /*eslint-disable */
        var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
        /*eslint-enable */
        if (message.content) {
          //fix html in message
          message.content = message.content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
          //fix urls in message
          message.content = message.content.replace(
            urlPattern,
            "<a href='$1'>$1</a>"
          );
        }
        if (!newMessage) {
          that.chatMessages.unshift(that.processMessage(message));
          that.scrollTo();
        } else {
          that.chatMessages.push(that.processMessage(message));
          that.scrollToEnd();
        }
      };
      return onNewMessageAdded;
    },
  },
  watch: {
    //(newId, oldId)
    "$route.params.id"() {
      console.log("$route.params.id");
      this.currentRef.off("child_added", this.onNewMessageAdded);
      this.loadChat();
    },
  },
  methods: {
    ...mapActions({
      showAddNew: "AddNew/showAddNew",
      hideAddNew: "AddNew/hideAddNew",
      search: "Search/searchAction",
      searchInput: "Search/searchInputAction",
      messageSend: "Message/messageSend",
    }),
    ...mapGetters({
      messageList: "Message/messageList",
    }),
    loadChat() {
      // this.totalChatHeight = this.$refs.chatContainer.scrollHeight;
      this.loading = true;
      const that = this;
      this.messageList().forEach(function (child) {
        that.onNewMessageAdded(child, false);
      });
      this.loading = false;
    },
    onScroll() {
      let scrollValue = this.$refs.chatContainer.scrollTop;
      // const that = this;
      if (scrollValue < 100 && !this.loading) {
        this.totalChatHeight = this.$refs.chatContainer.scrollHeight;
        this.loading = true;
        let currentTopMessage = this.chatMessages[0];
        if (currentTopMessage === undefined) {
          this.loading = false;
          return;
        }
      }
    },
    processMessage(message) {
      /*eslint-disable */
        var imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
        /*eslint-enable */
      if (imageRegex.test(message.content)) {
        message.image = imageRegex.exec(message.content)[0];
      }
      var emojiRegex = /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{2934}-\u{1f18e}])/gu;
      if (emojiRegex.test(message.content)) {
        message.content = message.content.replace(
          emojiRegex,
          '<span class="emoji">$1</span>'
        );
      }
      return message;
    },
    setAndSendMessage(text) {
      if (text !== "") {
        this.content = text;
        this.sendMessage();
      }
    },
    sendMessage() {
      if (this.content !== "") {
        // this.$store.dispatch("sendMessage", {
        //   username: this.username,
        //   content: this.content,
        //   date: new Date().toString(),
        //   chatID: this.id,
        // });
        let message = {
          user: this.user,
          content: this.content,
          date: new Date().getTime(),
          chatID: this.id,
          key: new Date().getTime(),
          echo: true,
        };
        this.messageSend(message);
        this.onNewMessageAdded(message, true);
        this.content = "";
        this.emojiPanel = false;
      }
    },
    scrollToEnd() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".chat-container");
        container.scrollTop = container.scrollHeight;
      });
    },
    scrollTo() {
      this.$nextTick(() => {
        let currentHeight = this.$refs.chatContainer.scrollHeight;
        let difference = currentHeight - this.totalChatHeight;
        var container = this.$el.querySelector(".chat-container");
        container.scrollTop = difference;
      });
    },
    addEmojiToMessage(emoji) {
      this.content += emoji.value;
      // console.log(this.$refs.message);
      this.$refs.message.focus();
    },
    toggleEmojiPanel() {
      // console.log("toggleEmojiPanel");
      this.emojiPanel = !this.emojiPanel;
    },
  },
};
</script>

<style>
.scrollable {
  overflow-y: auto;
  height: 90vh;
}
.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.2);
  font-size: 1.25rem;
}
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content {
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .chat-container .content {
    max-width: 60%;
  }
}
</style>
