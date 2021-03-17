<template>
  <div class="agenttest">
    <chat ref="chat" class="mt-3" />
    <transition name="fade" mode="out-in">
      <div class="actions" v-if="!morningRoutine" key="actions">
        <v-row justify="start" align="stretch">
          <v-col class="col-md-6">
            <Action
              imageURL="/img/test.png"
              color="#245535"
              :featured="isFeatured('night')"
              title="Sport 🏀"
              >Lust auf ein bisschen Sport? :)</Action
            >
          </v-col>
          <v-col class="col-md-6">
            <Action
              imageURL="/img/sleep_cloud.png"
              color="#350A67"
              title="Gute Nacht 🌃"
              :featured="isFeatured('night')"
              >Gute Nacht 🌃</Action
            >
          </v-col>
        </v-row>
        <v-row justify="start" class="mb-4" align="stretch">
          <v-col class="col-md-6">
            <Action
              imageURL="/img/morning.png"
              color="#F47458"
              title="Guten Morgen ☕"
              :featured="isFeatured('morning')"
              @clicked="morningRoutine = true"
            >
              Guten Morgen! Deine Routine für den Start in den Tag. :)
            </Action>
          </v-col>
          <v-col class="col-md-6">
            <Action
              imageURL="/img/eat.png"
              color="#365DA4"
              title="Essen 🥗"
              :featured="isFeatured('eat')"
            >
              Frühstück, Mittagessen oder Abendessen?<br />Deine Routine für
              jeden Hunger.
            </Action>
          </v-col>
        </v-row>
      </div>
      <v-row v-else key="routine">
        <v-col>
          <good-morning @closed="morningRoutine = false" @data="addMessage" />
        </v-col>
      </v-row>
    </transition>
  </div>
</template>

<script>
import Chat from "../components/Chat.vue";
import GoodMorning from "../components/usecases/GoodMorning.vue";
import Action from "../components/usecases/ActionCard.vue";
export default {
  components: { Chat, GoodMorning, Action },
  data: () => ({
    actions: [
      {
        imageURL: "/img/test.png",
        color: "#245535",
        title: "Sport 🏀",
        key: "night",
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
          "Frühstück, Mittagessen oder Abendessen?<br />Deine Routine fürjeden Hunger.",
      },
    ],
    morningRoutine: false,
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
      console.log(this.getPageHeight());
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
    this.scrollToBottom();
  },
  computed: {
    featured() {
      let curHours = new Date().getHours();
      let featured = [];
      if (curHours >= 5 && curHours <= 10) featured.push("morning");
      if (curHours >= 11 && curHours <= 14) featured.push("eat");
      if (curHours >= 14 && curHours <= 19) featured.push("sport");
      if (curHours >= 17 && curHours <= 20) featured.push("eat");
      if ((curHours > 20) | (curHours <= 3)) featured.push("night");
      console.log(curHours);
      return featured;
    },
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
</style>