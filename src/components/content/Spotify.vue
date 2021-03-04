<template>
  <div class="spotify mt-5">
    <v-card :max-width="maximumWidth" elevation="10">
      <iframe
        :src="sourceURL"
        width="100%"
        :height="height"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="text--primary spotifycontent"><slot /></v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    "max-width": Number,
    "is-collapsed": Boolean,
    uri: String,
    title: String,
  },
  computed: {
    sourceURL() {
      let [, type, id] = /spotify:(.+):(.+)/.exec(this.uri);
      return `https://open.spotify.com/embed/${type}/${id}`;
    },
    height() {
      return this.isCollapsed ? 80 : 250;
    },
    maximumWidth() {
      return this["max-width"] || 480;
    },
  },
};
</script>

<style>
.spotifycontent {
  white-space: pre-line;
}
</style>