<template>
  <v-dialog v-model="showDialog" max-width="400">
    <v-card>
      <v-card-title>Debug</v-card-title>
      <v-card-text>{{ debugText }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
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
  },
};
</script>

<style>
</style>