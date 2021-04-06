<template>
  <div class="agenttest">
    <chat ref="chat" class="mt-3" />
    <transition name="fade" mode="out-in">
      <div class="actions" v-if="!routine" key="actions">
        <v-row justify="start">
          <v-col cols="12" sm="6" v-for="action in sortedActions" :key="action.key">
            <Action :imageURL="action.imageURL" :color="action.color" :title="action.title" :featured="isFeatured(action.key)" @clicked="routine = action.key">{{action.content}}</Action>
          </v-col>
        </v-row>
      </div>
      <v-row v-else key="routine">
        <v-col>
          <component :is="currentRoutine" @closed="routine = ''" @data="addMessage" />
        </v-col>
      </v-row>
    </transition>
  </div>
</template>

<script>
import Chat from "../components/Chat.vue";
import GoodMorning from "../components/usecases/GoodMorning.vue";
import Food from "../components/usecases/Food.vue"
import Action from "../components/usecases/ActionCard.vue";
export default {
  components: { Chat, GoodMorning, Action, Food },
  data: () => ({
    actions: [
      {
        imageURL: "/img/test.png",
        color: "#245535",
        title: "Sport 🏀",
        key: "sport",
        content: "Lust auf ein bisschen Sport? :)",
      },
      {
        imageURL: "/img/sleep_cloud.png",
        color: "#350A67",
        title: "Gute Nacht 🌃",
        key: "night",
        content: "Gute Nacht 🌃",
      },
      {
        imageURL: "/img/morning.png",
        color: "#F47458",
        title: "Guten Morgen ☕",
        key: "morning",
        content: "Guten Morgen! Deine Routine für den Start in den Tag. :)",
      },
      {
        imageURL: "/img/eat.png",
        color: "#365DA4",
        title: "Essen 🥗",
        key: "eat",
        content:
          `Frühstück, Mittagessen oder Abendessen?
Deine Routine für jeden Hunger.`,
      },
    ],
    routine: ''
  }),
  methods: {
    getPageHeight() {
      return document.body.scrollHeight;
    },
    addMessage(message) {
      this.$refs.chat.addMessage(message);
      this.scrollToBottom();
      this.$nextTick(function () {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      this.$vuetify.goTo(this.getPageHeight(), {
        duration: 300,
        easing: "easeInOutCubic",
      });
    },
    isFeatured(routine) {
      return this.featured.includes(routine);
    },
  },
  activated() {
    if(this.$refs.chat.messages.length > 0) {
    this.scrollToBottom();
    }
  },
  computed: {
    featured() {
      let curHours = new Date().getHours();
      let featured = [];
      if (curHours >= 5 && curHours <= 10) featured.push("morning");
      if (curHours >= 11 && curHours <= 14) featured.push("eat");
      if (curHours >= 14 && curHours <= 19) featured.push("sport");
      if (curHours >= 17 && curHours <= 20) featured.push("eat");
      if ((curHours > 20) || (curHours <= 3)) featured.push("night");
      console.log(curHours);
      return featured;
    },
    sortedActions() {
      return [...this.actions].sort((a, b) => this.isFeatured(b.key) - this.isFeatured(a.key));
    },
    currentRoutine() {
      switch(this.routine) {
        case "morning":
          return GoodMorning;
        case "eat":
          return Food;
        default:
          return "";
      }
    }
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.actions .v-card__title {
  word-break: normal;
}
.actions .v-card__subtitle {
  white-space: pre-line;
}
</style>