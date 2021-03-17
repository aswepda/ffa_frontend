<template>
  <v-card color="#F47458" dark height="100%">
    <v-card-title
      ><span>Guten Morgen!</span><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text>Hey {{firstName}}! Für deinen perfekten Start in den Tag habe ich dir einige Dinge vorbereitet. 😊</v-card-text>
    <v-card-actions>
      <v-btn class="ml-2 mb-1" outlined rounded small @click="test"> <v-icon left small>mdi-message</v-icon>Guten Morgen! </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("closed");
    },
    test() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Guten Morgen!"
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Guten Morgen ${this.firstName}! Ich hoffe du hast heute einen schönen Tag. 🌞`,
        speak: true
      })
    }
  },
  computed: {
    firstName() {
      return this.$globals.firstName || 'du!';
    }
  }
};
</script>

<style>
</style>