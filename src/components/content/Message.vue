<template>
  <v-card :max-width="maximumWidth">
    <v-card-subtitle>{{ from }} am {{ datum.toLocaleString() }}</v-card-subtitle>
    <v-card-text class="text--primary"><slot /></v-card-text>
  </v-card>
</template>


<script>
export default {
  props: ["max-width", "from", "date"],
  computed: {
    maximumWidth() {
      return this["max-width"] || 480;
    },
    datum() {
      return new Date(this.date); // falls das Datum doch kein Datum war
    }
  },
};
</script>

<style>
</style>