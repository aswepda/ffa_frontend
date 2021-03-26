<template>
  <v-card :max-width="maximumWidth">
    <v-img :src="imgquery" height="250"> </v-img>
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-card-text>
      <v-row class="mx-0 mb-2" align="center" v-if="rating">
        <v-rating
          :value="rating"
          color="amber"
          half-increments
          readonly
          dense
          size="20"
        />
        <div class="grey--text ml-4">
          {{ rating }}<span v-if="ratingCount"> ({{ ratingCount }})</span>
        </div>
      </v-row>
      <div class="mt-0">
        <slot />
      </div>
    </v-card-text>
    <v-card-actions v-if="url">
      <v-btn target="_blank" :href="url">
        <v-icon left>mdi-open-in-new</v-icon>Mehr Infos
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["lat", "lon", "title", "rating", "rating-count", "max-width", "url"],
  data: () => ({
    apiKey:
      "pk.eyJ1IjoibmFpbHVqeDg2IiwiYSI6ImNrbG51aXZhcTBtdWgycW4xdWN1cWpkNDUifQ.QmgyrSXDXrGqCemOxrMHJQ",
  }),
  computed: {
    maximumWidth() {
      return this["max-width"] || 480;
    },
    imgquery() {
      return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${this.lon}%2C${this.lat}%5D%7D)/${this.lon},${this.lat},15,0/640x480?logo=false&access_token=${this.apiKey}`;
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 100%;
}
</style>