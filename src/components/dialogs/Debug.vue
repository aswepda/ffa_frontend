<template>
  <v-dialog v-model="showDialog" max-width="400">
    <v-card>
      <v-card-title>Debug</v-card-title>
      <v-card-text>{{ debugText }}</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="crunch">
          <v-icon left>{{ appleIcon }}</v-icon> APFEL
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    applestate: true,
  }),
  computed: {
    debugText() {
      return this.$globals.$data;
    },
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    appleIcon() {
      if (this.applestate) {
        return "mdi-food-apple";
      } else {
        return "mdi-food-apple-outline";
      }
    },
  },
  methods: {
    crunch() {
      this.applestate = !this.applestate;
      if (!this.applestate) {
        new Audio(require("@/assets/FOODEat_Apple crunched 1 (ID 1113)_BSB.mp3")).play();
      }
    },
  },
};
</script>

<style>
</style>