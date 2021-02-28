<template>
  <v-card :max-width="maximumWidth">
    <v-img :src="imgquery" height="250"> </v-img>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: ["lat", "lon", "max-width"],
  data: () => ({
    apiKey: "pk.eyJ1IjoibmFpbHVqeDg2IiwiYSI6ImNrbG51aXZhcTBtdWgycW4xdWN1cWpkNDUifQ.QmgyrSXDXrGqCemOxrMHJQ",
  }),
  computed: {
    maximumWidth() {
      return this['max-width'] || 480;
    },
    imgquery() {
      return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${this.lon}%2C${this.lat}%5D%7D)/${this.lon},${this.lat},15,0/640x480?logo=false&access_token=${this.apiKey}`;
    },
  },
};
</script>

<style>
</style>